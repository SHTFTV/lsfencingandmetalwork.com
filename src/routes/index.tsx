import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, CtaStrip } from "@/components/PageShell";
import { SERVICES, GEO_PAGES, SITE, absoluteUrl } from "@/lib/site";
import { localBusinessScript } from "@/lib/service-schema";
import { POSTS } from "@/lib/blog";
import { trackNavClick, utmSearch } from "@/lib/analytics";
import { ArrowRight, Phone, ShieldCheck, Hammer, MapPin, X, ZoomIn, Calendar } from "lucide-react";
import cantileverImg from "@/assets/gallery/8x16-cantilever-slat-gate-abbotsford.jpg.asset.json";
import commercialImg from "@/assets/gallery/8ft-galv-commercial-security.jpeg.asset.json";
import ornamentalImg from "@/assets/gallery/ornamental-powdercoat-chilliwack.jpeg.asset.json";
import residentialImg from "@/assets/gallery/4ft-galv-residential.jpeg.asset.json";
import cedarImg from "@/assets/gallery/custom-cedar-horizontal-slat.jpg.asset.json";
import chainlinkImg from "@/assets/gallery/black-chainlink-hillside-chilliwack.jpg.asset.json";
import barrierImg from "@/assets/gallery/galvanized-handrail-driveway.jpeg.asset.json";
import metalGateImg from "@/assets/gallery/ornamental-storefront-gate-abbotsford.jpg.asset.json";
import weldingImg from "@/assets/gallery/shop-welding-kubota-fabrication.jpg.asset.json";
import excavationImg from "@/assets/gallery/kubota-kx033-excavator-post-line.jpg.asset.json";
import snowImg from "@/assets/gallery/ls-fencing-truck-skidsteer.jpeg.asset.json";

type Feature = {
  to: string;
  src: string;
  label: string;
  sub: string;
  alt: string;
  title: string;
  desc: string;
};

// Each service card image is verified against the linked service page.
const FEATURES: Feature[] = [
  {
    to: "/chain-link-fencing",
    src: chainlinkImg.url,
    label: "Chain Link Fencing",
    sub: "Chilliwack, BC",
    alt: "Black vinyl-coated chain link fence installed along a rock-wall hillside acreage in Chilliwack BC by LS Fencing",
    title: "Chain link fencing installation — Chilliwack, BC",
    desc: "Galvanized & vinyl-coated chain link for acreages, farms and yards across the Fraser Valley.",
  },
  {
    to: "/commercial-chain-link-fencing",
    src: commercialImg.url,
    label: "Commercial Chain Link",
    sub: "8ft Galvanized",
    alt: "8-foot galvanized chain link commercial security enclosure with covered top installed in the Fraser Valley",
    title: "Commercial chain link security enclosure — Fraser Valley, BC",
    desc: "8ft commercial-grade perimeter security with barbed top and heavy-duty posts.",
  },
  {
    to: "/residential-chain-link-fencing",
    src: residentialImg.url,
    label: "Residential Chain Link",
    sub: "4ft Galvanized",
    alt: "4-foot galvanized chain link residential yard fence with top rail installed in the Fraser Valley",
    title: "Residential chain link fence — Fraser Valley, BC",
    desc: "4ft & 5ft galvanized yard fencing with top rail — clean, pet-safe, and built to last.",
  },
  {
    to: "/cedar-fencing",
    src: cedarImg.url,
    label: "Cedar Fencing",
    sub: "Horizontal Slat",
    alt: "Custom cedar privacy fence with horizontal slats along a stone-paver garden path in the Fraser Valley",
    title: "Custom horizontal-slat cedar privacy fence — Fraser Valley, BC",
    desc: "Custom western red cedar privacy fences — horizontal slat, board-on-board and lattice-top.",
  },
  {
    to: "/ornamental-fencing",
    src: ornamentalImg.url,
    label: "Ornamental Fencing",
    sub: "Chilliwack, BC",
    alt: "Black powder-coated ornamental steel fence panels next to a stone column in Chilliwack BC",
    title: "Powder-coated ornamental steel fence — Chilliwack, BC",
    desc: "Powder-coated ornamental steel panels for estates, front yards and commercial entries.",
  },
  {
    to: "/barrier-gates",
    src: barrierImg.url,
    label: "Barrier Gates & Rails",
    sub: "Maple Ridge, BC",
    alt: "Galvanized pipe MMCD-spec handrail installed along an accessible driveway ramp in Maple Ridge BC",
    title: "MMCD-spec galvanized handrail install — Maple Ridge, BC",
    desc: "MMCD-spec galvanized handrails, bollards and barrier gates for municipal & site work.",
  },
  {
    to: "/metal-gates",
    src: metalGateImg.url,
    label: "Metal Gates",
    sub: "Abbotsford, BC",
    alt: "Black powder-coated ornamental steel storefront swing gate outside an Abbotsford commercial building",
    title: "Custom ornamental storefront metal gate — Abbotsford, BC",
    desc: "Custom fabricated swing, slide and storefront metal gates — designed and built in-shop.",
  },
  {
    to: "/welding-services",
    src: weldingImg.url,
    label: "Welding Services",
    sub: "Shop & On-Site",
    alt: "LS Fencing welder MIG welding a custom steel attachment on a Kubota skid steer inside the fabrication shop in Chilliwack",
    title: "Custom in-shop welding and fabrication — Chilliwack, BC",
    desc: "In-shop and mobile MIG/TIG welding for steel repair, fabrication and equipment attachments.",
  },
  {
    to: "/excavation-services",
    src: excavationImg.url,
    label: "Excavation Services",
    sub: "Kubota KX033",
    alt: "Operator running an orange Kubota KX033-4 mini excavator digging a fence post line in a rural Fraser Valley pasture",
    title: "Excavation and post-line digging with Kubota KX033 — Fraser Valley, BC",
    desc: "Kubota mini-excavator work — post-line trenching, site prep and small-lot digging.",
  },
  {
    to: "/snow-removal",
    src: snowImg.url,
    label: "Snow Removal",
    sub: "Fraser Valley",
    alt: "LS Fencing service truck towing a trailer with a Kubota skid steer used for commercial snow removal in the Fraser Valley",
    title: "Commercial snow removal fleet — Fraser Valley, BC",
    desc: "Commercial snow clearing & salting with skid-steer fleet across the Fraser Valley.",
  },
  {
    to: "/gallery",
    src: cantileverImg.url,
    label: "Cantilever Gates",
    sub: "Abbotsford, BC",
    alt: "8-foot by 16-foot galvanized cantilever slide gate with grey privacy slats securing an Abbotsford industrial yard",
    title: "8×16 cantilever slat gate install — Abbotsford, BC",
    desc: "Heavy-duty cantilever slide gates with privacy slats for industrial and storage yards.",
  },
];





export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LS Fencing & Metal Work — Fraser Valley Fence & Gate Contractor" },
      {
        name: "description",
        content:
          "Chain link, cedar, ornamental fencing, custom metal gates, welding, excavation & snow removal across the Fraser Valley & Lower Mainland, BC. Free on-site quotes.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow, max-image-preview:large" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:title", content: "LS Fencing & Metal Work — Fraser Valley Fence & Gate Contractor" },
      { property: "og:description", content: "Fence, gate & metal fabrication crew serving the Fraser Valley & Lower Mainland, BC." },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:type", content: "website" },
      { property: "og:image", content: commercialImg.url },
      { property: "og:image:alt", content: "8-foot galvanized chain link commercial security enclosure by LS Fencing in the Fraser Valley" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "LS Fencing & Metal Work" },
      { name: "twitter:description", content: "Fence, gate & metal fabrication crew serving the Fraser Valley." },
      { name: "twitter:image", content: commercialImg.url },
      { name: "twitter:image:alt", content: "LS Fencing crew commercial chain link project" },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/") },
      { rel: "preload", as: "image", href: FEATURES[0].src, fetchpriority: "high" },
    ],
    scripts: [
      localBusinessScript(),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: absoluteUrl("/"),
        }),
      },
    ],
  }),
  component: Home,
});


function Home() {
  const rotating = SERVICES.map((s) => s.label);
  const [idx, setIdx] = useState(0);
  const [featureStart, setFeatureStart] = useState(0);
  const [lightbox, setLightbox] = useState<Feature | null>(null);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 2200);
    return () => clearInterval(id);
  }, [rotating.length]);
  useEffect(() => {
    const id = setInterval(() => setFeatureStart((i) => (i + 3) % FEATURES.length), 4000);
    return () => clearInterval(id);
  }, []);
  const visibleFeatures = Array.from({ length: 3 }, (_, i) => FEATURES[(featureStart + i) % FEATURES.length]);

  const openLightbox = useCallback((f: Feature) => setLightbox(f), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox, closeLightbox]);



  return (
    <PageShell>
      {/* Hero */}
      <section className="relative border-b border-border grid-lines overflow-hidden">
        <div className="container-industrial py-20 md:py-32 relative">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-5">
            Fraser Valley · Lower Mainland · Since 2010
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase max-w-5xl leading-[0.95]">
            <span
              key={idx}
              className="block text-primary animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {rotating[idx]}
            </span>
            <span className="block">built to last.</span>
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

          <div className="mt-14 grid sm:grid-cols-3 gap-4">
            {visibleFeatures.map((img, i) => (
              <Link
                key={`${featureStart}-${i}`}
                to={img.to}
                className="group relative block overflow-hidden border border-border rounded-sm bg-card aspect-[4/3] animate-in fade-in duration-700"
              >
                <img
                  src={img.src}
                  alt={`${img.label} — ${img.sub}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">{img.sub}</div>
                  <div className="font-display uppercase text-lg mt-1 leading-tight">{img.label}</div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-snug line-clamp-2">{img.desc}</p>
                </div>

              </Link>
            ))}
          </div>


          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
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
          {SERVICES.map((s, i) => {
            const img = FEATURES.find((f) => f.to === s.to);
            return (
              <article
                key={s.to}
                className="group relative overflow-hidden border border-border bg-card rounded-sm hover:border-primary transition aspect-[4/3]"
              >
                {img && (
                  <button
                    type="button"
                    onClick={() => openLightbox(img)}
                    aria-label={`Preview full-size photo: ${img.title}`}
                    title={img.title}
                    className="absolute inset-0 w-full h-full focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <SmartImage
                      src={img.src}
                      alt={img.alt}
                      title={img.title}
                      priority={i === 0}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition inline-flex items-center gap-1 text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded-sm">
                      <ZoomIn className="h-3 w-3" /> Preview
                    </span>
                  </button>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
                <Link
                  to={s.to}
                  className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`View ${s.label} service page`}
                >
                  <div>
                    <Hammer className="h-5 w-5 text-primary mb-3" />
                    <div className="font-display uppercase text-lg">{s.label}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </article>
            );
          })}
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

      {/* Specialty perimeter work */}
      <section className="border-t border-border bg-card">
        <div className="container-industrial py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary">Specialty</div>
              <h2 className="font-display text-3xl md:text-4xl uppercase mt-2">Specialty perimeter work</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                High-security and regulated perimeters — built to airside, port authority and Health Canada spec across BC.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                to: "/airport-fencing" as const,
                label: "Airport & Airfield",
                sub: "Airside-grade perimeter",
                blurb: "Galvanized chain link, barb toppings and cantilever access to Transport Canada AFR spec.",
              },
              {
                to: "/port-fencing" as const,
                label: "Ports & Terminals",
                sub: "CBSA-grade access",
                blurb: "Marine-rated perimeter, container-yard cantilever gates and controlled truck access.",
              },
              {
                to: "/cannabis-fencing" as const,
                label: "Cannabis Facilities",
                sub: "Licensed producer sites",
                blurb: "Restricted-visibility privacy-slat perimeter aligned with Health Canada physical security.",
              },
            ].map((s) => {
              const utm = {
                utm_source: "site",
                utm_medium: "internal",
                utm_campaign: "specialty-strip",
                utm_content: s.to.replace(/^\//, ""),
              };
              return (
                <Link
                  key={s.to}
                  to={s.to}
                  search={utmSearch(utm)}
                  onClick={() =>
                    trackNavClick({
                      surface: "home-specialty-strip",
                      to: s.to,
                      label: s.label,
                      from: "/",
                      ...utm,
                    })
                  }
                  data-testid={`specialty-link-${s.to.replace(/^\//, "")}`}
                  className="group border border-border rounded-sm bg-background p-6 hover:border-primary transition flex flex-col"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">{s.sub}</div>
                  <div className="font-display uppercase text-lg mt-2">{s.label}</div>
                  <p className="text-sm text-muted-foreground mt-3 flex-1">{s.blurb}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                    Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest from the blog */}
      <section className="border-t border-border bg-background">
        <div className="container-industrial py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-primary">Field notes</div>
              <h2 className="font-display text-3xl md:text-4xl uppercase mt-2">Latest from the blog</h2>
            </div>
            <Link to="/blog" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground">
              All posts →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...POSTS]
              .sort((a, b) => (a.date < b.date ? 1 : -1))
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group border border-border rounded-sm bg-card p-5 hover:border-primary transition flex flex-col"
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={p.date}>
                      {new Date(p.date).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                    </time>
                    <span className="text-muted-foreground normal-case tracking-normal">· {p.readMinutes} min</span>
                  </div>
                  <h3 className="font-display uppercase text-lg mt-3 leading-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">{p.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                    Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaStrip />

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close preview"
            className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-sm border border-border text-foreground/80 hover:text-foreground hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
          >
            <X className="h-5 w-5" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-6xl w-full flex flex-col items-center gap-4">
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              title={lightbox.title}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-sm border border-border"
            />
            <figcaption className="text-center max-w-2xl">
              <div className="text-xs uppercase tracking-[0.3em] text-primary">{lightbox.sub}</div>
              <div className="font-display uppercase text-lg mt-1">{lightbox.label}</div>
              <p className="text-sm text-muted-foreground mt-2">{lightbox.alt}</p>
              <Link
                to={lightbox.to}
                onClick={closeLightbox}
                className="mt-4 inline-flex items-center gap-2 border border-border px-5 py-2.5 uppercase text-xs font-semibold tracking-wide rounded-sm hover:bg-accent"
              >
                View {lightbox.label} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </figcaption>
          </figure>
        </div>
      )}
    </PageShell>
  );
}

function SmartImage({
  src, alt, title, priority, className,
}: {
  src: string;
  alt: string;
  title?: string;
  priority?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-muted animate-pulse"
        />
      )}
      <img
        src={src}
        alt={alt}
        title={title}
        width={1200}
        height={900}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        onLoad={() => setLoaded(true)}
        className={className}
      />
    </>
  );
}

