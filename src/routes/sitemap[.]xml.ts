import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/lib/blog";
import { BASE_URL } from "@/lib/site";

interface SitemapImage {
  loc: string;
  title?: string;
  caption?: string;
}

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
  images?: SitemapImage[];
}

// Absolute URLs for images already deployed under /public.
const heroImg = (path: string) => `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", images: [
    { loc: heroImg("/og/blog-best-fencing-options.jpg"), title: "LS Fencing & Metal Work — Fraser Valley chain link, cedar, ornamental & custom gates", caption: "Fencing contractor serving the Fraser Valley and Lower Mainland since 2013." },
  ]},
  { path: "/about-us", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/gallery", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/testimonial", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/career", changefreq: "monthly", priority: "0.5" },

  { path: "/chain-link-fencing", changefreq: "monthly", priority: "0.9", images: [
    { loc: heroImg("/og/blog-best-fencing-options.jpg"), title: "Chain link fencing installation — LS Fencing & Metal Work", caption: "Galvanized and vinyl-coated chain link fencing across the Lower Mainland." },
  ]},
  { path: "/commercial-chain-link-fencing", changefreq: "monthly", priority: "0.9" },
  { path: "/residential-chain-link-fencing", changefreq: "monthly", priority: "0.9" },
  { path: "/cedar-fencing", changefreq: "monthly", priority: "0.9", images: [
    { loc: heroImg("/og/blog-chain-link-vs-wood.jpg"), title: "Western red cedar fencing", caption: "Cedar privacy fence installation in the Fraser Valley." },
  ]},
  { path: "/ornamental-fencing", changefreq: "monthly", priority: "0.9" },
  { path: "/barrier-gates", changefreq: "monthly", priority: "0.8", images: [
    { loc: heroImg("/og/blog-barrier-gates.jpg"), title: "Barrier gates and access control", caption: "Barrier gates for municipal, commercial, and private drive access." },
  ]},
  { path: "/metal-gates", changefreq: "monthly", priority: "0.9" },
  { path: "/welding-services", changefreq: "monthly", priority: "0.8" },
  { path: "/excavation-services", changefreq: "monthly", priority: "0.7" },
  { path: "/snow-removal", changefreq: "monthly", priority: "0.6" },

  { path: "/airport-fencing", changefreq: "monthly", priority: "0.85" },
  { path: "/port-fencing", changefreq: "monthly", priority: "0.85" },
  { path: "/cannabis-fencing", changefreq: "monthly", priority: "0.85" },

  { path: "/chilliwack-chain-link-fence-company", changefreq: "monthly", priority: "0.9" },
  { path: "/abbotsford-chain-link-fence-contractor", changefreq: "monthly", priority: "0.9" },

  { path: "/projects/heatherbrae-builders-surrey", changefreq: "yearly", priority: "0.6" },
  { path: "/projects/cooper-rentals-langley", changefreq: "yearly", priority: "0.6" },
  { path: "/projects/cantilever-gates-chilliwack", changefreq: "yearly", priority: "0.6" },
  { path: "/projects/railing-installation-maple-ridge", changefreq: "yearly", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const postEntries: SitemapEntry[] = POSTS.map((p) => ({
          path: `/blog/${p.slug}`,
          changefreq: "monthly" as const,
          priority: p.cityName ? "0.8" : "0.6",
          lastmod: p.date,
          images: p.ogImage
            ? [{
                loc: heroImg(p.ogImage),
                title: p.title,
                caption: p.ogImageCaption ?? p.description,
              }]
            : undefined,
        }));

        const entries: SitemapEntry[] = [...staticEntries, ...postEntries];

        const escape = (s: string) =>
          s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");

        const urls = entries.map((e) => {
          const lines: (string | null)[] = [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
          ];
          if (e.images) {
            for (const img of e.images) {
              lines.push(`    <image:image>`);
              lines.push(`      <image:loc>${img.loc}</image:loc>`);
              if (img.title) lines.push(`      <image:title>${escape(img.title)}</image:title>`);
              if (img.caption) lines.push(`      <image:caption>${escape(img.caption)}</image:caption>`);
              lines.push(`    </image:image>`);
            }
          }
          lines.push(`  </url>`);
          return lines.filter(Boolean).join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
          `        xmlns:image="http://www.google.com/schemas/sitemap-image/0.99">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
