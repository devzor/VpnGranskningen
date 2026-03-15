import { RecommendResultDto, RecommendRequest, UserProfile, VpnSummaryDto } from "@/types/vpn";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`API-fel ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function getAllVpns(): Promise<VpnSummaryDto[]> {
  return fetchJson(`${API_BASE}/api/vpns`);
}

export function getVpnBySlug(slug: string): Promise<VpnSummaryDto> {
  return fetchJson(`${API_BASE}/api/vpns/${slug}`);
}

export function getRecommendations(profile: UserProfile): Promise<RecommendResultDto[]> {
  const body: RecommendRequest = { profile };
  return fetchJson(`${API_BASE}/api/vpns/recommend`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
}
