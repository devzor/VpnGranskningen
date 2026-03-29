using VpnGranskningen.Core.Enums;

namespace VpnGranskningen.Api.DTOs;

/// <summary>Kompakt kortvy – används i listningar och quiz-resultat.</summary>
public record VpnSummaryDto(
    string              Slug,
    string              Name,
    string?             LogoUrl,
    string?             MainUrl,
    string?             PriceUrl,
    string?             AffiliateUrl,
    decimal             MonthlyIntroPrice,
    decimal             MonthlyRegularPrice,
    decimal?            OneYearSubscriptionIntroPricePerMonth,
    decimal?            OneYearSubscriptionRegularPricePerMonth,
    int?                OneYearBonusMonths,
    decimal?            TwoYearSubscriptionIntroPricePerMonth,
    decimal?            TwoYearSubscriptionRegularPricePerMonth,
    int?                TwoYearBonusMonths,
    bool                HasNoLogs,
    bool                IsAudited,
    string              Jurisdiction,
    JurisdictionRisk    JurisdictionRisk,
    StreamingSupport    StreamingSupport,
    int                 SpeedScore,
    int                 ServerCount,
    int                 CountryCount,
    string?             EditorSummary
);

/// <summary>Fullständig detaljvy – används på enskilda VPN-sidor.</summary>
public record VpnDetailDto(
    string              Slug,
    string              Name,
    string?             LogoUrl,
    string?             MainUrl,
    string?             PriceUrl,
    string?             AffiliateUrl,

    // Privacy
    bool                HasNoLogs,
    bool                IsAudited,
    int?                AuditYear,
    string?             AuditFirm,
    string              Jurisdiction,
    JurisdictionRisk    JurisdictionRisk,
    bool                AcceptsCrypto,
    bool                AcceptsCash,
    bool                IsOpenSource,
    bool                HasTransparencyReport,
    bool                HasWarrantCanary,

    // Features
    List<string>        Protocols,
    bool                HasKillSwitch,
    bool                HasSplitTunneling,
    bool                HasDoubleVpn,
    bool                HasTorOverVpn,
    bool                HasObfuscation,
    bool                HasDnsLeakProtection,
    bool                HasAdBlocker,
    int                 SimultaneousConnections,

    // Pricing
    decimal             MonthlyIntroPrice,
    decimal             MonthlyRegularPrice,
    decimal?            OneYearSubscriptionIntroPricePerMonth,
    decimal?            OneYearSubscriptionRegularPricePerMonth,
    int?                OneYearBonusMonths,
    decimal?            TwoYearSubscriptionIntroPricePerMonth,
    decimal?            TwoYearSubscriptionRegularPricePerMonth,
    int?                TwoYearBonusMonths,
    bool                HasFreeTier,
    int                 MoneyBackDays,

    // Platforms
    bool                Windows,
    bool                MacOs,
    bool                Linux,
    bool                Ios,
    bool                Android,
    bool                Router,
    bool                BrowserExtension,

    // Streaming & performance
    StreamingSupport    StreamingSupport,
    List<string>        SupportedStreamingServices,
    int                 SpeedScore,
    int                 ServerCount,
    int                 CountryCount,

    // Redaktionellt
    string?             EditorSummary,
    string?             EditorReview,
    DateTime            LastVerified
);

/// <summary>Svar från quiz-rekommendationen – en rankat VPN med motivering.</summary>
public record RecommendResultDto(
    VpnSummaryDto   Provider,
    int             Score,
    string          Motivation
);

/// <summary>Request-body till POST /vpns/recommend.</summary>
public record RecommendRequest(UserProfile Profile);
