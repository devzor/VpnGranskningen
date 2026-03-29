-- Migration 020 – CyberGhost erbjuder ingen 1-årsplan; nolla ut till NULL
UPDATE vpn_provider_pricing
SET
    "1_year_subscription_intro_price_per_month"   = NULL,
    "1_year_subscription_regular_price_per_month" = NULL,
    "1_year_bonus_months"                         = NULL
WHERE vpn_provider_id = (
    SELECT vpn_provider_id FROM vpn_provider WHERE slug = 'cyberghost'
);
