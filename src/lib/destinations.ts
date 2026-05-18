import type { StaticImageData } from "next/image";
import southern from "@/assets/pkg-southern.jpg";
import hills from "@/assets/pkg-hills.jpg";
import cultural from "@/assets/pkg-cultural.jpg";
import hero from "@/assets/hero-sigiriya.jpg";
import colombo from "@/assets/colombo.png";

export type DestinationDetail = {
  name: string;
  description: string;
  image: StaticImageData;
  region: string;
  highlights: string[];
  bestTime: string;
  searchSlug: string;
};

export const DESTINATION_DETAILS: DestinationDetail[] = [
  {
    name: "Colombo",
    description:
      "The vibrant commercial capital, blending colonial charm with modern luxury, buzzing street food, and world-class hotels.",
    image: colombo,
    region: "Western",
    highlights: ["Galle Face Green", "Pettah Market", "National Museum", "Colombo 7 Fine Dining"],
    bestTime: "Dec – Apr",
    searchSlug: "Colombo",
  },
  {
    name: "Kandy",
    description:
      "The cultural heart of the island, nestled among emerald hills and home to the sacred Temple of the Tooth Relic.",
    image: cultural,
    region: "Central",
    highlights: ["Temple of the Tooth", "Peradeniya Gardens", "Kandyan Dance", "Spice Gardens"],
    bestTime: "Jan – Apr",
    searchSlug: "Kandy",
  },
  {
    name: "Sigiriya",
    description:
      "An ancient rock fortress rising majestically from the jungle plains — a breathtaking wonder of history and engineering.",
    image: hero,
    region: "North Central",
    highlights: ["Lion Rock Summit", "Frescoes Gallery", "Water Gardens", "Pidurangala Rock"],
    bestTime: "May – Sep",
    searchSlug: "Sigiriya",
  },
  {
    name: "Ella",
    description:
      "A misty mountain retreat surrounded by lush tea plantations, epic waterfalls, and the iconic Nine Arches Bridge.",
    image: hills,
    region: "Hill Country",
    highlights: ["Nine Arches Bridge", "Little Adam's Peak", "Ravana Falls", "Tea Factory Tours"],
    bestTime: "Jan – Mar",
    searchSlug: "Ella",
  },
  {
    name: "Galle",
    description:
      "A UNESCO-listed coastal city famous for its 17th-century Dutch Fort, boutique galleries, and artisan markets.",
    image: southern,
    region: "Southern",
    highlights: ["Dutch Fort", "Lighthouse Beach", "Boutique Stays", "Jungle Beach"],
    bestTime: "Nov – Apr",
    searchSlug: "Galle",
  },
  {
    name: "Mirissa",
    description:
      "A tropical paradise known for blue whale watching, pristine surf breaks, and spectacular crimson sunsets.",
    image: southern,
    region: "Southern",
    highlights: ["Whale Watching", "Parrot Rock", "Mirissa Beach", "Coconut Tree Hill"],
    bestTime: "Nov – Apr",
    searchSlug: "Mirissa",
  },
  {
    name: "Yala",
    description:
      "The premier wildlife sanctuary, boasting one of the highest leopard densities on earth and spectacular birdlife.",
    image: hills,
    region: "Southern",
    highlights: ["Leopard Safaris", "Elephant Herds", "Crocodile Lagoons", "Sunrise Game Drives"],
    bestTime: "Feb – Jul",
    searchSlug: "Yala",
  },
  {
    name: "Nuwara Eliya",
    description:
      "\"Little England\" — a cool hill station with emerald tea estates, Tudor-style clubs, and Victorian-era charm.",
    image: hills,
    region: "Hill Country",
    highlights: ["Tea Plucking", "Gregory Lake", "Horton Plains", "Colonial Bungalows"],
    bestTime: "Mar – May",
    searchSlug: "Nuwara Eliya",
  },
  {
    name: "Trincomalee",
    description:
      "A serene eastern-coast gem with crystal-clear waters, historic temples, and some of the finest diving in Asia.",
    image: southern,
    region: "Eastern",
    highlights: ["Pigeon Island", "Nilaveli Beach", "Fort Frederick", "Hot Springs"],
    bestTime: "May – Sep",
    searchSlug: "Trincomalee",
  },
];
