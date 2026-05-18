import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #F0DC82 0, transparent 40%), radial-gradient(circle at 80% 80%, #F0DC82 0, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-24 lg:py-32 text-center">
        <div className="eyebrow !text-gold-light">Your Story Awaits</div>
        <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl italic font-light text-balance">
          Ready to Experience <br className="hidden md:block" />
          <span className="text-gold-light">Sri Lanka?</span>
        </h2>
        <p className="mt-6 text-white/75 max-w-xl mx-auto">
          Talk to a Tour Buddy planner — bespoke itineraries, real humans,
          replies within the hour.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button className="btn-gold">
            Start Planning Your Trip <ArrowRight size={16} />
          </button>
          <button className="btn-ghost-light">View All Packages</button>
        </div>
      </div>
    </section>
  );
}
