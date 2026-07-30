import { buildCityPosts } from "./blog/city-post";

export interface FaqItem {
  q: string;
  a: string;
}

export interface LinkRef {
  /** For internal links use the site path ("/cedar-fencing"). For external, full https URL. */
  to: string;
  label: string;
  external?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMinutes: number;
  tags: string[];
  /** Absolute path (from /public) to the OpenGraph image, e.g. /og/foo.jpg */
  ogImage: string;
  /** Optional caption used in image sitemap. */
  ogImageCaption?: string;
  /** Structured body rendered by the post renderer. */
  body: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "quote"; text: string }
    | { type: "image"; src: string; alt: string; caption?: string; focusKeyword?: string }
  >;
  /** Answer-Engine / voice / AI-Overview friendly Q&A. Rendered as <dl> and emitted as FAQPage JSON-LD. */
  faq?: FaqItem[];
  /** Short "Key takeaways" bullets rendered at the top of the post — AEO/LLM friendly. */
  keyTakeaways?: string[];
  /** Internal cross-links to service / geo pages. */
  internalLinks?: LinkRef[];
  /** Authoritative external references (bylaws, building code, WorkSafeBC). Good for E-E-A-T. */
  externalLinks?: LinkRef[];
  /** City name for LocalBusiness JSON-LD areaServed. Present on city guides. */
  cityName?: string;
  /** Region label (e.g. "Metro Vancouver"). */
  region?: string;
}

const legacyPosts: BlogPost[] = [
  {
    slug: "best-fencing-options-and-their-qualities",
    title: "The Best Fencing Options and Their Qualities",
    description:
      "A working contractor's rundown of the four fencing materials that actually earn their keep in BC weather — chain link, cedar, ornamental steel, and vinyl.",
    date: "2016-06-07",
    readMinutes: 6,
    ogImage: "/og/blog-best-fencing-options.jpg",
    tags: ["Guides", "Materials"],
    body: [
      { type: "p", text: "Picking a fence isn't only about how it looks on install day. It's about how it looks in year seven, after a decade of Fraser Valley rain, wind, snow load, and UV. Here's how the four common options actually hold up." },
      { type: "h2", text: "1. Chain Link" },
      { type: "p", text: "The workhorse. Galvanized chain link is the most cost-effective way to secure a large area — commercial yards, dog runs, sports courts, industrial sites. Black vinyl-coated versions disappear into landscaping while adding another two decades of corrosion protection." },
      { type: "ul", items: [
        "Lifespan: 20–40+ years depending on gauge and coating",
        "Best for: security, large perimeters, budget-conscious residential",
        "Add privacy slats or wind screen to close it up visually",
      ]},
      { type: "h2", text: "2. Cedar (Western Red Cedar)" },
      { type: "p", text: "Nothing beats cedar for warmth and privacy. Naturally rot- and insect-resistant, it handles our wet coastal climate better than pressure-treated pine and can be stained or left to silver naturally." },
      { type: "ul", items: [
        "Lifespan: 15–25 years with basic maintenance",
        "Best for: backyard privacy, front-yard curb appeal",
        "Combine with a lattice top or horizontal board style for a modern look",
      ]},
      { type: "h2", text: "3. Ornamental Steel" },
      { type: "p", text: "Powder-coated ornamental iron gives you the security of steel with the architectural presence people associate with civic buildings and premium residential properties. Won't rot, won't sag, and the finish holds up under BC weather." },
      { type: "h2", text: "4. Vinyl / PVC" },
      { type: "p", text: "Low-maintenance and clean-looking, but the up-front cost is higher and repairs mean panel swaps rather than plank replacement. A solid choice if you never want to think about your fence again." },
      { type: "quote", text: "The right fence is the one that matches how you actually use the property — security, privacy, containment, or curb appeal." },
      { type: "p", text: "If you're not sure which fits your lot, book a free on-site quote and we'll walk it with you." },
    ],
  },
  {
    slug: "why-you-should-consider-fencing-as-an-option",
    title: "Why You Should Consider Fencing as an Option",
    description:
      "Five reasons homeowners and businesses in the Lower Mainland install fencing — from resale value to insurance premiums to keeping the dog out of the tulips.",
    date: "2016-06-07",
    readMinutes: 4,
    ogImage: "/og/blog-why-consider-fencing.jpg",
    tags: ["Guides"],
    body: [
      { type: "p", text: "A fence isn't just a boundary marker. It's an investment that pays back in security, property value, and everyday quality of life. Here's what people rarely think about until they install one." },
      { type: "h2", text: "1. Defined property lines" },
      { type: "p", text: "The single most common source of neighbour disputes is uncertainty about where one lot ends and another begins. A surveyed fence line ends the conversation." },
      { type: "h2", text: "2. Security and insurance" },
      { type: "p", text: "For commercial and industrial sites, a proper perimeter fence often reduces insurance premiums and is a hard requirement for storing equipment or inventory outdoors." },
      { type: "h2", text: "3. Kids, pets, and pools" },
      { type: "p", text: "BC building code requires pool enclosures, but even a standard 5-foot chain link keeps toddlers and pets in — and coyotes and deer out." },
      { type: "h2", text: "4. Privacy and noise" },
      { type: "p", text: "Cedar and ornamental with privacy slats reduce sightlines and cut road noise by a surprising margin." },
      { type: "h2", text: "5. Resale value" },
      { type: "p", text: "Realtors consistently list fenced yards as a top-ten feature buyers ask for, particularly on family and pet-friendly properties." },
    ],
  },
  {
    slug: "differences-between-chain-link-fence-and-wooden-fence",
    title: "Differences Between a Chain Link Fence and a Wooden Fence",
    description:
      "Head-to-head comparison of chain link and cedar fencing across cost, lifespan, maintenance, security, and curb appeal.",
    date: "2016-06-07",
    readMinutes: 5,
    ogImage: "/og/blog-chain-link-vs-wood.jpg",
    tags: ["Guides", "Comparison"],
    body: [
      { type: "p", text: "Nine times out of ten a homeowner asks us the same question at the first walk-through: chain link or wood? Both are excellent. They just solve different problems." },
      { type: "h2", text: "Cost" },
      { type: "p", text: "Chain link is roughly 40–60% cheaper per linear foot than a comparable cedar privacy fence. For long perimeters that difference adds up fast." },
      { type: "h2", text: "Lifespan and maintenance" },
      { type: "ul", items: [
        "Galvanized chain link: 20–40 years, effectively zero maintenance",
        "Cedar: 15–25 years, best with a stain or seal every 3–5 years",
      ]},
      { type: "h2", text: "Security" },
      { type: "p", text: "Chain link makes intruders visible on the way in and out. Cedar hides your yard from the street, which is a privacy win but a security tradeoff." },
      { type: "h2", text: "Curb appeal" },
      { type: "p", text: "Cedar wins the aesthetics contest for residential front yards. Black vinyl-coated chain link is a close second and disappears into landscaping." },
      { type: "h2", text: "The right answer for most yards" },
      { type: "p", text: "Cedar out front for privacy and warmth, black chain link along the rear and side yards for cost and containment. That combo covers most residential jobs we do across the Fraser Valley." },
    ],
  },
  {
    slug: "benefits-of-barrier-gates",
    title: "The Benefits of Barrier Gates",
    description:
      "Where barrier gates make sense — municipal access roads, parking lots, private driveways — and what to spec for a gate that lasts.",
    date: "2017-03-14",
    readMinutes: 4,
    ogImage: "/og/blog-barrier-gates.jpg",
    tags: ["Gates", "Commercial"],
    body: [
      { type: "p", text: "Barrier gates are the quiet workhorses of access control. They aren't glamorous, but they solve a specific problem cheaply and reliably: keep unauthorized vehicles out without building a full perimeter." },
      { type: "h2", text: "Where they earn their keep" },
      { type: "ul", items: [
        "Municipal service roads and trailhead access",
        "Employee-only parking lot entries",
        "Private driveways and rural properties",
        "Construction and storage yards",
      ]},
      { type: "h2", text: "What to spec" },
      { type: "p", text: "Galvanized 2\" or 2-3/8\" schedule 40 pipe for the arm, a lockable drop pin at the strike post, and reflective tape at both ends. For higher-traffic gates, upgrade to a counterweighted arm and a padlock housing that doesn't freeze up in December." },
      { type: "h2", text: "Automation" },
      { type: "p", text: "We can pair barrier gates with keypad, card reader, or LTE-controlled operators for sites that need audit trails without the cost of a full slide gate." },
      { type: "p", text: "If a barrier gate fits your site, we can spec, fabricate, and install it in-house — no subcontractors, no waiting." },
    ],
  },
  {
    slug: "strata-parking-gate-security-fencing-canada",
    title: "The Complete Guide to Strata Parking Gate & Security Fencing Systems in Canada",
    description:
      "Everything a strata council needs to know — barrier arms, parkade rolling doors, cantilever gates, chain link and security fencing, access control, Canadian regulations, and 2026 costs.",
    date: "2026-07-30",
    readMinutes: 12,
    ogImage: "/__l5e/assets-v1/5d8442f4-708e-466c-b510-56aac6813245/strata-parking-gate-security-fencing-abbotsford.jpg",
    ogImageCaption:
      "Commercial galvanized chain-link compound with barbed wire topping and cantilever sliding gate securing a strata waste and compactor area in Abbotsford, BC.",
    tags: ["Commercial", "Gates", "Security", "Chain Link"],
    cityName: "Abbotsford",
    region: "Fraser Valley",
    keyTakeaways: [
      "Strata parkades need commercial-grade gate hardware (100–500+ cycles/day), not residential-grade units rated for 10–30.",
      "Budget $6,500–$18,200 all-in for a single-entry strata gate system — hardware alone is only about half the cost.",
      "Specify 9-gauge or 11-gauge hot-dip galvanized chain link for all strata security fencing; lighter gauges sag and fail within years.",
      "In BC, alterations to common property require a 3/4 vote, and fire department access must never be obstructed.",
      "Plan $800–$2,500 per gate per year for preventive maintenance and fob replacement.",
    ],
    body: [
      { type: "p", text: "Unauthorized parking, vehicle theft, catalytic converter theft, tailgating, and unauthorized access to storage areas are persistent — and growing — problems across Canadian strata communities. Whether you manage a 12-unit townhouse complex in Langley or a 400-unit highrise parkade in downtown Vancouver, the challenges are remarkably similar: residents who forget to close gates, visitors who don\'t belong, and spaces that are genuinely difficult to secure with off-the-shelf solutions." },
      { type: "image", src: "/__l5e/assets-v1/5d8442f4-708e-466c-b510-56aac6813245/strata-parking-gate-security-fencing-abbotsford.jpg", alt: "Galvanized chain link strata security compound with three-strand barbed wire topping and cantilever sliding gate enclosing waste bins and a compactor in Abbotsford BC", caption: "Commercial galvanized chain-link compound with barbed wire topping and cantilever sliding gate — a common security fencing application for strata utility areas, dumpster enclosures, and restricted parkade zones.", focusKeyword: "strata parking gate security fencing" },
      { type: "p", text: "A properly designed strata parking gate and fencing system solves these problems at the source. It deters opportunistic theft before it happens, creates a clear record of access for liability purposes, reduces resident complaints about stolen property, and — critically — can lower your strata\'s insurance premiums when properly documented." },
      { type: "p", text: "But not all gate and fencing systems are created equal. The difference between a $4,000 barrier arm that fails within 18 months and a $9,000 system that runs reliably for 15 years often comes down to specification quality, installation expertise, and matching the right product to the specific demands of your site." },

      { type: "h2", text: "1. Why strata buildings need proper parking gate systems" },
      { type: "quote", text: "Strata councils that choose the cheapest available option typically spend 2–3x the original cost in repairs, replacements, and insurance claims within five years." },
      { type: "p", text: "Strata parking presents unique challenges that residential or commercial lots don\'t face to the same degree. You have owners who feel entitled to the space, renters who may not follow protocols, delivery drivers who need occasional access, emergency vehicles that must never be blocked, and a council typically made up of volunteers without specialist knowledge." },
      { type: "p", text: "Add the physical reality of most strata parkades — limited sightlines, awkward entry geometry, concrete pillars, low ceiling heights, and a decades-old building design never conceived with modern gate systems in mind — and \"just install a gate\" is never as simple as it sounds." },

      { type: "h2", text: "2. Types of strata parking gate systems" },
      { type: "ul", items: [
        "Barrier arm gate — $3,000–$8,000 installed, 3–6 second cycle, 10–20 year life, low power draw. Best for surface lots and parkade entrances with moderate traffic.",
        "Overhead rolling door — $5,000–$15,000 installed, 8–15 second cycle, 15–25 year life. Best for underground parkades needing weather protection.",
        "Sliding (cantilever) gate — $4,000–$12,000 installed, 5–10 second cycle, 12–20 year life. Best for wide surface entrances with high traffic.",
      ]},
      { type: "h3", text: "Barrier arm gates: the workhorse" },
      { type: "p", text: "For most Canadian strata properties the barrier arm remains the default. Commercial-grade arms from FAAC, BFT and Came are engineered for high-cycle duty in Canadian conditions, with heated control boards for cold-weather reliability, obstruction detection, and battery backup. The key distinction: residential-grade arms are rated for 10–30 cycles per day; commercial-grade for 100–500+. Strata buildings nearly always need commercial-grade, even when the entry looks like a residential driveway." },
      { type: "h3", text: "Overhead rolling doors: maximum weather and security protection" },
      { type: "p", text: "Underground parkade entrances face freeze-thaw cycling, road salt splash, wind-driven rain and snow, and constant thermal cycling. A rolling steel or sectional door handles all of it while providing a near-impenetrable barrier. Specify high-cycle commercial doors rated for 100,000+ cycles, insulated panels, a full-perimeter weather seal, and a motor rated for the actual door weight and height." },
      { type: "h3", text: "Sliding gates for surface lots" },
      { type: "p", text: "On wide surface entrances — common in townhouse complexes and older apartment communities — cantilever sliding gates avoid a ground track that snow, ice or debris can jam. They need more lateral clearance but eliminate the most common maintenance failure point in tracked systems." },

      { type: "h2", text: "3. Security fencing types and applications" },
      { type: "p", text: "Gates are only as effective as the fencing they connect to. A $10,000 barrier arm is meaningless if someone can walk around it through an unsecured perimeter." },
      { type: "ul", items: [
        "Galvanized chain link — $25–$55/lineal ft installed. Dumpster enclosures, utility areas, perimeter. Proven durability, low maintenance in Canadian climate.",
        "Chain link with barbed wire — $35–$70/ft. Restricted zones and service yards; a 3-strand top adds meaningful deterrence. Check municipal bylaws.",
        "Welded wire panel — $40–$80/ft. Bike storage and amenity areas; cleaner appearance, slightly easier to climb.",
        "Steel palisade / spike top — $65–$130/ft. High-value parking and EV charging zones; excellent anti-climb.",
        "Concrete bollards — $200–$500 per unit. Vehicle-rated protection for pedestrian zones and storefronts.",
        "Aluminum ornamental — $55–$110/ft. Street-facing perimeter where curb appeal matters; lower security than steel.",
      ]},
      { type: "quote", text: "Chain link is sold in gauges from 9 (heaviest) to 14 (lightest). Specify 9-gauge or 11-gauge galvanized for all strata security applications — anything lighter is a false economy." },
      { type: "h3", text: "Barbed wire and security topping options" },
      { type: "p", text: "The photo above shows a classic three-strand barbed wire top on chain link — exactly the setup appropriate for utility compounds, dumpster enclosures, and restricted service areas. Most municipalities allow it in commercial and industrial zones and on non-street-facing strata fences, but verify local bylaws first. Cleaner-looking alternatives include razor ribbon, anti-climb paint on posts, and anti-climb roller systems that spin when grabbed." },

      { type: "h2", text: "4. Underground parkade fencing: challenges and solutions" },
      { type: "ul", items: [
        "Standard posts cannot be driven into concrete — anchoring must be surface-mounted or core-drilled and chemically anchored.",
        "Height restrictions (often 2.0–2.4 m clearance) limit fence height and topping options.",
        "Fire suppression systems and emergency egress requirements limit where fencing can go.",
        "Drainage slope must be maintained across the fencing footprint.",
        "Concrete spalling and moisture intrusion affect anchor longevity — stainless fixings are mandatory.",
        "Noise from gates and motors travels through the concrete structure to units above.",
      ]},
      { type: "h3", text: "Anchoring systems for concrete parkade floors" },
      { type: "p", text: "Experienced contractors use one of three methods: surface-mounted base plates with chemical anchors, core-drilled post sockets, or proprietary track systems that spread load across a wider slab footprint. Always request engineering sign-off on the anchoring design — dynamic loads from thousands of gate cycles are not what a static wind-load calculation covers." },
      { type: "h3", text: "Noise attenuation" },
      { type: "p", text: "One of the most overlooked specification items and the most frequent source of post-install complaints. Operators bolted directly to concrete transmit vibration to units above and beside the entry. Always include vibration-isolating mounts, and notify residents above the entrance before installation." },

      { type: "h2", text: "5. Hard-to-reach and under-building zones" },
      { type: "p", text: "Every strata property has zones that are genuinely difficult to secure: the gap beneath a raised building, the narrow passage between a parkade wall and a property line, the corner where the loading bay meets the utility compound. Predictably, those are the areas that attract the most problems." },
      { type: "h3", text: "Under-building crawl space and plinth fencing" },
      { type: "p", text: "Many BC and Ontario buildings from the 1970s–1990s have raised ground floors with open space beneath. Closing them requires galvanized welded mesh panels cut to irregular geometry, surface-anchored into the slab, with access panels at maintenance points. Specify minimum 50x50 mm opening, 4 mm wire welded mesh, hot-dip galvanized. Mesh beats bars or chain link here: it holds its shape under deflection loads and can be pre-fabricated off-site to shorten resident disruption." },
      { type: "h3", text: "Narrow passage fencing between buildings" },
      { type: "p", text: "The 600 mm to 1.5 m gap between a building and a property line is a common unauthorized access route and informal dumping ground. Expanded steel mesh in a powder-coated galvanized finish is usually right: cut-resistant, light enough for two-person manual installation in confined space, and wall-anchored on both sides with no ground penetration." },
      { type: "h3", text: "Loading bay and waste enclosure security" },
      { type: "p", text: "Size the gate opening for the largest service vehicle that will enter — typically a roll-off or rear-load truck needing a minimum 4.5 m opening. Gate swing or slide direction must not conflict with the service vehicle approach path, and the ground inside the enclosure should be sealed concrete or asphalt, not gravel, so it can be cleaned and drained." },

      { type: "h2", text: "6. Access control options" },
      { type: "ul", items: [
        "RFID key fobs — $5–$15 per fob. Most popular for strata: easy to program and deactivate, supports owner/tenant/visitor/contractor access levels.",
        "Smartphone apps — $30–$80/month cloud platform. Virtual guest passes, remote management, no fob replacement cost.",
        "Licence plate recognition — $8,000–$18,000 installed. Hands-free for whitelisted plates, no fobs to manage.",
        "Keypad / PIN — $300–$800 per keypad. Low cost, but shared codes are a security risk; use as backup only.",
        "Intercom / video — $2,500–$12,000 installed. Essential for visitor management; IP systems ring resident smartphones.",
        "Biometric — $12,000–$30,000 installed. Nothing to lose or share, but PIPEDA privacy obligations must be addressed first.",
      ]},
      { type: "h3", text: "The tailgating problem" },
      { type: "p", text: "No access control prevents tailgating on its own. The fix is a combination: loop detectors that hold the gate open only while a vehicle is on the loop and close promptly when it clears, gate placement that makes close following geometrically awkward, camera coverage with clear signage, and resident education. Anti-tailgating portals exist but are rarely cost-effective for strata." },

      { type: "h2", text: "7. Canadian regulations and strata law" },
      { type: "ul", items: [
        "British Columbia — Strata Property Act: 3/4 vote required for alterations to common property; fire egress clearance mandatory per BCBC.",
        "Ontario — Condominium Act, 1998: board approval for common element alterations; accessibility requirements under the AODA.",
        "Alberta — Condominium Property Act: board resolution required; corporation insurance must cover new installations.",
        "Quebec — Civil Code of Québec: co-owners\' assembly approval; heritage zone restrictions may apply.",
        "All provinces — National Building Code plus local bylaws: fire department access must not be obstructed, and a building permit is typically required for permanent fencing over 1.2 m.",
      ]},
      { type: "p", text: "Unpermitted work can complicate unit sales and may void strata property insurance. Confirm requirements with your local authority having jurisdiction before work begins — don\'t rely on contractor assurances." },
      { type: "h3", text: "Fire department access" },
      { type: "p", text: "Non-negotiable and frequently misunderstood. Gates serving areas with hydrants, sprinkler connections, or fire department connections must remain unlocked, be fitted with a Knox Box, or use a fire-department-compatible access system. Verify with your local fire marshal before finalizing any gate specification." },

      { type: "h2", text: "8. Full cost breakdown for 2026" },
      { type: "ul", items: [
        "Barrier arm operator (commercial grade): $1,800–$3,500",
        "Gate arm and hardware: $400–$900",
        "Access control panel: $600–$2,000",
        "RFID reader(s): $300–$900",
        "Traffic loop detectors (entry + exit): $400–$800",
        "Electrical rough-in and connection: $800–$2,500",
        "Concrete work and mounting: $500–$2,000",
        "Intercom / video station: $1,200–$4,000",
        "Initial fob programming: $5–$15 per unit",
        "Building permit: $150–$500",
        "Commissioning and testing: $200–$600",
        "Total for a 50-unit building: $6,500–$18,200",
      ]},
      { type: "p", text: "Budget $800–$2,500 per gate per year for maintenance: two preventive visits minimum on high-traffic installs, operator lubrication and adjustment, loop detector calibration, and a parts reserve for safety edges, limit switches and loop wire. Expect to replace or reprogram 10–20% of your fob pool annually through loss, sales and tenant turnover." },

      { type: "h2", text: "9. Strata council decision checklist" },
      { type: "ul", items: [
        "Get quotes from at least three contractors with strata-specific references, not just commercial or industrial ones.",
        "Verify insurance and WCB/WSIB coverage — minimum $2M commercial general liability and current workers\' compensation registration.",
        "Confirm building permit requirements directly with your municipality.",
        "Obtain fire department access confirmation before installation, not after.",
        "Pass the required strata vote — in BC, a 3/4 vote for common property alterations unless bylaws state otherwise.",
        "Negotiate the maintenance contract at the same time as the installation contract, while you still have leverage.",
        "Budget for resident fob programming plus a replacement reserve, and communicate the access transition in advance.",
        "Review warranty terms: minimum two years parts and labour on the operator, one year on access control electronics.",
        "Notify your strata insurance carrier and get written confirmation of coverage.",
        "Document everything — as-built drawings, programming codes stored securely, manuals, and service contacts.",
      ]},

      { type: "h2", text: "10. Maintenance, longevity and Canadian climate" },
      { type: "p", text: "A system that performs flawlessly through a mild coastal BC winter can fail in its first season in a Winnipeg parkade at −40°C. Climate-appropriate specification is the difference between 20 years of service and replacement in five." },
      { type: "h3", text: "Cold weather specifications" },
      { type: "p", text: "For climate zones 5 through 8, specify operators rated to −40°C, heated control boards, battery backup with cold-rated sealed lead-acid or LFP cells, and stainless hardware throughout. Standard zinc die-cast hardware becomes brittle below −20°C and fails under everyday impact loads." },
      { type: "h3", text: "Coastal corrosion management" },
      { type: "p", text: "In coastal BC and Atlantic Canada, specify hot-dip galvanized steel (not electro-galvanized), powder-coated aluminum operator housings, and 316-series stainless for exposed fasteners. Chain link fabric should be 9-gauge galvanized-before-weaving with a PVC coating for marine environments." },
      { type: "h3", text: "Preventive maintenance schedule" },
      { type: "ul", items: [
        "Monthly: visual inspection, safety edge test, loop detector function test, arm pivot lubrication if specified.",
        "Semi-annually: full service visit — motor current draw, limit switch calibration, battery load test, hardware torque, access control audit.",
        "Annually: fencing inspection for post movement, panel deformation, rust and anchor integrity; review emergency access procedures.",
        "Every five years: full system audit — remaining service life, technology currency, access platform support status.",
      ]},
      { type: "h3", text: "Replace or repair?" },
      { type: "p", text: "General rule: if repair costs in any 12-month period exceed 30% of operator replacement cost and the system is over 10 years old, replace it. Older systems also create headaches as fob platforms lose support and spare parts dry up. A properly specified and maintained strata gate system should deliver 15–25 years of service and typically pays back in 4–7 years in urban Canadian markets." },

      { type: "h2", text: "Get a quote" },
      { type: "p", text: "L.S. Fencing & Metal Work is a family-owned contractor based at 3095 McCallum Rd Unit #6, Abbotsford, BC, serving strata corporations, property managers and commercial clients across the Fraser Valley and Lower Mainland. We install chain link, ornamental, cedar, barrier gates, hand rails and custom driveway gates, and offer on-site welding. Call or text 604-758-0014 for a free on-site assessment." },
      { type: "p", text: "Cost figures reflect typical Canadian market conditions as of mid-2026 and are for planning purposes only. This guide is not engineering or legal advice — strata legislation varies by province, so consult a strata lawyer or property manager for jurisdiction-specific guidance." },
    ],
    faq: [
      { q: "How much does a strata parking gate system cost in Canada?", a: "A single-entry strata parkade gate system typically runs $6,500 to $18,200 installed in 2026. The barrier arm operator itself is only $1,800–$3,500 of that; electrical rough-in, concrete work, access control, intercom, loop detectors, permits and commissioning make up the rest." },
      { q: "Do strata councils in BC need a vote to install a parking gate?", a: "Yes. Under the BC Strata Property Act, alterations to common property generally require a 3/4 vote of the ownership unless your bylaws state otherwise. Allow adequate notice time and confirm quorum requirements before scheduling the vote." },
      { q: "Is barbed wire allowed on strata fencing?", a: "In most Canadian municipalities barbed wire topping is permitted in commercial and industrial zones and on non-street-facing strata fences such as waste enclosures and utility compounds, usually with a minimum height to the lowest strand. Always verify the local bylaw before specifying it." },
      { q: "What gauge chain link should a strata property use?", a: "Specify 9-gauge or 11-gauge hot-dip galvanized chain link for all strata security applications. Lighter 12.5 to 14-gauge fabric sags, stretches and fails within a few years, making it more expensive over the life of the fence." },
      { q: "How do you fence an underground parkade where posts can't be driven?", a: "Underground installations use surface-mounted base plates with chemical anchors, core-drilled post sockets, or load-spreading track systems. Stainless fixings are mandatory because of moisture and concrete spalling, and the anchoring design should carry engineering sign-off for the dynamic loads of repeated gate cycles." },
      { q: "What is the best way to stop tailgating at a strata gate?", a: "No single technology stops tailgating. Combine loop detectors that close the gate promptly once a vehicle clears, gate placement that makes close following awkward, camera coverage with clear signage, and resident education." },
    ],
    internalLinks: [
      { to: "/barrier-gates", label: "Barrier Gates & Hand Rails" },
      { to: "/metal-gates", label: "Custom & Cantilever Gates" },
      { to: "/commercial-chain-link-fencing", label: "Commercial Chain Link Fencing" },
      { to: "/chain-link-fencing", label: "Chain Link Fencing" },
      { to: "/gallery", label: "Browse our gallery" },
      { to: "/contact", label: "Get a free quote" },
    ],
    externalLinks: [
      { to: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_00", label: "BC Strata Property Act", external: true },
      { to: "https://www.abbotsford.ca/", label: "City of Abbotsford — permits & bylaws", external: true },
      { to: "https://www.worksafebc.com/", label: "WorkSafeBC", external: true },
    ],
  },
  {
    slug: "industrial-perimeter-security-fencing-langley-bc",
    title: "Industrial Perimeter Security Fencing in Langley, BC: Heavy-Gauge Systems & Security Wire",
    description:
      "Heavy-gauge industrial perimeter security fencing for Langley BC — 6-gauge chain link, 358 anti-climb mesh, barbed and razor wire toppings, bylaw limits, footings and access control specs.",
    date: "2026-07-29",
    readMinutes: 12,
    ogImage: "/__l5e/assets-v1/37339657-d229-4758-a5e5-dbb446bddcba/industrial-perimeter-security-chainlink-langley.png",
    ogImageCaption:
      "Heavy-gauge galvanized chain link industrial perimeter security fence with three-strand barbed wire topping in Langley, BC.",
    tags: ["Chain Link", "Commercial", "Security"],
    cityName: "Langley",
    region: "Fraser Valley",
    keyTakeaways: [
      "High-security industrial perimeters start at 6-gauge or 8-gauge chain link, or 358 anti-climb welded mesh — 9-gauge and 11-gauge are not enough for high-value assets.",
      "Minimum 8 ft fabric plus 1–2 ft of barbed or razor wire topping, for a total security height of 9.5–10 ft.",
      "Barbed wire is generally permitted in Langley industrial zones when the lowest strand sits at least 2.0 m above grade; razor wire is restricted and needs municipal review.",
      "Langley's 1,400 mm annual rainfall and clay soils require hot-dip galvanizing to ASTM A123 and 36–42 inch concrete footings.",
      "The fence is the foundation layer — microphonic cable, radar, PTZ cameras and CPTED clearance zones complete the system.",
    ],
    body: [
      { type: "p", text: "Protecting high-value industrial inventory, heavy machinery, logistics hubs, and critical infrastructure requires physical security boundaries engineered to delay, detect, and deter forced entry. In high-density industrial hubs across Langley, BC — including Campbell Heights, Gloucester Industrial Estates, Port Kells, and Aldergrove — perimeter fencing is the primary physical barrier against trespass, copper theft, vehicle breach, and organized property crime." },
      { type: "image", src: "/__l5e/assets-v1/37339657-d229-4758-a5e5-dbb446bddcba/industrial-perimeter-security-chainlink-langley.png", alt: "Heavy-gauge galvanized chain link industrial perimeter security fence with three-strand barbed wire topping securing a commercial building and fleet parking yard in Langley BC", caption: "Heavy-gauge galvanized industrial perimeter with barbed wire topping — Langley, BC.", focusKeyword: "industrial perimeter security fencing Langley BC" },
      { type: "p", text: "This guide covers technical specifications, structural engineering requirements, municipal bylaw compliance, and integration protocols for deploying heavy-gauge perimeter fencing with topped security wire across industrial properties in the Fraser Valley." },

      { type: "h2", text: "1. Executive summary: core architectural specifications" },
      { type: "ul", items: [
        "Primary wire gauge: 6-gauge or 8-gauge heavy-duty chain link, or 8-gauge (4 mm) welded rigid mesh panels (358 anti-climb profile). Standard 9-gauge and 11-gauge wire are insufficient for high-value protection.",
        "Security topping: 3-strand 12.5-gauge high-tensile barbed wire on 45-degree extension arms, or helical concertina razor wire (CBT-65 / BTO-22) where zoning permits.",
        "System height: minimum 8 ft (2.4 m) fabric, plus 1–2 ft (0.3–0.6 m) of security wire topping — total security height 9.5 to 10 ft.",
        "Corrosion resistance: Class 2 hot-dip galvanized coating (min. 1.2 oz/ft² / 366 g/m²) or thermally fused PVC over galvanized steel core, engineered for Pacific Northwest precipitation.",
        "Post schedule: Schedule 40 structural pipe — minimum 2.875\" O.D. terminal posts, 2.375\" O.D. line posts — set in deep concrete footings below frost line.",
      ]},

      { type: "h2", text: "2. Heavy-gauge fencing fabric options" },
      { type: "p", text: "Selecting the correct substrate depends on operational security level, visual impact, and resistance to manual breach tools such as bolt cutters, angle grinders, and vehicle impact." },
      { type: "ul", items: [
        "6-gauge heavy industrial chain link — 0.192\" core, 2\"×2\" diamond, high cut resistance. Open equipment yards, fleet parking, lumber mills.",
        "8-gauge commercial chain link — 0.162\" core, 2\"×2\" diamond, medium-high cut resistance. General warehousing and multi-tenant industrial parks.",
        "358 high-security welded mesh — 8-gauge / 4 mm wire, 3\"×0.5\" (76.2 × 12.7 mm) micro-mesh. Extreme cut resistance, no finger or toe grip. Substations, data centres, high-value tech storage.",
        "Expanded heavy steel panels — 3/4\" #9 expanded metal, raised diamond aperture, rigid continuous sheet. Scrap metal recycling and bonded customs yards.",
      ]},
      { type: "h3", text: "6-gauge heavy-duty chain link" },
      { type: "ul", items: [
        "Core material: cold-drawn steel wire, 75,000–95,000 PSI tensile strength.",
        "Selvage: knuckled top and bottom for low-risk zones; twisted/barbed selvage top and bottom for high-security applications to prevent unravelling.",
        "Key advantage: flexible structural response to wind load and terrain contours, with maximum resistance to impact from heavy machinery or yard transport.",
      ]},
      { type: "h3", text: "358 anti-climb high-security mesh" },
      { type: "ul", items: [
        "Aperture design: the 12.7 mm horizontal aperture blocks footholds and hand grip; 76.2 mm vertical spacing prevents standard bolt cutter jaws entering the grid.",
        "Structural integrity: rigid welded panels (2.5 m width) mounted to heavy RHS posts with anti-tamper security clamps and shear nuts.",
      ]},

      { type: "h2", text: "3. Security wire systems: barbed and razor wire integration" },
      { type: "p", text: "Security wire toppings increase the height profile, eliminate climb-over capability, and present both a physical and psychological barrier." },
      { type: "h3", text: "3-strand barbed wire configurations" },
      { type: "ul", items: [
        "Wire standard: ASTM A121 Class 3 galvanized or high-tensile 12.5-gauge wire with 4-point barbs at 3\" or 5\" intervals.",
        "45-degree single arm: angled outward toward the threat side to push climbers off balance.",
        "V-arm (double arm): three strands inward and three outward — six total — creating a 24-inch overhead obstacle zone.",
        "Tensioning: mechanically tensioned with turnbuckles or inline strainers to prevent sag under snow load or manual pull-down.",
      ]},
      { type: "h3", text: "Concertina and razor wire (tape)" },
      { type: "ul", items: [
        "Tape profile: BTO-22 (22 mm barb) or CBT-65 (65 mm barb) stamped stainless strip clamped over a high-tensile galvanized spring-steel core.",
        "Coil diameter: 18\" (450 mm) or 24\" (600 mm) concertina loops fixed to the top rail or suspended between barbed wire extensions.",
        "Deployment: helical coil clipped at alternating points to form an expanding structure that resists crushing or manual compression.",
      ]},
      { type: "quote", text: "In high-risk commercial zones, security wire must keep the bottom strand at least 2.0 metres (6.5 ft) above grade to prevent accidental contact with pedestrians or staff." },

      { type: "h2", text: "4. Langley bylaws, zoning and environmental factors" },
      { type: "h3", text: "Municipal regulatory framework" },
      { type: "p", text: "Under Township of Langley Master Zoning Bylaw 2500 and City of Langley Zoning Bylaw No. 3300, side and rear yard fencing in industrial zones (M-1A, M-2, M-3, M-5) is regulated to specific height limits. Fencing above roughly 2.0–2.4 m requires a building permit or structural variance." },
      { type: "ul", items: [
        "Front yard setbacks: industrial lots on arterials such as 200th Street, 56th Avenue and Fraser Highway face restricted front-yard fence heights (typically 1.2–1.8 m). High-security fence lines go behind the setback or pair with approved screening landscape.",
        "Industrial zones (M-1, M-2, M-3, M-6): barbed wire toppings are generally permitted provided the lowest strand is at least 2.0 m (6.5 ft) above finished grade.",
        "Razor wire and electrified systems: restricted in commercial and mixed-use light industrial areas. Heavy industrial use (M-3, bonded storage) requires municipal review, safety signage, and electrical certification to CSA SPE-1000.",
        "Corner lots: fences in the sight triangle (typically 6 m × 6 m to 9 m × 9 m) must stay open or under about 1.0 m so driver sightlines are preserved.",
      ]},
      { type: "h3", text: "Climate and soil in Langley" },
      { type: "ul", items: [
        "Langley sees over 1,400 mm of annual precipitation — raw steel and basic painted finishes rust-bleed within 24 to 36 months.",
        "All steel must be hot-dip galvanized post-fabrication to ASTM A123 / A121, or use a duplex system (galvanized core + zinc phosphate pre-treatment + architectural polyester powder coat).",
        "Port Kells, Northwest Langley and low-lying Aldergrove have high silt/clay content and fluctuating water tables.",
        "Footings must resist frost heave and lateral displacement: 36–42 inches (900–1050 mm) deep, with a diameter about three times the nominal post O.D.",
      ]},

      { type: "h2", text: "5. Structural installation engineering and hardware" },
      { type: "p", text: "A security fence is only as strong as its posts and framework. The schedule below applies to heavy-duty industrial installations." },
      { type: "ul", items: [
        "Terminal, corner and pull posts: 2.875\" (73 mm) O.D. up to 8 ft height; 4.000\" (101.6 mm) O.D. above 8 ft or for heavy gate supports.",
        "Wall thickness: Schedule 40 pipe (0.203\" / 5.16 mm wall).",
        "Line posts: 2.375\" (60.3 mm) O.D. at maximum 8 ft (2.4 m) on-centre to withstand 100 km/h regional gusts with slat inserts installed.",
        "Top rail: 1.660\" O.D. Schedule 40 pipe with swedged joints or sleeve couplings.",
        "Bottom edge: 7-gauge coil spring tension wire attached with heavy galvanized hog rings every 12 inches to stop bottom pull-up.",
      ]},
      { type: "h3", text: "Gate engineering and automated access" },
      { type: "ul", items: [
        "Cantilever slide gates: internal track frame engineered to 1.5× the opening width — a 30 ft clear opening needs 45 ft of total gate length — with no ground track to jam with snow, ice or gravel.",
        "Automated drives: continuous-duty 1–2 HP chain or hydraulic operators rated for high daily cycle counts.",
        "Safety and access: sensing loops, dual photoelectric beams, RFID keycards, cellular intercoms, and licence plate recognition cameras.",
      ]},

      { type: "h2", text: "6. Access control and electronic security integration" },
      { type: "p", text: "Heavy perimeter fencing is the physical foundation for active detection — the barrier buys the response time that detection and monitoring convert into an intercept." },
      { type: "ul", items: [
        "Microphonic and fibre-optic intrusion cable mounted to 6-gauge chain link or 358 mesh detects cutting, climbing and panel lifting, triggering PTZ camera tracking.",
        "Infrared beam arrays and motion radar along the inner fence line create an active curtain zone with fewer false alarms from wind-driven debris or wildlife.",
        "CPTED: maintain a clear 3-foot zone on both sides of the fence line — no pallets, trees, or equipment that could serve as climbing aids.",
        "Perimeter LED lighting angled outward toward approach paths blinds intruders while preserving camera visibility.",
      ]},

      { type: "h2", text: "7. Lifecycle cost and material evaluation" },
      { type: "ul", items: [
        "Standard commercial 9-gauge chain link: lowest CapEx, standard labour, 12–15 year galvanized lifespan, cut with 18\" bolt cutters. Fleet yards and basic storage.",
        "Heavy industrial 6-gauge chain link: medium CapEx, heavy equipment required, 25+ year lifespan, needs hydraulic cutters or a cutting wheel. Machinery yards, truck depots, logistics hubs.",
        "Ultra-security 358 welded mesh: highest CapEx and precision post layout, 30+ year lifespan, power tools required to breach, virtually zero maintenance. Substations, high-value tech, bonded yards.",
      ]},
      { type: "h2", text: "Get a quote" },
      { type: "p", text: "LS Fencing & Metal Work builds industrial perimeter security fencing, barbed and razor wire toppings, and automated cantilever gates across Langley, Surrey, Abbotsford and the Fraser Valley. Call or text for a free site assessment and a written spec." },
    ],
    faq: [
      { q: "What is the maximum fence height allowed for industrial yards in Langley, BC?", a: "In industrial zones across the Township of Langley and the City of Langley, side and rear boundary fences are generally permitted up to 2.4 metres (8 feet) without a variance. With security wire topping the total height may reach 9.5 to 10 feet, subject to zoning overlays, setback lines, and structural permit review by the municipal building department." },
      { q: "Is razor wire legal on commercial and industrial properties in the Fraser Valley?", a: "Razor wire (concertina tape) is subject to strict municipal bylaws. It is permitted on certain heavy industrial (M-3) or high-security utility sites but generally restricted or prohibited in light industrial (M-1/M-2) and commercial zones. Barbed wire is widely permitted on industrial sites when mounted on top extension arms with the lowest strand at least 2.0 metres (6.5 feet) above grade." },
      { q: "What is the difference between 9-gauge and 6-gauge chain link wire?", a: "Wire core diameter and strength. 9-gauge measures about 0.148 inches (3.76 mm); 6-gauge measures 0.192 inches (4.88 mm). The 6-gauge wire carries over 60% more steel mass, giving significantly higher cut resistance and better impact tolerance against heavy yard equipment." },
      { q: "How deep must fence post footings be poured in Langley, BC?", a: "To resist movement in wet silt and clay soils and seasonal frost expansion, posts should be set in concrete footings 36 to 42 inches deep (0.9 to 1.05 metres). Hole diameters run 10 to 12 inches for line posts and 12 to 16 inches for heavy terminal and gate posts." },
      { q: "How does PVC coating protect high-security fencing near wet environments?", a: "PVC is thermally bonded over a hot-dip galvanized steel core wire. That duplex protection creates an impermeable barrier against rain, road salt spray, and atmospheric moisture, roughly doubling the service life of standard galvanized wire in coastal Pacific Northwest climates." },
    ],
    internalLinks: [
      { to: "/commercial-chain-link-fencing", label: "Commercial Chain Link Fencing" },
      { to: "/chain-link-fencing", label: "Chain Link Fencing" },
      { to: "/metal-gates", label: "Custom & Cantilever Gates" },
      { to: "/gallery", label: "Browse our gallery" },
      { to: "/contact", label: "Get a Free Quote" },
    ],
    externalLinks: [
      { to: "https://www.tol.ca/en/business-development/zoning-bylaw.aspx", label: "Township of Langley Zoning Bylaw 2500", external: true },
      { to: "https://www.langleycity.ca/", label: "City of Langley (Zoning Bylaw No. 3300)", external: true },
      { to: "https://www.worksafebc.com/", label: "WorkSafeBC — site safety and clearance", external: true },
    ],
  },
  {
    slug: "recreational-playground-chain-link-fencing-langley",
    title: "Chain Link Fencing for Recreational Areas & Playgrounds in Langley",
    description:
      "CSA Z614 playground fencing, basketball and tennis court perimeters, and dog park airlock gates in Langley, Surrey, Abbotsford and the Fraser Valley — specs, costs, permits and FAQs.",
    date: "2026-07-27",
    readMinutes: 7,
    ogImage: "/__l5e/assets-v1/e839bc90-d5c0-45f1-a9f3-2e0fad756c6e/galvanized-chainlink-recreational-court-gate.jpg",
    ogImageCaption:
      "Galvanized commercial-grade chain link perimeter fence with walk-through gate around a private recreational court in the Fraser Valley.",
    tags: ["Chain Link", "Playgrounds", "Commercial"],
    cityName: "Langley",
    region: "Fraser Valley",
    keyTakeaways: [
      "CSA Z614 caps openings at 89mm and requires self-closing, self-latching gates that swing away from the play area.",
      "Playground perimeters need 1.2m minimum height — 1.5m next to roads or water.",
      "Use 9-gauge galvanized fabric and Schedule 40 posts at 3.05m centres; residential 11.5-gauge fails by year three.",
      "Basketball courts typically run 3.0–3.6m high; tennis 3.6–4.8m on the ends.",
      "Dog parks need a double-gate airlock entry — we build these as standard.",
    ],
    body: [
      { type: "p", text: "The installation above is a chain link perimeter fence around a private recreational court in the Fraser Valley. Galvanized commercial-grade chain link, walk-through gate with self-latching hardware, clean corner posts. Built to last 25 years with zero maintenance beyond an occasional inspection." },
      { type: "image", src: "/__l5e/assets-v1/e839bc90-d5c0-45f1-a9f3-2e0fad756c6e/galvanized-chainlink-recreational-court-gate.jpg", alt: "Galvanized commercial-grade chain link fence and walk-through gate enclosing a private basketball court in the Fraser Valley", caption: "Galvanized recreational court perimeter with self-latching walk-through gate — Fraser Valley, BC.", focusKeyword: "recreational chain link fencing Langley" },
      { type: "p", text: "Recreational fencing is one of the most misspecified categories in residential and municipal projects. The wrong gauge, the wrong post spacing, the wrong gate hardware — and you have a fence that looks fine for two years and fails on year three." },
      { type: "h2", text: "Recreational and playground fencing — getting the spec right" },
      { type: "p", text: "Whether it's a backyard basketball court, a school playground, a municipal park, or a strata amenity area — recreational fencing has specific requirements that standard residential chain link doesn't meet." },
      { type: "h3", text: "CSA Z614 — the Canadian playground safety standard" },
      { type: "p", text: "CSA Z614 governs playground design and safety in Canada. For any playground adjacent to roads, water, or other hazards, compliant perimeter fencing is required. Key requirements:" },
      { type: "ul", items: [
        "Maximum 89mm between pickets — prevents head entrapment for children under five",
        "No openings between 89mm and 230mm anywhere in the fence structure",
        "Minimum 1.2m height for standard perimeters — 1.5m adjacent to roads or water",
        "Top rail smooth with no climbing footholds",
        "All gates self-closing and self-latching, latch at minimum 1.5m height",
        "Gates open outward, away from the play area",
        "No sharp edges, points, or protrusions at child contact height",
        "Lead-free coatings and corrosion-resistant materials throughout",
      ]},
      { type: "p", text: "The most common specification mistake we see is residential-grade chain link installed on playground and recreational applications. Residential chain link uses lighter gauge wire — typically 11.5 gauge versus 9 gauge commercial — lighter posts, and lighter footings. It looks identical to commercial grade for the first year. By year three on a high-use recreational installation it's sagging, the gates are misaligned, and the posts are starting to lean. We've replaced a lot of it." },
      { type: "h3", text: "What commercial-grade recreational fencing actually means" },
      { type: "ul", items: [
        "9 gauge galvanized chain link fabric — not 11.5 gauge",
        "Schedule 40 steel line posts at 3.05m centres maximum",
        "Terminal posts — corners, ends, gates — at heavier wall thickness",
        "Concrete footings sized for post height and BC wind load",
        "Self-closing gate hinges rated for the duty cycle",
        "Self-latching hardware at appropriate height for the application",
      ]},
      { type: "h2", text: "Recreational court fencing — basketball, tennis, multi-use" },
      { type: "p", text: "The photo above is a good example of a properly built recreational court perimeter. The chain link is installed tight to the ground with no gap for balls or small children to pass through. The walk-through gate has a self-closing spring hinge and a latch positioned above child reach. The corner posts are set in adequate concrete for the post height." },
      { type: "ul", items: [
        "Height: basketball courts typically use 3.0m to 3.6m fencing to contain balls; tennis goes higher — 3.6m to 4.8m on the ends. Multi-use courts depend on the primary sport.",
        "Gauge: 9 gauge minimum. High-impact areas — behind backboards, at tennis baselines — sometimes specify 6 gauge.",
        "Colour: galvanized is standard and most durable; black vinyl coated where aesthetics matter — strata, school yards, parks.",
        "Gates: one walk-through gate plus one equipment access gate wide enough for maintenance vehicles, both with self-closing hardware.",
      ]},
      { type: "h2", text: "Municipal and strata recreational fencing" },
      { type: "p", text: "LS Fencing & Metal Work has installed recreational and playground perimeter fencing for strata corporations, schools, municipalities, and private landowners across Langley, Surrey, Abbotsford, Delta, and the Fraser Valley." },
      { type: "ul", items: [
        "Permit drawings and engineer-stamped post spacing calculations where required",
        "Full documentation for strata council approval",
        "WorkSafeBC compliance on all installation work",
        "Warranty documentation for strata records",
        "Coordination with landscape architects and project managers on larger builds",
      ]},
      { type: "h2", text: "Dog park fencing vs playground fencing" },
      { type: "p", text: "These are frequently combined on the same municipal property — but they need different specifications. Playgrounds run 1.2–1.5m high with a child-safe high latch and quarterly inspections. Dog parks run 1.2–1.8m depending on breeds, need dig prevention at the bottom, monthly inspections, and a double-gate airlock entry — a small holding area between two gates so dogs can't bolt when owners enter or exit. We build airlock entries as standard on any dog park installation." },
      { type: "h2", text: "Get a quote" },
      { type: "p", text: "LS Fencing & Metal Work installs recreational, playground, and dog park fencing across Langley, Surrey, Abbotsford, and the Fraser Valley. Call for a free site assessment and we'll price the work in writing." },
    ],
    faq: [
      { q: "How much does recreational court fencing cost in BC?", a: "A standard basketball court perimeter in commercial-grade chain link typically runs $18,000 to $35,000 installed depending on court size, fence height, and gate configuration. Tennis courts run higher due to height requirements." },
      { q: "Do I need a permit for recreational fencing in Langley?", a: "Fences over 1.8m in Langley Township and City of Langley require a permit. Recreational court fencing typically exceeds this height — we handle the permit application as part of the project." },
      { q: "How long does a recreational fence installation take?", a: "A standard basketball or multi-use court perimeter takes 2–4 days with a full crew. Municipal projects with engineered drawings and permit requirements add lead time on the front end." },
      { q: "What maintenance does chain link recreational fencing need?", a: "Minimal. Inspect quarterly for damage, sharp edges, and gate hardware function. Tighten any loose tension wire annually. Hot-dip galvanized chain link in BC's coastal climate typically lasts 25–40 years with no treatment." },
      { q: "Can you match existing fencing on an expansion project?", a: "Yes — we carry standard commercial gauges and can match most existing installations. Send us a photo and we'll match the gauge, height, and finish." },
    ],
    internalLinks: [
      { to: "/gallery", label: "Browse our gallery" },
      { to: "/commercial-chain-link-fencing", label: "Commercial Chain Link Fencing" },
      { to: "/chain-link-fencing", label: "Chain Link Fencing" },
      { to: "/metal-gates", label: "Custom Gates" },
      { to: "/contact", label: "Get a Free Quote" },
    ],
  },
  {
    slug: "metal-railings-chain-link-welding-langley",
    title: "Metal Railings, Chain Link Fencing & On-Site Welding in Langley",
    description:
      "Custom metal railing fabrication, commercial chain link fencing, and portable on-site welding in Langley, Surrey, Abbotsford and the Fraser Valley — specs, costs, permits and FAQs from LS Fencing & Metal Work.",
    date: "2026-07-27",
    readMinutes: 8,
    ogImage: "/__l5e/assets-v1/0387aa99-dfba-42a9-89af-047c9366c9ad/black-chainlink-railing-sports-facility-langley.png",
    ogImageCaption:
      "Black chain link fence with galvanized pipe top railing lining a concrete walkway at a government sports facility in Langley, BC.",
    tags: ["Railings", "Welding", "Chain Link"],
    cityName: "Langley",
    region: "Fraser Valley",
    keyTakeaways: [
      "Every railing is cut, bent, welded and finished in our own Fraser Valley shop — no outsourcing.",
      "Hot-dip galvanizing gives 25–50 years of corrosion protection in BC's wet climate; powder coat is for looks.",
      "Our truck-mounted welding unit comes to you anywhere in the Fraser Valley and Lower Mainland.",
      "Commercial chain link uses 9-gauge fabric and heavier posts — residential-grade spec on a commercial site fails in 2–3 years.",
    ],
    body: [
      { type: "p", text: "The railing in the photo above was fabricated and installed by LS Fencing & Metal Work at a facility in the Fraser Valley. Hot-dip galvanized pipe. Installed at the edge of a walkway and drainage corridor where a standard wooden rail would have rotted within two seasons." },
      { type: "image", src: "/__l5e/assets-v1/0387aa99-dfba-42a9-89af-047c9366c9ad/black-chainlink-railing-sports-facility-langley.png", alt: "Black chain link fence with galvanized pipe top railing running along a concrete walkway at a government sports facility in Langley BC", caption: "Chain link perimeter with galvanized pipe railing — public sports facility, Langley, BC.", focusKeyword: "metal railings Langley" },
      { type: "p", text: "That's the difference between a fence company and a metal fabrication and fencing company. We don't just install — we build what needs to last." },
      { type: "h2", text: "Metal railings in Langley and the Fraser Valley" },
      { type: "p", text: "LS Fencing & Metal Work fabricates custom metal railings for residential, commercial, agricultural and industrial properties across Langley, Surrey, Abbotsford, Chilliwack and the Fraser Valley. Every railing starts in our metal shop. We cut, bend, weld and finish in-house — no outsourcing, no waiting on someone else's schedule. If you need a railing that matches an existing structure, fits an unusual grade change, or has to meet a specific load rating, we build it to spec." },
      { type: "h3", text: "Common railing applications we handle" },
      { type: "ul", items: [
        "Bridge and culvert guard rails — agricultural and rural properties",
        "Deck and balcony railings — residential and strata",
        "Stairwell and mezzanine railings — commercial and industrial",
        "Parking structure railings — concrete-anchored, engineered",
        "Machinery guarding — manufacturing and warehouse facilities",
        "Equipment ramps and dock edge protection",
      ]},
      { type: "h2", text: "Galvanized vs powder coated — which is right for your project?" },
      { type: "p", text: "Hot-dip galvanizing gives you 25–50 years of corrosion protection in BC's wet climate. It's the right choice for anything exposed to weather, soil contact or agricultural environments — like the railing above. Powder coating gives you colour and a refined finish, so it's right for architectural railings, commercial entrances and anywhere appearance matters. We offer both, and many projects use both: galvanized structure with powder-coated infill panels." },
      { type: "h2", text: "Portable on-site welding — we come to you" },
      { type: "p", text: "One of the most underused services we offer is mobile welding. Our truck-mounted welding unit can come to your property anywhere in the Fraser Valley and Lower Mainland." },
      { type: "ul", items: [
        "Agricultural properties with broken equipment that can't be trailered",
        "Construction sites that need metal work done during the build",
        "Industrial facilities that can't shut down to move equipment",
        "Rural properties too remote for standard contractors to bother with",
        "Emergency repairs — broken gates, snapped posts, railings damaged by vehicle strikes",
      ]},
      { type: "h3", text: "What the welding truck handles" },
      { type: "ul", items: [
        "MIG and stick welding on site",
        "Gate hinge replacement and repair",
        "Post repair and re-setting",
        "Custom bracket fabrication on location",
        "Structural repair on agricultural and industrial equipment",
        "Trailer and vehicle repair welding",
      ]},
      { type: "quote", text: "If it's made of steel and it's broken — or needs to exist and doesn't yet — call us. We'll come to you." },
      { type: "h2", text: "Chain link fencing — commercial and industrial grade" },
      { type: "p", text: "Chain link is the workhorse of commercial perimeter security across the Fraser Valley. It's fast to install, cost-effective, and when specified correctly it's extremely durable." },
      { type: "image", src: "/__l5e/assets-v1/d23d642f-105c-42dc-9924-3367fc801e85/black-chainlink-sports-field-perimeter.png", alt: "Black vinyl-coated chain link perimeter fence with privacy screening around a turf sports field in Langley BC", caption: "Black vinyl-coated chain link perimeter with screening — turf sports field, Langley, BC.", focusKeyword: "commercial chain link fencing Langley" },
      { type: "ul", items: [
        "Industrial yards and logistics facilities",
        "Construction site security",
        "School and recreational facility perimeters",
        "Agricultural property boundaries",
        "Contractor and fleet vehicle storage yards",
        "Dog runs and kennel facilities",
      ]},
      { type: "h3", text: "Getting the spec right" },
      { type: "p", text: "Residential chain link uses lighter gauge wire and lighter posts. Commercial chain link uses heavier gauge fabric — typically 9 gauge versus 11.5 gauge residential — heavier line posts, and terminal posts sized for the fence height and wind load. In Surrey, Langley and Abbotsford that specification difference matters. We've replaced a lot of residential-grade chain link that was installed on commercial properties to save money upfront and failed within two to three years." },
      { type: "ul", items: [
        "Galvanized — standard commercial perimeter",
        "Vinyl coated — black or green, residential and architectural",
        "Privacy slats — vertical or horizontal for screening",
        "Barbed wire or razor wire top — high security sites",
        "Security mesh infill — anti-climb applications",
      ]},
      { type: "h2", text: "Why local fabrication matters" },
      { type: "p", text: "Every railing, gate and fence component we install is fabricated or sourced locally. We're not a national franchise dispatching subcontractors — we're a Fraser Valley metal fabrication and fencing company with our own shop, our own trucks and our own crew. That means lead times measured in days not months, custom work priced for real budgets, a crew that knows Langley bylaws, Surrey permit requirements and Abbotsford setback rules, and one company responsible from fabrication through installation." },
      { type: "h2", text: "Get a quote" },
      { type: "p", text: "LS Fencing & Metal Work serves Langley and the Fraser Valley for metal railing fabrication, chain link fence installation and portable on-site welding. Book a free on-site quote and we'll price the work in writing." },
    ],
    faq: [
      { q: "How much does metal railing cost in BC?", a: "Simple pipe railing typically runs $80–$180 per linear foot installed depending on configuration, finish and site conditions. Engineered railings for commercial applications requiring stamped drawings cost more. We provide written quotes after a site visit." },
      { q: "Do I need a permit for a railing or fence in Langley?", a: "Fences over 1.8 metres in height require a permit in most Langley Township and City of Langley zones. Railings on decks over 600mm above grade require a building permit as part of the deck structure. We advise on permit requirements as part of every project." },
      { q: "How far in advance should I book portable welding?", a: "For non-emergency work we're typically booking 1–2 weeks out. Emergency repairs — broken gates, vehicle strikes, structural failures — we prioritize and can often respond within 24–48 hours." },
      { q: "What areas do you serve?", a: "Langley Township, City of Langley, Surrey, Delta, Abbotsford, Chilliwack, Mission, Maple Ridge and the broader Fraser Valley. For large projects we travel further." },
      { q: "How long does chain link fence installation take?", a: "A standard commercial chain link install runs 200–400 linear feet per day with a full crew. Most commercial projects are complete within 1–5 days depending on scope." },
    ],
    internalLinks: [
      { to: "/welding-services", label: "Welding Services" },
      { to: "/barrier-gates-hand-rails", label: "Barrier Gates & Hand Rails" },
      { to: "/chain-link-fencing", label: "Chain Link Fencing" },
      { to: "/commercial-chain-link-fencing", label: "Commercial Chain Link Fencing" },
      { to: "/contact", label: "Get a Free Quote" },
    ],
  },
  {
    slug: "aluminum-vs-ornamental-steel-fencing",
    title: "Aluminum vs Ornamental Steel Fencing in the Fraser Valley",
    description:
      "Aluminum vs ornamental steel fencing for Chilliwack, Abbotsford, and Metro Vancouver — cost, durability, maintenance, and which one actually holds up in Fraser Valley weather.",
    date: "2026-07-26",
    readMinutes: 7,
    ogImage: "/__l5e/assets-v1/6167cad4-4634-4014-94f1-cc1c3dca39c7/ornamental-iron-gate-greenhouse-abbotsford.jpg",
    ogImageCaption:
      "Black ornamental iron swing gate with spear-top pickets and matching perimeter fence at an Abbotsford commercial greenhouse operation.",
    tags: ["Comparison", "Ornamental", "Aluminum"],
    keyTakeaways: [
      "Aluminum is lighter, cheaper up-front, and never rusts — the low-maintenance pick.",
      "Ornamental steel is heavier, stronger, and takes hard impact without bending.",
      "In the wet Fraser Valley climate, powder-coated steel and aluminum both last 25+ years when installed properly.",
      "For security or driveway gates, spec steel. For pool enclosures, front yards, and pet fencing, aluminum wins on cost and weight.",
    ],
    body: [
      { type: "p", text: "Nine out of ten homeowners in Chilliwack and Abbotsford asking about a decorative metal fence are choosing between two materials: pressed aluminum and powder-coated ornamental steel. They look similar from the street. They perform very differently once you factor in cost, weight, security, and how they age in the Fraser Valley climate." },
      { type: "image", src: "/__l5e/assets-v1/6167cad4-4634-4014-94f1-cc1c3dca39c7/ornamental-iron-gate-greenhouse-abbotsford.jpg", alt: "Black ornamental iron swing gate with spear-top pickets and matching perimeter fence securing a commercial greenhouse operation in Abbotsford BC", caption: "Powder-coated ornamental iron swing gate and matching perimeter fence — Abbotsford, BC greenhouse operation.", focusKeyword: "ornamental iron gate Abbotsford" },
      { type: "h2", text: "Quick comparison" },
      { type: "ul", items: [
        "Cost per linear foot: aluminum runs 20–35% cheaper than comparable ornamental steel.",
        "Weight: aluminum is roughly one-third the weight of steel — cheaper to ship, easier to install, easier on posts.",
        "Rust: aluminum does not rust, ever. Powder-coated steel resists rust for 15–25 years but eventually needs touch-ups where the coating chips.",
        "Strength: steel wins on impact resistance. A garden tractor bumping an aluminum picket will bend it; steel will scuff and shrug it off.",
        "Lifespan in BC weather: 25–40 years for either material with proper install and powder coat.",
      ]},
      { type: "h2", text: "How aluminum holds up in the Fraser Valley climate" },
      { type: "p", text: "Aluminum is the low-maintenance king. It cannot rust, so the constant Chilliwack and Abbotsford rain that turns raw steel to orange in a season does nothing to it. Powder-coated aluminum handles UV, salt air off the Fraser River, and freeze-thaw cycles without corroding. The tradeoff: it is soft. A dropped hockey stick or a snowplow drift can bend a picket that a steel fence would barely notice." },
      { type: "h2", text: "Where ornamental steel earns its price tag" },
      { type: "p", text: "Powder-coated ornamental steel is what we spec for driveway gates, commercial perimeters, and anywhere security matters. The pickets are welded, not screwed, so nothing rattles loose. It shrugs off ladder impacts, vehicle nudges, and vandalism. In wet coastal BC the difference between a fence that lasts 20 years and one that lasts 40 comes down to the quality of the coating and the drainage on the post footings — get both right and steel is essentially permanent." },
      { type: "h2", text: "Cost breakdown for a typical Chilliwack yard" },
      { type: "p", text: "For a 100-foot front yard with two gates, expect aluminum ornamental to land in the $55–$85 per linear foot range installed, and powder-coated ornamental steel in the $75–$120 range depending on picket spacing, height, and finial style. Pool enclosures with self-closing gates cost more on either material because BC building code requires specific latch heights and gap tolerances." },
      { type: "h2", text: "Maintenance over 10 years" },
      { type: "ul", items: [
        "Aluminum: hose off twice a year. That is the maintenance schedule.",
        "Steel: hose off twice a year and touch up any coating chips with matching powder-coat paint within a few weeks — otherwise moisture gets under the coating and rust spreads.",
      ]},
      { type: "h2", text: "Which fence should you actually buy?" },
      { type: "p", text: "Pick aluminum if the fence is decorative, cost matters, or the yard has kids and pets rather than security threats — front yards, side yards, pool enclosures, and dog runs. Pick ornamental steel if the fence has to do a job: driveway gates, commercial perimeters, high-traffic public frontage, or any run where impact resistance and security are the point." },
      { type: "quote", text: "In this climate both materials will outlast the mortgage. The question is what the fence has to do — decorate or defend." },
      { type: "p", text: "If you are weighing the two for a Fraser Valley property, book a free on-site quote and we will price both side-by-side so you can compare line-for-line." },
    ],
    faq: [
      {
        q: "Is aluminum or ornamental steel fencing better for the Fraser Valley climate?",
        a: "Both last 25 years or more when installed correctly. Aluminum never rusts and is lower maintenance; powder-coated steel resists rust for 15–25 years and is stronger. For pure weather resistance in Chilliwack and Abbotsford, aluminum wins on maintenance — for durability under impact, steel wins.",
      },
      {
        q: "How much does aluminum ornamental fencing cost per foot installed in BC?",
        a: "Aluminum ornamental fencing typically runs $55–$85 per linear foot installed in the Fraser Valley for a standard 4–5 foot residential fence, depending on picket style, gate count, and site access.",
      },
      {
        q: "Does ornamental steel fencing rust in Chilliwack rain?",
        a: "Powder-coated ornamental steel is engineered against rust and typically holds for 15–25 years before touch-ups are needed. Rust only starts where the coating gets chipped and moisture reaches bare steel, so keeping chips touched up is the entire maintenance job.",
      },
      {
        q: "Which is stronger for a driveway gate — aluminum or steel?",
        a: "Powder-coated ornamental steel. Steel driveway gates handle wind load, vehicle impacts, and daily automation cycles without flexing. Aluminum driveway gates exist but are limited to shorter spans and lighter-duty residential use.",
      },
    ],
    internalLinks: [
      { to: "/ornamental-fencing", label: "Ornamental Iron Fencing" },
      { to: "/chilliwack", label: "Fencing in Chilliwack, BC" },
      { to: "/abbotsford", label: "Fencing in Abbotsford, BC" },
      { to: "/metal-gates", label: "Custom Metal Gates" },
      { to: "/pricing", label: "Pricing Guide" },
    ],
    externalLinks: [
      { to: "https://www.chilliwack.com/main/page.cfm?id=131", label: "City of Chilliwack fence bylaw", external: true },
      { to: "https://www.abbotsford.ca/planning-and-development/building-permits", label: "City of Abbotsford building permits", external: true },
    ],
  },
  {
    slug: "chain-link-fencing-abbotsford-bc",
    title: "Chain Link Fencing in Abbotsford, BC — 2026 Contractor's Guide",
    description:
      "Commercial and industrial chain link fencing in Abbotsford, BC — gauges, heights, gate types, permit rules, costs, and neighbourhoods we serve. Free on-site quotes from LS Fencing & Metal Work.",
    date: "2026-07-14",
    readMinutes: 11,
    ogImage: "/__l5e/assets-v1/c17f519b-6e1c-4e4b-9862-fc49c5d614f8/6ft-galv-barb-abbotsford.jpeg",
    ogImageCaption:
      "6-foot galvanized chain link fence with barbed wire top on a commercial property in Abbotsford, BC installed by LS Fencing & Metal Work.",
    tags: ["Chain Link", "Abbotsford", "Commercial", "Local Guide"],
    cityName: "Abbotsford",
    region: "Fraser Valley",
    keyTakeaways: [
      "Spec 9-gauge hot-dip galvanized chain link for any Abbotsford commercial or industrial perimeter — it outlasts 11-gauge electro-galvanized by 15+ years in Fraser Valley rain.",
      "Abbotsford zoning allows fences up to 1.2 m in front yards and 1.8 m elsewhere. Anything taller needs a variance, and highway 1 frontage triggers additional MoTI setbacks.",
      "Budget $28–$45 per linear foot installed for standard 6-foot galvanized chain link; $55–$95 for 8-foot with privacy slats and cantilever gates.",
      "Cannabis LPs, agri-food processors, and Abbotsford Airport tenants are the highest-security perimeters we build — all require welded corner assemblies and access-controlled gates.",
      "Family-run since 2011. Call or text 604-758-0014 for a free on-site quote anywhere in Abbotsford.",
    ],
    body: [
      { type: "p", text: "Abbotsford is the biggest city in the Fraser Valley and the busiest commercial fencing market we serve. Between the industrial zones along Sumas Way and Riverside, the agri-food operations on Whatcom Road, the cannabis licensed producers on Bradner and Mt. Lehman, and the strata and retail work along South Fraser Way, an Abbotsford fencing crew is on a different job site every week. This guide is what we tell every property manager, GC, and business owner who asks what to actually spec for a chain link fence in Abbotsford — pulled straight from the jobs we quote and install." },
      { type: "p", text: "It covers the wire gauge and coating that survives Fraser Valley weather, the fence heights and permit rules the City of Abbotsford enforces, what commercial chain link fencing actually costs installed in 2026, the gate options we build in our shop, and the neighbourhoods we work in most. If you want the short version: 9-gauge hot-dip galvanized, 6 or 8 feet, welded terminal assemblies, and a cantilever slide gate for the vehicle entrance. Everything else in this post is the reasoning behind those choices." },

      { type: "h2", text: "Fencing conditions in Abbotsford" },
      { type: "p", text: "Abbotsford sits in a wet coastal climate zone that punishes cheap fencing. Annual rainfall averages 1,500 mm, freeze-thaw cycles are common between November and March, and the Sumas Prairie flood plain adds standing groundwater that eats fence posts from the bottom up. The soil profile ranges from Fraser silt loam in the flats to compacted glacial till on the hillsides in East Abbotsford. Both need proper post embedment — minimum 750 mm for line posts and 900 mm for terminal and gate posts, always concrete-set." },
      { type: "p", text: "What that means for your fence: an 11-gauge electro-galvanized chain link fence with driven posts might last 8–12 years in Abbotsford before rust bleeds through the mesh and the bottom rail sags. A properly-specified 9-gauge hot-dip galvanized fence on concrete-set posts routinely lasts 25–35 years with zero maintenance. The upfront cost difference is under 15%. The lifecycle cost difference is enormous." },

      { type: "h2", text: "What we build most in Abbotsford" },
      { type: "p", text: "Abbotsford's commercial fencing demand is unusually diverse for a Canadian city its size. In a typical month we're quoting all of the following:" },
      { type: "ul", items: [
        "Cannabis LP perimeters — 8-foot 9-gauge galvanized with barbed wire top and welded 30-foot cantilever slide gates for Health Canada physical security compliance.",
        "Agri-food processors along Riverside and Sumas Way — 6-foot galvanized with privacy slats where product visibility matters.",
        "Truck yards and logistics parks near Highway 1 exits 87 and 92 — 8-foot chain link with 24-foot double swing gates and heavy-duty industrial hinges.",
        "Retail and strata property perimeters along South Fraser Way and Marshall Road — black vinyl-coated chain link that disappears against landscaping.",
        "Abbotsford Airport tenant enclosures — spec-driven perimeters that meet Transport Canada aerodrome security standards.",
        "School and municipal sports fields — 10-foot galvanized backstops with top-rail construction.",
      ] },
      { type: "p", text: "Residential chain link work in Abbotsford is real but a smaller share of our book. When a homeowner in Central Abbotsford or Clearbrook calls, it's usually a 4-foot black vinyl-coated dog run at the back of the lot, or a 6-foot galvanized side yard behind a cedar privacy fence." },

      { type: "h2", text: "Permits and bylaws in Abbotsford" },
      { type: "p", text: "The City of Abbotsford regulates fence height, corner sight lines, and pool enclosure requirements under its Zoning Bylaw and Building Bylaw. The rules that come up most on our jobs:" },
      { type: "ul", items: [
        "Front yard fences: maximum 1.2 m (approximately 4 feet).",
        "Side and rear yard fences: maximum 1.8 m (approximately 6 feet).",
        "Industrial and commercial zones (I1–I4, C-series): fences up to 2.4 m (approximately 8 feet) are commonly permitted, with taller perimeters subject to a discretionary variance.",
        "Barbed wire and razor coil: permitted in industrial zones only, and only above 2 m in height.",
        "Pool enclosures: minimum 1.5 m with self-closing, self-latching gates — enforced under the BC Building Code and Abbotsford Building Bylaw.",
        "Corner lots: additional sight-triangle setbacks apply at intersections, typically 3 m x 3 m for fences over 1 m.",
      ] },
      { type: "p", text: "Fence permits are not required for most standard installations under the height limits, but any structural fence over 1.8 m, any pool enclosure, and any fence within a Ministry of Transportation right-of-way (parts of Highway 1, Highway 11, and Highway 7) will require permitting. We handle the paperwork for commercial clients when it's part of the scope." },

      { type: "h2", text: "Materials that hold up in Abbotsford" },
      { type: "p", text: "There are only two chain link mesh specifications worth considering for an Abbotsford commercial or industrial fence:" },
      { type: "h3", text: "9-gauge hot-dip galvanized after weaving (GAW)" },
      { type: "p", text: "This is the standard we specify by default for every commercial and industrial job. The wire is thicker (3.76 mm vs 3.05 mm for 11-gauge), and hot-dipping after the mesh is woven coats every crossover point — including the twisted top and bottom edges where 11-gauge tends to rust first. Expected lifespan in the Fraser Valley climate: 25–35 years." },
      { type: "h3", text: "9-gauge PVC-coated (black vinyl over galvanized core)" },
      { type: "p", text: "Same core wire, with a fusion-bonded PVC coating in black, green, or brown. Adds another 10–15 years to the effective life, drops the visual weight of the fence dramatically, and reads as almost invisible against landscaping. This is what we install on strata, retail, and higher-end commercial jobs where a fence has to secure the property without dominating the streetscape." },
      { type: "p", text: "What we do not install in Abbotsford: 11-gauge electro-galvanized mesh, aluminized coatings, or big-box store residential kits. The upfront savings never pay back over the fence's life in this climate." },

      { type: "h2", text: "Framework, posts, and rails" },
      { type: "p", text: "The mesh is only as good as what holds it up. Standard commercial spec for an Abbotsford chain link fence:" },
      { type: "ul", items: [
        "Line posts: 2-3/8\" O.D. schedule 40 galvanized pipe, spaced no more than 10 feet on centre.",
        "Terminal, corner, and gate posts: 3\" or 4\" O.D. schedule 40 galvanized pipe, sized for gate leaf weight.",
        "Top rail: 1-5/8\" O.D. galvanized pipe, continuous with pressed-steel loop caps.",
        "Tension wire at the bottom: 7-gauge coiled spring wire, secured with hog rings every 24\".",
        "Corner and terminal assemblies: welded in our shop, not tension-banded — welded assemblies do not loosen over time and are the industry standard for cannabis LP and airport-adjacent work.",
      ] },

      { type: "image", src: "/__l5e/assets-v1/2b9a8635-6b4c-46df-b729-f43837eb79c9/ornamental-storefront-gate-abbotsford.jpg", alt: "Powder-coated ornamental metal storefront gate installed on a commercial property in Abbotsford, BC by LS Fencing & Metal Work.", caption: "In-house welded ornamental storefront gate — Abbotsford commercial retail install.", focusKeyword: "commercial fence Abbotsford" },
      { type: "h2", text: "Gates we fabricate for Abbotsford commercial clients" },
      { type: "p", text: "Every gate on our jobs is welded in our Chilliwack shop, hot-dip galvanized, and delivered to the site ready to hang. We do not order pre-fab residential gates for commercial perimeters — the hinges fail and the frames rack within a few years of daily use." },
      { type: "ul", items: [
        "Single swing pedestrian gates — 4 to 6 feet wide, panic hardware for exit-only egress where required.",
        "Double swing vehicle gates — 16 to 24 feet clear opening, industrial ball-bearing hinges, drop rods at the centre.",
        "Cantilever slide gates — 20 to 60 feet, track-free at grade, ideal for snow country and uneven driveways. These are our most-requested vehicle gate in Abbotsford industrial zones.",
        "Automated operators — LiftMaster, HySecurity, and FAAC operators paired with keypad, card reader, LTE, or ANPR (licence plate) access control.",
        "Barrier gates and hand rails — municipal, strata, and light commercial applications where a full perimeter isn't required.",
      ] },

      { type: "h2", text: "What chain link fencing costs in Abbotsford (2026)" },
      { type: "p", text: "Every quote is site-specific — access, grade, existing removal, gate count, and permit requirements all move the number — but the following ranges cover most Abbotsford commercial and industrial jobs installed in 2026:" },
      { type: "ul", items: [
        "6-foot 9-gauge hot-dip galvanized, straight run, no gates: $28–$38 per linear foot installed.",
        "8-foot 9-gauge hot-dip galvanized, straight run, no gates: $38–$52 per linear foot installed.",
        "6-foot 9-gauge PVC-coated (black vinyl): add $6–$10 per linear foot over galvanized.",
        "Privacy slats or windscreen: add $4–$9 per linear foot depending on slat style.",
        "Barbed wire (3-strand): add $4–$7 per linear foot.",
        "Double swing vehicle gate, 20-foot opening, manual: $2,800–$4,200 installed.",
        "Cantilever slide gate, 30-foot opening, manual: $6,500–$11,000 installed.",
        "Cantilever slide gate, 30-foot opening, automated with keypad and safety loops: $14,000–$22,000 installed.",
      ] },
      { type: "p", text: "For a written quote based on your actual property, book a site visit — a five-minute walk-through gives us everything we need to price the job accurately. We do not quote sight-unseen off aerial imagery on commercial work; the details that move the price live at the site." },

      { type: "image", src: "/__l5e/assets-v1/2f7eb8fd-87ac-4852-8a6c-01597275ee9f/8x16-cantilever-slat-gate-abbotsford.jpg", alt: "8 by 16 foot galvanized chain link cantilever slide gate with privacy slats installed on an Abbotsford industrial site by LS Fencing & Metal Work.", caption: "8×16 galvanized chain link cantilever slide gate with privacy slats — Abbotsford industrial perimeter.", focusKeyword: "chain link fencing Abbotsford BC" },
      { type: "h2", text: "Neighbourhoods and industrial areas we work in most" },
      { type: "p", text: "Every neighbourhood in Abbotsford has its own fencing rhythm. What we install and why, by area:" },
      { type: "ul", items: [
        "Central Abbotsford and Clearbrook — mostly residential side and rear yards, strata common area re-fences, and school perimeters.",
        "West Abbotsford and Bradner — cannabis LP perimeters, agricultural exclusion fencing, and rural residential.",
        "East Abbotsford and Sandy Hill — hillside residential where post embedment on slope drives the spec, plus strata property work along McKee Road.",
        "Downtown Abbotsford and Mill Lake — retail and civic fencing along South Fraser Way, ornamental and black vinyl-coated chain link.",
        "Sumas Prairie and Whatcom Road corridor — agri-food processors and equipment yards where flood-plain post-setting is critical.",
        "Abbotsford Airport (YXX) — tenant enclosures and Transport Canada spec perimeters along Marshall Road and Riverside.",
        "Sumas Way industrial corridor and Riverside — trucking, logistics, and warehousing perimeters with cantilever slide gates.",
      ] },

      { type: "h2", text: "Frequently asked questions about chain link fencing in Abbotsford" },
      { type: "p", text: "The FAQ block below covers the questions we get every week from Abbotsford property managers and business owners. If your question isn't here, call or text 604-758-0014 — we're happy to walk through the specifics of your site." },

      { type: "quote", text: "In this climate the difference between a fence that lasts 10 years and one that lasts 30 comes down to two things — wire gauge and post embedment. Both cost less than most people expect. Both are worth insisting on." },

      { type: "p", text: "LS Fencing & Metal Work is a family-run Fraser Valley fencing contractor. We've been installing chain link fence and welding gates across Abbotsford, Chilliwack, and the Lower Mainland since 2011. Every quote is written by someone who will be on the job site the day the auger runs. Every gate is welded in our own shop. Call or text 604-758-0014 for a free on-site quote anywhere in Abbotsford." },
    ],
    faq: [
      {
        q: "How much does chain link fencing cost per foot in Abbotsford, BC?",
        a: "In 2026, standard 6-foot 9-gauge hot-dip galvanized chain link fencing runs $28–$38 per linear foot installed in Abbotsford. An 8-foot commercial or industrial specification runs $38–$52 per foot. Black PVC-coated adds $6–$10 per foot. Gates, privacy slats, barbed wire, and automation are quoted separately.",
      },
      {
        q: "What is the maximum fence height allowed in Abbotsford without a permit?",
        a: "The City of Abbotsford allows fences up to 1.2 m (about 4 feet) in front yards and 1.8 m (about 6 feet) in side and rear yards on residential lots without a permit. Commercial and industrial zones commonly allow up to 2.4 m (about 8 feet). Anything taller, plus barbed wire, pool enclosures, and fencing on highway frontage, requires additional approval.",
      },
      {
        q: "Do you install cannabis LP perimeter fencing in Abbotsford?",
        a: "Yes. LS Fencing & Metal Work builds Health Canada compliant perimeters for licensed cannabis producers throughout Abbotsford and the Fraser Valley — typically 8-foot 9-gauge hot-dip galvanized chain link with welded corner assemblies, three-strand barbed wire top, and automated cantilever slide gates with card or keypad access control.",
      },
      {
        q: "What wire gauge should I specify for a commercial chain link fence in Abbotsford?",
        a: "Specify 9-gauge hot-dip galvanized after weaving (GAW) for any commercial or industrial perimeter in Abbotsford. It costs under 15% more than 11-gauge electro-galvanized and lasts 15+ years longer in the Fraser Valley climate. 11-gauge is only appropriate for temporary construction fencing.",
      },
      {
        q: "How deep should chain link fence posts be set in Abbotsford soil?",
        a: "Minimum 750 mm for line posts and 900 mm for terminal, corner, and gate posts, always set in concrete. The Sumas Prairie flood plain and hillside sections of East Abbotsford require deeper embedment and larger footings — we assess this on the site visit and quote accordingly.",
      },
      {
        q: "Do you offer free on-site quotes in Abbotsford?",
        a: "Yes. Every Abbotsford quote starts with a free on-site walk-through so we can measure the perimeter, review grade and access conditions, spec gates and access control, and give you a written price. Call or text 604-758-0014 to book a site visit.",
      },
    ],
    internalLinks: [
      { to: "/chain-link-fencing", label: "Chain Link Fencing overview" },
      { to: "/commercial-chain-link-fencing", label: "Commercial Chain Link Fencing" },
      { to: "/barrier-gates", label: "Barrier Gates & Hand Rails" },
      { to: "/metal-gates", label: "Custom Metal Gates" },
      { to: "/welding-services", label: "In-house Welding & Fabrication" },
      { to: "/abbotsford-chain-link-fence-contractor", label: "Abbotsford Fence Contractor page" },
      { to: "/pricing", label: "Pricing Guide" },
      { to: "/contact", label: "Book a free on-site quote" },
    ],
    externalLinks: [
      { to: "https://www.abbotsford.ca/city-hall/bylaws", label: "City of Abbotsford bylaws (Zoning & Building)", external: true },
      { to: "https://www.abbotsford.ca/planning-and-development/building-permits", label: "City of Abbotsford building permits", external: true },
      { to: "https://www.bccodes.ca/", label: "BC Building Code (pool enclosure requirements)", external: true },
      { to: "https://www.worksafebc.com/", label: "WorkSafeBC — site safety and clearance", external: true },
    ],
  },
];

export const POSTS: BlogPost[] = [...buildCityPosts(), ...legacyPosts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/**
 * Dev-time guard: fail loudly if two blog posts share the same hero
 * image. Ensures each card on /blog renders a unique thumbnail.
 */
if (import.meta.env?.DEV) {
  const seen = new Map<string, string>();
  for (const p of POSTS) {
    const key = getPostImage(p);
    const other = seen.get(key);
    if (other) {
      // eslint-disable-next-line no-console
      console.error(
        `[blog] duplicate hero image "${key}" used by posts "${other}" and "${p.slug}". Assign a unique ogImage.`,
      );
    }
    seen.set(key, p.slug);
  }
}

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

/** Safe fallback used when a post's ogImage is missing or fails to load. */
export const DEFAULT_BLOG_IMAGE = "/og/blog-commercial-perimeter.jpg";

/** Returns the post's OG image or the shared fallback. */
export function getPostImage(post: Pick<BlogPost, "ogImage">): string {
  const src = post.ogImage?.trim();
  return src && src.length > 0 ? src : DEFAULT_BLOG_IMAGE;
}

/**
 * Descriptive alt text for hero / thumbnail images. Falls back to a
 * generated sentence using city + tags when no caption exists so screen
 * readers and image search both get something meaningful.
 */
export function getPostImageAlt(
  post: Pick<BlogPost, "ogImageCaption" | "title" | "cityName" | "region" | "tags">,
): string {
  if (post.ogImageCaption && post.ogImageCaption.trim().length > 0) {
    return post.ogImageCaption;
  }
  const where = post.cityName
    ? `${post.cityName}, BC`
    : post.region ?? "the Fraser Valley";
  const topic = post.tags?.[0]?.toLowerCase() ?? "fencing";
  return `${post.title} — ${topic} project photo from LS Fencing & Metal Work in ${where}.`;
}

