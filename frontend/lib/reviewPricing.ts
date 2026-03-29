import { getVpnBySlug } from "@/lib/api";

function row(baseLabel: string, introPrice: number | null | undefined): { label: string; price: string } {
  if (introPrice == null) return { label: baseLabel, price: "Erbjuds ej" };
  return { label: `${baseLabel} (intro)`, price: `${Math.round(introPrice)} kr/mån` };
}

export async function fetchReviewPricing(slug: string): Promise<{ label: string; price: string }[] | null> {
  try {
    const vpn = await getVpnBySlug(slug);
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
