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

