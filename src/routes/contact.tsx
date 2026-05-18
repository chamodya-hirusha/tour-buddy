import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Sri Lanka Luxe Voyages" },
      { name: "description", content: "Get in touch with us to plan your perfect Sri Lankan getaway." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar solid={true} />
      <main className="flex-grow pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="eyebrow">Get In Touch</div>
            <h1 className="mt-3 font-display text-5xl md:text-6xl text-charcoal">
              Contact <em className="text-gold-dark">Us</em>
            </h1>
            <p className="mt-4 text-grey-soft max-w-2xl mx-auto">
              Have questions about our packages or want to create a bespoke itinerary? Reach out to our team of experts.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="card-luxe p-8 bg-white">
                <h2 className="font-display text-2xl text-charcoal mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-grey-soft font-medium mb-2 block">First Name</label>
                      <input
                        type="text"
                        className="w-full bg-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 border border-transparent focus:border-gold/20"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-grey-soft font-medium mb-2 block">Last Name</label>
                      <input
                        type="text"
                        className="w-full bg-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 border border-transparent focus:border-gold/20"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-grey-soft font-medium mb-2 block">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 border border-transparent focus:border-gold/20"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-grey-soft font-medium mb-2 block">Message</label>
                    <textarea
                      rows={5}
                      className="w-full bg-beige/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 border border-transparent focus:border-gold/20"
                      placeholder="Tell us about your dream trip..."
                    />
                  </div>
                  <button type="button" className="btn-gold w-full justify-center py-3.5">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card-luxe p-8 bg-white">
                <h2 className="font-display text-2xl text-charcoal mb-6">Contact Info</h2>
                <div className="space-y-6">
                  <ContactDetail
                    icon={Mail}
                    label="Email"
                    value="info@tourlanka.com"
                    href="mailto:info@tourlanka.com"
                  />
                  <ContactDetail
                    icon={Phone}
                    label="Phone"
                    value="+94 11 234 5678"
                    href="tel:+94112345678"
                  />
                  <ContactDetail
                    icon={MapPin}
                    label="Office"
                    value="123 Galle Road, Colombo 03, Sri Lanka"
                  />
                  <ContactDetail
                    icon={Clock}
                    label="Hours"
                    value="Mon - Fri: 9AM - 6PM"
                  />
                </div>
              </div>

              <div className="card-luxe p-8 bg-white">
                <h3 className="font-display text-xl text-charcoal mb-2">Emergency Support</h3>
                <p className="text-sm text-grey-soft leading-relaxed">
                  For travelers currently on a journey with us, we provide 24/7 emergency support. Please refer to your travel documents for the dedicated hotline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
        <Icon size={18} className="text-gold-dark" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-grey-soft font-medium mb-1">{label}</div>
        {href ? (
          <a href={href} className="text-sm text-charcoal hover:text-gold-dark transition-colors">
            {value}
          </a>
        ) : (
          <span className="text-sm text-charcoal">{value}</span>
        )}
      </div>
    </div>
  );
}
