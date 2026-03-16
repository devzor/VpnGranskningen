"use client";

import { useEffect, useState } from "react";
import { RecommendResultDto, UserProfile, VpnSummaryDto } from "@/types/vpn";
import { getAllVpns, getRecommendations } from "@/lib/api";
import ProfileCard from "./ProfileCard";
import VpnCardGrid from "@/components/cards/VpnCardGrid";

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

export default function Quiz() {
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
    if (selected === profile) {
      setSelected(null);
      setResults(null);
      return;
    }
    setSelected(profile);
    setLoadingRec(true);
    setError(null);
    setResults(null);

    try {
      const data = await getRecommendations(profile);
      setResults(data);
    } catch {
      setError("Kunde inte hämta rekommendationer. Försök igen.");
    } finally {
      setLoadingRec(false);
    }
  }

  return (
    <div className="space-y-10">

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

      {/* Resultat */}
      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-5 text-sm text-red-600">
          {error}
        </div>
      )}

      {loadingList && !error && (
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {loadingRec && (
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {!loadingList && !loadingRec && !error && results && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">
            Rekommendationer för <span className="font-medium text-gray-700">{PROFILE_LABELS[selected!]}</span> – rankade efter matchning
          </p>
          <VpnCardGrid mode="recommend" results={results} />
          <button
            onClick={() => { setSelected(null); setResults(null); }}
            className="mt-2 text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
          >
            Rensa val – visa alla leverantörer
          </button>
        </div>
      )}

      {!loadingList && !loadingRec && !error && !results && allVpns && (
        <VpnCardGrid mode="list" providers={allVpns} />
      )}

    </div>
  );
}
