'use client'

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Star, CheckCircle, Loader2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { DESTINATION_DETAILS } from "@/lib/destinations";
import { fetchPackages } from "@/lib/api";
import { PackageCard } from "@/components/site/PackageCard";

export default function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  // Find the destination detail
  const destination = DESTINATION_DETAILS.find(
    (d) => d.searchSlug.toLowerCase() === slug?.toLowerCase()
  );

  // Fetch packages to filter ones that include this destination
  const { data: packages, isLoading: packagesLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="font-display text-3xl text-charcoal">Destination not found</div>
        <Link href="/destinations" className="btn-gold">Back to All Destinations</Link>
      </div>
    );
  }

  // Filter packages that include this destination
  const relevantPackages = packages?.filter((p) =>
    p.destinations.some((d) => d.toLowerCase() === destination.searchSlug.toLowerCase())
  ) ?? [];

  return (
    <div className="bg-background min-h-screen">
      <Navbar solid />

      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Breadcrumb */}
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-grey-soft hover:text-gold-dark transition mb-8"
          >
            <ArrowLeft size={14} /> All Destinations
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            
            {/* ── Left Column: Details ── */}
            <div>
              {/* Hero Image */}
              <div className="rounded-2xl overflow-hidden shadow-card relative h-[400px]">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-white/90 backdrop-blur-sm text-charcoal text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    {destination.region} Region
                  </span>
                  <h1 className="font-display text-5xl text-white font-light">
                    {destination.name}
                  </h1>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <p className="text-charcoal/85 text-lg leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Highlights */}
              <section className="mt-10">
                <div className="eyebrow mb-4">Key Highlights</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-3 bg-beige/30 p-4 rounded-xl border border-beige">
                      <span className="text-gold mt-0.5 shrink-0">✦</span>
                      <span className="text-sm text-charcoal">{h}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Info */}
              <section className="mt-10 grid sm:grid-cols-2 gap-6 border-t border-grey-line pt-8">
                <div>
                  <div className="eyebrow mb-1">Best Time to Visit</div>
                  <div className="flex items-center gap-2 text-charcoal">
                    <Calendar size={16} className="text-gold-dark" />
                    <span className="font-medium">{destination.bestTime}</span>
                  </div>
                </div>
                <div>
                  <div className="eyebrow mb-1">Accessibility</div>
                  <div className="text-sm text-grey-soft">Accessible via private vehicle and scenic routes.</div>
                </div>
              </section>
            </div>

            {/* ── Right Column: Packages ── */}
            <aside>
              <div className="card-luxe p-6 lg:sticky lg:top-28 space-y-6">
                <div>
                  <div className="eyebrow mb-2">Curated Journeys</div>
                  <h2 className="font-display text-2xl text-charcoal">Featured Packages</h2>
                  <p className="text-xs text-grey-soft mt-1">Discover packages that include {destination.name}.</p>
                </div>

                <div className="gold-rule w-full" />

                {packagesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-gold" size={24} />
                  </div>
                ) : relevantPackages.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-grey-soft">No specific packages found for this destination yet.</p>
                    <Link href="/packages" className="btn-gold mt-4 text-xs">Browse All Packages</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {relevantPackages.map((p) => (
                      <Link href={`/packages/${p.slug}`} key={p.id} className="block group">
                        <div className="border border-grey-line rounded-xl p-4 hover:border-gold transition-colors bg-white">
                          <div className="font-display text-lg text-charcoal group-hover:text-gold-dark transition-colors">{p.title}</div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-grey-soft">{p.duration_days} Days</span>
                            <span className="text-sm font-semibold text-gold-dark">${p.price_usd.toLocaleString()}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <div className="border-t border-grey-line pt-4 mt-6">
                  <p className="text-xs text-grey-soft text-center">
                    All packages include private transport, handpicked hotels, and expert guides.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
