import type { Locale, Profile } from "../types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { headers: { "Content-Type": "application/json" }, ...init });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export const api = {
  getProfile: () => request<Profile>("/api/profile"),
  updateLocale: (preferred_locale: Locale) => request<Profile>("/api/profile", { method: "PUT", body: JSON.stringify({ preferred_locale }) }),
  getProgress: () => request<{ items: Record<string, boolean> }>("/api/progress"),
  updateProgress: (lesson_id: string, completed: boolean) => request<{ items: Record<string, boolean> }>("/api/progress", { method: "PUT", body: JSON.stringify({ lesson_id, completed }) }),
};
