import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/ornamental-powdercoat-chilliwack.jpeg";

const IMAGE = { src: heroImg, alt: "Black powder-coated ornamental steel fence panels next to a stone column in Chilliwack BC", title: "Powder-coated ornamental steel fence — Chilliwack, BC", caption: "Powder-Coated Steel · Chilliwack, BC" };

const FAQ: FaqItem[] = [
  { q: "Can it follow slope?", a: "Yes — our panels rack up to 20° without cutting, keeping picket tops level with grade." },
  { q: "Custom colours?", a: "Bronze, white, and green are commonly available. Any RAL colour can be quoted on custom orders." },
  { q: "Do you install automatic gates?", a: "Yes. We rough in conduit, gate posts, and can coordinate with your gate operator installer." },
];

const DESCRIPTION =
  "Powder-coated ornamental steel fencing and matching gates — architectural look with commercial durability.";

export const Route = createFileRoute("/ornamental-fencing")({
  head: () => serviceHead({
    title: "Ornamental Iron Fencing — Steel Panels & Gates | LS Fencing",
    ogTitle: "Ornamental Iron Fencing — Steel Panels & Gates",
    description: DESCRIPTION,
    ogDescription: "Powder-coated ornamental steel panels for pools, estates, commercial frontages and pump houses.",
    serviceName: "Ornamental Iron Fencing",
    path: "/ornamental-fencing",
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
        title="Ornamental Fencing"
        intro="Powder-coated steel panels with clean vertical pickets — the architectural upgrade from chain link, without the maintenance cost of cedar."
      />
      <ServiceContent
        image={IMAGE}
        intro="Ornamental steel fencing gives you a permanent, low-maintenance perimeter that still looks intentional. Pre-fab panels install fast; posts are set in concrete with adjustable brackets to handle any grade."
        highlights={[
          "Pre-fab powder-coated steel panels",
          "2-rail and 3-rail designs",
          "Flat-top, pressed-spear, and pool-code styles",
          "Matching walk and drive gates",
          "Racks to follow sloped terrain",
          "Black satin finish standard",
        ]}
        applications={[
          { title: "Pool & spa enclosures", body: "Pool-code compliant heights and picket spacing with self-closing self-latching gates." },
          { title: "Commercial frontages", body: "Bank branches, medical offices, and retail plazas that need a secure but presentable street perimeter." },
          { title: "Estate & acreage", body: "Property-line and driveway entry fencing with matched columns and automated gates." },
          { title: "Municipal & utility", body: "Pump houses, substations, and civic properties requiring MMCD-spec finishing." },
        ]}
        specs={[
          { label: "Material", value: "Powder-coated steel" },
          { label: "Standard finish", value: "Satin black" },
          { label: "Heights", value: "4 ft · 5 ft · 6 ft · 8 ft" },
          { label: "Picket spacing", value: "Pool-code (≤4\") available" },
          { label: "Post spec", value: "2\" or 2.5\" steel, concrete-set" },
          { label: "Warranty", value: "Manufacturer coating warranty" },
        ]}
        faq={FAQ}
        related={[
          { to: "/metal-gates", label: "Custom metal gates" },
          { to: "/cedar-fencing", label: "Cedar privacy fencing" },
          { to: "/welding-services", label: "Welding & fabrication" },
        ]}
      >
        <ProjectShowcase
          category="Ornamental"
          eyebrow="Ornamental case studies"
          title="Recent ornamental installs"
          subtitle="Powder-coated steel panels, storefront frontages and matching gates — tap for the full photo."
          surface="service-ornamental"
        />
      </ServiceContent>
      <CtaStrip />
    </PageShell>
  );
}
