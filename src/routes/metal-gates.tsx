import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";

export const Route = createFileRoute("/metal-gates")({
  head: () => ({
    meta: [
      { title: "Custom Metal Gates — Driveway, Cantilever & Swing | LS Fencing" },
      { name: "description", content: "In-house fabricated metal gates: cantilever slide, double swing, and single drive gates for residential, commercial and industrial sites." },
      { property: "og:title", content: "Custom Metal Gates — Driveway, Cantilever & Swing" },
      { property: "og:description", content: "Fabricated in our Chilliwack shop and installed across BC." },
      { property: "og:url", content: "/metal-gates" },
    ],
    links: [{ rel: "canonical", href: "/metal-gates" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Service"
        title="Custom Metal Gates"
        intro="Cantilever, swing, and slide driveway gates fabricated in-house — from privacy louvered panels to heavy industrial spans."
      />
      <ServiceContent
        swatch="from-zinc-800 via-zinc-900 to-black"
        intro="Every gate is welded to spec in our Chilliwack shop, then set on concrete-poured posts sized for the span. Whether you need a 6×24 cantilever for a truck yard or a matched double-swing for a rural driveway, we design the frame, order the fabric or infill, and install it as one turn-key job."
        highlights={[
          "Cantilever slide gates up to 40+ ft",
          "Single & double swing drive gates",
          "Walk gates matched to any fence style",
          "Chain link, ornamental, or louvered infill",
          "Prepped for automation & keypad entry",
          "Heavy-wall posts sized for span & wind load",
        ]}
        applications={[
          { title: "Cantilever slide gates", body: "The go-to for commercial yards — no track on the ground, clears snow and debris, and self-supports across the opening." },
          { title: "Double swing drive gates", body: "Traditional look for acreage and estate driveways. Matched cedar or ornamental infill available." },
          { title: "Barrier & parking gates", body: "Manual and motorized barrier arms for parking lot control and site access management." },
          { title: "Automated entry systems", body: "We rough in conduit and gate operators or coordinate with your automation contractor." },
        ]}
        specs={[
          { label: "Cantilever spans", value: "Up to 40 ft standard" },
          { label: "Post spec", value: "6×6 sch-40 or larger" },
          { label: "Fabric / infill", value: "Chain link · Steel · Cedar" },
          { label: "Finish", value: "Galvanized · Powder-coated" },
          { label: "Automation", value: "Operator-ready or turn-key" },
          { label: "Service area", value: "Fraser Valley & Lower Mainland" },
        ]}
        faq={[
          { q: "Do you install the gate operator too?", a: "We can supply and install popular residential and commercial operators, or coordinate with your preferred automation company." },
          { q: "How wide can a cantilever gate be?", a: "Standard hardware handles up to 40 ft clear opening. Wider spans are engineered case-by-case." },
          { q: "How long does fabrication take?", a: "Most drive gates are ready to install within 2–3 weeks of quote approval." },
        ]}
        related={[
          { to: "/barrier-gates", label: "Barrier gates" },
          { to: "/chain-link-fencing", label: "Chain link fencing" },
          { to: "/welding-services", label: "Welding & fabrication" },
        ]}
      />
      <CtaStrip />
    </PageShell>
  );
}
