'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import type { Metadata } from "next";

export default function AuthPage() {
  const router = useRouter();
  const { user, setMockUser } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("demouser@gmail.com");
  const [password, setPassword] = useState("user123");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      const redirect = sessionStorage.getItem("postLoginRedirect");
      if (redirect) {
        sessionStorage.removeItem("postLoginRedirect");
        router.push(redirect);
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, router]);

  const onEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      toast.error("Sign up is disabled for the demo.");
    } else {
      // Demo login flow
      if (email === "demouser@gmail.com" && password === "user123") {
        setMockUser({
          id: "demo-id",
          email: "demouser@gmail.com",
          user_metadata: { full_name: "Demo User" },
        } as any);
        toast.success("Logged in as Demo User");
      } else if (email === "admin@gmail.com" && password === "admin123") {
        setMockUser({
          id: "admin-id",
          email: "admin@gmail.com",
          user_metadata: { full_name: "Admin User" },
        } as any);
        toast.success("Welcome to the Command Center");
        router.push("/admin");
      } else {
        toast.error("Invalid credentials. Use demouser@gmail.com / user123");
      }
    }
    setLoading(false);
  };

  const onGoogle = async () => {
    toast.error("Google sign-in is disabled for the demo.");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left decorative panel (desktop only) */}
      <div className="hidden lg:flex lg:w-[45%] bg-charcoal relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.2) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(67,107,76,0.15) 0%, transparent 50%)",
          }}
        />
        <div className="relative">
          <Link href="/" className="font-accent text-sm tracking-[0.3em] text-white">
            TOUR <span className="text-gold">BUDDY</span>
          </Link>
        </div>
        <div className="relative">
          <blockquote className="font-display text-3xl text-white/90 italic leading-snug">
            "Not all those who wander are lost — some are simply exploring Sri Lanka."
          </blockquote>
          <div className="mt-6 h-px w-12 bg-gradient-to-r from-gold to-transparent" />
          <p className="mt-4 text-white/50 text-sm">Join thousands of luxury travellers who trust Tour Buddy.</p>
        </div>
        <div className="relative flex gap-8 text-sm text-white/40">
          <span>🔒 SSL Secured</span>
          <span>✦ 5-Star Rated</span>
          <span>📞 24/7 Concierge</span>
        </div>
      </div>

      {/* Right auth form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden block text-center mb-8 font-accent text-sm tracking-[0.3em] text-charcoal">
            TOUR <span className="text-gold">BUDDY</span>
          </Link>

          <div className="card-luxe p-8 md:p-10">
            {/* Header */}
            <h1 className="font-display text-3xl text-charcoal text-center">
              {mode === "signin" ? "Welcome Back" : "Begin Your Journey"}
            </h1>
            <p className="mt-2 text-sm text-grey-soft text-center">
              {mode === "signin"
                ? "Sign in to manage your bookings."
                : "Create a free account to book and track your tours."}
            </p>

            {/* Google OAuth */}
            <button
              onClick={onGoogle}
              className="mt-6 w-full flex items-center justify-center gap-3 border border-grey-line rounded-xl py-2.5 text-sm font-medium hover:bg-beige/40 transition"
            >
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.4 2.9l5.7-5.7C33.5 7 28.9 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19c10.5 0 19-8.5 19-19 0-1.2-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c2.8 0 5.4 1.1 7.4 2.9l5.7-5.7C33.5 7 28.9 5 24 5 16.3 5 9.7 9.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 43c4.8 0 9.2-1.8 12.5-4.8l-5.8-4.9c-2 1.4-4.5 2.2-6.7 2.2-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 38.5 16.2 43 24 43z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l5.8 4.9C40.5 35.4 43 30.2 43 24c0-1.2-.1-2.4-.4-3.5z" />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-grey-line" />
              <span className="text-[10px] eyebrow !text-grey-soft">or</span>
              <div className="flex-1 h-px bg-grey-line" />
            </div>

            {/* Email form */}
            <form onSubmit={onEmail} className="space-y-3">
              {mode === "signup" && (
                <div className="flex items-center gap-2 bg-beige/40 rounded-xl px-3 py-2.5">
                  <User size={15} className="text-gold-dark shrink-0" />
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 bg-beige/40 rounded-xl px-3 py-2.5">
                <Mail size={15} className="text-gold-dark shrink-0" />
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 bg-beige/40 rounded-xl px-3 py-2.5">
                <Lock size={15} className="text-gold-dark shrink-0" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-grey-soft hover:text-gold-dark transition shrink-0"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {mode === "signin" && (
                <div className="text-right">
                  <button type="button" className="text-xs text-grey-soft hover:text-gold-dark transition">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full justify-center disabled:opacity-60 mt-1"
              >
                {loading
                  ? <Loader2 size={16} className="animate-spin" />
                  : mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-grey-soft">
              {mode === "signin" ? "New to Tour Buddy? " : "Already have an account? "}
              <button
                onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setPassword(""); }}
                className="text-gold-dark font-medium hover:underline"
              >
                {mode === "signin" ? "Create account" : "Sign in"}
              </button>
            </p>
          </div>

          <p className="mt-6 text-center text-[10px] text-grey-soft">
            By continuing you agree to our{" "}
            <a href="#" className="hover:text-gold-dark transition">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="hover:text-gold-dark transition">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
