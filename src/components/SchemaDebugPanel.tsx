import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Copy, X, Braces } from "lucide-react";

/**
 * Dev-only structured data inspector. Reads all <script type="application/ld+json">
 * tags in <head> and shows them formatted so you can paste into Google Rich Results Test.
 *
 * Renders in one of these cases:
 *   1. Vite dev mode (import.meta.env.DEV)
 *   2. ?debug=schema in the URL (works in preview / prod builds too)
 *   3. localStorage.debugSchema === "1"
 */
export function SchemaDebugPanel() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [blocks, setBlocks] = useState<Array<{ pretty: string; parsed: unknown; error?: string }>>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [pageUrl, setPageUrl] = useState("");

  // Decide whether to render at all.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDev = Boolean(import.meta.env?.DEV);
    const qs = new URLSearchParams(window.location.search);
    const flag = qs.get("debug");
    const stored = window.localStorage.getItem("debugSchema") === "1";
    if (flag === "schema") {
      window.localStorage.setItem("debugSchema", "1");
    } else if (flag === "off") {
      window.localStorage.removeItem("debugSchema");
    }
    setEnabled(isDev || flag === "schema" || stored);
  }, []);

  // Poll head for JSON-LD scripts (rescans after navigation).
  useEffect(() => {
    if (!enabled) return;
    const rescan = () => {
      const nodes = Array.from(
        document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
      );
      const parsed = nodes.map((n) => {
        const raw = n.textContent ?? "";
        try {
          const obj = JSON.parse(raw);
          return { pretty: JSON.stringify(obj, null, 2), parsed: obj };
        } catch (e) {
          return { pretty: raw, parsed: null, error: (e as Error).message };
        }
      });
      setBlocks(parsed);
      setPageUrl(window.location.pathname + window.location.search);
    };
    rescan();
    const obs = new MutationObserver(rescan);
    obs.observe(document.head, { childList: true, subtree: true, characterData: true });
    const interval = window.setInterval(rescan, 1500);
    return () => {
      obs.disconnect();
      window.clearInterval(interval);
    };
  }, [enabled]);

  if (!enabled) return null;

  const copy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      window.setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1500);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  const summary = blocks
    .map((b) => (b.parsed && typeof b.parsed === "object" ? (b.parsed as { "@type"?: string })["@type"] : null))
    .filter(Boolean)
    .join(" · ") || "no schema";

  return (
    <div
      data-testid="schema-debug-panel"
      className="fixed bottom-3 right-3 z-[200] font-mono text-[11px] shadow-2xl"
      style={{ maxWidth: open ? "min(560px, calc(100vw - 24px))" : undefined }}
    >
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-black/90 text-white border border-white/20 rounded-sm px-3 py-2 hover:border-primary"
          aria-label="Open structured data debug panel"
        >
          <Braces className="h-3.5 w-3.5 text-primary" />
          <span className="uppercase tracking-widest">JSON-LD</span>
          <span className="text-white/60">({blocks.length})</span>
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
      )}
      {open && (
        <div className="bg-black/95 text-white border border-white/20 rounded-sm overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <Braces className="h-3.5 w-3.5 text-primary" />
              <span className="uppercase tracking-widest">Structured data</span>
              <span className="text-white/50">· {summary}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 hover:text-primary"
                aria-label="Collapse"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  window.localStorage.removeItem("debugSchema");
                  setEnabled(false);
                }}
                className="p-1 hover:text-primary"
                aria-label="Dismiss debug panel"
                title="Hide (reload with ?debug=schema to bring back)"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="px-3 py-2 text-white/60 border-b border-white/10">
            <span className="text-white/80">Page:</span> {pageUrl}
          </div>

          <div className="max-h-[55vh] overflow-y-auto divide-y divide-white/10">
            {blocks.length === 0 && (
              <div className="p-4 text-white/60">
                No <code className="text-primary">application/ld+json</code> found on this route.
              </div>
            )}
            {blocks.map((b, i) => {
              const type =
                b.parsed && typeof b.parsed === "object"
                  ? (b.parsed as { "@type"?: string })["@type"] ?? "unknown"
                  : "invalid";
              return (
                <div key={i} className="p-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="uppercase tracking-widest text-primary">#{i + 1}</span>
                      <span className="text-white/80">{type}</span>
                      {b.error && <span className="text-red-400">· parse error</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => copy(b.pretty, i)}
                      className="inline-flex items-center gap-1 border border-white/20 rounded-sm px-2 py-1 hover:border-primary"
                    >
                      <Copy className="h-3 w-3" /> {copiedIdx === i ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap break-words text-white/90 bg-white/[0.03] border border-white/10 rounded-sm p-2 leading-snug">
                    {b.pretty}
                  </pre>
                  {b.error && <div className="mt-2 text-red-400">{b.error}</div>}
                </div>
              );
            })}
          </div>

          <div className="px-3 py-2 border-t border-white/10 text-white/50">
            Toggle with <code className="text-primary">?debug=schema</code> /{" "}
            <code className="text-primary">?debug=off</code>. Auto-on in dev.
          </div>
        </div>
      )}
    </div>
  );
}
