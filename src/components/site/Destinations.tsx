import Image from "next/image";
import Link from "next/link";
import southern from "@/assets/pkg-southern.jpg";
import hills from "@/assets/pkg-hills.jpg";
import cultural from "@/assets/pkg-cultural.jpg";
import hero from "@/assets/hero-sigiriya.jpg";
import type { StaticImageData } from "next/image";

const DESTINATIONS: { name: string; region: string; img: StaticImageData; href: string }[] = [
  { name: "Sigiriya", region: "Ancient North", img: hero, href: "/destinations" },
  { name: "Mirissa", region: "Southern Coast", img: southern, href: "/destinations" },
  { name: "Ella", region: "Hill Country", img: hills, href: "/destinations" },
  { name: "Kandy", region: "Cultural Heart", img: cultural, href: "/destinations" },
  { name: "Galle", region: "Colonial Port", img: southern, href: "/destinations" },
  { name: "Yala", region: "Wild South", img: hills, href: "/destinations" },
  { name: "Nuwara Eliya", region: "Tea Country", img: hills, href: "/destinations" },
  { name: "Trincomalee", region: "East Coast", img: southern, href: "/destinations" },
];

export function Destinations() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-12 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="eyebrow">Wander Wide</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-charcoal">
            Iconic <em className="text-gold-dark">Destinations</em>
          </h2>
        </div>
        <p className="text-grey-soft max-w-md text-sm">
          From mist-cloaked highlands to ancient royal cities and pristine
          southern coves — choose where the journey begins.
        </p>
      </div>

      <div className="relative">
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2))] pb-6 scrollbar-hide">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.name}
              href={d.href}
              style={{ position: 'relative', height: '400px', width: '280px' }}
              className="snap-start shrink-0 rounded-2xl overflow-hidden group cursor-pointer ring-1 ring-grey-line block"
            >
              <Image
                src={d.img}
                alt={d.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="eyebrow !text-gold-light !text-[10px]">{d.region}</div>
                <h3 className="font-display text-3xl mt-1">{d.name}</h3>
              </div>
              <div className="absolute inset-0 ring-0 ring-gold/0 group-hover:ring-2 group-hover:ring-gold/60 rounded-2xl transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
