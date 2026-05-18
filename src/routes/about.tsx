import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import hero from "@/assets/hero-sigiriya.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Sri Lanka Luxe Voyages" },
      { name: "description", content: "Learn about our mission to curate the finest luxury journeys in Sri Lanka." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar solid={true} />
      <main className="flex-grow pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="eyebrow">Our Story</div>
            <h1 className="mt-3 font-display text-5xl md:text-6xl text-charcoal">
              About <em className="text-gold-dark">Tour Buddy</em>
            </h1>
            <p className="mt-4 text-grey-soft max-w-2xl mx-auto">
              We are dedicated to crafting bespoke, luxury travel experiences that showcase the true essence of Sri Lanka.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center mb-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-modal">
              <img
                src={hero}
                alt="Sigiriya"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <div className="eyebrow">The Vision</div>
              <h2 className="mt-2 font-display text-3xl text-charcoal mb-4">
                Curating Unforgettable Journeys
              </h2>
              <p className="text-grey-soft mb-4 leading-relaxed">
                Founded with a passion for sharing the wonders of Sri Lanka, Tour Buddy specializes in creating personalized itineraries that go beyond the ordinary. We believe that travel should be seamless, inspiring, and deeply personal.
              </p>
              <p className="text-grey-soft mb-6 leading-relaxed">
                Our team of local experts handpicks every hotel, selects the most knowledgeable guides, and ensures every detail is taken care of, so you can immerse yourself in the culture and beauty of the island.
              </p>
              <div className="flex gap-6">
                <div>
                  <div className="font-display text-3xl text-gold-dark">10+</div>
                  <div className="text-xs text-grey-soft uppercase tracking-wider mt-1">Years Experience</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-gold-dark">500+</div>
                  <div className="text-xs text-grey-soft uppercase tracking-wider mt-1">Happy Travelers</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-gold-dark">100%</div>
                  <div className="text-xs text-grey-soft uppercase tracking-wider mt-1">Local Guides</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="eyebrow">Our Values</div>
            <h2 className="mt-2 font-display text-3xl text-charcoal">
              What Drives Us
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <ValueCard
              title="Authenticity"
              description="We connect you with genuine local experiences, traditions, and people, ensuring a true reflection of Sri Lankan culture."
            />
            <ValueCard
              title="Luxury & Comfort"
              description="From private chauffeurs to handpicked 5-star boutique hotels, we ensure your journey is as comfortable as it is breathtaking."
            />
            <ValueCard
              title="Expertise"
              description="Our guides are government-licensed professionals with deep knowledge of history, wildlife, and the hidden gems of the island."
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="card-luxe p-8 bg-white">
      <h3 className="font-display text-xl text-charcoal mb-3">{title}</h3>
      <p className="text-sm text-grey-soft leading-relaxed">{description}</p>
    </div>
  );
}
