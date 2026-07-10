import type { BlogPost, FaqItem, LinkRef } from "@/lib/blog";
import { CITIES, type CityFact } from "./cities";

// Real gallery photos — each city post gets a unique one so no two cards
// on /blog ever render the same hero image.
import img8ftSecurity from "@/assets/gallery/8ft-galv-commercial-security.jpeg.asset.json";
import imgHandrail from "@/assets/gallery/galvanized-handrail-driveway.jpeg.asset.json";
import imgPerimeterBarb from "@/assets/gallery/galv-perimeter-barbwire.jpeg.asset.json";
import imgCommercialGate from "@/assets/gallery/commercial-double-swing-gate.jpeg.asset.json";
import imgHighSecurityFarm from "@/assets/gallery/high-security-cantilever-gate-farm.jpeg.asset.json";
import imgCooperRentals from "@/assets/gallery/cooper-rentals-cantilever-langley.png.asset.json";
import imgUtilityEnclosure from "@/assets/gallery/utility-equipment-enclosure.jpeg.asset.json";
import imgShopWelding from "@/assets/gallery/shop-welding-kubota-fabrication.jpg.asset.json";
import imgOrnamentalStorefront from "@/assets/gallery/ornamental-storefront-gate-abbotsford.jpg.asset.json";
import imgKubotaExcavator from "@/assets/gallery/kubota-kx033-excavator-post-line.jpg.asset.json";
import imgCantileverSlatGate from "@/assets/gallery/8x16-cantilever-slat-gate-abbotsford.jpg.asset.json";
import img6ftBarb from "@/assets/gallery/6ft-galv-barb-abbotsford.jpeg.asset.json";
import imgBaseballBackstop from "@/assets/gallery/baseball-backstop-fraser-valley.jpeg.asset.json";
import imgBlackSchool from "@/assets/gallery/black-vinyl-school-surrey.png.asset.json";
import img4ftGalv from "@/assets/gallery/4ft-galv-residential.jpeg.asset.json";
import imgCustomCedar from "@/assets/gallery/custom-cedar-horizontal-slat.jpg.asset.json";
import imgBlackHillside from "@/assets/gallery/black-chainlink-hillside-chilliwack.jpg.asset.json";
import imgBlackPlayground from "@/assets/gallery/black-chainlink-playground.jpeg.asset.json";
import imgBlackSlatMapleRidge from "@/assets/gallery/black-privacy-slat-chainlink-maple-ridge.jpg.asset.json";
import imgOrnamentalChilliwack from "@/assets/gallery/ornamental-powdercoat-chilliwack.jpeg.asset.json";
import imgTruckSkidsteer from "@/assets/gallery/ls-fencing-truck-skidsteer.jpeg.asset.json";
import imgExcavation from "@/assets/gallery/excavation-post-drilling.jpeg.asset.json";

const COMMERCIAL_POOL: string[] = [
  img8ftSecurity.url,
  imgCommercialGate.url,
  imgPerimeterBarb.url,
  imgHighSecurityFarm.url,
  imgCooperRentals.url,
  imgUtilityEnclosure.url,
  imgHandrail.url,
  imgOrnamentalStorefront.url,
  imgCantileverSlatGate.url,
  imgShopWelding.url,
  imgKubotaExcavator.url,
  img6ftBarb.url,
  imgBaseballBackstop.url,
  imgBlackSchool.url,
];

const RESIDENTIAL_POOL: string[] = [
  imgCustomCedar.url,
  img4ftGalv.url,
  imgBlackSlatMapleRidge.url,
  imgBlackHillside.url,
  imgOrnamentalChilliwack.url,
  imgBlackPlayground.url,
  imgTruckSkidsteer.url,
  imgExcavation.url,
];

/**
 * Deterministic unique-per-city hero image. Uses the city's index in
 * CITIES modulo pool length so every city post shows a distinct photo
 * and adjacent cards on /blog never duplicate.
 */
function pickCommercialImage(city: CityFact): string {
  const i = Math.max(0, CITIES.findIndex((c) => c.slug === city.slug));
  return COMMERCIAL_POOL[i % COMMERCIAL_POOL.length];
}

function pickResidentialImage(city: CityFact): string {
  const i = Math.max(0, CITIES.findIndex((c) => c.slug === city.slug));
  return RESIDENTIAL_POOL[i % RESIDENTIAL_POOL.length];
}


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
    ogImage: pickResidentialImage(city),
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

/**
 * Commercial-only variant used for cities outside our Fraser Valley
 * residential service bubble (Vancouver, Burnaby, Richmond, the Tri-Cities,
 * North Shore, Delta, White Rock, New West). Positioning is strictly
 * commercial, industrial, strata, and high-security work with in-house
 * welded gates and hand rails — no residential backyard content.
 */
function buildCommercialPost(city: CityFact): BlogPost {
  const { name, region, neighbourhoods } = city;
  const nbhList = neighbourhoods.join(", ");

  const internalLinks: LinkRef[] = [
    { to: "/commercial-chain-link-fencing", label: "Commercial chain link fencing" },
    { to: "/chain-link-fencing", label: "Heavy-gauge chain link" },
    { to: "/metal-gates", label: "Custom welded metal gates" },
    { to: "/barrier-gates", label: "Barrier gates & bollards" },
    { to: "/ornamental-fencing", label: "Ornamental steel & strata perimeters" },
    { to: "/welding-services", label: "In-house welding & fabrication" },
    { to: "/excavation-services", label: "Excavation & post drilling" },
    { to: "/airport-fencing", label: "Airport & high-security perimeters" },
    { to: "/cannabis-fencing", label: "Cannabis & regulated-site fencing" },
    { to: "/port-fencing", label: "Port & industrial yard fencing" },
    { to: "/pricing", label: "Commercial fencing pricing" },
    { to: "/gallery", label: "Commercial project gallery" },
    { to: "/contact", label: `Request a ${name} site walk-through` },
  ];

  const externalLinks: LinkRef[] = [
    { to: city.bylawUrl, label: city.bylawUrlLabel, external: true },
    { to: "https://www.bccodes.ca/", label: "BC Building Code (Building & Safety Standards Branch)", external: true },
    { to: "https://www.worksafebc.com/en", label: "WorkSafeBC — worksite safety standards", external: true },
  ];

  // Commercial-only FAQ — not reused from CityFact (which is residential-toned).
  const faq: FaqItem[] = [
    { q: `Do you take on small residential jobs in ${name}?`, a: `No. Our ${name} work is strictly commercial, industrial, strata, and high-security — perimeter chain link, welded cantilever and swing gates, bollards, and MMCD-spec hand rails. Small residential work stays in our Fraser Valley home service area.` },
    { q: `What commercial chain link spec do you install in ${name}?`, a: `9-gauge hot-dip galvanized (or black vinyl-coated) chain link fabric, schedule 40 galvanized pipe posts, top and bottom rails, and either single or triple-strand barbed wire on 45° extension arms for high-security perimeters. Heights typically 8 ft or 10 ft on industrial ${name} sites, 6 ft on strata perimeters.` },
    { q: `Do you fabricate cantilever gates for ${name} sites?`, a: `Yes — every cantilever slide gate, swing gate, barrier gate, and set of bollards we install in ${name} is welded in our own shop to the measured opening, then hot-dip galvanized or powder-coated. Spans from 12 ft up to 40+ ft, with keypad, card-reader, or LTE operator integration.` },
    { q: `Can you install MMCD-spec hand rails on ${name} public and loading-dock work?`, a: `Yes. MMCD-spec galvanized pipe hand rails and guard rails for public walkways, ramps, and loading-dock edges are a standard scope for us across ${name} — fabricated in-shop, installed with our own excavation crew, WCB-covered.` },
    { q: `Do you work with property managers and general contractors in ${name}?`, a: `Yes — property management firms, general contractors, strata councils, industrial and warehouse operators, and public-sector clients make up the majority of our ${name} work. Phased scopes, written itemized quotes, and clean turnover documentation are standard.` },
  ];

  const keyTakeaways: string[] = [
    `${name} is a commercial and strata focus for us — high-security perimeters, industrial chain link, welded cantilever gates, bollards, and MMCD hand rails. We don't chase small residential work here.`,
    `In-house welding shop: cantilever slide gates, swing gates, bollards, and MMCD-spec hand rails fabricated to drawing, not ordered in.`,
    `Own excavation kit and crew — we mobilize into ${name} for full site perimeters, tenant improvements, and shut-down/turnover work on our own timeline.`,
    `Written scope, WCB coverage, COR-track safety practices, and a single point of contact from quote through turnover.`,
  ];

  const body: BlogPost["body"] = [
    { type: "p", text: `LS Fencing & Metal Work is a Fraser Valley commercial fencing and metal-fabrication contractor. We install high-security chain link, welded metal gates, ornamental strata perimeters, MMCD hand rails, and bollards across ${name} and the surrounding ${region.toLowerCase()}. This page is a straight commercial brief — what we build in ${name}, who we build it for, and how we structure a scope from site walk-through to turnover.` },
    { type: "p", text: `Our ${name} work is property managers, general contractors, strata councils, industrial and warehouse operators, and public-sector projects that need a real commercial spec — 9-gauge galvanized mesh, top and bottom rails, welded cantilever gates, engineered hand rails, and a crew that can hold a schedule on a live site. ${city.climate}` },
    { type: "p", text: `${city.terrain} On a commercial perimeter that dictates post depth, hardware spec, and how we mobilize the excavation kit.` },

    { type: "h2", text: `Commercial fencing we install in ${name}` },
    { type: "p", text: `Almost every ${name} job we bid falls into one of five buckets. The spec, gauge, gate hardware, and site logistics change per bucket, and getting the right bucket picked at the site walk is what keeps the project on budget.` },
    { type: "h3", text: "1. High-security industrial and warehouse perimeters" },
    { type: "p", text: `8-foot to 10-foot hot-dip galvanized chain link, 9-gauge mesh, top rail plus tension wire at the bottom, and either single or triple-strand barbed wire on 45° extension arms. Cantilever slide gates sized for tractor-trailer access, with keypad, card-reader, or LTE-controlled operators tied into the tenant's access system. Standard on industrial pockets across ${name} — logistics yards, distribution centres, equipment rental yards, and utility compounds.` },
    { type: "h3", text: "2. Strata townhouse and multi-family perimeters" },
    { type: "p", text: `Black vinyl-coated chain link or powder-coated ornamental steel picket, depending on the strata council's aesthetic requirements and budget. We work directly with strata property managers on ${name} perimeter replacements — a phased scope so residents keep access to their units and the parking lot never fully closes. Written turnover with warranty documentation goes to the property manager on completion.` },
    { type: "h3", text: "3. Welded custom gates — swing, cantilever, and barrier" },
    { type: "p", text: `Everything gated at ${name} commercial sites is fabricated in our shop, not ordered in from a catalogue. Cantilever slide gates spanning 20 to 40 feet, swing gates on heavy-duty hinges rated for the actual leaf weight, and barrier gates and bollards for parking-lot access control. All welded to CWB-quality practice and finished with hot-dip galvanizing or shop-applied powder coat.` },
    { type: "h3", text: "4. Ornamental steel and pool-code compliant perimeters" },
    { type: "p", text: `Powder-coated steel picket for strata entries, commercial storefronts, amenity building perimeters, and any pool or amenity enclosure that has to meet BC Building Code Part 9. Self-closing, self-latching gate hardware; no climbable horizontal rails on pool sides.` },
    { type: "h3", text: "5. Metal hand rails, guard rails, and bollards" },
    { type: "p", text: `MMCD-spec galvanized hand rails for public walkways, ramps, and loading-dock access. Bollards — fixed, removable, and retractable — for parking-lot protection, storefront ram-raid mitigation, and access control at strata visitor entries. Fabricated in the shop, installed on our own excavation kit.` },
    { type: "p", text: `Materials-wise, a commercial ${name} spec pushes us to hot-dip galvanized hardware end-to-end, 9-gauge fabric on high-security perimeters, black vinyl-coated chain link where aesthetics matter (strata, storefronts), and heavier gate posts than a residential catalogue would default to.` },

    { type: "h2", text: `Who we work for in ${name}` },
    { type: "ul", items: [
      `Property management firms with ${name} portfolios — strata perimeters, tenant improvements, incident-driven repairs.`,
      `General contractors and construction managers on ${name} commercial builds — perimeter chain link during construction, permanent fence and gate scope at project turnover.`,
      `Industrial and warehouse operators — logistics yards, equipment yards, and utility compounds across ${name}.`,
      `Public-sector and institutional clients — schools, parks, transit, and municipal facilities.`,
      `Owner-operators of regulated sites — cannabis production, cold storage, and secure-storage tenants that need audit-ready perimeter documentation.`,
    ]},

    { type: "h2", text: `Site conditions in ${name}` },
    { type: "p", text: `${city.climate} On a commercial perimeter that translates into corrosion load, wind load on tall fabric-covered runs, and freeze-thaw at the base of every post. Every ${name} spec we write assumes hot-dip galvanized hardware end-to-end — plain zinc-plated fasteners and pre-galvanized wire are false economies on a site expected to hold up for 20+ years.` },
    { type: "p", text: `${city.terrain} That's why we mobilize with our own Kubota mini-excavator and percussion post-drilling attachment. Contaminated fill, old slab, buried debris, and rock refusal are all common on ${name} industrial sites — an outside sub-trade on a rented auger will stall a full-day dig. On rocky or slab-encumbered ${name} sites we core through rather than punt to another day.` },

    { type: "h2", text: `Codes, bylaws, and permitting in ${name}` },
    { type: "p", text: city.bylawSummary },
    { type: "p", text: `On commercial and industrial ${name} sites, height, sightline, and setback rules from the zoning bylaw combine with BC Building Code Part 9 (pool and amenity enclosures), WorkSafeBC requirements for edge-protection hand rails, and any tenant-specific security spec (e.g. audit-ready perimeters for regulated cannabis production, TSA/CATSA-equivalent standards on airside work). We coordinate the paperwork against the ${city.bylawUrlLabel} at quote stage so nothing gets missed at inspection.` },

    { type: "h2", text: `${name} neighbourhoods and industrial pockets we work in` },
    { type: "p", text: `Our ${name} mobilizations cluster around the commercial and industrial nodes: ${nbhList}. Whether it's a strata perimeter replacement in a townhouse complex or an 8-foot barbed perimeter around an equipment yard, we walk the site with the property manager or GC before quote — sightlines, existing services, gate swing radius, truck turning circles — so the price on paper matches the price at the invoice.` },

    { type: "h2", text: `In-house welding shop — why it matters on ${name} jobs` },
    { type: "p", text: `The single biggest reason property managers and GCs call us for ${name} work is that our metal gates and hand rails are welded in our own shop, not ordered in from a wholesaler. A cantilever slide gate spanning a specific ${name} entry gets fabricated to the actual measured opening, the actual hinge post spec, and the actual operator model — not to a stock catalogue size that has to be shimmed on-site. Repairs, retrofits, and one-off brackets go from measurement to install inside a week instead of the four to eight weeks a supplier catalogue takes.` },
    { type: "ul", items: [
      "Custom cantilever and swing gates fabricated to measured openings",
      "Hot-dip galvanizing or shop-applied powder-coat finish",
      "MMCD-spec hand rails and guard rails for public walkways and loading docks",
      "Fixed, removable, and retractable bollards for access control",
      "Field repair welding — hinge replacement, gate frame straightening, post retrofit",
    ]},

    { type: "h2", text: `How a ${name} commercial job runs` },
    { type: "ul", items: [
      `Day 0 — property manager, GC, or owner-op contacts us with a ${name} scope.`,
      `Day 1–5 — on-site walk-through with the site contact; existing conditions, gate operators, sightlines, and service locates flagged.`,
      "Day 5–10 — written itemized quote with scope, materials, gauge, finish, gate specs, timeline, and warranty.",
      "Approval + BC 1 Call locates + coordination with tenant/site operations to schedule mobilization windows.",
      "Mobilize crew and excavation kit; posts set in concrete; gate frames fabricated in-shop in parallel.",
      "Install fabric, panels, rails, gates, operators, and hand rails; commissioning of any gate operator with the access-control vendor.",
      "Site clean, final walk-through with the site contact, warranty and turnover documentation issued.",
    ]},
    { type: "p", text: `${city.costNote}` },

    { type: "h2", text: `Why property managers and GCs pick us for ${name}` },
    { type: "ul", items: [
      "Family-run since 2011 — same crew, same shop, same phone number.",
      "In-house welding shop — every gate and hand rail fabricated to the measured opening.",
      "Own excavation equipment — no waiting on a sub-trade for post holes on your live site.",
      "WCB coverage, COR-track safety practices, and clean documentation for property-manager audit files.",
      "One point of contact from quote through turnover — the person who quotes your job is the person who runs the crew.",
      "Written itemized quotes — every line broken out so a strata council or GC can compare apples to apples.",
      "Warranty in writing — one year on labour, manufacturer coverage on materials.",
    ]},

    { type: "h2", text: `Materials and specs we default to in ${name}` },
    { type: "p", text: `Our default ${name} commercial spec starts with hot-dip galvanized hardware end-to-end and adjusts up from there for site conditions. The bullets below are the specs we default to unless a site walk forces something different.` },
    { type: "ul", items: [
      "Chain link fabric: 9-gauge, hot-dip galvanized after weaving, black vinyl-coated where aesthetics matter (strata, storefronts).",
      "Posts: schedule 40 pipe, hot-dip galvanized, 3\" line posts and 4\" terminal posts standard; heavier on gate posts and cantilever gate opposite-side rollers.",
      "Fasteners: hot-dip galvanized or stainless — never plain zinc-plated on any commercial ${name} job.",
      "Barbed wire: three-strand on 45° extension arms, standard on industrial and utility perimeters; omit or replace with smooth rail on strata and storefront work.",
      "Gates: welded in-shop, hot-dip galvanized or powder-coat finish, hardware rated for the actual leaf weight not the catalogue span.",
      "Hand rails: MMCD-spec galvanized pipe on public and loading-dock installations.",
    ]},

    { type: "quote", text: `${name} commercial fencing is a schedule problem as much as a materials problem. Our crew, our welding shop, and our excavation kit exist so your site doesn't wait on ours.` },
    { type: "p", text: `Ready to scope a specific ${name} project — perimeter replacement, gate retrofit, hand rail package, or new-build turnover? Reach out for a site walk-through and a written itemized quote.` },
  ];

  const slug = `fencing-in-${city.slug}`;
  const title = `Commercial Fencing, Gates & Hand Rails in ${name} — Strata, Industrial & High-Security (${new Date().getFullYear()})`;
  const description = `Commercial chain link, welded metal gates, ornamental strata perimeters, hand rails, and bollards in ${name}, BC. In-house welding shop, own excavation crew, WCB-covered. Property managers, GCs, industrial and public-sector clients.`;

  return {
    slug,
    title,
    description,
    date: "2026-07-10",
    readMinutes: 12,
    tags: ["Commercial", region, "Strata", "High-Security", "Welded Gates"],
    ogImage: pickCommercialImage(city),
    ogImageCaption: `Commercial fencing and welded gate installation in ${name}, BC by LS Fencing & Metal Work`,
    body,
    faq,
    keyTakeaways,
    internalLinks,
    externalLinks,
    cityName: name,
    region,
  };
}

/**
 * Commercial city post keyword checklist. Every commercial-focus city post
 * MUST mention every term below (case-insensitive substring match) or the
 * build fails. Keeps the copy aligned to the commercial positioning even if
 * the template drifts.
 */
export const COMMERCIAL_REQUIRED_KEYWORDS = [
  "strata perimeter",
  "high-security",
  "cantilever",
  "bollard",
  "mmcd",
  "hand rail",
  "welded",
  "chain link",
  "galvanized",
  "property manager",
] as const;

/**
 * Phrases that must NEVER appear in a commercial-focus city post. Anything
 * that positions the page as residential/backyard work breaks positioning
 * for the Metro Vancouver market and fails the build.
 */
export const COMMERCIAL_BANNED_PHRASES = [
  "backyard",
  "rear-yard",
  "rear yard",
  "homeowner",
  "fence for homeowners",
  "residential backyard",
  "family home",
  "backyard privacy",
  "back yard",
  "your backyard",
] as const;

function collectPostText(post: BlogPost): string {
  const parts: string[] = [post.title, post.description, ...(post.keyTakeaways ?? [])];
  for (const block of post.body) {
    if ("text" in block && typeof block.text === "string") parts.push(block.text);
    if ("items" in block && Array.isArray(block.items)) parts.push(...block.items);
  }
  for (const f of post.faq ?? []) parts.push(f.q, f.a);
  return parts.join("\n").toLowerCase();
}

export function validateCommercialPost(post: BlogPost): void {
  const text = collectPostText(post);
  const missing = COMMERCIAL_REQUIRED_KEYWORDS.filter((k) => !text.includes(k.toLowerCase()));
  const banned = COMMERCIAL_BANNED_PHRASES.filter((p) => text.includes(p.toLowerCase()));
  if (missing.length || banned.length) {
    const msgs: string[] = [];
    if (missing.length) msgs.push(`missing required commercial keywords: ${missing.join(", ")}`);
    if (banned.length) msgs.push(`contains banned residential phrases: ${banned.join(", ")}`);
    throw new Error(`Commercial city post "${post.slug}" failed validation — ${msgs.join("; ")}`);
  }
}

export function buildCityPosts(): BlogPost[] {
  return CITIES.map((c) => {
    if (c.commercialFocus) {
      const post = buildCommercialPost(c);
      validateCommercialPost(post);
      return post;
    }
    return buildPost(c);
  });
}


