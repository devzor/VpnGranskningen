import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";
import { fetchReviewPricing } from "@/lib/reviewPricing";

export const metadata: Metadata = {
  title: "Private Internet Access (PIA) recension 2026",
  description: "Oberoende recension av PIA VPN 2026. Öppen källkod, billigast per månad, obegränsade enheter – men USA-jurisdiktion är en nackdel.",
  alternates: { canonical: "/recensioner/pia" },
  openGraph: { title: "PIA recension 2026", description: "Oberoende recension av PIA VPN 2026.", url: "/recensioner/pia" },
};

const data: ReviewData = {
  slug:    "pia",
  name:    "Private Internet Access",
  tagline: "22 kr/mån (2 år) · WireGuard · USA · Öppen källkod",
  intro:   "Private Internet Access (PIA) är ett av de billigaste VPN:erna med öppen källkod – och en av de äldsta aktörerna på marknaden. Med 35 000 servrar i 91 länder och obegränsat antal enheter ger det mycket för pengarna. USA-jurisdiktionen är den tydligaste nackdelen för privacy-medvetna användare.",
  mainUrl: "https://www.privateinternetaccess.com/pages/buy-vpn/",
  scores: { streaming: 44, privacy: 67, paranoid: 63 },
  scoreNotes: {
    streaming: "Delvis streamingstöd (20p) + hastighet 7/10 (14p) + alla plattformar (10p). Pris 35 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs + audit + färsk Deloitte-audit 2025 (35p) + USA hög risk (0p) + crypto (12p) + öppen källkod + canary + transparensrapport (14p) + DNS + kill switch (6p).",
    paranoid:  "Privacy-bas (27p) + obfuskering/Shadowsocks (10p) + öppen källkod (20p) + kill switch (4p) + split tunneling (2p). Saknar multihop och Tor-stöd.",
  },
  facts: [
    ["Pris (intro)",  "22 kr/mån (2 år)"],
    ["Protokoll",     "WireGuard, OpenVPN, IKEv2, Shadowsocks"],
    ["Jurisdiktion",  "USA"],
    ["No-logs-audit", "Deloitte (2025)"],
    ["Öppen källkod", "Ja"],
    ["Servrar",       "35 000 i 91 länder"],
    ["Enheter",       "Obegränsat"],
    ["Streaming",     "Delvis (Netflix, Amazon)"],
  ],
  pros: [
    "22 kr/mån på 2-årsplan – bland de lägsta priserna",
    "Öppen källkod – alla appar granskningsbara",
    "Deloitte-audit 2025 – no-logs verifierad",
    "35 000 servrar – störst nätverk i test",
    "Obegränsat antal enheter",
    "Shadowsocks för obfuskering",
    "Warrant canary",
  ],
  cons: [
    "USA – 5 Eyes-land, sämsta möjliga jurisdiktion för privacy",
    "Kape Technologies-ägande",
    "Streaming begränsat (Netflix och Amazon – inte BBC iPlayer m.fl.)",
    "Accepterar inte kontanter",
    "Kräver e-postregistrering",
  ],
  sections: [
    {
      title: "USA-jurisdiktionen – ett verkligt problem?",
      body:  "USA ingår i 5 Eyes och har PRISM-programmet och NSL (National Security Letters) – hemliga domstolsbeslut som tvingar bolag att lämna data utan att berätta om det.\n\nPIA har bevisligen klarat av rättegångar: 2016 och 2018 kunde de inte lämna ut data eftersom de inte hade något att lämna. Men jurisdiktionen är ändå en risk för den som vill ha absolut maximal integritet. Välj Mullvad, ProtonVPN eller IVPN om det är avgörande."
    },
    {
      title: "Prestanda och servernät",
      body:  "Med 35 000 servrar i 91 länder har PIA det bredaste servernätet av alla leverantörer i test – fler servrar per land innebär lägre last och stabila anslutningar.\n\nWireGuard-hastigheten är god (7/10) men inte i topp. Shadowsocks-obfuskeringen gör PIA användbart i censurerade länder."
    },
  ],
  pricing: [
    { label: "Månadsvis",    price: "99 kr/mån" },
    { label: "1 år (intro)", price: "35 kr/mån" },
    { label: "2 år (intro)", price: "22 kr/mån" },
  ],
  conclusion: "PIA är det bästa valet för den som vill ha lågt pris, öppen källkod och obegränsat enheter (63/100 Super User, 67/100 Privacy). USA-jurisdiktionen är den enda riktigt stora nackdelen och gör det till ett sämre val för rena privacy-profiler. Streaming är begränsat (44/100).",
};

export default async function Page() {
  const result = await fetchReviewPricing("pia");
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
