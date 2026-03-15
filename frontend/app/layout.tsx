import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VpnGranskningen – Oberoende VPN-jämförelse",
  description:
    "Hitta rätt VPN utan reklamsnack. Oberoende granskning av no-logs-policy, jurisdiktion, pris och streamingstöd.",
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
