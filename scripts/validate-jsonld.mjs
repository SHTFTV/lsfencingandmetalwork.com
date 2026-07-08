#!/usr/bin/env node
/**
 * Build-time JSON-LD validator.
 *
 * Scans every route file under src/routes for `serviceJsonLd({...})` calls,
 * pulls the referenced FAQ + DESCRIPTION constants out of the same file,
 * then checks the emitted Service + FAQPage payloads against Google's
 * rich-result requirements.
 *
 * Fails the process (exit 1) so it can gate `bun run build`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const ROUTES_DIR = join(ROOT, "src", "routes");

/** @typedef {{ file: string; name: string; description: string; path: string; faq: {q:string;a:string}[] }} Extracted */

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx|ts)$/.test(entry)) out.push(full);
  }
  return out;
}

/** Extract a string literal — supports "..." and `...` (no interpolation). */
function stripQuotes(raw) {
  const t = raw.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  if (t.startsWith("`") && t.endsWith("`")) return t.slice(1, -1);
  return null;
}

/** Resolve `identOrLiteral` in `src` — either a string literal or a `const X = "..."` in same file. */
function resolveString(src, expr) {
  const lit = stripQuotes(expr);
  if (lit !== null) return lit;
  const ident = expr.trim();
  const m = new RegExp(
    `const\\s+${ident}\\s*(?::\\s*string)?\\s*=\\s*((?:"[^"]*"|'[^']*'|\`[^\`]*\`))`,
  ).exec(src);
  if (m) return stripQuotes(m[1]);
  return null;
}

/** Extract a FAQ constant `const NAME: FaqItem[] = [ { q: "..", a: ".." }, ... ]`. */
function resolveFaq(src, ident) {
  const m = new RegExp(
    `const\\s+${ident}\\s*(?::\\s*FaqItem\\[\\]\\s*)?=\\s*\\[([\\s\\S]*?)\\]\\s*;`,
  ).exec(src);
  if (!m) return null;
  const body = m[1];
  /** @type {{q:string;a:string}[]} */
  const items = [];
  const itemRe = /\{\s*q\s*:\s*("[^"]*"|'[^']*'|`[^`]*`)\s*,\s*a\s*:\s*("[^"]*"|'[^']*'|`[^`]*`)\s*\}/g;
  let im;
  while ((im = itemRe.exec(body)) !== null) {
    items.push({ q: stripQuotes(im[1]) ?? "", a: stripQuotes(im[2]) ?? "" });
  }
  return items;
}

/** @param {string} file @returns {Extracted | null} */
function extract(file) {
  const src = readFileSync(file, "utf8");
  const callRe = /serviceJsonLd\(\{([\s\S]*?)\}\s*\)/m;
  const call = callRe.exec(src);
  if (!call) return null;
  const body = call[1];

  const field = (key) => {
    const re = new RegExp(
      `${key}\\s*:\\s*(.+?)\\s*(?:,\\s*\\w+\\s*:|,?\\s*$)`,
      "s",
    );
    const m = re.exec(body);
    return m ? m[1].trim().replace(/,\s*$/, "") : null;
  };

  const rawName = field("name");
  const rawDesc = field("description");
  const rawPath = field("path");
  const rawFaq = field("faq");

  if (!rawName || !rawDesc || !rawPath) return null;

  const name = resolveString(src, rawName);
  const description = resolveString(src, rawDesc);
  const path = resolveString(src, rawPath);
  const faq = rawFaq ? resolveFaq(src, rawFaq.trim()) ?? [] : [];

  if (name === null || description === null || path === null) return null;

  return { file, name, description, path, faq };
}

/** @param {Extracted} entry @returns {string[]} */
function validate(entry) {
  /** @type {string[]} */
  const errors = [];
  if (!entry.name || entry.name.length < 3) errors.push("Service.name missing or too short");
  if (entry.name.length > 110) errors.push("Service.name exceeds 110 chars");
  if (!entry.description || entry.description.length < 30)
    errors.push("Service.description missing or under 30 chars");
  if (entry.description.length > 320)
    errors.push("Service.description exceeds 320 chars (Google truncates)");
  if (!entry.path.startsWith("/")) errors.push(`Service.url path must start with '/' (got ${entry.path})`);

  if (entry.faq.length > 0) {
    // FAQ rich result rules
    if (entry.faq.length < 1) errors.push("FAQPage must have at least 1 question");
    entry.faq.forEach((f, i) => {
      if (!f.q || f.q.length < 5) errors.push(`FAQ[${i}].q missing or under 5 chars`);
      if (!f.a || f.a.length < 10) errors.push(`FAQ[${i}].a missing or under 10 chars`);
      // Google disallows promotional / duplicate answers — sanity-check duplicates:
      if (entry.faq.some((g, j) => j !== i && g.q === f.q))
        errors.push(`FAQ[${i}].q duplicates another question`);
    });
  }
  return errors;
}

function main() {
  const files = walk(ROUTES_DIR);
  /** @type {Extracted[]} */
  const found = [];
  for (const f of files) {
    const e = extract(f);
    if (e) found.push(e);
  }

  if (found.length === 0) {
    console.error("[jsonld] No serviceJsonLd() calls found — nothing to validate.");
    process.exit(1);
  }

  let failed = 0;
  console.log(`[jsonld] Validating ${found.length} service page(s)…\n`);
  for (const entry of found) {
    const errs = validate(entry);
    const rel = relative(ROOT, entry.file);
    if (errs.length === 0) {
      console.log(`  ✓ ${entry.path.padEnd(28)} ${entry.name}  (${entry.faq.length} FAQ)`);
    } else {
      failed++;
      console.log(`  ✗ ${entry.path.padEnd(28)} ${entry.name}  (${rel})`);
      for (const e of errs) console.log(`      - ${e}`);
    }
  }

  if (failed > 0) {
    console.error(`\n[jsonld] ${failed} page(s) failed JSON-LD validation.`);
    process.exit(1);
  }
  console.log(`\n[jsonld] All ${found.length} pages pass Google-compliant JSON-LD checks.`);
}

main();
