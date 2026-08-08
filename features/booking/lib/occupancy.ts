import type { Unit } from "@/types/property";

/** Clamp adults/children to unit capacity (at least 1 adult). */
export function clampGuests(
  adults: number,
  children: number,
  capacity: number
): { adults: number; children: number } {
  const cap = Number.isFinite(capacity) && capacity > 0 ? Math.floor(capacity) : 1;

  let nextAdults = Math.max(1, Math.floor(adults) || 1);
  let nextChildren = Math.max(0, Math.floor(children) || 0);

  if (nextAdults > cap) {
    nextAdults = cap;
    nextChildren = 0;
  }

  while (nextAdults + nextChildren > cap && nextChildren > 0) {
    nextChildren -= 1;
  }

  while (nextAdults + nextChildren > cap && nextAdults > 1) {
    nextAdults -= 1;
  }

  return { adults: nextAdults, children: nextChildren };
}

export function unitCapacity(unit: Unit | null | undefined): number {
  const cap = unit?.specs.capacity;
  return Number.isFinite(cap) && (cap as number) > 0 ? (cap as number) : 1;
}
