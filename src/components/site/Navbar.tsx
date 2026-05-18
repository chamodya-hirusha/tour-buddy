'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/destinations", label: "Destinations" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initial = (user?.user_metadata?.full_name || user?.email || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || solid
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:py-5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-forest">
            <path d="M12 2C8 6 4 10 4 15a8 8 0 0 0 16 0c0-5-4-9-8-13Z" fill="currentColor" opacity="0.85" />
            <path d="M12 6v15" stroke="#D4AF37" strokeWidth="1.2" />
          </svg>
          <span className={`font-accent text-[15px] tracking-[0.3em] font-medium transition-colors ${(scrolled || solid) ? "text-charcoal" : "text-white"}`}>
            TOUR <span className="text-gold font-bold">BUDDY</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={`text-[13px] font-medium tracking-wide transition-colors hover:text-gold ${(scrolled || solid) ? "text-charcoal" : "text-white/90"}`}
            >
              {n.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className={`text-[13px] font-medium tracking-wide transition-colors hover:text-gold ${(scrolled || solid) ? "text-charcoal" : "text-white/90"}`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-background/50 hover:bg-background transition">
                <span className="h-7 w-7 grid place-items-center rounded-full bg-gold/20 text-gold-dark text-xs font-semibold">
                  {initial}
                </span>
                <span className={`text-[13px] ${(scrolled || solid) ? "text-charcoal" : "text-white"}`}>
                  Account
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard size={14} className="mr-2" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <UserIcon size={14} className="mr-2" /> My Bookings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut();
                    router.push("/");
                  }}
                >
                  <LogOut size={14} className="mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => router.push("/auth")}
              className={`text-[13px] font-medium px-4 py-2 rounded-md transition-colors ${(scrolled || solid) ? "text-charcoal hover:text-gold" : "text-white hover:text-gold-light"}`}
            >
              Sign In
            </button>
          )}
          <Link href="/packages" className="btn-gold text-[13px] !py-2.5 !px-5">
            Book Now
          </Link>
        </div>

        <button
          className={`lg:hidden ${(scrolled || solid) ? "text-charcoal" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-4">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} onClick={() => setOpen(false)} className="text-charcoal text-base">
              {n.label}
            </Link>
          ))}
          {user && (
            <Link href="/dashboard" onClick={() => setOpen(false)} className="text-charcoal text-base">
              Dashboard
            </Link>
          )}
          <div className="flex gap-3 pt-2">
            {user ? (
              <button
                onClick={async () => { await signOut(); setOpen(false); router.push("/"); }}
                className="flex-1 border border-border rounded-md py-2.5 text-sm"
              >
                Sign out
              </button>
            ) : (
              <Link href="/auth" onClick={() => setOpen(false)} className="flex-1 border border-border rounded-md py-2.5 text-sm text-center">
                Sign In
              </Link>
            )}
            <Link href="/packages" onClick={() => setOpen(false)} className="btn-gold flex-1 justify-center !py-2.5">Book Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
