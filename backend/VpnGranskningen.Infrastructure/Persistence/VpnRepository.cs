using Dapper;
using VpnGranskningen.Core.Entities;
using VpnGranskningen.Core.Enums;
using VpnGranskningen.Core.Interfaces;

namespace VpnGranskningen.Infrastructure.Persistence;

public sealed class VpnRepository(IDbConnectionFactory connectionFactory) : IVpnRepository
{
    // Bas-query – JOINar vpn_provider_links (URLs) och vpn_provider_pricing (priser)
    private const string BaseSelect = """
        SELECT
            vp.*,
            MAX(CASE WHEN vpl.link_type = 'main'  THEN vpl.url END) AS main_url,
            MAX(CASE WHEN vpl.link_type = 'price' THEN vpl.url END) AS price_url,
            MAX(vpp.monthly_intro_price)                                          AS monthly_intro_price,
            MAX(vpp.monthly_regular_price)                                        AS monthly_regular_price,
            MAX(vpp."1_year_subscription_intro_price_per_month")                  AS one_year_subscription_intro_price_per_month,
            MAX(vpp."1_year_subscription_regular_price_per_month")                AS one_year_subscription_regular_price_per_month,
            MAX(vpp."1_year_bonus_months")                                        AS one_year_bonus_months,
            MAX(vpp."2_year_subscription_intro_price_per_month")                  AS two_year_subscription_intro_price_per_month,
            MAX(vpp."2_year_subscription_regular_price_per_month")                AS two_year_subscription_regular_price_per_month,
            MAX(vpp."2_year_bonus_months")                                        AS two_year_bonus_months
        FROM vpn_provider vp
        LEFT JOIN vpn_provider_links   vpl ON vpl.vpn_provider_id = vp.vpn_provider_id
        LEFT JOIN vpn_provider_pricing vpp ON vpp.vpn_provider_id = vp.vpn_provider_id
        """;

    public async Task<IReadOnlyList<VpnProvider>> GetAllAsync(CancellationToken ct = default)
    {
        var sql = $"""
            {BaseSelect}
            GROUP BY vp.vpn_provider_id
            ORDER BY vp.is_featured DESC, vp.name ASC
            """;

        using var conn = connectionFactory.Create();
        await conn.OpenAsync(ct);
        var rows = await conn.QueryAsync<VpnRow>(sql);
        return rows.Select(MapToDomain).ToList();
    }

    public async Task<VpnProvider?> GetBySlugAsync(string slug, CancellationToken ct = default)
    {
        var sql = $"""
            {BaseSelect}
            WHERE vp.slug = @Slug
            GROUP BY vp.vpn_provider_id
            LIMIT 1
            """;

        using var conn = connectionFactory.Create();
        await conn.OpenAsync(ct);
        var row = await conn.QuerySingleOrDefaultAsync<VpnRow>(sql, new { Slug = slug });
        return row is null ? null : MapToDomain(row);
    }

    public async Task<VpnProvider?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var sql = $"""
            {BaseSelect}
            WHERE vp.vpn_provider_id = @Id
            GROUP BY vp.vpn_provider_id
            LIMIT 1
            """;

        using var conn = connectionFactory.Create();
        await conn.OpenAsync(ct);
        var row = await conn.QuerySingleOrDefaultAsync<VpnRow>(sql, new { Id = id });
        return row is null ? null : MapToDomain(row);
    }

    public async Task UpsertAsync(VpnProvider p, CancellationToken ct = default)
    {
        const string sql = """
            INSERT INTO vpn_provider (
                vpn_provider_id, name, slug, logo_url, affiliate_url,
                streaming_support, supported_streaming_services,
                speed_score, server_count, country_count,
                editor_summary, editor_review, is_featured, last_verified,
                privacy, features, pricing, platforms
            ) VALUES (
                @VpnProviderId, @Name, @Slug, @LogoUrl, @AffiliateUrl,
                @StreamingSupport, @SupportedStreamingServices::jsonb,
                @SpeedScore, @ServerCount, @CountryCount,
                @EditorSummary, @EditorReview, @IsFeatured, @LastVerified,
                @Privacy::jsonb, @Features::jsonb, @Pricing::jsonb, @Platforms::jsonb
            )
            ON CONFLICT (slug) DO UPDATE SET
                name                        = EXCLUDED.name,
                logo_url                    = EXCLUDED.logo_url,
                affiliate_url               = EXCLUDED.affiliate_url,
                streaming_support           = EXCLUDED.streaming_support,
                supported_streaming_services = EXCLUDED.supported_streaming_services,
                speed_score                 = EXCLUDED.speed_score,
                server_count                = EXCLUDED.server_count,
                country_count               = EXCLUDED.country_count,
                editor_summary              = EXCLUDED.editor_summary,
                editor_review               = EXCLUDED.editor_review,
                is_featured                 = EXCLUDED.is_featured,
                last_verified               = EXCLUDED.last_verified,
                privacy                     = EXCLUDED.privacy,
                features                    = EXCLUDED.features,
                pricing                     = EXCLUDED.pricing,
                platforms                   = EXCLUDED.platforms
            """;

        using var conn = connectionFactory.Create();
        await conn.OpenAsync(ct);
        await conn.ExecuteAsync(sql, MapToRow(p));
    }

    // -------------------------------------------------------------------------
    // Intern rad-typ som matchar PostgreSQL-kolumnerna (snake_case via Dapper)
    // -------------------------------------------------------------------------
    private sealed record VpnRow
    {
        public Guid     VpnProviderId               { get; init; }
        public string   Name                        { get; init; } = "";
        public string   Slug                        { get; init; } = "";
        public string?  LogoUrl                     { get; init; }
        public string?  MainUrl                     { get; init; }
        public string?  PriceUrl                    { get; init; }
        public string?  AffiliateUrl                { get; init; }
        public int      StreamingSupport            { get; init; }
        public string   SupportedStreamingServices  { get; init; } = "[]";
        public int      SpeedScore                  { get; init; }
        public int      ServerCount                 { get; init; }
        public int      CountryCount                { get; init; }
        public string?  EditorSummary               { get; init; }
        public string?  EditorReview                { get; init; }
        public bool     IsFeatured                  { get; init; }
        public DateTime LastVerified                { get; init; }
        public string   Privacy                     { get; init; } = "{}";
        public string   Features                    { get; init; } = "{}";
        public string   Pricing                     { get; init; } = "{}";
        public string   Platforms                   { get; init; } = "{}";
        // Från vpn_provider_pricing
        public decimal  MonthlyIntroPrice                           { get; init; }
        public decimal  MonthlyRegularPrice                         { get; init; }
        public decimal? OneYearSubscriptionIntroPricePerMonth       { get; init; }
        public decimal? OneYearSubscriptionRegularPricePerMonth     { get; init; }
        public int?     OneYearBonusMonths                          { get; init; }
        public decimal? TwoYearSubscriptionIntroPricePerMonth       { get; init; }
        public decimal? TwoYearSubscriptionRegularPricePerMonth     { get; init; }
        public int?     TwoYearBonusMonths                          { get; init; }
    }

    private static VpnProvider MapToDomain(VpnRow r) => new()
    {
        Id                          = r.VpnProviderId,
        Name                        = r.Name,
        Slug                        = r.Slug,
        LogoUrl                     = r.LogoUrl,
        MainUrl                     = r.MainUrl,
        PriceUrl                    = r.PriceUrl,
        AffiliateUrl                = r.AffiliateUrl,
        StreamingSupport            = (StreamingSupport)r.StreamingSupport,
        SupportedStreamingServices  = Deserialize<List<string>>(r.SupportedStreamingServices),
        SpeedScore                  = r.SpeedScore,
        ServerCount                 = r.ServerCount,
        CountryCount                = r.CountryCount,
        EditorSummary               = r.EditorSummary,
        EditorReview                = r.EditorReview,
        IsFeatured                  = r.IsFeatured,
        LastVerified                = r.LastVerified,
        Privacy                     = Deserialize<VpnPrivacy>(r.Privacy),
        Features                    = Deserialize<VpnFeatures>(r.Features),
        Pricing                     = MapPricing(r),
        Platforms                   = Deserialize<VpnPlatforms>(r.Platforms),
    };

    private static VpnPricing MapPricing(VpnRow r)
    {
        var json = Deserialize<VpnPricing>(r.Pricing);
        return new VpnPricing
        {
            MonthlyIntroPrice                       = r.MonthlyIntroPrice,
            MonthlyRegularPrice                     = r.MonthlyRegularPrice,
            OneYearSubscriptionIntroPricePerMonth   = r.OneYearSubscriptionIntroPricePerMonth,
            OneYearSubscriptionRegularPricePerMonth = r.OneYearSubscriptionRegularPricePerMonth,
            OneYearBonusMonths                      = r.OneYearBonusMonths,
            TwoYearSubscriptionIntroPricePerMonth   = r.TwoYearSubscriptionIntroPricePerMonth,
            TwoYearSubscriptionRegularPricePerMonth = r.TwoYearSubscriptionRegularPricePerMonth,
            TwoYearBonusMonths                      = r.TwoYearBonusMonths,
            HasFreeTier          = json.HasFreeTier,
            MoneyBackDays        = json.MoneyBackDays,
            Currency             = "SEK",
        };
    }

    private static object MapToRow(VpnProvider p) => new
    {
        VpnProviderId               = p.Id,
        p.Name,
        p.Slug,
        p.LogoUrl,
        p.AffiliateUrl,
        StreamingSupport            = (int)p.StreamingSupport,
        SupportedStreamingServices  = Serialize(p.SupportedStreamingServices),
        p.SpeedScore,
        p.ServerCount,
        p.CountryCount,
        p.EditorSummary,
        p.EditorReview,
        p.IsFeatured,
        p.LastVerified,
        Privacy                     = Serialize(p.Privacy),
        Features                    = Serialize(p.Features),
        Pricing                     = Serialize(p.Pricing),
        Platforms                   = Serialize(p.Platforms),
    };

    private static readonly System.Text.Json.JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy        = System.Text.Json.JsonNamingPolicy.SnakeCaseLower,
        PropertyNameCaseInsensitive = true,
    };

    private static T Deserialize<T>(string json) where T : new() =>
        System.Text.Json.JsonSerializer.Deserialize<T>(json, JsonOptions) ?? new T();

    private static string Serialize<T>(T value) =>
        System.Text.Json.JsonSerializer.Serialize(value, JsonOptions);
}
