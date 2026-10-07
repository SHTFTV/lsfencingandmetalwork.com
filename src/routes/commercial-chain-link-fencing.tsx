import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import projectImage from "@/assets/gallery/8ft-galv-commercial-security.jpeg";

const FAQ: FaqItem[] = [
  {
    q: "What determines the specification for commercial fencing?",
    a: "Fence height, fabric, posts, footings and gate hardware depend on site conditions, security needs and the approved project specification. Send drawings and the intended use with your quote request; there is no single specification suitable for every property.",
  },
  {
    q: "Can you include vehicle and pedestrian gates?",
    a: "LS Fencing offers custom metal gates alongside fencing. Describe the vehicles, opening width, pedestrian route and available space so swing, sliding or cantilever options can be reviewed.",
  },
  {
    q: "How should we prepare a commercial fencing enquiry?",
    a: "Send the site address, approximate fence length, photographs, proposed gate openings, existing-fence removal requirements and any drawings. Identify the site contact and access restrictions. Final scope and scheduling must be confirmed with the crew.",
  },
];
const IMAGE = {
  src: projectImage,
  alt: "LS Fencing galvanized commercial chain link security enclosure",
  caption: "LS Fencing project gallery · Commercial chain link",
};
export const Route = createFileRoute("/commercial-chain-link-fencing")({
  head: () =>
    serviceHead({
      title: "Commercial Chain Link Fencing \u2014 Fraser Valley | LS Fencing",
      description:
        "Commercial chain link fencing and gate planning for yards, warehouses and business properties across the Fraser Valley and Lower Mainland.",
      serviceName: "Commercial Chain Link Fencing",
      path: "/commercial-chain-link-fencing",
      image: IMAGE,
      faq: FAQ,
    }),
  component: Page,
});
function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow={"Commercial & Industrial"}
        title={"Commercial Chain Link Fencing"}
        intro={
          "Commercial chain link fencing and gate planning for yards, warehouses and business properties across the Fraser Valley and Lower Mainland."
        }
      />
      <ServiceContent
        image={IMAGE}
        intro={
          "Commercial fencing should protect the perimeter without disrupting deliveries, staff access or daily operations. LS Fencing & Metal Work installs chain link fencing and fabricates gates for business and industrial properties in the Fraser Valley and Lower Mainland. Start with the work your site needs to do: a storage yard, a loading area and a shared commercial boundary each need a different layout. The quote should identify the proposed materials, openings, removal work and site assumptions before installation is scheduled."
        }
        highlights={[
          "Perimeter layout and gate planning",
          "Galvanized and vinyl-coated options",
          "Existing fence replacement enquiries",
          "Vehicle and pedestrian access review",
          "Site-specific material specifications",
          "Written scope for your project",
        ]}
        applications={[
          {
            title: "Storage and contractor yards",
            body: "Plan gate openings around the actual trucks and trailers using the yard. Identify turning space, staging areas and secure pedestrian access before choosing a gate layout.",
          },
          {
            title: "Warehouses and loading areas",
            body: "Separate delivery access from staff routes. Discuss loading hours, working space and any temporary access arrangements needed during installation.",
          },
          {
            title: "Commercial property boundaries",
            body: "Identify the agreed boundary, existing utilities, grade changes and neighbouring access. Confirm which party approves the fence line before excavation.",
          },
          {
            title: "Security enclosures",
            body: "Describe the equipment or area being protected, required visibility and access frequency. Privacy slats and security additions need a site-specific review, including wind exposure and applicable restrictions.",
          },
        ]}
        faq={FAQ}
        related={[
          { to: "/strata-fencing", label: "Strata fencing" },
          { to: "/metal-gates", label: "Custom gates" },
          { to: "/blog/strata-fence-replacement-scope-checklist", label: "Strata scope checklist" },
          { to: "/blog/fence-quote-checklist-fraser-valley", label: "Compare fence quotes" },
        ]}
      >
        <section className="space-y-4">
          <h2 className="font-display uppercase text-2xl">From site review to agreed scope</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              Send photos, approximate measurements and the property address through our{" "}
              <a className="text-primary underline" href="/contact">
                quote form
              </a>
              .
            </li>
            <li>
              Identify the decision maker, access restrictions and any drawings or specifications
              that govern the work.
            </li>
            <li>
              Review materials, gates, removal, site preparation, exclusions and timing with the
              crew before approving the project.
            </li>
          </ol>
          <p>
            Serving Chilliwack, Abbotsford, Langley, Surrey and surrounding Fraser Valley and Lower
            Mainland communities. Confirm availability for your address when enquiring.
          </p>
          <a className="text-primary underline" href="/gallery">
            View completed fencing and metal work projects
          </a>
        </section>
      </ServiceContent>
      <CtaStrip />
    </PageShell>
  );
}
