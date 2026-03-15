-- Migration 004 – Ta bort website_url från vpn_provider
-- URL:er hanteras nu via vpn_provider_links (link_type = 'main' | 'price')

DO $$ BEGIN
    IF EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'vpn_provider' AND column_name = 'website_url'
    ) THEN
        ALTER TABLE vpn_provider DROP COLUMN website_url;
    END IF;
END $$;
