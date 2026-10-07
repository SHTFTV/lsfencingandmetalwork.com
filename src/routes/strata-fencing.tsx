import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import projectImage from "@/assets/gallery/8ft-galv-commercial-security.jpeg";

const FAQ: FaqItem[] = [
  {
    q: "What should a strata council send for a fencing quote?",
    a: "Send the property address, photos, approximate lengths, damaged sections, gate locations and any existing drawings. Identify who is coordinating the enquiry and whether the council is comparing repairs, full replacement or phased work.",
  },
  {
    q: "Should a strata repair the fence or replace it?",
    a: "A localized issue may suit repair where surrounding posts and panels remain sound. Repeated failure, widespread deterioration or a changed access layout may justify replacement. A site review is needed before deciding; photographs alone cannot establish the condition of every footing.",
  },
  {
    q: "Can the project be planned around resident access?",
    a: "Discuss occupied parking stalls, pedestrian routes, pets, deliveries and work-hour restrictions when requesting a quote. Ask for the access arrangements and any temporary barriers to be included in the agreed scope.",
  },
  {
    q: "Do you also take residential enquiries?",
    a: "Yes. Residential fencing and gate projects are welcome alongside commercial, industrial and strata work.",
  },
];
const IMAGE = {
  src: projectImage,
  alt: "LS Fencing galvanized commercial chain link security enclosure",
  caption: "LS Fencing project gallery · Commercial chain link",
};
export const Route = createFileRoute("/strata-fencing")({
  head: () =>
    serviceHead({
      title: "Strata Fencing & Gate Replacement \u2014 Fraser Valley | LS Fencing",
      description:
        "Strata fence repairs, replacement and gate planning for councils and property managers across the Fraser Valley and Lower Mainland.",
      serviceName: "Strata Fencing & Gate Replacement",
      path: "/strata-fencing",
      image: IMAGE,
      faq: FAQ,
    }),
  component: Page,
});
function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow={"Councils & Property Managers"}
        title={"Strata Fencing & Gate Replacement"}
        intro={
          "Strata fence repairs, replacement and gate planning for councils and property managers across the Fraser Valley and Lower Mainland."
        }
      />
      <ServiceContent
        image={IMAGE}
        intro={
          "Strata fencing is a shared-property project: councils need a scope they can compare, and residents need to understand how the work affects access. LS Fencing & Metal Work welcomes fence and gate enquiries from strata councils and property managers throughout the Fraser Valley and Lower Mainland. Describe the condition of the existing fence and the outcome you need. The first decision is whether to repair isolated damage, replace a complete run or price phased work across several areas."
        }
        highlights={[
          "Repair and replacement scope planning",
          "Cedar, chain link and ornamental options",
          "Shared perimeter and gate enquiries",
          "Resident and parking access considerations",
          "Removal and disposal scope discussion",
          "Phased project enquiries",
        ]}
        applications={[
          {
            title: "Townhouse boundaries",
            body: "Map the common-property fence runs, patio interfaces and pedestrian gates. Identify sections with different materials or heights so all quotes cover the same work.",
          },
          {
            title: "Shared vehicle access",
            body: "Record gate opening width, driveway slope and available run-back or swing space. Clarify whether the enquiry concerns the gate structure, powered equipment or both; specialist work and safety requirements must be confirmed separately.",
          },
          {
            title: "Occupied strata properties",
            body: "Provide work-hour restrictions and the areas where parking or foot traffic cannot be interrupted. Confirm who sends resident notices and manages access before work begins.",
          },
          {
            title: "Budgeting and phased replacement",
            body: "Ask for separately identified repair and replacement areas, material options, removal allowances and exclusions. A useful council comparison is based on matching scopes rather than headline price alone.",
          },
        ]}
        faq={FAQ}
        related={[
          { to: "/commercial-chain-link-fencing", label: "Commercial fencing" },
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
