'use client'

import { useParams, useRouter } from "next/navigation";
import { getVehicleBySlug } from "@/lib/vehicles";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Briefcase, Car, Check, Lock, Shield, Phone, Loader2, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export default function VehicleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const vehicle = getVehicleBySlug(slug);

  const [days, setDays] = useState(1);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="font-display text-3xl text-charcoal">Vehicle not found</div>
        <Link href="/vehicles" className="btn-gold">Browse All Vehicles</Link>
      </div>
    );
  }

  const total = vehicle.price_per_day * days;

  const onBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) { toast.error("Please choose a start date"); return; }
    router.push(`/checkout?vehicle=${vehicle.slug}&days=${days}&date=${date}`);
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar solid />

      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Breadcrumb */}
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-sm text-grey-soft hover:text-gold-dark transition mb-8"
          >
            <ArrowLeft size={14} /> All Vehicles
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">

            {/* ── Left Column ── */}
            <div>
              {/* Hero Image */}
              <div className="relative h-[300px] sm:h-[400px] md:h-[480px] rounded-2xl overflow-hidden shadow-card">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <span className="absolute top-5 left-5 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[11px] font-semibold text-charcoal uppercase tracking-wider">
                  {vehicle.type}
                </span>
              </div>

              {/* Title & Meta */}
              <div className="mt-8">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
                  {vehicle.name}
                </h1>
                <p className="mt-4 text-charcoal/85 leading-relaxed">{vehicle.description}</p>

                {/* Specs Strip */}
                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-grey-soft border-y border-grey-line py-4">
                  <span className="flex items-center gap-2">
                    <Users size={16} className="text-gold-dark" /> Up to {vehicle.capacity} Passengers
                  </span>
                  <span className="flex items-center gap-2">
                    <Briefcase size={16} className="text-gold-dark" /> {vehicle.luggage} Luggage Bags
                  </span>
                  <span className="flex items-center gap-2">
                    <Car size={16} className="text-gold-dark" /> Professional Chauffeur
                  </span>
                </div>
              </div>

              {/* Features */}
              <section className="mt-12">
                <div className="eyebrow mb-4">Premium Features</div>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {vehicle.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-charcoal">
                      <Check size={16} className="text-gold-dark" /> {f}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Info Section */}
              <section className="mt-12 space-y-4 text-sm text-grey-soft leading-relaxed">
                <p>All our vehicles are regularly serviced and maintained to the highest safety standards. Our chauffeurs are licensed, English-speaking, and have extensive knowledge of Sri Lanka's roads and destinations.</p>
                <p>Prices include fuel, driver accommodation, and insurance. Tolls and parking fees are excluded and should be paid directly by the client.</p>
              </section>
            </div>

            {/* ── Right: Booking Card ── */}
            <aside>
              <form
                onSubmit={onBook}
                className="card-luxe p-6 lg:sticky lg:top-28 space-y-5"
              >
                {/* Price */}
                <div>
                  <div className="eyebrow !text-grey-soft text-[10px]">From</div>
                  <div className="font-display text-5xl text-gold-dark leading-none mt-1">
                    ${vehicle.price_per_day}
                  </div>
                  <div className="text-xs text-grey-soft mt-1">per day · all inclusive</div>
                </div>

                <div className="gold-rule w-full" />

                {/* Days */}
                <label className="block">
                  <span className="eyebrow block mb-2">Number of Days</span>
                  <div className="flex items-center gap-3">
                    <button type="button"
                      onClick={() => setDays(Math.max(1, days - 1))}
                      className="h-8 w-8 rounded-full border border-grey-line flex items-center justify-center text-sm hover:border-gold hover:text-gold transition">
                      −
                    </button>
                    <span className="font-display text-2xl text-charcoal w-8 text-center">{days}</span>
                    <button type="button"
                      onClick={() => setDays(days + 1)}
                      className="h-8 w-8 rounded-full border border-grey-line flex items-center justify-center text-sm hover:border-gold hover:text-gold transition">
                      +
                    </button>
                  </div>
                </label>

                {/* Date */}
                <label className="block">
                  <span className="eyebrow block mb-2">Start Date</span>
                  <div className="flex items-center gap-2 bg-beige/50 rounded-xl px-3 py-2.5">
                    <Calendar size={15} className="text-gold-dark shrink-0" />
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full bg-transparent text-sm text-charcoal focus:outline-none"
                    />
                  </div>
                </label>

                {/* Notes */}
                <label className="block">
                  <span className="eyebrow block mb-2">Special Requests</span>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={500}
                    placeholder="Flight details, specific route, child seat needs…"
                    className="w-full bg-beige/50 rounded-xl px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                  />
                </label>

                {/* Total */}
                <div className="bg-charcoal rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                  <div>
                    <div className="text-white/50 text-[10px] uppercase tracking-wide">Estimated Total</div>
                    <div className="font-display text-3xl text-gold leading-none mt-1">
                      ${total.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-white/40 text-xs">{days} × ${vehicle.price_per_day}</div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full justify-center"
                >
                  <Lock size={13} /> Proceed to Checkout
                </button>

                {/* Trust strip */}
                <div className="flex flex-wrap items-center justify-around pt-1 text-[9px] eyebrow !text-grey-soft gap-2">
                  <span className="flex items-center gap-1"><Shield size={11} /> Verified</span>
                  <span className="flex items-center gap-1"><Lock size={11} /> Secure</span>
                  <span className="flex items-center gap-1"><Phone size={11} /> 24/7 Support</span>
                </div>
              </form>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
