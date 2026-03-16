import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VpnGranskningen – Bästa VPN i Sverige 2026",
  description: "Oberoende granskning av bästa VPN i Sverige 2026",
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
