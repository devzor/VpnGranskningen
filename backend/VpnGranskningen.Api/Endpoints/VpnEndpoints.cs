using VpnGranskningen.Api.DTOs;
using VpnGranskningen.Core.Entities;
using VpnGranskningen.Core.Interfaces;
using VpnGranskningen.Core.Services;

namespace VpnGranskningen.Api.Endpoints;

public static class VpnEndpoints
{
    public static IEndpointRouteBuilder MapVpnEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/vpns").WithTags("VPN");

        group.MapGet("/", GetAll)
            .WithName("GetAllVpns")
            .WithSummary("Hämtar alla VPN-leverantörer som kortsammanfattningar.");

        group.MapGet("/{slug}", GetBySlug)
            .WithName("GetVpnBySlug")
            .WithSummary("Hämtar fullständig information om en VPN-leverantör.");

        group.MapPost("/recommend", Recommend)
            .WithName("RecommendVpns")
            .WithSummary("Returnerar rankade rekommendationer baserat på vald användarprofil.");

        return app;
    }

    // GET /api/vpns
    private static async Task<IResult> GetAll(
        IVpnRepository repo,
        CancellationToken ct)
    {
        var providers = await repo.GetAllAsync(ct);
        return Results.Ok(providers.Select(ToSummary));
    }

    // GET /api/vpns/{slug}
    private static async Task<IResult> GetBySlug(
        string slug,
        IVpnRepository repo,
        CancellationToken ct)
    {
        var provider = await repo.GetBySlugAsync(slug, ct);
        return provider is null
            ? Results.NotFound()
            : Results.Ok(ToDetail(provider));
    }

    // POST /api/vpns/recommend
    private static async Task<IResult> Recommend(
        RecommendRequest request,
        IVpnRepository repo,
        CancellationToken ct)
    {
        var providers = await repo.GetAllAsync(ct);
        var ranked    = RecommendationService.Rank(providers, request.Profile);

        var results = ranked.Select(r => new RecommendResultDto(
            Provider   : ToSummary(r.Provider),
            Score      : r.Score,
            Motivation : r.Motivation
        ));

        return Results.Ok(results);
    }

    // -------------------------------------------------------------------------
    // Mappning domain → DTO
    // -------------------------------------------------------------------------
    private static VpnSummaryDto ToSummary(VpnProvider p) => new(
        Slug                : p.Slug,
        Name                : p.Name,
        LogoUrl             : p.LogoUrl,
        MainUrl             : p.MainUrl,
        PriceUrl            : p.PriceUrl,
        AffiliateUrl        : p.AffiliateUrl,
        MonthlyIntroPrice                       : p.Pricing.MonthlyIntroPrice,
        MonthlyRegularPrice                     : p.Pricing.MonthlyRegularPrice,
        OneYearSubscriptionIntroPricePerMonth   : p.Pricing.OneYearSubscriptionIntroPricePerMonth,
        OneYearSubscriptionRegularPricePerMonth : p.Pricing.OneYearSubscriptionRegularPricePerMonth,
        OneYearBonusMonths                      : p.Pricing.OneYearBonusMonths,
        TwoYearSubscriptionIntroPricePerMonth   : p.Pricing.TwoYearSubscriptionIntroPricePerMonth,
        TwoYearSubscriptionRegularPricePerMonth : p.Pricing.TwoYearSubscriptionRegularPricePerMonth,
        TwoYearBonusMonths                      : p.Pricing.TwoYearBonusMonths,
        HasNoLogs                               : p.Privacy.HasNoLogs,
        IsAudited           : p.Privacy.IsAudited,
        Jurisdiction        : p.Privacy.Jurisdiction,
        JurisdictionRisk    : p.Privacy.JurisdictionRisk,
        StreamingSupport    : p.StreamingSupport,
        SpeedScore          : p.SpeedScore,
        ServerCount         : p.ServerCount,
        CountryCount        : p.CountryCount,
        EditorSummary       : p.EditorSummary
    );

    private static VpnDetailDto ToDetail(VpnProvider p) => new(
        Slug                        : p.Slug,
        Name                        : p.Name,
        LogoUrl                     : p.LogoUrl,
        MainUrl                     : p.MainUrl,
        PriceUrl                    : p.PriceUrl,
        AffiliateUrl                : p.AffiliateUrl,
        HasNoLogs                   : p.Privacy.HasNoLogs,
        IsAudited                   : p.Privacy.IsAudited,
        AuditYear                   : p.Privacy.AuditYear,
        AuditFirm                   : p.Privacy.AuditFirm,
        Jurisdiction                : p.Privacy.Jurisdiction,
        JurisdictionRisk            : p.Privacy.JurisdictionRisk,
        AcceptsCrypto               : p.Privacy.AcceptsCrypto,
        AcceptsCash                 : p.Privacy.AcceptsCash,
        IsOpenSource                : p.Privacy.IsOpenSource,
        HasTransparencyReport       : p.Privacy.HasTransparencyReport,
        HasWarrantCanary            : p.Privacy.HasWarrantCanary,
        Protocols                   : p.Features.Protocols,
        HasKillSwitch               : p.Features.HasKillSwitch,
        HasSplitTunneling           : p.Features.HasSplitTunneling,
        HasDoubleVpn                : p.Features.HasDoubleVpn,
        HasTorOverVpn               : p.Features.HasTorOverVpn,
        HasObfuscation              : p.Features.HasObfuscation,
        HasDnsLeakProtection        : p.Features.HasDnsLeakProtection,
        HasAdBlocker                : p.Features.HasAdBlocker,
        SimultaneousConnections     : p.Features.SimultaneousConnections,
        MonthlyIntroPrice                       : p.Pricing.MonthlyIntroPrice,
        MonthlyRegularPrice                     : p.Pricing.MonthlyRegularPrice,
        OneYearSubscriptionIntroPricePerMonth   : p.Pricing.OneYearSubscriptionIntroPricePerMonth,
        OneYearSubscriptionRegularPricePerMonth : p.Pricing.OneYearSubscriptionRegularPricePerMonth,
        OneYearBonusMonths                      : p.Pricing.OneYearBonusMonths,
        TwoYearSubscriptionIntroPricePerMonth   : p.Pricing.TwoYearSubscriptionIntroPricePerMonth,
        TwoYearSubscriptionRegularPricePerMonth : p.Pricing.TwoYearSubscriptionRegularPricePerMonth,
        TwoYearBonusMonths                      : p.Pricing.TwoYearBonusMonths,
        HasFreeTier                             : p.Pricing.HasFreeTier,
        MoneyBackDays               : p.Pricing.MoneyBackDays,
        Windows                     : p.Platforms.Windows,
        MacOs                       : p.Platforms.MacOs,
        Linux                       : p.Platforms.Linux,
        Ios                         : p.Platforms.Ios,
        Android                     : p.Platforms.Android,
        Router                      : p.Platforms.Router,
        BrowserExtension            : p.Platforms.BrowserExtension,
        StreamingSupport            : p.StreamingSupport,
        SupportedStreamingServices  : p.SupportedStreamingServices,
        SpeedScore                  : p.SpeedScore,
        ServerCount                 : p.ServerCount,
        CountryCount                : p.CountryCount,
        EditorSummary               : p.EditorSummary,
        EditorReview                : p.EditorReview,
        LastVerified                : p.LastVerified
    );
}
