import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { DESTINATIONS } from "@/lib/packages";

// Importing assets
import southern from "@/assets/pkg-southern.jpg";
import hills from "@/assets/pkg-hills.jpg";
import cultural from "@/assets/pkg-cultural.jpg";
import hero from "@/assets/hero-sigiriya.jpg";
import colombo from "@/assets/colombo.png";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Sri Lanka Luxe Voyages" },
      { name: "description", content: "Explore the most breathtaking destinations in Sri Lanka." },
    ],
  }),
  component: DestinationsPage,
});

const DESTINATION_DETAILS = [
  {
    name: "Colombo",
    description: "The vibrant commercial capital, blending colonial charm with modern luxury and bustling street life.",
    image: colombo,
    region: "Western",
  },
  {
    name: "Kandy",
    description: "The cultural heart of the island, nestled among hills and home to the sacred Temple of the Tooth.",
    image: cultural,
    region: "Central",
  },
  {
    name: "Sigiriya",
    description: "An ancient rock fortress rising majestically from the plains, a wonder of history and engineering.",
    image: hero,
    region: "Central",
  },
  {
    name: "Ella",
    description: "A misty mountain retreat with breathtaking views, lush tea plantations, and epic hikes.",
    image: hills,
    region: "Hill Country",
  },
  {
    name: "Galle",
    description: "A historic coastal city famous for its Dutch Fort, boutique shops, and colonial architecture.",
    image: southern,
    region: "Southern",
  },
  {
    name: "Mirissa",
    description: "A tropical paradise known for whale watching, stunning sunsets, and laid-back beach vibes.",
    image: southern,
    region: "Southern",
  },
  {
    name: "Yala",
    description: "The premier wildlife park, famous for having one of the highest leopard densities in the world.",
    image: southern,
    region: "Southern",
  },
  {
    name: "Nuwara Eliya",
    description: "\"Little England\", a cool hill station with emerald tea estates and Victorian-era charm.",
    image: hills,
    region: "Hill Country",
  },
  {
    name: "Trincomalee",
    description: "A serene eastern coast gem with white sand beaches, deep harbors, and rich history.",
    image: southern,
    region: "Eastern",
  },
];

function DestinationsPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar solid={true} />
      <main className="flex-grow pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="eyebrow">Discover Sri Lanka</div>
            <h1 className="mt-3 font-display text-5xl md:text-6xl text-charcoal">
              Iconic <em className="text-gold-dark">Destinations</em>
            </h1>
            <p className="mt-4 text-grey-soft max-w-2xl mx-auto">
              Explore our curated selection of breathtaking locales across the island, from misty mountains to sun-drenched shores.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {DESTINATION_DETAILS.map((dest) => (
              <div key={dest.name} className="card-luxe overflow-hidden group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-charcoal text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                      {dest.region}
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-white flex flex-col h-full justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-charcoal mb-2 group-hover:text-gold-dark transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-grey-soft line-clamp-3">
                      {dest.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-beige flex justify-between items-center">
                    <span className="text-xs text-gold-dark font-medium uppercase tracking-wider">
                      Explore Journeys
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gold-dark transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
