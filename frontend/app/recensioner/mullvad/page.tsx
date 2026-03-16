import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mullvad VPN recension 2026",
  description:
    "Oberoende recension av Mullvad VPN 2026. Vi går igenom pris, integritet, no-logs-policy, NCC Group-audit, prestanda och vem Mullvad passar bäst.",
  alternates: { canonical: "/recensioner/mullvad" },
  openGraph: {
    title:       "Mullvad VPN recension 2026",
    description: "Oberoende recension av Mullvad VPN 2026 – pris, integritet och prestanda.",
    url:         "/recensioner/mullvad",
  },
};

// ---------------------------------------------------------------------------
// Betyg – beräknade från VpnGranskningen scoringmodell (se nedan)
// ---------------------------------------------------------------------------
const SCORES = {
  streaming: 46,  // Streaming & resor
  privacy:   75,  // Max Privacy
  paranoid:  78,  // Super User
};

function ScoreBar({ label, score, breakdown }: { label: string; score: number; breakdown: string }) {
  const color =
    score >= 70 ? "bg-emerald-500" :
    score >= 50 ? "bg-amber-400"   :
    "bg-red-400";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="font-bold text-gray-900 tabular-nums">{score}<span className="text-gray-400 font-normal">/100</span></span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-gray-400">{breakdown}</p>
    </div>
  );
}

function ProCon({ items, type }: { items: string[]; type: "pro" | "con" }) {
  const icon = type === "pro" ? "✓" : "✗";
  const cls  = type === "pro" ? "text-emerald-600" : "text-red-400";
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-gray-600">
          <span className={`shrink-0 font-bold ${cls}`}>{icon}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Sida
// ---------------------------------------------------------------------------
export default function MullvadRecension() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-6 py-14 space-y-12">

        {/* Brödsmula */}
        <nav className="text-xs text-gray-400 flex gap-1.5 items-center">
          <Link href="/" className="hover:text-gray-700 transition-colors">Hem</Link>
          <span>›</span>
          <span>Recensioner</span>
          <span>›</span>
          <span className="text-gray-600">Mullvad VPN</span>
        </nav>

        {/* Rubrik */}
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Recension · Uppdaterad mars 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            Mullvad VPN
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Mullvad är den VPN som sätter integritet framför allt annat. Öppen källkod, kontantbetalning,
            inga konton kopplade till e-post – och en av branschens mest transparenta no-logs-policyer,
            verifierad av NCC Group 2025.
          </p>
        </header>

        {/* Poäng */}
        <section className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Betyg per användarprofil</h2>
            <p className="text-sm text-gray-500 mt-1">
              Poängen beräknas automatiskt av{" "}
              <Link href="/#quiz" className="underline underline-offset-2 hover:text-gray-700">vår scoringmodell</Link>
              {" "}– se viktning nedan.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-5">
            <ScoreBar
              label="Netflix & Resor"
              score={SCORES.streaming}
              breakdown="Streaming delvis (20p) + hastighet 8/10 (16p) + alla plattformar (10p). Pris 59 kr/mån > 10 gränsen ger 0p på prisvärde."
            />
            <ScoreBar
              label="Max Privacy"
              score={SCORES.privacy}
              breakdown="No-logs + audit + färsk audit (35p) + accepterar crypto & kontanter (20p) + öppen källkod, canary, transparens (20p). Sverige = hög jurisdiktionsrisk = 0p av max 25p."
            />
            <ScoreBar
              label="Super User"
              score={SCORES.paranoid}
              breakdown="Privacy-bas (30p) + multihop (12p) + obfuskering (10p) + öppen källkod (20p) + kill switch & split tunneling (6p). Saknar Tor-stöd (–12p mot max)."
            />
          </div>

          {/* Viktningsförklaring */}
          <details className="rounded-xl border border-gray-200 text-sm">
            <summary className="px-4 py-3 cursor-pointer font-medium text-gray-700 hover:text-gray-900 select-none">
              Hur räknar vi? Visa viktning →
            </summary>
            <div className="px-4 pb-4 pt-2 space-y-4 text-gray-600">
              <div>
                <p className="font-semibold text-gray-800 mb-1">Netflix & Resor (max 100p)</p>
                <ul className="space-y-0.5 text-xs">
                  <li>Streaming – Fullt: 40p / Delvis: 20p / Inget: 0p</li>
                  <li>Ettårspris – ≤3 kr: 30p / ≤5 kr: 22p / ≤7 kr: 14p / ≤10 kr: 6p / Mer: 0p</li>
                  <li>Hastighetspoäng – SpeedScore × 2 (max 20p)</li>
                  <li>Plattformar – Win/Mac/iOS/Android: 10p om alla 4, annars proportionellt</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Max Privacy (max 100p)</p>
                <ul className="space-y-0.5 text-xs">
                  <li>No-logs: 15p | Auditerad: 15p | Färsk audit (≤2 år): 5p</li>
                  <li>Jurisdiktion – Låg risk: 25p / Medel: 12p / Hög: 0p</li>
                  <li>Accepterar crypto: 12p | Kontanter: 8p</li>
                  <li>Öppen källkod: 6p | Transparensrapport: 4p | Warrant canary: 4p</li>
                  <li>DNS-läckskydd: 4p | Kill switch: 2p</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Super User (max 100p)</p>
                <ul className="space-y-0.5 text-xs">
                  <li>Privacy-poäng × 0,4 (max 40p)</li>
                  <li>Multihop/Double VPN: 12p | Tor-stöd: 12p | Obfuskering: 10p</li>
                  <li>Kill switch: 4p | Split tunneling: 2p</li>
                  <li>Öppen källkod: 20p</li>
                </ul>
              </div>
            </div>
          </details>
        </section>

        {/* Snabbfakta */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 grid grid-cols-2 gap-4 text-sm">
          {[
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
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-gray-400 text-xs uppercase tracking-wide">{label}</p>
              <p className="font-medium text-gray-900 mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* För och emot */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900">Fördelar</h2>
            <ProCon type="pro" items={[
              "Öppen källkod – alla appar granskas publikt",
              "Inga konton kopplade till e-post",
              "Accepterar kontanter och Monero",
              "NCC Group-audit 2025 – no-logs verifierad",
              "Warrant canary och transparensrapport",
              "DAITA – skydd mot AI-baserad trafikanalys",
              "Fast, förutsägbart pris utan kampanjfällor",
              "Multihop och Shadowsocks för obfuskering",
            ]} />
          </div>
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900">Nackdelar</h2>
            <ProCon type="con" items={[
              "Streaming är inte prioriterat",
              "Bara 5 simultana enheter",
              "Ingen dedikerad IP-adress",
              "Sverige – 14 Eyes-land (se nedan)",
              "Port forwarding borttaget 2023",
              "Ingen rabatt på längre prenumerationer",
            ]} />
          </div>
        </section>

        {/* Integritet i detalj */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Integritet – den djupare analysen</h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              Mullvad är baserat i Göteborg av bolaget <strong className="text-gray-900">Amagicom AB</strong>.
              Sverige är ett 14 Eyes-land och EU-member, vilket i teorin innebär att svenska myndigheter
              kan begära ut data. Vår modell ger därför 0 av 25 möjliga jurisdiktionspoäng – det är
              den enskilt största orsaken till att Privacy-poängen stannar på 75 istället för 100.
            </p>
            <p>
              I praktiken har detta aldrig skett. År 2023 genomförde svensk polis en razzia mot Mullvads kontor.
              Ingen data konfiskerades – eftersom det bokstavligen inte finns något att ta. Det är det
              starkaste möjliga beviset för att no-logs-policyn faktiskt håller.
            </p>
            <p>
              <strong className="text-gray-900">NCC Group</strong> granskade Mullvads WireGuard-implementation
              2025 och bekräftade att no-logs-löftet upprätthålls tekniskt. Tidigare revisioner av
              Cure53 (2020, 2021) granskade klientapparna och infrastrukturen.
            </p>
          </div>
        </section>

        {/* Pris */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Pris</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Mullvad tillämpar ett fast pris på <strong className="text-gray-900">59 kr/månad</strong> –
            inga introduktionserbjudanden, inga kampanjpriser som tripplas vid förnyelse.
            Väljer du 2-årsplan betalar du 49 kr/mån.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Månadsvis / 1 år", price: "59 kr/mån" },
              { label: "2 år",             price: "49 kr/mån" },
            ].map(({ label, price }) => (
              <div key={label} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{price}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">Alla priser inkl. moms.</p>
        </section>

        {/* Slutsats */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Slutsats – vem passar Mullvad?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Mullvad är det självklara valet för Max Privacy- och Super User-profiler. Med 75 respektive
            78 poäng i vår modell placerar det sig i toppen för integritetsfokuserade användare.
            Polisrazzian 2023 är det bästa tänkbara beviset för att systemet fungerar i verkligheten.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Är du primärt ute efter att streama Netflix (46p) eller vill ha riktigt lågt pris finns
            bättre alternativ. Men för den som sätter integritet och transparens i första rummet
            är Mullvad svårslagen.
          </p>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">Mullvad VPN</p>
              <p className="text-sm text-gray-500">59 kr/mån · WireGuard · NCC Group-auditerad</p>
            </div>
            <a
              href="https://mullvad.net/sv/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="shrink-0 text-sm font-semibold text-white bg-gray-900 rounded-xl px-5 py-2.5 hover:bg-gray-700 transition-colors"
            >
              Se erbjudande →
            </a>
          </div>
        </section>

        {/* Tillbaka */}
        <div className="pt-4 border-t border-gray-100">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
            ← Tillbaka till alla VPN
          </Link>
        </div>

      </main>
    </div>
  );
}
