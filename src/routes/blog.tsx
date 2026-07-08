import { Link, createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { POSTS } from "@/lib/blog";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Fencing Blog — Guides, Comparisons & Field Notes | LS Fencing" },
      { name: "description", content: "Practical fencing guides from a working Fraser Valley contractor: material comparisons, gate specs, and job-site lessons." },
      { property: "og:title", content: "Fencing Blog — LS Fencing & Metal Work" },
      { property: "og:description", content: "Practical fencing guides from a working Fraser Valley contractor." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <PageShell>
      <PageHero eyebrow="Field Notes & Guides" title="Blog" intro="Practical writing from the crew — fencing, gates, welding, and what actually works in the Fraser Valley climate." />
      <section className="container-industrial py-16">
        <div className="grid gap-4">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group border border-border bg-card p-6 md:p-8 rounded-sm hover:border-primary transition"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{formatDate(p.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{p.readMinutes} min read</span>
                <span className="flex gap-2">{p.tags.map((t) => <span key={t} className="text-primary">{t}</span>)}</span>
              </div>
              <h2 className="mt-3 font-display uppercase text-2xl md:text-3xl group-hover:text-primary transition">{p.title}</h2>
              <p className="mt-3 text-muted-foreground max-w-3xl">{p.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary">
                Read post <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <CtaStrip />
    </PageShell>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}
