import Quiz from "@/components/quiz/Quiz";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-6 py-16 space-y-14">

        {/* Hero */}
        <section className="space-y-4 max-w-2xl">
          <h1 className="text-3xl font-semibold text-gray-900 leading-snug tracking-tight">
            Hitta rätt VPN – utan reklamsnack
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            Vi granskar no-logs-policy, jurisdiktion, oberoende audits och pris.
            Inga dolda provisioner som styr resultaten – välj din profil nedan så
            matchar vi dig med rätt VPN.
          </p>
        </section>

        {/* Quiz */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
            Vad är du ute efter?
          </h2>
          <Quiz />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8 text-xs text-gray-400 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 VpnGranskningen. Oberoende granskning.</span>
          <span>
            Sajten finansieras via affiliate-länkar. Det påverkar inte våra
            betyg eller rekommendationer.
          </span>
        </div>
      </footer>

    </div>
  );
}
