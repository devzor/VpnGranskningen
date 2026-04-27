-- Migration 025 – Fixa Proton VPN prissidesurl

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://protonvpn.com/sv/pricing'
FROM   vpn_provider WHERE slug = 'protonvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
