import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Starlink och VPN – surfar du säkrare med satellit?",
  description:
    "Ger Starlink bättre integritet och skydd mot myndighetsspårning jämfört med vanligt bredband? Vi reder ut vad Starlink faktiskt erbjuder – och var en VPN fortfarande behövs.",
  alternates: { canonical: "/starlink-vpn" },
  openGraph: {
    title: "Starlink och VPN – surfar du säkrare med satellit?",
    description:
      "Ger Starlink bättre integritet och skydd mot myndighetsspårning jämfört med vanligt bredband?",
    url: "/starlink-vpn",
  },
};

export default function StarlinkVpnPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-6 py-16">

        <section className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 leading-snug tracking-tight">
            Starlink och VPN – surfar du säkrare med satellit?
          </h1>
        </section>

        <div className="space-y-10">

          <Section title="Det korta svaret">
            <p>
              Nej – Starlink ger inte bättre skydd mot myndighetsspårning jämfört
              med vanligt bredband. Starlink är en internetleverantör precis som
              Telia eller Comhem, och lyder under lagar som kräver att de samarbetar
              med myndigheter om det finns rättsliga skäl.
            </p>
            <p>
              Vill du skydda din integritet online spelar det liten roll vilken
              anslutning du har – det är <em>vad du gör ovanpå anslutningen</em> som
              räknas.
            </p>
          </Section>

          <Section title="Varför Starlink inte är anonymare">
            <ul className="space-y-3">
              <UsageItem
                title="Du har en spårbar IP-adress"
                text="Starlink tilldelar din anslutning en IP-adress, precis som alla andra ISP:er. Den adressen kan kopplas till ditt konto."
              />
              <UsageItem
                title="SpaceX lyder under amerikansk lag"
                text="SpaceX är ett amerikanskt företag och är skyldigt att följa domstolsbeslut, bland annat FISA-begäranden om underrättelseinhämtning."
              />
              <UsageItem
                title="Metadata kan loggas"
                text="Tidpunkter, datamängder och anslutna domäner kan registreras av Starlink på samma sätt som av andra leverantörer."
              />
              <UsageItem
                title="Svenska myndigheter kan begära uppgifter"
                text="Genom internationella rättshjälpsavtal (MLAT) kan svenska myndigheter begära trafikdata från utländska bolag om de har rättsliga skäl."
              />
            </ul>
          </Section>

          <Section title="Vad spelar faktiskt roll för integriteten?">
            <p>
              Det är inte vem som äger satelliten som avgör om du kan spåras –
              det är vilka skyddslager du använder ovanpå din internetanslutning.
            </p>
            <ul className="space-y-3">
              <UsageItem
                title="VPN"
                text="Krypterar din trafik och döljer den från din ISP. Starlink ser bara att du är ansluten till en VPN-server – inte vad du gör. Välj en leverantör med verifierad no-logs-policy."
              />
              <UsageItem
                title="HTTPS"
                text="Krypterar innehållet i dina förfrågningar. Din ISP kan se vilka domäner du besöker, men inte vad du skickar eller tar emot."
              />
              <UsageItem
                title="Tor"
                text="Starkare anonymisering än VPN – din trafik studsar genom tre noder. Långsammare och mer omständligt, men svårare att spåra."
              />
            </ul>
          </Section>

          <Section title="Är Starlink bra till något annat?">
            <p>
              Absolut. Starlink är ett utmärkt val om du bor på en plats med dålig
              fiberutbyggnad, reser med husbil, är ute till havs eller befinner dig
              i ett område som drabbats av nätverksavbrott. Hastigheten är ofta
              imponerande jämfört med alternativa landsbygdslösningar.
            </p>
            <p>
              Men från ett integritets- och säkerhetsperspektiv är det varken bättre
              eller sämre än traditionellt bredband. Skyddet du behöver är detsamma
              oavsett om signalen kommer via satellit eller kabel.
            </p>
          </Section>

          <Section title="Slutsats: kombinera Starlink med VPN">
            <p>
              Starlink + VPN är en bra kombination om du exempelvis bor utanför
              städerna och vill ha snabb uppkoppling med integritetsskydd. VPN:en
              gör att Starlink (och SpaceX) inte kan se vad du gör – de ser bara
              att du är ansluten till en VPN-server.
            </p>
            <p>
              Välj en VPN med no-logs-policy och oberoende revision. Jurisdiktionen
              spelar roll – en leverantör baserad utanför USA och EU är svårare
              att tvinga att lämna ut uppgifter.
            </p>
          </Section>

          <section className="border-t border-gray-100 pt-10 flex flex-col gap-3">
            <p className="text-sm text-gray-500">
              Osäker på vilken VPN som passar dig? Vi hjälper dig hitta rätt baserat
              på vad du faktiskt behöver.
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
