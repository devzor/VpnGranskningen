import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";
import { fetchReviewPricing } from "@/lib/reviewPricing";

export const metadata: Metadata = {
  title: "AdGuard VPN recension 2026",
  description: "Oberoende recension av AdGuard VPN 2026. Eget protokoll som maskerar trafik som HTTPS, stark annonsblockning och gratis nivå.",
  alternates: { canonical: "/recensioner/adguardvpn" },
  openGraph: { title: "AdGuard VPN recension 2026", description: "Oberoende recension av AdGuard VPN 2026.", url: "/recensioner/adguardvpn" },
};

const data: ReviewData = {
  slug:    "adguardvpn",
  name:    "AdGuard VPN",
  tagline: "25 kr/mån (2 år) · Eget protokoll · Cypern · Gratis nivå",
  intro:   "AdGuard VPN kommer från skaparna av AdGuard – en av de mest respekterade annonsblockerarna. Det egenutvecklade protokollet maskerar VPN-trafik som vanlig HTTPS, vilket gör det svårt att blockera. En Cure53-audit 2023 verifierar no-logs och Cypern ger medelhög jurisdiktionsrisk.",
  mainUrl: "https://adguard-vpn.com/license.html",
  scores: { streaming: 44, privacy: 58, paranoid: 59 },
  scoreNotes: {
    streaming: "Delvis streamingstöd (20p) + hastighet 7/10 (14p) + alla plattformar (10p). Pris 35 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs + audit (30p) + Audit 2023 inte färsk (0p) + Cypern medel risk (12p) + öppen källkod (6p) + transparensrapport (4p) + DNS + kill switch (6p). Accepterar varken crypto eller kontanter.",
    paranoid:  "Privacy-bas (23p) + obfuskering/eget protokoll (10p) + öppen källkod (20p) + kill switch (4p) + split tunneling (2p). Saknar multihop och Tor-stöd.",
  },
  facts: [
    ["Pris (intro)",  "25 kr/mån (2 år)"],
    ["Protokoll",     "AdGuard VPN-protokoll, OpenVPN"],
    ["Jurisdiktion",  "Cypern"],
    ["No-logs-audit", "Cure53 (2023)"],
    ["Öppen källkod", "Ja"],
    ["Servrar",       "Ca 65 i 45 länder"],
    ["Enheter",       "10 samtidigt"],
    ["Gratis nivå",   "Ja – begränsat"],
  ],
  pros: [
    "Eget protokoll – maskerar trafik som HTTPS",
    "Öppen källkod",
    "Stark inbyggd annonsblockning (från AdGuard-teamet)",
    "Cure53-audit 2023 bekräftar no-logs",
    "10 simultana enheter",
    "Gratis nivå tillgänglig",
    "Bra webbläsartillägg",
  ],
  cons: [
    "Accepterar varken crypto eller kontanter",
    "Cypern – EU-land med medelhög jurisdiktionsrisk",
    "Audiт senast 2023 – inte uppdaterad",
    "Streaming begränsat",
    "Litet servernät (~65 servrar i 45 länder)",
    "Saknar multihop och Tor-stöd",
    "Inga warrant canary",
  ],
  sections: [
    {
      title: "Det egna protokollet",
      body:  "AdGuard VPN-protokollet är byggt ovanpå HTTPS och gör att VPN-trafiken ser ut som vanlig webbtrafik. Det är svårare att blockera med djup paketinspektion (DPI) än traditionella VPN-protokoll.\n\nProtokollkoden är öppen källkod och har granskats av Cure53. Det är en teknisk fördel i censurerade miljöer."
    },
    {
      title: "Annonsblockning – en riktig fördel",
      body:  "AdGuard-teamet har lång erfarenhet av DNS-baserad annonsblockning. Blockeringen i AdGuard VPN är mer sofistikerad än den i de flesta konkurrenter och fungerar på systemnivå, inte bara i webbläsaren.\n\nFör den som kombinerar VPN och adblock är detta en naturlig helhetslösning."
    },
  ],
  pricing: [
    { label: "Månadsvis",    price: "69 kr/mån" },
    { label: "1 år (intro)", price: "35 kr/mån" },
    { label: "2 år (intro)", price: "25 kr/mån" },
  ],
  conclusion: "AdGuard VPN är ett intressant val för den som vill ha stark annonsblockning och ett obfuskeringsprotokoll i ett paket (59/100 Paranoid). Privacy-poängen (58/100) är godkänd men inte imponerande. Streaming är begränsat (44/100). Bäst för tekniskt medvetna användare i restriktiva nätverksmiljöer.",
};

export default async function Page() {
  const result = await fetchReviewPricing("adguardvpn");
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
