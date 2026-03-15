import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om sajten – VpnGranskningen",
  description:
    "VpnGranskningen är en oberoende sajt som hjälper dig hitta rätt VPN-leverantör.",
};

export default function OmSajten() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-6 py-16">

        <section className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 leading-snug tracking-tight">
            Om sajten
          </h1>
        </section>

        <div className="space-y-10">

          <Section title="Vad är VpnGranskningen?">
            <p>
              VpnGranskningen är en oberoende sajt vars enda syfte är att hjälpa dig
              hitta en VPN-leverantör som passar just dig – oavsett om du vill streama
              utomlands, skydda din integritet eller ha absolut maximal anonymitet.
            </p>
            <p>
              Vi tar ingen hänsyn till vem som betalar mest i provision. Våra
              rekommendationer baseras på faktiska kriterier: verifierad no-logs-policy,
              oberoende säkerhetsrevisioner, jurisdiktion, pris och funktioner.
            </p>
          </Section>

          <Section title="Hur fungerar rekommendationerna?">
            <p>
              Du väljer en profil som beskriver vad du är ute efter. Utifrån det
              rankar vi leverantörerna med ett poängsystem som viktar de faktorer
              som spelar roll för just din användning. En streamingfokuserad profil
              värderar snabbhet och Netflix-stöd högt, medan en integritetsfokuserad
              profil prioriterar audit, jurisdiktion och anonyma betalningsmetoder.
            </p>
          </Section>

          <Section title="Finansiering">
            <p>
              Sajten finansieras via affiliate-länkar – om du klickar dig vidare
              och tecknar ett abonnemang kan vi få en provision. Det kostar dig
              ingenting extra.
            </p>
            <p>
              Provisioner påverkar inte ordningen på rekommendationerna. En
              leverantör som inte erbjuder affiliate-program kan fortfarande hamna
              högst om den faktiskt är bäst för din profil.
            </p>
          </Section>

        </div>
      </main>

      <footer className="border-t border-gray-100 mt-8">
        <div className="max-w-4xl mx-auto px-6 py-8 text-xs text-gray-400 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 VpnGranskningen. Oberoende granskning.</span>
          <span>Sajten finansieras via affiliate-länkar. Det påverkar inte våra betyg eller rekommendationer.</span>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="space-y-3 text-base text-gray-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
