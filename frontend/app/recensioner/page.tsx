import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Våra recensioner",
  description: "Oberoende recensioner av 12 VPN-leverantörer. Läs om vår ratingmodell och hur vi värderar integritet, pris, streaming och mer.",
  alternates: { canonical: "/recensioner" },
  openGraph: { title: "Våra recensioner – VpnGranskningen", description: "Oberoende recensioner av 12 VPN-leverantörer.", url: "/recensioner" },
};

const ALL_REVIEWS = [
  { slug: "nordvpn",    name: "NordVPN",                 scores: [68, 82, 73] },
  { slug: "mullvad",    name: "Mullvad",                  scores: [46, 75, 78] },
  { slug: "protonvpn",  name: "Proton VPN",               scores: [66, 87, 95] },
  { slug: "surfshark",  name: "Surfshark",                scores: [66, 64, 54] },
  { slug: "expressvpn", name: "ExpressVPN",               scores: [68, 82, 49] },
  { slug: "ivpn",       name: "IVPN",                     scores: [24, 100, 88] },
  { slug: "cyberghost", name: "CyberGhost",               scores: [66, 69, 34] },
  { slug: "pia",        name: "Private Internet Access",  scores: [44, 67, 63] },
  { slug: "windscribe", name: "Windscribe",               scores: [44, 62, 73] },
  { slug: "azirevpn",   name: "AzireVPN",                 scores: [24, 29, 16] },
  { slug: "ovpn",       name: "OVPN",                     scores: [66, 37, 31] },
  { slug: "adguardvpn", name: "AdGuard VPN",              scores: [44, 58, 59] },
];

function ScorePill({ score }: { score: number }) {
  const color = score >= 70 ? "bg-emerald-100 text-emerald-700" : score >= 50 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500";
  return <span className={`text-xs font-semibold rounded-full px-2 py-0.5 tabular-nums ${color}`}>{score}</span>;
}

export default function RecensionerIndex() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-14 flex gap-12">

        {/* Huvudinnehåll */}
        <main className="flex-1 min-w-0 space-y-12">

          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Recensioner · Mars 2026</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">Våra recensioner</h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Vi har granskat 12 VPN-leverantörer utifrån tre användarprofiler. Alla poäng beräknas automatiskt
              från samma modell – inga subjektiva omdömen, inga dolda provisioner som påverkar rangordningen.
            </p>
          </header>

          {/* Leverantörslista */}
          <section className="space-y-3">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 gap-y-0 text-xs font-semibold text-gray-400 uppercase tracking-wide px-4">
              <span>Leverantör</span>
              <span className="text-center w-16">Streaming</span>
              <span className="text-center w-16">Privacy</span>
              <span className="text-center w-16">Super&nbsp;User</span>
            </div>
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              {ALL_REVIEWS.map(({ slug, name, scores }, i) => (
                <Link
                  key={slug}
                  href={`/recensioner/${slug}`}
                  className={`grid grid-cols-[1fr_auto_auto_auto] gap-x-4 items-center px-4 py-3.5 hover:bg-slate-50 transition-colors ${i !== ALL_REVIEWS.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className="font-medium text-gray-900">{name}</span>
                  <span className="flex justify-center w-16"><ScorePill score={scores[0]} /></span>
                  <span className="flex justify-center w-16"><ScorePill score={scores[1]} /></span>
                  <span className="flex justify-center w-16"><ScorePill score={scores[2]} /></span>
                </Link>
              ))}
            </div>
          </section>

          {/* Ratingmodellen */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Hur vi räknar</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Varje leverantör poängsätts utifrån tre profiler. Poängen beräknas av samma algoritm som driver
              vår rekommendationsfunktion – det du ser här är exakt vad modellen ger, utan manuella justeringar.
            </p>

            <div className="space-y-6">

              <div className="rounded-2xl border border-gray-200 p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📺</span>
                  <h3 className="font-semibold text-gray-900">Netflix & Resor <span className="text-gray-400 font-normal text-sm">(max 100p)</span></h3>
                </div>
                <p className="text-sm text-gray-600">För den som vill streama och använda VPN på resan. Pris och enkelhet väger tungt.</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">Streaming</span>Fullt: 40p · Delvis: 20p · Inget: 0p</div>
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">Ettårspris</span>≤3 kr: 30p · ≤5 kr: 22p · ≤7 kr: 14p · ≤10 kr: 6p</div>
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">Hastighet</span>SpeedScore × 2 (max 20p)</div>
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">Plattformar</span>Win + Mac + iOS + Android: 10p</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔒</span>
                  <h3 className="font-semibold text-gray-900">Max Privacy <span className="text-gray-400 font-normal text-sm">(max 100p)</span></h3>
                </div>
                <p className="text-sm text-gray-600">För den som vill ha verifierad integritet. Jurisdiktion, audit och anonyma betalningar väger tungt.</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">No-logs + audit</span>No-logs: 15p · Auditerad: 15p · Färsk (≤2 år): 5p</div>
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">Jurisdiktion</span>Låg risk: 25p · Medel: 12p · Hög: 0p</div>
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">Anonyma betalningar</span>Crypto: 12p · Kontanter: 8p</div>
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">Transparens</span>Öppen källkod: 6p · Rapport: 4p · Canary: 4p · DNS: 4p · Kill switch: 2p</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛡️</span>
                  <h3 className="font-semibold text-gray-900">Super User <span className="text-gray-400 font-normal text-sm">(max 100p)</span></h3>
                </div>
                <p className="text-sm text-gray-600">För den som vill ha absolut maximal integritet. Öppen källkod och avancerade features väger tyngst. Pris ignoreras.</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">Privacy-grund</span>Privacy-poäng × 0,4 (max 40p)</div>
                  <div className="bg-gray-50 rounded-lg p-3"><span className="font-semibold block text-gray-900">Avancerade features</span>Multihop: 12p · Tor-stöd: 12p · Obfuskering: 10p · Kill switch: 4p · Split: 2p</div>
                  <div className="bg-gray-50 rounded-lg p-3 col-span-2"><span className="font-semibold block text-gray-900">Öppen källkod</span>20p – absolut krav för den paranoid-medvetne användaren</div>
                </div>
              </div>

            </div>
          </section>

          {/* Om objektivitet */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Om objektiviteten</h2>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                Alla poäng beräknas automatiskt från offentliga uppgifter – audit-rapporter, teknisk dokumentation
                och bekräftad data från leverantörernas egna sidor. Vi justerar inte poäng manuellt och
                rekommendationsordningen påverkas inte av om en leverantör betalar provision eller inte.
              </p>
              <p>
                Sajten finansieras via affiliate-länkar. Om du klickar dig vidare och tecknar ett abonnemang
                kan vi få en provision. Det kostar dig ingenting extra och påverkar inte våra betyg.
              </p>
              <p>
                Hittar du ett fel i datan eller vill att vi ska lägga till en leverantör?
                Modellen är öppen för insyn – viktningen redovisas fullt ut på varje recensionssida.
              </p>
            </div>
          </section>

        </main>

        {/* Sidmeny */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Alla recensioner</p>
            <nav className="flex flex-col gap-0.5">
              {ALL_REVIEWS.map(({ slug, name }) => (
                <Link
                  key={slug}
                  href={`/recensioner/${slug}`}
                  className="text-sm px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

      </div>
    </div>
  );
}
