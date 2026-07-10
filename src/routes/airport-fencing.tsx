import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/galv-perimeter-barbwire.jpeg.asset.json";

const IMAGE = {
  src: heroImg.url,
  alt: "Tall galvanized chain link perimeter fence with three-strand barbed wire topping — airfield-grade security perimeter installed by LS Fencing",
  title: "Airport & airfield perimeter fencing — Fraser Valley, BC",
  caption: "Airfield Perimeter · Galvanized + Barb",
};

const FAQ: FaqItem[] = [
  { q: "Do you build fencing to airport perimeter standards?", a: "Yes. We install 8–12 ft galvanized chain link with 3-strand barbed wire or razor tape, schedule-40 posts, and concrete-set terminals — configured to meet Transport Canada AFR guidance and airport operator specs." },
  { q: "Can you work airside without disrupting operations?", a: "We stage builds in phased runs, coordinate with airside ops, and use temporary security fence panels so the operational perimeter is never open. Escorted access and background-checked crews on request." },
  { q: "What about wildlife exclusion at the fence line?", a: "We add buried skirt, small-mesh bottom panels, and grade sealing to control deer, coyote and small-mammal incursions along runway and taxiway perimeters." },
];

const DESCRIPTION =
  "High-security airport and airfield perimeter fencing across BC — galvanized chain link, barbed wire toppings, cantilever access gates and wildlife exclusion built to airside spec.";

export const Route = createFileRoute("/airport-fencing")({
  head: () =>
    serviceHead({
      title: "Airport & Airfield Perimeter Fencing — BC | LS Fencing",
      ogTitle: "Airport & Airfield Perimeter Fencing — BC",
      description: DESCRIPTION,
      ogDescription: "Airside-grade chain link, barbed toppings, cantilever access gates and wildlife exclusion for BC airports and airfields.",
      serviceName: "Airport Perimeter Fencing",
      serviceType: "Airport Security Fencing",
      path: "/airport-fencing",
      image: { src: IMAGE.src, alt: IMAGE.alt, title: IMAGE.title },
      faq: FAQ,
    }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Specialty · Aviation"
        title="Airport & Airfield Perimeter Fencing"
        intro="Airside-grade chain link, barbed wire toppings and cantilever access gates — installed to Transport Canada AFR guidance and airport operator spec across BC."
      />
      <ServiceContent
        image={IMAGE}
        intro="Airport perimeters have zero tolerance for gaps. We build 8–12 ft galvanized chain link with 3-strand barb or razor tape, schedule-40 posts on concrete footings, and cantilever slide gates for controlled vehicle access — phased so the operational perimeter is never open."
        highlights={[
          "8–12 ft galvanized chain link fabric",
          "3-strand barb or razor-tape topping",
          "Schedule-40 posts, concrete-set terminals",
          "Cantilever slide gates for vehicle access",
          "Wildlife exclusion skirt & grade sealing",
          "Phased builds with airside coordination",
        ]}
        applications={[
          { title: "Airport perimeters", body: "Full airside perimeter runs — new build, tie-ins and section replacements. Coordinated with airport ops so the security envelope stays intact." },
          { title: "Airfields & flight schools", body: "Regional airfields, flight training bases and private strips. Perimeter fence, controlled vehicle gates and pedestrian access." },
          { title: "Fuel & hangar compounds", body: "Fuel farms, hangar compounds and MRO yards inside the airport boundary — secondary security fencing with locked access." },
          { title: "Wildlife exclusion", body: "Buried skirt, small-mesh bottoms and grade sealing to control deer, coyote and small-mammal incursions near runway and taxiway edges." },
        ]}
        specs={[
          { label: "Fabric", value: "9 ga galvanized (airside spec)" },
          { label: "Heights", value: "8 ft · 10 ft · 12 ft" },
          { label: "Topping", value: "3-strand barb · razor tape" },
          { label: "Posts", value: "Schedule-40, concrete-set" },
          { label: "Gates", value: "Cantilever slide · double swing" },
          { label: "Service area", value: "Fraser Valley · Lower Mainland · BC" },
        ]}
        faq={FAQ}
        related={[
          { to: "/chain-link-fencing", label: "Chain link fencing" },
          { to: "/metal-gates", label: "Custom & cantilever gates" },
          { to: "/welding-services", label: "Welding & fabrication" },
          { to: "/port-fencing", label: "Port & marine terminal fencing" },
          { to: "/cannabis-fencing", label: "Cannabis facility fencing" },
        ]}
      >
        <ProjectShowcase
          category="Chain Link"
          eyebrow="Airside-grade case studies"
          title="High-security perimeter installs"
          subtitle="Galvanized runs, barb-wire toppings and cantilever access gates from projects that translate directly to airport and airfield spec. Tap any tile for the full photo."
          surface="service-airport"
        />
      </ServiceContent>
      <CtaStrip />
    </PageShell>
  );
}
