import { JurisdictionRisk, RecommendResultDto, StreamingSupport, VpnSummaryDto } from "@/types/vpn";

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
// Priskolumn – en cell med etikett + belopp
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

export default function VpnCard(props: VpnCardProps) {
  const provider   = props.mode === "recommend" ? props.result.provider : props.provider;
  const score      = props.mode === "recommend" ? props.result.score     : null;
  const motivation = props.mode === "recommend" ? props.result.motivation : provider.editorSummary;
  const topPick    = props.topPick ?? false;

  const risk      = riskLabel(provider.jurisdictionRisk);
  const streaming = streamingLabel(provider.streamingSupport);
  const href      = provider.priceUrl ?? provider.affiliateUrl ?? provider.mainUrl ?? undefined;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`block bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-6 transition-shadow duration-200 ${href ? "hover:shadow-md hover:border-gray-200 cursor-pointer" : "cursor-default"}`}
    >
      {/* Vänster: namn, motivering, fakta */}
      <div className="flex flex-col gap-2 flex-1 min-w-0 max-w-md">
        <div className="flex items-start justify-between gap-4">
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

        {/* Faktarad */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-700 mt-auto pt-1">
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
        </div>
      </div>

      {/* Höger: priskolumner */}
      <div className="flex flex-col items-end gap-2 shrink-0 ml-16 sm:border-l sm:border-gray-100 sm:pl-6">
        <span className="text-xs text-gray-400">Alla priser inkl. moms</span>
        <div className="flex items-start gap-8">
        <PriceCell
          label="1-månad"
          introPrice={provider.monthlyIntroPrice}
          regularPrice={provider.monthlyRegularPrice}
        />
        <div className="w-px h-16 bg-gray-100 mt-1" />
        <PriceCell
          label="1-årsprenumeration"
          introPrice={provider.oneYearSubscriptionIntroPricePerMonth}
          regularPrice={provider.oneYearSubscriptionRegularPricePerMonth}
          bonusMonths={provider.oneYearBonusMonths}
        />
        <div className="w-px h-16 bg-gray-100 mt-1" />
        <PriceCell
          label="2-årsprenumeration"
          introPrice={provider.twoYearSubscriptionIntroPricePerMonth}
          regularPrice={provider.twoYearSubscriptionRegularPricePerMonth}
          bonusMonths={provider.twoYearBonusMonths}
        />
        </div>
      </div>
    </a>
  );
}
