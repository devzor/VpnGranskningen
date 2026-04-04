import Link from "next/link";
import { JurisdictionRisk, RecommendResultDto, StreamingSupport, VpnSummaryDto } from "@/types/vpn";

const LOGO_URLS: Record<string, string> = {
  mullvad: "/logos/mullvad.svg",
};

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

function scoreStyle(score: number) {
  if (score >= 80) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (score >= 60) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-gray-50 text-gray-500 border-gray-200";
}

function riskLabel(risk: JurisdictionRisk) {
  switch (risk) {
    case JurisdictionRisk.Low:    return { text: "Låg risk",   cls: "text-emerald-600" };
    case JurisdictionRisk.Medium: return { text: "Medel risk", cls: "text-amber-600"   };
    case JurisdictionRisk.High:   return { text: "Hög risk",   cls: "text-red-500"     };
  }
}

function streamingLabel(support: StreamingSupport) {
  switch (support) {
    case StreamingSupport.Full:    return { text: "Streaming: Fullt",  cls: "text-emerald-600", symbol: "✓" };
    case StreamingSupport.Partial: return { text: "Streaming: Delvis", cls: "text-amber-600",   symbol: "~" };
    case StreamingSupport.None:    return { text: "Streaming: Inget",  cls: "text-gray-400",    symbol: "✗" };
  }
}


type VpnCardProps =
  | { mode: "recommend"; result: RecommendResultDto; topPick?: boolean }
  | { mode: "list";      provider: VpnSummaryDto;   topPick?: boolean };

// ---------------------------------------------------------------------------
// Priskolumn – desktop
// ---------------------------------------------------------------------------
function PriceCell({ label, introPrice, regularPrice, bonusMonths }: {
  label:        string;
  introPrice:   number | null;
  regularPrice: number | null;
  bonusMonths?: number | null;
}) {
  if (introPrice == null) {
    return (
      <div className="flex flex-col items-center gap-0.5 w-[100px]">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{label}</span>
        <span className="mt-6 text-xs text-gray-300 italic whitespace-nowrap">Erbjuds ej</span>
      </div>
    );
  }

  const showRegular = regularPrice != null && regularPrice !== introPrice;

  return (
    <div className="flex flex-col items-center gap-0.5 w-[100px]">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{label}</span>
      <div className="flex items-baseline gap-0.5 mt-6">
        <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
          {Math.round(introPrice)} kr
        </span>
        <span className="text-sm text-gray-400">/mån</span>
      </div>
      {bonusMonths != null && (
        <span className="text-xs text-emerald-600 whitespace-nowrap">+{bonusMonths} mån gratis</span>
      )}
      {showRegular && (
        <span className="text-xs text-gray-400 whitespace-nowrap">sedan {Math.round(regularPrice!)} kr /mån</span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Kortkomponent
// ---------------------------------------------------------------------------
export default function VpnCard(props: VpnCardProps) {
  const provider   = props.mode === "recommend" ? props.result.provider : props.provider;
  const score      = props.mode === "recommend" ? props.result.score     : null;
  const motivation = props.mode === "recommend" ? props.result.motivation : provider.editorSummary;
  const topPick    = props.topPick ?? false;

  const risk       = riskLabel(provider.jurisdictionRisk);
  const streaming  = streamingLabel(provider.streamingSupport);
  const href       = provider.priceUrl ?? provider.affiliateUrl ?? provider.mainUrl ?? undefined;
  const reviewUrl  = REVIEW_URLS[provider.slug] ?? null;
  const logoUrl    = provider.logoUrl ?? LOGO_URLS[provider.slug] ?? null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:border-gray-300">
      {/* Layout: staplat på mobil, rad på desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

        {/* Vänster: namn, motivering, fakta */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">

          {/* Namn + score */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt={`${provider.name} logotyp`}
                  width={36}
                  height={36}
                  className="rounded-lg shrink-0"
                />
              )}
              <div>
                {topPick && (
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Bästa valet
                  </span>
                )}
                <h2 className={`font-semibold text-gray-900 leading-tight ${topPick ? "text-xl mt-0.5" : "text-lg"}`}>
                  {provider.name}
                </h2>
              </div>
            </div>
            {score !== null && (
              <span className={`shrink-0 text-sm font-semibold border rounded-full px-3 py-0.5 ${scoreStyle(score)}`}>
                {score}/100
              </span>
            )}
          </div>

          {motivation && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {motivation}
            </p>
          )}

          {/* Faktachips */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 mt-1">
            {provider.hasNoLogs && (
              <span className="text-emerald-600">
                ✓ No-logs{provider.isAudited ? " (auditerad)" : ""}
              </span>
            )}
            <span className={streaming.cls}>
              {streaming.symbol} {streaming.text}
            </span>
            <span className="text-gray-500">
              {provider.jurisdiction} · <span className={risk.cls}>{risk.text}</span>
            </span>
            {reviewUrl && (
              <Link
                href={reviewUrl}
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
              >
                Läs recension
              </Link>
            )}
          </div>

          {/* Mobilpriser – visas bara på mobil */}
          <div className="sm:hidden mt-3 pt-3 border-t border-gray-100">
            <p className="text-[11px] text-gray-400 mb-2">Alla priser inkl. moms</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "1 mån",  price: provider.monthlyIntroPrice,                     regular: provider.monthlyRegularPrice,                        bonus: null },
                { label: "1 år",   price: provider.oneYearSubscriptionIntroPricePerMonth,  regular: provider.oneYearSubscriptionRegularPricePerMonth,    bonus: provider.oneYearBonusMonths },
                { label: "2 år",   price: provider.twoYearSubscriptionIntroPricePerMonth,  regular: provider.twoYearSubscriptionRegularPricePerMonth,    bonus: provider.twoYearBonusMonths },
              ].map(({ label, price, regular, bonus }) => (
                <div key={label} className="bg-slate-50 rounded-xl p-2.5 flex flex-col gap-0.5">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</span>
                  {price != null ? (
                    <>
                      <span className="text-sm font-bold text-gray-900">{Math.round(price)} kr<span className="text-[11px] font-normal text-gray-400">/mån</span></span>
                      {regular != null && regular !== price && (
                        <span className="text-[11px] text-gray-400">→ {Math.round(regular)} kr</span>
                      )}
                      {bonus != null && (
                        <span className="text-[11px] text-emerald-600">+{bonus} mån</span>
                      )}
                    </>
                  ) : (
                    <span className="text-[11px] text-gray-300 italic mt-1">Erbjuds ej</span>
                  )}
                </div>
              ))}
            </div>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-3 w-full flex items-center justify-center text-sm font-medium text-white bg-gray-900 rounded-xl px-4 py-2.5 hover:bg-gray-700 transition-colors"
              >
                Se erbjudande →
              </a>
            )}
          </div>
        </div>

        {/* Höger: priskolumner + CTA – visas bara på desktop */}
        <div className="hidden sm:flex flex-col items-end gap-3 shrink-0 sm:border-l sm:border-gray-100 sm:pl-6">
          <span className="text-xs text-gray-400">Alla priser inkl. moms</span>
          <div className="flex items-start gap-8">
            <PriceCell
              label="1-månad"
              introPrice={provider.monthlyIntroPrice}
              regularPrice={provider.monthlyRegularPrice}
            />
            <div className="w-px h-16 bg-gray-100 mt-1" />
            <PriceCell
              label="1-år"
              introPrice={provider.oneYearSubscriptionIntroPricePerMonth}
              regularPrice={provider.oneYearSubscriptionRegularPricePerMonth}
              bonusMonths={provider.oneYearBonusMonths}
            />
            <div className="w-px h-16 bg-gray-100 mt-1" />
            <PriceCell
              label="2-år"
              introPrice={provider.twoYearSubscriptionIntroPricePerMonth}
              regularPrice={provider.twoYearSubscriptionRegularPricePerMonth}
              bonusMonths={provider.twoYearBonusMonths}
            />
          </div>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full text-center text-sm font-medium text-white bg-gray-900 rounded-xl px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Se erbjudande →
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
