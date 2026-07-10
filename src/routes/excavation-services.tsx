import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { serviceJsonLd, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/kubota-kx033-excavator-post-line.jpg.asset.json";

const FAQ: FaqItem[] = [
  { q: "Do you do excavation-only work?", a: "Yes — we're happy to price small excavation jobs that aren't tied to a fence install." },
  { q: "Do you locate utilities?", a: "We always call for a BC 1 Call locate before digging, and we work around marked lines." },
  { q: "Can you haul away the spoils?", a: "Yes, dump-run haul-away is quoted per load." },
];

const DESCRIPTION =
  "Small-scale excavation for fence lines, post holes, drainage trenching and site prep across the Fraser Valley.";

export const Route = createFileRoute("/excavation-services")({
  head: () => ({
    meta: [
      { title: "Excavation Services — Post Holes, Trenching, Grading | LS Fencing" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Excavation Services — Post Holes, Trenching, Grading" },
      { property: "og:description", content: "Mini-excavator work for fencing, drainage and site prep — Fraser Valley & Lower Mainland." },
      { property: "og:url", content: "/excavation-services" },
    ],
    links: [{ rel: "canonical", href: "/excavation-services" }],
    scripts: serviceJsonLd({
      name: "Excavation Services",
      description: DESCRIPTION,
      path: "/excavation-services",
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
        title="Excavation Services"
        intro="Mini-excavator work for fence lines, post holes, drainage trenching, and site prep across the Fraser Valley."
      />
      <ServiceContent
        swatch="from-yellow-900 via-neutral-900 to-black"
        intro="Fencing usually starts with digging. We run a compact excavator so we can get onto tight residential lots, dig clean post holes on rocky ground, trench in drainage, and grade the fence line before the crew shows up."
        highlights={[
          "Mini-excavator (fits through 4-ft gates)",
          "Fence-line clearing & grading",
          "Post holes on rocky or root-bound sites",
          "Drainage trenching",
          "Rough site prep",
          "Debris haul-away available",
        ]}
        applications={[
          { title: "Fence-line prep", body: "Clear brush, remove old fence lines, and grade to a workable elevation before install." },
          { title: "Post holes on tough sites", body: "Rocky, clay, and root-bound ground drilled or dug clean so the fence posts land plumb." },
          { title: "Drainage trenching", body: "French drain and downspout trenching to keep fence lines and gates from sitting in water." },
          { title: "Small demo & haul-away", body: "Old fence, sheds, or debris removed with the fence-install job — nothing left behind." },
        ]}
        specs={[
          { label: "Equipment", value: "Mini-excavator + skid steer" },
          { label: "Access", value: "Fits through 4-ft gate" },
          { label: "Typical jobs", value: "½ day – 3 days" },
          { label: "Add-ons", value: "Haul-away · Import fill" },
          { label: "Coverage", value: "Fraser Valley & Lower Mainland" },
          { label: "Insurance", value: "Fully insured — WCB active" },
        ]}
        faq={FAQ}
        related={[
          { to: "/chain-link-fencing", label: "Chain link fencing" },
          { to: "/cedar-fencing", label: "Cedar fencing" },
          { to: "/snow-removal", label: "Snow removal" },
        ]}
      />
      <CtaStrip />
    </PageShell>
  );
}
