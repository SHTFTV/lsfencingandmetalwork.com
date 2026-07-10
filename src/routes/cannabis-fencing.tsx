import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/black-privacy-slat-chainlink-maple-ridge.jpg.asset.json";

const IMAGE = {
  src: heroImg.url,
  alt: "6-foot black vinyl-coated chain link fence with full-height privacy slats — Health Canada style cannabis facility perimeter installed by LS Fencing",
  title: "Cannabis facility perimeter fencing — Fraser Valley, BC",
  caption: "Cannabis Facility · Privacy Slat Perimeter",
};

const FAQ: FaqItem[] = [
  { q: "Do you build to Health Canada cannabis facility fencing requirements?", a: "Yes. We install perimeter fencing configured for Health Canada Cannabis Regulations physical security — restricted-visibility perimeter, controlled vehicle and pedestrian access, and hardware that supports monitored intrusion detection." },
  { q: "Can you install privacy screening on the fence?", a: "Yes. Full-height vinyl privacy slats, welded solid panels or wind-screen wraps to eliminate line-of-sight into cultivation and processing yards while keeping the fence rated for security." },
  { q: "Do you work on licensed producer sites during construction?", a: "We coordinate with site security, work escorted where required, and stage builds so the compliant perimeter is never open — including tie-ins to existing monitored fence and gates." },
];

const DESCRIPTION =
  "Cannabis facility perimeter fencing for licensed producers across BC — restricted-visibility chain link, cantilever access gates and Health Canada physical-security-aligned installs.";

export const Route = createFileRoute("/cannabis-fencing")({
  head: () => {
    const base = serviceHead({
      title: "Cannabis Facility Fencing — Licensed Producers, BC | LS Fencing",
      ogTitle: "Cannabis Facility Fencing — Licensed Producers, BC",
      description: DESCRIPTION,
      ogDescription: "Restricted-visibility perimeter fencing, controlled access gates and Health Canada-aligned physical security for cannabis facilities across BC.",
      serviceName: "Cannabis Facility Fencing",
      serviceType: "Cannabis Security Fencing",
      path: "/cannabis-fencing",
      image: { src: IMAGE.src, alt: IMAGE.alt, title: IMAGE.title },
      faq: FAQ,
    });
    return {
      ...base,
      links: [
        ...base.links,
        { rel: "preload", as: "image", href: IMAGE.src, fetchpriority: "high" },
      ],
    };
  },
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Specialty · Licensed Producers"
        title="Cannabis Facility Fencing"
        intro="Restricted-visibility perimeter fencing, cantilever access gates and physical security fencing aligned with Health Canada cannabis regulations — for licensed cultivation, processing and micro sites across BC."
      />
      <ServiceContent
        image={IMAGE}
        priorityImage
        intro="Licensed producer sites carry hard physical-security obligations under the Cannabis Regulations. We install 8 ft galvanized or vinyl-coated chain link with full privacy slats, schedule-40 posts, controlled cantilever access gates and hardware that supports monitored intrusion detection — staged so the compliant perimeter stays intact through the build."
        highlights={[
          "8 ft galvanized or black vinyl fabric",
          "Full-height vinyl privacy slats",
          "Schedule-40 posts, concrete-set",
          "Cantilever slide access gates",
          "Barbed / razor-tape topping options",
          "Coordinated builds on licensed sites",
        ]}
        applications={[
          { title: "Cultivation facilities", body: "Indoor, greenhouse and outdoor cultivation sites — restricted-visibility perimeter, controlled vehicle access and secondary fencing for outdoor grow areas." },
          { title: "Processing & storage", body: "Extraction, processing and vault-adjacent yards — perimeter fencing that supports monitored intrusion detection and controlled personnel access." },
          { title: "Micro-cultivation & nursery", body: "Micro and nursery licence holders — smaller perimeter footprints with the same physical security posture as commercial cultivators." },
          { title: "Distribution & retail back-of-house", body: "Licensed distribution yards and retail loading zones needing screened, gated back-of-house perimeter." },
        ]}
        specs={[
          { label: "Fabric", value: "9 ga galvanized or black vinyl" },
          { label: "Heights", value: "8 ft standard (10 ft on request)" },
          { label: "Screening", value: "Full vinyl privacy slats" },
          { label: "Posts", value: "Schedule-40, concrete-set" },
          { label: "Gates", value: "Cantilever slide · double swing · pedestrian" },
          { label: "Service area", value: "Fraser Valley · Lower Mainland · BC" },
        ]}
        faq={FAQ}
        related={[
          { to: "/chain-link-fencing", label: "Chain link fencing" },
          { to: "/commercial-chain-link-fencing", label: "Commercial chain link" },
          { to: "/metal-gates", label: "Custom & cantilever gates" },
          { to: "/airport-fencing", label: "Airport perimeter fencing" },
          { to: "/port-fencing", label: "Port & marine terminal fencing" },
        ]}
      >
        <ProjectShowcase
          category="Chain Link"
          eyebrow="Compliant perimeter case studies"
          title="Restricted-visibility installs"
          subtitle="Privacy-slat chain link, controlled access gates and heavy commercial perimeters from projects that translate to Health Canada cannabis facility spec."
          surface="service-cannabis"
        />
      </ServiceContent>
      <CtaStrip />
    </PageShell>
  );
}
