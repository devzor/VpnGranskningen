import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";
import { fetchReviewPricing } from "@/lib/reviewPricing";

export const metadata: Metadata = {
  title: "Proton VPN recension 2026",
  description: "Oberoende recension av Proton VPN 2026. Schweizisk jurisdiktion, öppen källkod, gratis nivå och Tor-stöd – allt om Proton VPN.",
  alternates: { canonical: "/recensioner/protonvpn" },
  openGraph: { title: "Proton VPN recension 2026", description: "Oberoende recension av Proton VPN 2026.", url: "/recensioner/protonvpn" },
};

const data: ReviewData = {
  slug:    "protonvpn",
  name:    "Proton VPN",
  tagline: "522 kr/mån (1 år) · WireGuard · Schweiz · Gratis nivå",
  intro:   "Proton VPN kommer från samma team som skapade ProtonMail och är baserat i Genève, Schweiz. Med öppen källkod, Tor over VPN, ett gratis abonnemang utan datagräns och ett av de mest imponerande poängen i vår Paranoid-modell (95/100) är det ett av de starkaste integritetsalternativen på marknaden.",
  mainUrl: "https://protonvpn.com/pricing",
  scores: { streaming: 66, privacy: 87, paranoid: 95 },
  scoreNotes: {
    streaming: "Fullt streamingstöd (40p) + hastighet 8/10 (16p) + alla plattformar (10p). Pris 52 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs + audit + Schweiz låg risk (35+25p) + crypto (12p) + öppen källkod + canary + transparensrapport (14p) + DNS + kill switch (6p). Audiт 2022 = inte färsk = 0p.",
    paranoid:  "Privacy-bas (35p) + multihop (12p) + Tor-stöd (12p) + obfuskering (10p) + öppen källkod (20p) + kill switch + split (6p) = 95p. Högst av alla leverantörer.",
  },
  facts: [
    ["Pris (intro)",  "52 kr/mån (1 år)"],
    ["Protokoll",     "WireGuard, OpenVPN, IKEv2, Stealth"],
    ["Jurisdiktion",  "Schweiz"],
    ["No-logs-audit", "Securitum (2022)"],
    ["Öppen källkod", "Ja"],
    ["Servrar",       "15 000 i 120 länder"],
    ["Enheter",       "10 samtidigt"],
    ["Gratis nivå",   "Ja – ingen datagräns"],
    ["Streaming",     "Fullt stöd"],
    ["SVT Play",      "Fungerar pålitligt"],
  ],
  pros: [
    "Schweiz – utanför EU och 14 Eyes, stark dataskyddslag",
    "Öppen källkod – alla appar granskningsbara",
    "Tor over VPN (Onion over VPN) inbyggt",
    "Gratis plan utan datагräns (begränsade servrar)",
    "Stealth-protokoll för obfuskering i censurerade länder",
    "15 000 servrar – ett av de största nätverken",
    "Warrant canary och transparensrapport",
  ],
  cons: [
    "Audiт senast 2022 – inte uppdaterad nyligen",
    "Gratis-nivån ger bara tillgång till 3 länder",
    "Accepterar inte kontanter",
    "Lite dyrare månadsplan (105 kr/mån)",
  ],
  sections: [
    {
      title: "Schweiz – varför det spelar roll",
      body:  "Schweiz är inte EU-medlem och lyder inte under EU:s datalagringsdirektiv. Landet har starka inhemskt dataskyddslagar och ingen historia av att pressa VPN-leverantörer. Det är en av de bästa jurisdiktionerna i Europa.\n\nProton AG har aktivt motståt utländska datakrav och publiciterat transparensrapporter som visar vilka förfrågningar de fått – och nekats."
    },
    {
      title: "Prestanda och streaming",
      body:  "Med 15 000 servrar i 120 länder har Proton VPN ett av de bredaste servernäten. WireGuard-hastigheten är god (8/10 i vår modell) och streaming på Netflix, BBC iPlayer och SVT Play fungerar pålitligt.\n\nStealth-protokollet är unikt och gör att VPN-trafiken ser ut som vanlig HTTPS – användbart i länder med censur."
    },
  ],
  pricing: [
    { label: "Månadsvis",    price: "105 kr/mån" },
    { label: "1 år (intro)", price: "52 kr/mån" },
    { label: "2 år (intro)", price: "35 kr/mån" },
  ],
  conclusion: "Proton VPN är det starkaste valet för Super User-profilen (95/100) och ligger högt även på Privacy (87/100). Schweizisk jurisdiktion, öppen källkod och Tor-stöd i kombination gör det till ett av marknadens mest integritetsstarka VPN. Audiтen från 2022 är den enda tydliga svagheten – förhoppningsvis uppdateras den snart.",
};

export default async function Page() {
  const result = await fetchReviewPricing("protonvpn");
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
