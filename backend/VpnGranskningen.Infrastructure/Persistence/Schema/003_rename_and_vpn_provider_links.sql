-- Migration 003 – Döp om tabell/kolumn + skapa vpn_provider_links
-- Idempotent: alla steg kontrollerar nuläget innan de körs.

-- 1. vpn_providers → vpn_provider
DO $$ BEGIN
    IF EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'vpn_providers'
    ) THEN
        ALTER TABLE vpn_providers RENAME TO vpn_provider;
    END IF;
END $$;

-- 2. id → vpn_provider_id
DO $$ BEGIN
    IF EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'vpn_provider' AND column_name = 'id'
    ) THEN
        ALTER TABLE vpn_provider RENAME COLUMN id TO vpn_provider_id;
    END IF;
END $$;

-- 3. Byt namn på index
DO $$ BEGIN
    IF EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_vpn_providers_slug') THEN
        ALTER INDEX idx_vpn_providers_slug RENAME TO idx_vpn_provider_slug;
    END IF;
END $$;

DO $$ BEGIN
    IF EXISTS (SELECT FROM pg_indexes WHERE indexname = 'idx_vpn_providers_featured') THEN
        ALTER INDEX idx_vpn_providers_featured RENAME TO idx_vpn_provider_featured;
    END IF;
END $$;

-- 4. Skapa vpn_provider_links
CREATE TABLE IF NOT EXISTS vpn_provider_links (
    vpn_provider_link_id    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    vpn_provider_id         UUID        NOT NULL REFERENCES vpn_provider(vpn_provider_id) ON DELETE CASCADE,
    link_type               TEXT        NOT NULL, -- 'main' | 'price' | 'affiliate'
    url                     TEXT        NOT NULL,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (vpn_provider_id, link_type)
);

CREATE INDEX IF NOT EXISTS idx_vpn_provider_links_provider ON vpn_provider_links (vpn_provider_id);

-- 5. NordVPN – huvudsida och prissida
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://nordvpn.com'
FROM   vpn_provider WHERE slug = 'nordvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://nordvpn.com/sv/pricing/'
FROM   vpn_provider WHERE slug = 'nordvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
