'use client'

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Shield, Award, Users } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import hero from "@/assets/hero-sigiriya.jpg";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar solid />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.3) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="eyebrow !text-gold-light mb-3">Our Story</div>
          <h1 className="font-display text-5xl md:text-6xl text-white font-light">
            About <em className="text-gold">Tour Buddy</em>
          </h1>
          <p className="mt-5 text-white/60 max-w-2xl mx-auto leading-relaxed">
            Crafting bespoke, luxury journeys across the teardrop island of Sri Lanka since 2018.
          </p>
          <div className="mt-6 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </section>

      {/* Story Content */}
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Image */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-card">
            <Image
              src={hero}
              alt="Sigiriya Rock Fortress"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div className="eyebrow">The Vision</div>
            <h2 className="font-display text-4xl text-charcoal font-light">
              Elevating the <em className="text-gold-dark">Sri Lankan</em> Experience
            </h2>
            <p className="text-grey-soft leading-relaxed">
              Tour Buddy was founded on a simple premise: that travel should be more than just visiting places. It should be a seamless immersion into culture, luxury, and unforgettable moments.
            </p>
            <p className="text-grey-soft leading-relaxed">
              We specialize in creating tailor-made itineraries that combine the island's most breathtaking destinations with private, white-glove transport and stays at the finest boutique hotels.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <div className="text-3xl font-display text-gold-dark font-light">100%</div>
                <div className="text-xs text-grey-soft uppercase tracking-wider mt-1">Bespoke Itineraries</div>
              </div>
              <div>
                <div className="text-3xl font-display text-gold-dark font-light">500+</div>
                <div className="text-xs text-grey-soft uppercase tracking-wider mt-1">Happy Explorers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <div className="eyebrow">Why Choose Us</div>
            <h2 className="font-display text-4xl text-charcoal mt-2">The Tour Buddy Difference</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <ValueCard 
              icon={Shield} 
              title="Uncompromised Safety" 
              description="Your safety and comfort are our top priorities. All our vehicles and guides are fully certified."
            />
            <ValueCard 
              icon={Award} 
              title="Luxury Standards" 
              description="We handpick only the finest 5-star and boutique accommodations across the island."
            />
            <ValueCard 
              icon={Users} 
              title="Expert Local Guides" 
              description="Our chauffeur-guides are not just drivers; they are storytellers with deep local knowledge."
            />
          </div>
        </section>

        {/* CTA */}
        <div className="mt-32 rounded-2xl bg-charcoal p-10 md:p-16 text-center relative overflow-hidden">
          <div className="relative">
            <div className="eyebrow !text-gold mb-3">Ready to Plan?</div>
            <h2 className="font-display text-4xl md:text-5xl text-white font-light">
              Let's Create Your <em className="text-gold">Dream Trip</em>
            </h2>
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="btn-gold">
                Contact Our Experts <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="bg-beige/20 border border-beige p-8 rounded-xl hover:shadow-card transition-all">
      <div className="h-12 w-12 bg-gold/10 rounded-full flex items-center justify-center mb-6">
        <Icon className="text-gold-dark" size={24} />
      </div>
      <h3 className="font-display text-2xl text-charcoal mb-3 font-light">{title}</h3>
      <p className="text-sm text-grey-soft leading-relaxed">{description}</p>
    </div>
  );
}
