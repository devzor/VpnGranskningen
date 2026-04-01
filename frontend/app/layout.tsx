import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geist = Geist({ subsets: ["latin"] });

const SITE_URL = "https://vpngranskningen.se";

export const metadata: Metadata = {
  title: {
    default:  "VpnGranskningen – Bästa VPN i Sverige 2026",
    template: "%s – VpnGranskningen",
  },
  description:
    "Oberoende granskning av bästa VPN i Sverige 2026. Vi jämför no-logs-policy, pris, jurisdiktion och streamingstöd – utan dolda provisioner.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  keywords: ["bästa VPN Sverige", "VPN recension", "VPN jämförelse", "no-logs VPN", "VPN integritet", "billig VPN Sverige"],
  openGraph: {
    type:        "website",
    locale:      "sv_SE",
    url:         SITE_URL,
    siteName:    "VpnGranskningen",
    title:       "VpnGranskningen – Bästa VPN i Sverige 2026",
    description: "Oberoende granskning av bästa VPN i Sverige 2026. Vi jämför no-logs-policy, pris, jurisdiktion och streamingstöd – utan dolda provisioner.",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "VpnGranskningen – Bästa VPN i Sverige 2026",
    description: "Oberoende granskning av bästa VPN i Sverige 2026. Vi jämför no-logs-policy, pris och jurisdiktion – utan dolda provisioner.",
  },
  robots: {
    index:          true,
    follow:         true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VpnGranskningen",
  url: SITE_URL,
  description: "Oberoende granskning av bästa VPN i Sverige 2026.",
  inLanguage: "sv-SE",
  publisher: {
    "@type": "Organization",
    name: "VpnGranskningen",
    url: SITE_URL,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/recensioner`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "w40mcvd32n");
        `}} />
      </head>
      <body className={`${geist.className} antialiased bg-white text-gray-900`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
