import {
  nightsBetween,
  parseIsoDate,
  toIsoDate,
} from "@/lib/calendar";

/** Weekday nights: Pon–Čet. */
export const WEEKDAY_RATE_EUR = 250;
/** Weekend nights: Pet–Ned. */
export const WEEKEND_RATE_EUR = 450;
export const DEPOSIT_EUR = 100;

function shiftIso(iso: string, days: number): string | null {
  const d = parseIsoDate(iso);
  if (!d) return null;
  const next = new Date(Date.UTC(d.year, d.month, d.day + days));
  return toIsoDate(next.getUTCFullYear(), next.getUTCMonth(), next.getUTCDate());
}

/** Friday, Saturday, Sunday nights use the weekend rate. */
export function isWeekendNight(iso: string): boolean {
  const d = parseIsoDate(iso);
  if (!d) return false;
  const weekday = new Date(Date.UTC(d.year, d.month, d.day)).getUTCDay();
  return weekday === 0 || weekday === 5 || weekday === 6;
}

export function estimateStayTotal(
  checkIn: string,
  checkOut: string,
  weekdayEur = WEEKDAY_RATE_EUR,
  weekendEur = WEEKEND_RATE_EUR
): number | null {
  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0) return null;

  let total = 0;
  for (let i = 0; i < nights; i += 1) {
    const night = shiftIso(checkIn, i);
    if (!night) return null;
    total += isWeekendNight(night) ? weekendEur : weekdayEur;
  }
  return total;
}
