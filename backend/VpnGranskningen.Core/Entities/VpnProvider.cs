using VpnGranskningen.Core.Enums;

namespace VpnGranskningen.Core.Entities;

public class VpnProvider
{
    public Guid Id { get; init; } = Guid.NewGuid();

    // --- Grundinfo ---
    public required string Name { get; set; }
    public required string Slug { get; set; }        // nordvpn, mullvad, proton
    public string? LogoUrl { get; set; }
    public string? MainUrl { get; set; }
    public string? PriceUrl { get; set; }
    public string? AffiliateUrl { get; set; }

    // --- Privacy ---
    public VpnPrivacy Privacy { get; set; } = new();

    // --- Features ---
    public VpnFeatures Features { get; set; } = new();

    // --- Priser ---
    public VpnPricing Pricing { get; set; } = new();

    // --- Plattformar ---
    public VpnPlatforms Platforms { get; set; } = new();

    // --- Streaming ---
    public StreamingSupport StreamingSupport { get; set; }
    public List<string> SupportedStreamingServices { get; set; } = [];

    // --- Performance ---
    public int SpeedScore { get; set; }        // 1–10, baserat på egna/externa tester
    public int ServerCount { get; set; }
    public int CountryCount { get; set; }

    // --- Redaktionellt ---
    public string? EditorSummary { get; set; }   // Kort motivering visas på kortet
    public string? EditorReview { get; set; }    // Längre text på VPN-sidan
    public bool IsFeatured { get; set; }
    public DateTime LastVerified { get; set; }   // När fakta senast kontrollerades
}

public class VpnPrivacy
{
    public bool HasNoLogs { get; set; }
    public bool IsAudited { get; set; }
    public int? AuditYear { get; set; }
    public string? AuditFirm { get; set; }           // t.ex. "Cure53", "Deloitte"
    public string Jurisdiction { get; set; } = string.Empty;
    public JurisdictionRisk JurisdictionRisk { get; set; }
    public bool AcceptsCrypto { get; set; }
    public bool AcceptsCash { get; set; }
    public bool IsOpenSource { get; set; }
    public bool HasTransparencyReport { get; set; }
    public bool HasWarrantCanary { get; set; }
}

public class VpnFeatures
{
    public List<string> Protocols { get; set; } = [];   // WireGuard, OpenVPN, IKEv2 …
    public bool HasKillSwitch { get; set; }
    public bool HasSplitTunneling { get; set; }
    public bool HasDoubleVpn { get; set; }              // Multihop
    public bool HasTorOverVpn { get; set; }
    public bool HasObfuscation { get; set; }            // Bypass censur/DPI
    public bool HasDnsLeakProtection { get; set; }
    public bool HasAdBlocker { get; set; }
    public int SimultaneousConnections { get; set; }    // 0 = obegränsat
}

public class VpnPricing
{
    // Månadsplan
    public decimal  MonthlyIntroPrice                       { get; set; }
    public decimal  MonthlyRegularPrice                     { get; set; }

    // 1-årsplan
    public decimal  OneYearSubscriptionIntroPricePerMonth   { get; set; }
    public decimal  OneYearSubscriptionRegularPricePerMonth { get; set; }
    public int?     OneYearBonusMonths                      { get; set; }

    // 2-årsplan
    public decimal? TwoYearSubscriptionIntroPricePerMonth   { get; set; }
    public decimal? TwoYearSubscriptionRegularPricePerMonth { get; set; }
    public int?     TwoYearBonusMonths                      { get; set; }

    public bool     HasFreeTier                             { get; set; }
    public int      MoneyBackDays                           { get; set; }
    public string   Currency                                { get; set; } = "SEK";
}

public class VpnPlatforms
{
    public bool Windows { get; set; }
    public bool MacOs { get; set; }
    public bool Linux { get; set; }
    public bool Ios { get; set; }
    public bool Android { get; set; }
    public bool Router { get; set; }
    public bool BrowserExtension { get; set; }
}
