import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";

export const metadata: Metadata = {
  title: "NordVPN recension 2026",
  description: "Oberoende recension av NordVPN 2026. Streaming, hastighet, Deloitte-audit och pris – vad är NordVPN värt?",
  alternates: { canonical: "/recensioner/nordvpn" },
  openGraph: { title: "NordVPN recension 2026", description: "Oberoende recension av NordVPN 2026.", url: "/recensioner/nordvpn" },
};

const data: ReviewData = {
  slug:    "nordvpn",
  name:    "NordVPN",
  tagline: "136 kr/mån · NordLynx · Deloitte-auditerad 2024",
  intro:   "NordVPN är marknadsledaren av en anledning: brett servernät med 7 300 servrar i 118 länder, snabb NordLynx-protokollet och konsekvent streamingstöd. Med Deloitte-audit 2024 och Panamas jurisdiktion är integritetsprofilen stark – men priset vid förnyelse är en nackdel.",
  mainUrl: "https://nordvpn.com/sv/pricing/",
  scores: { streaming: 68, privacy: 82, paranoid: 73 },
  scoreNotes: {
    streaming: "Fullt streamingstöd (40p) + hastighet 9/10 (18p) + alla plattformar (10p). Pris 52 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs + audit + färsk audit 2024 (35p) + Panama låg risk (25p) + crypto (12p) + transparensrapport (4p) + DNS + kill switch (6p). Accepterar ej kontanter.",
    paranoid:  "Privacy-bas (33p) + multihop (12p) + Tor-stöd (12p) + obfuskering (10p) + kill switch + split (6p). Ej öppen källkod = 0p av 20.",
  },
  facts: [
    ["Pris (intro)", "52 kr/mån (1 år)"],
    ["Protokoll",    "NordLynx, WireGuard, OpenVPN, IKEv2"],
    ["Jurisdiktion", "Panama"],
    ["No-logs-audit","Deloitte (2024)"],
    ["Öppen källkod","Nej"],
    ["Servrar",      "7 300 i 118 länder"],
    ["Enheter",      "10 samtidigt"],
    ["Streaming",    "Fullt stöd"],
  ],
  pros: [
    "7 300 servrar i 118 länder – ett av de bredaste nätverken",
    "NordLynx ger marknadsledande hastighet",
    "Deloitte-audit 2024 bekräftar no-logs",
    "Panama-jurisdiktion utanför 5/9/14 Eyes",
    "Tor over VPN och multihop ingår",
    "10 simultana enheter",
    "Inbyggd annonsblockerare (Threat Protection)",
  ],
  cons: [
    "Lockt intro-pris – förnyelse kostar 120 kr/mån",
    "Ej öppen källkod",
    "Accepterar inte kontanter",
    "Inga warrant canary",
    "Ägt av Cyberghost-ägaren Kape Technologies (numera Nord Security)",
  ],
  sections: [
    {
      title: "Prestanda och streaming",
      body:  "NordLynx – NordVPNs WireGuard-implementation – är konsekvent ett av de snabbaste protokollen på marknaden. I oberoende tester behåller NordVPN 85–95 % av ursprungshastigheten på nordiska servrar.\n\nStreamingstödet är fullt: Netflix Sverige, USA och UK, BBC iPlayer, Disney+, HBO Max och SVT Play fungerar pålitligt. Det är en av de starkaste streaming-VPN:erna."
    },
    {
      title: "Integritet och jurisdiktion",
      body:  "Panama är en av de bästa jurisdiktionerna för en VPN: inget tvång att spara loggdata, inget 5/9/14 Eyes-medlemskap och inga krav på att samarbeta med utländska myndigheter.\n\nDeloitte genomförde en no-logs-audit 2024 och bekräftade att NordVPN inte sparar trafikdata, IP-adresser eller sessionsloggar. Det är en av de mest välkända revisionsbyråerna i branschen."
    },
  ],
  pricing: [
    { label: "Månadsvis",  price: "136 kr/mån" },
    { label: "1 år (intro)", price: "52 kr/mån" },
    { label: "2 år (intro)", price: "36 kr/mån" },
  ],
  conclusion: "NordVPN är det självklara valet för streaming och resor (68/100) och presterar starkt även på privacy (82/100). Den stora nackdelen är prissättningen: introduktionspriset är lockande men förnyelsepriset är 2–3× högre. Räkna med det i din budget. För den som vill ha ett enkelt, snabbt och pålitligt VPN med brett servernät är NordVPN svårslagen.",
};

export default function Page() { return <ReviewPage data={data} />; }
