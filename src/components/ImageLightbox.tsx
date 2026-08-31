import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { trackGalleryEvent } from "@/lib/analytics";
import { CATEGORY_TO_SERVICE, quoteHrefFor, type GalleryItem } from "@/lib/gallery-items";

/**
 * Shared lightbox for gallery + service page project cards.
 * Provides keyboard nav (Esc / ←/→), focus trap, body scroll lock,
 * analytics, and a "Request quote for this" CTA tied to the photo.
 *
 * Usage:
 *   const lb = useLightbox(items, { surface: "service-chain-link" });
 *   <button onClick={() => lb.openAt(i)} ref={lb.registerTile(i)}>…</button>
 *   {lb.overlay}
 */
export function useLightbox(
  items: GalleryItem[],
  opts: { surface?: string } = {},
) {
  const surface = opts.surface ?? "gallery";
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpenerIndex = useRef<number | null>(null);

  const openAt = useCallback((i: number) => {
    lastOpenerIndex.current = i;
    const it = items[i];
    if (!it) return;
    trackGalleryEvent({ name: "gallery_tile_click", index: i, title: it.title, category: it.category, surface });
    trackGalleryEvent({ name: "gallery_lightbox_open", index: i, title: it.title, category: it.category, surface });
    setOpenIndex(i);
  }, [items, surface]);

  const close = useCallback(() => {
    setOpenIndex((idx) => {
      if (idx !== null) {
        const it = items[idx];
        if (it) trackGalleryEvent({ name: "gallery_lightbox_close", index: idx, title: it.title, surface });
      }
      return null;
    });
    requestAnimationFrame(() => {
      const idx = lastOpenerIndex.current;
      if (idx !== null) tileRefs.current[idx]?.focus();
    });
  }, [items, surface]);

  const onPrev = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return i;
      const next = (i - 1 + items.length) % items.length;
      trackGalleryEvent({ name: "gallery_lightbox_navigate", direction: "prev", index: next, title: items[next].title, surface });
      return next;
    });
  }, [items, surface]);

  const onNext = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return i;
      const next = (i + 1) % items.length;
      trackGalleryEvent({ name: "gallery_lightbox_navigate", direction: "next", index: next, title: items[next].title, surface });
      return next;
    });
  }, [items, surface]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const registerTile = (i: number) => (el: HTMLButtonElement | null) => {
    tileRefs.current[i] = el;
  };

  const overlay = open && openIndex !== null ? (
    <Lightbox
      item={items[openIndex]}
      index={openIndex}
      total={items.length}
      onClose={close}
      onPrev={onPrev}
      onNext={onNext}
      surface={surface}
    />
  ) : null;

  return { openIndex, openAt, close, onPrev, onNext, registerTile, overlay };
}

export function GalleryTile({
  item,
  onClick,
  refCallback,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  showOutcome = false,
}: {
  item: GalleryItem;
  onClick: () => void;
  refCallback?: (el: HTMLButtonElement | null) => void;
  sizes?: string;
  showOutcome?: boolean;
}) {
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
        title={item.title}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        width={1200}
        height={900}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/85 via-black/25 to-transparent">
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{item.category}</div>
        <div className="font-display uppercase text-white text-base leading-tight mt-1">{item.title}</div>
        <div className="text-xs text-white/80 mt-1">{item.location}</div>
        {showOutcome && item.outcome && (
          <div className="text-[11px] text-white/70 mt-1 line-clamp-1">{item.outcome}</div>
        )}
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded-sm inline-flex items-center gap-1">
        <ZoomIn className="h-3 w-3" /> View
      </div>
    </button>
  );
}

function Lightbox({
  item, index, total, onClose, onPrev, onNext, surface,
}: {
  item: GalleryItem; index: number; total: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
  surface: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { closeBtnRef.current?.focus(); }, []);

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
            e.preventDefault(); last.focus();
          }
        } else if (active === last) {
          e.preventDefault(); first.focus();
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
            title={item.title}
            decoding="async"
            sizes="(min-width: 1024px) 960px, 100vw"
            className="max-h-[75vh] w-auto max-w-full object-contain"
          />
        </div>
        <figcaption className="mt-4 flex flex-wrap items-end justify-between gap-4 text-white">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{item.category}</div>
            <div className="font-display uppercase text-xl md:text-2xl mt-1">{item.title}</div>
            <div className="text-sm text-white/70 mt-1">
              {item.location}
              {item.outcome ? <> · <span className="text-white/60">{item.outcome}</span></> : null}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={quoteHrefFor(item, "gallery-lightbox")}
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
