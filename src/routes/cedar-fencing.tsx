import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/custom-cedar-horizontal-slat.jpg.asset.json";

const IMAGE = { src: heroImg.url, alt: "Custom cedar privacy fence with horizontal slats along a stone-paver garden path in the Fraser Valley", title: "Custom horizontal-slat cedar privacy fence — Fraser Valley, BC", caption: "Horizontal Slat Cedar · Fraser Valley, BC" };

const FAQ: FaqItem[] = [
  { q: "Do you stain the fence?", a: "By default the cedar is left natural to age silver. We can apply a UV oil or stain on request for an added fee." },
  { q: "How deep are the posts?", a: "Minimum 3 ft below grade, concrete-set with gravel drainage. Deeper for drive gates and windy sites." },
  { q: "How long does cedar last here?", a: "A properly-built cedar fence lasts 15–25 years in the Fraser Valley — longer with periodic oiling." },
];

const DESCRIPTION =
  "Western red cedar privacy fences, board-on-board, and lattice-top designs built to survive BC weather across the Fraser Valley.";

export const Route = createFileRoute("/cedar-fencing")({
  head: () => serviceHead({
    title: "Cedar Fencing — Custom Wood Fences BC | LS Fencing",
    ogTitle: "Cedar Fencing — Custom Wood Fences BC",
    description: DESCRIPTION,
    ogDescription: "Hand-built western red cedar privacy fences with proper post depth and drainage.",
    serviceName: "Cedar Fencing",
    path: "/cedar-fencing",
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
        title="Cedar Fencing"
        intro="Premium western red cedar — cut on-site, spaced for airflow, and set on pressure-treated posts. Built to age gracefully in Fraser Valley rain."
      />
      <ServiceContent
        image={IMAGE}
        intro="Cedar is the classic BC privacy fence for good reason: naturally rot-resistant, dimensionally stable, and beautiful once it silvers. We build every panel with proper gap spacing, gravel drainage below the posts, and hidden or exposed fasteners depending on the look you want."
        highlights={[
          "1×6 rough or S4S western red cedar",
          "Pressure-treated 4×4 or 6×6 posts",
          "Board-on-board, good-neighbour, or picket",
          "Optional lattice or horizontal top cap",
          "Stainless or hot-dip galvanized fasteners",
          "Gravel-set posts on concrete footings",
        ]}
        applications={[
          { title: "Backyard privacy", body: "6-ft board-on-board runs with matched gate — the standard suburban privacy fence, done properly." },
          { title: "Front-yard picket & rail", body: "Lower open designs for curb appeal, pet enclosure, or property definition without blocking sightlines." },
          { title: "Lattice-top screens", body: "6-ft privacy with a 1-ft decorative lattice topper — great for pool areas and patios." },
          { title: "Custom horizontal cedar", body: "Modern flat-board designs with hidden hardware and clean shadow lines." },
        ]}
        specs={[
          { label: "Wood grade", value: "Rough / S4S western red cedar" },
          { label: "Posts", value: "PT 4×4 · 6×6 (drive gates)" },
          { label: "Fasteners", value: "SS or hot-dip galvanized" },
          { label: "Standard height", value: "4 ft · 5 ft · 6 ft · 8 ft" },
          { label: "Finish", value: "Natural · Stained on request" },
          { label: "Warranty", value: "1-year workmanship" },
        ]}
        faq={FAQ}
        related={[
          { to: "/ornamental-fencing", label: "Ornamental steel fencing" },
          { to: "/chain-link-fencing", label: "Chain link fencing" },
          { to: "/metal-gates", label: "Custom metal gates" },
        ]}
      />
      <CtaStrip />
    </PageShell>
  );
}
