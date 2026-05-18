'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { 
  Loader2, Calendar, DollarSign, CheckCircle, Clock, 
  LayoutDashboard, Briefcase, Users, BarChart3, Settings, 
  Bell, Search, Compass, Globe, Shield, Star, Menu, X,
  ArrowUpRight, TrendingUp, MapPin, Plane, Car, Sparkles,
  Zap, Crown, Target, Activity, ZapOff, MessageSquare, 
  CreditCard, Award
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from "recharts";

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

const MINI_CHART_DATA = [
  { v: 10 }, { v: 15 }, { v: 8 }, { v: 22 }, { v: 18 }, { v: 25 }, { v: 30 }
];

const ACTIVITY_FEED = [
  { id: 1, type: "booking", user: "John Doe", detail: "booked 'Southern Shores'", time: "2 mins ago" },
  { id: 2, type: "payment", user: "Elena R.", detail: "paid $5,000", time: "15 mins ago" },
  { id: 3, type: "message", user: "Julian V.", detail: "requested custom itinerary", time: "1 hour ago" },
];

const VEHICLES = [
  { id: 1, name: "Luxury SUV (BMW X5)", status: "On Tour", driver: "Gamini" },
  { id: 2, name: "Premium Van (Toyota KDH)", status: "Available", driver: "Nimal" },
  { id: 3, name: "Helicopter (Bell 206)", status: "Maintenance", driver: "Capt. Silva" },
];

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "packages">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [loading, user, router]);

  const bookings = MOCK_BOOKINGS;
  const packages = MOCK_PACKAGES;

  if (loading || !user || !mounted) {
    return (
      <div className="min-h-screen bg-[#020617] grid place-items-center">
        <div className="relative flex flex-col items-center">
          <div className="h-20 w-20 border-2 border-gold/10 border-t-gold rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gold font-display tracking-widest">LUXE</div>
          <div className="mt-6 text-white/40 text-xs uppercase tracking-[0.3em]">Initializing OS</div>
        </div>
      </div>
    );
  }

  const displayBookings = bookings;
  const displayPackages = packages;

  const totalRevenue = displayBookings.reduce((sum, b) => sum + Number(b.total_usd), 0);
  const pendingBookings = displayBookings.filter((b) => b.status === "pending").length;

  return (
    <div className="bg-[#020617] text-white min-h-screen flex font-sans overflow-hidden text-[13px]">
      
      {/* ── IMMERSIVE BACKGROUND ── */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#0EA5E9_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#D4AF37_0%,transparent_50%)] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/40 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-gold/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMzAgMEwzMCA2ME0wIDMMEw2MCAzMCIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      </div>

      {/* ── FLOATING SIDEBAR ── */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[240px] m-4 mr-0 bg-[#07111F]/60 backdrop-blur-3xl border border-white/5 rounded-3xl transition-all duration-500 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex lg:flex-col lg:h-[calc(100vh-32px)] lg:self-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-gold to-amber-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Compass className="text-[#020617]" size={20} />
            </div>
            <div>
              <div className="font-display text-sm tracking-[0.2em] font-bold text-white">LUXE OS</div>
              <div className="text-[10px] text-gold/60 uppercase tracking-widest font-medium">Vanguard v1.1</div>
            </div>
          </div>
          <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-2">
          <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-4 px-3">Command Hub</div>
          <nav className="space-y-1">
            <SidebarLink icon={LayoutDashboard} label="Command Center" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
            <SidebarLink icon={Briefcase} label="Live Bookings" active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")} badge="3" />
            <SidebarLink icon={Globe} label="Destinations" />
            <SidebarLink icon={Plane} label="Tour Manifest" active={activeTab === "packages"} onClick={() => setActiveTab("packages")} />
            <SidebarLink icon={Car} label="Fleet Status" />
            <SidebarLink icon={Users} label="Explorers" />
            <SidebarLink icon={BarChart3} label="Neural Analytics" />
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-white/5">
          <SidebarLink icon={Settings} label="System Config" />
          <SidebarLink icon={Shield} label="Security Core" />
          
          <div className="mt-4 p-4 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent rounded-2xl border border-[#0EA5E9]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#0EA5E9]/10 rounded-full blur-xl"></div>
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="text-xs font-bold text-white">System Optimal</div>
            </div>
            <div className="text-[10px] text-white/50 leading-relaxed relative z-10">Quantum grid operational. All nodes synced.</div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-grow flex flex-col h-screen overflow-y-auto relative z-10 lg:pl-0 p-4">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-[#020617]/40 backdrop-blur-xl border border-white/5 rounded-2xl px-6 py-3 flex items-center justify-between mb-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-white/70" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={14} />
              <input
                type="text"
                placeholder="Query database..."
                className="bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 transition-all text-white placeholder-white/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-white/50 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-gold rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-4 bg-white/5 p-1 pr-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="h-8 w-8 bg-gradient-to-tr from-gold to-amber-600 rounded-lg flex items-center justify-center font-bold text-[#020617] text-xs">
                A
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-white">Director Account</div>
                <div className="text-[10px] text-white/40">{user.email}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="space-y-4 flex-grow">
          
          {/* ⚡ CINEMATIC HERO SECTION ⚡ */}
          <div className="relative overflow-hidden rounded-3xl bg-[#07111F]/40 border border-white/5 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
            <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-[10s]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#07111F]/80 to-transparent z-0"></div>
            <div className="absolute top-[-50%] right-[-20%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] z-0 animate-pulse"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Sector: Global Operations</div>
                  <Sparkles size={12} className="text-gold animate-pulse" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-light text-white leading-tight mb-2">
                  Welcome back, <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold bg-[length:200%_auto] animate-gradient-text">Director</span>
                </h1>
                <p className="text-white/60 text-xs max-w-xl leading-relaxed">
                  Your tourism empire is scaling. Revenue is up <span className="text-emerald-400 font-bold">+24.5%</span> this month. All systems optimal.
                </p>
              </div>
              
              <div className="flex gap-3 shrink-0">
                <button className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-3 px-6 rounded-xl border border-white/10 transition-all flex items-center gap-2 backdrop-blur-xl">
                  System Logs
                </button>
                <button className="bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-[#020617] text-xs font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.3)] border border-gold/20">
                  Deploy Mission <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {activeTab === "overview" && (
            <>
              {/* 📊 STATS GRID WITH MINI CHARTS 📊 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <GlassCard 
                  icon={DollarSign} 
                  label="Total Revenue" 
                  value={`$${totalRevenue.toLocaleString()}`} 
                  subtext="+12.5% from last month"
                  trend="up"
                  color="from-emerald-500/20 to-transparent"
                  borderColor="border-emerald-500/20"
                  chartData={MINI_CHART_DATA}
                />
                <GlassCard 
                  icon={Briefcase} 
                  label="Active Missions" 
                  value={displayBookings.length.toString()} 
                  subtext="+3 initiated today"
                  trend="up"
                  color="from-gold/20 to-transparent"
                  borderColor="border-gold/20"
                  chartData={MINI_CHART_DATA.map(d => ({ v: d.v * 0.7 }))}
                />
                <GlassCard 
                  icon={Clock} 
                  label="Pending Ops" 
                  value={pendingBookings.toString()} 
                  subtext="Requires attention"
                  trend="down"
                  color="from-amber-500/20 to-transparent"
                  borderColor="border-amber-500/20"
                  chartData={MINI_CHART_DATA.map(d => ({ v: 30 - d.v }))}
                />
                <GlassCard 
                  icon={Users} 
                  label="Total Explorers" 
                  value="1,284" 
                  subtext="+18% growth"
                  trend="up"
                  color="from-blue-500/20 to-transparent"
                  borderColor="border-blue-500/20"
                  chartData={MINI_CHART_DATA.map(d => ({ v: d.v + 5 }))}
                />
              </div>

              {/* 📈 CHARTS & PANELS 📈 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Revenue Chart - 2/3 Width */}
                <div className="lg:col-span-2 bg-[#07111F]/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Financial Trajectory</div>
                      <h2 className="text-xl font-display font-light text-white">Revenue Scaling</h2>
                    </div>
                    <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/5">
                      <button className="text-[10px] bg-gold/20 px-3 py-1.5 rounded-md text-gold font-bold uppercase">Month</button>
                    </div>
                  </div>
                  
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: "#07111F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", backdropFilter: "blur(20px)" }}
                          itemStyle={{ color: "#fff", fontSize: "11px" }}
                          labelStyle={{ color: "#94a3b8", fontSize: "10px", fontWeight: "bold" }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" dot={{ fill: "#D4AF37", r: 4 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 📋 CUSTOMER ACTIVITY FEED 📋 */}
                <div className="bg-[#07111F]/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                  <div className="mb-6">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Live Feed</div>
                    <h2 className="text-xl font-display font-light text-white">Explorer Activity</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {ACTIVITY_FEED.map((act) => (
                      <div key={act.id} className="flex items-start gap-3 border-b border-white/5 pb-3 last:border-0">
                        <div className="h-8 w-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                          {act.type === "booking" && <Compass className="text-gold" size={14} />}
                          {act.type === "payment" && <CreditCard className="text-emerald-400" size={14} />}
                          {act.type === "message" && <MessageSquare className="text-blue-400" size={14} />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{act.user} <span className="font-normal text-white/60">{act.detail}</span></div>
                          <div className="text-[10px] text-white/30 mt-0.5">{act.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 📋 THIRD ROW: OPERATIONS & FLEET 📋 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Booking Table (2/3) */}
                <div className="lg:col-span-2 bg-[#07111F]/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Mission Log</div>
                      <h2 className="text-xl font-display font-light text-white">Recent Operations</h2>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-[10px] uppercase tracking-[0.2em] text-white/30 border-b border-white/5">
                        <tr>
                          <th className="px-4 py-3 font-bold">Ref</th>
                          <th className="px-4 py-3 font-bold">Subject</th>
                          <th className="px-4 py-3 font-bold">Launch Date</th>
                          <th className="px-4 py-3 font-bold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs">
                        {displayBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                            <td className="px-4 py-4 font-bold text-white group-hover:text-gold transition-colors">{b.booking_ref}</td>
                            <td className="px-4 py-4">
                              <div className="font-bold text-white">{b.full_name}</div>
                              <div className="text-[10px] text-white/30">{b.email}</div>
                            </td>
                            <td className="px-4 py-4 text-white/50">{format(parseISO(b.travel_date), "dd MMM yyyy")}</td>
                            <td className="px-4 py-4">
                              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                                b.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
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

                {/* 🚗 VEHICLE AVAILABILITY PANEL 🚗 */}
                <div className="bg-[#07111F]/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                  <div className="mb-6">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Fleet Status</div>
                    <h2 className="text-xl font-display font-light text-white">Vehicle Availability</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {VEHICLES.map((veh) => (
                      <div key={veh.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-white/5 rounded-lg flex items-center justify-center">
                            {veh.id === 3 ? <Plane className="text-white/70" size={14} /> : <Car className="text-white/70" size={14} />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{veh.name}</div>
                            <div className="text-[10px] text-white/30">Driver: {veh.driver}</div>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          veh.status === "Available" ? "bg-emerald-500/10 text-emerald-400" :
                          veh.status === "On Tour" ? "bg-gold/10 text-gold" : "bg-red-500/10 text-red-400"
                        }`}>
                          {veh.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <div className="bg-[#07111F]/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
              <div className="mb-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Complete Ledger</div>
                <h2 className="text-xl font-display font-light text-white">All Operations</h2>
              </div>
              
              {/* Table repeated or simplified */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[10px] uppercase tracking-[0.2em] text-white/30 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4 font-bold">Ref</th>
                      <th className="px-6 py-4 font-bold">Subject</th>
                      <th className="px-6 py-4 font-bold">Sector</th>
                      <th className="px-6 py-4 font-bold">Date</th>
                      <th className="px-6 py-4 font-bold">Value</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {displayBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4 font-bold text-white group-hover:text-gold transition-colors">{b.booking_ref}</td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{b.full_name}</div>
                          <div className="text-[10px] text-white/30">{b.email}</div>
                        </td>
                        <td className="px-6 py-4 text-white/70">{b.packages?.title || "Unknown"}</td>
                        <td className="px-6 py-4 text-white/50">{format(parseISO(b.travel_date), "dd MMM yyyy")}</td>
                        <td className="px-6 py-4 font-bold text-gold">${Number(b.total_usd).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                            b.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
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
            <div className="bg-[#07111F]/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Asset Ledger</div>
                  <h2 className="text-xl font-display font-light text-white">Package Manifest</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayPackages.map((p) => (
                  <div key={p.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-all relative group overflow-hidden hover:border-gold/20 hover:scale-[1.02] duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/20 group-hover:scale-110 transition-transform">
                          <Compass className="text-gold" size={18} />
                        </div>
                        {p.is_featured && (
                          <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">Featured</span>
                        )}
                      </div>
                      <h3 className="font-display text-lg text-white mb-1 font-light group-hover:text-gold transition-colors">{p.title}</h3>
                      <p className="text-[10px] text-white/40 mb-4 uppercase tracking-wider">{p.duration_days} Day Mission</p>
                      
                      <div className="flex justify-between items-end border-t border-white/5 pt-4">
                        <div>
                          <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Allocation</div>
                          <div className="text-xl font-bold text-white">${Number(p.price_usd).toLocaleString()}</div>
                        </div>
                        <button className="text-xs text-gold/70 hover:text-white transition-colors flex items-center gap-1 font-bold uppercase tracking-wider">
                          Modify <ArrowUpRight size={12} />
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
        <footer className="bg-[#020617]/40 backdrop-blur-xl border border-white/5 rounded-2xl px-6 py-4 mt-4 flex flex-col md:flex-row justify-between gap-4 text-[10px] text-white/30 uppercase tracking-wider font-bold shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <span>© {new Date().getFullYear()} Quantum Luxe OS. Powered by Tour Buddy.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">API Status</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SidebarLink({ icon: Icon, label, active = false, onClick, badge }: { icon: any; label: string; active?: boolean; onClick?: () => void; badge?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 relative group ${
        active 
          ? "bg-gradient-to-r from-gold/10 to-transparent text-gold border-l-2 border-gold" 
          : "text-white/40 hover:text-white hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={16} className={active ? "text-gold" : "text-white/40 group-hover:text-white transition-colors"} />
        <span className="uppercase tracking-wider">{label}</span>
      </div>
      {badge && (
        <span className="bg-gold/20 text-gold text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[16px] text-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function GlassCard({ icon: Icon, label, value, subtext, trend, color, borderColor, chartData }: { icon: any; label: string; value: string; subtext: string; trend: "up" | "down"; color: string; borderColor: string; chartData?: any[] }) {
  return (
    <div className={`bg-[#07111F]/40 backdrop-blur-3xl border ${borderColor} rounded-2xl p-5 relative overflow-hidden group hover:border-white/20 transition-all duration-500 hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.2)]`}>
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${color} blur-2xl z-0 group-hover:scale-125 transition-transform duration-700`}></div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="h-9 w-9 bg-white/5 rounded-lg flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors">
            <Icon size={16} className="text-white/70 group-hover:text-white transition-colors" />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${trend === "up" ? "text-emerald-400" : "text-amber-400"}`}>
            {trend === "up" ? <TrendingUp size={12} /> : <Clock size={12} />}
            {trend === "up" ? "+12%" : "Wait"}
          </span>
        </div>
        <div>
          <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">{label}</div>
          <div className="text-2xl font-light text-white mb-1 font-display group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gold transition-all">{value}</div>
          
          {/* Mini Chart */}
          {chartData && (
            <div className="h-[40px] mt-2 mb-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={`color-${label}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={trend === "up" ? "#10B981" : "#F59E0B"} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={trend === "up" ? "#10B981" : "#F59E0B"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke={trend === "up" ? "#10B981" : "#F59E0B"} strokeWidth={1.5} fill={`url(#color-${label})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
          
          <div className="text-[10px] text-white/20 font-medium">{subtext}</div>
        </div>
      </div>
    </div>
  );
}
