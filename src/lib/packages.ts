import southern from "@/assets/pkg-southern.jpg";
import hills from "@/assets/pkg-hills.jpg";
import cultural from "@/assets/pkg-cultural.jpg";
import hero from "@/assets/hero-sigiriya.jpg";

// Map seeded slugs to bundled assets
export const PACKAGE_IMAGES: Record<string, typeof hero> = {
  "golden-triangle-classic": cultural,
  "southern-shores-escape": southern,
  "hill-country-retreat": hills,
  "complete-sri-lanka": hero,
  "wildlife-beach-safari": southern,
  "cultural-heritage-tour": cultural,
};

export const packageImage = (slug: string) =>
  PACKAGE_IMAGES[slug] ?? hero;

export type ItineraryDay = {
  day: number;
  title: string;
  activities: string[];
};

export type Package = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  destinations: string[];
  duration_days: number;
  price_usd: number;
  max_travelers: number;
  hotel_stars: number;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  hero_image_url: string | null;
  is_featured: boolean;
};

export const DESTINATIONS = [
  "Any region",
  "Colombo",
  "Kandy",
  "Sigiriya",
  "Ella",
  "Galle",
  "Mirissa",
  "Yala",
  "Nuwara Eliya",
  "Trincomalee",
] as const;
