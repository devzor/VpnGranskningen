-- Migration 021 – Uppdatera Proton VPNs 1-årsplan till 43 SEK/mån
UPDATE vpn_provider_pricing
SET
    "1_year_subscription_intro_price_per_month"   = 43,
    "1_year_subscription_regular_price_per_month" = 43
WHERE vpn_provider_id = (
    SELECT vpn_provider_id FROM vpn_provider WHERE slug = 'protonvpn'
);
