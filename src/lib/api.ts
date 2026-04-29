// KETEMU API client
const API_BASE = (import.meta.env.VITE_API_URL as string) || "http://localhost:4000/api";

export function getToken() {
  return localStorage.getItem("ketemu_token");
}
export function setToken(t: string | null) {
  if (t) localStorage.setItem("ketemu_token", t);
  else localStorage.removeItem("ketemu_token");
}

export async function api<T = any>(
  path: string,
  opts: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string> | undefined),
  };
  const token = getToken();
  if (token && opts.auth !== false) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || "Request failed");
  }
  if (res.status === 204) return null as T;
  return res.json();
}

export const API_URL = API_BASE;
