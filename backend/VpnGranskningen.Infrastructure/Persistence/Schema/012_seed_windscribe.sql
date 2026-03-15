-- Migration 012 – Seed Windscribe
-- Jurisdiktion: Kanada (5-Eyes) – risk 3 (hög)
-- Priser i SEK/mån – VERIFIERA mot https://swe.windscribe.com/upgrade

-- =============================================================================
-- vpn_provider
-- =============================================================================
INSERT INTO vpn_provider (
    name, slug, logo_url, affiliate_url,
    streaming_support, supported_streaming_services,
    speed_score, server_count, country_count,
    editor_summary, is_featured, last_verified,
    privacy, features, platforms
) VALUES (
    'Windscribe', 'windscribe', NULL, NULL,
    1,
    '["Netflix", "BBC iPlayer", "Amazon Prime"]',
    7, 480, 69,
    'Gratis nivå med 10 GB/mån, öppen källkod och obegränsade enheter. Kanada-jurisdiktion är en nackdel för privacy-medvetna.',
    false, '2026-03-12',
    '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2022,
        "audit_firm": "Cure53", "jurisdiction": "Kanada",
        "jurisdiction_risk": 3, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": true, "has_transparency_report": true, "has_warrant_canary": true
    }',
    '{
        "protocols": ["WireGuard", "OpenVPN", "IKEv2"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": false,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 0
    }',
    '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": true, "browser_extension": true}'
)
ON CONFLICT (slug) DO UPDATE SET
    name                         = EXCLUDED.name,
    logo_url                     = EXCLUDED.logo_url,
    affiliate_url                = EXCLUDED.affiliate_url,
    streaming_support            = EXCLUDED.streaming_support,
    supported_streaming_services = EXCLUDED.supported_streaming_services,
    speed_score                  = EXCLUDED.speed_score,
    server_count                 = EXCLUDED.server_count,
    country_count                = EXCLUDED.country_count,
    editor_summary               = EXCLUDED.editor_summary,
    is_featured                  = EXCLUDED.is_featured,
    last_verified                = EXCLUDED.last_verified,
    privacy                      = EXCLUDED.privacy,
    features                     = EXCLUDED.features,
    platforms                    = EXCLUDED.platforms;

-- =============================================================================
-- vpn_provider_links
-- =============================================================================
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main', 'https://swe.windscribe.com/'
FROM   vpn_provider WHERE slug = 'windscribe'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://swe.windscribe.com/upgrade'
FROM   vpn_provider WHERE slug = 'windscribe'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

-- =============================================================================
-- vpn_provider_pricing (SEK/mån) – VERIFIERA PRISERNA
-- Windscribe erbjuder endast månads- och årsplan, inget 2-årsabonnemang.
-- =============================================================================
INSERT INTO vpn_provider_pricing (
    vpn_provider_id,
    monthly_intro_price, monthly_regular_price,
    "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months",
    "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months"
)
SELECT
    vpn_provider_id,
    79,  79,
    35,  79,  NULL,
    NULL, NULL, NULL
FROM vpn_provider WHERE slug = 'windscribe'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_intro_price                             = EXCLUDED.monthly_intro_price,
    monthly_regular_price                           = EXCLUDED.monthly_regular_price,
    "1_year_subscription_intro_price_per_month"     = EXCLUDED."1_year_subscription_intro_price_per_month",
    "1_year_subscription_regular_price_per_month"   = EXCLUDED."1_year_subscription_regular_price_per_month",
    "1_year_bonus_months"                           = EXCLUDED."1_year_bonus_months",
    "2_year_subscription_intro_price_per_month"     = EXCLUDED."2_year_subscription_intro_price_per_month",
    "2_year_subscription_regular_price_per_month"   = EXCLUDED."2_year_subscription_regular_price_per_month",
    "2_year_bonus_months"                           = EXCLUDED."2_year_bonus_months";
