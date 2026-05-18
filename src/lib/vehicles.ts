import sedan from "@/assets/vehicle-sedan.png";
import suv from "@/assets/vehicle-suv.png";
import van from "@/assets/vehicle-van.png";
import { StaticImageData } from "next/image";

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  image: StaticImageData;
  capacity: number;
  luggage: number;
  features: string[];
  price_per_day: number;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "1",
    slug: "luxury-sedan",
    name: "Luxury Sedan",
    type: "Sedan",
    description: "Premium comfort for small groups or business travel. Experience the ultimate smooth ride.",
    image: sedan,
    capacity: 3,
    luggage: 2,
    features: ["Air Conditioning", "Leather Seats", "Free Wi-Fi", "Bottled Water"],
    price_per_day: 150,
  },
  {
    id: "2",
    slug: "premium-suv",
    name: "Premium SUV",
    type: "SUV",
    description: "Perfect for family trips and rough terrains. Combine luxury with power.",
    image: suv,
    capacity: 4,
    luggage: 4,
    features: ["4WD", "Panoramic Sunroof", "Premium Sound System", "Spacious Interior"],
    price_per_day: 200,
  },
  {
    id: "3",
    slug: "luxury-van",
    name: "Luxury Van",
    type: "Van",
    description: "Ideal for larger groups or families. Travel together without compromising on comfort.",
    image: van,
    capacity: 7,
    luggage: 6,
    features: ["Captain Seats", "Entertainment System", "Dual AC", "Extra Legroom"],
    price_per_day: 250,
  },
];

export const getVehicleBySlug = (slug: string) => 
  VEHICLES.find((v) => v.slug === slug);
