-- Migration 007 – Byt ut gamla priskolumner mot intro/regular/bonus-struktur

-- 1. Döp om befintliga kolumner (idempotent)
DO $$ BEGIN
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'vpn_provider_pricing' AND column_name = 'monthly_plan_price') THEN
        ALTER TABLE vpn_provider_pricing RENAME COLUMN monthly_plan_price TO monthly_intro_price;
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'vpn_provider_pricing' AND column_name = 'yearly_plan_monthly_price') THEN
        ALTER TABLE vpn_provider_pricing RENAME COLUMN yearly_plan_monthly_price TO yearly_intro_price;
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'vpn_provider_pricing' AND column_name = 'two_year_plan_monthly_price') THEN
        ALTER TABLE vpn_provider_pricing RENAME COLUMN two_year_plan_monthly_price TO two_year_intro_price;
    END IF;
END $$;

-- 2. Lägg till nya kolumner
ALTER TABLE vpn_provider_pricing ADD COLUMN IF NOT EXISTS monthly_regular_price    NUMERIC(10,2);
ALTER TABLE vpn_provider_pricing ADD COLUMN IF NOT EXISTS yearly_regular_price     NUMERIC(10,2);
ALTER TABLE vpn_provider_pricing ADD COLUMN IF NOT EXISTS yearly_bonus_months      INTEGER;
ALTER TABLE vpn_provider_pricing ADD COLUMN IF NOT EXISTS two_year_regular_price   NUMERIC(10,2);
ALTER TABLE vpn_provider_pricing ADD COLUMN IF NOT EXISTS two_year_bonus_months    INTEGER;

-- 3. Fyll i priser per leverantör
-- NordVPN (riktiga priser)
UPDATE vpn_provider_pricing p SET
    monthly_intro_price    = 136, monthly_regular_price  = 136,
    yearly_intro_price     = 52,  yearly_regular_price   = 120, yearly_bonus_months   = NULL,
    two_year_intro_price   = 36,  two_year_regular_price = 120, two_year_bonus_months = 3
FROM vpn_provider vp WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'nordvpn';

-- Mullvad (fast pris, inga kampanjer)
UPDATE vpn_provider_pricing p SET
    monthly_intro_price    = 59,  monthly_regular_price  = 59,
    yearly_intro_price     = 59,  yearly_regular_price   = 59,  yearly_bonus_months   = NULL,
    two_year_intro_price   = NULL, two_year_regular_price = NULL, two_year_bonus_months = NULL
FROM vpn_provider vp WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'mullvad';

-- Proton VPN
UPDATE vpn_provider_pricing p SET
    monthly_intro_price    = 105, monthly_regular_price  = 105,
    yearly_intro_price     = 52,  yearly_regular_price   = 99,  yearly_bonus_months   = NULL,
    two_year_intro_price   = NULL, two_year_regular_price = NULL, two_year_bonus_months = NULL
FROM vpn_provider vp WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'protonvpn';

-- Surfshark
UPDATE vpn_provider_pricing p SET
    monthly_intro_price    = 162, monthly_regular_price  = 162,
    yearly_intro_price     = 42,  yearly_regular_price   = 99,  yearly_bonus_months   = NULL,
    two_year_intro_price   = 26,  two_year_regular_price = 99,  two_year_bonus_months = 3
FROM vpn_provider vp WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'surfshark';

-- ExpressVPN
UPDATE vpn_provider_pricing p SET
    monthly_intro_price    = 136, monthly_regular_price  = 136,
    yearly_intro_price     = 70,  yearly_regular_price   = 136, yearly_bonus_months   = NULL,
    two_year_intro_price   = NULL, two_year_regular_price = NULL, two_year_bonus_months = NULL
FROM vpn_provider vp WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'expressvpn';

-- IVPN
UPDATE vpn_provider_pricing p SET
    monthly_intro_price    = 63,  monthly_regular_price  = 63,
    yearly_intro_price     = 53,  yearly_regular_price   = 63,  yearly_bonus_months   = NULL,
    two_year_intro_price   = NULL, two_year_regular_price = NULL, two_year_bonus_months = NULL
FROM vpn_provider vp WHERE p.vpn_provider_id = vp.vpn_provider_id AND vp.slug = 'ivpn';
