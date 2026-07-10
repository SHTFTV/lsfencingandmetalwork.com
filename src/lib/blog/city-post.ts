import type { BlogPost, FaqItem, LinkRef } from "@/lib/blog";
import { CITIES, type CityFact } from "./cities";

/**
 * Assembles a ~2000-word city fencing guide from a CityFact record.
 * Prose alternates between shared industry knowledge and city-specific
 * facts (climate, terrain, neighbourhoods, bylaw, unique paragraphs, FAQ)
 * so each post is genuinely unique for search + LLM ingestion.
 */
function buildPost(city: CityFact): BlogPost {
  const { name, region, neighbourhoods, commonProjects } = city;
  const nbhList = neighbourhoods.join(", ");
  const projectList = commonProjects.join(", ");

  const internalLinks: LinkRef[] = [
    { to: "/chain-link-fencing", label: "Chain link fencing" },
    { to: "/cedar-fencing", label: "Cedar fencing" },
    { to: "/ornamental-fencing", label: "Ornamental fencing" },
    { to: "/metal-gates", label: "Custom metal gates" },
    { to: "/welding-services", label: "On-site welding" },
    { to: "/excavation-services", label: "Excavation & post drilling" },
    { to: "/pricing", label: "Fencing price guide" },
    { to: "/gallery", label: "Project gallery" },
    { to: "/contact", label: `Book a free quote in ${name}` },
    { to: "/chilliwack-chain-link-fence-company", label: "Chilliwack fencing" },
    { to: "/abbotsford-chain-link-fence-contractor", label: "Abbotsford fencing" },
  ];

  const externalLinks: LinkRef[] = [
    { to: city.bylawUrl, label: city.bylawUrlLabel, external: true },
    { to: "https://www.bccodes.ca/", label: "BC Building Code (Building & Safety Standards Branch)", external: true },
    { to: "https://www.worksafebc.com/en", label: "WorkSafeBC — worksite safety standards", external: true },
  ];

  const faq: FaqItem[] = city.faq;

  const keyTakeaways: string[] = [
    `Most residential fences in ${name} sit at ${city.bylawHeight} — anything taller triggers a variance.`,
    `${city.climate} That shapes what materials survive here long-term.`,
    `Our crew installs ${commonProjects[0].toLowerCase()} and ${(commonProjects[1] ?? "gates").toLowerCase()} across ${name} weekly — one crew, in-house welding, no subcontractors.`,
    `Free on-site quotes across ${name}, typically within 48 hours.`,
  ];

  const body: BlogPost["body"] = [
    // Intro — city-specific
    { type: "p", text: `Fencing in ${name} sits at the intersection of ${region.toLowerCase()} weather, tight municipal setback rules, and lots that range from ${city.terrain.toLowerCase().replace(/\.$/, "")}. We've been installing chain link, cedar, ornamental steel, and custom gates across ${name} and the surrounding Fraser Valley for over a decade — this guide is a straight rundown of what actually works on the ground here, what the bylaw allows, and what a typical project looks like from quote to backfill.` },
    { type: "p", text: `Whether you're a homeowner in ${neighbourhoods[0]} planning a backyard privacy fence, a property manager securing a strata perimeter, or a contractor lining up sub-trades on a ${name} commercial build, the same three things decide whether a fence lasts: post depth, post material, and how it's tied back to your specific soil and grade. That's what we'll cover.` },
    { type: "p", text: city.uniqueParagraphs[0] },

    // Section 1 — Conditions
    { type: "h2", text: `Fencing conditions in ${name}` },
    { type: "p", text: `${city.climate} For a fence that means UV, moisture cycling, wind loading, and — in the winter months — freeze-thaw at ground level. Every one of those wears on a different part of the assembly.` },
    { type: "p", text: `${city.terrain} That matters because the failure point of almost every fence is the post, and the post's job is to transfer wind load into the ground. Loose or shallow-sinking soil calls for deeper holes and a stiffer concrete mix; rocky or clay-heavy sites often need coring or a percussion bit rather than a standard auger.` },
    { type: "ul", items: [
      "Post depth: minimum 30 in. for standard 6 ft residential fences, 36–42 in. for gates and any run over 6 ft.",
      "Concrete: crown the top so water sheds off the post rather than pooling around it.",
      "Fasteners: hot-dip galvanized or stainless — plain zinc-plated screws bleed rust within two winters on the coast.",
      "Rail spacing: three rails on any run over 5 ft, especially where wind rolls off open ground.",
    ]},

    // Section 2 — What we build
    { type: "h2", text: `What we build most in ${name}` },
    { type: "p", text: `The projects we bid on across ${name} fall into a handful of recurring shapes: ${projectList.toLowerCase()}, and the odd custom gate or handrail welded up in our shop. Below is what each of those typically looks like for a ${name} property.` },
    { type: "h3", text: "Residential privacy — cedar or black chain link" },
    { type: "p", text: `The most common request. A rear-yard cedar privacy fence at ${city.bylawHeight.split(",")[0].trim()} is the default look for most ${name} backyards. Black vinyl-coated chain link is a lower-cost alternative that disappears into landscaping and lasts twice as long. We frame in the gates the same day so nothing sits open overnight.` },
    { type: "h3", text: "Commercial and strata perimeters" },
    { type: "p", text: `Galvanized chain link with a 9-gauge mesh, top and bottom rail, and either barbed wire or a smooth rail top depending on tenant use. ${name} strata boards typically want colour-matched black; commercial yards want visibility and drive-through gates sized for a semi.` },
    { type: "h3", text: "Ornamental and driveway gates" },
    { type: "p", text: `Powder-coated ornamental steel for front yards on premium ${name} properties, plus custom cantilever or swing driveway gates fabricated and welded in-house. We tie into keypad, card-reader, or LTE gate operators as needed.` },
    { type: "p", text: city.uniqueParagraphs[1] },

    // Section 3 — Bylaw
    { type: "h2", text: `Permits and bylaws in ${name}` },
    { type: "p", text: city.bylawSummary },
    { type: "p", text: `Practically, in ${name} that means: ${city.bylawHeight}. Corner lots almost always have an extra sightline triangle at the intersection where fence height drops to about 3 ft to protect visibility for drivers. Pools require their own enclosure standard under the BC Building Code regardless of what the city bylaw says.` },
    { type: "p", text: `We pull the current bylaw text from the ${city.bylawUrlLabel} before every ${name} quote so the fence you approve is the fence we can legally build. If you're planning something above the standard height — a security perimeter, an equipment yard screen, an acoustic fence along a busy road — a variance is usually possible but adds four to eight weeks to the timeline.` },
    { type: "ul", items: [
      "Front yard: typically capped lower than rear yard for streetscape and sightlines.",
      "Corner lots: sightline triangle rules apply at intersections.",
      "Pool enclosures: BC Building Code Part 9 governs — self-closing, self-latching gate required.",
      "Retaining-wall fences: anything over 1.2 m of exposed wall generally needs an engineered permit.",
    ]},

    // Section 4 — Materials
    { type: "h2", text: `Materials that hold up in ${name}` },
    { type: "p", text: `${city.materialNotes} We break the material choice down by where the fence lives — coastal exposure and shade both change what will actually last.` },
    { type: "h3", text: "Galvanized and vinyl-coated chain link" },
    { type: "p", text: `The workhorse. Hot-dip galvanized before weaving is the spec you want — pre-galvanized wire rusts out at the cut ends within a decade in our climate. Black vinyl coating over galvanized adds another 15–20 years of corrosion protection and cuts glare, which is why it's the default on ${name} residential rear yards now.` },
    { type: "h3", text: "Western red cedar" },
    { type: "p", text: `Locally milled, naturally rot- and insect-resistant, and the material of choice for privacy runs. Expect 15–25 years with basic maintenance — a stain or oil every 3–5 years extends that meaningfully. Rough-sawn boards weather to silver; smooth boards take stain more evenly.` },
    { type: "h3", text: "Ornamental steel" },
    { type: "p", text: `Powder-coated steel picket for front yards, entry gates, and pool enclosures. Zero maintenance, holds up structurally for decades, and gives you the security of steel without looking like a jail yard.` },
    { type: "h3", text: "Pressure-treated softwood — usually not" },
    { type: "p", text: `We rarely spec pressure-treated fence boards in ${name}. In our wet climate PT boards cup, twist, and check faster than cedar, and the cost gap has closed. Where we do use PT is for the posts inside concrete on cedar runs.` },

    // Section 5 — Cost
    { type: "h2", text: `What fencing costs in ${name}` },
    { type: "p", text: `${city.costNote} Ranges below reflect standard residential work in ${name} at current material and labour rates — final numbers depend on access, grade, gate count, and how many corners the run turns.` },
    { type: "ul", items: [
      "Galvanized chain link (6 ft): ~$32–$48 per linear foot installed",
      "Black vinyl-coated chain link (6 ft): ~$42–$60 per linear foot installed",
      "Cedar privacy fence (6 ft, dog-eared or flat-top): ~$55–$85 per linear foot installed",
      "Cedar horizontal-slat privacy fence: ~$85–$120 per linear foot installed",
      "Ornamental steel picket (5–6 ft): ~$85–$140 per linear foot installed",
      "Custom swing or cantilever driveway gate: from ~$4,500 depending on span, material, and automation",
    ]},
    { type: "p", text: "Every quote is written on-site. No pressure sales, no phone-only estimates that fall apart the moment we see the actual grade." },

    // Section 6 — Neighbourhoods
    { type: "h2", text: `Neighbourhoods in ${name} we work in most` },
    { type: "p", text: `We're on the road across ${name} weekly. Recent and recurring jobs cluster in ${nbhList} — a mix of postwar residential streets, newer strata developments, and light industrial pockets that all have their own quirks. If you're in ${neighbourhoods[0]} or ${neighbourhoods[1]}, chances are one of our trucks has been on your street this month.` },
    { type: "p", text: `Because we run our own excavation kit — a Kubota mini-excavator with a percussion post-drilling attachment — we handle the tighter, rockier, or root-bound lots that other crews subcontract out. That's a meaningful difference on older ${name} lots where roots and buried debris can stretch a straightforward install into a two-day dig.` },

    // Section 7 — Process
    { type: "h2", text: "How the job actually runs" },
    { type: "p", text: "Every fence we install follows the same rhythm — no surprises, no scope creep." },
    { type: "ul", items: [
      "Free on-site walk-through and written quote, typically within 48 hours",
      "Locate call to BC 1 Call before any digging (we handle it)",
      "Post holes dug and set with concrete, allowed 24–48 hours to cure",
      "Framing and mesh / boards / picket panels installed",
      "Gates hung, hardware set, site cleaned, final walk-through with you",
    ]},
    { type: "p", text: "A standard 100 ft residential run is usually a two-day job. Larger commercial perimeters, cantilever gates, or excavation-heavy sites get their own timeline in the written quote." },

    // Section 8 — Local contractor value (E-E-A-T)
    { type: "h2", text: `Why work with a local ${name} fence contractor` },
    { type: "p", text: `A national franchise install crew shows up with one panel spec, one post size, and a subcontractor holding the auger. That model works in a subdivision where every lot is identical; it does not work on a ${name} lot where the setback is tight, the neighbour's old post is buried in the wrong place, and the soil changes twice between the front and back property lines. Local matters because the person quoting your fence needs to have stood on the actual ground — read the grade, spotted the buried irrigation, confirmed the property pins — before the number goes on paper.` },
    { type: "p", text: `We're a family-run shop that has been welding gates and installing fence across ${region} since 2011. Same crew, same shop, same phone number. Every ${name} quote is written by someone who will be on the job site the day the auger runs. That's the meaningful difference: continuity from quote to installation to the warranty call two years later when a hinge needs an adjustment.` },
    { type: "ul", items: [
      `Direct dispatch — the person quoting your ${name} job is the person running the crew.`,
      "In-house welding shop — custom gates, brackets, and repairs fabricated on-site, not ordered in.",
      "Own excavation equipment — no waiting on a sub-trade to open post holes.",
      "Written, itemized quote — every line broken out so you can compare apples to apples.",
      "Warranty in writing — one year on labour, manufacturer coverage on materials.",
    ]},

    // Section 9 — Common mistakes we fix
    { type: "h2", text: `Common ${name} fencing mistakes we get called to fix` },
    { type: "p", text: `A meaningful share of our ${name} calls are repairs — someone else built the fence three or five years ago, and the same handful of failures come up again and again. Sharing them here so you can spec around them the first time.` },
    { type: "h3", text: "1. Posts set too shallow" },
    { type: "p", text: `We pull a lot of old ${name} posts out of 18-inch holes. 30 inches is the minimum for a 6-ft residential fence in our climate, and 36–42 inches for gates and taller runs. A shallow post looks fine until the first winter wind rocks it loose in the freeze-thaw.` },
    { type: "h3", text: "2. Wrong fasteners" },
    { type: "p", text: `Plain zinc-plated deck screws are the single most common failure we see on ${name} cedar fences. They bleed rust within two winters and rot the board around the screw head. Hot-dip galvanized or stainless is the only defensible spec on the coast.` },
    { type: "h3", text: "3. Ignoring drainage" },
    { type: "p", text: `A post hole that pools water becomes a rot column. Crown the concrete above grade so water sheds away from the post, and on wet ${name} lots consider a drainage rock base at the bottom of the hole.` },
    { type: "h3", text: "4. Building over an unsurveyed line" },
    { type: "p", text: `On older ${name} blocks, the "obvious" fence line and the surveyed property line disagree more often than people expect. Building the new fence on the wrong line invites a bylaw complaint and, in the worst case, a tear-down order. When in doubt, get a survey.` },

    // Section 10 — Timeline (voice/AEO friendly)
    { type: "h2", text: `Typical ${name} project timeline` },
    { type: "p", text: `For most ${name} homeowners the useful question is how many weeks from first call to finished fence. Below is a realistic timeline for a standard residential job in our current schedule — larger commercial perimeters or custom gate fabrication add lead time.` },
    { type: "ul", items: [
      "Day 0 — you book a quote (phone, form, or email).",
      "Day 1–3 — we schedule an on-site walk-through and hand you a written quote.",
      "Day 4–14 — you approve; we schedule install and file the BC 1 Call locate.",
      "Install day 1 — post holes, posts set in concrete, cure overnight.",
      "Install day 2 — mesh / boards / picket panels installed, gates hung, site cleaned.",
      "Day of install — final walk-through, invoice, one-year workmanship warranty in writing.",
    ]},
    { type: "p", text: `In peak season (April through September) our schedule fills 3–5 weeks ahead. Booking a quote early — even before you're ready to commit — locks in the earliest install slot without any obligation.` },

    // Closer
    { type: "quote", text: `The best fence in ${name} is the one built for your specific lot — not a catalogue install dropped on top of your grade.` },
    { type: "p", text: `Ready to talk through a specific project? Book a free on-site quote and we'll walk your ${name} property together, pull the current bylaw, and price it in writing.` },

  ];

  const slug = `fencing-in-${city.slug}`;
  const title = `Fencing in ${name} — Materials, Bylaws & Costs (${new Date().getFullYear()} Guide)`;
  const description = `Everything you need to know about fencing in ${name}, BC — bylaw heights, best materials for our climate, typical costs, and how a working ${name} fence contractor actually builds it.`;

  return {
    slug,
    title,
    description,
    date: "2026-07-10",
    readMinutes: 12,
    tags: ["City Guides", region, "Bylaws", "Costs"],
    ogImage: city.ogImage,
    ogImageCaption: `Fence installation in ${name}, BC by LS Fencing & Metal Work`,
    body,
    faq,
    keyTakeaways,
    internalLinks,
    externalLinks,
    cityName: name,
    region,
  };
}

export function buildCityPosts(): BlogPost[] {
  return CITIES.map(buildPost);
}
