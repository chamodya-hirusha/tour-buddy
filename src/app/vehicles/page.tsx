'use client'

import { VEHICLES } from "@/lib/vehicles";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Briefcase, Car } from "lucide-react";

export default function VehiclesPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar solid />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="eyebrow !text-gold-light mb-3">Our Fleet</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-light">
            Luxury <em className="text-gold">Vehicles</em>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
            Travel in comfort and style with our fleet of premium vehicles. 
            All vehicles include a professional chauffeur.
          </p>
          <div className="mt-4 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {VEHICLES.map((v) => (
            <Link
              key={v.id}
              href={`/vehicles/${v.slug}`}
              className="card-luxe overflow-hidden group block"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-4 left-4 bg-background/95 backdrop-blur px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-charcoal">
                  {v.type}
                </span>
              </div>

              <div className="p-6">
                <h2 className="font-display text-2xl text-charcoal group-hover:text-gold-dark transition-colors">
                  {v.name}
                </h2>
                <p className="mt-2 text-sm text-grey-soft leading-relaxed line-clamp-2">
                  {v.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-grey-soft text-[11px]">
                  <span className="flex items-center gap-1.5"><Users size={13} /> Up to {v.capacity} seats</span>
                  <span className="flex items-center gap-1.5"><Briefcase size={13} /> {v.luggage} bags</span>
                  <span className="flex items-center gap-1.5"><Car size={13} /> Chauffeur</span>
                </div>

                <div className="mt-6 pt-5 border-t border-grey-line flex items-end justify-between">
                  <div>
                    <div className="text-[10px] eyebrow !text-grey-soft">From</div>
                    <div className="font-display text-3xl text-gold-dark leading-none mt-1">
                      ${v.price_per_day}
                    </div>
                    <div className="text-[11px] text-grey-soft mt-1">per day</div>
                  </div>
                  <span className="text-sm font-medium text-charcoal flex items-center gap-1 border-b border-gold pb-0.5 group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
