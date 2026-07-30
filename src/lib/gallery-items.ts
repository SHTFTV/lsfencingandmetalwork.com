import img4ftGalv from "@/assets/gallery/4ft-galv-residential.jpeg.asset.json";
import img6ftBarb from "@/assets/gallery/6ft-galv-barb-abbotsford.jpeg.asset.json";
import img8ftSecurity from "@/assets/gallery/8ft-galv-commercial-security.jpeg.asset.json";
import imgBlackSchool from "@/assets/gallery/black-vinyl-school-surrey.png.asset.json";
import imgHandrail from "@/assets/gallery/galvanized-handrail-driveway.jpeg.asset.json";
import imgOrnamental from "@/assets/gallery/ornamental-powdercoat-chilliwack.jpeg.asset.json";
import imgExcavation from "@/assets/gallery/excavation-post-drilling.jpeg.asset.json";
import imgBlackPlayground from "@/assets/gallery/black-chainlink-playground.jpeg.asset.json";
import imgPerimeterBarb from "@/assets/gallery/galv-perimeter-barbwire.jpeg.asset.json";
import imgCommercialGate from "@/assets/gallery/commercial-double-swing-gate.jpeg.asset.json";
import imgBaseballBackstop from "@/assets/gallery/baseball-backstop-fraser-valley.jpeg.asset.json";
import imgHighSecurityFarm from "@/assets/gallery/high-security-cantilever-gate-farm.jpeg.asset.json";
import imgCooperRentals from "@/assets/gallery/cooper-rentals-cantilever-langley.png.asset.json";
import imgUtilityEnclosure from "@/assets/gallery/utility-equipment-enclosure.jpeg.asset.json";
import imgTruckSkidsteer from "@/assets/gallery/ls-fencing-truck-skidsteer.jpeg.asset.json";
import imgCustomCedar from "@/assets/gallery/custom-cedar-horizontal-slat.jpg.asset.json";
import imgShopWelding from "@/assets/gallery/shop-welding-kubota-fabrication.jpg.asset.json";
import imgBlackSlatMapleRidge from "@/assets/gallery/black-privacy-slat-chainlink-maple-ridge.jpg.asset.json";
import imgOrnamentalStorefront from "@/assets/gallery/ornamental-storefront-gate-abbotsford.jpg.asset.json";
import imgKubotaExcavator from "@/assets/gallery/kubota-kx033-excavator-post-line.jpg.asset.json";
import imgBlackHillside from "@/assets/gallery/black-chainlink-hillside-chilliwack.jpg.asset.json";
import imgCantileverSlatGate from "@/assets/gallery/8x16-cantilever-slat-gate-abbotsford.jpg.asset.json";
import imgOrnamentalIronGreenhouse from "@/assets/gallery/ornamental-iron-gate-greenhouse-abbotsford.jpg.asset.json";
import imgBarbTrailAbbotsford from "@/assets/gallery/6ft-galv-barb-trail-abbotsford.jpg.asset.json";
import imgCedarLatticeTop from "@/assets/gallery/6ft-cedar-lattice-top-privacy-fence.jpg.asset.json";
import imgBlackSportsField from "@/assets/gallery/black-chainlink-sports-field-perimeter.png.asset.json";
import imgSportsFacilityRailing from "@/assets/gallery/black-chainlink-railing-sports-facility-langley.png.asset.json";
import imgRecCourt from "@/assets/gallery/galvanized-chainlink-recreational-court-gate.jpg.asset.json";
import imgIndustrialPerimeter from "@/assets/gallery/industrial-perimeter-security-chainlink-langley.png.asset.json";
import imgStrataCompound from "@/assets/gallery/strata-parking-gate-security-fencing-abbotsford.jpg.asset.json";

export type GalleryCategory =
  | "Chain Link"
  | "Cedar"
  | "Ornamental"
  | "Gates"
  | "Welding"
  | "Excavation";

export type GalleryItem = {
  title: string;
  location: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  /** Short outcome/spec line shown under the title in case-study cards. */
  outcome?: string;
};

export const CATEGORIES = [
  "All",
  "Chain Link",
  "Cedar",
  "Ornamental",
  "Gates",
  "Welding",
  "Excavation",
] as const;

// Map a gallery category to the matching value in the contact form's SERVICE_OPTIONS
// so the CTA can pre-select it via ?service=…
export const CATEGORY_TO_SERVICE: Record<string, string> = {
  "Chain Link": "Chain Link Fencing",
  "Cedar": "Cedar Fencing",
  "Ornamental": "Ornamental Fencing",
  "Gates": "Metal / Driveway Gate",
  "Welding": "Welding / Repair",
  "Excavation": "Excavation",
};

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function quoteHrefFor(item: GalleryItem, source = "gallery-lightbox") {
  const service = CATEGORY_TO_SERVICE[item.category];
  const params = new URLSearchParams({
    source,
    photo: slugify(item.title),
  });
  if (service) params.set("service", service);
  return `/contact?${params.toString()}`;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { title: "Black vinyl-coated school perimeter", location: "Surrey, BC", category: "Chain Link", src: imgBlackSchool.url, alt: "Completed black vinyl-coated chain link perimeter fence at a school in Surrey BC", outcome: "6ft black vinyl chain link · school perimeter" },
  { title: "10-ft galvanized security fence with barb", location: "Vancouver, BC", category: "Chain Link", src: imgPerimeterBarb.url, alt: "Tall galvanized chain link perimeter fence with three-strand barbed wire", outcome: "10ft galvanized · 3-strand barb topping" },
  { title: "8-ft galvanized enclosure with roof", location: "Fraser Valley, BC", category: "Chain Link", src: img8ftSecurity.url, alt: "Tall galvanized chain link commercial security enclosure with covered top", outcome: "8ft galvanized · covered enclosure" },
  { title: "Heavy-duty ball field backstop", location: "Fraser Valley, BC", category: "Chain Link", src: imgBaseballBackstop.url, alt: "Tall galvanized chain link baseball backstop with overhang and cedar kickboard next to bleachers", outcome: "Backstop with overhang · cedar kickboard" },
  { title: "6-ft galvanized with 3-strand barb wire", location: "Abbotsford, BC", category: "Chain Link", src: img6ftBarb.url, alt: "6-foot galvanized chain link fence with three-strand barbed wire in Abbotsford", outcome: "6ft galvanized · 3-strand barb" },
  { title: "Black chain link playground enclosure", location: "Chilliwack, BC", category: "Chain Link", src: imgBlackPlayground.url, alt: "Black vinyl-coated chain link fence enclosing a raised playground area", outcome: "Vinyl-coated · playground enclosure" },
  { title: "4-ft residential galvanized run", location: "Fraser Valley, BC", category: "Chain Link", src: img4ftGalv.url, alt: "4-foot galvanized chain link residential yard fence with top rail", outcome: "4ft residential · top-rail" },
  { title: "Utility equipment security enclosure", location: "Fraser Valley, BC", category: "Chain Link", src: imgUtilityEnclosure.url, alt: "Galvanized chain link security cage protecting utility equipment on a concrete pad", outcome: "Utility cage on concrete pad" },
  { title: "Black chain link on hillside acreage", location: "Chilliwack, BC", category: "Chain Link", src: imgBlackHillside.url, alt: "Black vinyl-coated chain link fence installed along a rock-wall hillside acreage with Chilliwack mountain views", outcome: "Rock-wall hillside · racked to grade" },
  { title: "Black privacy-slat chain link screen", location: "Maple Ridge, BC", category: "Chain Link", src: imgBlackSlatMapleRidge.url, alt: "6-foot black vinyl-coated chain link fence with full-height privacy slats screening an apartment complex in Maple Ridge", outcome: "6ft vinyl-coated · full privacy slats" },
  { title: "6-ft galvanized with barb along treed lot line", location: "Abbotsford, BC", category: "Chain Link", src: imgBarbTrailAbbotsford.url, alt: "6-foot galvanized chain link fence with three-strand barbed wire running along a narrow treed property line in Abbotsford BC", outcome: "6ft galvanized · barb top · tight treed line" },
  { title: "Black chain link sports field perimeter", location: "Langley, BC", category: "Chain Link", src: imgBlackSportsField.url, alt: "Black vinyl-coated chain link perimeter fence with privacy screening around a turf sports field beside a concrete walkway in Langley BC", outcome: "Black vinyl-coated · turf field perimeter" },
  { title: "Sports facility chain link & pipe railing", location: "Langley, BC", category: "Chain Link", src: imgSportsFacilityRailing.url, alt: "Black chain link fence with galvanized pipe top railing lining a concrete walkway at a government sports facility in Langley BC", outcome: "Chain link + pipe railing · public facility" },
  { title: "Galvanized recreational court perimeter & walk-through gate", location: "Langley, BC", category: "Chain Link", src: imgRecCourt.url, alt: "Galvanized commercial-grade chain link perimeter fence with a walk-through gate around a private basketball court in the Fraser Valley", outcome: "Commercial-grade galvanized · self-latching walk gate" },
  { title: "Strata waste enclosure with cantilever sliding gate", location: "Abbotsford, BC", category: "Chain Link", src: imgStrataCompound.url, alt: "Galvanized chain link strata waste and compactor enclosure with three-strand barbed wire topping and a cantilever sliding gate in Abbotsford BC", outcome: "Galvanized chain link · barbed wire top · cantilever slide gate" },
  { title: "Industrial perimeter security fence with barb wire", location: "Langley, BC", category: "Chain Link", src: imgIndustrialPerimeter.url, alt: "Heavy-gauge galvanized chain link industrial perimeter security fence with three-strand barbed wire topping around a commercial building and fleet parking lot in Langley BC", outcome: "Heavy-gauge galvanized · 3-strand barb · industrial perimeter" },
  { title: "6-ft cedar privacy fence with lattice top", location: "Fraser Valley, BC", category: "Cedar", src: imgCedarLatticeTop.url, alt: "Six-foot western red cedar privacy fence with lattice-top panels stepped along a sloped new-construction property line in the Fraser Valley", outcome: "6ft cedar · lattice top · stepped to grade" },
  { title: "Commercial double-swing chain link gate", location: "Abbotsford, BC", category: "Gates", src: imgCommercialGate.url, alt: "Commercial grade galvanized chain link double swing driveway gate with barrier arms", outcome: "Double swing · barrier arm ready" },
  { title: "Cooper Rentals double cantilever gate", location: "Langley, BC", category: "Gates", src: imgCooperRentals.url, alt: "Custom galvanized double cantilever chain link gate installed for Cooper Rentals in Langley BC", outcome: "Double cantilever · rental yard" },
  { title: "High-security farm cantilever gate", location: "Fraser Valley, BC", category: "Gates", src: imgHighSecurityFarm.url, alt: "Galvanized cantilever driveway gate securing an industrial farm yard with mountain backdrop", outcome: "Cantilever · industrial farm yard" },
  { title: "8×16 cantilever slat gate", location: "Abbotsford, BC", category: "Gates", src: imgCantileverSlatGate.url, alt: "8-foot by 16-foot galvanized cantilever slide gate with grey privacy slats securing an Abbotsford industrial yard", outcome: "8×16 cantilever · privacy slats" },
  { title: "Ornamental iron gate & fence at greenhouse operation", location: "Abbotsford, BC", category: "Ornamental", src: imgOrnamentalIronGreenhouse.url, alt: "Black ornamental iron swing gate with spear-top pickets and matching perimeter fence securing a commercial greenhouse operation in Abbotsford BC", outcome: "Spear-top ornamental iron · greenhouse perimeter & swing gate" },
  { title: "Powder-coated ornamental steel", location: "Chilliwack, BC", category: "Ornamental", src: imgOrnamental.url, alt: "Black powder-coated ornamental steel fence panels next to a stone column", outcome: "Powder-coated · stone-column tie-in" },
  { title: "Ornamental storefront fence & swing gate", location: "Abbotsford, BC", category: "Ornamental", src: imgOrnamentalStorefront.url, alt: "Black powder-coated ornamental steel storefront fence with matching pedestrian swing gate outside an Abbotsford commercial building", outcome: "Storefront ornamental · pedestrian gate" },
  { title: "MMCD-spec galvanized handrail", location: "Maple Ridge, BC", category: "Welding", src: imgHandrail.url, alt: "Galvanized pipe MMCD-spec handrail installed along an accessible ramp", outcome: "MMCD spec · accessible ramp rail" },
  { title: "In-shop welding & Kubota attachment fabrication", location: "Chilliwack, BC", category: "Welding", src: imgShopWelding.url, alt: "LS Fencing welder MIG welding a custom steel attachment on the arm of an orange Kubota skid steer inside the fabrication shop", outcome: "In-house fabrication · skid steer attachment" },
  { title: "Post-hole drilling with skid steer", location: "Fraser Valley, BC", category: "Excavation", src: imgExcavation.url, alt: "Kubota skid steer with hydraulic auger drilling fence post holes on a commercial lot", outcome: "Hydraulic auger · commercial lot" },
  { title: "Kubota KX033 mini excavator on post line", location: "Fraser Valley, BC", category: "Excavation", src: imgKubotaExcavator.url, alt: "Operator running an orange Kubota KX033-4 mini excavator digging a fence post line in a rural pasture", outcome: "Mini excavator · post-line dig" },
  { title: "LS crew truck & Kubota skid steer", location: "Chilliwack, BC", category: "Excavation", src: imgTruckSkidsteer.url, alt: "LS Fencing service truck loaded with fence pipe towing a trailer with a Kubota skid steer in Chilliwack", outcome: "Mobile crew · skid steer trailer" },
  { title: "Custom cedar horizontal-slat privacy fence", location: "Fraser Valley, BC", category: "Cedar", src: imgCustomCedar.url, alt: "Custom-built cedar privacy fence with horizontal slats and vertical posts running along a stone-paver garden path", outcome: "Custom cedar · horizontal slats" },
];

export function itemsByCategory(category: GalleryCategory | GalleryCategory[]): GalleryItem[] {
  const cats = Array.isArray(category) ? category : [category];
  return GALLERY_ITEMS.filter((i) => cats.includes(i.category));
}
