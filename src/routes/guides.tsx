import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { BlogImage } from "@/components/BlogImage";
import { POSTS } from "@/lib/blog";
import { absoluteUrl, SITE } from "@/lib/site";

const groups = [
  { title: "Plan your project", intro: "Turn your requirements into a clear scope before requesting a quote.", slugs: ["fence-quote-checklist-fraser-valley", "swing-sliding-cantilever-gate-planning", "strata-fence-replacement-scope-checklist", "fence-gate-repair-or-replacement-checklist"] },
  { title: "Compare materials", intro: "Explore established material guides from the article archive.", slugs: ["best-fencing-options-and-their-qualities", "differences-between-chain-link-fence-and-wooden-fence", "aluminum-vs-ornamental-steel-fencing"] },
  { title: "Commercial access & security", intro: "Understand the questions to discuss for shared entrances and commercial perimeters.", slugs: ["benefits-of-barrier-gates", "strata-parking-gate-security-fencing-canada", "industrial-perimeter-security-fencing-langley-bc"] },
];
const guides = groups.flatMap((group) => group.slugs.map((slug) => POSTS.find((p) => p.slug === slug)).filter((p) => p !== undefined));
const title = "Fence & Gate Planning Guides | LS Fencing & Metal Work";
const description = "Compare fencing materials, plan swing or sliding gates, prepare a strata scope and assess repairs. Practical guides for Fraser Valley and Lower Mainland properties.";
export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title }, { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: absoluteUrl("/guides") },
      { property: "og:image", content: SITE.defaultOgImage },
      { property: "og:image:alt", content: "Fence and gate planning with LS Fencing & Metal Work" },
      { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: title },
      { name: "twitter:description", content: description }, { name: "twitter:image", content: SITE.defaultOgImage },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/guides") }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@graph": [
        { "@type": "CollectionPage", "@id": absoluteUrl("/guides"), url: absoluteUrl("/guides"), name: title, description, mainEntity: {
          "@type": "ItemList", itemListElement: guides.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: absoluteUrl(`/blog/${p.slug}`) })),
        } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides") },
        ] },
      ],
    }) }],
  }),
  component: Guides,
});
function Guides() {
  return <PageShell>
    <PageHero eyebrow="Before you build" title="Fence & gate planning guides" intro="Start with the decision you need to make. Explore materials, gate layouts, repair options and quote checklists for properties in the Fraser Valley and Lower Mainland." />
    <div className="container-industrial py-12 space-y-16">
      <nav aria-label="Guide topics" className="flex flex-wrap gap-3">
        {groups.map((g, i) => <a key={g.title} href={`#topic-${i}`} className="border border-border px-4 py-3 hover:border-primary">{g.title}</a>)}
      </nav>
      {groups.map((group, index) => <section key={group.title} aria-labelledby={`topic-${index}`}>
        <h2 id={`topic-${index}`} className="font-display text-3xl uppercase scroll-mt-32">{group.title}</h2>
        <p className="mt-3 mb-6 text-muted-foreground">{group.intro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {group.slugs.map((slug) => {
            const post = POSTS.find((p) => p.slug === slug);
            if (!post) return null;
            return <Link key={slug} to="/blog/$slug" params={{slug}} className="group border border-border bg-card rounded-sm overflow-hidden hover:border-primary">
              <div className="aspect-[1200/630]"><BlogImage post={post} /></div>
              <div className="p-6"><h3 className="font-display uppercase text-xl group-hover:text-primary">{post.title}</h3><p className="text-muted-foreground mt-3">{post.description}</p><span className="inline-block mt-4 text-primary">Read guide →</span></div>
            </Link>;
          })}
        </div>
      </section>)}
      <section className="border border-primary/40 p-6 md:p-8 bg-card">
        <h2 className="font-display text-2xl uppercase">Ready to discuss your property?</h2>
        <p className="mt-3 text-muted-foreground">Send your city, the type of work and approximate measurements. Photos and access details help define the next step.</p>
        <Link to="/contact" className="inline-block mt-5 bg-primary text-primary-foreground px-5 py-3 font-semibold">Request a quote</Link>
        <Link to="/blog" className="inline-block ml-5 mt-5 underline">Browse all articles and city guides</Link>
      </section>
    </div>
  </PageShell>;
}
