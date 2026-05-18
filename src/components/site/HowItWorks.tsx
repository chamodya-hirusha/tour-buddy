const STEPS = [
  { n: "01", title: "Browse", desc: "Explore curated journeys across every region of Sri Lanka." },
  { n: "02", title: "Book", desc: "Sign in with Google, pick your dates, and confirm in minutes." },
  { n: "03", title: "Pay", desc: "Secure checkout with instant confirmation and digital invoice." },
  { n: "04", title: "Journey", desc: "Your guide and driver meet you at the airport. The rest is yours." },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <div className="eyebrow">From Inspiration to Arrival</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-charcoal">
            How It <em className="text-gold-dark">Works</em>
          </h2>
        </div>

        <div className="relative grid gap-12 md:grid-cols-4">
          <div
            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-gold/50"
            aria-hidden
          />
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="text-center relative fade-up"
              style={{ animationDelay: `${i * 130}ms` }}
            >
              <div className="mx-auto h-16 w-16 rounded-full bg-white border border-gold/40 grid place-items-center shadow-card relative z-10">
                <span className="font-accent text-gold-dark text-sm">{s.n}</span>
              </div>
              <h3 className="font-display text-2xl mt-6 text-charcoal">{s.title}</h3>
              <p className="mt-2 text-sm text-grey-soft leading-relaxed max-w-[200px] mx-auto">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
