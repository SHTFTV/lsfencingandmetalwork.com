import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/shop-welding-kubota-fabrication.jpg.asset.json";

const IMAGE = { src: heroImg.url, alt: "LS Fencing welder MIG welding a custom steel attachment on a Kubota skid steer inside the fabrication shop in Chilliwack", title: "Custom in-shop welding and fabrication — Chilliwack, BC", caption: "In-Shop Fabrication · Chilliwack, BC" };

const FAQ: FaqItem[] = [
  { q: "Can you weld aluminum?", a: "Yes — TIG on aluminum and stainless is available; call ahead so we bring the right rig." },
  { q: "Do you weld on-site or in shop?", a: "Both. Small fabrications happen in our Chilliwack shop; repairs and installs are mobile." },
  { q: "Do you supply engineered drawings?", a: "For structural work we work from your engineered drawings, or we can coordinate with an engineer." },
];

const DESCRIPTION =
  "Mobile MIG, TIG and stick welding for repairs, fabrication, gates, railings and custom metal work across the Lower Mainland.";

export const Route = createFileRoute("/welding-services")({
  head: () => serviceHead({
    title: "Welding Services — Mobile Welder Fraser Valley | LS Fencing",
    ogTitle: "Welding Services — Mobile Welder Fraser Valley",
    description: DESCRIPTION,
    ogDescription: "Repairs, custom fabrication, and on-site welding — CWB-quality workmanship.",
    serviceName: "Welding & Metal Fabrication",
    path: "/welding-services",
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
        title="Welding & Metal Fabrication"
        intro="MIG, TIG and stick welding — mobile or in-shop. Structural repairs, custom fabrication, railings, and one-off metal work anywhere in the Lower Mainland."
      />
      <ServiceContent
        image={IMAGE}
        intro="If it's steel and it needs to hold together, we can help. From cracked equipment brackets to full MMCD-spec handrail installs, our welders come with mobile power and can quote on-site or from your drawings."
        highlights={[
          "MIG · TIG · stick processes",
          "Mobile rig — we come to you",
          "Structural, ornamental, and repair work",
          "Handrails, guardrails, and stairs",
          "Truck racks, trailers, and equipment mods",
          "MMCD-spec fabrication",
        ]}
        applications={[
          { title: "On-site repairs", body: "Broken gates, cracked frames, damaged railings — welded in place so you don't have to disassemble." },
          { title: "Custom fabrication", body: "Truck racks, bumpers, brackets, safety cages and one-off shop fixtures built to your spec." },
          { title: "Handrails & guardrails", body: "MMCD-spec handrails, industrial guardrail, wheelchair-accessible ramps, and code-compliant stair rails." },
          { title: "Contractor overflow", body: "Take-on welding for GCs and shops during peak season. Insured, ticketed, and reliable." },
        ]}
        specs={[
          { label: "Processes", value: "MIG · TIG · SMAW" },
          { label: "Materials", value: "Mild steel · Stainless · Aluminum" },
          { label: "Coverage", value: "Fraser Valley & Lower Mainland" },
          { label: "Deliverables", value: "Repair · Fabrication · Install" },
          { label: "Finish", value: "Painted · Galvanized · Powder-coated" },
          { label: "Insurance", value: "Fully insured — WCB active" },
        ]}
        faq={FAQ}
        related={[
          { to: "/metal-gates", label: "Custom metal gates" },
          { to: "/barrier-gates-hand-rails", label: "Barrier gates & handrails" },
          { to: "/ornamental-fencing", label: "Ornamental steel fencing" },
        ]}
      />
      <CtaStrip />
    </PageShell>
  );
}
