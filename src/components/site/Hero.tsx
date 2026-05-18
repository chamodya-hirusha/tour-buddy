'use client'

import { ArrowRight, Search, MapPin, Calendar, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import heroImage from "@/assets/hero-sigiriya.jpg";
import { DESTINATIONS } from "@/lib/packages";
import Image from "next/image";

export function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState<string>("Any region");
  const [travelers, setTravelers] = useState(2);
  const [date, setDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("any");

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    const params = new URLSearchParams();
    if (destination !== "Any region") params.append("destination", destination);
    params.append("travelers", travelers.toString());
    if (date) params.append("date", date);
    if (duration !== "any") params.append("duration", duration);

    router.push(`/packages?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Sigiriya Lion Rock at golden hour, Sri Lanka"
          fill
          className="object-cover scale-105"
          style={{ animation: "fadeUp 1.6s ease both" }}
          priority
        />
      </div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white pt-24 pb-40">
        <div className="eyebrow !text-gold-light fade-up">Luxury Sri Lanka Travel</div>
        <div className="mt-4 mx-auto w-12 gold-rule fade-up delay-100" />

        <h1 className="font-display fade-up delay-100 mt-8 text-[44px] leading-[1.05] sm:text-6xl lg:text-7xl xl:text-[88px] font-light italic text-balance">
          Your Journey to <br className="hidden sm:block" />
          <span className="text-gold-light">Paradise</span> Begins Here
        </h1>

        <p className="fade-up delay-200 mx-auto mt-7 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed font-light">
          Bespoke tours through Sri Lanka with private vehicles, handpicked luxury hotels, and expert local guides.
        </p>

        <div className="fade-up delay-300 mt-10 flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => onSearch()} className="btn-gold">
            Explore Packages <ArrowRight size={16} />
          </button>
          <a href="#how" className="btn-ghost-light">How It Works</a>
        </div>
      </div>

      <form
        onSubmit={onSearch}
        className="absolute bottom-0 inset-x-0 z-10 px-4 sm:px-6 pb-0 sm:pb-6 fade-up delay-500"
      >
        <div className="mx-auto max-w-5xl bg-white/92 backdrop-blur-xl rounded-t-2xl sm:rounded-2xl shadow-modal border border-white/40 p-3 sm:p-4 grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3">
          <Field icon={MapPin} label="Destination">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-charcoal focus:outline-none"
            >
              {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field icon={Calendar} label="Travel Date">
            <input
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-charcoal focus:outline-none"
            />
          </Field>
          <Field icon={Users} label="Travelers">
            <input
              type="number"
              min={1}
              max={12}
              value={travelers}
              onChange={(e) => setTravelers(Math.max(1, Math.min(12, +e.target.value || 1)))}
              className="w-full bg-transparent text-sm font-medium text-charcoal focus:outline-none"
            />
          </Field>
          <Field icon={Calendar} label="Duration" className="hidden md:flex">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-charcoal focus:outline-none"
            >
              <option value="any">Any length</option>
              <option value="short">3–6 days</option>
              <option value="medium">7–10 days</option>
              <option value="long">11+ days</option>
            </select>
          </Field>
          <button type="submit" className="btn-gold justify-center !py-3 col-span-2 md:col-span-1">
            <Search size={16} /> Search
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  children,
  className = "",
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-beige/70 transition cursor-pointer ${className}`}>
      <Icon size={18} className="text-gold-dark shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider text-grey-soft font-medium">{label}</div>
        <div className="text-sm text-charcoal font-medium truncate">{children}</div>
      </div>
    </label>
  );
}
