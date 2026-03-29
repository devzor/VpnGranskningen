import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";
import { fetchReviewPricing } from "@/lib/reviewPricing";

export const metadata: Metadata = {
  title: "CyberGhost recension 2026",
  description: "Oberoende recension av CyberGhost 2026. 10 000 servrar, dedikerade streamingservrar och 45 dagars pengarna-tillbaka-garanti.",
  alternates: { canonical: "/recensioner/cyberghost" },
  openGraph: { title: "CyberGhost recension 2026", description: "Oberoende recension av CyberGhost 2026.", url: "/recensioner/cyberghost" },
};

const data: ReviewData = {
  slug:    "cyberghost",
  name:    "CyberGhost",
  tagline: "29 kr/mån (2 år) · WireGuard · Rumänien · 45 dagar garanti",
  intro:   "CyberGhost lockar med ett av marknadens bredaste servernät – 10 000 servrar i 100 länder – och dedikerade streamingservrar optimerade för specifika tjänster. Den generösa 45-dagars pengarna-tillbaka-garantin gör det riskfritt att testa. Rumänsk jurisdiktion ger medelhög risk i vår modell.",
  mainUrl: "https://www.cyberghostvpn.com/sv/pricing",
  scores: { streaming: 66, privacy: 69, paranoid: 34 },
  scoreNotes: {
    streaming: "Fullt streamingstöd (40p) + hastighet 8/10 (16p) + alla plattformar (10p). Pris 44 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs + audit + färsk Deloitte-audit 2024 (35p) + Rumänien medel risk (12p) + crypto (12p) + transparensrapport (4p) + DNS + kill switch (6p). Ej kontanter, ej öppen källkod.",
    paranoid:  "Privacy-bas (28p) + kill switch (4p) + split tunneling (2p). Saknar multihop, Tor-stöd och obfuskering. Ej öppen källkod.",
  },
  facts: [
    ["Pris (intro)",  "29 kr/mån (2 år)"],
    ["Protokoll",     "WireGuard, OpenVPN, IKEv2"],
    ["Jurisdiktion",  "Rumänien"],
    ["No-logs-audit", "Deloitte (2024)"],
    ["Öppen källkod", "Nej"],
    ["Servrar",       "10 000 i 100 länder"],
    ["Enheter",       "7 samtidigt"],
    ["Garanti",       "45 dagar pengarna tillbaka"],
  ],
  pros: [
    "10 000 servrar – ett av de största nätverken",
    "Dedikerade streamingservrar per tjänst",
    "45 dagars pengarna-tillbaka-garanti",
    "Deloitte-audit 2024 bekräftar no-logs",
    "Rumänien – utanför 14 Eyes, ingen obligatorisk datalagringslog",
    "Enkel app med tydlig UX",
  ],
  cons: [
    "Kape Technologies-ägande (se nedan)",
    "Ingen multihop eller Tor-stöd",
    "Ingen obfuskering",
    "Ej öppen källkod",
    "Accepterar inte kontanter",
    "Inga warrant canary",
    "Förnyelse dyr (99 kr/mån)",
  ],
  sections: [
    {
      title: "Kape Technologies och historiken",
      body:  "CyberGhost ägs av Kape Technologies, som också äger ExpressVPN och Private Internet Access. Kape har historiska kopplingar till adware-distribution under ett tidigare namn (Crossrider).\n\nSedan 2016 har Kape positionerat om sig som ett renodlat VPN-bolag och CyberGhost har inte drabbats av kända incidenter. Men den historiska kopplingen är relevant information för den som vill ha maximal trovärdighet."
    },
    {
      title: "Dedikerade streamingservrar",
      body:  "CyberGhosts dedikerade streamingservrar är optimerade för specifika tjänster – du väljer \"Netflix Sverige\" direkt i appen. Det minskar trial-and-error och ger pålitligare streaming.\n\nMed 10 000 servrar i 100 länder är täckningen god och serverlasterna generellt låga."
    },
  ],
  pricing: [
    { label: "Månadsvis",    price: "163 kr/mån" },
    { label: "1 år",         price: "Erbjuds ej" },
    { label: "2 år (intro)", price: "29 kr/mån"  },
  ],
  conclusion: "CyberGhost är ett bra streaming-VPN (66/100) med ett imponerande servernät och dedikerade streamingservrar. Privacy-poängen (69/100) är godkänd men Super User-poängen (34/100) är låg – det är inte rätt val för den som prioriterar avancerad integritet. Den 45-dagars garantin gör det riskfritt att testa.",
};

export default async function Page() {
  const result = await fetchReviewPricing("cyberghost");
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
