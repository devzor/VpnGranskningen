-- Migration 024 – Lägg till affiliate-länk för Proton VPN

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'affiliate', 'https://go.getproton.me/aff_c?offer_id=26&aff_id=17099'
FROM   vpn_provider WHERE slug = 'protonvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
