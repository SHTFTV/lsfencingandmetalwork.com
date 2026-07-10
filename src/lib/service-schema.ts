import { SITE, absoluteUrl } from "@/lib/site";

export type FaqItem = { q: string; a: string };

export type ServiceImage = { src: string; alt: string; title?: string; caption?: string };

export type ServiceHeadOpts = {
  /** Full <title> tag content, e.g. "Welding Services — Mobile Welder | LS Fencing". */
  title: string;
  /** Short one-liner used for meta description and og/twitter description. */
  description: string;
  /** Schema.org Service.name (typically the human service name, no site suffix). */
  serviceName: string;
  /** Route path, e.g. "/welding-services" (leading slash). */
  path: string;
  /** Hero image for og:image / twitter:image / Service.image (asset URL). */
  image?: ServiceImage;
  /** Optional shorter og:title override (defaults to `title`). */
  ogTitle?: string;
  /** Optional shorter og:description override (defaults to `description`). */
  ogDescription?: string;
  /** Optional schema.org serviceType (defaults to `serviceName`). */
  serviceType?: string;
  faq?: FaqItem[];
};

export function serviceHead(opts: ServiceHeadOpts) {
  const url = absoluteUrl(opts.path);
  const ogTitle = opts.ogTitle ?? opts.title;
  const ogDescription = opts.ogDescription ?? opts.description;
  const imageUrl = opts.image ? (opts.image.src.startsWith("http") ? opts.image.src : absoluteUrl(opts.image.src)) : SITE.defaultOgImage;
  const imageAlt = opts.image?.alt ?? opts.serviceName;

  const meta: Array<Record<string, string>> = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ];

  const links = [{ rel: "canonical", href: url }];

  const scripts = serviceJsonLd({
    name: opts.serviceName,
    description: opts.description,
    path: opts.path,
    serviceType: opts.serviceType,
    faq: opts.faq,
    image: opts.image ? imageUrl : undefined,
  });

  return { meta, links, scripts };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  faq?: FaqItem[];
  image?: string;
}) {
  const url = absoluteUrl(opts.path);
  const scripts: { type: string; children: string }[] = [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: opts.name,
        serviceType: opts.serviceType ?? opts.name,
        description: opts.description,
        url,
        ...(opts.image ? { image: opts.image } : {}),
        provider: localBusinessNode(),
        areaServed: [
          { "@type": "AdministrativeArea", name: "Fraser Valley, BC" },
          { "@type": "AdministrativeArea", name: "Lower Mainland, BC" },
        ],
      }),
    },
  ];

  if (opts.faq && opts.faq.length > 0) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: opts.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    });
  }

  return scripts;
}

export function localBusinessNode() {
  return {
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl("/")}#business`,
    name: SITE.name,
    url: absoluteUrl("/"),
    telephone: SITE.phone,
    email: SITE.email,
    image: SITE.defaultOgImage,
    priceRange: "$$",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Fraser Valley, BC" },
      { "@type": "AdministrativeArea", name: "Lower Mainland, BC" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chilliwack",
      addressRegion: "BC",
      addressCountry: "CA",
    },
  };
}

export function localBusinessScript() {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      ...localBusinessNode(),
    }),
  };
}
