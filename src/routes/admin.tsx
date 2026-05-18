import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { 
  Loader2, Calendar, DollarSign, CheckCircle, Clock, 
  LayoutDashboard, Briefcase, Users, BarChart3, Settings, 
  Bell, Search, Compass, Globe, Shield, Star, Menu, X,
  ArrowUpRight, TrendingUp, MapPin, Plane, Car
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Quantum — Premium Admin Panel" },
    ],
  }),
  component: AdminPage,
});

type BookingRow = {
  id: string;
  booking_ref: string;
  status: string;
  payment_status: string;
  travel_date: string;
  num_travelers: number;
  total_usd: number;
  created_at: string;
  full_name: string;
  email: string;
  packages: { title: string; slug: string } | null;
};

type PackageRow = {
  id: string;
  title: string;
  slug: string;
  price_usd: number;
  duration_days: number;
  is_featured: boolean;
};

const MOCK_BOOKINGS: BookingRow[] = [
  {
    id: "1",
    booking_ref: "BK-1001",
    status: "confirmed",
    payment_status: "paid",
    travel_date: "2026-06-15",
    num_travelers: 2,
    total_usd: 2500,
    created_at: "2026-05-01",
    full_name: "Alexander Mercer",
    email: "alexander@vanguard.com",
    packages: { title: "Sigiriya & Cultural Triangle", slug: "sigiriya-cultural-triangle" },
  },
  {
    id: "2",
    booking_ref: "BK-1002",
    status: "pending",
    payment_status: "pending",
    travel_date: "2026-07-20",
    num_travelers: 4,
    total_usd: 5000,
    created_at: "2026-05-10",
    full_name: "Elena Rostova",
    email: "elena@elysium.io",
    packages: { title: "Southern Shores & Whales", slug: "southern-shores-whales" },
  },
  {
    id: "3",
    booking_ref: "BK-1003",
    status: "confirmed",
    payment_status: "paid",
    travel_date: "2026-08-05",
    num_travelers: 1,
    total_usd: 1800,
    created_at: "2026-05-12",
    full_name: "Julian Voss",
    email: "julian@voss.de",
    packages: { title: "Tea Country Highlands", slug: "tea-country-highlands" },
  },
];

const MOCK_PACKAGES: PackageRow[] = [
  { id: "1", title: "Sigiriya & Cultural Triangle", slug: "sigiriya-cultural", price_usd: 1250, duration_days: 7, is_featured: true },
  { id: "2", title: "Southern Shores & Whales", slug: "southern-shores", price_usd: 1500, duration_days: 10, is_featured: false },
  { id: "3", title: "Tea Country Highlands", slug: "tea-country", price_usd: 900, duration_days: 5, is_featured: true },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 12000, bookings: 5 },
  { month: "Feb", revenue: 18000, bookings: 8 },
  { month: "Mar", revenue: 15000, bookings: 6 },
  { month: "Apr", revenue: 25000, bookings: 12 },
  { month: "May", revenue: 32000, bookings: 15 },
  { month: "Jun", revenue: 40000, bookings: 18 },
  { month: "Jul", revenue: 38000, bookings: 17 },
];

const DESTINATION_DATA = [
  { name: "Colombo", value: 35 },
  { name: "Kandy", value: 25 },
  { name: "Galle", value: 20 },
  { name: "Sigiriya", value: 15 },
  { name: "Ella", value: 5 },
];

function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "packages">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth" });
    }
  }, [loading, user, navigate]);

  const { data: bookings } = useQuery({
    enabled: !!user,
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, packages(title, slug)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as BookingRow[];
    },
  });

  const { data: packages } = useQuery({
    enabled: !!user,
    queryKey: ["admin-packages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("id, title, slug, price_usd, duration_days, is_featured")
        .order("price_usd", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as PackageRow[];
    },
  });

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#020617] grid place-items-center">
        <div className="relative">
          <div className="h-16 w-16 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gold font-medium">Luxe</div>
        </div>
      </div>
    );
  }

  const displayBookings = (bookings && bookings.length > 0) ? bookings : MOCK_BOOKINGS;
  const displayPackages = (packages && packages.length > 0) ? packages : MOCK_PACKAGES;

  const totalRevenue = displayBookings.reduce((sum, b) => sum + Number(b.total_usd), 0);
  const pendingBookings = displayBookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = displayBookings.filter((b) => b.status === "confirmed").length;

  return (
    <div className="bg-[#020617] text-white min-h-screen flex font-sans overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[100px] z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] z-0"></div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#07111F]/80 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex lg:flex-col`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-gold/20 rounded-xl flex items-center justify-center border border-gold/30">
              <Compass className="text-gold" size={18} />
            </div>
            <div>
              <div className="font-accent text-[13px] tracking-[0.2em] font-medium text-white">QUANTUM</div>
              <div className="text-[10px] text-grey-soft uppercase tracking-wider">Luxe OS</div>
            </div>
          </div>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-grow px-4 py-2 space-y-1">
          <SidebarLink icon={LayoutDashboard} label="Command Center" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <SidebarLink icon={Briefcase} label="Bookings" active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")} />
          <SidebarLink icon={Globe} label="Destinations" />
          <SidebarLink icon={Plane} label="Tours" active={activeTab === "packages"} onClick={() => setActiveTab("packages")} />
          <SidebarLink icon={Car} label="Fleet" />
          <SidebarLink icon={Users} label="Explorers" />
          <SidebarLink icon={BarChart3} label="Analytics" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <SidebarLink icon={Settings} label="System Config" />
          <SidebarLink icon={Shield} label="Security" />
          <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="text-xs font-medium text-white">System Optimal</div>
            </div>
            <div className="text-[11px] text-grey-soft">All nodes operational. Data syncing in real-time.</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-y-auto relative z-10">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/30" size={16} />
              <input
                type="text"
                placeholder="Search quantum database..."
                className="bg-white/5 border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-white/70 hover:text-white transition">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-gold rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-white">Command Center</div>
                <div className="text-xs text-grey-soft">{user.email}</div>
              </div>
              <div className="h-10 w-10 bg-gradient-to-tr from-gold to-blue-600 rounded-full flex items-center justify-center font-bold border-2 border-[#020617] shadow-lg">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-6 space-y-6 flex-grow">
          
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-[#07111F]/60 border border-white/5 p-8">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-gold/20 via-blue-900/10 to-transparent blur-3xl z-0"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-1">SYSTEM STATUS: OPERATIONAL</div>
                <h1 className="text-4xl md:text-5xl font-display font-light text-white leading-tight">
                  Welcome back, <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold">Director</span>
                </h1>
                <p className="text-grey-soft mt-2 text-sm max-w-xl">
                  Your tourism empire is scaling. Revenue is up <span className="text-emerald-400 font-medium">+24%</span> this month. All systems optimal.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="bg-white/5 hover:bg-white/10 text-white text-sm font-medium py-3 px-6 rounded-full border border-white/10 transition-all flex items-center gap-2">
                  System Logs
                </button>
                <button className="bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-[#020617] text-sm font-medium py-3 px-6 rounded-full transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Launch Mission <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {activeTab === "overview" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard 
                  icon={DollarSign} 
                  label="Total Revenue" 
                  value={`$${totalRevenue.toLocaleString()}`} 
                  subtext="+12.5% from last month"
                  trend="up"
                  color="from-emerald-500/20 to-emerald-500/5"
                />
                <GlassCard 
                  icon={Briefcase} 
                  label="Active Bookings" 
                  value={displayBookings.length.toString()} 
                  subtext="+3 new today"
                  trend="up"
                  color="from-gold/20 to-gold/5"
                />
                <GlassCard 
                  icon={Clock} 
                  label="Pending Ops" 
                  value={pendingBookings.toString()} 
                  subtext="Requires attention"
                  trend="down"
                  color="from-amber-500/20 to-amber-500/5"
                />
                <GlassCard 
                  icon={Users} 
                  label="Total Explorers" 
                  value="1,284" 
                  subtext="+18% growth"
                  trend="up"
                  color="from-blue-500/20 to-blue-500/5"
                />
              </div>

              {/* Charts & Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-[#07111F]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-lg font-medium text-white">Revenue Trajectory</h2>
                      <p className="text-xs text-grey-soft">Monthly financial scaling</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs bg-white/5 px-3 py-1.5 rounded-full text-white/70 hover:text-white transition">Week</button>
                      <button className="text-xs bg-gold/20 px-3 py-1.5 rounded-full text-gold font-medium">Month</button>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} />
                        <XAxis dataKey="month" stroke="#475569" fontSize={11} />
                        <YAxis stroke="#475569" fontSize={11} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#07111F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                          itemStyle={{ color: "#fff" }}
                          labelStyle={{ color: "#94a3b8" }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Popular Destinations */}
                <div className="bg-[#07111F]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-white">Sector Popularity</h2>
                    <p className="text-xs text-grey-soft">Top performing destinations</p>
                  </div>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DESTINATION_DATA} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.1} horizontal={false} />
                        <XAxis type="number" stroke="#475569" fontSize={11} hide />
                        <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={60} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#07111F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                          itemStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="value" fill="#0EA5E9" radius={[0, 10, 10, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 text-center text-xs text-grey-soft">
                    Quantum Data Visualization
                  </div>
                </div>
              </div>

              {/* Recent Bookings Table */}
              <div className="bg-[#07111F]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-white">Recent Operations</h2>
                    <p className="text-xs text-grey-soft">Latest mission entries</p>
                  </div>
                  <button onClick={() => setActiveTab("bookings")} className="text-xs text-gold hover:text-white transition-colors flex items-center gap-1">
                    View All <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase tracking-wider text-grey-soft border-b border-white/5">
                      <tr>
                        <th className="px-6 py-4">Operation Ref</th>
                        <th className="px-6 py-4">Subject</th>
                        <th className="px-6 py-4">Sector</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {displayBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{b.booking_ref}</td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">{b.full_name}</div>
                            <div className="text-xs text-grey-soft">{b.email}</div>
                          </td>
                          <td className="px-6 py-4 text-white/70">{b.packages?.title || "Unknown"}</td>
                          <td className="px-6 py-4 text-white/70">{format(parseISO(b.travel_date), "dd MMM yyyy")}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                              b.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : b.status === "cancelled" ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <div className="bg-[#07111F]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-white">All Operations</h2>
                <p className="text-xs text-grey-soft">Comprehensive mission log</p>
              </div>
              {/* Full Bookings Table (styled similar to above) */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase tracking-wider text-grey-soft border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4">Ref</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Sector</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Value</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {displayBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{b.booking_ref}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{b.full_name}</div>
                          <div className="text-xs text-grey-soft">{b.email}</div>
                        </td>
                        <td className="px-6 py-4 text-white/70">{b.packages?.title || "Unknown"}</td>
                        <td className="px-6 py-4 text-white/70">{format(parseISO(b.travel_date), "dd MMM yyyy")}</td>
                        <td className="px-6 py-4 font-medium text-gold">${Number(b.total_usd).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                            b.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : b.status === "cancelled" ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "packages" && (
            <div className="bg-[#07111F]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-white">Package Manifest</h2>
                <p className="text-xs text-grey-soft">Curated mission offerings</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPackages.map((p) => (
                  <div key={p.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/20">
                          <Compass className="text-gold" size={20} />
                        </div>
                        {p.is_featured && (
                          <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Featured</span>
                        )}
                      </div>
                      <h3 className="font-display text-xl text-white mb-1 font-light">{p.title}</h3>
                      <p className="text-xs text-grey-soft mb-4">{p.duration_days} Day Mission</p>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-[10px] text-grey-soft uppercase tracking-wider">Value</div>
                          <div className="text-2xl font-medium text-white">${Number(p.price_usd).toLocaleString()}</div>
                        </div>
                        <button className="text-xs text-gold hover:text-white transition-colors flex items-center gap-1">
                          Edit <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-[#020617]/80 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col md:flex-row justify-between gap-4 text-xs text-grey-soft">
          <span>© {new Date().getFullYear()} Quantum Luxe OS. Powered by Tour Buddy.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold transition">Terms</a>
            <a href="#" className="hover:text-gold transition">Privacy</a>
            <a href="#" className="hover:text-gold transition">API Status</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active = false, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active 
          ? "bg-gradient-to-r from-gold/20 to-transparent text-gold border-l-2 border-gold" 
          : "text-white/60 hover:text-white hover:bg-white/5"
      }`}
    >
      <Icon size={18} className={active ? "text-gold" : "text-white/60"} />
      {label}
    </button>
  );
}

function GlassCard({ icon: Icon, label, value, subtext, trend, color }: { icon: any; label: string; value: string; subtext: string; trend: "up" | "down"; color: string }) {
  return (
    <div className="bg-[#07111F]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${color} blur-xl z-0`}></div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-gold/30 transition-colors">
            <Icon size={18} className="text-white/70 group-hover:text-gold transition-colors" />
          </div>
          <span className={`text-xs font-medium flex items-center gap-1 ${trend === "up" ? "text-emerald-400" : "text-amber-400"}`}>
            {trend === "up" ? <TrendingUp size={14} /> : <Clock size={14} />}
            {trend === "up" ? "+12%" : "Wait"}
          </span>
        </div>
        <div>
          <div className="text-xs text-grey-soft uppercase tracking-wider mb-1">{label}</div>
          <div className="text-3xl font-light text-white mb-1 font-display">{value}</div>
          <div className="text-xs text-grey-soft/80">{subtext}</div>
        </div>
      </div>
    </div>
  );
}
