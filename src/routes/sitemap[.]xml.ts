import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/lib/blog";
import { BASE_URL } from "@/lib/site";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about-us", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/gallery", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/testimonial", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/career", changefreq: "monthly", priority: "0.5" },

  { path: "/chain-link-fencing", changefreq: "monthly", priority: "0.9" },
  { path: "/commercial-chain-link-fencing", changefreq: "monthly", priority: "0.9" },
  { path: "/residential-chain-link-fencing", changefreq: "monthly", priority: "0.9" },
  { path: "/cedar-fencing", changefreq: "monthly", priority: "0.9" },
  { path: "/ornamental-fencing", changefreq: "monthly", priority: "0.9" },
  { path: "/barrier-gates", changefreq: "monthly", priority: "0.8" },
  { path: "/metal-gates", changefreq: "monthly", priority: "0.9" },
  { path: "/welding-services", changefreq: "monthly", priority: "0.8" },
  { path: "/excavation-services", changefreq: "monthly", priority: "0.7" },
  { path: "/snow-removal", changefreq: "monthly", priority: "0.6" },

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
        const entries: SitemapEntry[] = [
          ...staticEntries,
          ...POSTS.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "yearly" as const,
            priority: "0.6",
            lastmod: p.date,
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
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
