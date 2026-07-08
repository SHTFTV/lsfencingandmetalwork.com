import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";



export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Project Gallery — Fences, Gates & Metal Work" },
      { name: "description", content: "Photos of chain link, cedar, ornamental fencing, custom gates and welding jobs across the Fraser Valley." },
      { property: "og:title", content: "Project Gallery — Fences, Gates & Metal Work" },
      { property: "og:description", content: "Proof of work across chain link, cedar, ornamental, gates and welding." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Page,
});

type Item = {
  title: string;
  location: string;
  category: string;
  swatch: string; // gradient
  pattern: "chain" | "planks" | "spindles" | "plates" | "sparks" | "cantilever";
};

const CATEGORIES = [
  "All",
  "Chain Link",
  "Cedar",
  "Ornamental",
  "Gates",
  "Welding",
] as const;

const ITEMS: Item[] = [
  { title: "10-ft galvanized site fence", location: "Surrey, BC", category: "Chain Link", swatch: "from-slate-700 via-slate-800 to-black", pattern: "chain" },
  { title: "6×24 cantilever slide gate", location: "Chilliwack, BC", category: "Gates", swatch: "from-zinc-800 via-zinc-900 to-black", pattern: "cantilever" },
  { title: "Cedar privacy fence with lattice", location: "Abbotsford, BC", category: "Cedar", swatch: "from-amber-900 via-amber-950 to-stone-950", pattern: "planks" },
  { title: "Ornamental steel panels", location: "Langley, BC", category: "Ornamental", swatch: "from-neutral-800 via-neutral-900 to-black", pattern: "spindles" },
  { title: "Black vinyl coated chain link", location: "Maple Ridge, BC", category: "Chain Link", swatch: "from-zinc-900 via-black to-zinc-800", pattern: "chain" },
  { title: "MMCD-spec handrail install", location: "Maple Ridge, BC", category: "Welding", swatch: "from-orange-900 via-red-950 to-black", pattern: "sparks" },
  { title: "Double swing driveway gate", location: "Cooper Rentals, Langley", category: "Gates", swatch: "from-stone-800 via-stone-900 to-black", pattern: "plates" },
  { title: "Cedar board-on-board", location: "Mission, BC", category: "Cedar", swatch: "from-amber-800 via-yellow-950 to-stone-950", pattern: "planks" },
  { title: "Powder-coated iron fence", location: "White Rock, BC", category: "Ornamental", swatch: "from-slate-800 via-neutral-900 to-black", pattern: "spindles" },
  { title: "Industrial security fencing", location: "Port Kells, BC", category: "Chain Link", swatch: "from-gray-700 via-gray-900 to-black", pattern: "chain" },
  { title: "Custom truck-bed rack (MIG)", location: "Chilliwack, BC", category: "Welding", swatch: "from-orange-800 via-red-900 to-black", pattern: "sparks" },
  { title: "Barrier gate — parking lot", location: "Abbotsford, BC", category: "Gates", swatch: "from-yellow-900 via-neutral-900 to-black", pattern: "plates" },
];

function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpenerIndex = useRef<number | null>(null);

  const openAt = useCallback((i: number) => {
    lastOpenerIndex.current = i;
    setOpenIndex(i);
  }, []);
  const close = useCallback(() => {
    setOpenIndex(null);
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
        intro="Recent installs across the Fraser Valley & Lower Mainland. Photos are being updated — swap any tile for a real project shot when ready."
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



        <div className="mt-10 border border-dashed border-border rounded-sm bg-card/50 p-6 text-sm text-muted-foreground">
          These tiles are placeholders styled with the site palette. Drop real photos into
          <code className="mx-1 text-foreground">public/gallery/</code> and swap the tile <code className="mx-1 text-foreground">pattern</code>
          for an <code className="mx-1 text-foreground">&lt;img&gt;</code> when project photography is ready.
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
          onPrev={() => setOpenIndex((i) => (i === null ? i : (i - 1 + ITEMS.length) % ITEMS.length))}
          onNext={() => setOpenIndex((i) => (i === null ? i : (i + 1) % ITEMS.length))}
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
      className={`group relative aspect-[4/3] rounded-sm overflow-hidden border border-border bg-gradient-to-br ${item.swatch} text-left focus:outline-none focus:ring-2 focus:ring-primary`}
    >
      <PatternLayer pattern={item.pattern} />
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{item.category}</div>
        <div className="font-display uppercase text-white text-base leading-tight mt-1">{item.title}</div>
        <div className="text-xs text-white/70 mt-1">{item.location}</div>
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

  // Autofocus close button on open
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // Keyboard: Escape closes, arrows navigate, Tab is trapped inside dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
        return;
      }
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
        <div className={`relative aspect-video rounded-sm overflow-hidden border border-white/10 bg-gradient-to-br ${item.swatch}`}>
          <PatternLayer pattern={item.pattern} />
          {/* Larger proof-of-work grid overlay: 6 pattern tiles */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 p-2 opacity-90">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${item.swatch} border border-white/10`}>
                <PatternLayer pattern={item.pattern} />
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.3em] text-white/70">
            Placeholder proof-of-work grid
          </div>
        </div>
        <figcaption className="mt-4 flex items-end justify-between gap-4 text-white">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{item.category}</div>
            <div className="font-display uppercase text-xl md:text-2xl mt-1">{item.title}</div>
            <div className="text-sm text-white/70 mt-1">{item.location}</div>
          </div>
          <div className="text-xs uppercase tracking-widest text-white/60 shrink-0">
            {index + 1} / {total}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}



function PatternLayer({ pattern }: { pattern: Item["pattern"] }) {
  const base = "absolute inset-0 opacity-30 mix-blend-screen";
  switch (pattern) {
    case "chain":
      return (
        <div className={base} style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,.18) 0 2px, transparent 2px 14px), repeating-linear-gradient(-45deg, rgba(255,255,255,.18) 0 2px, transparent 2px 14px)",
        }} />
      );
    case "planks":
      return (
        <div className={base} style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0 40px, rgba(0,0,0,.35) 40px 42px)",
        }} />
      );
    case "spindles":
      return (
        <div className={base} style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,.25) 0 3px, transparent 3px 20px)",
        }} />
      );
    case "plates":
      return (
        <div className={base} style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,.35) 2px, transparent 3px), radial-gradient(circle at 80% 70%, rgba(255,255,255,.35) 2px, transparent 3px)",
          backgroundSize: "40px 40px",
        }} />
      );
    case "sparks":
      return (
        <div className={base} style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(255,180,80,.7) 1.5px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,200,120,.6) 1.5px, transparent 2px), radial-gradient(circle at 50% 20%, rgba(255,240,180,.5) 1px, transparent 2px)",
          backgroundSize: "60px 60px, 80px 80px, 40px 40px",
        }} />
      );
    case "cantilever":
      return (
        <div className={base} style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,.15) 0 4px, transparent 4px), repeating-linear-gradient(90deg, rgba(255,255,255,.15) 0 3px, transparent 3px 22px)",
          backgroundSize: "100% 100%, 100% 60%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top, bottom",
        }} />
      );
  }
}
