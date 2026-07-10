import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Check, ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { trackNavClick, utmSearch } from "@/lib/analytics";

export type ServiceContentProps = {
  intro: string;
  highlights: string[];
  applications: { title: string; body: string }[];
  specs?: { label: string; value: string }[];
  faq?: { q: string; a: string }[];
  related?: { to: string; label: string }[];
  swatch?: string; // fallback tailwind gradient class
  image?: { src: string; alt: string; title?: string; caption?: string };
  /** When true, hero image is eager + fetchpriority high (use on above-the-fold LCP). */
  priorityImage?: boolean;
  children?: ReactNode;
};

export function ServiceContent({
  intro,
  highlights,
  applications,
  specs,
  faq,
  related,
  swatch = "from-zinc-800 via-zinc-900 to-black",
  image,
  children,
}: ServiceContentProps) {
  return (
    <section className="container-industrial py-16">
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <p className="text-lg text-foreground/85 leading-relaxed">{intro}</p>

          <figure className={`relative h-64 md:h-96 rounded-sm border border-border overflow-hidden ${image ? "bg-muted" : `bg-gradient-to-br ${swatch}`}`}>
            {image ? (
              <img
                src={image.src}
                alt={image.alt}
                title={image.title ?? image.alt}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 12px)" }}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />
            <figcaption className="absolute bottom-4 left-5 right-5 text-xs uppercase tracking-[0.3em] text-white/85">
              {image?.caption ?? "Fraser Valley · Lower Mainland"}
            </figcaption>
          </figure>

          <div>
            <h2 className="font-display uppercase text-2xl mb-4">What you get</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 border border-border rounded-sm bg-card px-4 py-3 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display uppercase text-2xl mb-4">Common applications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {applications.map((a) => (
                <article key={a.title} className="border border-border rounded-sm bg-card p-5">
                  <h3 className="font-display uppercase text-lg text-primary">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                </article>
              ))}
            </div>
          </div>

          {specs && specs.length > 0 && (
            <div>
              <h2 className="font-display uppercase text-2xl mb-4">Specs at a glance</h2>
              <dl className="grid sm:grid-cols-2 gap-0 border border-border rounded-sm bg-card overflow-hidden">
                {specs.map((s, i) => (
                  <div key={s.label} className={`flex justify-between gap-4 p-4 ${i % 2 === 1 ? "sm:border-l" : ""} border-border ${i < specs.length - (specs.length % 2 === 0 ? 2 : 1) ? "border-b" : ""}`}>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                    <dd className="text-sm text-foreground text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {faq && faq.length > 0 && (
            <div>
              <h2 className="font-display uppercase text-2xl mb-4">Frequently asked</h2>
              <div className="divide-y divide-border border border-border rounded-sm bg-card">
                {faq.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-semibold">
                      {f.q}
                      <span className="text-primary text-xl leading-none group-open:rotate-45 transition">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {children}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 self-start">
          <div className="border border-border rounded-sm bg-card p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Fast quote</div>
            <div className="mt-1 font-display text-xl uppercase">Talk to the crew</div>
            <p className="mt-3 text-sm text-muted-foreground">Same-day callback across the Fraser Valley & Lower Mainland.</p>
            <a href={SITE.phoneHref} className="mt-4 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 uppercase text-sm font-semibold tracking-wide rounded-sm">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <Link to="/contact" className="mt-2 flex items-center justify-center gap-2 border border-border py-3 uppercase text-xs font-semibold tracking-wide rounded-sm hover:bg-accent">
              Request quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {related && related.length > 0 && <RelatedList related={related} />}
        </aside>
      </div>
    </section>
  );
}

function RelatedList({ related }: { related: { to: string; label: string }[] }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const fromSlug = pathname.replace(/^\//, "").replace(/\/$/, "") || "home";
  return (
    <div className="border border-border rounded-sm bg-card p-6">
      <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Related services</div>
      <ul className="space-y-2">
        {related.map((r) => {
          const utm = {
            utm_source: "site",
            utm_medium: "internal",
            utm_campaign: "service-related",
            utm_content: `${fromSlug}__${r.to.replace(/^\//, "")}`,
          };
          return (
            <li key={r.to}>
              <Link
                to={r.to}
                search={utmSearch(utm)}
                onClick={() =>
                  trackNavClick({
                    surface: "service-related",
                    to: r.to,
                    label: r.label,
                    from: pathname,
                    ...utm,
                  })
                }
                data-testid={`related-link-${r.to.replace(/^\//, "")}`}
                className="text-sm hover:text-primary flex items-center gap-2"
              >
                <ArrowRight className="h-3.5 w-3.5" /> {r.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
