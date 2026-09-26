"use client";

const TOKEN_KEY = "axon_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
  // Mirrored into a plain cookie (not httpOnly — set from client JS) purely so
  // middleware.ts can do a fast, no-flash redirect on the server before the
  // page renders. Real authorization is always enforced by the backend on
  // every API call, regardless of this cookie's presence.
  document.cookie = `axon_admin_token=${token}; path=/; max-age=${12 * 60 * 60}; samesite=lax`;
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
  document.cookie = "axon_admin_token=; path=/; max-age=0";
}
