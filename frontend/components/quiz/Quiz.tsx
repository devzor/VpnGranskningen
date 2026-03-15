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
  const [open,     setOpen]     = useState(false);
  const [selected, setSelected] = useState<UserProfile | null>(null);
  const [allVpns,  setAllVpns]  = useState<VpnSummaryDto[] | null>(null);
  const [results,  setResults]  = useState<RecommendResultDto[] | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  // Ladda alla leverantörer vid mount
  useEffect(() => {
    getAllVpns()
      .then(setAllVpns)
      .catch(() => setError("Kunde inte hämta VPN-leverantörer. Kontrollera att API:t är igång."))
      .finally(() => setLoading(false));
  }, []);

  // Stäng modal med Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  async function handleSelect(profile: UserProfile) {
    setSelected(profile);
    setOpen(false);
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await getRecommendations(profile);
      setResults(data);
    } catch {
      setError("Kunde inte hämta rekommendationer. Kontrollera att API:t är igång och försök igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* Trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="text-sm font-medium text-white bg-gray-900 rounded-lg px-5 py-2.5 hover:bg-gray-700 transition-colors duration-150"
        >
          Välj din profil
        </button>
        {selected && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Visar rekommendationer för <span className="text-gray-900 font-medium">{PROFILE_LABELS[selected]}</span>
            </span>
            <button
              onClick={() => { setSelected(null); setResults(null); }}
              className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors duration-150"
            >
              Rensa
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden">
            {/* Header */}
            <div className="relative px-10 pt-10 pb-7 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Steg 1 av 1</p>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Vad är du ute efter?</h2>
              <p className="text-sm text-gray-500 mt-1">Välj din profil – vi hittar rätt VPN åt dig.</p>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors text-sm font-bold"
                aria-label="Stäng"
              >
                ✕
              </button>
            </div>

            {/* Cards */}
            <div className="p-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {PROFILES.map((p) => (
                  <ProfileCard
                    key={p.profile}
                    {...p}
                    selected={selected === p.profile}
                    onClick={() => handleSelect(p.profile)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kort */}
      {loading && (
        <p className="text-sm text-gray-400 py-8">Hämtar…</p>
      )}
      {error && (
        <p className="text-sm text-red-400 py-8">{error}</p>
      )}
      {!loading && !error && results && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Rankade efter hur väl de matchar din profil</p>
          <VpnCardGrid mode="recommend" results={results} />
        </div>
      )}
      {!loading && !error && !results && allVpns && (
        <VpnCardGrid mode="list" providers={allVpns} />
      )}

    </div>
  );
}
