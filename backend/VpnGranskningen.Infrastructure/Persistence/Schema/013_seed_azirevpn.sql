-- Migration 013 – Seed AzireVPN
-- Jurisdiktion: Sverige (EU, datalagringslag) – risk 3 (hög)
-- Priser i SEK/mån – VERIFIERA mot https://www.azirevpn.com/

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
    'AzireVPN', 'azirevpn', NULL, NULL,
    0,
    '[]',
    7, 40, 15,
    'Svensk aktör med RAM-only-servrar och stark integritetsprofil. Litet servernät men transparent och privacy-first.',
    false, '2026-03-12',
    '{
        "has_no_logs": true, "is_audited": false, "audit_year": null,
        "audit_firm": null, "jurisdiction": "Sverige",
        "jurisdiction_risk": 3, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": true
    }',
    '{
        "protocols": ["WireGuard", "OpenVPN"],
        "has_kill_switch": true, "has_split_tunneling": false, "has_double_vpn": false,
        "has_tor_over_vpn": false, "has_obfuscation": false, "has_dns_leak_protection": true,
        "has_ad_blocker": false, "simultaneous_connections": 0
    }',
    '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": false, "browser_extension": false}'
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
SELECT vpn_provider_id, 'main', 'https://www.azirevpn.com/'
FROM   vpn_provider WHERE slug = 'azirevpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.azirevpn.com/'
FROM   vpn_provider WHERE slug = 'azirevpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

-- =============================================================================
-- vpn_provider_pricing (SEK/mån) – VERIFIERA PRISERNA
-- AzireVPN erbjuder månads- och årsplan. Inget 2-årsabonnemang.
-- =============================================================================
INSERT INTO vpn_provider_pricing (
    vpn_provider_id,
    monthly_intro_price, monthly_regular_price,
    "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months",
    "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months"
)
SELECT
    vpn_provider_id,
    59,  59,
    40,  59,  NULL,
    NULL, NULL, NULL
FROM vpn_provider WHERE slug = 'azirevpn'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_intro_price                             = EXCLUDED.monthly_intro_price,
    monthly_regular_price                           = EXCLUDED.monthly_regular_price,
    "1_year_subscription_intro_price_per_month"     = EXCLUDED."1_year_subscription_intro_price_per_month",
    "1_year_subscription_regular_price_per_month"   = EXCLUDED."1_year_subscription_regular_price_per_month",
    "1_year_bonus_months"                           = EXCLUDED."1_year_bonus_months",
    "2_year_subscription_intro_price_per_month"     = EXCLUDED."2_year_subscription_intro_price_per_month",
    "2_year_subscription_regular_price_per_month"   = EXCLUDED."2_year_subscription_regular_price_per_month",
    "2_year_bonus_months"                           = EXCLUDED."2_year_bonus_months";
