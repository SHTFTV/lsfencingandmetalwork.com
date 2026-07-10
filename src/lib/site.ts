// Production custom domain. Used for absolute canonical / og:url / sitemap URLs.
export const BASE_URL = "https://lsfence.ca";

/** Build an absolute URL for canonical/og:url/sitemap entries. */
export const absoluteUrl = (path: string) =>
  `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE = {
  name: "LS Fencing & Metal Work",
  short: "LS Fencing",
  phone: "604-808-7496",
  phoneHref: "tel:+16048087496",
  email: "Lsfencingandmetalwork@gmail.com",
  emailHref: "mailto:Lsfencingandmetalwork@gmail.com",
  territory: "Fraser Valley & Lower Mainland, BC",
  tagline: "Chain link, ornamental, cedar, gates & custom metal work — built to last.",
  defaultOgImage: absoluteUrl("/og/blog-best-fencing-options.jpg"),
};

export const NAV_PRIMARY = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/pricing", label: "Pricing" },
  { to: "/testimonial", label: "Testimonials" },
  { to: "/blog", label: "Blog" },
  { to: "/career", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  { to: "/chain-link-fencing", label: "Chain Link Fencing" },
  { to: "/commercial-chain-link-fencing", label: "Commercial Chain Link" },
  { to: "/residential-chain-link-fencing", label: "Residential Chain Link" },
  { to: "/cedar-fencing", label: "Cedar Fencing" },
  { to: "/ornamental-fencing", label: "Ornamental Fencing" },
  { to: "/barrier-gates", label: "Barrier Gates & Hand Rails" },
  { to: "/metal-gates", label: "Metal Gates" },
  { to: "/welding-services", label: "Welding Services" },
  { to: "/excavation-services", label: "Excavation Services" },
  { to: "/snow-removal", label: "Snow Removal" },
] as const;

export const GEO_PAGES = [
  { to: "/chilliwack-chain-link-fence-company", label: "Chilliwack" },
  { to: "/abbotsford-chain-link-fence-contractor", label: "Abbotsford" },
] as const;

export const PROJECTS = [
  { to: "/projects/heatherbrae-builders-surrey", label: "Heatherbrae Builders — Surrey" },
  { to: "/projects/cooper-rentals-langley", label: "Cooper Rentals — Langley" },
  { to: "/projects/cantilever-gates-chilliwack", label: "Cantilever Gates — Chilliwack" },
  { to: "/projects/railing-installation-maple-ridge", label: "MMCD Railings — Maple Ridge" },
] as const;
