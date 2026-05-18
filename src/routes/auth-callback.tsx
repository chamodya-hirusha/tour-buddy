import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth-callback")({
  head: () => ({ meta: [{ title: "Authenticating — Tour Buddy" }] }),
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        const r = sessionStorage.getItem("postLoginRedirect");
        if (r) {
          sessionStorage.removeItem("postLoginRedirect");
          navigate({ to: r });
        } else {
          navigate({ to: "/dashboard" });
        }
      } else {
        navigate({ to: "/auth" });
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-gold h-12 w-12 mb-4" />
      <p className="text-grey-soft text-sm">Completing authentication...</p>
    </div>
  );
}
