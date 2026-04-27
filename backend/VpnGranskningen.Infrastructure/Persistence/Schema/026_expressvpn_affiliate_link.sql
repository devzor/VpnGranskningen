-- Migration 026 – Sätt ExpressVPN:s affiliate-länk

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'affiliate', 'https://go.expressvpn.com/c/7138492/1635680/16063'
FROM   vpn_provider WHERE slug = 'expressvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

UPDATE vpn_provider_links
SET    url = 'https://go.expressvpn.com/c/7138492/1635680/16063'
WHERE  link_type = 'price'
  AND  vpn_provider_id = (SELECT vpn_provider_id FROM vpn_provider WHERE slug = 'expressvpn');
