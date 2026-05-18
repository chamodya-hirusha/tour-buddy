import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "Every detail was anticipated. Our guide turned a simple temple visit into the most moving morning of our lives.",
    name: "Charlotte & James",
    place: "London 🇬🇧",
  },
  {
    quote:
      "The hotels were beyond what we expected, the driver became family, and Sri Lanka stole our hearts. Already booking again.",
    name: "Sofia Rinaldi",
    place: "Milan 🇮🇹",
  },
  {
    quote:
      "Bespoke truly means bespoke here. They redesigned our itinerary the night before to chase the elephants — magic.",
    name: "The Tanaka Family",
    place: "Tokyo 🇯🇵",
  },
];

export function Testimonials() {
  return (
    <section className="bg-beige/55 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <div className="eyebrow">From Our Travelers</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal">
            Stories <em className="text-gold-dark">Worth Telling</em>
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.name}
              className="card-luxe p-8 relative fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <Quote
                size={56}
                className="absolute -top-3 right-5 text-gold/15"
                strokeWidth={1}
              />
              <div className="flex gap-1 text-gold mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="font-display text-[19px] leading-relaxed text-charcoal italic">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-7 pt-5 border-t border-grey-line">
                <div className="text-sm font-medium text-charcoal">{r.name}</div>
                <div className="text-xs text-grey-soft mt-0.5">{r.place}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
