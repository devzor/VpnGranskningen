-- ============================================================
-- 000_init.sql – Komplett initialiseringsskript (fresh install)
-- Skapar slutgiltigt schema + all seed-data i ett steg.
-- Markerar sedan alla efterföljande migrations (001–018) som
-- redan körda så att MigrationRunner hoppar över dem.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Tabeller
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS vpn_provider (
    vpn_provider_id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    name                         TEXT        NOT NULL,
    slug                         TEXT        NOT NULL UNIQUE,
    logo_url                     TEXT,
    affiliate_url                TEXT,
    streaming_support            INTEGER     NOT NULL DEFAULT 0,
    supported_streaming_services JSONB       NOT NULL DEFAULT '[]',
    speed_score                  INTEGER     NOT NULL DEFAULT 0,
    server_count                 INTEGER     NOT NULL DEFAULT 0,
    country_count                INTEGER     NOT NULL DEFAULT 0,
    editor_summary               TEXT,
    editor_review                TEXT,
    is_featured                  BOOLEAN     NOT NULL DEFAULT FALSE,
    last_verified                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    privacy                      JSONB       NOT NULL DEFAULT '{}',
    features                     JSONB       NOT NULL DEFAULT '{}',
    pricing                      JSONB       NOT NULL DEFAULT '{}',
    platforms                    JSONB       NOT NULL DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_vpn_provider_slug     ON vpn_provider (slug);
CREATE INDEX IF NOT EXISTS idx_vpn_provider_featured ON vpn_provider (is_featured) WHERE is_featured = TRUE;

CREATE TABLE IF NOT EXISTS vpn_provider_links (
    vpn_provider_link_id UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    vpn_provider_id      UUID        NOT NULL REFERENCES vpn_provider(vpn_provider_id) ON DELETE CASCADE,
    link_type            TEXT        NOT NULL,
    url                  TEXT        NOT NULL,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (vpn_provider_id, link_type)
);

CREATE INDEX IF NOT EXISTS idx_vpn_provider_links_provider ON vpn_provider_links (vpn_provider_id);

CREATE TABLE IF NOT EXISTS vpn_provider_pricing (
    vpn_provider_pricing_id                      UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    vpn_provider_id                              UUID          NOT NULL REFERENCES vpn_provider(vpn_provider_id) ON DELETE CASCADE,
    monthly_intro_price                          NUMERIC(10,2),
    monthly_regular_price                        NUMERIC(10,2),
    "1_year_subscription_intro_price_per_month"  NUMERIC(10,2),
    "1_year_subscription_regular_price_per_month" NUMERIC(10,2),
    "1_year_bonus_months"                        INTEGER,
    "2_year_subscription_intro_price_per_month"  NUMERIC(10,2),
    "2_year_subscription_regular_price_per_month" NUMERIC(10,2),
    "2_year_bonus_months"                        INTEGER,
    UNIQUE (vpn_provider_id)
);

-- ------------------------------------------------------------
-- 2. Leverantörer
-- ------------------------------------------------------------

INSERT INTO vpn_provider (name, slug, affiliate_url, streaming_support, supported_streaming_services, speed_score, server_count, country_count, editor_summary, is_featured, last_verified, privacy, features, platforms) VALUES

('NordVPN', 'nordvpn', NULL, 2,
 '["Netflix","Disney+","HBO Max","BBC iPlayer","Hulu","Amazon Prime","SVT Play"]',
 9, 7300, 118,
 'Bäst för streaming och resor. Snabb, enkel och med brett servernät. Auditerad no-logs-policy.',
 true, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2024,"audit_firm":"Deloitte","jurisdiction":"Panama","jurisdiction_risk":1,"accepts_crypto":true,"accepts_cash":false,"is_open_source":false,"has_transparency_report":true,"has_warrant_canary":false}',
 '{"protocols":["NordLynx","WireGuard","OpenVPN","IKEv2"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":true,"has_tor_over_vpn":true,"has_obfuscation":true,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":10}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":true}'),

('Mullvad', 'mullvad', NULL, 1, '[]',
 8, 700, 50,
 'Bäst för maximal privacy. Öppen källkod, accepterar kontanter, ingen kontoregistrering krävs.',
 true, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2025,"audit_firm":"NCC Group","jurisdiction":"Sverige","jurisdiction_risk":3,"accepts_crypto":true,"accepts_cash":true,"is_open_source":true,"has_transparency_report":true,"has_warrant_canary":true}',
 '{"protocols":["WireGuard","Shadowsocks"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":true,"has_tor_over_vpn":false,"has_obfuscation":true,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":5}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":true}'),

('Proton VPN', 'protonvpn', NULL, 2,
 '["Netflix","Disney+","BBC iPlayer","Amazon Prime","SVT Play"]',
 8, 15000, 120,
 'Schweizisk jurisdiktion, öppen källkod och gratis nivå. Stark kombination av privacy och användbarhet.',
 true, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2022,"audit_firm":"Securitum","jurisdiction":"Schweiz","jurisdiction_risk":1,"accepts_crypto":true,"accepts_cash":false,"is_open_source":true,"has_transparency_report":true,"has_warrant_canary":true}',
 '{"protocols":["WireGuard","OpenVPN","IKEv2","Stealth"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":true,"has_tor_over_vpn":true,"has_obfuscation":true,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":10}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":true}'),

('Surfshark', 'surfshark', NULL, 2,
 '["Netflix","Disney+","HBO Max","BBC iPlayer","Hulu","Amazon Prime"]',
 8, 4500, 100,
 'Obegränsat antal enheter och lågt pris på tvåårspaketet. Bra för hela familjen.',
 false, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2023,"audit_firm":"Deloitte","jurisdiction":"Nederländerna","jurisdiction_risk":2,"accepts_crypto":true,"accepts_cash":false,"is_open_source":false,"has_transparency_report":true,"has_warrant_canary":false}',
 '{"protocols":["WireGuard","OpenVPN","IKEv2"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":true,"has_tor_over_vpn":false,"has_obfuscation":true,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":0}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":true}'),

('ExpressVPN', 'expressvpn', NULL, 2,
 '["Netflix","Disney+","HBO Max","BBC iPlayer","Hulu","Amazon Prime","SVT Play"]',
 9, 3000, 105,
 'Snabbast i klassen med Lightway-protokollet. Konsekvent streamingstöd men högre pris.',
 false, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2025,"audit_firm":"KPMG","jurisdiction":"Brittiska Jungfruöarna","jurisdiction_risk":1,"accepts_crypto":true,"accepts_cash":false,"is_open_source":false,"has_transparency_report":true,"has_warrant_canary":false}',
 '{"protocols":["Lightway","OpenVPN","IKEv2"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":false,"has_tor_over_vpn":false,"has_obfuscation":true,"has_dns_leak_protection":true,"has_ad_blocker":false,"simultaneous_connections":8}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":true}'),

('IVPN', 'ivpn', NULL, 1, '[]',
 7, 100, 40,
 'För den som tar privacy på allvar. Öppen källkod, kontanter, multihop och warrant canary.',
 false, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2024,"audit_firm":"Cure53","jurisdiction":"Gibraltar","jurisdiction_risk":1,"accepts_crypto":true,"accepts_cash":true,"is_open_source":true,"has_transparency_report":true,"has_warrant_canary":true}',
 '{"protocols":["WireGuard","OpenVPN"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":true,"has_tor_over_vpn":false,"has_obfuscation":true,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":7}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":false}'),

('CyberGhost', 'cyberghost', NULL, 2,
 '["Netflix","Disney+","HBO Max","BBC iPlayer","Hulu","Amazon Prime","SVT Play"]',
 8, 10000, 100,
 'Stor serverbas med dedikerade streamingservrar. Enkel att använda och med 45 dagars pengarna-tillbaka-garanti.',
 false, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2024,"audit_firm":"Deloitte","jurisdiction":"Rumänien","jurisdiction_risk":2,"accepts_crypto":true,"accepts_cash":false,"is_open_source":false,"has_transparency_report":true,"has_warrant_canary":false}',
 '{"protocols":["WireGuard","OpenVPN","IKEv2"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":false,"has_tor_over_vpn":false,"has_obfuscation":false,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":7}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":true}'),

('Private Internet Access', 'pia', NULL, 1,
 '["Netflix","Amazon Prime"]',
 7, 35000, 91,
 'Öppen källkod, billigast per månad och obegränsade enheter. USA-jurisdiktion är en nackdel för privacy-medvetna.',
 false, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2025,"audit_firm":"Deloitte","jurisdiction":"USA","jurisdiction_risk":3,"accepts_crypto":true,"accepts_cash":false,"is_open_source":true,"has_transparency_report":true,"has_warrant_canary":true}',
 '{"protocols":["WireGuard","OpenVPN","IKEv2","Shadowsocks"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":false,"has_tor_over_vpn":false,"has_obfuscation":true,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":0}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":true}'),

('Windscribe', 'windscribe', NULL, 1,
 '["Netflix","Amazon Prime"]',
 7, 480, 69,
 'Gratis nivå med 10 GB/mån, öppen källkod och obegränsade enheter. Kanada-jurisdiktion är en nackdel för privacy-medvetna.',
 false, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2022,"audit_firm":"Cure53","jurisdiction":"Kanada","jurisdiction_risk":3,"accepts_crypto":true,"accepts_cash":false,"is_open_source":true,"has_transparency_report":true,"has_warrant_canary":true}',
 '{"protocols":["WireGuard","OpenVPN","IKEv2","Stealth","WStunnel"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":true,"has_tor_over_vpn":false,"has_obfuscation":true,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":0}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":true}'),

('AzireVPN', 'azirevpn', NULL, 0, '[]',
 7, 40, 15,
 'Svensk aktör med RAM-only-servrar och stark integritetsprofil. Litet servernät men transparent och privacy-first.',
 false, '2026-03-12',
 '{"has_no_logs":true,"is_audited":false,"audit_year":null,"audit_firm":null,"jurisdiction":"Sverige","jurisdiction_risk":3,"accepts_crypto":false,"accepts_cash":false,"is_open_source":false,"has_transparency_report":true,"has_warrant_canary":true}',
 '{"protocols":["WireGuard"],"has_kill_switch":true,"has_split_tunneling":false,"has_double_vpn":false,"has_tor_over_vpn":false,"has_obfuscation":false,"has_dns_leak_protection":true,"has_ad_blocker":false,"simultaneous_connections":5}',
 '{"windows":true,"mac_os":true,"linux":false,"ios":true,"android":true,"router":false,"browser_extension":false}'),

('OVPN', 'ovpn', NULL, 2,
 '["Netflix","Disney+","BBC iPlayer","Hulu","Amazon Prime","HBO Max"]',
 8, 100, 30,
 'Svensk aktör som äger sin egen hårdvara och har bevisad no-logs-policy via domstolsbeslut.',
 false, '2026-03-12',
 '{"has_no_logs":true,"is_audited":false,"audit_year":null,"audit_firm":null,"jurisdiction":"Sverige","jurisdiction_risk":3,"accepts_crypto":true,"accepts_cash":false,"is_open_source":false,"has_transparency_report":true,"has_warrant_canary":false}',
 '{"protocols":["WireGuard","OpenVPN"],"has_kill_switch":true,"has_split_tunneling":false,"has_double_vpn":true,"has_tor_over_vpn":false,"has_obfuscation":false,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":0}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":false}'),

('AdGuard VPN', 'adguardvpn', NULL, 1,
 '["Netflix","Amazon Prime"]',
 7, 65, 45,
 'Från skaparna av AdGuard-blockeraren. Eget protokoll som maskerar trafik som HTTPS, gratis nivå och stark annonsblockning.',
 false, '2026-03-12',
 '{"has_no_logs":true,"is_audited":true,"audit_year":2023,"audit_firm":"Cure53","jurisdiction":"Cypern","jurisdiction_risk":2,"accepts_crypto":false,"accepts_cash":false,"is_open_source":true,"has_transparency_report":true,"has_warrant_canary":false}',
 '{"protocols":["AdGuard VPN","OpenVPN"],"has_kill_switch":true,"has_split_tunneling":true,"has_double_vpn":false,"has_tor_over_vpn":false,"has_obfuscation":true,"has_dns_leak_protection":true,"has_ad_blocker":true,"simultaneous_connections":10}',
 '{"windows":true,"mac_os":true,"linux":true,"ios":true,"android":true,"router":true,"browser_extension":true}')

ON CONFLICT (slug) DO UPDATE SET
    name                         = EXCLUDED.name,
    affiliate_url                = EXCLUDED.affiliate_url,
    streaming_support            = EXCLUDED.streaming_support,
    supported_streaming_services = EXCLUDED.supported_streaming_services,
    speed_score                  = EXCLUDED.speed_score,
    server_count                 = EXCLUDED.server_count,
    country_count                = EXCLUDED.country_count,
    editor_summary               = EXCLUDED.editor_summary,
    is_featured                  = EXCLUDED.is_featured,
    last_verified                = EXCLUDED.last_verified,
    privacy                      = EXCLUDED.privacy,
    features                     = EXCLUDED.features,
    platforms                    = EXCLUDED.platforms;

-- ------------------------------------------------------------
-- 3. Länkar
-- ------------------------------------------------------------

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://nordvpn.com/sv/'          FROM vpn_provider WHERE slug = 'nordvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://nordvpn.com/sv/pricing/'  FROM vpn_provider WHERE slug = 'nordvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://mullvad.net/sv/'          FROM vpn_provider WHERE slug = 'mullvad'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://mullvad.net/sv/pricing'   FROM vpn_provider WHERE slug = 'mullvad'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://protonvpn.com/sv/'        FROM vpn_provider WHERE slug = 'protonvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://account.protonvpn.com/sv/pricing?currency=undefined&hfp=false' FROM vpn_provider WHERE slug = 'protonvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://surfshark.com/sv/'        FROM vpn_provider WHERE slug = 'surfshark'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://surfshark.com/pricing'    FROM vpn_provider WHERE slug = 'surfshark'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://www.expressvpn.com/sv/'   FROM vpn_provider WHERE slug = 'expressvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://checkout.expressvpn.com/order?product_type=vpn' FROM vpn_provider WHERE slug = 'expressvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://www.ivpn.net/'            FROM vpn_provider WHERE slug = 'ivpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.ivpn.net/pricing/'    FROM vpn_provider WHERE slug = 'ivpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://www.cyberghostvpn.com/sv/'                       FROM vpn_provider WHERE slug = 'cyberghost'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.cyberghostvpn.com/sv/buy/cyberghost-vpn-3'   FROM vpn_provider WHERE slug = 'cyberghost'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://www.privateinternetaccess.com/sv/'               FROM vpn_provider WHERE slug = 'pia'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.privateinternetaccess.com/sv/buy-vpn-online' FROM vpn_provider WHERE slug = 'pia'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://windscribe.com/'          FROM vpn_provider WHERE slug = 'windscribe'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://swe.windscribe.com/upgrade' FROM vpn_provider WHERE slug = 'windscribe'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://www.azirevpn.com/'        FROM vpn_provider WHERE slug = 'azirevpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.azirevpn.com/pricing' FROM vpn_provider WHERE slug = 'azirevpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://www.ovpn.com/sv'          FROM vpn_provider WHERE slug = 'ovpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://www.ovpn.com/sv/pricing'  FROM vpn_provider WHERE slug = 'ovpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'main',  'https://adguard-vpn.com/'              FROM vpn_provider WHERE slug = 'adguardvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;
INSERT INTO vpn_provider_links (vpn_provider_id, link_type, url)
SELECT vpn_provider_id, 'price', 'https://adguard-vpn.com/license.html'  FROM vpn_provider WHERE slug = 'adguardvpn'
ON CONFLICT (vpn_provider_id, link_type) DO UPDATE SET url = EXCLUDED.url;

-- ------------------------------------------------------------
-- 4. Priser (SEK/mån) – verifiera mot respektive sajt
-- ------------------------------------------------------------

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 136, 136, 52,  120, NULL, 36,   120, 3    FROM vpn_provider WHERE slug = 'nordvpn'    ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 59,  59,  59,  59,  NULL, 49,   59,  NULL FROM vpn_provider WHERE slug = 'mullvad'    ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 105, 105, 52,  99,  NULL, 35,   99,  NULL FROM vpn_provider WHERE slug = 'protonvpn'  ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 162, 162, 42,  99,  NULL, 26,   99,  3    FROM vpn_provider WHERE slug = 'surfshark'  ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 136, 136, 70,  136, NULL, 55,   136, 3    FROM vpn_provider WHERE slug = 'expressvpn' ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 63,  63,  53,  63,  NULL, 42,   63,  NULL FROM vpn_provider WHERE slug = 'ivpn'       ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 109, 109, 44,  99,  NULL, 29,   99,  3    FROM vpn_provider WHERE slug = 'cyberghost' ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 99,  99,  35,  89,  NULL, 22,   89,  3    FROM vpn_provider WHERE slug = 'pia'        ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 79,  79,  35,  79,  NULL, NULL, NULL, NULL FROM vpn_provider WHERE slug = 'windscribe' ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 59,  59,  40,  59,  NULL, NULL, NULL, NULL FROM vpn_provider WHERE slug = 'azirevpn'  ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 69,  69,  42,  69,  NULL, NULL, NULL, NULL FROM vpn_provider WHERE slug = 'ovpn'      ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

INSERT INTO vpn_provider_pricing (vpn_provider_id, monthly_intro_price, monthly_regular_price, "1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month", "1_year_bonus_months", "2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month", "2_year_bonus_months")
SELECT vpn_provider_id, 69,  69,  35,  69,  NULL, 25,   69,  NULL FROM vpn_provider WHERE slug = 'adguardvpn' ON CONFLICT (vpn_provider_id) DO UPDATE SET monthly_intro_price=EXCLUDED.monthly_intro_price, monthly_regular_price=EXCLUDED.monthly_regular_price, "1_year_subscription_intro_price_per_month"=EXCLUDED."1_year_subscription_intro_price_per_month", "1_year_subscription_regular_price_per_month"=EXCLUDED."1_year_subscription_regular_price_per_month", "1_year_bonus_months"=EXCLUDED."1_year_bonus_months", "2_year_subscription_intro_price_per_month"=EXCLUDED."2_year_subscription_intro_price_per_month", "2_year_subscription_regular_price_per_month"=EXCLUDED."2_year_subscription_regular_price_per_month", "2_year_bonus_months"=EXCLUDED."2_year_bonus_months";

-- ------------------------------------------------------------
-- 5. Markera alla efterföljande migrations som körda
--    så att MigrationRunner hoppar över dem.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS schema_migrations (
    filename   TEXT        PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO schema_migrations (filename) VALUES
    ('001_create_vpn_providers.sql'),
    ('002_seed.sql'),
    ('003_rename_and_vpn_provider_links.sql'),
    ('004_drop_website_url.sql'),
    ('005_create_vpn_provider_pricing.sql'),
    ('006_prices_to_sek.sql'),
    ('007_restructure_pricing.sql'),
    ('008_recreate_pricing_column_order.sql'),
    ('009_seed_two_year_prices.sql'),
    ('010_seed_cyberghost.sql'),
    ('011_seed_pia.sql'),
    ('012_seed_windscribe.sql'),
    ('013_seed_azirevpn.sql'),
    ('014_seed_ovpn.sql'),
    ('015_seed_adguard_vpn.sql'),
    ('016_seed_missing_links.sql'),
    ('017_update_links.sql'),
    ('018_data_corrections.sql')
ON CONFLICT (filename) DO NOTHING;
