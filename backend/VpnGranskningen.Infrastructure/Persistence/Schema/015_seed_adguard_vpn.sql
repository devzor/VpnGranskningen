-- Migration 015 – Seed AdGuard VPN
-- Jurisdiktion: Cypern (EU) – risk 2 (medel)
-- Priser i SEK/mån – VERIFIERA mot https://adguard-vpn.com/

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
    'AdGuard VPN', 'adguardvpn', NULL, NULL,
    1,
    '["Netflix", "Amazon Prime"]',
    7, 65, 45,
    'Från skaparna av AdGuard-blockeraren. Eget protokoll som maskerar trafik som HTTPS, gratis nivå och stark annonsblockning.',
    false, '2026-03-12',
    '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2023,
        "audit_firm": "Cure53", "jurisdiction": "Cypern",
        "jurisdiction_risk": 2, "accepts_crypto": false, "accepts_cash": false,
        "is_open_source": true, "has_transparency_report": true, "has_warrant_canary": false
    }',
    '{
        "protocols": ["AdGuard VPN", "OpenVPN"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": false,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 5
    }',
    '{"windows": true, "mac_os": true, "linux": false, "ios": true, "android": true, "router": false, "browser_extension": true}'
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
SELECT vpn_provider_id, 'main', 'https://adguard-vpn.com/'
FROM   vpn_provider WHERE slug = 'adguardvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://adguard-vpn.com/license.html'
FROM   vpn_provider WHERE slug = 'adguardvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

-- =============================================================================
-- vpn_provider_pricing (SEK/mån) – VERIFIERA PRISERNA
-- =============================================================================
INSERT INTO vpn_provider_pricing (
    vpn_provider_id,
    monthly_intro_price, monthly_regular_price,
    "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months",
    "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months"
)
SELECT
    vpn_provider_id,
    69,  69,
    35,  69,  NULL,
    25,  69,  NULL
FROM vpn_provider WHERE slug = 'adguardvpn'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_intro_price                             = EXCLUDED.monthly_intro_price,
    monthly_regular_price                           = EXCLUDED.monthly_regular_price,
    "1_year_subscription_intro_price_per_month"     = EXCLUDED."1_year_subscription_intro_price_per_month",
    "1_year_subscription_regular_price_per_month"   = EXCLUDED."1_year_subscription_regular_price_per_month",
    "1_year_bonus_months"                           = EXCLUDED."1_year_bonus_months",
    "2_year_subscription_intro_price_per_month"     = EXCLUDED."2_year_subscription_intro_price_per_month",
    "2_year_subscription_regular_price_per_month"   = EXCLUDED."2_year_subscription_regular_price_per_month",
    "2_year_bonus_months"                           = EXCLUDED."2_year_bonus_months";
