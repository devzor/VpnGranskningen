import { UserProfile } from "@/types/vpn";

const ACCENTS = {
  sky: {
    iconBg:          "bg-sky-100",
    iconText:        "text-sky-500",
    keywordBg:       "bg-sky-100 text-sky-700",
    selectedBorder:  "border-sky-400",
    selectedBg:      "bg-sky-50",
    selectedKeyword: "bg-sky-200 text-sky-800",
    ring:            "ring-sky-300",
  },
  violet: {
    iconBg:          "bg-violet-100",
    iconText:        "text-violet-500",
    keywordBg:       "bg-violet-100 text-violet-700",
    selectedBorder:  "border-violet-400",
    selectedBg:      "bg-violet-50",
    selectedKeyword: "bg-violet-200 text-violet-800",
    ring:            "ring-violet-300",
  },
  slate: {
    iconBg:          "bg-slate-100",
    iconText:        "text-slate-600",
    keywordBg:       "bg-slate-100 text-slate-700",
    selectedBorder:  "border-slate-700",
    selectedBg:      "bg-slate-50",
    selectedKeyword: "bg-slate-200 text-slate-800",
    ring:            "ring-slate-400",
  },
} as const;

type Accent = keyof typeof ACCENTS;

interface ProfileCardProps {
  profile:     UserProfile;
  icon:        string;
  title:       string;
  description: string;
  keywords:    readonly string[];
  accent:      Accent;
  selected:    boolean;
  onClick:     () => void;
}

export default function ProfileCard({
  icon,
  title,
  description,
  keywords,
  accent,
  selected,
  onClick,
}: ProfileCardProps) {
  const c = ACCENTS[accent];

  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`group text-left w-full rounded-2xl border-2 p-8 transition-all duration-200
        ${selected
          ? `${c.selectedBorder} ${c.selectedBg} shadow-md ring-2 ${c.ring} ring-offset-2`
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg hover:-translate-y-0.5"
        }`}
    >
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 text-3xl ${c.iconBg}`}>
        <span aria-hidden="true">{icon}</span>
      </div>

      <h3 className="font-bold text-gray-900 mb-3 text-lg tracking-tight">
        {title}
      </h3>

      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {keywords.map((k) => (
          <span
            key={k}
            className={`text-xs font-medium rounded-full px-2.5 py-0.5 transition-colors duration-150
              ${selected ? c.selectedKeyword : c.keywordBg}`}
          >
            {k}
          </span>
        ))}
      </div>

      {/* "Välj" indicator */}
      <div className={`mt-5 text-xs font-semibold transition-all duration-150
        ${selected ? "opacity-100 text-gray-900" : "opacity-0 group-hover:opacity-100 text-gray-400"}`}>
        {selected ? "✓ Vald" : "Välj →"}
      </div>
    </button>
  );
}
