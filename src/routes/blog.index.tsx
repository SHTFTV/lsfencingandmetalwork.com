import { Link, createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { BlogImage } from "@/components/BlogImage";
import { POSTS } from "@/lib/blog";
import { absoluteUrl, SITE } from "@/lib/site";
import { ArrowRight, Calendar, Clock } from "lucide-react";


export const Route = createFileRoute("/blog/")({
  head: () => {
    const url = absoluteUrl("/blog");
    const image = SITE.defaultOgImage;
    return {
      meta: [
        { title: "Fencing Blog — Guides, Comparisons & Field Notes | LS Fencing" },
        { name: "description", content: "Practical fencing guides from a working Fraser Valley contractor: chain link vs cedar, gate specs, bylaw heights, and city-by-city job notes across BC." },
        { property: "og:title", content: "Fencing Blog — LS Fencing & Metal Work" },
        { property: "og:description", content: "Practical fencing guides from a working Fraser Valley contractor — materials, gates, welding, and city-by-city field notes." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "LS Fencing & Metal Work — Fraser Valley fencing blog" },
        { property: "og:image:type", content: "image/jpeg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Fencing Blog — LS Fencing & Metal Work" },
        { name: "twitter:description", content: "Practical fencing guides from a working Fraser Valley contractor." },
        { name: "twitter:image", content: image },
        { name: "twitter:image:alt", content: "LS Fencing & Metal Work — Fraser Valley fencing blog" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "LS Fencing Blog",
            url,
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              url: absoluteUrl("/"),
            },
            blogPost: POSTS.slice(0, 10).map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              description: p.description,
              url: absoluteUrl(`/blog/${p.slug}`),
              datePublished: p.date,
              image: absoluteUrl(p.ogImage),
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Blog", item: url },
            ],
          }),
        },
      ],
    };
  },
  component: Blog,
});

function Blog() {
  return (
    <PageShell>
      <PageHero eyebrow="Field Notes & Guides" title="Blog" intro="Practical writing from the crew — fencing, gates, welding, and what actually works in the Fraser Valley climate." />
      <section className="container-industrial py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {POSTS.map((p, idx) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col border border-border bg-card rounded-sm overflow-hidden hover:border-primary transition"
            >
              <div className="aspect-[1200/630] overflow-hidden bg-muted">
                <BlogImage
                  post={p}
                  variant="thumb"
                  eager={idx < 2}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{formatDate(p.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{p.readMinutes} min read</span>
                  <span className="flex gap-2">{p.tags.slice(0, 2).map((t) => <span key={t} className="text-primary">{t}</span>)}</span>
                </div>
                <h2 className="mt-3 font-display uppercase text-xl md:text-2xl group-hover:text-primary transition">{p.title}</h2>
                <p className="mt-3 text-muted-foreground">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary">
                  Read post <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
    </PageShell>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}
