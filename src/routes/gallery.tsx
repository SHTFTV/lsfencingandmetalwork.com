import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackGalleryEvent } from "@/lib/analytics";

import img4ftGalv from "@/assets/gallery/4ft-galv-residential.jpeg.asset.json";
import img6ftBarb from "@/assets/gallery/6ft-galv-barb-abbotsford.jpeg.asset.json";
import img8ftSecurity from "@/assets/gallery/8ft-galv-commercial-security.jpeg.asset.json";
import imgBlackSchool from "@/assets/gallery/black-vinyl-school-surrey.png.asset.json";
import imgHandrail from "@/assets/gallery/galvanized-handrail-driveway.jpeg.asset.json";
import imgOrnamental from "@/assets/gallery/ornamental-powdercoat-chilliwack.jpeg.asset.json";
import imgExcavation from "@/assets/gallery/excavation-post-drilling.jpeg.asset.json";
import imgBlackPlayground from "@/assets/gallery/black-chainlink-playground.jpeg.asset.json";
import imgPerimeterBarb from "@/assets/gallery/galv-perimeter-barbwire.jpeg.asset.json";
import imgCommercialGate from "@/assets/gallery/commercial-double-swing-gate.jpeg.asset.json";
import imgBaseballBackstop from "@/assets/gallery/baseball-backstop-fraser-valley.jpeg.asset.json";
import imgHighSecurityFarm from "@/assets/gallery/high-security-cantilever-gate-farm.jpeg.asset.json";
import imgCooperRentals from "@/assets/gallery/cooper-rentals-cantilever-langley.png.asset.json";
import imgUtilityEnclosure from "@/assets/gallery/utility-equipment-enclosure.jpeg.asset.json";
import imgTruckSkidsteer from "@/assets/gallery/ls-fencing-truck-skidsteer.jpeg.asset.json";
import imgCustomCedar from "@/assets/gallery/custom-cedar-horizontal-slat.jpg.asset.json";
import imgShopWelding from "@/assets/gallery/shop-welding-kubota-fabrication.jpg.asset.json";
import imgBlackSlatMapleRidge from "@/assets/gallery/black-privacy-slat-chainlink-maple-ridge.jpg.asset.json";
import imgOrnamentalStorefront from "@/assets/gallery/ornamental-storefront-gate-abbotsford.jpg.asset.json";
import imgKubotaExcavator from "@/assets/gallery/kubota-kx033-excavator-post-line.jpg.asset.json";
import imgBlackHillside from "@/assets/gallery/black-chainlink-hillside-chilliwack.jpg.asset.json";
import imgCantileverSlatGate from "@/assets/gallery/8x16-cantilever-slat-gate-abbotsford.jpg.asset.json";




export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Project Gallery — Fences, Gates & Metal Work" },
      { name: "description", content: "Photos of chain link, cedar, ornamental fencing, custom gates and welding jobs across the Fraser Valley." },
      { property: "og:title", content: "Project Gallery — Fences, Gates & Metal Work" },
      { property: "og:description", content: "Proof of work across chain link, cedar, ornamental, gates and welding." },
      { property: "og:url", content: "/gallery" },
      { property: "og:image", content: imgBlackSchool.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: imgBlackSchool.url },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Page,
});

type Item = {
  title: string;
  location: string;
  category: string;
  src: string;
  alt: string;
};

const CATEGORIES = [
  "All",
  "Chain Link",
  "Cedar",
  "Ornamental",
  "Gates",
  "Welding",
  "Excavation",
] as const;

// Map a gallery category to the matching value in the contact form's SERVICE_OPTIONS
// so the CTA can pre-select it via ?service=…
const CATEGORY_TO_SERVICE: Record<string, string> = {
  "Chain Link": "Chain Link Fencing",
  "Cedar": "Cedar Fencing",
  "Ornamental": "Ornamental Fencing",
  "Gates": "Metal / Driveway Gate",
  "Welding": "Welding / Repair",
  "Excavation": "Excavation",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function quoteHrefFor(item: Item) {
  const service = CATEGORY_TO_SERVICE[item.category];
  const params = new URLSearchParams({
    source: "gallery-lightbox",
    photo: slugify(item.title),
  });
  if (service) params.set("service", service);
  return `/contact?${params.toString()}`;
}

const ITEMS: Item[] = [
  { title: "Black vinyl-coated school perimeter", location: "Surrey, BC", category: "Chain Link", src: imgBlackSchool.url, alt: "Completed black vinyl-coated chain link perimeter fence at a school in Surrey BC" },
  { title: "10-ft galvanized security fence with barb", location: "Vancouver, BC", category: "Chain Link", src: imgPerimeterBarb.url, alt: "Tall galvanized chain link perimeter fence with three-strand barbed wire" },
  { title: "8-ft galvanized enclosure with roof", location: "Fraser Valley, BC", category: "Chain Link", src: img8ftSecurity.url, alt: "Tall galvanized chain link commercial security enclosure with covered top" },
  { title: "Heavy-duty ball field backstop", location: "Fraser Valley, BC", category: "Chain Link", src: imgBaseballBackstop.url, alt: "Tall galvanized chain link baseball backstop with overhang and cedar kickboard next to bleachers" },
  { title: "6-ft galvanized with 3-strand barb wire", location: "Abbotsford, BC", category: "Chain Link", src: img6ftBarb.url, alt: "6-foot galvanized chain link fence with three-strand barbed wire in Abbotsford" },
  { title: "Black chain link playground enclosure", location: "Chilliwack, BC", category: "Chain Link", src: imgBlackPlayground.url, alt: "Black vinyl-coated chain link fence enclosing a raised playground area" },
  { title: "4-ft residential galvanized run", location: "Fraser Valley, BC", category: "Chain Link", src: img4ftGalv.url, alt: "4-foot galvanized chain link residential yard fence with top rail" },
  { title: "Utility equipment security enclosure", location: "Fraser Valley, BC", category: "Chain Link", src: imgUtilityEnclosure.url, alt: "Galvanized chain link security cage protecting utility equipment on a concrete pad" },
  { title: "Commercial double-swing chain link gate", location: "Abbotsford, BC", category: "Gates", src: imgCommercialGate.url, alt: "Commercial grade galvanized chain link double swing driveway gate with barrier arms" },
  { title: "Cooper Rentals double cantilever gate", location: "Langley, BC", category: "Gates", src: imgCooperRentals.url, alt: "Custom galvanized double cantilever chain link gate installed for Cooper Rentals in Langley BC" },
  { title: "High-security farm cantilever gate", location: "Fraser Valley, BC", category: "Gates", src: imgHighSecurityFarm.url, alt: "Galvanized cantilever driveway gate securing an industrial farm yard with mountain backdrop" },
  { title: "Powder-coated ornamental steel", location: "Chilliwack, BC", category: "Ornamental", src: imgOrnamental.url, alt: "Black powder-coated ornamental steel fence panels next to a stone column" },
  { title: "MMCD-spec galvanized handrail", location: "Maple Ridge, BC", category: "Welding", src: imgHandrail.url, alt: "Galvanized pipe MMCD-spec handrail installed along an accessible ramp" },
  { title: "Post-hole drilling with skid steer", location: "Fraser Valley, BC", category: "Excavation", src: imgExcavation.url, alt: "Kubota skid steer with hydraulic auger drilling fence post holes on a commercial lot" },
  { title: "LS crew truck & Kubota skid steer", location: "Chilliwack, BC", category: "Excavation", src: imgTruckSkidsteer.url, alt: "LS Fencing service truck loaded with fence pipe towing a trailer with a Kubota skid steer in Chilliwack" },
  { title: "Custom cedar horizontal-slat privacy fence", location: "Fraser Valley, BC", category: "Cedar", src: imgCustomCedar.url, alt: "Custom-built cedar privacy fence with horizontal slats and vertical posts running along a stone-paver garden path" },
  { title: "Black privacy-slat chain link screen", location: "Maple Ridge, BC", category: "Chain Link", src: imgBlackSlatMapleRidge.url, alt: "6-foot black vinyl-coated chain link fence with full-height privacy slats screening an apartment complex in Maple Ridge" },
  { title: "Ornamental storefront fence & swing gate", location: "Abbotsford, BC", category: "Ornamental", src: imgOrnamentalStorefront.url, alt: "Black powder-coated ornamental steel storefront fence with matching pedestrian swing gate outside an Abbotsford commercial building" },
  { title: "In-shop welding & Kubota attachment fabrication", location: "Chilliwack, BC", category: "Welding", src: imgShopWelding.url, alt: "LS Fencing welder MIG welding a custom steel attachment on the arm of an orange Kubota skid steer inside the fabrication shop" },
];


function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpenerIndex = useRef<number | null>(null);

  const openAt = useCallback((i: number) => {
    lastOpenerIndex.current = i;
    const it = ITEMS[i];
    trackGalleryEvent({ name: "gallery_tile_click", index: i, title: it.title, category: it.category });
    trackGalleryEvent({ name: "gallery_lightbox_open", index: i, title: it.title, category: it.category });
    setOpenIndex(i);
  }, []);
  const close = useCallback(() => {
    setOpenIndex((idx) => {
      if (idx !== null) {
        const it = ITEMS[idx];
        trackGalleryEvent({ name: "gallery_lightbox_close", index: idx, title: it.title });
      }
      return null;
    });
    // Return focus to the tile that opened the modal
    requestAnimationFrame(() => {
      const idx = lastOpenerIndex.current;
      if (idx !== null) tileRefs.current[idx]?.focus();
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);


  return (
    <PageShell>
      <PageHero
        eyebrow="Gallery"
        title="Proof of Work"
        intro="Recent chain link, ornamental, gate, welding and excavation work across the Fraser Valley & Lower Mainland. Tap any photo to view it full-size."
      />


      <section className="container-industrial py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <a key={c} href={`#${c.toLowerCase().replace(/\s+/g, "-")}`}
               className="text-xs uppercase tracking-widest border border-border rounded-sm px-3 py-2 hover:border-primary hover:text-primary transition">
              {c}
            </a>
          ))}
        </div>

        <div id="all" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((it, i) => (
            <GalleryTile
              key={i}
              item={it}
              onClick={() => openAt(i)}
              refCallback={(el) => { tileRefs.current[i] = el; }}
            />
          ))}
        </div>






        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <Link to="/projects/heatherbrae-builders-surrey" className="group border border-border rounded-sm bg-card p-5 hover:border-primary transition">
            <div className="text-xs uppercase tracking-widest text-primary">Case study</div>
            <div className="font-display text-lg uppercase mt-1">Heatherbrae Builders — Surrey</div>
            <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" /></div>
          </Link>
          <Link to="/projects/cantilever-gates-chilliwack" className="group border border-border rounded-sm bg-card p-5 hover:border-primary transition">
            <div className="text-xs uppercase tracking-widest text-primary">Case study</div>
            <div className="font-display text-lg uppercase mt-1">Cantilever Gates — Chilliwack</div>
            <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" /></div>
          </Link>
          <Link to="/projects/railing-installation-maple-ridge" className="group border border-border rounded-sm bg-card p-5 hover:border-primary transition">
            <div className="text-xs uppercase tracking-widest text-primary">Case study</div>
            <div className="font-display text-lg uppercase mt-1">MMCD Railing — Maple Ridge</div>
            <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" /></div>
          </Link>
        </div>
      </section>

      {open && openIndex !== null && (
        <Lightbox
          item={ITEMS[openIndex]}
          index={openIndex}
          total={ITEMS.length}
          onClose={close}
          onPrev={() => setOpenIndex((i) => {
            if (i === null) return i;
            const next = (i - 1 + ITEMS.length) % ITEMS.length;
            trackGalleryEvent({ name: "gallery_lightbox_navigate", direction: "prev", index: next, title: ITEMS[next].title });
            return next;
          })}
          onNext={() => setOpenIndex((i) => {
            if (i === null) return i;
            const next = (i + 1) % ITEMS.length;
            trackGalleryEvent({ name: "gallery_lightbox_navigate", direction: "next", index: next, title: ITEMS[next].title });
            return next;
          })}
        />
      )}
      <CtaStrip />
    </PageShell>
  );
}

function GalleryTile({
  item, onClick, refCallback,
}: { item: Item; onClick: () => void; refCallback?: (el: HTMLButtonElement | null) => void }) {
  return (
    <button
      ref={refCallback}
      type="button"
      onClick={onClick}
      aria-label={`View ${item.title}`}
      className="group relative aspect-[4/3] rounded-sm overflow-hidden border border-border bg-muted text-left focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/85 via-black/25 to-transparent">
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{item.category}</div>
        <div className="font-display uppercase text-white text-base leading-tight mt-1">{item.title}</div>
        <div className="text-xs text-white/80 mt-1">{item.location}</div>
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded-sm">
        View
      </div>
    </button>
  );
}


function Lightbox({
  item, index, total, onClose, onPrev, onNext,
}: {
  item: Item; index: number; total: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowRight") { e.preventDefault(); onNext(); return; }
      if (e.key === "ArrowLeft") { e.preventDefault(); onPrev(); return; }
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-sm border border-white/20 text-white/80 hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-primary transition"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-sm border border-white/20 text-white/80 hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-primary transition"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-sm border border-white/20 text-white/80 hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-primary transition"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl"
      >
        <div className="relative rounded-sm overflow-hidden border border-white/10 bg-black flex items-center justify-center max-h-[75vh]">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[75vh] w-auto max-w-full object-contain"
          />
        </div>
        <figcaption className="mt-4 flex flex-wrap items-end justify-between gap-4 text-white">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{item.category}</div>
            <div className="font-display uppercase text-xl md:text-2xl mt-1">{item.title}</div>
            <div className="text-sm text-white/70 mt-1">{item.location}</div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={quoteHrefFor(item)}
              onClick={(e) => {
                e.stopPropagation();
                trackGalleryEvent({
                  name: "gallery_quote_cta_click",
                  index,
                  title: item.title,
                  category: item.category,
                  service: CATEGORY_TO_SERVICE[item.category] ?? "Other",
                  surface: "lightbox",
                });
              }}
              data-testid="lightbox-quote-cta"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 text-xs md:text-sm font-semibold uppercase tracking-wide rounded-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
            >
              Request quote for this <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <div className="text-xs uppercase tracking-widest text-white/60 shrink-0" aria-label={`Image ${index + 1} of ${total}`}>
              {index + 1} / {total}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

