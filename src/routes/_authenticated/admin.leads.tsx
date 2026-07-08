import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PageShell } from "@/components/PageShell";
import {
  listLeads,
  updateLeadStatus,
  getEmailTemplate,
  saveEmailTemplate,
  sendTestEmail,
} from "@/lib/leads.functions";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2, LogOut, RefreshCw, Mail, Phone, MapPin, Download, Search,
  Send, Save, CheckCircle2, XCircle, Clock, AlertTriangle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  delivery_status: string;
  retry_count: number;
  last_delivery_error: string | null;
  delivered_at: string | null;
};

const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;

function LeadsAdmin() {
  const router = useRouter();
  const fetchLeads = useServerFn(listLeads);
  const setStatus = useServerFn(updateLeadStatus);
  const fetchTemplate = useServerFn(getEmailTemplate);
  const saveTemplate = useServerFn(saveEmailTemplate);
  const sendTest = useServerFn(sendTestEmail);

  const leadsQ = useQuery({ queryKey: ["admin", "leads"], queryFn: () => fetchLeads() });
  const tplQ = useQuery({ queryKey: ["admin", "email-template"], queryFn: () => fetchTemplate() });

  const [busyId, setBusyId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deliveryFilter, setDeliveryFilter] = useState("all");

  const [subject, setSubject] = useState("");
  const [intro, setIntro] = useState("");
  const [footer, setFooter] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => {
    if (tplQ.data?.template) {
      setSubject(tplQ.data.template.subject);
      setIntro(tplQ.data.template.intro);
      setFooter(tplQ.data.template.footer);
    }
  }, [tplQ.data?.template]);

  const saveMut = useMutation({
    mutationFn: () => saveTemplate({ data: { subject, intro, footer } }),
    onSuccess: () => {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2500);
      tplQ.refetch();
    },
  });

  const testMut = useMutation({
    mutationFn: () => sendTest(),
    onSuccess: (r) => {
      setTestResult(
        r.ok
          ? { ok: true, msg: `Test sent after ${r.attempts} attempt(s). Check the inbox.` }
          : { ok: false, msg: `Failed after ${r.attempts} attempts: ${r.error}` },
      );
      setTimeout(() => setTestResult(null), 6000);
    },
    onError: (e) => setTestResult({ ok: false, msg: (e as Error).message }),
  });

  const leads = (leadsQ.data?.leads ?? []) as Lead[];

  const services = useMemo(
    () => Array.from(new Set(leads.map((l) => l.service).filter(Boolean))).sort(),
    [leads],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (serviceFilter !== "all" && l.service !== serviceFilter) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (deliveryFilter !== "all" && l.delivery_status !== deliveryFilter) return false;
      if (!q) return true;
      const hay = [l.name, l.email, l.phone, l.city, l.postal, l.service, l.notes, l.gate]
        .filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [leads, query, serviceFilter, statusFilter, deliveryFilter]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.navigate({ to: "/auth" });
  };

  const changeStatus = async (id: string, status: (typeof STATUSES)[number]) => {
    setBusyId(id);
    try {
      await setStatus({ data: { id, status } });
      await leadsQ.refetch();
    } finally {
      setBusyId(null);
    }
  };

  const exportCsv = () => {
    const cols: (keyof Lead)[] = [
      "created_at","name","phone","email","service","linear_feet","fence_height",
      "gate","city","postal","timeline","status","delivery_status","retry_count",
      "last_delivery_error","source","notes","id",
    ];
    const esc = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = [cols.join(",")].concat(filtered.map((l) => cols.map((c) => esc(l[c])).join(",")));
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

  // Live preview computed from current editor state
  const livePreview = useMemo(() => {
    const p = tplQ.data?.preview;
    if (!p) return null;
    const lead = tplQ.data!.sample;
    const tokenize = (s: string) =>
      s.replace(/\{\{name\}\}/g, lead.name)
        .replace(/\{\{service\}\}/g, lead.service)
        .replace(/\{\{city\}\}/g, lead.city)
        .replace(/\{\{phone\}\}/g, lead.phone)
        .replace(/\{\{email\}\}/g, lead.email);
    const subj = tokenize(subject || p.subject);
    // Swap intro/footer in the server-rendered HTML with the live-edited versions.
    let html = p.html;
    html = html.replace(
      /<p style="margin:0 0 16px;[^"]*">[^<]*<\/p>/,
      `<p style="margin:0 0 16px;font-size:15px;line-height:1.5;">${escapeHtml(tokenize(intro || p.text.split("\n")[0]))}</p>`,
    );
    html = html.replace(
      /<p style="margin:20px 0 0;[^"]*">[^<]*<\/p>/,
      `<p style="margin:20px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">${escapeHtml(tokenize(footer || ""))}</p>`,
    );
    return { subject: subj, html };
  }, [subject, intro, footer, tplQ.data]);

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
            <button onClick={exportCsv} disabled={filtered.length === 0}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-sm px-4 py-2 text-xs uppercase tracking-wider disabled:opacity-50">
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
            <button onClick={() => leadsQ.refetch()}
              className="inline-flex items-center gap-2 border border-border rounded-sm px-4 py-2 text-xs uppercase tracking-wider">
              <RefreshCw className={"h-3.5 w-3.5 " + (leadsQ.isRefetching ? "animate-spin" : "")} /> Refresh
            </button>
            <button onClick={signOut}
              className="inline-flex items-center gap-2 border border-border rounded-sm px-4 py-2 text-xs uppercase tracking-wider">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>

        {/* Email template manager */}
        <div className="mb-10 border border-border rounded-sm bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h2 className="font-display uppercase text-lg">Notification email template</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sent to lsfencingandmetalwork@gmail.com on every new lead. Tokens: {"{{name}} {{service}} {{city}} {{phone}} {{email}}"}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => testMut.mutate()} disabled={testMut.isPending}
                className="inline-flex items-center gap-2 border border-border rounded-sm px-4 py-2 text-xs uppercase tracking-wider disabled:opacity-50">
                {testMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                Send test email
              </button>
              <button onClick={() => saveMut.mutate()} disabled={saveMut.isPending || tplQ.isLoading}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-sm px-4 py-2 text-xs uppercase tracking-wider disabled:opacity-50">
                {saveMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Save template
              </button>
            </div>
          </div>

          {(savedFlash || testResult) && (
            <div className={"px-5 py-3 text-sm border-b border-border flex items-center gap-2 " +
              (testResult && !testResult.ok ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary")}>
              {testResult && !testResult.ok ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              {savedFlash && !testResult ? "Template saved." : testResult?.msg}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-5 space-y-4 border-b lg:border-b-0 lg:border-r border-border">
              <TplField label="Subject line" value={subject} onChange={setSubject} maxLength={200} />
              <TplField label="Intro paragraph" value={intro} onChange={setIntro} maxLength={1000} rows={3} />
              <TplField label="Footer note" value={footer} onChange={setFooter} maxLength={1000} rows={2} />
            </div>
            <div className="p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Live preview</div>
              <div className="text-xs text-muted-foreground mb-3">
                <span className="font-semibold text-foreground">Subject:</span> {livePreview?.subject ?? "—"}
              </div>
              <div className="border border-border rounded-sm overflow-hidden bg-white h-[420px]">
                {livePreview ? (
                  <iframe title="Email preview" srcDoc={livePreview.html} className="w-full h-full bg-white" />
                ) : (
                  <div className="p-6 text-sm text-muted-foreground">Loading preview…</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] mb-6">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, city, email, notes…"
              className="w-full bg-background border border-border rounded-sm pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </label>
          <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}
            className="bg-background border border-border rounded-sm px-3 py-2.5 text-xs uppercase tracking-widest">
            <option value="all">All services</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background border border-border rounded-sm px-3 py-2.5 text-xs uppercase tracking-widest">
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={deliveryFilter} onChange={(e) => setDeliveryFilter(e.target.value)}
            className="bg-background border border-border rounded-sm px-3 py-2.5 text-xs uppercase tracking-widest">
            <option value="all">All delivery</option>
            <option value="sent">Sent</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
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

        {leadsQ.data && filtered.length === 0 && !leadsQ.isLoading && (
          <div className="border border-border rounded-sm bg-card p-10 text-sm text-muted-foreground">
            {leads.length === 0 ? "No leads yet." : "No leads match your filters."}
          </div>
        )}

        <div className="grid gap-4">
          {filtered.map((l) => (
            <article key={l.id} className="border border-border rounded-sm bg-card p-5">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground flex flex-wrap items-center gap-2">
                    <span>{new Date(l.created_at).toLocaleString()} · {l.source ?? "web"}</span>
                    <DeliveryBadge lead={l} />
                  </div>
                  <h2 className="font-display uppercase text-lg mt-1">{l.name} — {l.service}</h2>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Phone className="h-3.5 w-3.5" />{l.phone}</a>
                    <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Mail className="h-3.5 w-3.5" />{l.email}</a>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{l.city}{l.postal ? `, ${l.postal}` : ""}</span>
                  </div>
                </div>
                <select value={l.status} disabled={busyId === l.id}
                  onChange={(e) => changeStatus(l.id, e.target.value as (typeof STATUSES)[number])}
                  className="bg-background border border-border rounded-sm px-3 py-2 text-xs uppercase tracking-widest">
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

              {l.delivery_status === "failed" && l.last_delivery_error && (
                <p className="mt-3 text-xs text-destructive border-t border-destructive/30 pt-2">
                  Delivery error after {l.retry_count} attempt(s): {l.last_delivery_error}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function DeliveryBadge({ lead }: { lead: Lead }) {
  const s = lead.delivery_status;
  const base = "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-widest border";
  if (s === "sent") return <span className={base + " border-green-600/40 bg-green-600/10 text-green-500"}><CheckCircle2 className="h-3 w-3" /> Sent{lead.retry_count > 0 ? ` · ${lead.retry_count + 1}×` : ""}</span>;
  if (s === "failed") return <span className={base + " border-destructive/40 bg-destructive/10 text-destructive"}><XCircle className="h-3 w-3" /> Failed · {lead.retry_count} tries</span>;
  return <span className={base + " border-border bg-muted text-muted-foreground"}><Clock className="h-3 w-3" /> Pending</span>;
}

function TplField({ label, value, onChange, maxLength, rows }: {
  label: string; value: string; onChange: (v: string) => void; maxLength: number; rows?: number;
}) {
  const cls = "w-full bg-background border border-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-primary";
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
      {rows ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} maxLength={maxLength} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} className={cls} />
      )}
      <div className="text-[10px] text-muted-foreground mt-1">{value.length}/{maxLength}</div>
    </div>
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

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
