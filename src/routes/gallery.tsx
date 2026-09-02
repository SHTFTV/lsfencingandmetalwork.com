import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ArrowRight } from "lucide-react";
import { GalleryTile, useLightbox } from "@/components/ImageLightbox";
import { CATEGORIES, GALLERY_ITEMS } from "@/lib/gallery-items";
import imgBlackSchool from "@/assets/gallery/black-vinyl-school-surrey.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Project Gallery — Fences, Gates & Metal Work" },
      { name: "description", content: "Photos of chain link, cedar, ornamental fencing, custom gates and welding jobs across the Fraser Valley." },
      { property: "og:title", content: "Project Gallery — Fences, Gates & Metal Work" },
      { property: "og:description", content: "Proof of work across chain link, cedar, ornamental, gates and welding." },
      { property: "og:url", content: "/gallery" },
      { property: "og:image", content: imgBlackSchool },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: imgBlackSchool },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Page,
});

function Page() {
  const lb = useLightbox(GALLERY_ITEMS, { surface: "gallery" });

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
            <a
              key={c}
              href={`#${c.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xs uppercase tracking-widest border border-border rounded-sm px-3 py-2 hover:border-primary hover:text-primary transition"
            >
              {c}
            </a>
          ))}
        </div>

        <div id="all" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((it, i) => (
            <GalleryTile
              key={it.src}
              item={it}
              onClick={() => lb.openAt(i)}
              refCallback={lb.registerTile(i)}
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

      {lb.overlay}
      <CtaStrip />
    </PageShell>
  );
}
