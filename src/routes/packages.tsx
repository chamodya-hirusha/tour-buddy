import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PackageCard } from "@/components/site/PackageCard";
import { fetchPackages } from "@/lib/api";
import { DESTINATIONS } from "@/lib/packages";

const searchSchema = z.object({
  destination: fallback(z.string().optional(), undefined),
  travelers: fallback(z.number(), 2).default(2),
  date: fallback(z.string().optional(), undefined),
  duration: fallback(z.enum(["any", "short", "medium", "long"]), "any").default("any"),
});

export const Route = createFileRoute("/packages")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "All Tour Packages — Tour Buddy" },
      { name: "description", content: "Browse curated luxury tour packages across Sri Lanka." },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isLoading } = useQuery({ queryKey: ["packages"], queryFn: fetchPackages });

  const filtered = useMemo(() => {
    let list = data ?? [];
    if (search.destination) {
      list = list.filter((p) =>
        p.destinations.some((d) => d.toLowerCase() === search.destination!.toLowerCase()),
      );
    }
    if (search.duration !== "any") {
      list = list.filter((p) => {
        if (search.duration === "short") return p.duration_days <= 6;
        if (search.duration === "medium") return p.duration_days >= 7 && p.duration_days <= 10;
        return p.duration_days >= 11;
      });
    }
    return list;
  }, [data, search.destination, search.duration]);

  return (
    <div className="bg-background">
      <Navbar solid={true} />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="eyebrow">Every Curated Journey</div>
            <h1 className="mt-3 font-display text-5xl md:text-6xl text-charcoal">
              Tour <em className="text-gold-dark">Packages</em>
            </h1>
          </div>

          {/* Filters */}
          <div className="card-luxe p-4 mb-10 grid grid-cols-2 md:grid-cols-4 gap-3">
            <select
              value={search.destination ?? "Any region"}
              onChange={(e) =>
                navigate({
                  search: (p) => ({
                    ...p,
                    destination: e.target.value === "Any region" ? undefined : e.target.value,
                  }),
                })
              }
              className="bg-beige/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            >
              {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select
              value={search.duration}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, duration: e.target.value as "any" | "short" | "medium" | "long" }) })
              }
              className="bg-beige/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            >
              <option value="any">Any length</option>
              <option value="short">3–6 days</option>
              <option value="medium">7–10 days</option>
              <option value="long">11+ days</option>
            </select>
            <input
              type="number"
              min={1}
              max={12}
              value={search.travelers}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, travelers: Math.max(1, Math.min(12, +e.target.value || 1)) }) })
              }
              className="bg-beige/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              placeholder="Travelers"
            />
            <input
              type="date"
              value={search.date ?? ""}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) =>
                navigate({ search: (p) => ({ ...p, date: e.target.value || undefined }) })
              }
              className="bg-beige/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-luxe overflow-hidden">
                  <div className="aspect-[3/2] bg-beige animate-pulse" />
                  <div className="p-6 h-40" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-grey-soft">
              <p className="font-display text-2xl text-charcoal">No journeys match your filters.</p>
              <p className="mt-2 text-sm">Try widening your destination or duration.</p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-grey-soft">
                {filtered.length} {filtered.length === 1 ? "journey" : "journeys"} for{" "}
                <span className="text-charcoal font-medium">{search.travelers} {search.travelers === 1 ? "traveler" : "travelers"}</span>
                {search.destination && <> in <span className="text-charcoal font-medium">{search.destination}</span></>}
              </p>
              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => <PackageCard key={p.id} pkg={p} />)}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
