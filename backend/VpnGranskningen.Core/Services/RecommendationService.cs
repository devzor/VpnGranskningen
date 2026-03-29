using VpnGranskningen.Core.Entities;
using VpnGranskningen.Core.Enums;

namespace VpnGranskningen.Core.Services;

public record VpnScore(VpnProvider Provider, int Score, string Motivation);

public static class RecommendationService
{
    /// <summary>
    /// Returnerar VPN-leverantörer rankade efter hur väl de matchar användarens profil.
    /// </summary>
    public static IReadOnlyList<VpnScore> Rank(IEnumerable<VpnProvider> providers, UserProfile profile)
    {
        return providers
            .Select(p => new VpnScore(p, Calculate(p, profile), BuildMotivation(p, profile)))
            .OrderByDescending(s => s.Score)
            .ToList();
    }

    public static int Calculate(VpnProvider p, UserProfile profile) => profile switch
    {
        UserProfile.StreamingAndTravel => ScoreStreaming(p),
        UserProfile.MaxPrivacy         => ScorePrivacy(p),
        UserProfile.BestOverall        => ScoreBestOverall(p),
        _                              => throw new ArgumentOutOfRangeException(nameof(profile)),
    };

    // -------------------------------------------------------------------------
    // Streaming & resor  (max 100p)
    // Viktning: streaming 40p | pris/värde 30p | prestanda 20p | plattformar 10p
    // -------------------------------------------------------------------------
    private static int ScoreStreaming(VpnProvider p)
    {
        var score = 0;

        // Streaming (40p)
        score += p.StreamingSupport switch
        {
            StreamingSupport.Full    => 40,
            StreamingSupport.Partial => 20,
            _                        => 0,
        };

        // Pris/värde (30p) – belönar lågt ettårspris
        score += p.Pricing.OneYearSubscriptionIntroPricePerMonth switch
        {
            <= 3m  => 30,
            <= 5m  => 22,
            <= 7m  => 14,
            <= 10m => 6,
            _      => 0,
        };

        // Prestanda (20p)
        score += (int)Math.Round(p.SpeedScore * 2.0);   // 1–10 → 2–20p

        // Plattformar – bred täckning (10p)
        var platforms = p.Platforms;
        var covered = new[] { platforms.Windows, platforms.MacOs, platforms.Ios, platforms.Android }
            .Count(x => x);
        score += covered switch { 4 => 10, 3 => 6, 2 => 3, _ => 0 };

        return Math.Clamp(score, 0, 100);
    }

    // -------------------------------------------------------------------------
    // Max privacy  (max 100p)
    // Viktning: no-logs+audit 35p | jurisdiktion 25p | anonym betalning 20p | features 20p
    // -------------------------------------------------------------------------
    private static int ScorePrivacy(VpnProvider p)
    {
        var score = 0;
        var priv = p.Privacy;

        // No-logs + audit (35p)
        if (priv.HasNoLogs) score += 15;
        if (priv.IsAudited) score += 15;
        if (priv.IsAudited && priv.AuditYear >= DateTime.UtcNow.Year - 2) score += 5; // Färsk audit

        // Jurisdiktion (25p)
        score += priv.JurisdictionRisk switch
        {
            JurisdictionRisk.Low    => 25,
            JurisdictionRisk.Medium => 12,
            _                       => 0,  // High eller okänt
        };

        // Anonyma betalningar (20p)
        if (priv.AcceptsCrypto) score += 12;
        if (priv.AcceptsCash)   score += 8;

        // Privacy-features (20p)
        if (priv.IsOpenSource)           score += 6;
        if (priv.HasTransparencyReport)  score += 4;
        if (priv.HasWarrantCanary)       score += 4;
        if (p.Features.HasDnsLeakProtection) score += 4;
        if (p.Features.HasKillSwitch)    score += 2;

        return Math.Clamp(score, 0, 100);
    }

    // -------------------------------------------------------------------------
    // Vår rekommendation / Best Overall (max 100p)
    // Viktning: privacy 30p | pris/värde 25p | hastighet 20p | streaming 15p | features 10p
    // -------------------------------------------------------------------------
    private static int ScoreBestOverall(VpnProvider p)
    {
        var score = 0;
        var priv = p.Privacy;
        var feat = p.Features;

        // Privacy (30p)
        if (priv.HasNoLogs) score += 10;
        if (priv.IsAudited) score += 10;
        score += priv.JurisdictionRisk switch
        {
            JurisdictionRisk.Low    => 8,
            JurisdictionRisk.Medium => 4,
            _                       => 0,
        };
        if (priv.AcceptsCrypto) score += 2;

        // Pris/värde (25p) – belönar lågt ettårspris
        score += p.Pricing.OneYearSubscriptionIntroPricePerMonth switch
        {
            <= 3m  => 25,
            <= 5m  => 18,
            <= 7m  => 11,
            <= 10m => 5,
            _      => 0,
        };

        // Hastighet (20p)
        score += (int)Math.Round(p.SpeedScore * 2.0);   // 1–10 → 2–20p

        // Streaming (15p)
        score += p.StreamingSupport switch
        {
            StreamingSupport.Full    => 15,
            StreamingSupport.Partial => 7,
            _                        => 0,
        };

        // Features (10p)
        if (feat.HasKillSwitch)      score += 3;
        if (feat.HasSplitTunneling)  score += 2;
        if (feat.HasObfuscation)     score += 2;
        if (feat.HasDoubleVpn)       score += 2;
        if (feat.HasDnsLeakProtection) score += 1;

        return Math.Clamp(score, 0, 100);
    }

    // -------------------------------------------------------------------------
    // Bygg en kort motiveringstext baserad på de starkaste faktorerna
    // -------------------------------------------------------------------------
    private static string BuildMotivation(VpnProvider p, UserProfile profile) => profile switch
    {
        UserProfile.StreamingAndTravel => BuildStreamingMotivation(p),
        UserProfile.MaxPrivacy         => BuildPrivacyMotivation(p),
        UserProfile.BestOverall        => BuildBestOverallMotivation(p),
        _                              => string.Empty,
    };

    private static string BuildStreamingMotivation(VpnProvider p)
    {
        var parts = new List<string>();
        if (p.StreamingSupport == StreamingSupport.Full)
            parts.Add("utmärkt streamingstöd");
        if (p.Pricing.OneYearSubscriptionIntroPricePerMonth <= 5m)
            parts.Add($"lågt pris ({p.Pricing.OneYearSubscriptionIntroPricePerMonth:F2} USD/mån)");
        if (p.SpeedScore >= 8)
            parts.Add("hög hastighet");
        return parts.Count > 0 ? string.Join(", ", parts) + "." : "solid allround-VPN.";
    }

    private static string BuildPrivacyMotivation(VpnProvider p)
    {
        var parts = new List<string>();
        var priv = p.Privacy;
        if (priv.HasNoLogs && priv.IsAudited)
            parts.Add($"verifierad no-logs (auditerad av {priv.AuditFirm ?? "oberoende firma"})");
        if (priv.JurisdictionRisk == JurisdictionRisk.Low)
            parts.Add($"lågriskjurisdiktion ({priv.Jurisdiction})");
        if (priv.AcceptsCrypto)
            parts.Add("accepterar kryptovaluta");
        return parts.Count > 0 ? string.Join(", ", parts) + "." : "god integritetsprofil.";
    }

    private static string BuildBestOverallMotivation(VpnProvider p)
    {
        var parts = new List<string>();
        var priv = p.Privacy;
        if (priv.HasNoLogs && priv.IsAudited)
            parts.Add("verifierad no-logs");
        if (p.Pricing.OneYearSubscriptionIntroPricePerMonth <= 5m)
            parts.Add($"bra pris ({p.Pricing.OneYearSubscriptionIntroPricePerMonth:F2} USD/mån)");
        if (p.SpeedScore >= 8)
            parts.Add("hög hastighet");
        if (p.StreamingSupport == StreamingSupport.Full)
            parts.Add("utmärkt streamingstöd");
        return parts.Count > 0 ? string.Join(", ", parts) + "." : "stark allround-VPN.";
    }
}
