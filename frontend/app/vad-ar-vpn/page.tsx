import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vad är en VPN? – VpnGranskningen",
  description:
    "En enkel förklaring av vad en VPN är, hur den fungerar och när du har nytta av en.",
};

export default function VadArVpn() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-6 py-16">

        {/* Rubrik */}
        <section className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 leading-snug tracking-tight">
            Vad är en VPN?
          </h1>
        </section>

        <div className="space-y-10">

        {/* Vad den gör */}
        <Section title="Den korta versionen">
          <p>
            En VPN – <em>Virtual Private Network</em> – är ett program du installerar
            på din telefon eller dator. När du slår på den skickas all din internettrafik
            genom en krypterad tunnel till en server i ett land du väljer, innan den
            når sin destination.
          </p>
          <p>
            Det betyder två saker: sajter du besöker ser serverns IP-adress istället
            för din, och ingen som sitter på samma nätverk som du (t.ex. ett café-wifi)
            kan läsa av vad du gör.
          </p>
        </Section>

        {/* Analogin */}
        <Section title="Tänk så här">
          <p>
            Föreställ dig att du skickar ett brev. Normalt ser postkontoret vem
            avsändaren är och vart det ska. Med en VPN lägger du istället brevet
            i ett ogenomskinligt kuvert, skickar det till en mellanhand i ett annat
            land, och mellanhanden skickar det vidare – utan ditt namn på kuvertet.
          </p>
          <p>
            Mottagaren ser bara att brevet kom från mellanhanden, inte från dig.
          </p>
        </Section>

        {/* När den är användbar */}
        <Section title="När har du nytta av en VPN?">
          <ul className="space-y-3">
            <UsageItem
              title="Öppna wifi på café, hotell eller flygplats"
              text="Dessa nät är osäkra. En VPN krypterar trafiken så att ingen på samma nätverk kan snoka."
            />
            <UsageItem
              title="Streama på resan"
              text="Är du utomlands och vill se SVT Play eller ett Netflix-bibliotek från ett annat land? Välj en server i rätt land så löser det sig."
            />
            <UsageItem
              title="Undvika spårning"
              text="Annonsörer och sajter kan inte koppla din surfhistorik till din riktiga IP-adress."
            />
            <UsageItem
              title="Privacy i vardagen"
              text="Din internetleverantör kan i normalfallet se vilka sajter du besöker. Med en VPN ser de bara att du är ansluten till en VPN-server."
            />
          </ul>
        </Section>

        {/* När du inte behöver */}
        <Section title="När behöver du inte en VPN?">
          <p>
            En VPN är inget magiskt skydd. Den skyddar dig inte mot virus, phishing
            eller svaga lösenord. Om du surfar hemifrån på ett säkert nätverk och inte
            bryr dig om att din leverantör kan se dina besök – är behovet litet.
          </p>
          <p>
            Det är också viktigt att förstå att du <em>litar på VPN-leverantören</em>{" "}
            istället för din internetleverantör. Välj därför en tjänst med verifierad
            no-logs-policy och oberoende revision.
          </p>
        </Section>

        {/* No-logs-förklaring */}
        <Section title="Vad betyder no-logs?">
          <p>
            En VPN-leverantör med <strong>no-logs-policy</strong> lovar att inte spara
            någon historik över vad du gjort online. Det går inte att lämna ut något
            till myndigheter om ingenting sparas.
          </p>
          <p>
            En <strong>oberoende audit</strong> innebär att ett externt säkerhetsföretag
            – exempelvis Cure53 eller Deloitte – har granskat koden och systemen och
            bekräftat att löftet faktiskt hålls.
          </p>
        </Section>

        {/* CTA */}
        <section className="border-t border-gray-100 pt-10 flex flex-col gap-3">
          <p className="text-sm text-gray-500">
            Redo att välja? Vi hjälper dig hitta rätt VPN baserat på vad du faktiskt behöver.
          </p>
          <a
            href="/"
            className="self-start text-sm font-medium text-white bg-gray-900 rounded-lg px-5 py-2.5 hover:bg-gray-700 transition-colors"
          >
            Hitta rätt VPN →
          </a>
        </section>

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

// ---------------------------------------------------------------------------
// Hjälpkomponenter
// ---------------------------------------------------------------------------

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

function UsageItem({ title, text }: { title: string; text: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-gray-300" />
      <span>
        <span className="font-medium text-gray-900">{title} – </span>
        {text}
      </span>
    </li>
  );
}
