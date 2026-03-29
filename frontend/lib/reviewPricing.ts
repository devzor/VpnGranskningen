import { VpnSummaryDto } from "@/types/vpn";

// API_URL is a server-only variable (no NEXT_PUBLIC_ prefix).
// Set this in Railway's frontend service environment variables.
// Falls back to NEXT_PUBLIC_API_URL for local development.
const API_BASE =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5070";

async function fetchVpn(slug: string): Promise<VpnSummaryDto> {
  const res = await fetch(`${API_BASE}/api/vpns/${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

function row(baseLabel: string, introPrice: number | null | undefined): { label: string; price: string } {
  if (introPrice == null) return { label: baseLabel, price: "Erbjuds ej" };
  return { label: `${baseLabel} (intro)`, price: `${Math.round(introPrice)} kr/mån` };
}

export async function fetchReviewPricing(slug: string): Promise<{ label: string; price: string }[] | null> {
  try {
    const vpn = await fetchVpn(slug);
    const monthly = vpn.monthlyIntroPrice != null
      ? { label: "Månadsvis", price: `${Math.round(vpn.monthlyIntroPrice)} kr/mån` }
      : { label: "Månadsvis", price: "Erbjuds ej" };
    return [
      monthly,
      row("1 år", vpn.oneYearSubscriptionIntroPricePerMonth),
      row("2 år", vpn.twoYearSubscriptionIntroPricePerMonth),
    ];
  } catch {
    return null;
  }
}
