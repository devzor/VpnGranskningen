-- Migration 017 – Uppdatera prislänkar

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://mullvad.net/sv/pricing'
FROM   vpn_provider WHERE slug = 'mullvad'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.azirevpn.com/pricing'
FROM   vpn_provider WHERE slug = 'azirevpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.cyberghostvpn.com/sv/buy/cyberghost-vpn-3'
FROM   vpn_provider WHERE slug = 'cyberghost'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://checkout.expressvpn.com/order?product_type=vpn'
FROM   vpn_provider WHERE slug = 'expressvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.privateinternetaccess.com/sv/buy-vpn-online'
FROM   vpn_provider WHERE slug = 'pia'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://surfshark.com/pricing'
FROM   vpn_provider WHERE slug = 'surfshark'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
