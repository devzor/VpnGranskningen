import type { Metadata } from "next";
import Quiz from "@/components/quiz/Quiz";

export const metadata: Metadata = {
  title: "VpnGranskningen – Bästa VPN för Sverige 2026",
  description:
    "Oberoende granskning av bästa VPN för Sverige 2026. Vi jämför no-logs-policy, pris, jurisdiktion och streamingstöd för 12 leverantörer – utan dolda provisioner.",
  alternates: { canonical: "/" },
  openGraph: {
    title:       "VpnGranskningen – Bästa VPN för Sverige 2026",
    description: "Oberoende granskning av bästa VPN för Sverige 2026. Vi jämför no-logs-policy, pris, jurisdiktion och streamingstöd för 12 leverantörer – utan dolda provisioner.",
    url:         "/",
  },
};

const TRUST_CHIPS = [
  { icon: "✓", text: "12 leverantörer granskade" },
  { icon: "✓", text: "Inga dolda provisioner" },
  { icon: "✓", text: "Uppdaterat mars 2026" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "white" }}>

      {/* Hero */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8">
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Oberoende granskning · Sverige 2026
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
              Bästa VPN för Sverige 2026 –{" "}
              <span className="text-slate-400">utan reklamsnack</span>
            </h1>
            <p className="text-base text-gray-400 leading-relaxed max-w-xl">
              Vi granskar no-logs-policy, jurisdiktion, oberoende audits och pris.
              Välj din profil nedan så matchar vi dig med rätt VPN.
            </p>
          </div>

          {/* CTA */}
          <div>
            <a
              href="#quiz"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm rounded-xl px-6 py-3 hover:bg-gray-100 transition-colors duration-150"
            >
              Hitta mitt VPN →
            </a>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-3">
            {TRUST_CHIPS.map(({ icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
              >
                <span className="text-emerald-400">{icon}</span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 sm:space-y-14">

        {/* Quiz */}
        <section id="quiz">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Vad är du ute efter?</h2>
            <p className="text-sm text-gray-500 mt-1">Välj din profil för personliga rekommendationer, eller bläddra i alla leverantörer nedan.</p>
          </div>
          <Quiz />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-4 text-xs">
          <div className="space-y-1">
            <p className="text-white font-semibold text-sm">VpnGranskningen</p>
            <p>© 2026 Oberoende granskning.</p>
          </div>
          <p className="max-w-sm text-right">
            Sajten finansieras via affiliate-länkar. Det påverkar inte våra betyg eller rekommendationer.
          </p>
        </div>
      </footer>

    </div>
  );
}
