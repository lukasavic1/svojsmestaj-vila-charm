import type { YearMonth } from "@/types/property";

export const asMonthIndex = (y: number, m: number) => y * 12 + m;

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Monday-first offset (0 = Monday). */
export function mondayOffset(year: number, month: number): number {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

export function shiftMonth(cursor: YearMonth, delta: number): YearMonth {
  const next = new Date(cursor.year, cursor.month + delta, 1);
  return { year: next.getFullYear(), month: next.getMonth() };
}

export function bookedKey(year: number, month: number): string {
  return `${year}-${month}`;
}

/** Format YYYY-MM-DD in local time. */
export function toIsoDate(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export function parseIsoDate(
  iso: string
): (YearMonth & { day: number }) | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  if (month < 0 || month > 11 || day < 1 || day > 31) return null;
  return { year, month, day };
}

export function compareIso(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parseIsoDate(checkIn);
  const b = parseIsoDate(checkOut);
  if (!a || !b) return 0;
  const ms =
    Date.UTC(b.year, b.month, b.day) - Date.UTC(a.year, a.month, a.day);
  return Math.max(0, Math.round(ms / 86_400_000));
}

export function isDayBooked(
  booked: Record<string, number[]>,
  year: number,
  month: number,
  day: number
): boolean {
  return (booked[bookedKey(year, month)] ?? []).includes(day);
}

export function isIsoBooked(
  booked: Record<string, number[]>,
  iso: string
): boolean {
  const d = parseIsoDate(iso);
  if (!d) return true;
  return isDayBooked(booked, d.year, d.month, d.day);
}

/** Inclusive stay nights: check-in night through night before check-out. */
export function rangeHasBookedNight(
  booked: Record<string, number[]>,
  checkIn: string,
  checkOut: string
): boolean {
  const start = parseIsoDate(checkIn);
  const end = parseIsoDate(checkOut);
  if (!start || !end || compareIso(checkOut, checkIn) <= 0) return true;

  const cursor = new Date(start.year, start.month, start.day);
  const last = new Date(end.year, end.month, end.day);
  last.setDate(last.getDate() - 1);

  while (cursor <= last) {
    if (
      isDayBooked(
        booked,
        cursor.getFullYear(),
        cursor.getMonth(),
        cursor.getDate()
      )
    ) {
      return true;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return false;
}

export function isInRange(
  iso: string,
  checkIn: string | null,
  checkOut: string | null
): boolean {
  if (!checkIn || !checkOut) return false;
  return compareIso(iso, checkIn) >= 0 && compareIso(iso, checkOut) <= 0;
}

export function isRangeEndpoint(
  iso: string,
  checkIn: string | null,
  checkOut: string | null
): boolean {
  return iso === checkIn || iso === checkOut;
}

export function formatIsoDisplay(
  iso: string,
  locale: string,
  months: string[]
): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  void locale;
  return `${d.day}. ${months[d.month]} ${d.year}.`;
}

export function todayIso(): string {
  const n = new Date();
  return toIsoDate(n.getFullYear(), n.getMonth(), n.getDate());
}
