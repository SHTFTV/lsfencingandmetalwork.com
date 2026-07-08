#!/usr/bin/env bash
set -euo pipefail

# Upload dist.tar.gz to S3 with:
#  - Input validation (region, bucket, key/prefix, artifact path)
#  - Structured JSON logs per retry attempt (timestamp, attempt, backoffMs,
#    S3 error code, request ids)
#  - Exponential backoff w/ jitter on ServiceUnavailable / SlowDown / throttling
#  - Local per-prefix lock (single runner) AND cross-runner lock via a
#    conditional S3 PutObject lock object (IfNoneMatch: "*")

MAX_ATTEMPTS="${S3_UPLOAD_MAX_ATTEMPTS:-6}"
BASE_DELAY_SECONDS="${S3_UPLOAD_BASE_DELAY_SECONDS:-2}"
MAX_DELAY_SECONDS="${S3_UPLOAD_MAX_DELAY_SECONDS:-60}"
DIST_DIR="${DIST_DIR:-dist}"
ARCHIVE_PATH="${DIST_ARCHIVE_PATH:-/tmp/dist.tar.gz}"
LOCK_ROOT="${S3_UPLOAD_LOCK_ROOT:-/tmp/s3-dist-upload-locks}"
LOCK_TTL_SECONDS="${S3_UPLOAD_LOCK_TTL_SECONDS:-1800}"
LOCK_POLL_SECONDS="${S3_UPLOAD_LOCK_POLL_SECONDS:-5}"
LOCK_MAX_WAIT_SECONDS="${S3_UPLOAD_LOCK_MAX_WAIT_SECONDS:-1800}"
LOCK_HOLDER="${S3_LOCK_HOLDER:-$(hostname 2>/dev/null || echo unknown)-$$}"

# ---------- logging ----------
iso_now() { date -u +%Y-%m-%dT%H:%M:%SZ; }

json_escape() {
  # Escape "\ and control chars for JSON string values.
  local s="${1-}"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  s="${s//$'\n'/\\n}"
  s="${s//$'\r'/\\r}"
  s="${s//$'\t'/\\t}"
  printf '%s' "$s"
}

# jlog event key=value key=value ...
# All values are emitted as JSON strings (safe + simple).
jlog() {
  local event="$1"; shift
  local out="{\"timestamp\":\"$(iso_now)\",\"event\":\"$(json_escape "$event")\""
  local kv key value
  for kv in "$@"; do
    key="${kv%%=*}"
    value="${kv#*=}"
    out+=",\"$(json_escape "$key")\":\"$(json_escape "$value")\""
  done
  out+="}"
  printf '%s\n' "$out"
}

fail() {
  jlog final_failure reason="$*"
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "missing required command: $1"
}

require_env() {
  if [[ -z "${!1:-}" ]]; then
    fail "missing required environment variable: $1"
  fi
}

# ---------- validation ----------
validate_region() {
  [[ "${AWS_REGION:-}" =~ ^[a-z]{2}(-gov)?-[a-z]+-[0-9]$ ]] \
    || fail "invalid AWS_REGION: '${AWS_REGION:-}' (expected e.g. us-east-1)"
}

validate_bucket() {
  local b="$S3_BUCKET"
  local len=${#b}
  (( len >= 3 && len <= 63 )) || fail "invalid S3_BUCKET length: $len (must be 3-63)"
  [[ "$b" =~ ^[a-z0-9][a-z0-9.-]*[a-z0-9]$ ]] \
    || fail "invalid S3_BUCKET name: '$b' (lowercase, digits, dot, hyphen; must start/end alnum)"
  [[ "$b" =~ \.\. ]] && fail "invalid S3_BUCKET name: '$b' (contains '..')"
  [[ "$b" =~ ^[0-9]{1,3}(\.[0-9]{1,3}){3}$ ]] && fail "invalid S3_BUCKET name: '$b' (looks like IP)"
  return 0
}

validate_key() {
  local k="$S3_OBJECT_KEY"
  local len=${#k}
  (( len >= 1 && len <= 1024 )) || fail "invalid S3_OBJECT_KEY length: $len (must be 1-1024)"
  [[ "$k" == /* ]] && fail "invalid S3_OBJECT_KEY: '$k' (must not start with '/')"
  [[ "$k" == */ ]] && fail "invalid S3_OBJECT_KEY: '$k' (must not end with '/')"
  [[ "$k" == *"//"* ]] && fail "invalid S3_OBJECT_KEY: '$k' (contains '//')"
  # Disallow control chars.
  [[ "$k" =~ [[:cntrl:]] ]] && fail "invalid S3_OBJECT_KEY: contains control characters"
  return 0
}

validate_artifact() {
  [[ -d "$DIST_DIR" ]] || fail "dist directory not found: $DIST_DIR; run the build before uploading"
  local abs
  abs="$(cd "$DIST_DIR" && pwd)"
  [[ -n "$abs" ]] || fail "cannot resolve DIST_DIR: $DIST_DIR"
  # Ensure archive path parent exists / is writable
  local parent
  parent="$(dirname "$ARCHIVE_PATH")"
  mkdir -p "$parent" || fail "cannot create archive parent dir: $parent"
  [[ -w "$parent" ]] || fail "archive parent dir not writable: $parent"
}

validate_numbers() {
  [[ "$MAX_ATTEMPTS" =~ ^[0-9]+$ ]] && (( MAX_ATTEMPTS >= 1 )) \
    || fail "S3_UPLOAD_MAX_ATTEMPTS must be a positive integer"
  [[ "$BASE_DELAY_SECONDS" =~ ^[0-9]+$ ]] && (( BASE_DELAY_SECONDS >= 1 )) \
    || fail "S3_UPLOAD_BASE_DELAY_SECONDS must be a positive integer"
  [[ "$MAX_DELAY_SECONDS" =~ ^[0-9]+$ ]] && (( MAX_DELAY_SECONDS >= BASE_DELAY_SECONDS )) \
    || fail "S3_UPLOAD_MAX_DELAY_SECONDS must be >= base delay"
}

# ---------- error parsing ----------
is_retryable_s3_error() {
  local output="$1"
  [[ "$output" == *"ServiceUnavailable"* ]] || \
    [[ "$output" == *"SlowDown"* ]] || \
    [[ "$output" == *"RequestTimeout"* ]] || \
    [[ "$output" == *"InternalError"* ]] || \
    [[ "$output" == *"Reduce your concurrent request rate"* ]] || \
    [[ "$output" == *"(503)"* ]]
}

extract_s3_error_code() {
  local output="$1"
  if [[ "$output" =~ \(([A-Za-z0-9]+)\) ]]; then
    printf '%s' "${BASH_REMATCH[1]}"
  elif [[ "$output" == *"ServiceUnavailable"* ]]; then
    printf 'ServiceUnavailable'
  elif [[ "$output" == *"SlowDown"* ]]; then
    printf 'SlowDown'
  else
    printf 'Unknown'
  fi
}

extract_header() {
  # extract_header <output> <header-name>
  local output="$1" header="$2"
  local line
  line="$(printf '%s\n' "$output" | grep -i "^${header}:" | tail -n1 || true)"
  [[ -z "$line" ]] && { printf ''; return; }
  printf '%s' "${line#*: }" | tr -d '\r'
}

calculate_backoff_ms() {
  local attempt="$1"
  local exponential=$(( BASE_DELAY_SECONDS * (2 ** (attempt - 1)) ))
  local capped="$exponential"
  (( capped > MAX_DELAY_SECONDS )) && capped="$MAX_DELAY_SECONDS"
  local jitter=0
  (( capped > 1 )) && jitter=$(( RANDOM % capped ))
  printf '%s' $(( (capped + jitter) * 1000 ))
}

# ---------- s3 lock (cross-runner) ----------
s3_lock_key() {
  printf '%s.__upload.lock' "$S3_OBJECT_KEY"
}

acquire_s3_lock() {
  local lock_key holder_body waited=0 output rc code
  lock_key="$(s3_lock_key)"
  holder_body="$(mktemp)"
  printf '{"holder":"%s","acquiredAt":"%s","ttlSeconds":%s}\n' \
    "$(json_escape "$LOCK_HOLDER")" "$(iso_now)" "$LOCK_TTL_SECONDS" > "$holder_body"

  while true; do
    # Conditional PutObject: succeeds only if the lock object does NOT exist.
    if output="$(aws s3api put-object \
        --bucket "$S3_BUCKET" \
        --key "$lock_key" \
        --body "$holder_body" \
        --if-none-match '*' \
        --content-type application/json 2>&1)"; then
      rm -f "$holder_body"
      jlog s3_lock_acquired bucket="$S3_BUCKET" lock_key="$lock_key" holder="$LOCK_HOLDER"
      return 0
    fi
    rc=$?
    code="$(extract_s3_error_code "$output")"

    # Lock exists — check age; break stale locks.
    if [[ "$output" == *"PreconditionFailed"* || "$output" == *"412"* ]]; then
      local head last_modified age_s
      if head="$(aws s3api head-object --bucket "$S3_BUCKET" --key "$lock_key" --output json 2>/dev/null)"; then
        last_modified="$(printf '%s' "$head" | sed -n 's/.*"LastModified": *"\([^"]*\)".*/\1/p' | head -n1)"
        if [[ -n "$last_modified" ]]; then
          local lm_epoch now_epoch
          lm_epoch="$(date -u -d "$last_modified" +%s 2>/dev/null || echo 0)"
          now_epoch="$(date -u +%s)"
          age_s=$(( now_epoch - lm_epoch ))
          if (( lm_epoch > 0 && age_s > LOCK_TTL_SECONDS )); then
            jlog s3_lock_stale_break bucket="$S3_BUCKET" lock_key="$lock_key" age_seconds="$age_s" ttl_seconds="$LOCK_TTL_SECONDS"
            aws s3api delete-object --bucket "$S3_BUCKET" --key "$lock_key" >/dev/null 2>&1 || true
            continue
          fi
        fi
      fi
      jlog s3_lock_wait bucket="$S3_BUCKET" lock_key="$lock_key" waited_seconds="$waited" holder="$LOCK_HOLDER"
    else
      jlog s3_lock_error bucket="$S3_BUCKET" lock_key="$lock_key" status="$rc" s3_error_code="$code" message="$(printf '%s' "$output" | tr '\n' ' ')"
    fi

    if (( waited >= LOCK_MAX_WAIT_SECONDS )); then
      rm -f "$holder_body"
      fail "s3_lock_timeout bucket=$S3_BUCKET lock_key=$lock_key waited_seconds=$waited"
    fi
    sleep "$LOCK_POLL_SECONDS"
    waited=$(( waited + LOCK_POLL_SECONDS ))
  done
}

release_s3_lock() {
  local lock_key
  lock_key="$(s3_lock_key)"
  aws s3api delete-object --bucket "$S3_BUCKET" --key "$lock_key" >/dev/null 2>&1 || true
  jlog s3_lock_released bucket="$S3_BUCKET" lock_key="$lock_key" holder="$LOCK_HOLDER"
}

# ---------- upload ----------
upload_once() {
  # --debug surfaces x-amz-request-id / x-amz-id-2 on stderr for diagnostics.
  aws s3api put-object \
    --bucket "$S3_BUCKET" \
    --key "$S3_OBJECT_KEY" \
    --body "$ARCHIVE_PATH" \
    --content-type "application/gzip" \
    --debug 2>&1
}

# ---------- main ----------
require_cmd aws
require_cmd tar
require_env AWS_REGION
require_env S3_BUCKET
require_env S3_OBJECT_KEY

validate_region
validate_bucket
validate_key
validate_numbers
validate_artifact

mkdir -p "$LOCK_ROOT"
tar -czf "$ARCHIVE_PATH" -C "$DIST_DIR" .

object_prefix="${S3_OBJECT_KEY%/*}"
[[ "$object_prefix" == "$S3_OBJECT_KEY" ]] && object_prefix="root"
lock_name="$(printf '%s/%s' "$S3_BUCKET" "$object_prefix" | tr -c 'A-Za-z0-9._-' '_')"
lock_dir="$LOCK_ROOT/$lock_name.lock"

archive_bytes="$(wc -c < "$ARCHIVE_PATH" | tr -d ' ')"
jlog prepared archive="$ARCHIVE_PATH" source="$DIST_DIR" size_bytes="$archive_bytes" \
  bucket="$S3_BUCKET" key="$S3_OBJECT_KEY" prefix="$object_prefix" \
  region="$AWS_REGION" max_attempts="$MAX_ATTEMPTS" holder="$LOCK_HOLDER"

# Local (single-runner) lock — cheap fast path.
while ! mkdir "$lock_dir" 2>/dev/null; do
  jlog local_prefix_lock_wait bucket="$S3_BUCKET" prefix="$object_prefix" lock="$lock_dir"
  sleep 5
done
trap 'rmdir "$lock_dir" 2>/dev/null || true; release_s3_lock' EXIT
jlog local_prefix_lock_acquired bucket="$S3_BUCKET" prefix="$object_prefix" lock="$lock_dir"

# Cross-runner lock via S3 conditional PutObject.
acquire_s3_lock

attempt=1
last_error=""
while (( attempt <= MAX_ATTEMPTS )); do
  jlog put_object_attempt attempt="$attempt" max_attempts="$MAX_ATTEMPTS" \
    bucket="$S3_BUCKET" key="$S3_OBJECT_KEY" region="$AWS_REGION"

  output=""
  set +e
  output="$(upload_once)"
  status=$?
  set -e

  request_id="$(extract_header "$output" x-amz-request-id)"
  extended_id="$(extract_header "$output" x-amz-id-2)"

  if (( status == 0 )); then
    jlog put_object_success attempt="$attempt" bucket="$S3_BUCKET" key="$S3_OBJECT_KEY" \
      x_amz_request_id="$request_id" x_amz_id_2="$extended_id" size_bytes="$archive_bytes"
    exit 0
  fi

  last_error="$output"
  error_code="$(extract_s3_error_code "$output")"
  sanitized_error="$(printf '%s' "$output" | tail -c 500 | tr '\n' ' ' | sed 's/[[:space:]][[:space:]]*/ /g')"

  jlog put_object_error attempt="$attempt" status="$status" s3_error_code="$error_code" \
    x_amz_request_id="$request_id" x_amz_id_2="$extended_id" message="$sanitized_error"

  if ! is_retryable_s3_error "$output"; then
    fail "non_retryable_s3_error attempt=$attempt status=$status s3_error_code=$error_code request_id=$request_id"
  fi

  if (( attempt == MAX_ATTEMPTS )); then
    fail "retry_exhausted attempts=$MAX_ATTEMPTS final_s3_error_code=$error_code request_id=$request_id"
  fi

  backoff_ms="$(calculate_backoff_ms "$attempt")"
  jlog put_object_retry_scheduled attempt="$attempt" next_attempt="$((attempt + 1))" \
    s3_error_code="$error_code" backoffMs="$backoff_ms" \
    x_amz_request_id="$request_id" x_amz_id_2="$extended_id"

  sleep_seconds=$(( backoff_ms / 1000 ))
  (( sleep_seconds < 1 )) && sleep_seconds=1
  sleep "$sleep_seconds"
  attempt=$((attempt + 1))
done

fail "unexpected_exit last_error=$(printf '%s' "$last_error" | tail -c 300 | tr '\n' ' ')"
