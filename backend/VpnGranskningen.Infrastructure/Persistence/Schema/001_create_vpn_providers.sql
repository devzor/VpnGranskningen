-- Migration 001 – Skapa vpn_provider-tabellen
-- Kör manuellt mot PostgreSQL / Supabase SQL editor

CREATE TABLE IF NOT EXISTS vpn_provider (
    vpn_provider_id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    name                        TEXT        NOT NULL,
    slug                        TEXT        NOT NULL UNIQUE,
    logo_url                    TEXT,
    website_url                 TEXT        NOT NULL,
    affiliate_url               TEXT,

    -- Streaming
    streaming_support           INTEGER     NOT NULL DEFAULT 0,
    supported_streaming_services JSONB      NOT NULL DEFAULT '[]',

    -- Performance
    speed_score                 INTEGER     NOT NULL DEFAULT 0,
    server_count                INTEGER     NOT NULL DEFAULT 0,
    country_count               INTEGER     NOT NULL DEFAULT 0,

    -- Redaktionellt
    editor_summary              TEXT,
    editor_review               TEXT,
    is_featured                 BOOLEAN     NOT NULL DEFAULT FALSE,
    last_verified               TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Value objects lagrade som JSONB
    privacy                     JSONB       NOT NULL DEFAULT '{}',
    features                    JSONB       NOT NULL DEFAULT '{}',
    pricing                     JSONB       NOT NULL DEFAULT '{}',
    platforms                   JSONB       NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_vpn_provider_slug     ON vpn_provider (slug);
CREATE INDEX IF NOT EXISTS idx_vpn_provider_featured ON vpn_provider (is_featured) WHERE is_featured = TRUE;
