import { Link } from "@tanstack/react-router";
import { SITE, SERVICES, GEO_PAGES, NAV_PRIMARY } from "@/lib/site";

const LOCATION_PAGES: ReadonlyArray<{ slug: string; label: string }> = [
  { slug: "chilliwack", label: "Chilliwack" },
  { slug: "abbotsford", label: "Abbotsford" },
  { slug: "langley", label: "Langley" },
  { slug: "aldergrove", label: "Aldergrove" },
  { slug: "surrey", label: "Surrey" },
  { slug: "maple-ridge", label: "Maple Ridge" },
  { slug: "pitt-meadows", label: "Pitt Meadows" },
  { slug: "agassiz", label: "Agassiz" },
  { slug: "harrison-hot-springs", label: "Harrison Hot Springs" },
  { slug: "hope", label: "Hope" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-steel">
      <div className="container-industrial py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-xl uppercase">{SITE.name}</div>
          <p className="mt-3 text-sm text-muted-foreground">{SITE.tagline}</p>
          <div className="mt-4 text-sm">
            <a href={SITE.phoneHref} className="block text-primary font-semibold">{SITE.phone}</a>
            <a href={SITE.emailHref} className="block text-muted-foreground break-all">{SITE.email}</a>
            <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{SITE.territory}</div>
          </div>
        </div>
        <FooterCol title="Company" items={NAV_PRIMARY} />
        <FooterCol title="Services" items={SERVICES} />
        <FooterCol title="Service Areas" items={GEO_PAGES} />
      </div>
      <div className="border-t border-border/60">
        <div className="container-industrial py-8">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Service Areas — Fraser Valley & Metro Vancouver</div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {LOCATION_PAGES.map((l) => (
              <li key={l.slug}>
                <a href={`/locations/${l.slug}`} className="text-foreground/80 hover:text-primary transition">
                  Chain link fencing in {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-industrial py-4 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span className="uppercase tracking-widest">Serving the Fraser Valley since 2010</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: readonly { to: string; label: string }[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{title}</div>
      <ul className="space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="text-foreground/80 hover:text-primary transition">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
