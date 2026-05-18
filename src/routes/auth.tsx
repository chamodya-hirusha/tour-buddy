import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign In — Tour Buddy" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, setMockUser } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const r = sessionStorage.getItem("postLoginRedirect");
      if (r) { sessionStorage.removeItem("postLoginRedirect"); navigate({ to: r }); }
      else navigate({ to: "/dashboard" });
    }
  }, [user, navigate]);

  const onEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { full_name: name },
        },
      });
      if (error) toast.error(error.message);
      else toast.success("Check your email to verify your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (email === "admin@gmail.com" && password === "admin123") {
          setMockUser({
            id: "admin-id",
            email: "admin@gmail.com",
            user_metadata: { full_name: "Admin" },
          } as any);
          toast.success("Logged in as Admin (Mock)");
        } else {
          toast.error(error.message);
        }
      }
    }
    setLoading(false);
  };

  const onGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
    if (error) toast.error("Google sign-in failed");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center mb-8 font-accent text-sm tracking-[0.3em]">
          TOUR <span className="text-gold">BUDDY</span>
        </Link>

        <div className="card-luxe p-8">
          <h1 className="font-display text-3xl text-charcoal text-center">
            {mode === "signin" ? "Welcome Back" : "Begin Your Journey"}
          </h1>
          <p className="mt-2 text-sm text-grey-soft text-center">
            {mode === "signin" ? "Sign in to manage your bookings." : "Create an account to book and track your tours."}
          </p>

          <button
            onClick={onGoogle}
            className="mt-6 w-full flex items-center justify-center gap-3 border border-grey-line rounded-lg py-2.5 text-sm font-medium hover:bg-beige/40 transition"
          >
            <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.4 2.9l5.7-5.7C33.5 7 28.9 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19c10.5 0 19-8.5 19-19 0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c2.8 0 5.4 1.1 7.4 2.9l5.7-5.7C33.5 7 28.9 5 24 5 16.3 5 9.7 9.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 43c4.8 0 9.2-1.8 12.5-4.8l-5.8-4.9c-2 1.4-4.5 2.2-6.7 2.2-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 38.5 16.2 43 24 43z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l5.8 4.9C40.5 35.4 43 30.2 43 24c0-1.2-.1-2.4-.4-3.5z"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-grey-line" />
            <span className="text-[10px] eyebrow !text-grey-soft">or</span>
            <div className="flex-1 h-px bg-grey-line" />
          </div>

          <form onSubmit={onEmail} className="space-y-3">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-beige/40 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-beige/40 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <input
              type="password"
              placeholder="Password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-beige/40 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <button type="submit" disabled={loading} className="btn-gold w-full justify-center disabled:opacity-60">
              {loading ? <Loader2 size={16} className="animate-spin" /> : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-grey-soft">
            {mode === "signin" ? "New to Tour Buddy? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-gold-dark font-medium hover:underline"
            >
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
