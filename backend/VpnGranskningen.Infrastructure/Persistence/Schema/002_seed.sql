-- Migration 002 – Seeddata för VPN-leverantörer
-- Kör mot PostgreSQL / Supabase SQL editor efter 001_create_vpn_providers.sql
-- Jurisdiktionsrisk: 1=Låg, 2=Medel, 3=Hög  |  Streaming: 0=Inget, 1=Delvis, 2=Fullt

INSERT INTO vpn_provider (
    name, slug, logo_url, affiliate_url,
    streaming_support, supported_streaming_services,
    speed_score, server_count, country_count,
    editor_summary, is_featured, last_verified,
    privacy, features, platforms
) VALUES

-- =============================================================================
-- NordVPN
-- =============================================================================
(
    'NordVPN', 'nordvpn', NULL, NULL,
    2,
    '["Netflix", "Disney+", "HBO Max", "BBC iPlayer", "Hulu", "Amazon Prime", "SVT Play"]',
    9, 6400, 111,
    'Bäst för streaming och resor. Snabb, enkel och med brett servernät. Auditerad no-logs-policy.',
    true, '2025-01-01',
    '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2023,
        "audit_firm": "PricewaterhouseCoopers", "jurisdiction": "Panama",
        "jurisdiction_risk": 1, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": false
    }',
    '{
        "protocols": ["WireGuard", "OpenVPN", "IKEv2"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": true, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 10
    }',
    '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": true, "browser_extension": true}'
),

-- =============================================================================
-- Mullvad
-- =============================================================================
(
    'Mullvad', 'mullvad', NULL, NULL,
    1,
    '[]',
    8, 700, 49,
    'Bäst för maximal privacy. Öppen källkod, accepterar kontanter, ingen kontoregistrering krävs.',
    true, '2025-01-01',
    '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2024,
        "audit_firm": "Cure53", "jurisdiction": "Sverige",
        "jurisdiction_risk": 3, "accepts_crypto": true, "accepts_cash": true,
        "is_open_source": true, "has_transparency_report": true, "has_warrant_canary": true
    }',
    '{
        "protocols": ["WireGuard", "OpenVPN"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 5
    }',
    '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": true, "browser_extension": true}'
),

-- =============================================================================
-- Proton VPN
-- =============================================================================
(
    'Proton VPN', 'protonvpn', NULL, NULL,
    2,
    '["Netflix", "Disney+", "BBC iPlayer", "Amazon Prime", "SVT Play"]',
    8, 9000, 117,
    'Schweizisk jurisdiktion, öppen källkod och gratis nivå. Stark kombination av privacy och användbarhet.',
    true, '2025-01-01',
    '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2022,
        "audit_firm": "Securitum", "jurisdiction": "Schweiz",
        "jurisdiction_risk": 1, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": true, "has_transparency_report": true, "has_warrant_canary": true
    }',
    '{
        "protocols": ["WireGuard", "OpenVPN", "IKEv2", "Stealth"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": true, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 10
    }',
    '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": true, "browser_extension": false}'
),

-- =============================================================================
-- Surfshark
-- =============================================================================
(
    'Surfshark', 'surfshark', NULL, NULL,
    2,
    '["Netflix", "Disney+", "HBO Max", "BBC iPlayer", "Hulu", "Amazon Prime"]',
    8, 3200, 100,
    'Obegränsat antal enheter och lågt pris på tvåårspaketet. Bra för hela familjen.',
    false, '2025-01-01',
    '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2023,
        "audit_firm": "Deloitte", "jurisdiction": "Nederländerna",
        "jurisdiction_risk": 2, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": false
    }',
    '{
        "protocols": ["WireGuard", "OpenVPN", "IKEv2"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 0
    }',
    '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": true, "browser_extension": true}'
),

-- =============================================================================
-- ExpressVPN
-- =============================================================================
(
    'ExpressVPN', 'expressvpn', NULL, NULL,
    2,
    '["Netflix", "Disney+", "HBO Max", "BBC iPlayer", "Hulu", "Amazon Prime", "SVT Play"]',
    9, 3000, 105,
    'Snabbast i klassen med Lightway-protokollet. Konsekvent streamingstöd men högre pris.',
    false, '2025-01-01',
    '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2023,
        "audit_firm": "KPMG", "jurisdiction": "Brittiska Jungfruöarna",
        "jurisdiction_risk": 1, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": false
    }',
    '{
        "protocols": ["Lightway", "OpenVPN", "IKEv2", "L2TP"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": false,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": false, "simultaneous_connections": 8
    }',
    '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": true, "browser_extension": true}'
),

-- =============================================================================
-- IVPN
-- =============================================================================
(
    'IVPN', 'ivpn', NULL, NULL,
    1,
    '[]',
    7, 100, 36,
    'För den som tar privacy på allvar. Öppen källkod, kontanter, multihop och warrant canary.',
    false, '2025-01-01',
    '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2023,
        "audit_firm": "Cure53", "jurisdiction": "Gibraltar",
        "jurisdiction_risk": 1, "accepts_crypto": true, "accepts_cash": true,
        "is_open_source": true, "has_transparency_report": true, "has_warrant_canary": true
    }',
    '{
        "protocols": ["WireGuard", "OpenVPN"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 7
    }',
    '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": true, "browser_extension": false}'
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
