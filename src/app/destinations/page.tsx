import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import type { StaticImageData } from "next/image";

// Assets
import southern from "@/assets/pkg-southern.jpg";
import hills from "@/assets/pkg-hills.jpg";
import cultural from "@/assets/pkg-cultural.jpg";
import hero from "@/assets/hero-sigiriya.jpg";
import colombo from "@/assets/colombo.png";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations — Tour Buddy Sri Lanka",
  description:
    "Explore the most breathtaking destinations in Sri Lanka — from ancient rock fortresses to pristine southern beaches.",
};

type DestinationDetail = {
  name: string;
  description: string;
  image: StaticImageData;
  region: string;
  highlights: string[];
  bestTime: string;
  searchSlug: string;
};

const DESTINATION_DETAILS: DestinationDetail[] = [
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

const REGIONS = ["All", "Western", "Central", "North Central", "Hill Country", "Southern", "Eastern"];

export default function DestinationsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar solid />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(212,175,55,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(67,107,76,0.3) 0%, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="eyebrow !text-gold-light mb-3">Discover Sri Lanka</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-light">
            Iconic <em className="text-gold">Destinations</em>
          </h1>
          <p className="mt-5 text-white/60 max-w-2xl mx-auto leading-relaxed">
            From mist-cloaked highlands to ancient royal cities and pristine southern coves —
            every corner of the island holds a new story.
          </p>
          <div className="mt-6 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Quick stat pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["9 Destinations", "UNESCO Heritage Sites", "2,500km of Coastline", "Year-Round Travel"].map((s) => (
              <span key={s} className="text-xs text-white/70 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-16">

        {/* Destination Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {DESTINATION_DETAILS.map((dest, i) => (
            <article
              key={dest.name}
              className="card-luxe overflow-hidden group fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "240px" }} className="overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />

                {/* Region badge */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {dest.region}
                </span>

                {/* Best time badge */}
                <span className="absolute top-4 right-4 bg-gold/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold px-3 py-1 rounded-full">
                  Best: {dest.bestTime}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-display text-2xl text-charcoal group-hover:text-gold-dark transition-colors">
                  {dest.name}
                </h2>
                <p className="mt-2 text-sm text-grey-soft leading-relaxed line-clamp-2">
                  {dest.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {dest.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="text-[10px] uppercase tracking-wide font-medium text-forest bg-forest/8 px-2 py-0.5 rounded">
                      {h}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5 pt-4 border-t border-grey-line flex items-center justify-between">
                  <span className="text-xs text-grey-soft">
                    {dest.highlights.length} highlights
                  </span>
                  <Link
                    href={`/packages?destination=${encodeURIComponent(dest.searchSlug)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark border-b border-gold/40 pb-0.5 hover:gap-2.5 transition-all"
                  >
                    View Packages <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 rounded-2xl bg-charcoal p-10 md:p-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.6) 0%, transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="eyebrow !text-gold mb-3">Ready to Explore?</div>
            <h2 className="font-display text-4xl md:text-5xl text-white font-light">
              Let Us Plan Your <em className="text-gold">Perfect Journey</em>
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
              Our travel experts will craft a bespoke itinerary connecting your favourite destinations
              with private transport and handpicked hotels.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/packages" className="btn-gold">
                Browse All Packages <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="btn-ghost-light">
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
