'use client'

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Check, Loader2, Lock, Shield, Phone, Mail,
  CreditCard, Calendar, Users, MapPin, Star, ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { fetchPackageBySlug } from "@/lib/api";
import { packageImage } from "@/lib/packages";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

/* ─────────── Steps ─────────── */
const STEPS = ["Trip Details", "Your Info", "Confirm"] as const;
type Step = 0 | 1 | 2;

function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();
  const slug = params.get("package") ?? "";
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState<Step>(0);
  const [travelers, setTravelers] = useState(2);
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("any");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentOption, setPaymentOption] = useState<"deposit" | "full">("deposit");

  const { data: pkg, isLoading } = useQuery({
    queryKey: ["package", slug],
    queryFn: () => fetchPackageBySlug(slug),
    enabled: !!slug,
  });

  // Pre-fill user info
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name ?? "");
      setEmail(user.email ?? "");
      setPhone(user.user_metadata?.phone ?? "");
    }
  }, [user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      sessionStorage.setItem("postLoginRedirect", `/checkout?package=${slug}`);
      router.push("/auth");
    }
  }, [authLoading, user, router, slug]);

  const total = pkg ? Number(pkg.price_usd) * travelers : 0;
  const deposit = total * 0.3;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg || !user) return;
    if (!agreed) { toast.error("Please accept the terms to proceed."); return; }

    setSubmitting(true);
    const formattedNotes = notes 
      ? `${notes}\n(Selected Payment: ${paymentOption === "deposit" ? "30% Deposit" : "Full Payment"})`
      : `Selected Payment: ${paymentOption === "deposit" ? "30% Deposit" : "Full Payment"}`;

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      package_id: pkg.id,
      travel_date: date,
      num_travelers: travelers,
      full_name: fullName,
      email,
      phone,
      special_notes: formattedNotes,
      total_usd: total,
    });
    setSubmitting(false);

    if (error) {
      toast.error("Booking failed", { description: error.message });
      return;
    }
    toast.success("Booking confirmed! 🎉 Check your dashboard.");
    router.push("/dashboard");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-grey-soft">Package not found.</p>
        <Link href="/packages" className="btn-gold">Browse Packages</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar solid />

      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Header */}
          <div className="mb-10">
            <div className="eyebrow mb-2">Secure Checkout</div>
            <h1 className="font-display text-4xl md:text-5xl text-charcoal">
              Complete Your <em className="text-gold-dark">Booking</em>
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-12">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <button
                  onClick={() => i < step && setStep(i as Step)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    i === step ? "text-charcoal" : i < step ? "text-gold-dark cursor-pointer" : "text-grey-soft cursor-default"
                  }`}
                >
                  <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    i < step ? "bg-gold text-charcoal" : i === step ? "bg-charcoal text-white" : "bg-grey-line text-grey-soft"
                  }`}>
                    {i < step ? <Check size={12} /> : i + 1}
                  </span>
                  {label}
                </button>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={14} className="text-grey-line" />
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* ── Left Panel ── */}
            <form onSubmit={onSubmit}>

              {/* Step 0: Trip Details */}
              {step === 0 && (
                <div className="card-luxe p-8 space-y-6">
                  <h2 className="font-display text-2xl text-charcoal">Trip Details</h2>
                  <div className="gold-rule w-12" />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="eyebrow block mb-1.5">Number of Travelers</span>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))}
                          className="h-9 w-9 rounded-full border border-grey-line flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition">−</button>
                        <span className="font-display text-2xl text-charcoal w-8 text-center">{travelers}</span>
                        <button type="button" onClick={() => setTravelers(Math.min(pkg.max_travelers, travelers + 1))}
                          className="h-9 w-9 rounded-full border border-grey-line flex items-center justify-center text-charcoal hover:border-gold hover:text-gold transition">+</button>
                        <span className="text-xs text-grey-soft">max {pkg.max_travelers}</span>
                      </div>
                    </label>

                    <label className="block">
                      <span className="eyebrow block mb-1.5">Travel Date</span>
                      <div className="flex items-center gap-2 bg-beige/50 rounded-xl px-3 py-2.5">
                        <Calendar size={16} className="text-gold-dark shrink-0" />
                        <input
                          type="date"
                          value={date}
                          required
                          min={new Date().toISOString().slice(0, 10)}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-transparent text-sm text-charcoal focus:outline-none"
                        />
                      </div>
                    </label>
                  </div>

                  <label className="block">
                    <span className="eyebrow block mb-1.5">Preferred Duration</span>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-beige/50 rounded-xl px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30"
                    >
                      <option value="any">Standard ({pkg.duration_days} days as packaged)</option>
                      <option value="short">Shorter (3–6 days)</option>
                      <option value="extended">Extended (add 2–3 days)</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="eyebrow block mb-1.5">Special Requests</span>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Anniversary, dietary needs, accessibility requirements…"
                      className="w-full bg-beige/50 rounded-xl px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      if (!date) { toast.error("Please select a travel date"); return; }
                      setStep(1);
                    }}
                    className="btn-gold w-full justify-center"
                  >
                    Continue to Your Info
                  </button>
                </div>
              )}

              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="card-luxe p-8 space-y-6">
                  <h2 className="font-display text-2xl text-charcoal">Your Information</h2>
                  <div className="gold-rule w-12" />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="eyebrow block mb-1.5">Full Name</span>
                      <div className="flex items-center gap-2 bg-beige/50 rounded-xl px-3 py-2.5">
                        <Users size={15} className="text-gold-dark shrink-0" />
                        <input
                          type="text"
                          value={fullName}
                          required
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Jane Smith"
                          className="w-full bg-transparent text-sm text-charcoal focus:outline-none"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="eyebrow block mb-1.5">Email Address</span>
                      <div className="flex items-center gap-2 bg-beige/50 rounded-xl px-3 py-2.5">
                        <Mail size={15} className="text-gold-dark shrink-0" />
                        <input
                          type="email"
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@example.com"
                          className="w-full bg-transparent text-sm text-charcoal focus:outline-none"
                        />
                      </div>
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="eyebrow block mb-1.5">Phone Number</span>
                      <div className="flex items-center gap-2 bg-beige/50 rounded-xl px-3 py-2.5">
                        <Phone size={15} className="text-gold-dark shrink-0" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 555 000 0000"
                          className="w-full bg-transparent text-sm text-charcoal focus:outline-none"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-beige/40 rounded-xl">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 accent-gold shrink-0"
                    />
                    <label htmlFor="terms" className="text-sm text-grey-soft leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <a href="#" className="text-gold-dark underline hover:text-gold">Terms & Conditions</a>{" "}
                      and{" "}
                      <a href="#" className="text-gold-dark underline hover:text-gold">Cancellation Policy</a>.
                      A 30% deposit (${deposit.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD) secures your booking.
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(0)}
                      className="flex-1 border border-grey-line rounded-xl py-3 text-sm text-charcoal hover:border-gold transition">
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!fullName || !email) { toast.error("Please fill in your name and email"); return; }
                        if (!agreed) { toast.error("Please accept the terms"); return; }
                        setStep(2);
                      }}
                      className="btn-gold flex-[2] justify-center"
                    >
                      Review Booking
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Confirmation */}
              {step === 2 && (
                <div className="card-luxe p-8 space-y-6">
                  <h2 className="font-display text-2xl text-charcoal">Review & Confirm</h2>
                  <div className="gold-rule w-12" />

                  {/* Summary rows */}
                  {[
                    { icon: MapPin, label: "Package", value: pkg.title },
                    { icon: Calendar, label: "Travel Date", value: new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                    { icon: Users, label: "Travelers", value: `${travelers} ${travelers === 1 ? "person" : "people"}` },
                    { icon: Mail, label: "Contact", value: email },
                    { icon: Phone, label: "Phone", value: phone || "—" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4 py-3 border-b border-grey-line last:border-0">
                      <Icon size={16} className="text-gold-dark mt-0.5 shrink-0" />
                      <div className="flex-1 flex justify-between gap-4">
                        <span className="text-sm text-grey-soft">{label}</span>
                        <span className="text-sm font-medium text-charcoal text-right">{value}</span>
                      </div>
                    </div>
                  ))}

                  {notes && (
                    <div className="bg-beige/40 rounded-xl p-4 text-sm text-grey-soft italic">
                      "{notes}"
                    </div>
                  )}

                  {/* Payment Option Selection */}
                  <div className="bg-beige/30 rounded-xl p-4 space-y-3 border border-beige">
                    <div className="eyebrow !text-grey-soft text-[10px]">Payment Option</div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentOption("deposit")}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
                          paymentOption === "deposit"
                            ? "bg-charcoal text-white"
                            : "bg-white border border-grey-line text-charcoal hover:border-gold"
                        }`}
                      >
                        Pay 30% Deposit
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentOption("full")}
                        className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
                          paymentOption === "full"
                            ? "bg-charcoal text-white"
                            : "bg-white border border-grey-line text-charcoal hover:border-gold"
                        }`}
                      >
                        Pay Full Amount
                      </button>
                    </div>
                  </div>

                  <div className="bg-charcoal rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <div className="text-white/60 text-xs font-medium uppercase tracking-wide">
                        {paymentOption === "deposit" ? "Deposit Due Now" : "Total Amount Due"}
                      </div>
                      <div className="font-display text-3xl text-gold mt-1">
                        ${(paymentOption === "deposit" ? deposit : total).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm text-white/50">USD</span>
                      </div>
                      {paymentOption === "deposit" && (
                        <div className="text-white/50 text-xs mt-1">
                          Remaining ${(total - deposit).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD due later
                        </div>
                      )}
                    </div>
                    <CreditCard size={32} className="text-gold/60" />
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex-1 border border-grey-line rounded-xl py-3 text-sm text-charcoal hover:border-gold transition">
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold flex-[2] justify-center disabled:opacity-60"
                    >
                      {submitting
                        ? <><Loader2 size={16} className="animate-spin" /> Processing…</>
                        : <><Lock size={14} /> Confirm Booking</>}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-6 pt-2 text-[10px] eyebrow !text-grey-soft">
                    <span className="flex items-center gap-1"><Shield size={12} /> SSL Secured</span>
                    <span className="flex items-center gap-1"><Lock size={12} /> Data Encrypted</span>
                    <span className="flex items-center gap-1"><Check size={12} /> Instant Confirmation</span>
                  </div>
                </div>
              )}
            </form>

            {/* ── Right: Order Summary ── */}
            <aside className="space-y-6">
              {/* Package card */}
              <div className="card-luxe overflow-hidden">
                <div className="relative h-44">
                  <Image
                    src={packageImage(pkg.slug)}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                    sizes="380px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="eyebrow !text-gold-light !text-[10px]">{pkg.duration_days} Days · {pkg.destinations.slice(0, 2).join(" · ")}</div>
                    <div className="font-display text-2xl mt-0.5">{pkg.title}</div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: pkg.hotel_stars }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-grey-line">
                    <div className="flex justify-between text-sm">
                      <span className="text-grey-soft">Price per person</span>
                      <span className="text-charcoal font-medium">${Number(pkg.price_usd).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-grey-soft">Travelers</span>
                      <span className="text-charcoal font-medium">× {travelers}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-grey-line">
                      <span className="font-medium text-charcoal">Total</span>
                      <span className="font-display text-2xl text-gold-dark">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's included */}
              <div className="card-luxe p-5">
                <div className="eyebrow mb-3">What's Included</div>
                <ul className="space-y-2">
                  {pkg.inclusions.slice(0, 5).map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm text-charcoal">
                      <Check size={14} className="text-gold mt-0.5 shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust badges */}
              <div className="card-luxe p-5 space-y-3">
                <div className="eyebrow mb-1">Why Book With Us</div>
                {[
                  { icon: Shield, text: "Free cancellation up to 30 days before travel" },
                  { icon: Lock, text: "Secure payment — your data is encrypted" },
                  { icon: Phone, text: "24/7 dedicated concierge support" },
                  { icon: Check, text: "Instant booking confirmation via email" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3 text-sm text-grey-soft">
                    <Icon size={14} className="text-gold-dark mt-0.5 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={40} />
      </div>
    }>
      <CheckoutInner />
    </Suspense>
  );
}
