'use client'

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  Star, Car, Hotel, Compass, Ticket, Check, X,
  ArrowLeft, Loader2, Calendar, Users, Lock, Shield, Phone
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { fetchPackageBySlug } from "@/lib/api";
import { packageImage } from "@/lib/packages";
import { useAuth } from "@/lib/auth";

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const { data: pkg, isLoading } = useQuery({
    queryKey: ["package", slug],
    queryFn: () => fetchPackageBySlug(slug),
  });

  const [travelers, setTravelers] = useState(2);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar solid />
        <div className="pt-40 flex justify-center">
          <Loader2 className="animate-spin text-gold" size={40} />
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="font-display text-3xl text-charcoal">Package not found</div>
        <Link href="/packages" className="btn-gold">Browse All Packages</Link>
      </div>
    );
  }

  const total = Number(pkg.price_usd) * travelers;
  const deposit = total * 0.3;

  const onBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) { toast.error("Please choose a travel date"); return; }
    if (!user) {
      sessionStorage.setItem("postLoginRedirect", `/packages/${slug}`);
      toast.message("Please sign in to confirm your booking");
      router.push("/auth");
      return;
    }
    setSubmitting(true);
    // Supabase disabled for demo
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Booking confirmed! Check your dashboard. (Demo)");
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar solid />

      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Breadcrumb */}
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm text-grey-soft hover:text-gold-dark transition mb-8"
          >
            <ArrowLeft size={14} /> All Packages
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">

            {/* ── Left Column ── */}
            <div>
              {/* Hero Image */}
              <div className="relative h-[300px] sm:h-[400px] md:h-[480px] rounded-2xl overflow-hidden shadow-card">
                <Image
                  src={packageImage(pkg.slug)}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                {/* Overlay badges */}
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[11px] font-semibold text-charcoal uppercase tracking-wider">
                    {pkg.duration_days} Days
                  </span>
                  <span className="bg-gold/90 backdrop-blur px-3 py-1 rounded-full text-[11px] font-semibold text-charcoal flex items-center gap-1">
                    {Array.from({ length: pkg.hotel_stars }).map((_, i) => (
                      <Star key={i} size={9} fill="currentColor" strokeWidth={0} />
                    ))}
                    &nbsp;Star
                  </span>
                </div>
              </div>

              {/* Title & Meta */}
              <div className="mt-8">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pkg.destinations.map((d) => (
                    <span key={d} className="text-[10px] tracking-wider uppercase font-medium text-forest bg-forest/8 px-2.5 py-1 rounded">
                      {d}
                    </span>
                  ))}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
                  {pkg.title}
                </h1>
                {pkg.tagline && (
                  <p className="mt-3 font-display italic text-xl text-grey-soft">{pkg.tagline}</p>
                )}

                {/* Quick inclusions strip */}
                <div className="mt-5 flex flex-wrap items-center gap-5 text-[11px] text-grey-soft border-y border-grey-line py-3">
                  {[
                    { Icon: Car, label: "Private Vehicle" },
                    { Icon: Hotel, label: `${pkg.hotel_stars}★ Hotels` },
                    { Icon: Compass, label: "Expert Guide" },
                    { Icon: Ticket, label: "All Tickets" },
                  ].map(({ Icon, label }) => (
                    <span key={label} className="flex items-center gap-1.5">
                      <Icon size={13} className="text-gold-dark" /> {label}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-charcoal/85 leading-relaxed">{pkg.description}</p>
              </div>

              {/* Highlights */}
              {pkg.highlights.length > 0 && (
                <section className="mt-12">
                  <div className="eyebrow mb-4">Highlights</div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-charcoal">
                        <span className="text-gold mt-0.5 shrink-0">✦</span> {h}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Itinerary */}
              {pkg.itinerary?.length > 0 && (
                <section className="mt-12">
                  <div className="eyebrow mb-5">Day by Day</div>
                  <ol className="space-y-6 border-l-2 border-grey-line pl-6">
                    {pkg.itinerary.map((d) => (
                      <li key={d.day} className="relative">
                        <span className="absolute -left-[29px] h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-background" />
                        <div className="eyebrow !text-[10px] text-grey-soft">Day {d.day}</div>
                        <div className="font-display text-xl text-charcoal mt-0.5">{d.title}</div>
                        <ul className="mt-2 text-sm text-grey-soft space-y-1">
                          {d.activities.map((a) => <li key={a}>· {a}</li>)}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Inclusions & Exclusions */}
              <section className="mt-12 grid sm:grid-cols-2 gap-8">
                <div>
                  <div className="eyebrow mb-4">What's Included</div>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-sm text-charcoal">
                        <Check size={14} className="text-forest mt-0.5 shrink-0" /> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="eyebrow mb-4">Not Included</div>
                  <ul className="space-y-2.5">
                    {pkg.exclusions.map((exc) => (
                      <li key={exc} className="flex items-start gap-2 text-sm text-grey-soft">
                        <X size={14} className="text-destructive mt-0.5 shrink-0" /> {exc}
                      </li>
                    ))}
                  </ul>
                </div>
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
                    ${Number(pkg.price_usd).toLocaleString()}
                  </div>
                  <div className="text-xs text-grey-soft mt-1">per person · all inclusive</div>
                </div>

                <div className="gold-rule w-full" />

                {/* Travelers */}
                <label className="block">
                  <span className="eyebrow block mb-2">Travelers</span>
                  <div className="flex items-center gap-3">
                    <button type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="h-8 w-8 rounded-full border border-grey-line flex items-center justify-center text-sm hover:border-gold hover:text-gold transition">
                      −
                    </button>
                    <span className="font-display text-2xl text-charcoal w-8 text-center">{travelers}</span>
                    <button type="button"
                      onClick={() => setTravelers(Math.min(pkg.max_travelers, travelers + 1))}
                      className="h-8 w-8 rounded-full border border-grey-line flex items-center justify-center text-sm hover:border-gold hover:text-gold transition">
                      +
                    </button>
                    <span className="text-xs text-grey-soft">max {pkg.max_travelers}</span>
                  </div>
                </label>

                {/* Date */}
                <label className="block">
                  <span className="eyebrow block mb-2">Travel Date</span>
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
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={500}
                    placeholder="Dietary needs, anniversary, accessibility…"
                    className="w-full bg-beige/50 rounded-xl px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                  />
                </label>

                {/* Total */}
                <div className="bg-charcoal rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                  <div>
                    <div className="text-white/50 text-[10px] uppercase tracking-wide">Total</div>
                    <div className="font-display text-3xl text-gold leading-none mt-1">
                      ${total.toLocaleString()}
                    </div>
                    <div className="text-white/40 text-[10px] mt-1">
                      30% deposit · ${deposit.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-white/40 text-xs">{travelers} × ${Number(pkg.price_usd).toLocaleString()}</div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full justify-center disabled:opacity-60"
                >
                  {submitting
                    ? <><Loader2 size={15} className="animate-spin" /> Processing…</>
                    : <><Lock size={13} /> Book This Journey</>}
                </button>

                {/* Or go to checkout */}
                <Link
                  href={`/checkout?package=${pkg.slug}`}
                  className="block text-center text-xs text-grey-soft hover:text-gold-dark transition border border-grey-line rounded-xl py-2.5"
                >
                  Or go to full checkout →
                </Link>

                {/* Trust strip */}
                <div className="flex flex-wrap items-center justify-around pt-1 text-[9px] eyebrow !text-grey-soft gap-2">
                  <span className="flex items-center gap-1"><Shield size={11} /> Secure</span>
                  <span className="flex items-center gap-1"><Lock size={11} /> Encrypted</span>
                  <span className="flex items-center gap-1"><Phone size={11} /> 24/7 Support</span>
                </div>

                {/* Inclusions icons */}
                <div className="pt-4 border-t border-grey-line flex items-center gap-4 text-[11px] text-grey-soft flex-wrap">
                  <span className="flex items-center gap-1"><Car size={13} className="text-gold-dark" /> Private</span>
                  <span className="flex items-center gap-1"><Hotel size={13} className="text-gold-dark" /> Hotels</span>
                  <span className="flex items-center gap-1"><Compass size={13} className="text-gold-dark" /> Guide</span>
                  <span className="flex items-center gap-1"><Ticket size={13} className="text-gold-dark" /> Tickets</span>
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
