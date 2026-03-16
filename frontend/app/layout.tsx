import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geist = Geist({ subsets: ["latin"] });

const SITE_URL = "https://frontend-production-67ff.up.railway.app";

export const metadata: Metadata = {
  title: {
    default:  "VpnGranskningen – Bästa VPN i Sverige 2026",
    template: "%s – VpnGranskningen",
  },
  description:
    "Oberoende granskning av bästa VPN i Sverige 2026. Vi jämför no-logs-policy, pris, jurisdiktion och streamingstöd – utan dolda provisioner.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type:        "website",
    locale:      "sv_SE",
    url:         SITE_URL,
    siteName:    "VpnGranskningen",
    title:       "VpnGranskningen – Bästa VPN i Sverige 2026",
    description: "Oberoende granskning av bästa VPN i Sverige 2026. Vi jämför no-logs-policy, pris, jurisdiktion och streamingstöd – utan dolda provisioner.",
  },
  twitter: {
    card:        "summary",
    title:       "VpnGranskningen – Bästa VPN i Sverige 2026",
    description: "Oberoende granskning av bästa VPN i Sverige 2026.",
  },
  robots: {
    index:          true,
    follow:         true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${geist.className} antialiased bg-slate-50 text-gray-900`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
