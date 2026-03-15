-- Migration 005 – Skapa vpn_provider_pricing och seed-data
-- Alla priser i USD per månad.

CREATE TABLE IF NOT EXISTS vpn_provider_pricing (
    vpn_provider_pricing_id     UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    vpn_provider_id             UUID          NOT NULL REFERENCES vpn_provider(vpn_provider_id) ON DELETE CASCADE,
    monthly_plan_price          NUMERIC(10,2) NOT NULL,
    yearly_plan_monthly_price   NUMERIC(10,2) NOT NULL,
    two_year_plan_monthly_price NUMERIC(10,2),
    UNIQUE (vpn_provider_id)
);

-- Seed-data per leverantör (priser i SEK/mån)
INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_plan_price, yearly_plan_monthly_price, two_year_plan_monthly_price)
SELECT vpn_provider_id, 139, 52, 36 FROM vpn_provider WHERE slug = 'nordvpn'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_plan_price          = EXCLUDED.monthly_plan_price,
    yearly_plan_monthly_price   = EXCLUDED.yearly_plan_monthly_price,
    two_year_plan_monthly_price = EXCLUDED.two_year_plan_monthly_price;

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_plan_price, yearly_plan_monthly_price, two_year_plan_monthly_price)
SELECT vpn_provider_id, 59, 59, NULL FROM vpn_provider WHERE slug = 'mullvad'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_plan_price          = EXCLUDED.monthly_plan_price,
    yearly_plan_monthly_price   = EXCLUDED.yearly_plan_monthly_price,
    two_year_plan_monthly_price = EXCLUDED.two_year_plan_monthly_price;

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_plan_price, yearly_plan_monthly_price, two_year_plan_monthly_price)
SELECT vpn_provider_id, 105, 52, NULL FROM vpn_provider WHERE slug = 'protonvpn'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_plan_price          = EXCLUDED.monthly_plan_price,
    yearly_plan_monthly_price   = EXCLUDED.yearly_plan_monthly_price,
    two_year_plan_monthly_price = EXCLUDED.two_year_plan_monthly_price;

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_plan_price, yearly_plan_monthly_price, two_year_plan_monthly_price)
SELECT vpn_provider_id, 162, 42, 26 FROM vpn_provider WHERE slug = 'surfshark'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_plan_price          = EXCLUDED.monthly_plan_price,
    yearly_plan_monthly_price   = EXCLUDED.yearly_plan_monthly_price,
    two_year_plan_monthly_price = EXCLUDED.two_year_plan_monthly_price;

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_plan_price, yearly_plan_monthly_price, two_year_plan_monthly_price)
SELECT vpn_provider_id, 136, 70, NULL FROM vpn_provider WHERE slug = 'expressvpn'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_plan_price          = EXCLUDED.monthly_plan_price,
    yearly_plan_monthly_price   = EXCLUDED.yearly_plan_monthly_price,
    two_year_plan_monthly_price = EXCLUDED.two_year_plan_monthly_price;

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_plan_price, yearly_plan_monthly_price, two_year_plan_monthly_price)
SELECT vpn_provider_id, 63, 53, NULL FROM vpn_provider WHERE slug = 'ivpn'
ON CONFLICT (vpn_provider_id) DO UPDATE SET
    monthly_plan_price          = EXCLUDED.monthly_plan_price,
    yearly_plan_monthly_price   = EXCLUDED.yearly_plan_monthly_price,
    two_year_plan_monthly_price = EXCLUDED.two_year_plan_monthly_price;
