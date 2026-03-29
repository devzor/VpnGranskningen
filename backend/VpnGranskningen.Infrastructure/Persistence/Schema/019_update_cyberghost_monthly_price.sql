-- Migration 019 – Uppdatera CyberGhosts månadsplan till 163 SEK
UPDATE vpn_provider_pricing
SET
    monthly_intro_price    = 163,
    monthly_regular_price  = 163
WHERE vpn_provider_id = (
    SELECT vpn_provider_id FROM vpn_provider WHERE slug = 'cyberghost'
);
