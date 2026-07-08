import { SITE } from "@/lib/site";

export type FaqItem = { q: string; a: string };

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  faq?: FaqItem[];
}) {
  const scripts: { type: string; children: string }[] = [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: opts.name,
        serviceType: opts.serviceType ?? opts.name,
        description: opts.description,
        url: opts.path,
        provider: {
          "@type": "LocalBusiness",
          name: SITE.name,
          telephone: SITE.phone,
          email: SITE.email,
        },
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
