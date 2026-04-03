import type { Metadata } from "next";
import ReviewPage, { ReviewData } from "@/components/reviews/ReviewPage";
import { fetchReviewPricing } from "@/lib/reviewPricing";

export const metadata: Metadata = {
  title: "IVPN recension 2026",
  description: "Oberoende recension av IVPN 2026. 100/100 i Privacy-modellen, Gibraltar-jurisdiktion, öppen källkod och kontantbetalning.",
  alternates: { canonical: "/recensioner/ivpn" },
  openGraph: { title: "IVPN recension 2026", description: "Oberoende recension av IVPN 2026.", url: "/recensioner/ivpn" },
};

const data: ReviewData = {
  slug:    "ivpn",
  name:    "IVPN",
  tagline: "53 kr/mån (1 år) · WireGuard · Gibraltar · 100/100 Privacy",
  intro:   "IVPN är det enda VPN som uppnår 100/100 i vår Privacy-modell. Gibraltar-jurisdiktion (låg risk), Cure53-audit 2024, öppen källkod, kontantbetalning, warrant canary och multihop – alla brickor på plats. Det är okänt för många men är ett av de mest integritetsstarka alternativen som finns.",
  mainUrl: "https://www.ivpn.net/pricing/",
  scores: { streaming: 24, privacy: 100, paranoid: 88 },
  scoreNotes: {
    streaming: "Ingen streaming (0p) + hastighet 7/10 (14p) + alla plattformar (10p). Streaming är inte IVPNs fokus.",
    privacy:   "No-logs + audit + färsk Cure53-audit 2024 (35p) + Gibraltar låg risk (25p) + crypto + kontanter (20p) + öppen källkod + canary + transparensrapport (14p) + DNS + kill switch (6p) = 100p.",
    paranoid:  "Privacy-bas (40p) + multihop (12p) + obfuskering (10p) + öppen källkod (20p) + kill switch (4p) + split tunneling (2p). Saknar Tor-stöd (–12p mot max).",
  },
  facts: [
    ["Pris",          "53 kr/mån (1 år)"],
    ["Protokoll",     "WireGuard, OpenVPN"],
    ["Jurisdiktion",  "Gibraltar"],
    ["No-logs-audit", "Cure53 (2024)"],
    ["Öppen källkod", "Ja"],
    ["Kontanter",     "Ja"],
    ["Servrar",       "Ca 100 i 40 länder"],
    ["Enheter",       "7 samtidigt"],
    ["Streaming",     "Inget stöd"],
    ["SVT Play",      "Inget stöd"],
  ],
  pros: [
    "100/100 i vår Privacy-modell – max poäng",
    "Gibraltar – utanför EU och 14 Eyes",
    "Öppen källkod – alla appar granskningsbara",
    "Cure53-audit 2024 – no-logs verifierad",
    "Accepterar kontanter och crypto",
    "Warrant canary och transparensrapport",
    "Multihop och obfuskering ingår",
  ],
  cons: [
    "Inga streamingstjänster stöds – inte rätt för Netflix",
    "Litet servernät (~100 servrar i 40 länder)",
    "Relativt okänt – liten community och support",
    "Saknar Tor-stöd",
    "Ingen webbläsartillägg",
  ],
  sections: [
    {
      title: "Varför 100/100 i Privacy?",
      body:  "IVPN uppfyller varje kriterium i vår modell: verifierad no-logs med färsk audit, låg jurisdiktionsrisk, accepterar anonyma betalningar (kontant och Monero), öppen källkod, transparensrapport och warrant canary.\n\nDet är sällsynt att alla brickor är på plats. Mullvad och Proton VPN är starka, men IVPN är den enda som maxar alla kategorier."
    },
    {
      title: "Gibraltar – en underskattad jurisdiktion",
      body:  "Gibraltar är ett brittiskt utomeuropeiskt territorium med egna lagar – det är inte EU-land och ingår inte i 5/9/14 Eyes. Det brittiska parlamentet har ingen direkt jurisdiktion över Gibraltar i dessa frågor.\n\nFör den som är orolig för europeiska datalagringsregler är Gibraltar ett bättre alternativ än Sverige, Nederländerna eller Cypern."
    },
  ],
  pricing: [
    { label: "Månadsvis",    price: "63 kr/mån" },
    { label: "1 år",         price: "53 kr/mån" },
    { label: "2 år",         price: "42 kr/mån" },
  ],
  conclusion: "IVPN är det självklara valet för den som sätter integritet absolut först och inte behöver streaming (24/100). Med 100/100 i Privacy och 88/100 för Super User är det svårslaget i sin nisch. Det lilla servernätet och avsaknaden av streamingstöd är reella begränsningar – men de är medvetna val från ett bolag som inte kompromissar.",
};

export default async function Page() {
  const result = await fetchReviewPricing("ivpn");
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
