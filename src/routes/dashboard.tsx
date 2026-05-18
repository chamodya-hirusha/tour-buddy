import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { format, differenceInDays, parseISO } from "date-fns";
import { Calendar, Download, Loader2, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Tour Buddy" }] }),
  component: Dashboard,
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
  packages: { title: string; slug: string; duration_days: number; hotel_stars: number } | null;
};

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
    if (!loading && user && user.email === "admin@gmail.com") {
      navigate({ to: "/admin" });
    }
  }, [loading, user, navigate]);

  const { data: bookings, isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, packages(title, slug, duration_days, hotel_stars)")
        .order("travel_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as BookingRow[];
    },
  });

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background grid place-items-center">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );
  }

  const today = new Date();
  const upcoming = (bookings ?? []).filter((b) => parseISO(b.travel_date) >= today);
  const past = (bookings ?? []).filter((b) => parseISO(b.travel_date) < today);
  const totalSpent = (bookings ?? []).reduce((s, b) => s + Number(b.total_usd), 0);

  const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "traveler";

  return (
    <div className="bg-background">
      <Navbar solid={true} />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="eyebrow">Your Dashboard</div>
              <h1 className="font-display text-4xl md:text-5xl text-charcoal mt-2">
                Welcome back, <em className="text-gold-dark">{name}</em> 🌿
              </h1>
            </div>
            <Link to="/packages" className="btn-gold !py-2.5 !px-5 text-sm">
              Browse packages <ArrowRight size={14} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <Stat label="Total trips" value={(bookings ?? []).length.toString()} />
            <Stat label="Upcoming" value={upcoming.length.toString()} />
            <Stat label="Completed" value={past.length.toString()} />
            <Stat label="Spent" value={`$${totalSpent.toLocaleString()}`} />
          </div>

          {isLoading ? (
            <div className="py-20 text-center"><Loader2 className="mx-auto animate-spin text-gold" /></div>
          ) : (
            <>
              {/* Upcoming */}
              <Section title="Upcoming Journeys">
                {upcoming.length === 0 ? (
                  <Empty msg="No upcoming trips yet — your next adventure awaits." />
                ) : (
                  <div className="space-y-4">
                    {upcoming.map((b) => <BookingItem key={b.id} b={b} highlight />)}
                  </div>
                )}
              </Section>

              {/* History + Invoices combined */}
              <Section title="Booking History & Invoices">
                {(bookings ?? []).length === 0 ? (
                  <Empty msg="No bookings to show." />
                ) : (
                  <div className="space-y-4">
                    {(bookings ?? []).map((b) => <BookingItem key={b.id} b={b} />)}
                  </div>
                )}
              </Section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-luxe p-5">
      <div className="eyebrow !text-[10px]">{label}</div>
      <div className="font-display text-3xl text-charcoal mt-2">{value}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-accent text-xs text-gold-dark mb-5">{title}</h2>
      {children}
    </section>
  );
}

function Empty({ msg }: { msg: string }) {
  return (
    <div className="card-luxe p-10 text-center">
      <p className="text-grey-soft text-sm">{msg}</p>
      <Link to="/packages" className="inline-flex items-center gap-2 text-sm text-charcoal border-b border-gold mt-4 pb-0.5">
        Explore packages <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function BookingItem({ b, highlight = false }: { b: BookingRow; highlight?: boolean }) {
  const daysAway = differenceInDays(parseISO(b.travel_date), new Date());
  const statusColor =
    b.status === "confirmed" ? "bg-success/15 text-success"
    : b.status === "cancelled" ? "bg-destructive/15 text-destructive"
    : "bg-gold/15 text-gold-dark";

  const downloadInvoice = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${b.booking_ref}</title>
<style>body{font-family:Georgia,serif;max-width:720px;margin:40px auto;padding:0 24px;color:#1c1c1e}
h1{font-weight:300;letter-spacing:0.2em;color:#a8880e;font-size:14px}
.brand{font-size:28px;letter-spacing:0.3em}
.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e0d8}
.total{font-size:28px;color:#a8880e;text-align:right;margin-top:24px}
.muted{color:#6e6e73;font-size:13px}</style></head>
<body>
<div class="brand">TOUR <span style="color:#a8880e">BUDDY</span></div>
<h1>INVOICE</h1>
<p class="muted">Reference: <strong>${b.booking_ref}</strong> · Issued ${format(new Date(), "dd MMM yyyy")}</p>
<h3>Bill to</h3>
<p>${b.full_name}<br/>${b.email}</p>
<h3>Booking</h3>
<div class="row"><span>${b.packages?.title ?? "Tour package"} (${b.packages?.duration_days ?? ""} days)</span><span>${b.num_travelers} traveler(s)</span></div>
<div class="row"><span>Travel date</span><span>${format(parseISO(b.travel_date), "dd MMM yyyy")}</span></div>
<div class="row"><span>Payment status</span><span>${b.payment_status.toUpperCase()}</span></div>
<div class="total">Total: $${Number(b.total_usd).toLocaleString()} USD</div>
<p class="muted" style="margin-top:40px">Thank you for choosing Tour Buddy.<br/>info@tourlanka.com · tourlanka.com</p>
</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${b.booking_ref}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Invoice downloaded");
  };

  return (
    <article className={`card-luxe p-5 flex flex-wrap items-center gap-5 ${highlight ? "ring-1 ring-gold/30" : ""}`}>
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="eyebrow !text-[10px]">{b.booking_ref}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${statusColor}`}>
            {b.status}
          </span>
        </div>
        <h3 className="font-display text-2xl text-charcoal leading-tight">
          {b.packages?.title ?? "Tour package"}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-grey-soft">
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {format(parseISO(b.travel_date), "dd MMM yyyy")}</span>
          <span className="flex items-center gap-1.5"><MapPin size={12} /> {b.num_travelers} traveler{b.num_travelers > 1 ? "s" : ""}</span>
          {highlight && daysAway >= 0 && (
            <span className="text-gold-dark font-medium">{daysAway === 0 ? "Today!" : `${daysAway} days to go`}</span>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className="font-display text-2xl text-charcoal">${Number(b.total_usd).toLocaleString()}</div>
        <div className="text-[10px] eyebrow !text-grey-soft">{b.payment_status}</div>
      </div>
      <div className="flex gap-2">
        <Link
          to="/packages/$slug"
          params={{ slug: b.packages?.slug ?? "" }}
          className="text-xs px-3 py-2 border border-grey-line rounded-lg hover:bg-beige/40 transition"
        >
          View
        </Link>
        <button
          onClick={downloadInvoice}
          className="text-xs px-3 py-2 border border-gold/40 text-gold-dark rounded-lg hover:bg-gold/10 transition flex items-center gap-1.5"
        >
          <Download size={12} /> Invoice
        </button>
      </div>
    </article>
  );
}
