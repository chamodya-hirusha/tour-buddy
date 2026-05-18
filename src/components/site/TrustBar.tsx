const STATS = [
  { number: "500+", label: "Happy Travelers" },
  { number: "12+", label: "Curated Routes" },
  { number: "5★", label: "Rated Service" },
  { number: "100%", label: "Licensed Guides" },
];

export function TrustBar() {
  return (
    <section className="bg-beige/60 border-y border-grey-line">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center text-center ${
              i < 3 ? "md:border-r md:border-grey-line" : ""
            } ${i % 2 === 0 ? "border-r border-grey-line md:border-r" : ""}`}
          >
            <span className="text-gold text-base mb-2">✦</span>
            <div className="font-display text-3xl text-charcoal">{s.number}</div>
            <div className="eyebrow mt-1.5 !text-[10px]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
