'use client'

import { useState, useMemo, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Calendar, Users, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PackageCard } from "@/components/site/PackageCard";
import { fetchPackages } from "@/lib/api";
import { DESTINATIONS } from "@/lib/packages";
import type { Metadata } from "next";

function PackagesInner() {
  const router = useRouter();
  const params = useSearchParams();

  const [destination, setDestination] = useState(params.get("destination") ?? "Any region");
  const [duration, setDuration] = useState(params.get("duration") ?? "any");
  const [travelers, setTravelers] = useState(Number(params.get("travelers") ?? 2));
  const [date, setDate] = useState(params.get("date") ?? "");

  // Sync state with URL params when they change
  useEffect(() => {
    const dest = params.get("destination");
    if (dest) setDestination(dest);
  }, [params]);

  const { data, isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  const filtered = useMemo(() => {
    let list = data ?? [];
    if (destination && destination !== "Any region") {
      list = list.filter((p) =>
        p.destinations.some((d) => d.toLowerCase() === destination.toLowerCase())
      );
    }
    if (duration !== "any") {
      list = list.filter((p) => {
        if (duration === "short") return p.duration_days <= 6;
        if (duration === "medium") return p.duration_days >= 7 && p.duration_days <= 10;
        return p.duration_days >= 11;
      });
    }
    return list;
  }, [data, destination, duration]);

  const hasFilters = destination !== "Any region" || duration !== "any" || date !== "";

  const clearFilters = () => {
    setDestination("Any region");
    setDuration("any");
    setTravelers(2);
    setDate("");
  };

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
          <div className="eyebrow !text-gold-light mb-3">Every Curated Journey</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-light">
            Tour <em className="text-gold">Packages</em>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
            Hand-crafted itineraries across the island — each with a private vehicle,
            luxury hotels, and an expert local guide.
          </p>
          <div className="mt-4 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12">

        {/* Filter Bar */}
        <div className="card-luxe p-4 mb-8">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-grey-soft text-sm">
              <SlidersHorizontal size={15} className="text-gold-dark" />
              <span className="hidden sm:inline">Filter by</span>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-2 bg-beige/60 rounded-lg px-3 py-2 flex-1 min-w-[140px]">
              <MapPin size={14} className="text-gold-dark shrink-0" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-transparent text-sm text-charcoal focus:outline-none w-full"
              >
                {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 bg-beige/60 rounded-lg px-3 py-2 flex-1 min-w-[120px]">
              <Calendar size={14} className="text-gold-dark shrink-0" />
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-transparent text-sm text-charcoal focus:outline-none w-full"
              >
                <option value="any">Any Length</option>
                <option value="short">3–6 Days</option>
                <option value="medium">7–10 Days</option>
                <option value="long">11+ Days</option>
              </select>
            </div>

            {/* Travelers */}
            <div className="flex items-center gap-2 bg-beige/60 rounded-lg px-3 py-2 min-w-[110px]">
              <Users size={14} className="text-gold-dark shrink-0" />
              <input
                type="number"
                min={1}
                max={12}
                value={travelers}
                onChange={(e) => setTravelers(Math.max(1, Math.min(12, +e.target.value || 1)))}
                className="bg-transparent text-sm text-charcoal focus:outline-none w-14"
                placeholder="Travelers"
              />
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 bg-beige/60 rounded-lg px-3 py-2 flex-1 min-w-[140px]">
              <Calendar size={14} className="text-gold-dark shrink-0" />
              <input
                type="date"
                value={date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent text-sm text-charcoal focus:outline-none w-full"
              />
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs text-grey-soft hover:text-gold-dark transition px-3 py-2 rounded-lg border border-grey-line"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        {!isLoading && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-grey-soft">
              <span className="text-charcoal font-semibold">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "journey" : "journeys"} found
              {destination !== "Any region" && (
                <> in <span className="text-charcoal font-medium">{destination}</span></>
              )}
              {" "}for <span className="text-charcoal font-medium">{travelers} {travelers === 1 ? "traveler" : "travelers"}</span>
            </p>
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-luxe overflow-hidden">
                <div className="aspect-[3/2] bg-beige animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-beige animate-pulse rounded w-1/3" />
                  <div className="h-6 bg-beige animate-pulse rounded w-3/4" />
                  <div className="h-8 bg-beige animate-pulse rounded w-1/2 mt-6" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32">
            <div className="font-display text-3xl text-charcoal mb-3">No journeys match your filters</div>
            <p className="text-grey-soft text-sm mb-6">Try widening your destination or duration selection.</p>
            <button onClick={clearFilters} className="btn-gold">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <div key={p.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <PackageCard pkg={p} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    }>
      <PackagesInner />
    </Suspense>
  );
}
