const MONTHS_SV = [
  "januari", "februari", "mars", "april", "maj", "juni",
  "juli", "augusti", "september", "oktober", "november", "december",
];

/** "april 2026" */
export function currentMonthYear(): string {
  const d = new Date();
  return `${MONTHS_SV[d.getMonth()]} ${d.getFullYear()}`;
}

/** "April 2026" */
export function currentMonthYearCapitalized(): string {
  const s = currentMonthYear();
  return s.charAt(0).toUpperCase() + s.slice(1);
}
