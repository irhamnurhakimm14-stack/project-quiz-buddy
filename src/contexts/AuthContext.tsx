import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api, setToken, getToken } from "@/lib/api";

export type User = {
  id: string;
  email: string;
  full_name: string;
  nim?: string | null;
  phone?: string | null;
  role: "student" | "staff" | "vendor" | "admin";
  faculty?: string | null;
  avatar_url?: string | null;
  honesty_points: number;
  is_verified: boolean;
};

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!getToken()) { setUser(null); setLoading(false); return; }
    try {
      const me = await api<User>("/auth/me");
      setUser(me);
    } catch {
      setToken(null); setUser(null);
    } finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);

  const login = async (email: string, password: string) => {
    const r = await api<{ user: User; token: string }>("/auth/login", {
      method: "POST", body: JSON.stringify({ email, password }), auth: false,
    });
    setToken(r.token); setUser(r.user);
  };
  const register = async (data: any) => {
    const r = await api<{ user: User; token: string }>("/auth/register", {
      method: "POST", body: JSON.stringify(data), auth: false,
    });
    setToken(r.token); setUser(r.user);
  };
  const logout = () => { setToken(null); setUser(null); };

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be inside AuthProvider");
  return c;
};
