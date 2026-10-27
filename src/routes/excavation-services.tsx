import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CtaStrip } from "@/components/PageShell";
import { ServiceContent } from "@/components/ServiceContent";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { serviceHead, type FaqItem } from "@/lib/service-schema";
import heroImg from "@/assets/gallery/kubota-kx033-excavator-post-line.jpg";

const IMAGE = { src: heroImg, alt: "Operator running an orange Kubota KX033-4 mini excavator digging a fence post line in a rural Fraser Valley pasture", title: "Excavation and post-line digging — Fraser Valley, BC", caption: "Kubota KX033 · Fraser Valley, BC" };

const FAQ: FaqItem[] = [
  { q: "Do you do excavation-only work?", a: "Yes — we're happy to price small excavation jobs that aren't tied to a fence install." },
  { q: "Do you locate utilities?", a: "We always call for a BC 1 Call locate before digging, and we work around marked lines." },
  { q: "Can you haul away the spoils?", a: "Yes, dump-run haul-away is quoted per load." },
];

const DESCRIPTION =
  "Abbotsford excavation enquiries for mini-excavator work, fence-post preparation, drainage trenching and site prep. Contact Luke at LS Fencing & Metal Work.";

export const Route = createFileRoute("/excavation-services")({
  head: () => serviceHead({
    title: "Excavation Contractor Abbotsford | Mini Excavation | LS Fencing",
    ogTitle: "Abbotsford Excavation Contractor — Mini Excavation & Post Work",
    description: DESCRIPTION,
    ogDescription: "Discuss your Abbotsford site, access, post work and small-excavation scope directly with LS Fencing.",
    serviceName: "Excavation Services",
    path: "/excavation-services",
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
        title="Excavation contractor for Abbotsford & the Fraser Valley"
        intro="Mini-excavator work for Abbotsford fence lines, post holes, drainage trenching and site preparation, with service across the Fraser Valley."
      />
      <ServiceContent
        image={IMAGE}
        intro="For an Abbotsford excavation enquiry, start with the property location, access width and the work you need. Fencing usually starts with digging. We run a compact excavator so we can get onto tight residential lots, dig clean post holes on rocky ground, trench in drainage, and grade the fence line before the crew shows up."
        highlights={[
          "Mini-excavator (fits through 4-ft gates)",
          "Fence-line clearing & grading",
          "Post holes on rocky or root-bound sites",
          "Drainage trenching",
          "Rough site prep",
          "Debris haul-away available",
        ]}
        applications={[
          { title: "Fence-line prep", body: "Clear brush, remove old fence lines, and grade to a workable elevation before install." },
          { title: "Post holes on tough sites", body: "Rocky, clay, and root-bound ground drilled or dug clean so the fence posts land plumb." },
          { title: "Drainage trenching", body: "French drain and downspout trenching to keep fence lines and gates from sitting in water." },
          { title: "Small demo & haul-away", body: "Old fence, sheds, or debris removed with the fence-install job — nothing left behind." },
        ]}
        specs={[
          { label: "Equipment", value: "Mini-excavator + skid steer" },
          { label: "Access", value: "Fits through 4-ft gate" },
          { label: "Typical jobs", value: "½ day – 3 days" },
          { label: "Add-ons", value: "Haul-away · Import fill" },
          { label: "Coverage", value: "Fraser Valley & Lower Mainland" },
          { label: "Insurance", value: "Fully insured — WCB active" },
        ]}
        faq={FAQ}
        related={[
          { to: "/chain-link-fencing", label: "Chain link fencing" },
          { to: "/cedar-fencing", label: "Cedar fencing" },
          { to: "/snow-removal", label: "Snow removal" },
          { to: "/airport-fencing", label: "Airport perimeter fencing" },
          { to: "/port-fencing", label: "Port & marine terminal fencing" },
          { to: "/cannabis-fencing", label: "Cannabis facility fencing" },
        ]}
      >
        <section className="my-10 rounded-xl border border-border bg-muted/30 p-6" aria-labelledby="abbotsford-excavation-brief">
          <h2 id="abbotsford-excavation-brief" className="text-2xl font-bold">Planning excavation work in Abbotsford</h2>
          <p className="mt-4">Tell Luke whether the work is a fence-post line, a small excavation, trenching or preparation beside an existing structure. Send the Abbotsford site address, wide photographs of the approach and work area, approximate dimensions, and whether spoil needs to leave the property. Confirm the actual scope, equipment access and timing directly before booking.</p>
          <p className="mt-4">Ground conditions and utility-location arrangements belong in the site review. Do not assume a photographed machine will fit your access or that an archive photograph records an Abbotsford job. Existing equipment photographs show LS Fencing’s work; individual locations are stated only where supplied.</p>
          <p className="mt-4"><a className="font-semibold underline" href="https://abbotsford.io/directory/excavation/lsfencing">See LS Fencing’s Abbotsford excavation and equipment profile →</a></p>
          <p className="mt-3"><a className="font-semibold underline" href="/abbotsford-chain-link-fence-contractor">Need the fence installed as well? Abbotsford fencing →</a></p>
          <p className="mt-4">Call <a className="font-semibold underline" href="tel:+16047580014">604-758-0014</a> or email <a className="font-semibold underline" href="mailto:lsfencingandmetalwork@gmail.com?subject=Abbotsford%20excavation%20enquiry">LS Fencing with your site details</a>.</p>
        </section>
        <ProjectShowcase
          excludeSrc={IMAGE.src}
          category="Excavation"
          eyebrow="Excavation case studies"
          title="Recent excavation work"
          subtitle="Post-line dig, hydraulic auger, and mobile skid steer / mini-ex work across the Fraser Valley."
          surface="service-excavation"
        />
      </ServiceContent>
      <CtaStrip />
    </PageShell>
  );
}
