import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";

export const metadata: Metadata = {
  title: "OVPN recension 2026",
  description: "Oberoende recension av OVPN 2026. Svensk aktör med egna servrar, domstolsbevisad no-logs-policy och fullt streamingstöd.",
  alternates: { canonical: "/recensioner/ovpn" },
  openGraph: { title: "OVPN recension 2026", description: "Oberoende recension av OVPN 2026.", url: "/recensioner/ovpn" },
};

const data: ReviewData = {
  slug:    "ovpn",
  name:    "OVPN",
  tagline: "42 kr/mån (1 år) · WireGuard · Sverige · Bevisad no-logs via domstol",
  intro:   "OVPN är en annan svensk aktör som äger sin egna hårdvara och har bevisat sin no-logs-policy på det starkaste möjliga sättet: i domstol. En svensk tingsrätt begärde ut data 2017 – och OVPN kunde inte lämna något eftersom det inte existerade. Streamingstödet är fullt och priset rimligt.",
  mainUrl: "https://www.ovpn.com/sv/pricing",
  scores: { streaming: 66, privacy: 37, paranoid: 31 },
  scoreNotes: {
    streaming: "Fullt streamingstöd (40p) + hastighet 8/10 (16p) + alla plattformar (10p). Pris 42 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs (15p) + ingen audit (0p) + Sverige hög risk (0p) + crypto (12p) + transparensrapport (4p) + DNS + kill switch (6p) = 37p. Ingen audit och Sverige kostar mest.",
    paranoid:  "Privacy-bas (15p) + multihop (12p) + kill switch (4p). Saknar obfuskering, Tor-stöd och öppen källkod.",
  },
  facts: [
    ["Pris",          "42 kr/mån (1 år)"],
    ["Protokoll",     "WireGuard, OpenVPN"],
    ["Jurisdiktion",  "Sverige"],
    ["No-logs-bevis", "Domstolsbeslut (2017)"],
    ["Öppen källkod", "Nej"],
    ["Servrar",       "Ca 100 i 30 länder"],
    ["Enheter",       "Obegränsat"],
    ["Streaming",     "Fullt stöd"],
  ],
  pros: [
    "No-logs bevisad i verklig domstolsförhandling 2017",
    "Äger sin egna hårdvara – ingen tredjeparts datacenter",
    "Fullt streamingstöd för Netflix, Disney+, BBC iPlayer m.fl.",
    "Obegränsat enheter",
    "Transparensrapport publiceras regelbundet",
    "Multihop ingår",
  ],
  cons: [
    "Ingen oberoende audit",
    "Sverige – 14 Eyes-land",
    "Litet servernät (~100 servrar i 30 länder)",
    "Ej öppen källkod",
    "Ingen obfuskering",
    "Ingen warrant canary",
    "Accepterar inte kontanter",
  ],
  sections: [
    {
      title: "Domstolsbeviset – starkare än en audit?",
      body:  "2017 begärde en svensk domstol att OVPN skulle lämna ut data om en specifik användare. OVPN svarade att de inte hade något att lämna – och rätten accepterade det.\n\nDetta är i vissa avseenden ett starkare bevis än en tredjepartsaudit: det är ett verkligt rättsfall med verkliga konsekvenser, inte en kontrollerad revision. Mullvad fick en liknande bekräftelse via polisrazzian 2023."
    },
    {
      title: "Varför låga privacy-poäng trots stark no-logs?",
      body:  "Vår modell belönar verifieringsmekanismer och jurisdiktion. OVPN har inget audit-certifikat och Sverige ger 0 av 25 möjliga jurisdiktionspoäng.\n\nDomstolsfallet är övertygande men ingår inte i vår modell som är standardiserad. Om du värderar det praktiska beviset högre än audit-certifikat kan du mentalt lägga till 20–25p."
    },
  ],
  pricing: [
    { label: "Månadsvis", price: "69 kr/mån" },
    { label: "1 år",      price: "42 kr/mån" },
  ],
  conclusion: "OVPN är ett hedervärt streaming-VPN (66/100) med ett unikt domstolsbevis för no-logs. De låga Privacy-poängen (37/100) reflekterar modellens betoning på audit och jurisdiktion – inte att OVPN är oseriöst. För den som litar på det praktiska beviset mer än certifieringspapper är OVPN ett starkt alternativ.",
};

export default function Page() { return <ReviewPage data={data} />; }
