import type { Package } from "@/lib/packages";

const MOCK_PACKAGES: Package[] = [
  {
    id: "1",
    slug: "golden-triangle-classic",
    title: "Golden Triangle Classic",
    tagline: "Experience the cultural heart of Sri Lanka",
    description: "A journey through the ancient cities and cultural wonders of Sri Lanka, including Sigiriya and Kandy.",
    destinations: ["Sigiriya", "Kandy", "Dambulla"],
    duration_days: 7,
    price_usd: 1250,
    max_travelers: 8,
    hotel_stars: 4,
    highlights: ["Climb Sigiriya Rock Fortress", "Visit the Temple of the Tooth", "Explore Dambulla Cave Temple"],
    itinerary: [
      { day: 1, title: "Arrival & Transfer to Sigiriya", activities: ["Airport pickup", "Check-in to Sigiriya hotel", "Evening at leisure"] },
      { day: 2, title: "Sigiriya Rock Fortress", activities: ["Morning climb to Sigiriya", "Village tour", "Traditional lunch"] },
    ],
    inclusions: ["4-star accommodation", "Private vehicle with driver/guide", "All entrance fees"],
    exclusions: ["International flights", "Personal expenses"],
    hero_image_url: null,
    is_featured: true,
  },
  {
    id: "2",
    slug: "southern-shores-escape",
    title: "Southern Shores Escape",
    tagline: "Relax on the pristine beaches of the south",
    description: "A relaxing getaway to the beautiful southern coast, featuring Galle and whale watching in Mirissa.",
    destinations: ["Galle", "Mirissa", "Unawatuna"],
    duration_days: 5,
    price_usd: 950,
    max_travelers: 6,
    hotel_stars: 5,
    highlights: ["Whale watching in Mirissa", "Explore historic Galle Fort", "Relax on Unawatuna beach"],
    itinerary: [
      { day: 1, title: "Transfer to Galle", activities: ["Drive to Galle", "Check-in to boutique hotel", "Explore Galle Fort at sunset"] },
    ],
    inclusions: ["5-star boutique accommodation", "Private vehicle", "Whale watching tour"],
    exclusions: ["Lunches and dinners"],
    hero_image_url: null,
    is_featured: true,
  },
  {
    id: "3",
    slug: "hill-country-retreat",
    title: "Hill Country Retreat",
    tagline: "Misty mountains and lush tea plantations",
    description: "Escape to the cool hills of Nuwara Eliya and Ella, surrounded by emerald tea estates.",
    destinations: ["Nuwara Eliya", "Ella"],
    duration_days: 6,
    price_usd: 1100,
    max_travelers: 6,
    hotel_stars: 4,
    highlights: ["Scenic train ride to Ella", "Visit a tea factory", "Hike Little Adam's Peak"],
    itinerary: [
      { day: 1, title: "Transfer to Nuwara Eliya", activities: ["Scenic drive to Nuwara Eliya", "Tea factory visit"] },
    ],
    inclusions: ["4-star accommodation", "Train tickets", "Private vehicle"],
    exclusions: ["Guide tips"],
    hero_image_url: null,
    is_featured: false,
  },
];

export async function fetchPackages(): Promise<Package[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_PACKAGES;
}

export async function fetchPackageBySlug(slug: string): Promise<Package | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_PACKAGES.find(p => p.slug === slug) ?? null;
}
