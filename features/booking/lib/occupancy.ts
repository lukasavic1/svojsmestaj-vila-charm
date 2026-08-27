import type { Unit } from "@/types/property";

export function unitCapacity(unit: Unit | null | undefined): number {
  const cap = unit?.specs.capacity;
  return Number.isFinite(cap) && (cap as number) > 0 ? (cap as number) : 10;
}

export function unitDayCapacity(unit: Unit | null | undefined): number {
  const cap = unit?.specs.dayCapacity;
  return Number.isFinite(cap) && (cap as number) > 0 ? (cap as number) : 30;
}

export function clampSleepingGuests(value: number, cap: number): number {
  const n = Math.floor(value) || 0;
  return Math.min(cap, Math.max(2, n));
}

export function clampDayGuests(value: number, min: number, cap: number): number {
  const n = Math.floor(value) || 0;
  const lo = Math.max(2, min);
  return Math.min(cap, Math.max(lo, n));
}
