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
    slug: "aluminum-vs-ornamental-steel-fencing",
    title: "Aluminum vs Ornamental Steel Fencing in the Fraser Valley",
    description:
      "Aluminum vs ornamental steel fencing for Chilliwack, Abbotsford, and Metro Vancouver — cost, durability, maintenance, and which one actually holds up in Fraser Valley weather.",
    date: "2026-07-10",
    readMinutes: 7,
    ogImage: "/og/blog-aluminum-vs-ornamental-steel.jpg",
    ogImageCaption:
      "Aluminum picket fence next to a powder-coated ornamental steel fence in a Fraser Valley yard.",
    tags: ["Comparison", "Ornamental", "Aluminum"],
    keyTakeaways: [
      "Aluminum is lighter, cheaper up-front, and never rusts — the low-maintenance pick.",
      "Ornamental steel is heavier, stronger, and takes hard impact without bending.",
      "In the wet Fraser Valley climate, powder-coated steel and aluminum both last 25+ years when installed properly.",
      "For security or driveway gates, spec steel. For pool enclosures, front yards, and pet fencing, aluminum wins on cost and weight.",
    ],
    body: [
      { type: "p", text: "Nine out of ten homeowners in Chilliwack and Abbotsford asking about a decorative metal fence are choosing between two materials: pressed aluminum and powder-coated ornamental steel. They look similar from the street. They perform very differently once you factor in cost, weight, security, and how they age in the Fraser Valley climate." },
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

export const POSTS: BlogPost[] = [...buildCityPosts(), ...legacyPosts];

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

