-- Migration 016 – Länkdata för leverantörer som saknar vpn_provider_links

-- Proton VPN
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main', 'https://protonvpn.com/sv/'
FROM   vpn_provider WHERE slug = 'protonvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://account.protonvpn.com/sv/pricing?currency=undefined&hfp=false'
FROM   vpn_provider WHERE slug = 'protonvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

-- Mullvad
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main', 'https://mullvad.net/sv/'
FROM   vpn_provider WHERE slug = 'mullvad'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://mullvad.net/sv/account/create'
FROM   vpn_provider WHERE slug = 'mullvad'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

-- Surfshark
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main', 'https://surfshark.com/sv/'
FROM   vpn_provider WHERE slug = 'surfshark'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://order.surfshark.com/sv/'
FROM   vpn_provider WHERE slug = 'surfshark'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

-- ExpressVPN
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main', 'https://www.expressvpn.com/sv/'
FROM   vpn_provider WHERE slug = 'expressvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.expressvpn.com/sv/order'
FROM   vpn_provider WHERE slug = 'expressvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

-- IVPN
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main', 'https://www.ivpn.net/'
FROM   vpn_provider WHERE slug = 'ivpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.ivpn.net/pricing/'
FROM   vpn_provider WHERE slug = 'ivpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
