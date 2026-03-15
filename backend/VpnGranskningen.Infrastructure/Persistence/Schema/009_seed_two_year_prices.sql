-- Migration 009 – Seed 2-årspriser för leverantörer som saknar det (ej NordVPN)

-- Mullvad (fast prissättning, ingen bonus)
UPDATE vpn_provider_pricing p SET
    "2_year_subscription_intro_price_per_month"   = 49,
    "2_year_subscription_regular_price_per_month" = 59,
    "2_year_bonus_months"                         = NULL
FROM vpn_provider vp
WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'mullvad';

-- Proton VPN
UPDATE vpn_provider_pricing p SET
    "2_year_subscription_intro_price_per_month"   = 35,
    "2_year_subscription_regular_price_per_month" = 99,
    "2_year_bonus_months"                         = NULL
FROM vpn_provider vp
WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'protonvpn';

-- ExpressVPN
UPDATE vpn_provider_pricing p SET
    "2_year_subscription_intro_price_per_month"   = 55,
    "2_year_subscription_regular_price_per_month" = 136,
    "2_year_bonus_months"                         = 3
FROM vpn_provider vp
WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'expressvpn';

-- IVPN
UPDATE vpn_provider_pricing p SET
    "2_year_subscription_intro_price_per_month"   = 42,
    "2_year_subscription_regular_price_per_month" = 63,
    "2_year_bonus_months"                         = NULL
FROM vpn_provider vp
WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'ivpn';
