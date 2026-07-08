import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, CtaStrip } from "@/components/PageShell";
import { SERVICES, GEO_PAGES, SITE } from "@/lib/site";
import { ArrowRight, Phone, ShieldCheck, Hammer, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LS Fencing & Metal Work — Fence, Gate & Welding Contractor" },
      {
        name: "description",
        content:
          "Chain link, cedar, ornamental fencing, custom metal gates, welding, excavation & snow removal across the Fraser Valley & Lower Mainland, BC.",
      },
      { property: "og:title", content: "LS Fencing & Metal Work" },
      { property: "og:description", content: "Fence, gate & metal fabrication crew serving the Fraser Valley." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative border-b border-border grid-lines overflow-hidden">
        <div className="container-industrial py-20 md:py-32 relative">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-5">
            Fraser Valley · Lower Mainland · Since 2010
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase max-w-5xl leading-[0.95]">
            Fences, gates & metal work <span className="text-primary">built to last.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Commercial and residential chain link, cedar, ornamental steel,
            custom gates, welding and site work — installed by a crew that shows up.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 uppercase text-sm font-semibold tracking-wide rounded-sm shadow-[var(--shadow-weld)]">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 border border-border px-6 py-3.5 uppercase text-sm font-semibold tracking-wide rounded-sm hover:bg-accent">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { k: "15+", v: "Years in trade" },
              { k: "1000+", v: "Projects installed" },
              { k: "100%", v: "Fully insured" },
              { k: "24/7", v: "Emergency welding" },
            ].map((s) => (
              <div key={s.v} className="border-l-2 border-primary pl-4">
                <div className="font-display text-3xl">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-industrial py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary">What we build</div>
            <h2 className="font-display text-3xl md:text-4xl uppercase mt-2">Services</h2>
          </div>
          <Link to="/gallery" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground">
            See gallery →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group border border-border bg-card p-6 rounded-sm hover:border-primary transition flex items-center justify-between"
            >
              <div>
                <Hammer className="h-5 w-5 text-primary mb-3" />
                <div className="font-display uppercase text-lg">{s.label}</div>
              </div>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
            </Link>
          ))}
        </div>
      </section>

      {/* Territory */}
      <section className="border-y border-border bg-card">
        <div className="container-industrial py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Territory</div>
            <h2 className="font-display text-3xl md:text-4xl uppercase mt-2">Serving the Fraser Valley</h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              Based locally with rapid dispatch across Chilliwack, Abbotsford, Langley,
              Surrey, Maple Ridge and the wider Lower Mainland.
            </p>
          </div>
          <div className="grid gap-3">
            {GEO_PAGES.map((g) => (
              <Link key={g.to} to={g.to} className="flex items-center justify-between border border-border p-4 rounded-sm hover:border-primary transition bg-background">
                <span className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /><span className="uppercase tracking-wide">{g.label}</span></span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="container-industrial py-20 grid md:grid-cols-3 gap-6">
        {[
          { icon: ShieldCheck, t: "Fully insured & bonded", d: "WCB coverage and full liability on every job." },
          { icon: Hammer, t: "Own equipment, own crew", d: "Excavators, welders, augers, dumps — no subcontractors." },
          { icon: MapPin, t: "Local to the Valley", d: "Quotes measured on-site, not from a spreadsheet." },
        ].map((f) => (
          <div key={f.t} className="border border-border p-6 rounded-sm bg-card">
            <f.icon className="h-6 w-6 text-primary" />
            <div className="font-display uppercase text-lg mt-3">{f.t}</div>
            <p className="text-sm text-muted-foreground mt-2">{f.d}</p>
          </div>
        ))}
      </section>

      <CtaStrip />
    </PageShell>
  );
}
