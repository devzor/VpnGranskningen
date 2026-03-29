-- Migration 010 – Seed CyberGhost
-- Jurisdiktion: Rumänien (EU) – risk 2 (medel)
-- Priser i SEK/mån

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
    'CyberGhost', 'cyberghost', NULL, NULL,
    2,
    '["Netflix", "Disney+", "HBO Max", "BBC iPlayer", "Hulu", "Amazon Prime", "SVT Play"]',
    8, 9000, 100,
    'Stor serverbas med dedikerade streamingservrar. Enkel att använda och med 45 dagars pengarna-tillbaka-garanti.',
    false, '2026-03-12',
    '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2023,
        "audit_firm": "Deloitte", "jurisdiction": "Rumänien",
        "jurisdiction_risk": 2, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": false
    }',
    '{
        "protocols": ["WireGuard", "OpenVPN", "IKEv2"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": false,
        "has_tor_over_vpn": false, "has_obfuscation": false, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 7
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
SELECT vpn_provider_id, 'main', 'https://www.cyberghostvpn.com/sv/'
FROM   vpn_provider WHERE slug = 'cyberghost'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.cyberghostvpn.com/sv/vpn-subscription/'
FROM   vpn_provider WHERE slug = 'cyberghost'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

-- =============================================================================
-- vpn_provider_pricing (SEK/mån)
-- Månadsplan:  ~163 SEK
-- 1-år:         ~44 SEK intro / ~99 SEK ordinarie
-- 2-år + 3 mån: ~29 SEK intro / ~99 SEK ordinarie
-- =============================================================================
INSERT INTO vpn_provider_pricing (
    vpn_provider_id,
    monthly_intro_price, monthly_regular_price,
    "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months",
    "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months"
)
SELECT
    vpn_provider_id,
    163,  163,
    44,   99,  NULL,
    29,   99,  3
FROM vpn_provider WHERE slug = 'cyberghost'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_intro_price                             = EXCLUDED.monthly_intro_price,
    monthly_regular_price                           = EXCLUDED.monthly_regular_price,
    "1_year_subscription_intro_price_per_month"     = EXCLUDED."1_year_subscription_intro_price_per_month",
    "1_year_subscription_regular_price_per_month"   = EXCLUDED."1_year_subscription_regular_price_per_month",
    "1_year_bonus_months"                           = EXCLUDED."1_year_bonus_months",
    "2_year_subscription_intro_price_per_month"     = EXCLUDED."2_year_subscription_intro_price_per_month",
    "2_year_subscription_regular_price_per_month"   = EXCLUDED."2_year_subscription_regular_price_per_month",
    "2_year_bonus_months"                           = EXCLUDED."2_year_bonus_months";
