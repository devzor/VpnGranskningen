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

export type ReviewPricingResult = {
  pricing: { label: string; price: string }[];
  priceFact: { label: string; value: string };
  taglinePrice: string;
};

function bestPriceInfo(vpn: VpnSummaryDto): { taglinePrice: string; factLabel: string; factValue: string } {
  if (vpn.twoYearSubscriptionIntroPricePerMonth != null) {
    const p = Math.round(vpn.twoYearSubscriptionIntroPricePerMonth);
    return { taglinePrice: `${p} kr/mån (2 år)`, factLabel: "Pris (intro)", factValue: `${p} kr/mån (2 år)` };
  }
  if (vpn.oneYearSubscriptionIntroPricePerMonth != null) {
    const p = Math.round(vpn.oneYearSubscriptionIntroPricePerMonth);
    return { taglinePrice: `${p} kr/mån (1 år)`, factLabel: "Pris (intro)", factValue: `${p} kr/mån (1 år)` };
  }
  const p = Math.round(vpn.monthlyIntroPrice);
  return { taglinePrice: `${p} kr/mån`, factLabel: "Pris", factValue: `${p} kr/mån` };
}

export async function fetchReviewPricing(slug: string): Promise<ReviewPricingResult | null> {
  try {
    const vpn = await fetchVpn(slug);
    const monthly = vpn.monthlyIntroPrice != null
      ? { label: "Månadsvis", price: `${Math.round(vpn.monthlyIntroPrice)} kr/mån` }
      : { label: "Månadsvis", price: "Erbjuds ej" };
    const pricing = [
      monthly,
      row("1 år", vpn.oneYearSubscriptionIntroPricePerMonth),
      row("2 år", vpn.twoYearSubscriptionIntroPricePerMonth),
    ];
    const best = bestPriceInfo(vpn);
    return {
      pricing,
      priceFact: { label: best.factLabel, value: best.factValue },
      taglinePrice: best.taglinePrice,
    };
  } catch {
    return null;
  }
}
