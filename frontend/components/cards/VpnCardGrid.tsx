"use client";

import { useState } from "react";
import { RecommendResultDto, VpnSummaryDto } from "@/types/vpn";
import VpnCard from "./VpnCard";

type SortKey = "monthly" | "yearly" | "twoyear";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "monthly",  label: "Billigaste månadsplan"        },
  { key: "yearly",   label: "Billigaste 1-årsprenumeration" },
  { key: "twoyear",  label: "Billigaste 2-årsprenumeration" },
];

function priceFor(p: VpnSummaryDto, key: SortKey): number {
  switch (key) {
    case "monthly":  return p.monthlyIntroPrice                        ?? Infinity;
    case "yearly":   return p.oneYearSubscriptionIntroPricePerMonth    ?? Infinity;
    case "twoyear":  return p.twoYearSubscriptionIntroPricePerMonth    ?? Infinity;
  }
}

type VpnCardGridProps =
  | { mode: "recommend"; results: RecommendResultDto[] }
  | { mode: "list";      providers: VpnSummaryDto[]    };

export default function VpnCardGrid(props: VpnCardGridProps) {
  const [sort, setSort] = useState<SortKey | null>(null);

  if (props.mode === "recommend") {
    if (props.results.length === 0) return <EmptyState />;
    return (
      <section className="flex flex-col gap-3">
        {props.results.map((r, i) => (
          <VpnCard key={r.provider.slug} mode="recommend" result={r} topPick={i === 0} />
        ))}
      </section>
    );
  }

  if (props.providers.length === 0) return <EmptyState />;

  const sorted = sort
    ? [...props.providers].sort((a, b) => priceFor(a, sort) - priceFor(b, sort))
    : props.providers;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map(({ key, label }) => {
          const active = sort === key;
          return (
            <button
              key={key}
              onClick={() => setSort(active ? null : key)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors duration-150 ${
                active
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {sorted.map((p) => (
          <VpnCard key={p.slug} mode="list" provider={p} />
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <p className="text-sm text-gray-400 py-12 text-center">
      Inga VPN-leverantörer hittades.
    </p>
  );
}
