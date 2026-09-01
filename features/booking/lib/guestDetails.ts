import type { BookingDraft } from "../types";

export function nameOk(value: string) {
  return value.trim().length >= 2;
}

export function emailOk(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

/** Digits only, optional leading `+`, E.164 length cap. */
export function sanitizePhoneInput(raw: string) {
  const leadingPlus = raw.trimStart().startsWith("+");
  const digits = raw.replace(/\D/g, "").slice(0, 15);
  return leadingPlus ? `+${digits}` : digits;
}

export function phoneOk(value: string) {
  const n = phoneDigits(value).length;
  return n >= 8 && n <= 15;
}

export function guestDetailsOk(
  draft: Pick<
    BookingDraft,
    "guestName" | "guestEmail" | "guestPhone" | "celebrationType"
  >
) {
  return (
    nameOk(draft.guestName) &&
    emailOk(draft.guestEmail) &&
    phoneOk(draft.guestPhone) &&
    Boolean(draft.celebrationType)
  );
}
