"use client";

import { useEffect, useState } from "react";
import { JurisdictionRisk, StreamingSupport, VpnSummaryDto } from "@/types/vpn";
import { getAllVpns } from "@/lib/api";

type SortCol = "name" | "monthly" | "yearly" | "twoyear" | "speed" | "servers";
type SortDir = "asc" | "desc";

function val(p: VpnSummaryDto, col: SortCol): string | number {
  switch (col) {
    case "name":     return p.name;
    case "monthly":  return p.monthlyIntroPrice ?? Infinity;
    case "yearly":   return p.oneYearSubscriptionIntroPricePerMonth ?? Infinity;
    case "twoyear":  return p.twoYearSubscriptionIntroPricePerMonth ?? Infinity;
    case "speed":    return p.speedScore;
    case "servers":  return p.serverCount;
  }
}

function riskBadge(risk: JurisdictionRisk) {
  switch (risk) {
    case JurisdictionRisk.Low:    return <span className="text-emerald-600 font-medium">Låg</span>;
    case JurisdictionRisk.Medium: return <span className="text-amber-500 font-medium">Medel</span>;
    case JurisdictionRisk.High:   return <span className="text-red-500 font-medium">Hög</span>;
  }
}

function streamingBadge(s: StreamingSupport) {
  switch (s) {
    case StreamingSupport.Full:    return <span className="text-emerald-600">✓ Fullt</span>;
    case StreamingSupport.Partial: return <span className="text-amber-500">~ Delvis</span>;
    case StreamingSupport.None:    return <span className="text-gray-400">✗ Inget</span>;
  }
}

function price(n: number | null) {
  if (n == null) return <span className="text-gray-300 text-xs italic">Erbjuds ej</span>;
  return <span>{Math.round(n)} <span className="text-gray-400 text-xs">kr</span></span>;
}

const COLS: { key: SortCol; label: string; numeric?: boolean }[] = [
  { key: "name",    label: "Leverantör" },
  { key: "monthly", label: "1 mån/mån",  numeric: true },
  { key: "yearly",  label: "1 år/mån",   numeric: true },
  { key: "twoyear", label: "2 år/mån",   numeric: true },
  { key: "speed",   label: "Hastighet",  numeric: true },
  { key: "servers", label: "Servrar",    numeric: true },
];

export default function JamforPage() {
  const [vpns,    setVpns]    = useState<VpnSummaryDto[] | null>(null);
  const [error,   setError]   = useState(false);
  const [sortCol, setSortCol] = useState<SortCol>("yearly");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  useEffect(() => {
    getAllVpns().then(setVpns).catch(() => setError(true));
  }, []);

  function toggleSort(col: SortCol) {
    if (sortCol === col) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortDir(col === "name" ? "asc" : "asc");
    }
  }

  const sorted = vpns ? [...vpns].sort((a, b) => {
    const av = val(a, sortCol);
    const bv = val(b, sortCol);
    if (av === bv) return 0;
    const cmp = av < bv ? -1 : 1;
    return sortDir === "asc" ? cmp : -cmp;
  }) : [];

  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="mb-8 space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Jämför alla VPN</h1>
          <p className="text-sm text-gray-500">Klicka på kolumnrubriken för att sortera. Alla priser per månad inkl. moms.</p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-5 text-sm text-red-600">
            Kunde inte hämta data. Försök ladda om sidan.
          </div>
        )}

        {!vpns && !error && (
          <div className="flex flex-col gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {sorted.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {COLS.map(({ key, label, numeric }) => (
                    <th
                      key={key}
                      onClick={() => toggleSort(key)}
                      className={`px-4 py-3 font-semibold text-gray-500 cursor-pointer select-none whitespace-nowrap hover:text-gray-900 transition-colors
                        ${numeric ? "text-right" : "text-left"}`}
                    >
                      {label}
                      {sortCol === key && (
                        <span className="ml-1 text-gray-400">{sortDir === "asc" ? "↑" : "↓"}</span>
                      )}
                    </th>
                  ))}
                  <th className="px-4 py-3 font-semibold text-gray-500 text-center whitespace-nowrap">No-logs</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-center whitespace-nowrap">Streaming</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-left whitespace-nowrap">Jurisdiktion</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-center whitespace-nowrap">Risk</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((p, i) => {
                  const href = p.priceUrl ?? p.affiliateUrl ?? p.mainUrl ?? undefined;
                  return (
                    <tr
                      key={p.slug}
                      className={`border-b border-gray-50 transition-colors hover:bg-slate-50 ${i % 2 === 0 ? "" : "bg-gray-50/40"}`}
                    >
                      <td className="px-4 py-3.5 font-semibold text-gray-900 whitespace-nowrap">
                        {href ? (
                          <a href={href} target="_blank" rel="noopener noreferrer sponsored"
                            className="hover:underline underline-offset-2">
                            {p.name}
                          </a>
                        ) : p.name}
                      </td>
                      <td className="px-4 py-3.5 text-right text-gray-700 whitespace-nowrap">{price(p.monthlyIntroPrice)}</td>
                      <td className="px-4 py-3.5 text-right text-gray-700 whitespace-nowrap">{price(p.oneYearSubscriptionIntroPricePerMonth)}</td>
                      <td className="px-4 py-3.5 text-right text-gray-700 whitespace-nowrap">{price(p.twoYearSubscriptionIntroPricePerMonth)}</td>
                      <td className="px-4 py-3.5 text-right text-gray-700 whitespace-nowrap">
                        {p.speedScore > 0 ? `${p.speedScore}/100` : <span className="text-gray-300 text-xs italic">–</span>}
                      </td>
                      <td className="px-4 py-3.5 text-right text-gray-700 whitespace-nowrap">
                        {p.serverCount > 0 ? p.serverCount.toLocaleString("sv-SE") : <span className="text-gray-300 text-xs italic">–</span>}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {p.hasNoLogs
                          ? <span className="text-emerald-600">{p.isAudited ? "✓ Auditerad" : "✓"}</span>
                          : <span className="text-gray-300">–</span>}
                      </td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">{streamingBadge(p.streamingSupport)}</td>
                      <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{p.jurisdiction}</td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">{riskBadge(p.jurisdictionRisk)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
