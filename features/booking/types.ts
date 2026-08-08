export const BOOKING_STEPS = [
  "unit",
  "dates",
  "guests",
  "review",
  "success",
] as const;

export type BookingStep = (typeof BOOKING_STEPS)[number];

export type BookingDraft = {
  unitId: string | null;
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  specialRequest: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
};

export const INITIAL_BOOKING_DRAFT: BookingDraft = {
  unitId: null,
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  specialRequest: "",
  guestName: "",
  guestEmail: "",
  guestPhone: "",
};

export const FLOW_STEPS: BookingStep[] = ["unit", "dates", "guests", "review"];

/** Skip unit selection when the property has a single accommodation. */
export function bookingFlowSteps(unitCount: number): BookingStep[] {
  if (unitCount <= 1) {
    return ["dates", "guests", "review"];
  }
  return [...FLOW_STEPS];
}
