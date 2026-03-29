import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";
import { fetchReviewPricing } from "@/lib/reviewPricing";

export const metadata: Metadata = {
  title: "AzireVPN recension 2026",
  description: "Oberoende recension av AzireVPN 2026. Svensk aktör med RAM-only-servrar, stark integritetsprofil och litet servernät.",
  alternates: { canonical: "/recensioner/azirevpn" },
  openGraph: { title: "AzireVPN recension 2026", description: "Oberoende recension av AzireVPN 2026.", url: "/recensioner/azirevpn" },
};

const data: ReviewData = {
  slug:    "azirevpn",
  name:    "AzireVPN",
  tagline: "40 kr/mån (1 år) · WireGuard · Sverige · RAM-only-servrar",
  intro:   "AzireVPN är en liten svensk aktör som äger sin egna hårdvara och kör RAM-only-servrar – ingen data kan skrivas till disk. Det är ett medvetet val som stärker no-logs-profilen i praktiken. Servernätet är litet (40 servrar i 15 länder) och ingen oberoende audit har genomförts, vilket sänker poängen i vår modell.",
  mainUrl: "https://www.azirevpn.com/pricing",
  scores: { streaming: 24, privacy: 29, paranoid: 16 },
  scoreNotes: {
    streaming: "Ingen streaming (0p) + hastighet 7/10 (14p) + Win/Mac/iOS/Android (10p). Streaming är inte AzireVPNs fokus.",
    privacy:   "No-logs (15p) + ingen audit (0p) + Sverige hög risk (0p) + varken crypto eller kontanter (0p) + transparensrapport + canary (8p) + DNS + kill switch (6p) = 29p. Avsaknaden av audit kostar mest.",
    paranoid:  "Privacy-bas (12p) + kill switch (4p). Saknar multihop, Tor, obfuskering och öppen källkod.",
  },
  facts: [
    ["Pris",          "40 kr/mån (1 år)"],
    ["Protokoll",     "WireGuard"],
    ["Jurisdiktion",  "Sverige"],
    ["No-logs-audit", "Ingen (RAM-only-servrar)"],
    ["Öppen källkod", "Nej"],
    ["Servrar",       "Ca 40 i 15 länder"],
    ["Enheter",       "5 samtidigt"],
    ["Streaming",     "Inget stöd"],
  ],
  pros: [
    "RAM-only-servrar – ingen data kan sparas på disk",
    "Äger sin egna hårdvara – ingen tredjeparts datacenter",
    "Warrant canary och transparensrapport",
    "Enkel, fokuserad produkt utan feature bloat",
    "Svensk aktör – transparent och tillgänglig",
  ],
  cons: [
    "Ingen oberoende audit genomförd",
    "Sverige – 14 Eyes-land",
    "Accepterar varken crypto eller kontanter",
    "Litet servernät (40 servrar i 15 länder)",
    "Ej öppen källkod",
    "Inget streamingstöd",
    "Inget Linux-stöd",
    "Saknar obfuskering och multihop",
  ],
  sections: [
    {
      title: "RAM-only – vad innebär det?",
      body:  "AzireVPN kör alla servrar i RAM-minnet utan persistent lagring. Det innebär att om en server stängs av eller startas om raderas all data automatiskt – det finns bokstavligen inget att konfiskera.\n\nDet är ett starkt tekniskt argument för no-logs, men det ersätter inte en oberoende audit som verifierar hela kedjan."
    },
    {
      title: "Varför de låga poängen?",
      body:  "AzireVPN har aldrig genomfört en oberoende säkerhetsaudit. Det är den enskilt största anledningen till de låga poängen i vår modell (15p av 15 försvinner). Sverige-jurisdiktionen ger dessutom 0p av 25 möjliga.\n\nEn audit som bekräftar de tekniska påståendena om RAM-only och no-logs skulle lyfta betyget avsevärt. Vi uppmuntrar AzireVPN att ta det steget."
    },
  ],
  pricing: [
    { label: "Månadsvis", price: "59 kr/mån" },
    { label: "1 år",      price: "40 kr/mån" },
  ],
  conclusion: "AzireVPN är en hederlig liten aktör med rätt tankar kring RAM-only och hårdvaruägande. De låga poängen (Privacy 29/100, Paranoid 16/100) beror nästan uteslutande på avsaknad av audit och Sverige-jurisdiktion. För den som litar på tekniska argument utan audit-bekräftelse är det ett intressant alternativ – annars välj Mullvad eller IVPN.",
};

export default async function Page() {
  const result = await fetchReviewPricing("azirevpn");
  if (!result) return <ReviewPage data={data} />;
  const taglineParts = data.tagline.split(" · ");
  taglineParts[0] = result.taglinePrice;
  return <ReviewPage data={{
    ...data,
    pricing: result.pricing,
    tagline: taglineParts.join(" · "),
    facts: [[result.priceFact.label, result.priceFact.value], ...data.facts.slice(1)],
  }} />;
}
