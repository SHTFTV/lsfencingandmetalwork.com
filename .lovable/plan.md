# Lower Mainland city fencing guides — publish plan

## What ships

17 long-form blog posts, one per Lower Mainland city Abbotsford and Chilliwack already have dedicated landing pages, so they're skipped here:

Vancouver · Burnaby · Surrey · Richmond · Coquitlam · Port Coquitlam · Port Moody · Langley · Delta · Maple Ridge · Pitt Meadows · New Westminster · North Vancouver · West Vancouver · White Rock · Mission · Hope

Each post is ~2000 words with this structure:

1. Intro (~180 words, city-specific)
2. Fencing conditions in {city} — climate, soil, terrain
3. What we build most in {city} — property types + common jobs
4. Permits & bylaws in {city} — with external link to that city's zoning bylaw
5. Materials that hold up in {city}
6. What fencing costs in {city}
7. Neighbourhoods we work in most (4–6 real neighbourhoods per city)
8. FAQ (5 Q&A per city — feeds AEO / voice / AI-answer surfaces)
9. Key takeaways box
10. Related services + CTA

Each post links out to:
- **Internal:** 4–6 service pages (chain-link, cedar, ornamental, metal gates, welding, excavation) plus the two existing geo pages (Chilliwack / Abbotsford)
- **External:** the city's official bylaw / zoning page and BC building code / WorkSafeBC where relevant (real, authoritative anchors — good for E-E-A-T)

## SEO / AEO / GEO / LLM optimization

- Per-post `<title>` and meta description with city + service intent keywords
- Absolute canonical + og:url + og:image per post
- **Article JSON-LD** (headline, datePublished, author=Organization, image)
- **FAQPage JSON-LD** built from each post's FAQ block → eligible for Google's FAQ rich results and answer-engine ingestion
- **LocalBusiness JSON-LD** on each post (name, phone, area served = that city) → strong local signal
- **BreadcrumbList JSON-LD** (Home › Blog › Post)
- Semantic HTML: single H1, structured H2/H3, `<dl>` for FAQ, `<article>` wrapper
- **AEO/LLM readiness:** short answer-first paragraphs, explicit Q→A pairs, "Key takeaways" list block — how ChatGPT / Perplexity / Google AI Overviews extract citable passages
- **GEO signals:** city name + neighbourhood names + postal prefix + area-served in prose and schema

## Sitemap + image sitemap

- Extend `src/routes/sitemap[.]xml.ts` to:
  - Add the `xmlns:image="http://www.google.com/schemas/sitemap-image/0.99"` namespace
  - Emit `<image:image><image:loc>` + `<image:title>` + `<image:caption>` for every entry that has a hero image (all city posts + service pages)
  - Add all 17 new post URLs with per-post `lastmod`
- `robots.txt` continues to point at `/sitemap.xml`

## Files touched / added

Added:
- `src/lib/blog/cities.ts` — per-city facts (name, region, postal prefix, climate line, terrain line, neighbourhoods, common projects, bylaw summary + external URL, cost note, 2 unique paragraphs, 5 FAQ Q&A)
- `src/lib/blog/city-post.ts` — template that assembles a full ~2000-word `BlogPost` from a `CityFact`

Edited:
- `src/lib/blog.ts` — extend `BlogPost` with optional `faq`, `keyTakeaways`, `internalLinks`, `externalLinks`, `cityName`, `region`, `areaServed`; merge generated city posts into `POSTS`
- `src/routes/blog.$slug.tsx` — render FAQ / takeaways / link blocks + emit Article + FAQPage + LocalBusiness + Breadcrumb JSON-LD
- `src/routes/sitemap[.]xml.ts` — image sitemap namespace + entries + new post URLs

## Not doing (unless you ask)

- Generating a unique hero image per city (17 gens = extra time and cost — I'll reuse the existing gallery hero images + your 4 blog OG images, rotated per city, until you want custom ones)
- Publishing after the build — you republish when ready
- Submitting the updated sitemap to Google Search Console (I'll offer that after publish)