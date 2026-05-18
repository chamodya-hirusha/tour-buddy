'use client'

import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent! We will contact you shortly.");
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar solid />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.3) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="eyebrow !text-gold-light mb-3">Get in Touch</div>
          <h1 className="font-display text-5xl md:text-6xl text-white font-light">
            Contact <em className="text-gold">Our Experts</em>
          </h1>
          <p className="mt-5 text-white/60 max-w-2xl mx-auto leading-relaxed">
            Have questions about our packages or want to plan a custom itinerary? We are here to help.
          </p>
          <div className="mt-6 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          
          {/* ── Left Column: Contact Form ── */}
          <div className="card-luxe p-8">
            <div className="eyebrow mb-2">Send a Message</div>
            <h2 className="font-display text-3xl text-charcoal mb-6">Inquire About Your Journey</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-grey-soft mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-beige/30 border border-grey-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-grey-soft mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-beige/30 border border-grey-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-grey-soft mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-beige/30 border border-grey-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-grey-soft mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full bg-beige/30 border border-grey-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                  placeholder="Tell us about your dream trip..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── Right Column: Info ── */}
          <aside className="space-y-6">
            <div className="card-luxe p-6 space-y-6">
              <div>
                <div className="eyebrow mb-2">Direct Contact</div>
                <h3 className="font-display text-2xl text-charcoal">Reach Out</h3>
              </div>
              
              <div className="gold-rule w-full" />

              <div className="space-y-4">
                <ContactInfoItem 
                  icon={Mail} 
                  label="Email" 
                  value="hello@tourbuddy.lk" 
                />
                <ContactInfoItem 
                  icon={Phone} 
                  label="Phone" 
                  value="+94 77 123 4567" 
                />
                <ContactInfoItem 
                  icon={MapPin} 
                  label="Address" 
                  value="123 Galle Road, Colombo 03, Sri Lanka" 
                />
              </div>
            </div>

            <div className="card-luxe p-6 bg-charcoal text-white">
              <div className="eyebrow !text-gold mb-2">Office Hours</div>
              <h3 className="font-display text-2xl mb-4 font-light">When We're Active</h3>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span>9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="text-xs text-gold-light mt-4">Timezone: GMT+5:30 (Sri Lanka)</div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ContactInfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
        <Icon className="text-gold-dark" size={18} />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-grey-soft">{label}</div>
        <div className="text-sm text-charcoal font-medium">{value}</div>
      </div>
    </div>
  );
}
