'use client'

import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { fetchPackages } from "@/lib/api";
import { PackageCard } from "./PackageCard";

export function FeaturedPackages() {
  const { data, isLoading } = useQuery({
    queryKey: ["packages", "featured"],
    queryFn: fetchPackages,
  });

  const featured = (data ?? []).filter((p) => p.is_featured).slice(0, 3);

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow">Featured Journeys</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-[56px] leading-tight text-charcoal">
            Curated Luxury <em className="text-gold-dark not-italic font-display italic">Experiences</em>
          </h2>
          <div className="mx-auto mt-5 w-12 gold-rule" />
          <p className="mt-6 text-grey-soft leading-relaxed">
            Each journey is crafted with private transport, handpicked hotels,
            and licensed cultural guides — so you only think about the moment.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card-luxe overflow-hidden">
                  <div className="aspect-[3/2] bg-beige animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-beige animate-pulse rounded w-1/3" />
                    <div className="h-6 bg-beige animate-pulse rounded w-3/4" />
                    <div className="h-8 bg-beige animate-pulse rounded w-1/2 mt-6" />
                  </div>
                </div>
              ))
            : featured.map((p, i) => (
                <div key={p.id} className="fade-up" style={{ animationDelay: `${i * 120}ms` }}>
                  <PackageCard pkg={p} />
                </div>
              ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/packages" className="inline-flex items-center gap-2 text-sm font-medium text-charcoal border-b border-gold pb-0.5 hover:gap-3 transition-all">
            View all packages <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
