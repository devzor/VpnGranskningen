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
// Betygskomponenter
// ---------------------------------------------------------------------------
function Stars({ score }: { score: number }) {
  const full  = Math.floor(score);
  const half  = score % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex gap-0.5 items-center">
      {[...Array(full)].map((_, i)  => <span key={`f${i}`} className="text-amber-400 text-lg">★</span>)}
      {half                          && <span className="text-amber-400 text-lg">½</span>}
      {[...Array(empty)].map((_, i) => <span key={`e${i}`} className="text-gray-200 text-lg">★</span>)}
    </span>
  );
}

function ScoreRow({ label, score, note }: { label: string; score: number; note?: string }) {
  const pct = (score / 5) * 100;
  const color =
    score >= 4.5 ? "bg-emerald-500" :
    score >= 3.5 ? "bg-amber-400"   :
    "bg-red-400";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">{score.toFixed(1)}<span className="text-gray-400 font-normal">/5</span></span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      {note && <p className="text-xs text-gray-400">{note}</p>}
    </div>
  );
}

function ProCon({ items, type }: { items: string[]; type: "pro" | "con" }) {
  const icon  = type === "pro" ? "✓" : "✗";
  const cls   = type === "pro" ? "text-emerald-600" : "text-red-400";
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
  const OVERALL = 4.5;

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
          <div className="flex items-center gap-3">
            <Stars score={OVERALL} />
            <span className="text-2xl font-bold text-gray-900">{OVERALL}</span>
            <span className="text-gray-400 text-sm">/ 5</span>
          </div>
          <p className="text-base text-gray-600 leading-relaxed">
            Mullvad är den VPN som sätter integritet framför allt annat. Öppen källkod, kontantbetalning,
            inga konton kopplade till e-post – och en av branschens mest transparenta no-logs-policyer,
            verifierad av NCC Group 2025. Priset är fast och enkelt: 59 kr/månad oavsett period.
          </p>
        </header>

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

        {/* Betyg per kategori */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Betyg per kategori</h2>
          <div className="space-y-4">
            <ScoreRow label="Integritet & säkerhet" score={5.0} note="No-logs verifierad, öppen källkod, accepterar kontanter och Monero" />
            <ScoreRow label="Transparens"           score={5.0} note="Warrant canary, transparensrapport, kontonummer utan e-post" />
            <ScoreRow label="Pris"                  score={4.5} note="Fast pris utan lockerbjudanden – enklare och mer ärligt än konkurrenterna" />
            <ScoreRow label="Prestanda"             score={4.0} note="WireGuard ger hög hastighet; serverparken är mindre än hos NordVPN/ExpressVPN" />
            <ScoreRow label="Streaming"             score={2.5} note="Fungerar ibland för Netflix men är inte prioriterat av Mullvad" />
            <ScoreRow label="Användarvänlighet"     score={3.5} note="Kontonummersystemet är unikt men kan förvirra nya användare" />
          </div>
        </section>

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
              "Streaming är inte prioriterat (Netflix fungerar sporadiskt)",
              "Bara 5 simultana enheter",
              "Ingen dedikerad IP-adress",
              "Sverige – 14 Eyes-land (se avsnittet nedan)",
              "Port forwarding borttaget 2023",
              "Inga långa prenumerationer med rabatt",
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
              kan begära ut data. I praktiken har detta aldrig skett med Mullvad – och bolaget har inget
              att lämna ut, eftersom ingen data sparas.
            </p>
            <p>
              År 2023 genomförde svensk polis en razzia mot Mullvads kontor. Ingen data confiskerades
              eftersom det bokstavligen inte finns något att ta. Det är det starkaste beviset för att
              no-logs-policyen faktiskt håller i verkligheten – inte bara på papper.
            </p>
            <p>
              <strong className="text-gray-900">NCC Group</strong> granskade Mullvads WireGuard-implementation
              2025 och bekräftade att no-logs-löftet upprätthålls tekniskt. Tidigare revisioner av
              Cure53 (2020, 2021) granskade klientapparna och infrastrukturen.
            </p>
            <p>
              Kontosystemet är unikt: du registrerar dig med ett kontonummer, inte ett mejl.
              Mullvad vet inte vem du är – ens om de ville berätta det.
            </p>
          </div>
        </section>

        {/* Pris */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Pris</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Mullvad tillämpar ett fast pris på <strong className="text-gray-900">59 kr/månad</strong> –
            inga introduktionserbjudanden, inga kampanjpriser som tripplas vid förnyelse.
            Det är ovanligt i en bransch full av lockpriser.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Månadsvis",  price: "59 kr/mån" },
              { label: "2 år",       price: "49 kr/mån" },
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
            Mullvad är det självklara valet för dig som sätter integritet och transparens i första
            rummet. Öppen källkod, verifierad no-logs-policy och möjligheten att betala anonymt
            gör det unikt i branschen. Polisrazzian 2023 visade i praktiken att systemet fungerar.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Är du primärt ute efter att streama Netflix eller vill ha riktigt många enheter finns
            bättre alternativ. Men för den som vill ha en VPN som faktiskt lever upp till sina
            integritetsløften finns det inget som slår Mullvad.
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
