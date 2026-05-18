import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Star, Car, Hotel, Compass, Ticket, Check, X, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { fetchPackageBySlug } from "@/lib/api";
import { packageImage } from "@/lib/packages";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/packages/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Tour Buddy` },
    ],
  }),
  component: PackageDetail,
});

function PackageDetail() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
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
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="pt-40 text-center"><Loader2 className="mx-auto animate-spin text-gold" /></div>
      </div>
    );
  }
  if (!pkg) throw notFound();

  const total = Number(pkg.price_usd) * travelers;

  const onBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) { toast.error("Please choose a travel date"); return; }
    if (!user) {
      sessionStorage.setItem("postLoginRedirect", `/packages/${slug}`);
      toast.message("Please sign in to confirm your booking");
      navigate({ to: "/auth" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      package_id: pkg.id,
      travel_date: date,
      num_travelers: travelers,
      full_name: user.user_metadata?.full_name || user.email || "Guest",
      email: user.email!,
      phone: user.user_metadata?.phone || "",
      special_notes: notes || null,
      total_usd: total,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not create booking", { description: error.message });
      return;
    }
    toast.success("Booking created! Check your dashboard.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="bg-background">
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/packages" className="inline-flex items-center gap-2 text-sm text-grey-soft hover:text-gold mb-8">
            <ArrowLeft size={14} /> All packages
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Left */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-card">
                <img
                  src={packageImage(pkg.slug).src}
                  alt={pkg.title}
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>

              <div className="mt-8">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pkg.destinations.map((d) => (
                    <span key={d} className="text-[10px] tracking-wider uppercase font-medium text-forest bg-forest/8 px-2.5 py-1 rounded">
                      {d}
                    </span>
                  ))}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal">{pkg.title}</h1>
                {pkg.tagline && (
                  <p className="mt-3 font-display italic text-xl text-grey-soft">{pkg.tagline}</p>
                )}
                <p className="mt-6 text-charcoal/85 leading-relaxed text-[15px]">{pkg.description}</p>
              </div>

              {/* Highlights */}
              {pkg.highlights.length > 0 && (
                <section className="mt-12">
                  <h2 className="font-accent text-xs text-gold-dark mb-4">Highlights</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-charcoal">
                        <span className="text-gold mt-1">✦</span> {h}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Itinerary */}
              <section className="mt-12">
                <h2 className="font-accent text-xs text-gold-dark mb-5">Day by Day</h2>
                <ol className="space-y-5 border-l border-grey-line pl-6">
                  {(pkg.itinerary ?? []).map((d) => (
                    <li key={d.day} className="relative">
                      <span className="absolute -left-[31px] h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
                      <div className="eyebrow !text-[10px]">Day {d.day}</div>
                      <div className="font-display text-xl text-charcoal mt-0.5">{d.title}</div>
                      <ul className="mt-2 text-sm text-grey-soft space-y-1">
                        {d.activities.map((a) => <li key={a}>· {a}</li>)}
                      </ul>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Inc/Exc */}
              <section className="mt-12 grid sm:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-accent text-xs text-gold-dark mb-4">Included</h2>
                  <ul className="space-y-2 text-sm">
                    {pkg.inclusions.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-charcoal">
                        <Check size={15} className="text-success mt-0.5 shrink-0" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-accent text-xs text-gold-dark mb-4">Not Included</h2>
                  <ul className="space-y-2 text-sm">
                    {pkg.exclusions.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-grey-soft">
                        <X size={15} className="text-destructive mt-0.5 shrink-0" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Sticky booking */}
            <aside>
              <form onSubmit={onBook} className="card-luxe p-6 lg:sticky lg:top-28">
                <div className="flex items-center gap-2 text-gold mb-2">
                  {Array.from({ length: pkg.hotel_stars }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                  <span className="text-[11px] eyebrow !text-grey-soft ml-1">{pkg.duration_days} days</span>
                </div>
                <div className="font-display text-4xl text-gold-dark">${Number(pkg.price_usd).toLocaleString()}</div>
                <div className="text-xs text-grey-soft mt-1">per person · all inclusive</div>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="text-[11px] eyebrow">Travelers</span>
                    <input
                      type="number"
                      min={1}
                      max={pkg.max_travelers}
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, Math.min(pkg.max_travelers, +e.target.value || 1)))}
                      className="mt-1 w-full bg-beige/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] eyebrow">Travel Date</span>
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="mt-1 w-full bg-beige/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] eyebrow">Special Requests</span>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      maxLength={500}
                      placeholder="Dietary needs, anniversary, etc."
                      className="mt-1 w-full bg-beige/50 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                    />
                  </label>
                </div>

                <div className="mt-5 pt-5 border-t border-grey-line flex items-end justify-between">
                  <span className="text-sm text-grey-soft">Total</span>
                  <span className="font-display text-2xl text-charcoal">
                    ${total.toLocaleString()} <span className="text-xs text-grey-soft">USD</span>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full justify-center mt-5 disabled:opacity-60"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : "Book Now"}
                </button>

                <div className="mt-4 flex items-center justify-around text-[10px] eyebrow !text-grey-soft">
                  <span>🔒 Secure</span><span>✉ Instant</span><span>📞 24/7</span>
                </div>

                <div className="mt-5 pt-5 border-t border-grey-line flex items-center gap-3 text-[11px] text-grey-soft">
                  <Car size={14} className="text-gold-dark" /> Private
                  <Hotel size={14} className="text-gold-dark" /> Hotels
                  <Compass size={14} className="text-gold-dark" /> Guide
                  <Ticket size={14} className="text-gold-dark" /> Tickets
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
