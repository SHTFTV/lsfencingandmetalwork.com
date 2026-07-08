import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell";
import { listLeads } from "@/lib/leads.functions";
import {
  Loader2, RefreshCw, Mail, Phone, MapPin, Download, Search, ImageIcon, ArrowLeft,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/gallery-leads")({
  head: () => ({
    meta: [
      { title: "Gallery leads — LS Fencing Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GalleryLeadsAdmin,
});

type Lead = {
  id: string;
  created_at: string;
  service: string;
  city: string;
  postal: string | null;
  name: string;
  phone: string;
  email: string;
  notes: string | null;
  status: string;
  source: string | null;
  delivery_status: string;
};

// Extract the gallery photo slug that /contact appends to notes on submit:
// "[from gallery photo: <slug>]"
const PHOTO_TAG_RE = /\[from gallery photo:\s*([a-z0-9-]+)\]/i;
function extractPhotoSlug(notes: string | null): string | null {
  if (!notes) return null;
  const m = notes.match(PHOTO_TAG_RE);
  return m?.[1] ?? null;
}

const GALLERY_SOURCES = new Set(["gallery-tile", "gallery-lightbox"]);

function GalleryLeadsAdmin() {
  const fetchLeads = useServerFn(listLeads);
  const leadsQ = useQuery({
    queryKey: ["admin", "leads", "gallery"],
    queryFn: () => fetchLeads(),
  });

  const [query, setQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "gallery-tile" | "gallery-lightbox">("all");
  const [photoFilter, setPhotoFilter] = useState("all");

  const all = (leadsQ.data?.leads ?? []) as Lead[];
  // Only leads whose source or notes indicate a gallery origin.
  const galleryLeads = useMemo(
    () =>
      all
        .map((l) => ({ ...l, photoSlug: extractPhotoSlug(l.notes) }))
        .filter((l) => (l.source && GALLERY_SOURCES.has(l.source)) || l.photoSlug),
    [all],
  );

  const services = useMemo(
    () => Array.from(new Set(galleryLeads.map((l) => l.service))).sort(),
    [galleryLeads],
  );
  const photos = useMemo(
    () =>
      Array.from(
        new Set(galleryLeads.map((l) => l.photoSlug).filter((s): s is string => Boolean(s))),
      ).sort(),
    [galleryLeads],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return galleryLeads.filter((l) => {
      if (serviceFilter !== "all" && l.service !== serviceFilter) return false;
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
      if (photoFilter !== "all" && l.photoSlug !== photoFilter) return false;
      if (!q) return true;
      const hay = [l.name, l.email, l.phone, l.city, l.service, l.photoSlug ?? "", l.notes ?? ""]
        .join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [galleryLeads, query, serviceFilter, sourceFilter, photoFilter]);

  // Aggregate by photo for a quick "what's converting" glance.
  const byPhoto = useMemo(() => {
    const m = new Map<string, { count: number; service: string }>();
    for (const l of filtered) {
      const key = l.photoSlug ?? "(no photo)";
      const cur = m.get(key);
      m.set(key, { count: (cur?.count ?? 0) + 1, service: l.service });
    }
    return Array.from(m.entries()).sort((a, b) => b[1].count - a[1].count);
  }, [filtered]);

  const exportCsv = () => {
    const cols = [
      "created_at", "photo_slug", "source", "service", "name", "phone",
      "email", "city", "postal", "status", "delivery_status", "notes", "id",
    ] as const;
    const esc = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = [cols.join(",")].concat(
      filtered.map((l) =>
        cols
          .map((c) => {
            if (c === "photo_slug") return esc(l.photoSlug ?? "");
            return esc((l as unknown as Record<string, unknown>)[c]);
          })
          .join(","),
      ),
    );
    const blob = new Blob(["\uFEFF" + rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gallery-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell>
      <section className="container-industrial py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <Link
              to="/admin/leads"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary inline-flex items-center gap-1 mb-3"
            >
              <ArrowLeft className="h-3 w-3" /> All leads
            </Link>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Admin</div>
            <h1 className="font-display uppercase text-3xl md:text-4xl">Gallery leads</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Leads originating from a /gallery tile or lightbox session. Showing {filtered.length} of {galleryLeads.length}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportCsv}
              disabled={filtered.length === 0}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-sm px-4 py-2 text-xs uppercase tracking-wider disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
            <button
              onClick={() => leadsQ.refetch()}
              className="inline-flex items-center gap-2 border border-border rounded-sm px-4 py-2 text-xs uppercase tracking-wider"
            >
              <RefreshCw className={"h-3.5 w-3.5 " + (leadsQ.isRefetching ? "animate-spin" : "")} /> Refresh
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] mb-6">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, city, email, photo slug…"
              className="w-full bg-background border border-border rounded-sm pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </label>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="bg-background border border-border rounded-sm px-3 py-2.5 text-xs uppercase tracking-widest"
          >
            <option value="all">All services</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as typeof sourceFilter)}
            className="bg-background border border-border rounded-sm px-3 py-2.5 text-xs uppercase tracking-widest"
          >
            <option value="all">All surfaces</option>
            <option value="gallery-tile">Tile click</option>
            <option value="gallery-lightbox">Lightbox CTA</option>
          </select>
          <select
            value={photoFilter}
            onChange={(e) => setPhotoFilter(e.target.value)}
            className="bg-background border border-border rounded-sm px-3 py-2.5 text-xs uppercase tracking-widest max-w-[240px]"
          >
            <option value="all">All photos</option>
            {photos.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {leadsQ.isLoading && (
          <div className="border border-border rounded-sm bg-card p-10 flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading leads…
          </div>
        )}

        {leadsQ.isError && (
          <div className="border border-destructive/40 rounded-sm bg-destructive/10 p-6 text-sm text-destructive">
            {(leadsQ.error as Error)?.message ?? "Could not load leads."}
          </div>
        )}

        {byPhoto.length > 0 && (
          <div className="mb-8 border border-border rounded-sm bg-card">
            <div className="border-b border-border px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground">
              Quotes by photo
            </div>
            <ul className="divide-y divide-border">
              {byPhoto.map(([slug, meta]) => (
                <li key={slug} className="flex items-center justify-between gap-4 px-5 py-2 text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <ImageIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{slug}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">
                      · {meta.service}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-primary">{meta.count}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {leadsQ.data && filtered.length === 0 && !leadsQ.isLoading && (
          <div className="border border-border rounded-sm bg-card p-10 text-sm text-muted-foreground">
            {galleryLeads.length === 0
              ? "No gallery-sourced leads yet."
              : "No leads match your filters."}
          </div>
        )}

        <div className="grid gap-4">
          {filtered.map((l) => (
            <article key={l.id} className="border border-border rounded-sm bg-card p-5">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {new Date(l.created_at).toLocaleString()} · {l.source ?? "web"}
                    {l.photoSlug && (
                      <span className="ml-2 inline-flex items-center gap-1 border border-primary/40 bg-primary/10 text-primary px-2 py-0.5 rounded-sm text-[10px] tracking-widest">
                        <ImageIcon className="h-3 w-3" /> {l.photoSlug}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display uppercase text-lg mt-1">{l.name} — {l.service}</h2>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Phone className="h-3.5 w-3.5" />{l.phone}</a>
                    <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Mail className="h-3.5 w-3.5" />{l.email}</a>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{l.city}{l.postal ? `, ${l.postal}` : ""}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest border border-border rounded-sm px-2 py-1">
                  {l.status}
                </span>
              </header>
              {l.notes && (
                <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-3 whitespace-pre-wrap">
                  {l.notes}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
