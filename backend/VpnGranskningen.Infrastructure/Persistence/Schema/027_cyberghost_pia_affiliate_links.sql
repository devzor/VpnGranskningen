-- Migration 027 – Sätt CyberGhost och PIA affiliate-länkar

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'affiliate', 'https://www.cyberghostvpn.com/offer/vpngranskningen_r5baoql'
FROM   vpn_provider WHERE slug = 'cyberghost'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

UPDATE vpn_provider_links
SET    url = 'https://www.cyberghostvpn.com/offer/vpngranskningen_r5baoql'
WHERE  link_type = 'price'
  AND  vpn_provider_id = (SELECT vpn_provider_id FROM vpn_provider WHERE slug = 'cyberghost');

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'affiliate', 'https://www.privateinternetaccess.com/offer/vpngranskningen_dqpji5g'
FROM   vpn_provider WHERE slug = 'pia'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

UPDATE vpn_provider_links
SET    url = 'https://www.privateinternetaccess.com/offer/vpngranskningen_dqpji5g'
WHERE  link_type = 'price'
  AND  vpn_provider_id = (SELECT vpn_provider_id FROM vpn_provider WHERE slug = 'pia');
