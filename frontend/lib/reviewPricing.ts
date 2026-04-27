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

export type PricingEntry = {
  label: string;
  price: string;
  regularPrice?: string;
  bonusMonths?: number | null;
};

function row(
  label: string,
  introPrice: number | null | undefined,
  regularPrice: number | null | undefined,
  bonusMonths?: number | null,
): PricingEntry {
  if (introPrice == null) return { label, price: "Erbjuds ej" };
  const entry: PricingEntry = { label, price: `${Math.round(introPrice)} kr/mån` };
  if (regularPrice != null && regularPrice !== introPrice) {
    entry.regularPrice = `${Math.round(regularPrice)} kr/mån`;
  }
  if (bonusMonths != null && bonusMonths > 0) {
    entry.bonusMonths = bonusMonths;
  }
  return entry;
}

export type ReviewPricingResult = {
  pricing: PricingEntry[];
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
    const pricing: PricingEntry[] = [
      row("Månadsvis", vpn.monthlyIntroPrice, vpn.monthlyRegularPrice),
      row("1 år", vpn.oneYearSubscriptionIntroPricePerMonth, vpn.oneYearSubscriptionRegularPricePerMonth, vpn.oneYearBonusMonths),
      row("2 år", vpn.twoYearSubscriptionIntroPricePerMonth, vpn.twoYearSubscriptionRegularPricePerMonth, vpn.twoYearBonusMonths),
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
