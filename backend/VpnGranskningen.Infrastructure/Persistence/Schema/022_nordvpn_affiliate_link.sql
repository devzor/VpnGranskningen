-- Migration 022 – Uppdatera NordVPN:s affiliate-länk

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'affiliate', 'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=144483&url_id=902'
FROM   vpn_provider WHERE slug = 'nordvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

UPDATE vpn_provider_links
SET    url = 'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=144483&url_id=902'
WHERE  link_type = 'price'
  AND  vpn_provider_id = (SELECT vpn_provider_id FROM vpn_provider WHERE slug = 'nordvpn');
