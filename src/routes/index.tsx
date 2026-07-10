import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, CtaStrip } from "@/components/PageShell";
import { SERVICES, GEO_PAGES, SITE } from "@/lib/site";
import { ArrowRight, Phone, ShieldCheck, Hammer, MapPin } from "lucide-react";
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

type Feature = { to: string; src: string; label: string; sub: string };
const FEATURES: Feature[] = [
  { to: "/chain-link-fencing", src: chainlinkImg.url, label: "Chain Link Fencing", sub: "Chilliwack, BC" },
  { to: "/commercial-chain-link-fencing", src: commercialImg.url, label: "Commercial Chain Link", sub: "8ft Galvanized" },
  { to: "/residential-chain-link-fencing", src: residentialImg.url, label: "Residential Chain Link", sub: "4ft Galvanized" },
  { to: "/cedar-fencing", src: cedarImg.url, label: "Cedar Fencing", sub: "Horizontal Slat" },
  { to: "/ornamental-fencing", src: ornamentalImg.url, label: "Ornamental Fencing", sub: "Chilliwack, BC" },
  { to: "/barrier-gates", src: barrierImg.url, label: "Barrier Gates & Rails", sub: "Galvanized" },
  { to: "/metal-gates", src: metalGateImg.url, label: "Metal Gates", sub: "Abbotsford, BC" },
  { to: "/welding-services", src: weldingImg.url, label: "Welding Services", sub: "Shop & On-Site" },
  { to: "/excavation-services", src: excavationImg.url, label: "Excavation Services", sub: "Kubota KX033" },
  { to: "/snow-removal", src: snowImg.url, label: "Snow Removal", sub: "Fraser Valley" },
  { to: "/gallery", src: cantileverImg.url, label: "Cantilever Gates", sub: "Abbotsford, BC" },
];




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
  const rotating = SERVICES.map((s) => s.label);
  const [idx, setIdx] = useState(0);
  const [featureStart, setFeatureStart] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 2200);
    return () => clearInterval(id);
  }, [rotating.length]);
  useEffect(() => {
    const id = setInterval(() => setFeatureStart((i) => (i + 3) % FEATURES.length), 4000);
    return () => clearInterval(id);
  }, []);
  const visibleFeatures = Array.from({ length: 3 }, (_, i) => FEATURES[(featureStart + i) % FEATURES.length]);


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
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">{img.sub}</div>
                  <div className="font-display uppercase text-lg mt-1">{img.label}</div>
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
          {SERVICES.map((s) => {
            const img = FEATURES.find((f) => f.to === s.to);
            return (
              <Link
                key={s.to}
                to={s.to}
                className="group relative overflow-hidden border border-border bg-card rounded-sm hover:border-primary transition aspect-[4/3]"
              >
                {img && (
                  <img
                    src={img.src}
                    alt={s.label}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
                <div className="relative h-full flex flex-col justify-end p-6">
                  <Hammer className="h-5 w-5 text-primary mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="font-display uppercase text-lg">{s.label}</div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>
              </Link>
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

      <CtaStrip />
    </PageShell>
  );
}
