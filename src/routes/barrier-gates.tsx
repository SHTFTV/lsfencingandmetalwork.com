import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { serviceJsonLd, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/galvanized-handrail-driveway.jpeg.asset.json";

const FAQ: FaqItem[] = [
  { q: "Do you supply MMCD-spec drawings?", a: "Yes — our barrier gates and handrails are fabricated to MMCD standards and we can supply shop drawings on request." },
  { q: "Can barrier gates be locked?", a: "Absolutely. We install padlock provisions, keyed locks, or coordinate with your access-control provider." },
  { q: "How long do galvanized pipe gates last?", a: "Hot-dip galvanized barrier gates typically last 25+ years even in wet coastal conditions." },
];

const DESCRIPTION =
  "Galvanized pipe barrier gates, guard rails and MMCD-spec hand rails for municipal, commercial and industrial sites across the Fraser Valley.";

export const Route = createFileRoute("/barrier-gates")({
  head: () => ({
    meta: [
      { title: "Barrier Gates & Hand Rails — MMCD Spec BC | LS Fencing" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Barrier Gates & Hand Rails — MMCD Spec BC" },
      { property: "og:description", content: "Galvanized pipe barrier gates, guard rails and MMCD-spec hand rails — Fraser Valley & Lower Mainland." },
      { property: "og:url", content: "/barrier-gates" },
    ],
    links: [{ rel: "canonical", href: "/barrier-gates" }],
    scripts: serviceJsonLd({
      name: "Barrier Gates & Hand Rails",
      description: DESCRIPTION,
      path: "/barrier-gates",
      faq: FAQ,
    }),
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Service"
        title="Barrier Gates & Hand Rails"
        intro="Hot-dip galvanized pipe barrier gates, guard rails, and MMCD-spec hand rails — built for municipal parks, parking lots, and commercial sites."
      />
      <ServiceContent
        swatch="from-yellow-900 via-neutral-900 to-black"
        intro="Whether you're closing off a service road, protecting a utility yard, or meeting MMCD handrail requirements on a civic project, we fabricate and install galvanized pipe barriers to spec. Every gate is welded in our Chilliwack shop, hot-dip galvanized, and installed on concrete-set posts sized for the span."
        highlights={[
          "Hot-dip galvanized pipe construction",
          "Swing and lift-arm barrier styles",
          "MMCD-spec hand rails & guard rails",
          "Padlock, keyed and access-control provisions",
          "Concrete-set posts, engineered for span",
          "Reflective banding & signage available",
        ]}
        applications={[
          { title: "Parks & municipal roads", body: "Service-road closures, trail heads, and access control gates built to MMCD spec for city and regional district crews." },
          { title: "Parking lots & commercial yards", body: "Swing and drop-arm barriers to control after-hours access and delivery lanes." },
          { title: "Handrails & guard rails", body: "MMCD-spec pipe handrail for stairs, ramps, retaining walls and civic infrastructure." },
          { title: "Utility & industrial sites", body: "Pump houses, substations, and contractor yards needing durable galvanized pipe barriers." },
        ]}
        specs={[
          { label: "Material", value: "Sch-40 galvanized pipe" },
          { label: "Finish", value: "Hot-dip galvanized" },
          { label: "Standard spans", value: "8 ft – 24 ft" },
          { label: "Post spec", value: "3\" – 6\" sch-40, concrete-set" },
          { label: "Compliance", value: "MMCD spec available" },
          { label: "Service area", value: "Fraser Valley & Lower Mainland" },
        ]}
        faq={FAQ}
        related={[
          { to: "/metal-gates", label: "Custom metal gates" },
          { to: "/welding-services", label: "Welding & fabrication" },
          { to: "/chain-link-fencing", label: "Chain link fencing" },
        ]}
      />
      <CtaStrip />
    </PageShell>
  );
}
