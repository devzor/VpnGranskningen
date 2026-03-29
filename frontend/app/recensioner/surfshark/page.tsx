import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";
import { fetchReviewPricing } from "@/lib/reviewPricing";

export const metadata: Metadata = {
  title: "Surfshark recension 2026",
  description: "Oberoende recension av Surfshark 2026. Obegränsat antal enheter, lågt 2-års pris och Deloitte-audit – vad är Surfshark värt?",
  alternates: { canonical: "/recensioner/surfshark" },
  openGraph: { title: "Surfshark recension 2026", description: "Oberoende recension av Surfshark 2026.", url: "/recensioner/surfshark" },
};

const data: ReviewData = {
  slug:    "surfshark",
  name:    "Surfshark",
  tagline: "26 kr/mån (2 år) · WireGuard · Nederländerna · Obegränsat enheter",
  intro:   "Surfsharks starkaste kort är priset och antalet enheter: obegränsat antal enheter på ett konto gör det till det bästa familje-VPN:et på marknaden. Med 2-årsplanen på 26 kr/mån är det ett av de billigaste alternativen. Deloitte-audit 2023 bekräftar no-logs – men audiтen är inte färsk vilket kostar poäng i vår modell.",
  mainUrl: "https://surfshark.com/sv/vpn/pricing",
  scores: { streaming: 66, privacy: 64, paranoid: 54 },
  scoreNotes: {
    streaming: "Fullt streamingstöd (40p) + hastighet 8/10 (16p) + alla plattformar (10p). Pris 42 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs + audit (30p) + Audit 2023 < 2024 = inte färsk (0p) + Nederländerna medel risk (12p) + crypto (12p) + transparensrapport (4p) + DNS + kill switch (6p).",
    paranoid:  "Privacy-bas (26p) + multihop (12p) + obfuskering (10p) + kill switch (4p) + split tunneling (2p). Ej öppen källkod (0p), saknar Tor-stöd.",
  },
  facts: [
    ["Pris (intro)",  "26 kr/mån (2 år)"],
    ["Protokoll",     "WireGuard, OpenVPN, IKEv2"],
    ["Jurisdiktion",  "Nederländerna"],
    ["No-logs-audit", "Deloitte (2023)"],
    ["Öppen källkod", "Nej"],
    ["Servrar",       "4 500 i 100 länder"],
    ["Enheter",       "Obegränsat"],
    ["Streaming",     "Fullt stöd"],
  ],
  pros: [
    "Obegränsat antal enheter – bäst för familjer",
    "26 kr/mån på 2-årsplan – ett av marknadens lägsta priser",
    "Fullt streamingstöd för Netflix, Disney+, BBC iPlayer m.fl.",
    "Multihop (Double VPN) ingår",
    "CleanWeb – inbyggd annonsblockerare",
    "Camouflage Mode för obfuskering",
  ],
  cons: [
    "Audiт senast 2023 – inte uppdaterad",
    "Nederländerna – EU-land med viss juridisk risk",
    "Ej öppen källkod",
    "Accepterar inte kontanter",
    "Inga warrant canary",
    "Förnyelsepris 99 kr/mån – stor skillnad mot intro",
  ],
  sections: [
    {
      title: "Obegränsat enheter – verklig fördel",
      body:  "De flesta VPN begränsar till 5–10 simultana enheter. Surfshark har ingen gräns alls, vilket gör det idealiskt för hushåll med många enheter: telefoner, laptops, smart-TV och router.\n\nEtt abonnemang täcker hela familjen utan extra kostnad."
    },
    {
      title: "Integritet och jurisdiktion",
      body:  "Nederländerna är EU-land och ingår i 9 Eyes-alliansen. Det innebär att myndigheter i teorin kan begära datautlämning. Surfshark har inga loggar att lämna ut, men jurisdiktionen sänker privacy-poängen jämfört med Panama eller Schweiz.\n\nDeloitte-audiтen från 2023 bekräftade no-logs. En uppdaterad audiт vore välkommen."
    },
  ],
  pricing: [
    { label: "Månadsvis",    price: "162 kr/mån" },
    { label: "1 år (intro)", price: "42 kr/mån" },
    { label: "2 år (intro)", price: "26 kr/mån" },
  ],
  conclusion: "Surfshark är det bästa valet för familjer och den som vill ha lågt pris (66/100 streaming). Privacy-poängen (64/100) är godkänd men inte imponerande – Nederlanderna-jurisdiktionen och en föråldrad audiт håller ner betyget. Vill du ha maximal integritet finns bättre alternativ.",
};

export default async function Page() {
  const pricing = await fetchReviewPricing("surfshark");
  return <ReviewPage data={pricing ? { ...data, pricing } : data} />;
}
