import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell";
import { listLeads, updateLeadStatus } from "@/lib/leads.functions";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, RefreshCw, Mail, Phone, MapPin, Download, Search } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  head: () => ({
    meta: [
      { title: "Leads — LS Fencing Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LeadsAdmin,
});

type Lead = {
  id: string;
  created_at: string;
  service: string;
  linear_feet: number | null;
  fence_height: string | null;
  gate: string | null;
  city: string;
  postal: string | null;
  timeline: string | null;
  name: string;
  phone: string;
  email: string;
  notes: string | null;
  status: string;
  source: string | null;
};

const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;

function LeadsAdmin() {
  const router = useRouter();
  const fetchLeads = useServerFn(listLeads);
  const setStatus = useServerFn(updateLeadStatus);

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: () => fetchLeads(),
  });

  const [busyId, setBusyId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const leads = (data?.leads ?? []) as Lead[];

  const services = useMemo(
    () => Array.from(new Set(leads.map((l) => l.service).filter(Boolean))).sort(),
    [leads],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (serviceFilter !== "all" && l.service !== serviceFilter) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      const hay = [
        l.name, l.email, l.phone, l.city, l.postal, l.service, l.notes, l.gate,
      ].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [leads, query, serviceFilter, statusFilter]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.navigate({ to: "/auth" });
  };

  const changeStatus = async (id: string, status: (typeof STATUSES)[number]) => {
    setBusyId(id);
    try {
      await setStatus({ data: { id, status } });
      await refetch();
    } finally {
      setBusyId(null);
    }
  };

  const exportCsv = () => {
    const cols: (keyof Lead)[] = [
      "created_at","name","phone","email","service","linear_feet","fence_height",
      "gate","city","postal","timeline","status","source","notes","id",
    ];
    const esc = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = [cols.join(",")].concat(
      filtered.map((l) => cols.map((c) => esc(l[c])).join(",")),
    );
    const blob = new Blob(["\uFEFF" + rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
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
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Admin</div>
            <h1 className="font-display uppercase text-3xl md:text-4xl">Leads inbox</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filtered.length} of {leads.length} submissions.
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
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 border border-border rounded-sm px-4 py-2 text-xs uppercase tracking-wider"
            >
              <RefreshCw className={"h-3.5 w-3.5 " + (isRefetching ? "animate-spin" : "")} /> Refresh
            </button>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 border border-border rounded-sm px-4 py-2 text-xs uppercase tracking-wider"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] mb-6">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, city, email, notes…"
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background border border-border rounded-sm px-3 py-2.5 text-xs uppercase tracking-widest"
          >
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {isLoading && (
          <div className="border border-border rounded-sm bg-card p-10 flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading leads…
          </div>
        )}

        {isError && (
          <div className="border border-destructive/40 rounded-sm bg-destructive/10 p-6 text-sm text-destructive">
            {(error as Error)?.message ?? "Could not load leads."}
            <div className="mt-2 text-xs text-muted-foreground">
              If this says "Forbidden", your user does not have the admin role yet.
            </div>
          </div>
        )}

        {data && filtered.length === 0 && !isLoading && (
          <div className="border border-border rounded-sm bg-card p-10 text-sm text-muted-foreground">
            {leads.length === 0
              ? "No leads yet. New submissions from the contact form will land here."
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
                  </div>
                  <h2 className="font-display uppercase text-lg mt-1">{l.name} — {l.service}</h2>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Phone className="h-3.5 w-3.5" />{l.phone}</a>
                    <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Mail className="h-3.5 w-3.5" />{l.email}</a>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{l.city}{l.postal ? `, ${l.postal}` : ""}</span>
                  </div>
                </div>
                <select
                  value={l.status}
                  disabled={busyId === l.id}
                  onChange={(e) => changeStatus(l.id, e.target.value as (typeof STATUSES)[number])}
                  className="bg-background border border-border rounded-sm px-3 py-2 text-xs uppercase tracking-widest"
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </header>

              <dl className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Cell label="Linear feet" value={l.linear_feet ? `${l.linear_feet} ft` : "—"} />
                <Cell label="Height" value={l.fence_height ?? "—"} />
                <Cell label="Gate" value={l.gate ?? "—"} />
                <Cell label="Timeline" value={l.timeline ?? "—"} />
              </dl>

              {l.notes && (
                <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-3 whitespace-pre-wrap">{l.notes}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}
