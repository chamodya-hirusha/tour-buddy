'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Loader2, Compass } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { setMockUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "admin@gmail.com" && password === "admin123") {
      setMockUser({
        id: "admin-id",
        email: "admin@gmail.com",
        user_metadata: { full_name: "Admin User" },
      } as any);
      toast.success("Welcome to the Command Center");
      router.push("/admin");
    } else {
      toast.error("Invalid admin credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen grid place-items-center font-sans relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMzAgMEwzMCA2ME0wIDMMEw2MCAzMCIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      </div>

      <div className="w-full max-w-md p-8 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-gradient-to-tr from-gold to-amber-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_10px_20px_rgba(212,175,55,0.2)] mb-4">
            <Compass className="text-[#020617]" size={24} />
          </div>
          <div className="font-display text-sm tracking-[0.3em] font-bold text-white">LUXE OS</div>
          <div className="text-[10px] text-gold/60 uppercase tracking-widest font-medium mt-1">Command Center Login</div>
        </div>

        {/* Card */}
        <div className="bg-[#07111F]/60 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <h1 className="text-2xl font-display font-light text-white mb-6 text-center">Authorized Access Only</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-2 block">Terminal Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 transition-all text-white placeholder-white/20"
                  placeholder="admin@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-2 block">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 transition-all text-white placeholder-white/20"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold text-[#020617] text-xs font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.2)] border border-gold/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Authenticating...
                </>
              ) : (
                "Initialize Session"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-[10px] text-white/30 uppercase tracking-wider">Demo: admin@gmail.com / admin123</p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <a href="/auth" className="text-xs text-white/50 hover:text-gold transition-colors">Go to User Login</a>
        </div>
      </div>
    </div>
  );
}
