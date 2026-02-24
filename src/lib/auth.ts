// Lightweight client-side session helpers using localStorage.
// This is a placeholder auth system — replace with real auth (e.g. NextAuth) when needed.

export interface Session {
  email: string;
  createdAt: string;
}

const SESSION_KEY = "brokendata_session";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(email: string): void {
  const session: Session = { email, createdAt: new Date().toISOString() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
