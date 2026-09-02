import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/high-security-cantilever-gate-farm.jpeg";

const IMAGE = {
  src: heroImg,
  alt: "Galvanized cantilever driveway gate securing an industrial yard — port and marine terminal grade perimeter installed by LS Fencing",
  title: "Port & marine terminal fencing — Lower Mainland, BC",
  caption: "Marine Terminal · Cantilever Access",
};

const FAQ: FaqItem[] = [
  { q: "Do you build to port authority and CBSA fencing standards?", a: "Yes. We install 8–10 ft galvanized chain link with barbed toppings, schedule-40 posts and cantilever slide gates configured for port authority perimeter and CBSA controlled-access requirements." },
  { q: "Can you handle marine and salt-air corrosion?", a: "For dockside and marine terminal runs we specify hot-dip galvanized fabric and posts, stainless hardware and vinyl-coated finishes to hold up against salt air and heavy wash-down." },
  { q: "Do you install container-yard cantilever gates?", a: "Yes — 6 ft to 10 ft tall cantilever slide gates up to 40 ft opening, sized for reach-stacker and truck traffic in container yards and staging lots." },
];

const DESCRIPTION =
  "Port, marine terminal and container yard fencing across BC — galvanized chain link, cantilever slide gates, corrosion-rated hardware and CBSA-compliant access perimeters.";

export const Route = createFileRoute("/port-fencing")({
  head: () => {
    const base = serviceHead({
      title: "Port & Marine Terminal Fencing — BC | LS Fencing",
      ogTitle: "Port & Marine Terminal Fencing — BC",
      description: DESCRIPTION,
      ogDescription: "Galvanized perimeter fencing, cantilever gates and CBSA-grade access for BC ports, marine terminals and container yards.",
      serviceName: "Port & Marine Terminal Fencing",
      serviceType: "Port Security Fencing",
      path: "/port-fencing",
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
        eyebrow="Specialty · Marine & Logistics"
        title="Port & Marine Terminal Fencing"
        intro="Galvanized perimeter fencing, cantilever slide gates and CBSA-grade controlled access for BC ports, marine terminals and container yards."
      />
      <ServiceContent
        image={IMAGE}
        priorityImage
        intro="Marine terminals live under wash-down, salt air and constant truck traffic. We spec hot-dip galvanized fabric on schedule-40 posts, corrosion-rated hardware, and cantilever slide gates sized for reach-stacker and drayage flow — built to port authority and CBSA controlled-access spec."
        highlights={[
          "8–10 ft hot-dip galvanized fabric",
          "Barbed wire or razor-tape topping",
          "Schedule-40 posts, concrete-set",
          "Cantilever slide gates up to 40 ft",
          "Stainless / marine-grade hardware",
          "CBSA & port authority access spec",
        ]}
        applications={[
          { title: "Marine terminals", body: "Container terminals, ro-ro berths and bulk terminals — perimeter fencing and controlled truck gates that stay operational through wash-down and salt exposure." },
          { title: "Container & drayage yards", body: "Container staging, chassis yards and drayage lots — heavy cantilever gates sized for reach-stackers, top-picks and truck flow." },
          { title: "CBSA controlled-access", body: "Bonded warehouses and CBSA sufferance yards — perimeter fencing and gate arrangements that meet Canada Border Services controlled-access requirements." },
          { title: "Fuel & marine industrial", body: "Fuel farms, marine repair yards and dockside industrial sites needing corrosion-rated perimeter and gate hardware." },
        ]}
        specs={[
          { label: "Fabric", value: "9 ga hot-dip galvanized" },
          { label: "Heights", value: "8 ft · 10 ft standard" },
          { label: "Topping", value: "3-strand barb · razor tape" },
          { label: "Hardware", value: "Marine / stainless" },
          { label: "Gates", value: "Cantilever slide to 40 ft · double swing" },
          { label: "Service area", value: "Vancouver · Delta · Surrey · Lower Mainland" },
        ]}
        faq={FAQ}
        related={[
          { to: "/chain-link-fencing", label: "Chain link fencing" },
          { to: "/commercial-chain-link-fencing", label: "Commercial chain link" },
          { to: "/metal-gates", label: "Custom & cantilever gates" },
          { to: "/airport-fencing", label: "Airport perimeter fencing" },
          { to: "/cannabis-fencing", label: "Cannabis facility fencing" },
        ]}
      >
        <ProjectShowcase
          category="Gates"
          eyebrow="Terminal-grade case studies"
          title="Cantilever & perimeter installs"
          subtitle="Cantilever slide gates and heavy commercial perimeter runs from projects that translate directly to port, terminal and CBSA-compliant sites."
          surface="service-port"
        />
      </ServiceContent>
      <CtaStrip />
    </PageShell>
  );
}
