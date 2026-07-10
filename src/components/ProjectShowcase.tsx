import { GalleryTile, useLightbox } from "@/components/ImageLightbox";
import { itemsByCategory, type GalleryCategory, type GalleryItem } from "@/lib/gallery-items";

type Props = {
  /** Filter by one or more gallery categories. Ignored when `items` is provided. */
  category?: GalleryCategory | GalleryCategory[];
  /** Explicit item list (overrides `category`). */
  items?: GalleryItem[];
  /** Max cards to show. Defaults to 6. */
  limit?: number;
  /** Heading + eyebrow copy. */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Analytics surface tag. */
  surface?: string;
};

/**
 * Case-study style project cards for service pages.
 * Renders finished-work photos as clickable tiles that open the
 * shared lightbox with a per-photo "Request quote for this" CTA.
 */
export function ProjectShowcase({
  category,
  items,
  limit = 6,
  eyebrow = "Recent work",
  title = "Case studies from the field",
  subtitle = "Tap any tile to see the full photo — every project links back to a quote request for that spec.",
  surface = "service-showcase",
}: Props) {
  const source: GalleryItem[] = items ?? (category ? itemsByCategory(category) : []);
  const shown = source.slice(0, limit);
  const lb = useLightbox(shown, { surface });

  if (shown.length === 0) return null;

  return (
    <section aria-label={title} className="pt-4">
      <div className="mb-4">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
        <h2 className="font-display uppercase text-2xl mt-1">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shown.map((it, i) => (
          <GalleryTile
            key={it.src}
            item={it}
            onClick={() => lb.openAt(i)}
            refCallback={lb.registerTile(i)}
            showOutcome
          />
        ))}
      </div>
      {lb.overlay}
    </section>
  );
}
