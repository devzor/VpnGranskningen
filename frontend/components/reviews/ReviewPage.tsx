"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentMonthYearCapitalized } from "@/lib/currentDate";

const ALL_REVIEWS = [
  { slug: "nordvpn",    name: "NordVPN"                  },
  { slug: "mullvad",    name: "Mullvad"                   },
  { slug: "protonvpn",  name: "Proton VPN"                },
  { slug: "surfshark",  name: "Surfshark"                 },
  { slug: "expressvpn", name: "ExpressVPN"                },
  { slug: "ivpn",       name: "IVPN"                      },
  { slug: "cyberghost", name: "CyberGhost"                },
  { slug: "pia",        name: "Private Internet Access"   },
  { slug: "windscribe", name: "Windscribe"                },
  { slug: "azirevpn",   name: "AzireVPN"                  },
  { slug: "ovpn",       name: "OVPN"                      },
  { slug: "adguardvpn", name: "AdGuard VPN"               },
];

export interface ReviewData {
  slug:         string;
  name:         string;
  tagline:      string;
  intro:        string;
  mainUrl:      string;
  scores: {
    streaming: number;
    privacy:   number;
    paranoid:  number;
  };
  scoreNotes: {
    streaming: string;
    privacy:   string;
    paranoid:  string;
  };
  facts: [string, string][];
  pros:  string[];
  cons:  string[];
  sections: { title: string; body: string }[];
  pricing: { label: string; price: string }[];
  conclusion: string;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function ScoreBar({ label, score, note }: { label: string; score: number; note: string }) {
  const color = score >= 70 ? "bg-emerald-500" : score >= 50 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="font-bold text-gray-900 tabular-nums">
          {score}<span className="text-gray-400 font-normal">/100</span>
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-gray-400">{note}</p>
    </div>
  );
}

function ProCon({ items, type }: { items: string[]; type: "pro" | "con" }) {
  const icon = type === "pro" ? "✓" : "✗";
  const cls  = type === "pro" ? "text-emerald-600" : "text-red-400";
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-gray-600">
          <span className={`shrink-0 font-bold ${cls}`}>{icon}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ReviewSidebar({ currentSlug }: { currentSlug: string }) {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Alla recensioner</p>
        <nav className="flex flex-col gap-0.5">
          {ALL_REVIEWS.map(({ slug, name }) => {
            const active = pathname === `/recensioner/${slug}`;
            return (
              <Link
                key={slug}
                href={`/recensioner/${slug}`}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  active
                    ? "bg-gray-900 text-white font-medium"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
export default function ReviewPage({ data }: { data: ReviewData }) {
  const { slug, name, tagline, intro, mainUrl, scores, scoreNotes, facts, pros, cons, sections, pricing, conclusion } = data;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-14 flex gap-12">
        <main className="flex-1 min-w-0 space-y-12">


        {/* Brödsmula */}
        <nav className="text-xs text-gray-400 flex gap-1.5 items-center">
          <Link href="/" className="hover:text-gray-700 transition-colors">Hem</Link>
          <span>›</span>
          <span>Recensioner</span>
          <span>›</span>
          <span className="text-gray-600">{name}</span>
        </nav>

        {/* Rubrik */}
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Recension · Uppdaterad {currentMonthYearCapitalized()}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">{name}</h1>
          <p className="text-sm font-medium text-gray-500">{tagline}</p>
          <p className="text-base text-gray-600 leading-relaxed">{intro}</p>
        </header>

        {/* Poäng */}
        <section className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Betyg per användarprofil</h2>
            <p className="text-sm text-gray-500 mt-1">
              Poängen beräknas av{" "}
              <Link href="/#quiz" className="underline underline-offset-2 hover:text-gray-700">vår scoringmodell</Link>
              {" "}– se viktning nedan.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-5">
            <ScoreBar label="Netflix & Resor"  score={scores.streaming} note={scoreNotes.streaming} />
            <ScoreBar label="Max Privacy"       score={scores.privacy}   note={scoreNotes.privacy}   />
            <ScoreBar label="Super User"        score={scores.paranoid}  note={scoreNotes.paranoid}  />
          </div>

          <details className="rounded-xl border border-gray-200 text-sm">
            <summary className="px-4 py-3 cursor-pointer font-medium text-gray-700 hover:text-gray-900 select-none">
              Hur räknar vi? Visa viktning →
            </summary>
            <div className="px-4 pb-4 pt-2 space-y-4 text-gray-600">
              <div>
                <p className="font-semibold text-gray-800 mb-1">Netflix & Resor (max 100p)</p>
                <ul className="space-y-0.5 text-xs">
                  <li>Streaming – Fullt: 40p / Delvis: 20p / Inget: 0p</li>
                  <li>Ettårspris – ≤3 kr: 30p / ≤5 kr: 22p / ≤7 kr: 14p / ≤10 kr: 6p / Mer: 0p</li>
                  <li>Hastighetspoäng – SpeedScore × 2 (max 20p)</li>
                  <li>Plattformar – Win/Mac/iOS/Android alla 4: 10p, annars proportionellt</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Max Privacy (max 100p)</p>
                <ul className="space-y-0.5 text-xs">
                  <li>No-logs: 15p | Auditerad: 15p | Färsk audit (≤2 år): 5p</li>
                  <li>Jurisdiktion – Låg risk: 25p / Medel: 12p / Hög: 0p</li>
                  <li>Accepterar crypto: 12p | Kontanter: 8p</li>
                  <li>Öppen källkod: 6p | Transparensrapport: 4p | Warrant canary: 4p</li>
                  <li>DNS-läckskydd: 4p | Kill switch: 2p</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Super User (max 100p)</p>
                <ul className="space-y-0.5 text-xs">
                  <li>Privacy-poäng × 0,4 (max 40p)</li>
                  <li>Multihop/Double VPN: 12p | Tor-stöd: 12p | Obfuskering: 10p</li>
                  <li>Kill switch: 4p | Split tunneling: 2p</li>
                  <li>Öppen källkod: 20p</li>
                </ul>
              </div>
            </div>
          </details>
        </section>

        {/* Snabbfakta */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 grid grid-cols-2 gap-4 text-sm">
          {facts.map(([label, value]) => (
            <div key={label}>
              <p className="text-gray-400 text-xs uppercase tracking-wide">{label}</p>
              <p className="font-medium text-gray-900 mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* För och emot */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900">Fördelar</h2>
            <ProCon type="pro" items={pros} />
          </div>
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-900">Nackdelar</h2>
            <ProCon type="con" items={cons} />
          </div>
        </section>

        {/* Fritext-sektioner */}
        {sections.map(({ title, body }) => (
          <section key={title} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              {body.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </section>
        ))}

        {/* Pris */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Pris</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pricing.map(({ label, price }) => (
              <div key={label} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{price}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">Alla priser inkl. moms.</p>
        </section>

        {/* Slutsats */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Slutsats</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{conclusion}</p>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-500">{tagline}</p>
            </div>
            <a href={mainUrl} target="_blank" rel="noopener noreferrer sponsored"
              className="shrink-0 text-sm font-semibold text-white bg-gray-900 rounded-xl px-5 py-2.5 hover:bg-gray-700 transition-colors">
              Se erbjudande →
            </a>
          </div>
        </section>

        <div className="pt-4 border-t border-gray-100">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
            ← Tillbaka till alla VPN
          </Link>
        </div>

        </main>
        <ReviewSidebar currentSlug={slug} />
      </div>
    </div>
  );
}
