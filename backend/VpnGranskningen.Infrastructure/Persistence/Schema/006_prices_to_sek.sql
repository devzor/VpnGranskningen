-- Migration 006 – Konvertera priser till SEK i vpn_provider_pricing
-- Kurs: ~10.5 USD/SEK, rundade till jämna tal

UPDATE vpn_provider_pricing p
SET
    monthly_plan_price          = v.monthly,
    yearly_plan_monthly_price   = v.yearly,
    two_year_plan_monthly_price = v.two_year
FROM (VALUES
    ('nordvpn',    139, 52,  36),
    ('mullvad',    59,  59,  NULL),
    ('protonvpn',  105, 52,  NULL),
    ('surfshark',  162, 42,  26),
    ('expressvpn', 136, 70,  NULL),
    ('ivpn',       63,  53,  NULL)
) AS v(slug, monthly, yearly, two_year)
JOIN vpn_provider vp ON vp.slug = v.slug
WHERE p.vpn_provider_id = vp.vpn_provider_id;
