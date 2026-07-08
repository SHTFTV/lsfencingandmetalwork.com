import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { serviceJsonLd, type FaqItem } from "@/lib/service-schema";

const FAQ: FaqItem[] = [
  { q: "How long does a typical residential install take?", a: "Most 100–200 ft residential runs are installed in 1–2 days after posts have cured." },
  { q: "Do you install on rocky or sloped lots?", a: "Yes. We rack fabric to follow grade and can core-drill or rock-anchor where digging isn't possible." },
  { q: "Can I add barbed wire later?", a: "Yes — we install fence with top rail and arms rated for future barbed-wire additions." },
];

const DESCRIPTION =
  "Galvanized and black vinyl-coated chain link fencing for commercial, industrial and residential sites across the Fraser Valley & Lower Mainland.";

export const Route = createFileRoute("/chain-link-fencing")({
  head: () => ({
    meta: [
      { title: "Chain Link Fencing — Fraser Valley Installers | LS Fencing" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Chain Link Fencing — Fraser Valley Installers" },
      { property: "og:description", content: "Site security, sports fields, storage yards and residential perimeters — installed to spec." },
      { property: "og:url", content: "/chain-link-fencing" },
    ],
    links: [{ rel: "canonical", href: "/chain-link-fencing" }],
    scripts: serviceJsonLd({
      name: "Chain Link Fencing",
      description: DESCRIPTION,
      path: "/chain-link-fencing",
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
        title="Chain Link Fencing"
        intro="From 4-ft residential enclosures to 10-ft security perimeters, we install galvanized and black vinyl-coated chain link across the Fraser Valley — quickly, straight, and to spec."
      />
      <ServiceContent
        swatch="from-slate-700 via-slate-800 to-black"
        intro="Chain link is still the fastest, most cost-effective way to secure a property. We source Canadian-made fabric, use schedule-40 posts on commercial jobs, and set every corner and end post in concrete so your fence stays plumb through the freeze-thaw cycle."
        highlights={[
          "Galvanized & black vinyl-coated fabric",
          "3, 4, 5, 6, 8 and 10-ft heights",
          "Schedule-40 commercial posts",
          "Concrete-set terminals and gates",
          "Barbed wire & top rail options",
          "Same-week install on standard runs",
        ]}
        applications={[
          { title: "Commercial & industrial", body: "Storage yards, warehouses, contractor lots, and construction site perimeters. Built for MMCD spec and rated for barbed-wire extensions." },
          { title: "Sports & institutional", body: "Baseball backstops, tennis and pickleball enclosures, schoolyards, and multi-use fields with vinyl-coated fabric." },
          { title: "Residential", body: "Backyards, dog runs, and rural acreage. Pet-safe gauges and vinyl-coated finishes for a cleaner look." },
          { title: "Site security", body: "Temporary site fence, permanent security fencing, and cantilever slide gates for controlled vehicle access." },
        ]}
        specs={[
          { label: "Fabric gauge", value: "9 ga · 11 ga · 11.5 ga" },
          { label: "Post spec", value: "Schedule-40 or 20 (site-dependent)" },
          { label: "Coatings", value: "Galvanized · Black vinyl" },
          { label: "Heights", value: "3 ft – 10 ft standard" },
          { label: "Gates", value: "Walk · Double · Cantilever slide" },
          { label: "Service area", value: "Fraser Valley & Lower Mainland" },
        ]}
        faq={FAQ}
        related={[
          { to: "/commercial-chain-link-fencing", label: "Commercial chain link" },
          { to: "/residential-chain-link-fencing", label: "Residential chain link" },
          { to: "/metal-gates", label: "Custom metal & cantilever gates" },
        ]}
      />
      <CtaStrip />
    </PageShell>
  );
}
