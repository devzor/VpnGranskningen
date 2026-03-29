import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";
import { fetchReviewPricing } from "@/lib/reviewPricing";

export const metadata: Metadata = {
  title: "ExpressVPN recension 2026",
  description: "Oberoende recension av ExpressVPN 2026. Lightway-protokollet, KPMG-audit och det högsta priset på marknaden – är det värt det?",
  alternates: { canonical: "/recensioner/expressvpn" },
  openGraph: { title: "ExpressVPN recension 2026", description: "Oberoende recension av ExpressVPN 2026.", url: "/recensioner/expressvpn" },
};

const data: ReviewData = {
  slug:    "expressvpn",
  name:    "ExpressVPN",
  tagline: "70 kr/mån (1 år) · Lightway · Brittiska Jungfruöarna · KPMG-audit 2025",
  intro:   "ExpressVPN har länge positionerat sig som premium-valet och priset speglar det. Det egenutvecklade Lightway-protokollet levererar konstant hög hastighet och streamingstödet är branschens mest pålitliga. En KPMG-audit 2025 verifierar no-logs-policyn och Brittiska Jungfruöarna håller jurisdiktionsrisken låg.",
  mainUrl: "https://www.expressvpn.com/order",
  scores: { streaming: 68, privacy: 82, paranoid: 49 },
  scoreNotes: {
    streaming: "Fullt streamingstöd (40p) + hastighet 9/10 (18p) + alla plattformar (10p). Pris 70 kr/mån > 10 ger 0p på prisvärde.",
    privacy:   "No-logs + audit + färsk KPMG-audit 2025 (35p) + BVI låg risk (25p) + crypto (12p) + transparensrapport (4p) + DNS + kill switch (6p). Ej kontanter, ej öppen källkod.",
    paranoid:  "Privacy-bas (33p) + obfuskering (10p) + kill switch (4p) + split tunneling (2p). Saknar multihop och Tor-stöd, ej öppen källkod = låg poäng för Super User.",
  },
  facts: [
    ["Pris (intro)",  "70 kr/mån (1 år)"],
    ["Protokoll",     "Lightway, OpenVPN, IKEv2"],
    ["Jurisdiktion",  "Brittiska Jungfruöarna"],
    ["No-logs-audit", "KPMG (2025)"],
    ["Öppen källkod", "Nej (Lightway är öppen)"],
    ["Servrar",       "3 000 i 105 länder"],
    ["Enheter",       "8 samtidigt"],
    ["Streaming",     "Fullt stöd"],
  ],
  pros: [
    "Lightway-protokollet – snabbast i klassen",
    "Konsekvent streamingstöd för Netflix, BBC iPlayer m.fl.",
    "KPMG-audit 2025 – no-logs verifierad av Big Four",
    "Brittiska Jungfruöarna – utanför 14 Eyes",
    "Finns på fler plattformar än de flesta (router, TV m.m.)",
    "TrustedServer-teknologi – RAM-only servrar",
  ],
  cons: [
    "Dyraste alternativet i test (70 kr/mån intro, 136 kr/mån vid förnyelse)",
    "Ej öppen källkod (utom Lightway-protokollet)",
    "Inget multihop eller Tor-stöd",
    "Accepterar inte kontanter",
    "Inga warrant canary",
    "Ägt av Kape Technologies sedan 2019",
  ],
  sections: [
    {
      title: "Lightway – det egna protokollet",
      body:  "Lightway är ExpressVPNs egenutvecklade protokoll baserat på wolfSSL. Det är öppen källkod och designat för snabb uppkoppling (ofta under en sekund) och stabil prestanda på svaga nätverk som mobildata.\n\nI hastighetstester presterar Lightway konsekvent i topp – ofta marginellt bättre än NordLynx på långa avstånd."
    },
    {
      title: "Kape Technologies – är det ett problem?",
      body:  "ExpressVPN köptes av Kape Technologies 2021 för 936 miljoner dollar. Kape har historiskt ägt adware-bolag, vilket skapade oro i integritetskretsar.\n\nSedан förvärvet har ExpressVPN fortsatt oberoende audiтer och inga incidenter har rapporterats. Men för den som sätter absolut maximal trovärdighet i centrum är det relevant bakgrundsinformation."
    },
  ],
  pricing: [
    { label: "Månadsvis",    price: "136 kr/mån" },
    { label: "1 år (intro)", price: "70 kr/mån" },
    { label: "2 år (intro)", price: "55 kr/mån" },
  ],
  conclusion: "ExpressVPN är rätt val om du prioriterar hastighet och streaming (68/100) och inte låter priset stoppa dig. Privacy-profilen är stark (82/100) men Super User-poängen är låg (49/100) – bristen på multihop, Tor och öppen källkod kostar. Det finns billigare alternativ med likvärdig prestanda.",
};

export default async function Page() {
  const pricing = await fetchReviewPricing("expressvpn");
  return <ReviewPage data={pricing ? { ...data, pricing } : data} />;
}
