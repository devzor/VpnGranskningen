import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";

export const metadata: Metadata = {
  title: "Windscribe recension 2026",
  description: "Oberoende recension av Windscribe 2026. Gratis 10 GB/mån, öppen källkod, obegränsat enheter och Kanada-jurisdiktion.",
  alternates: { canonical: "/recensioner/windscribe" },
  openGraph: { title: "Windscribe recension 2026", description: "Oberoende recension av Windscribe 2026.", url: "/recensioner/windscribe" },
};

const data: ReviewData = {
  slug:    "windscribe",
  name:    "Windscribe",
  tagline: "35 kr/mån (1 år) · WireGuard · Kanada · Gratis 10 GB/mån",
  intro:   "Windscribe är ett av de mer generösa gratis-VPN:erna: 10 GB per månad på gratisplanen och tillgång till servrar i 10 länder utan betalning. På betald plan erbjuder Windscribe öppen källkod, obegränsat enheter och ett brett utbud av obfuskeringsprotokoll inklusive Stealth och WStunnel. Kanada-jurisdiktion är en nackdel.",
  mainUrl: "https://windscribe.com/upgrade",
  scores: { streaming: 44, privacy: 62, paranoid: 73 },
  scoreNotes: {
    streaming: "Delvis streamingstöd (20p) + hastighet 7/10 (14p) + alla plattformar (10p). Pris 35 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs + audit (30p) + Audit 2022 inte färsk (0p) + Kanada hög risk (0p) + crypto (12p) + öppen källkod + canary + transparensrapport (14p) + DNS + kill switch (6p).",
    paranoid:  "Privacy-bas (25p) + multihop (12p) + obfuskering (10p) + öppen källkod (20p) + kill switch (4p) + split tunneling (2p). Saknar Tor-stöd.",
  },
  facts: [
    ["Pris",          "35 kr/mån (1 år)"],
    ["Protokoll",     "WireGuard, OpenVPN, IKEv2, Stealth, WStunnel"],
    ["Jurisdiktion",  "Kanada"],
    ["No-logs-audit", "Cure53 (2022)"],
    ["Öppen källkod", "Ja"],
    ["Servrar",       "480 i 69 länder"],
    ["Enheter",       "Obegränsat"],
    ["Gratis nivå",   "10 GB/mån"],
  ],
  pros: [
    "Generös gratis nivå – 10 GB/mån utan kreditkort",
    "Öppen källkod",
    "Obegränsat enheter på betald plan",
    "Stealth och WStunnel – bäst för censurerade länder",
    "Multihop ingår",
    "Warrant canary",
  ],
  cons: [
    "Kanada – 5 Eyes-land",
    "Audiт senast 2022 – inte uppdaterad",
    "Inget 2-årspaket",
    "Accepterar inte kontanter",
    "Streaming begränsat",
    "Relativt litet servernät (480 servrar)",
  ],
  sections: [
    {
      title: "Obfuskeringsprotokoll – ett brett utbud",
      body:  "Windscribe erbjuder fler obfuskeringsprotokoll än de flesta: Stealth (WireGuard over TLS), WStunnel (WireGuard over WebSocket), och SOCKS5-proxy. Det gör Windscribe till ett av de bästa alternativen för användare i länder med djup paketinspektion (DPI) som Kina eller Iran."
    },
    {
      title: "Gratis-planen i detalj",
      body:  "Gratisplanen inkluderar 10 GB per månad, tillgång till servrar i 10 länder och inga reklamannonser. Det är generöst jämfört med konkurrenter.\n\nBegränsningen är att du inte kan välja alla serverplatser och att streamingstjänster som Netflix inte fungerar pålitligt på gratisplanen."
    },
  ],
  pricing: [
    { label: "Månadsvis", price: "79 kr/mån" },
    { label: "1 år",      price: "35 kr/mån" },
    { label: "Gratis",    price: "0 kr (10 GB)" },
  ],
  conclusion: "Windscribe är det bästa valet om du vill testa ett VPN gratis eller behöver avancerad obfuskering (73/100 Super User). Kanada-jurisdiktionen och den föråldrade audiтen sänker Privacy-poängen (62/100). För streaming finns bättre alternativ (44/100).",
};

export default function Page() { return <ReviewPage data={data} />; }
