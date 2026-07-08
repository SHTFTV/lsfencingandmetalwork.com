#!/usr/bin/env bash
set -euo pipefail

MAX_ATTEMPTS="${S3_UPLOAD_MAX_ATTEMPTS:-6}"
BASE_DELAY_SECONDS="${S3_UPLOAD_BASE_DELAY_SECONDS:-2}"
MAX_DELAY_SECONDS="${S3_UPLOAD_MAX_DELAY_SECONDS:-60}"
DIST_DIR="${DIST_DIR:-dist}"
ARCHIVE_PATH="${DIST_ARCHIVE_PATH:-/tmp/dist.tar.gz}"
LOCK_ROOT="${S3_UPLOAD_LOCK_ROOT:-/tmp/s3-dist-upload-locks}"

log() {
  printf '[s3-dist-upload] %s\n' "$*"
}

fail() {
  log "final_failure reason=$*"
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

is_retryable_s3_error() {
  local output="$1"
  [[ "$output" == *"ServiceUnavailable"* ]] || \
    [[ "$output" == *"SlowDown"* ]] || \
    [[ "$output" == *"Reduce your concurrent request rate"* ]]
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

calculate_backoff() {
  local attempt="$1"
  local exponential=$(( BASE_DELAY_SECONDS * (2 ** (attempt - 1)) ))
  local capped="$exponential"
  if (( capped > MAX_DELAY_SECONDS )); then
    capped="$MAX_DELAY_SECONDS"
  fi
  local jitter=0
  if (( capped > 1 )); then
    jitter=$(( RANDOM % capped ))
  fi
  printf '%s' $(( capped + jitter ))
}

upload_once() {
  aws s3api put-object \
    --bucket "$S3_BUCKET" \
    --key "$S3_OBJECT_KEY" \
    --body "$ARCHIVE_PATH" \
    --content-type "application/gzip"
}

require_cmd aws
require_cmd tar
require_env S3_BUCKET
require_env S3_OBJECT_KEY

if [[ ! -d "$DIST_DIR" ]]; then
  fail "dist directory not found: $DIST_DIR; run the build before uploading"
fi

if ! [[ "$MAX_ATTEMPTS" =~ ^[0-9]+$ ]] || (( MAX_ATTEMPTS < 1 )); then
  fail "S3_UPLOAD_MAX_ATTEMPTS must be a positive integer"
fi

mkdir -p "$(dirname "$ARCHIVE_PATH")" "$LOCK_ROOT"
tar -czf "$ARCHIVE_PATH" -C "$DIST_DIR" .

object_prefix="${S3_OBJECT_KEY%/*}"
if [[ "$object_prefix" == "$S3_OBJECT_KEY" ]]; then
  object_prefix="root"
fi
lock_name="$(printf '%s/%s' "$S3_BUCKET" "$object_prefix" | tr -c 'A-Za-z0-9._-' '_')"
lock_dir="$LOCK_ROOT/$lock_name.lock"

log "prepared archive=$ARCHIVE_PATH source=$DIST_DIR size_bytes=$(wc -c < "$ARCHIVE_PATH" | tr -d ' ') bucket=$S3_BUCKET key=$S3_OBJECT_KEY prefix=$object_prefix max_attempts=$MAX_ATTEMPTS"

while ! mkdir "$lock_dir" 2>/dev/null; do
  log "prefix_lock_wait bucket=$S3_BUCKET prefix=$object_prefix lock=$lock_dir"
  sleep 5
done
trap 'rmdir "$lock_dir" 2>/dev/null || true' EXIT
log "prefix_lock_acquired bucket=$S3_BUCKET prefix=$object_prefix lock=$lock_dir"

attempt=1
last_error=""
while (( attempt <= MAX_ATTEMPTS )); do
  log "put_object_attempt attempt=$attempt max_attempts=$MAX_ATTEMPTS bucket=$S3_BUCKET key=$S3_OBJECT_KEY"
  output=""
  if output="$(upload_once 2>&1)"; then
    log "put_object_success attempt=$attempt bucket=$S3_BUCKET key=$S3_OBJECT_KEY"
    exit 0
  fi

  status=$?
  last_error="$output"
  error_code="$(extract_s3_error_code "$output")"
  sanitized_error="$(printf '%s' "$output" | tr '\n' ' ' | sed 's/[[:space:]][[:space:]]*/ /g')"
  log "put_object_error attempt=$attempt status=$status s3_error_code=$error_code message=$sanitized_error"

  if ! is_retryable_s3_error "$output"; then
    fail "non_retryable_s3_error attempt=$attempt status=$status s3_error_code=$error_code message=$sanitized_error"
  fi

  if (( attempt == MAX_ATTEMPTS )); then
    fail "retry_exhausted attempts=$MAX_ATTEMPTS final_s3_error_code=$error_code message=$sanitized_error"
  fi

  backoff_seconds="$(calculate_backoff "$attempt")"
  log "put_object_retry_scheduled attempt=$attempt next_attempt=$((attempt + 1)) s3_error_code=$error_code backoff_seconds=$backoff_seconds"
  sleep "$backoff_seconds"
  attempt=$((attempt + 1))
done

fail "unexpected_exit last_error=$(printf '%s' "$last_error" | tr '\n' ' ')"