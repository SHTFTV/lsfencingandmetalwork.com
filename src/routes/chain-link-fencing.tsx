import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/black-chainlink-hillside-chilliwack.jpg.asset.json";

const IMAGE = { src: heroImg.url, alt: "Black vinyl-coated chain link fence installed along a rock-wall hillside acreage in Chilliwack BC by LS Fencing", title: "Chain link fencing installation — Chilliwack, BC", caption: "Vinyl-Coated Chain Link · Chilliwack, BC" };

const FAQ: FaqItem[] = [
  { q: "How long does a typical residential install take?", a: "Most 100–200 ft residential runs are installed in 1–2 days after posts have cured." },
  { q: "Do you install on rocky or sloped lots?", a: "Yes. We rack fabric to follow grade and can core-drill or rock-anchor where digging isn't possible." },
  { q: "Can I add barbed wire later?", a: "Yes — we install fence with top rail and arms rated for future barbed-wire additions." },
];

const DESCRIPTION =
  "Galvanized and black vinyl-coated chain link fencing for commercial, industrial and residential sites across the Fraser Valley & Lower Mainland.";

export const Route = createFileRoute("/chain-link-fencing")({
  head: () => serviceHead({
    title: "Chain Link Fencing — Fraser Valley Installers | LS Fencing",
    ogTitle: "Chain Link Fencing — Fraser Valley Installers",
    description: DESCRIPTION,
    ogDescription: "Site security, sports fields, storage yards and residential perimeters — installed to spec.",
    serviceName: "Chain Link Fencing",
    path: "/chain-link-fencing",
    image: { src: IMAGE.src, alt: IMAGE.alt, title: IMAGE.title },
    faq: FAQ,
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
        image={IMAGE}
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
          { to: "/airport-fencing", label: "Airport perimeter fencing" },
          { to: "/port-fencing", label: "Port & marine terminal fencing" },
          { to: "/cannabis-fencing", label: "Cannabis facility fencing" },
        ]}
      >
        <ProjectShowcase
          category="Chain Link"
          eyebrow="Chain link case studies"
          title="Recent chain link installs"
          subtitle="Residential, commercial and institutional runs across the Fraser Valley. Tap any tile for the full photo and a one-click quote request tied to that spec."
          surface="service-chain-link"
        />
      </ServiceContent>
      <CtaStrip />
    </PageShell>
  );
}
