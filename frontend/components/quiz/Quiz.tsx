"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JurisdictionRisk, RecommendResultDto, StreamingSupport, UserProfile, VpnSummaryDto } from "@/types/vpn";

const REVIEW_URLS: Record<string, string> = {
  nordvpn:    "/recensioner/nordvpn",
  mullvad:    "/recensioner/mullvad",
  protonvpn:  "/recensioner/protonvpn",
  surfshark:  "/recensioner/surfshark",
  expressvpn: "/recensioner/expressvpn",
  ivpn:       "/recensioner/ivpn",
  cyberghost: "/recensioner/cyberghost",
  pia:        "/recensioner/pia",
  windscribe: "/recensioner/windscribe",
  azirevpn:   "/recensioner/azirevpn",
  ovpn:       "/recensioner/ovpn",
  adguardvpn: "/recensioner/adguardvpn",
};
import { getAllVpns, getRecommendations } from "@/lib/api";
import ProfileCard from "./ProfileCard";
import VpnCardGrid from "@/components/cards/VpnCardGrid";

// ---------------------------------------------------------------------------
// Profiler
// ---------------------------------------------------------------------------
const PROFILES = [
  {
    profile:     UserProfile.StreamingAndTravel,
    icon:        "📺",
    accent:      "sky" as const,
    title:       "Netflix & Resor",
    description: "Du vill streama Netflix, BBC iPlayer och SVT Play utan krångel – hemma och utomlands. Pris och enkel app är viktigt.",
    keywords:    ["Streaming", "Bra pris", "Enkel app"],
  },
  {
    profile:     UserProfile.MaxPrivacy,
    icon:        "🔒",
    accent:      "violet" as const,
    title:       "Max Privacy",
    description: "Du vill ha verifierad no-logs-policy, oberoende audit och rätten att betala anonymt. Jurisdiktion spelar roll.",
    keywords:    ["No-logs", "Auditerad", "Anonym betalning"],
  },
  {
    profile:     UserProfile.Paranoid,
    icon:        "🛡️",
    accent:      "slate" as const,
    title:       "Super User",
    description: "Du vill ha absolut maximal integritet. Öppen källkod, multihop och Tor-stöd väger tyngre än pris.",
    keywords:    ["Öppen källkod", "Multihop", "Tor-stöd"],
  },
] as const;

const PROFILE_LABELS: Record<UserProfile, string> = {
  [UserProfile.StreamingAndTravel]: "Netflix & Resor",
  [UserProfile.MaxPrivacy]:         "Max Privacy",
  [UserProfile.Paranoid]:           "Super User",
};

// ---------------------------------------------------------------------------
// Tabell
// ---------------------------------------------------------------------------
type SortCol = "name" | "monthly" | "yearly" | "twoyear";
type SortDir = "asc" | "desc";

function sortVal(p: VpnSummaryDto, col: SortCol): string | number {
  switch (col) {
    case "name":    return p.name;
    case "monthly": return p.monthlyIntroPrice ?? Infinity;
    case "yearly":  return p.oneYearSubscriptionIntroPricePerMonth ?? Infinity;
    case "twoyear": return p.twoYearSubscriptionIntroPricePerMonth ?? Infinity;
  }
}

function RiskBadge({ risk }: { risk: JurisdictionRisk }) {
  switch (risk) {
    case JurisdictionRisk.Low:    return <span className="text-emerald-600 font-medium">Låg</span>;
    case JurisdictionRisk.Medium: return <span className="text-amber-500 font-medium">Medel</span>;
    case JurisdictionRisk.High:   return <span className="text-red-500 font-medium">Hög</span>;
  }
}

function StreamingBadge({ s }: { s: StreamingSupport }) {
  switch (s) {
    case StreamingSupport.Full:    return <span className="text-emerald-600">✓ Fullt</span>;
    case StreamingSupport.Partial: return <span className="text-amber-500">~ Delvis</span>;
    case StreamingSupport.None:    return <span className="text-gray-400">✗ Inget</span>;
  }
}

function Price({ n }: { n: number | null }) {
  if (n == null) return <span className="text-gray-300 text-xs italic">Erbjuds ej</span>;
  return <>{Math.round(n)} <span className="text-gray-400 text-xs">kr</span></>;
}

const TABLE_COLS: { key: SortCol; label: string; numeric?: boolean }[] = [
  { key: "name",    label: "Leverantör" },
  { key: "monthly", label: "1 mån/mån",  numeric: true },
  { key: "yearly",  label: "1 år/mån",   numeric: true },
  { key: "twoyear", label: "2 år/mån",   numeric: true },
];

function VpnTable({ providers }: { providers: VpnSummaryDto[] }) {
  const [sortCol, setSortCol] = useState<SortCol>("yearly");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function toggleSort(col: SortCol) {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  }

  const sorted = [...providers].sort((a, b) => {
    const av = sortVal(a, sortCol);
    const bv = sortVal(b, sortCol);
    if (av === bv) return 0;
    const cmp = av < bv ? -1 : 1;
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {TABLE_COLS.map(({ key, label, numeric }) => (
              <th
                key={key}
                onClick={() => toggleSort(key)}
                className={`px-4 py-3 font-semibold text-gray-500 cursor-pointer select-none whitespace-nowrap hover:text-gray-900 transition-colors ${numeric ? "text-right" : "text-left"}`}
              >
                {label}{sortCol === key && <span className="ml-1 text-gray-400">{sortDir === "asc" ? "↑" : "↓"}</span>}
              </th>
            ))}
            <th className="px-4 py-3 font-semibold text-gray-500 text-center whitespace-nowrap">No-logs</th>
            <th className="px-4 py-3 font-semibold text-gray-500 text-center whitespace-nowrap">Streaming</th>
            <th className="px-4 py-3 font-semibold text-gray-500 text-left   whitespace-nowrap">Jurisdiktion</th>
            <th className="px-4 py-3 font-semibold text-gray-500 text-center whitespace-nowrap">Risk</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p, i) => {
            const href = p.priceUrl ?? p.affiliateUrl ?? p.mainUrl ?? undefined;
            return (
              <tr key={p.slug} className={`border-b border-gray-50 hover:bg-slate-50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/40" : ""}`}>
                <td className="px-4 py-3.5 font-semibold text-gray-900 whitespace-nowrap">{p.name}</td>
                <td className="px-4 py-3.5 text-right text-gray-700 whitespace-nowrap"><Price n={p.monthlyIntroPrice} /></td>
                <td className="px-4 py-3.5 text-right text-gray-700 whitespace-nowrap"><Price n={p.oneYearSubscriptionIntroPricePerMonth} /></td>
                <td className="px-4 py-3.5 text-right text-gray-700 whitespace-nowrap"><Price n={p.twoYearSubscriptionIntroPricePerMonth} /></td>
                <td className="px-4 py-3.5 text-center">
                  {p.hasNoLogs
                    ? <span className="text-emerald-600">{p.isAudited ? "✓ Auditerad" : "✓"}</span>
                    : <span className="text-gray-300">–</span>}
                </td>
                <td className="px-4 py-3.5 text-center whitespace-nowrap"><StreamingBadge s={p.streamingSupport} /></td>
                <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{p.jurisdiction}</td>
                <td className="px-4 py-3.5 text-center whitespace-nowrap"><RiskBadge risk={p.jurisdictionRisk} /></td>
                <td className="px-3 py-3.5">
                  <div className="flex flex-col items-end gap-1.5">
                    {REVIEW_URLS[p.slug] && (
                      <Link href={REVIEW_URLS[p.slug]}
                        className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors whitespace-nowrap">
                        Recension
                      </Link>
                    )}
                    {href && (
                      <a href={href} target="_blank" rel="noopener noreferrer sponsored"
                        className="text-xs font-medium text-white bg-gray-900 rounded-lg px-2.5 py-1 hover:bg-gray-700 transition-colors whitespace-nowrap">
                        Besök →
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Huvud
// ---------------------------------------------------------------------------
type Tab = "cards" | "table";

export default function Quiz() {
  const [tab,         setTab]         = useState<Tab>("cards");
  const [selected,    setSelected]    = useState<UserProfile | null>(null);
  const [allVpns,     setAllVpns]     = useState<VpnSummaryDto[] | null>(null);
  const [results,     setResults]     = useState<RecommendResultDto[] | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingRec,  setLoadingRec]  = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  useEffect(() => {
    getAllVpns()
      .then(setAllVpns)
      .catch(() => setError("Kunde inte ansluta till API:t. Försök ladda om sidan."))
      .finally(() => setLoadingList(false));
  }, []);

  async function handleSelect(profile: UserProfile) {
    if (selected === profile) { setSelected(null); setResults(null); return; }
    setSelected(profile);
    setLoadingRec(true);
    setError(null);
    setResults(null);
    try {
      setResults(await getRecommendations(profile));
    } catch {
      setError("Kunde inte hämta rekommendationer. Försök igen.");
    } finally {
      setLoadingRec(false);
    }
  }

  const skeleton = (
    <div className="flex flex-col gap-3">
      {[...Array(4)].map((_, i) => <div key={i} className="h-32 rounded-2xl bg-gray-100 animate-pulse" />)}
    </div>
  );

  return (
    <div className="space-y-8">

      {/* Profilkort */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PROFILES.map((p) => (
          <ProfileCard
            key={p.profile}
            {...p}
            selected={selected === p.profile}
            onClick={() => handleSelect(p.profile)}
          />
        ))}
      </div>

      {/* Tabbar */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        {(["cards", "table"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px
              ${tab === t
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-700"}`}
          >
            {t === "cards" ? "Kortvyn" : "Tabellformat"}
          </button>
        ))}
        {selected && (
          <button
            onClick={() => { setSelected(null); setResults(null); }}
            className="ml-auto text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors pb-2"
          >
            Rensa val
          </button>
        )}
      </div>

      {/* Fel */}
      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-5 text-sm text-red-600">{error}</div>
      )}

      {/* Laddning */}
      {(loadingList || loadingRec) && !error && skeleton}

      {/* Kortvy */}
      {tab === "cards" && !loadingList && !loadingRec && !error && (
        results ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-400">
              Rekommendationer för <span className="font-medium text-gray-700">{PROFILE_LABELS[selected!]}</span> – rankade efter matchning
            </p>
            <VpnCardGrid mode="recommend" results={results} />
          </div>
        ) : allVpns ? (
          <VpnCardGrid mode="list" providers={allVpns} />
        ) : null
      )}

      {/* Tabellvy */}
      {tab === "table" && !loadingList && !error && allVpns && (
        <VpnTable providers={allVpns} />
      )}

    </div>
  );
}
