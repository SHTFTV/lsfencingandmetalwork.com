import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell, CtaStrip } from "@/components/PageShell";
import { POSTS, getPost, type BlogPost } from "@/lib/blog";
import { absoluteUrl, SITE } from "@/lib/site";
import { ArrowLeft, Calendar, Clock, CheckCircle2, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Post not found" }, { name: "robots", content: "noindex" }] };
    }
    const url = absoluteUrl(`/blog/${params.slug}`);
    const image = absoluteUrl(post.ogImage);

    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      image: [image],
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        logo: { "@type": "ImageObject", url: absoluteUrl("/favicon-32x32.png") },
      },
      mainEntityOfPage: url,
      keywords: post.tags.join(", "),
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    };

    const scripts: Array<{ type: string; children: string }> = [
      { type: "application/ld+json", children: JSON.stringify(articleLd) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
    ];

    if (post.faq && post.faq.length > 0) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      });
    }

    if (post.cityName) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/") + `#localbusiness-${post.cityName.toLowerCase().replace(/\s+/g, "-")}`,
          name: SITE.name,
          image: image,
          telephone: SITE.phone,
          email: SITE.email,
          url: absoluteUrl("/"),
          areaServed: { "@type": "City", name: `${post.cityName}, BC` },
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressRegion: "BC",
            addressCountry: "CA",
            addressLocality: post.cityName,
          },
        }),
      });
    }

    return {
      meta: [
        { title: `${post.title} | LS Fencing Blog` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: image },
        { property: "article:published_time", content: post.date },
        { name: "author", content: SITE.name },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  component: Post,
});

function Post() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  return (
    <PageShell>
      <article>
        <header className="border-b border-border grid-lines">
          <div className="container-industrial pt-10 md:pt-14 max-w-4xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-3 w-3" /> All posts
            </Link>
          </div>
          <div className="container-industrial mt-6 max-w-4xl">
            <div className="aspect-[1200/630] overflow-hidden rounded-sm border border-border bg-muted">
              <img
                src={post.ogImage}
                alt={post.ogImageCaption ?? post.title}
                width={1200}
                height={630}
                className="w-full h-full object-cover"
              />
            </div>
            {post.ogImageCaption && (
              <p className="mt-2 text-xs text-muted-foreground italic">{post.ogImageCaption}</p>
            )}
          </div>
          <div className="container-industrial py-10 md:py-14 max-w-3xl">
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{formatDate(post.date)}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{post.readMinutes} min read</span>
              <span className="flex gap-2 flex-wrap">{post.tags.map((t) => <span key={t} className="text-primary">{t}</span>)}</span>
            </div>
            <h1 className="mt-4 font-display uppercase text-4xl md:text-5xl leading-tight">{post.title}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{post.description}</p>
          </div>
        </header>

        <div className="container-industrial py-14 max-w-3xl">
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <aside className="mb-10 border border-primary/40 bg-primary/5 p-6 rounded-sm" aria-labelledby="key-takeaways">
              <div id="key-takeaways" className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Key takeaways</div>
              <ul className="space-y-2">
                {post.keyTakeaways.map((t) => (
                  <li key={t} className="flex gap-3 text-foreground/90">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="prose-industrial space-y-5">
            {post.body.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return <h2 key={i} className="font-display uppercase text-2xl md:text-3xl mt-10 mb-2 text-primary">{block.text}</h2>;
                case "h3":
                  return <h3 key={i} className="font-display uppercase text-xl mt-6 mb-1">{block.text}</h3>;
                case "p":
                  return <p key={i} className="text-foreground/85 leading-relaxed">{block.text}</p>;
                case "ul":
                  return (
                    <ul key={i} className="space-y-2 pl-0">
                      {block.items.map((it) => (
                        <li key={it} className="flex gap-3 border-l-2 border-primary pl-4 py-1 text-foreground/85">{it}</li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return <blockquote key={i} className="border-l-4 border-primary pl-6 py-2 text-xl font-display uppercase text-foreground/90">"{block.text}"</blockquote>;
              }
            })}
          </div>

          {post.faq && post.faq.length > 0 && (
            <section className="mt-14" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="font-display uppercase text-2xl md:text-3xl mb-6 text-primary">Frequently asked questions</h2>
              <dl className="space-y-6">
                {post.faq.map((f) => (
                  <div key={f.q} className="border-l-2 border-primary/40 pl-5">
                    <dt className="font-display uppercase text-lg text-foreground">{f.q}</dt>
                    <dd className="mt-2 text-foreground/85 leading-relaxed">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {post.internalLinks && post.internalLinks.length > 0 && (
            <section className="mt-14" aria-labelledby="related-links">
              <h2 id="related-links" className="font-display uppercase text-xl mb-4 text-primary">Related services & guides</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {post.internalLinks.map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      className="block border border-border bg-card px-4 py-3 rounded-sm hover:border-primary transition text-sm"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {post.externalLinks && post.externalLinks.length > 0 && (
            <section className="mt-10" aria-labelledby="external-references">
              <h2 id="external-references" className="font-display uppercase text-xl mb-4 text-primary">Bylaw & code references</h2>
              <ul className="space-y-2">
                {post.externalLinks.map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-2 text-sm text-foreground/85 hover:text-primary transition underline decoration-primary/40 underline-offset-4"
                    >
                      {l.label} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">Bylaws are updated by municipalities from time to time — always confirm current requirements before starting work.</p>
            </section>
          )}
        </div>

        <RelatedPosts currentSlug={post.slug} />
      </article>
      <CtaStrip />
    </PageShell>
  );
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const others = POSTS.filter((p) => p.slug !== currentSlug).slice(0, 3);
  return (
    <section className="border-t border-border bg-card/40">
      <div className="container-industrial py-12">
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Keep reading</div>
        <div className="grid md:grid-cols-3 gap-4">
          {others.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="border border-border p-5 rounded-sm bg-background hover:border-primary transition">
              <div className="font-display uppercase text-lg">{p.title}</div>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}
