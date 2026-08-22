"use client";

import { BookingSummary } from "../components/BookingSummary";
import { WizardNav } from "../components/WizardNav";
import { useBooking } from "../BookingProvider";
import { useDemo } from "@/features/demo/DemoProvider";
import { unitCapacity } from "../lib/occupancy";

function Counter({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const canDec = value > min;
  const canInc = value < max;

  return (
    <div className="guest-counter">
      <span>{label}</span>
      <div className="guest-counter-controls">
        <button
          type="button"
          aria-label={`− ${label}`}
          disabled={!canDec}
          onClick={() => {
            if (canDec) onChange(value - 1);
          }}
        >
          −
        </button>
        <strong aria-live="polite">{value}</strong>
        <button
          type="button"
          aria-label={`+ ${label}`}
          disabled={!canInc}
          onClick={() => {
            if (canInc) onChange(value + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function StepGuests() {
  const {
    selectedUnit,
    draft,
    setGuests,
    setSpecialRequest,
    setGuestDetails,
    occupancyOk,
    goNext,
    canContinue,
  } = useBooking();
  const { ui } = useDemo();

  if (!selectedUnit) return null;

  const cap = unitCapacity(selectedUnit);
  const remainingForAdults = Math.max(0, cap - draft.children);
  const remainingForChildren = Math.max(0, cap - draft.adults);
  const maxAdults = Math.max(1, Math.min(cap, remainingForAdults));
  const maxChildren = Math.min(cap - 1, remainingForChildren);

  return (
    <div className="wiz-step" key="guests">
      <div className="wiz-guests-layout">
        <div className="guest-panel">
          <p className="guest-cap-hint">
            {ui.booking.occupancyHint.replace("{n}", String(cap))}
          </p>

          <Counter
            label={ui.booking.adults}
            value={draft.adults}
            min={1}
            max={maxAdults}
            onChange={(adults) => setGuests(adults, draft.children)}
          />
          <Counter
            label={ui.booking.children}
            value={draft.children}
            min={0}
            max={maxChildren}
            onChange={(children) => setGuests(draft.adults, children)}
          />

          {!occupancyOk && (
            <p className="guest-error" role="alert">
              {ui.booking.occupancyError}
            </p>
          )}

          <label className="guest-notes">
            <span>{ui.booking.specialRequest}</span>
            <textarea
              rows={2}
              required
              value={draft.specialRequest}
              placeholder={ui.booking.specialRequestHint}
              onChange={(e) => setSpecialRequest(e.target.value)}
            />
          </label>

          <div className="guest-details">
            <p className="guest-details-title">{ui.booking.guestDetails}</p>
            <label>
              <span>{ui.booking.fullName}</span>
              <input
                type="text"
                autoComplete="name"
                required
                value={draft.guestName}
                onChange={(e) => setGuestDetails({ guestName: e.target.value })}
              />
            </label>
            <label>
              <span>{ui.booking.email}</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={draft.guestEmail}
                onChange={(e) => setGuestDetails({ guestEmail: e.target.value })}
              />
            </label>
            <label>
              <span>{ui.booking.phone}</span>
              <input
                type="tel"
                autoComplete="tel"
                required
                value={draft.guestPhone}
                onChange={(e) => setGuestDetails({ guestPhone: e.target.value })}
              />
            </label>
          </div>
        </div>
        <BookingSummary />
      </div>
      <WizardNav onPrimary={goNext} primaryDisabled={!canContinue} />
    </div>
  );
}
