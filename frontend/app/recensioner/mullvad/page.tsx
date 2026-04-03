import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";
import { fetchReviewPricing } from "@/lib/reviewPricing";

export const metadata: Metadata = {
  title: "Mullvad VPN recension 2026",
  description: "Oberoende recension av Mullvad VPN 2026. Vi går igenom pris, integritet, no-logs-policy, NCC Group-audit, prestanda och vem Mullvad passar bäst.",
  alternates: { canonical: "/recensioner/mullvad" },
  openGraph: { title: "Mullvad VPN recension 2026", description: "Oberoende recension av Mullvad VPN 2026 – pris, integritet och prestanda.", url: "/recensioner/mullvad" },
};

const data: ReviewData = {
  slug:    "mullvad",
  name:    "Mullvad VPN",
  tagline: "59 kr/mån · WireGuard · NCC Group-auditerad 2025",
  intro:   "Mullvad är den VPN som sätter integritet framför allt annat. Öppen källkod, kontantbetalning, inga konton kopplade till e-post – och en av branschens mest transparenta no-logs-policyer, verifierad av NCC Group 2025. Priset är fast och enkelt: 59 kr/månad oavsett period.",
  mainUrl: "https://mullvad.net/sv/pricing",
  scores: { streaming: 46, privacy: 75, paranoid: 78 },
  scoreNotes: {
    streaming: "Streaming delvis (20p) + hastighet 8/10 (16p) + alla plattformar (10p). Pris 59 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs + audit + färsk NCC Group-audit 2025 (35p) + crypto + kontanter (20p) + öppen källkod + canary + transparensrapport (14p) + DNS + kill switch (6p). Sverige = hög jurisdiktionsrisk = 0p av max 25p.",
    paranoid:  "Privacy-bas (30p) + multihop (12p) + obfuskering (10p) + öppen källkod (20p) + kill switch (4p) + split tunneling (2p). Saknar Tor-stöd (–12p mot max).",
  },
  facts: [
    ["Pris",           "59 kr/mån (fast)"],
    ["Protokoll",      "WireGuard, Shadowsocks"],
    ["Jurisdiktion",   "Sverige"],
    ["No-logs-audit",  "NCC Group (2025)"],
    ["Öppen källkod",  "Ja"],
    ["Anonymt konto",  "Ja – inget mejl krävs"],
    ["Crypto/kontant", "Ja"],
    ["Servrar",        "Ca 700 i 50 länder"],
    ["Enheter",        "5 samtidigt"],
    ["Streaming",      "Delvis"],
    ["SVT Play",       "Delvis – varierar"],
  ],
  pros: [
    "Öppen källkod – alla appar granskas publikt",
    "Inga konton kopplade till e-post",
    "Accepterar kontanter och Monero",
    "NCC Group-audit 2025 – no-logs verifierad",
    "Warrant canary och transparensrapport",
    "DAITA – skydd mot AI-baserad trafikanalys",
    "Fast, förutsägbart pris utan kampanjfällor",
    "Multihop och Shadowsocks för obfuskering",
  ],
  cons: [
    "Streaming är inte prioriterat – SVT Play fungerar ibland men garanteras inte",
    "Bara 5 simultana enheter",
    "Ingen dedikerad IP-adress",
    "Sverige – 14 Eyes-land",
    "Port forwarding borttaget 2023",
    "Ingen rabatt på längre prenumerationer",
  ],
  sections: [
    {
      title: "Integritet – den djupare analysen",
      body: "Mullvad är baserat i Göteborg av bolaget Amagicom AB. Sverige är ett 14 Eyes-land och EU-member, vilket i teorin innebär att svenska myndigheter kan begära ut data. Vår modell ger därför 0 av 25 möjliga jurisdiktionspoäng – det är den enskilt största orsaken till att Privacy-poängen stannar på 75 istället för 100.\n\nI praktiken har detta aldrig skett. År 2023 genomförde svensk polis en razzia mot Mullvads kontor. Ingen data konfiskerades – eftersom det bokstavligen inte finns något att ta. Det är det starkaste möjliga beviset för att no-logs-policyn faktiskt håller.\n\nNCC Group granskade Mullvads WireGuard-implementation 2025 och bekräftade att no-logs-löftet upprätthålls tekniskt.",
    },
    {
      title: "Pris – flat rate utan fällor",
      body: "Mullvad tillämpar ett fast pris på 59 kr/månad – inga introduktionserbjudanden, inga kampanjpriser som tripplas vid förnyelse. Väljer du 2-årsplan betalar du 49 kr/mån. Det är ovanligt i en bransch full av lockpriser.",
    },
  ],
  pricing: [
    { label: "Månadsvis / 1 år", price: "59 kr/mån" },
    { label: "2 år",             price: "49 kr/mån" },
  ],
  conclusion: "Mullvad är det självklara valet för Max Privacy- och Super User-profiler. Med 75 respektive 78 poäng i vår modell placerar det sig i toppen för integritetsfokuserade användare. Polisrazzian 2023 är det bästa tänkbara beviset för att systemet fungerar i verkligheten. Är du primärt ute efter streaming (46p) eller vill ha riktigt lågt pris finns bättre alternativ.",
};

export default async function Page() {
  const result = await fetchReviewPricing("mullvad");
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
