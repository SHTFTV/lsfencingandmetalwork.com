import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : "/admin/leads",
  }),
  head: () => ({
    meta: [
      { title: "Staff sign in — LS Fencing" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function AuthPage() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setErr("Enter a valid email and a password (6+ chars).");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    const safeNext = next.startsWith("/") ? next : "/admin/leads";
    navigate({ to: safeNext });
  };

  return (
    <PageShell>
      <section className="container-industrial py-20 max-w-md">
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Staff area</div>
        <h1 className="font-display uppercase text-3xl md:text-4xl">Sign in</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Internal access only. Customers — please use the <a href="/contact" className="text-primary underline">contact form</a>.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4 border border-border rounded-sm bg-card p-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary"
              autoComplete="current-password"
              required
            />
          </div>
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex justify-center items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold uppercase tracking-wide rounded-sm disabled:opacity-60"
          >
            {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : <><LogIn className="h-4 w-4" /> Sign in</>}
          </button>
        </form>
      </section>
    </PageShell>
  );
}
