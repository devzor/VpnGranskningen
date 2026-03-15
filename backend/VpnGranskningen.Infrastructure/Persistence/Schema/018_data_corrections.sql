-- Migration 018 – Datakorrektioner baserade på granskning av leverantörernas egna sajter (mars 2026)
-- Uppdaterar privacy, features, platforms, server_count, country_count per leverantör.

-- =============================================================================
-- NordVPN
-- Ändringar: server_count 6400→7300, country_count 111→118,
--            audit_year 2023→2024, audit_firm PwC→Deloitte (senaste audit)
--            protocols: NordLynx tillagt
-- =============================================================================
UPDATE vpn_provider SET
    server_count  = 7300,
    country_count = 118,
    privacy = '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2024,
        "audit_firm": "Deloitte", "jurisdiction": "Panama",
        "jurisdiction_risk": 1, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": false
    }',
    features = '{
        "protocols": ["NordLynx", "WireGuard", "OpenVPN", "IKEv2"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": true, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 10
    }'
WHERE slug = 'nordvpn';

-- =============================================================================
-- Mullvad
-- Ändringar: country_count 49→50, audit_year 2024→2025, audit_firm Cure53→NCC Group,
--            OpenVPN borttaget (avvecklat jan 2026), Shadowsocks tillagt
-- =============================================================================
UPDATE vpn_provider SET
    country_count = 50,
    privacy = '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2025,
        "audit_firm": "NCC Group", "jurisdiction": "Sverige",
        "jurisdiction_risk": 3, "accepts_crypto": true, "accepts_cash": true,
        "is_open_source": true, "has_transparency_report": true, "has_warrant_canary": true
    }',
    features = '{
        "protocols": ["WireGuard", "Shadowsocks"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 5
    }'
WHERE slug = 'mullvad';

-- =============================================================================
-- Proton VPN
-- Ändringar: server_count 9000→15000, country_count 117→120,
--            browser_extension false→true, Stealth-protokoll tillagt
-- =============================================================================
UPDATE vpn_provider SET
    server_count  = 15000,
    country_count = 120,
    features = '{
        "protocols": ["WireGuard", "OpenVPN", "IKEv2", "Stealth"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": true, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 10
    }',
    platforms = '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": true, "browser_extension": true}'
WHERE slug = 'protonvpn';

-- =============================================================================
-- Surfshark
-- Ändringar: server_count 3200→4500, Dynamic MultiHop bekräftat
-- =============================================================================
UPDATE vpn_provider SET
    server_count = 4500,
    features = '{
        "protocols": ["WireGuard", "OpenVPN", "IKEv2"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 0
    }'
WHERE slug = 'surfshark';

-- =============================================================================
-- ExpressVPN
-- Ändringar: audit_year 2023→2025, audit_firm KPMG (no-logs, senaste),
--            L2TP borttaget (avvecklat), Lightway uppdaterat
-- =============================================================================
UPDATE vpn_provider SET
    privacy = '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2025,
        "audit_firm": "KPMG", "jurisdiction": "Brittiska Jungfruöarna",
        "jurisdiction_risk": 1, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": false
    }',
    features = '{
        "protocols": ["Lightway", "OpenVPN", "IKEv2"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": false,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": false, "simultaneous_connections": 8
    }'
WHERE slug = 'expressvpn';

-- =============================================================================
-- IVPN
-- Ändringar: country_count 36→40, audit_year 2023→2024 (sjätte audit Cure53)
-- =============================================================================
UPDATE vpn_provider SET
    country_count = 40,
    privacy = '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2024,
        "audit_firm": "Cure53", "jurisdiction": "Gibraltar",
        "jurisdiction_risk": 1, "accepts_crypto": true, "accepts_cash": true,
        "is_open_source": true, "has_transparency_report": true, "has_warrant_canary": true
    }'
WHERE slug = 'ivpn';

-- =============================================================================
-- CyberGhost
-- Ändringar: server_count 9000→10000, audit_year 2023→2024 (Deloitte)
-- =============================================================================
UPDATE vpn_provider SET
    server_count = 10000,
    privacy = '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2024,
        "audit_firm": "Deloitte", "jurisdiction": "Rumänien",
        "jurisdiction_risk": 2, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": false
    }'
WHERE slug = 'cyberghost';

-- =============================================================================
-- Private Internet Access
-- Ändringar: audit_year 2022→2025 (Deloitte, tredje audit), country_count 91 bekräftat,
--            Shadowsocks tillagt som obfuskeringsprotokoll
-- =============================================================================
UPDATE vpn_provider SET
    country_count = 91,
    privacy = '{
        "has_no_logs": true, "is_audited": true, "audit_year": 2025,
        "audit_firm": "Deloitte", "jurisdiction": "USA",
        "jurisdiction_risk": 3, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": true, "has_transparency_report": true, "has_warrant_canary": true
    }',
    features = '{
        "protocols": ["WireGuard", "OpenVPN", "IKEv2", "Shadowsocks"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": false,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 0
    }'
WHERE slug = 'pia';

-- =============================================================================
-- Windscribe
-- Ändringar: country_count 69 bekräftat, Stealth + WStunnel tillagda,
--            has_double_vpn bekräftat, simultaneous_connections 0 (obegränsat) bekräftat
-- =============================================================================
UPDATE vpn_provider SET
    country_count = 69,
    features = '{
        "protocols": ["WireGuard", "OpenVPN", "IKEv2", "Stealth", "WStunnel"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": true,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 0
    }'
WHERE slug = 'windscribe';

-- =============================================================================
-- AzireVPN
-- Ändringar: simultaneous_connections 0→5, accepts_crypto true→false
--            (accepterar kort/PayPal/Swish, ej krypto), protocols endast WireGuard,
--            linux false, router false (ej nämnda på sajten),
--            is_open_source false bekräftat
-- Notering: AzireVPN ingår numera i Malwarebytes-familjen.
-- =============================================================================
UPDATE vpn_provider SET
    privacy = '{
        "has_no_logs": true, "is_audited": false, "audit_year": null,
        "audit_firm": null, "jurisdiction": "Sverige",
        "jurisdiction_risk": 3, "accepts_crypto": false, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": true
    }',
    features = '{
        "protocols": ["WireGuard"],
        "has_kill_switch": true, "has_split_tunneling": false, "has_double_vpn": false,
        "has_tor_over_vpn": false, "has_obfuscation": false, "has_dns_leak_protection": true,
        "has_ad_blocker": false, "simultaneous_connections": 5
    }',
    platforms = '{"windows": true, "mac_os": true, "linux": false, "ios": true, "android": true, "router": false, "browser_extension": false}'
WHERE slug = 'azirevpn';

-- =============================================================================
-- OVPN
-- Ändringar: streaming_support 1→2 (Netflix, Disney+, BBC iPlayer, Hulu, Amazon Prime, HBO Max),
--            is_audited false bekräftat (inga tredjepartsaudits genomförda),
--            multihop bekräftat (ingår i 6+ mån-prenumeration)
-- =============================================================================
UPDATE vpn_provider SET
    streaming_support            = 2,
    supported_streaming_services = '["Netflix", "Disney+", "BBC iPlayer", "Hulu", "Amazon Prime", "HBO Max"]',
    privacy = '{
        "has_no_logs": true, "is_audited": false, "audit_year": null,
        "audit_firm": null, "jurisdiction": "Sverige",
        "jurisdiction_risk": 3, "accepts_crypto": true, "accepts_cash": false,
        "is_open_source": false, "has_transparency_report": true, "has_warrant_canary": false
    }',
    features = '{
        "protocols": ["WireGuard", "OpenVPN"],
        "has_kill_switch": true, "has_split_tunneling": false, "has_double_vpn": true,
        "has_tor_over_vpn": false, "has_obfuscation": false, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 0
    }'
WHERE slug = 'ovpn';

-- =============================================================================
-- AdGuard VPN
-- Ändringar: simultaneous_connections 5→10, linux false→true, router false→true
--            (Linux-app och routerstöd bekräftat på sajten)
-- =============================================================================
UPDATE vpn_provider SET
    features = '{
        "protocols": ["AdGuard VPN", "OpenVPN"],
        "has_kill_switch": true, "has_split_tunneling": true, "has_double_vpn": false,
        "has_tor_over_vpn": false, "has_obfuscation": true, "has_dns_leak_protection": true,
        "has_ad_blocker": true, "simultaneous_connections": 10
    }',
    platforms = '{"windows": true, "mac_os": true, "linux": true, "ios": true, "android": true, "router": true, "browser_extension": true}'
WHERE slug = 'adguardvpn';
