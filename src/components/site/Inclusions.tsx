import { Car, Hotel, Compass, Ticket } from "lucide-react";

const ITEMS = [
  { icon: Car, title: "Private Vehicle", desc: "Luxury air-conditioned vehicle, exclusively for your group with a professional chauffeur." },
  { icon: Hotel, title: "Curated Hotels", desc: "3 to 5-star properties hand-picked for character, location, and pure comfort." },
  { icon: Compass, title: "Expert Guide", desc: "Licensed, English-speaking cultural guides who reveal the stories behind every site." },
  { icon: Ticket, title: "Full Experience", desc: "Entry tickets, scheduled activities, and airport transfers — all included, all seamless." },
];

export function Inclusions() {
  return (
    <section className="bg-beige/55 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <div className="eyebrow">The Tour Buddy Standard</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal">
            Everything Considered. <em className="text-gold-dark">Nothing Forgotten.</em>
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <div
              key={it.title}
              className="text-center fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mx-auto h-16 w-16 rounded-full border border-gold/40 grid place-items-center bg-white shadow-card">
                <it.icon size={26} className="text-gold-dark" strokeWidth={1.4} />
              </div>
              <h3 className="font-display text-2xl mt-6 text-charcoal">{it.title}</h3>
              <p className="mt-3 text-sm text-grey-soft leading-relaxed max-w-xs mx-auto">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
