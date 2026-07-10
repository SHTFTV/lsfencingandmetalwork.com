import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { SITE } from "@/lib/site";
import { Phone } from "lucide-react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section className="relative border-b border-border grid-lines">
      <div className="container-industrial py-16 md:py-24 relative">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">{eyebrow}</div>
        )}
        <h1 className="text-4xl md:text-6xl font-display uppercase max-w-4xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function CtaStrip() {
  return (
    <section className="border-y border-border bg-card">
      <div className="container-industrial py-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Free quotes · Fully insured</div>
          <div className="mt-1 font-display text-2xl uppercase">Ready to fence your property?</div>
        </div>
        <div className="flex gap-2">
          <a href={SITE.phoneHref} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 uppercase text-sm font-semibold tracking-wide rounded-sm">
            <Phone className="h-4 w-4" /> {SITE.phone}
          </a>
          <Link to="/contact" className="inline-flex items-center gap-2 border border-border px-5 py-3 uppercase text-sm font-semibold tracking-wide rounded-sm hover:bg-accent">
            Request Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

export function StubBody({ points }: { points?: string[] }) {
  return (
    <section className="container-industrial py-16">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4 text-foreground/85 leading-relaxed">
          <p>
            LS Fencing & Metal Work is a family-run Fraser Valley contractor building
            chain link, cedar, and ornamental fencing, barrier gates, metal hand rails,
            custom driveway gates, and on-site welding across the Lower Mainland. One
            crew, in-house fabrication, our own excavation kit — no subcontractors, no
            surprises on the invoice.
          </p>
          <p>
            Every quote is written on-site and itemized so you can compare it line-for-line
            against anyone else. Galvanized and black vinyl-coated chain link, western red
            cedar privacy fences, powder-coated ornamental steel, MMCD-spec handrails, and
            fully welded custom gates — priced competitively and built to outlast the
            catalogue installs the national crews drop on top of your grade.
          </p>
          {points && (
            <ul className="grid gap-2 pt-4">
              {points.map((p) => (
                <li key={p} className="flex gap-3 border-l-2 border-primary pl-4 py-2 bg-card/40">
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="grid sm:grid-cols-2 gap-2 pt-6">
            {[
              { to: "/chain-link-fencing", label: "Chain Link Fencing" },
              { to: "/cedar-fencing", label: "Cedar Fencing" },
              { to: "/ornamental-fencing", label: "Ornamental Fencing" },
              { to: "/barrier-gates", label: "Barrier Gates & Hand Rails" },
              { to: "/metal-gates", label: "Custom Metal Gates" },
              { to: "/welding-services", label: "Welding Services" },
              { to: "/excavation-services", label: "Excavation & Post Drilling" },
              { to: "/pricing", label: "Pricing Guide" },
            ].map((l) => (
              <a
                key={l.to}
                href={l.to}
                className="block border border-border bg-card px-4 py-3 rounded-sm hover:border-primary transition text-sm"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <aside className="border border-border rounded-sm p-6 bg-card h-fit">
          <div className="text-xs uppercase tracking-widest text-primary">Free quote</div>
          <div className="mt-1 font-display text-xl uppercase">Talk to the crew</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Same-day callback across the Fraser Valley & Lower Mainland. On-site walk-through,
            written itemized quote, no pressure sales.
          </p>
          <a href={SITE.phoneHref} className="mt-4 block text-center bg-primary text-primary-foreground py-3 uppercase text-sm font-semibold tracking-wide rounded-sm">
            {SITE.phone}
          </a>
          <Link to="/contact" className="mt-2 block text-center border border-border py-3 uppercase text-xs font-semibold tracking-wide rounded-sm hover:bg-accent">
            Request Quote Form
          </Link>
          <div className="mt-5 pt-5 border-t border-border text-xs text-muted-foreground space-y-1">
            <div>· Fully insured & WCB covered</div>
            <div>· In-house welding shop</div>
            <div>· Family-run since 2013</div>
            <div>· One-year workmanship warranty</div>
          </div>
        </aside>
      </div>
    </section>
  );
}

