import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell, CtaStrip } from "@/components/PageShell";
import { POSTS, getPost, type BlogPost } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

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
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: [image],
          datePublished: post.date,
          author: { "@type": "Organization", name: "LS Fencing & Metal Work" },
          mainEntityOfPage: url,
        }),
      }],
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
          <div className="container-industrial py-16 md:py-20 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-3 w-3" /> All posts
            </Link>
            <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{formatDate(post.date)}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{post.readMinutes} min read</span>
              <span className="flex gap-2">{post.tags.map((t) => <span key={t} className="text-primary">{t}</span>)}</span>
            </div>
            <h1 className="mt-4 font-display uppercase text-4xl md:text-5xl leading-tight">{post.title}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{post.description}</p>
          </div>
        </header>

        <div className="container-industrial py-14 max-w-3xl">
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
