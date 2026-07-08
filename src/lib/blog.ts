export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMinutes: number;
  tags: string[];
  /** Absolute path (from /public) to the OpenGraph image, e.g. /og/foo.jpg */
  ogImage: string;
  /** Structured body rendered by <BlogArticle /> */
  body: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "quote"; text: string }
  >;
}

export const POSTS: BlogPost[] = [
  {
    slug: "best-fencing-options-and-their-qualities",
    title: "The Best Fencing Options and Their Qualities",
    description:
      "A working contractor's rundown of the four fencing materials that actually earn their keep in BC weather — chain link, cedar, ornamental steel, and vinyl.",
    date: "2016-06-07",
    readMinutes: 6,
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
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
