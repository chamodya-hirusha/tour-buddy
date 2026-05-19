import { Instagram, Facebook, MessageCircle, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-accent text-base tracking-[0.3em] mb-4">
            TOUR <span className="text-gold">BUDDY</span>
          </div>
          <p className="text-sm leading-relaxed text-white/60 max-w-xs font-display italic text-[17px]">
            Where every journey becomes a story.
          </p>
        </div>

        <div>
          <div className="eyebrow !text-gold mb-5">Explore</div>
          <ul className="space-y-3 text-sm">
            <li><Link href="/packages" className="hover:text-gold transition">Tour Packages</Link></li>
            <li><Link href="/destinations" className="hover:text-gold transition">Destinations</Link></li>
            <li><a href="#" className="hover:text-gold transition">How It Works</a></li>
            <li><Link href="/about" className="hover:text-gold transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow !text-gold mb-5">Contact</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail size={14} className="text-gold" /> info@tourlanka.com</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-gold" /> +94 77 000 0000</li>
            <li className="text-white/60 leading-relaxed pt-1">Colombo · Sri Lanka<br/>Open 24/7</li>
          </ul>
        </div>

        <div>
          <div className="eyebrow !text-gold mb-5">Follow</div>
          <div className="flex gap-3">
            {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 grid place-items-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <div className="mt-6 text-xs text-white/40">
            🔒 SSL Secured · PayHere Verified
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Tour Buddy. All rights reserved.</span>
          <div className="flex gap-4">
            <span>Crafted with care in Sri Lanka 🌿</span>
            <Link href="/admin/login" className="hover:text-gold transition">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
