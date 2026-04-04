import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookiepolicy",
  description: "Information om hur VpnGranskningen.se använder cookies.",
  alternates: { canonical: "/cookiepolicy" },
  robots: { index: false, follow: false },
};

export default function CookiePolicyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Cookiepolicy</h1>

      <section className="space-y-4 mb-10">
        <p>
          Den här sidan förklarar vilka cookies som används på{" "}
          <strong>vpngranskningen.se</strong>, varför de används och hur du kan
          hantera dem.
        </p>
      </section>

      <section className="space-y-3 mb-10">
        <h2 className="text-lg font-semibold text-gray-900">Vad är en cookie?</h2>
        <p>
          En cookie är en liten textfil som lagras i din webbläsare när du besöker
          en webbplats. Cookies används för att webbplatsen ska fungera korrekt,
          för att komma ihåg dina val och för att samla in statistik om hur
          besökare använder sidan.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-lg font-semibold text-gray-900">Cookies vi använder</h2>

        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Cookie</th>
                <th className="text-left px-4 py-3 font-semibold">Leverantör</th>
                <th className="text-left px-4 py-3 font-semibold">Syfte</th>
                <th className="text-left px-4 py-3 font-semibold">Varaktighet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">cookie_consent</td>
                <td className="px-4 py-3 text-gray-600">vpngranskningen.se</td>
                <td className="px-4 py-3 text-gray-600">Sparar ditt val i cookie-bannern</td>
                <td className="px-4 py-3 text-gray-600">Tills du rensar webbläsardata</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 font-mono text-xs text-gray-700">_clsk, _clck</td>
                <td className="px-4 py-3 text-gray-600">Microsoft Clarity</td>
                <td className="px-4 py-3 text-gray-600">Beteendeanalys: värmekartor, sessionsinspeningar och klickstatistik</td>
                <td className="px-4 py-3 text-gray-600">1 dag – 1 år</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">MR, MUID, CLID</td>
                <td className="px-4 py-3 text-gray-600">Microsoft</td>
                <td className="px-4 py-3 text-gray-600">Spårning kopplad till Microsoft Clarity</td>
                <td className="px-4 py-3 text-gray-600">7 dagar – 1 år</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3 mb-10">
        <h2 className="text-lg font-semibold text-gray-900">Microsoft Clarity</h2>
        <p>
          Vi använder Microsoft Clarity för att förstå hur besökare interagerar
          med sidan. Verktyget samlar in anonymiserad data om musrörelser,
          scrollbeteende, klick och sidvisningar. Inga personuppgifter som namn
          eller e-postadress lagras.
        </p>
        <p>
          Läs mer i{" "}
          <a
            href="https://privacy.microsoft.com/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-gray-700 hover:text-gray-900"
          >
            Microsofts integritetspolicy
          </a>
          .
        </p>
      </section>

      <section className="space-y-3 mb-10">
        <h2 className="text-lg font-semibold text-gray-900">Hantera cookies</h2>
        <p>
          Du kan när som helst radera cookies i din webbläsares inställningar.
          Du kan också blockera cookies helt, men det kan påverka hur webbplatsen
          fungerar.
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-900">Google Chrome</a>
          </li>
          <li>
            <a href="https://support.mozilla.org/sv/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-900">Mozilla Firefox</a>
          </li>
          <li>
            <a href="https://support.apple.com/sv-se/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-900">Apple Safari</a>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Kontakt</h2>
        <p>
          Har du frågor om hur vi hanterar cookies kan du kontakta oss via{" "}
          <a href="/om-sajten" className="underline underline-offset-2 hover:text-gray-900">
            om-sajten
          </a>
          .
        </p>
      </section>
    </main>
  );
}
