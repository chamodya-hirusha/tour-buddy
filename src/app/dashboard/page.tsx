'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { 
  Calendar, MapPin, Compass, Clock, CheckCircle, 
  User, CreditCard, Settings, LogOut, ArrowRight, Loader2 
} from "lucide-react";
import Link from "next/link";

const MOCK_BOOKINGS = [
  {
    id: "1",
    booking_ref: "BK-1001",
    status: "confirmed",
    travel_date: "2026-06-15",
    num_travelers: 2,
    total_usd: 2500,
    package: { title: "Sigiriya & Cultural Triangle", slug: "sigiriya-cultural-triangle" },
  },
  {
    id: "2",
    booking_ref: "BK-1002",
    status: "pending",
    travel_date: "2026-07-20",
    num_travelers: 4,
    total_usd: 5000,
    package: { title: "Southern Shores & Whales", slug: "southern-shores-whales" },
  },
];

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background grid place-items-center">
        <div className="relative">
          <div className="h-16 w-16 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gold font-medium">Luxe</div>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar solid />

      <main className="flex-grow pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <div className="eyebrow mb-1">Explorer Account</div>
              <h1 className="font-display text-4xl text-charcoal font-light">
                Welcome back, <em className="text-gold-dark">{user.user_metadata?.full_name || "Traveler"}</em>
              </h1>
              <p className="text-sm text-grey-soft mt-1">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 text-sm text-grey-soft hover:text-red-500 transition-colors"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
            
            {/* ── Sidebar Nav ── */}
            <aside>
              <nav className="space-y-1">
                <SidebarLink 
                  icon={Compass} 
                  label="My Bookings" 
                  active={activeTab === "bookings"} 
                  onClick={() => setActiveTab("bookings")} 
                />
                <SidebarLink 
                  icon={User} 
                  label="Profile" 
                  active={activeTab === "profile"} 
                  onClick={() => setActiveTab("profile")} 
                />
                <SidebarLink 
                  icon={CreditCard} 
                  label="Payments" 
                  active={activeTab === "payments"} 
                  onClick={() => setActiveTab("payments")} 
                />
                <SidebarLink 
                  icon={Settings} 
                  label="Settings" 
                  active={activeTab === "settings"} 
                  onClick={() => setActiveTab("settings")} 
                />
              </nav>
            </aside>

            {/* ── Content Area ── */}
            <div className="card-luxe p-8">
              {activeTab === "bookings" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-display text-2xl text-charcoal">Your Journeys</h2>
                    <Link href="/packages" className="btn-gold text-xs py-2 px-4">
                      Browse More Tours
                    </Link>
                  </div>

                  {MOCK_BOOKINGS.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-grey-line rounded-xl">
                      <Compass className="mx-auto text-grey-soft mb-3" size={32} />
                      <p className="text-sm text-grey-soft">You haven't booked any journeys yet.</p>
                      <Link href="/packages" className="text-gold-dark text-sm font-medium hover:underline mt-2 inline-block">
                        Find your first adventure
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {MOCK_BOOKINGS.map((booking) => (
                        <div key={booking.id} className="border border-grey-line rounded-xl p-6 hover:shadow-card transition-all">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-xs font-semibold text-gold-dark uppercase tracking-wider">
                                  Ref: {booking.booking_ref}
                                </span>
                                <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                                  booking.status === "confirmed" 
                                    ? "bg-forest/10 text-forest" 
                                    : "bg-gold/10 text-gold-dark"
                                }`}>
                                  {booking.status}
                                </span>
                              </div>
                              <h3 className="font-display text-xl text-charcoal mb-2">
                                {booking.package.title}
                              </h3>
                              <div className="flex flex-wrap gap-4 text-xs text-grey-soft">
                                <div className="flex items-center gap-1.5">
                                  <Calendar size={14} className="text-gold-dark" />
                                  {booking.travel_date}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <User size={14} className="text-gold-dark" />
                                  {booking.num_travelers} {booking.num_travelers === 1 ? "Traveler" : "Travelers"}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                              <div className="text-lg font-semibold text-charcoal">
                                ${booking.total_usd.toLocaleString()}
                              </div>
                              <Link 
                                href={`/packages/${booking.package.slug}`}
                                className="text-xs text-gold-dark hover:text-charcoal transition-colors flex items-center gap-1"
                              >
                                View Itinerary <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "profile" && (
                <div>
                  <h2 className="font-display text-2xl text-charcoal mb-6">Profile Details</h2>
                  <p className="text-sm text-grey-soft">Profile editing is disabled in the demo.</p>
                </div>
              )}

              {activeTab === "payments" && (
                <div>
                  <h2 className="font-display text-2xl text-charcoal mb-6">Payment History</h2>
                  <p className="text-sm text-grey-soft">No payment records found.</p>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="font-display text-2xl text-charcoal mb-6">Account Settings</h2>
                  <p className="text-sm text-grey-soft">Settings are disabled in the demo.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active = false, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active 
          ? "bg-beige text-gold-dark border-l-2 border-gold-dark" 
          : "text-grey-soft hover:text-charcoal hover:bg-beige/30"
      }`}
    >
      <Icon size={18} className={active ? "text-gold-dark" : "text-grey-soft"} />
      {label}
    </button>
  );
}
