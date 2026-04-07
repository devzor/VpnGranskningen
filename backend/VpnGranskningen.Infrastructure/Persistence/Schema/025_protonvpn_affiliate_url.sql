-- Migration 025 – Sätt affiliate_url för Proton VPN

UPDATE vpn_provider
SET affiliate_url = 'https://go.getproton.me/aff_c?offer_id=26&aff_id=17099'
WHERE slug = 'protonvpn';
