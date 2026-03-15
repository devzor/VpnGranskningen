-- Migration 008 – Döp om priskolumner till slutgiltiga namn
ALTER TABLE vpn_provider_pricing RENAME COLUMN yearly_intro_price       TO "1_year_subscription_intro_price_per_month";
ALTER TABLE vpn_provider_pricing RENAME COLUMN yearly_regular_price     TO "1_year_subscription_regular_price_per_month";
ALTER TABLE vpn_provider_pricing RENAME COLUMN yearly_bonus_months      TO "1_year_bonus_months";
ALTER TABLE vpn_provider_pricing RENAME COLUMN two_year_intro_price     TO "2_year_subscription_intro_price_per_month";
ALTER TABLE vpn_provider_pricing RENAME COLUMN two_year_regular_price   TO "2_year_subscription_regular_price_per_month";
ALTER TABLE vpn_provider_pricing RENAME COLUMN two_year_bonus_months    TO "2_year_bonus_months";
ALTER TABLE vpn_provider_pricing DROP COLUMN IF EXISTS monthly_bonus_months;
