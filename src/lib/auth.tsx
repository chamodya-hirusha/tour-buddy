import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = {
  id: string;
  email: string;
  user_metadata: { 
    full_name?: string;
    phone?: string;
  };
};

type Session = null;

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setMockUser: (user: User | null) => void;
}

const AuthCtx = createContext<AuthState>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  setMockUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [mockUser, setMockUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Supabase disabled for demo
    setLoading(false);
  }, []);

  return (
    <AuthCtx.Provider
      value={{
        user: mockUser,
        session: null,
        loading,
        signOut: async () => {
          setMockUser(null);
        },
        setMockUser,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
