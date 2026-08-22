"use client";

import { BookingSummary } from "../components/BookingSummary";
import { RangeCalendar } from "../components/RangeCalendar";
import { WizardNav } from "../components/WizardNav";
import { useBooking } from "../BookingProvider";

export function StepDates() {
  const { selectedUnit, draft, setDates, goNext, canContinue } = useBooking();

  if (!selectedUnit) return null;

  return (
    <div className="wiz-step" key="dates">
      <div className="wiz-dates-layout">
        <div className="cal-card range-cal-card">
          <RangeCalendar
            availability={selectedUnit.availability}
            checkIn={draft.checkIn}
            checkOut={draft.checkOut}
            onChange={setDates}
          />
        </div>
        <BookingSummary compact />
      </div>
      <WizardNav onPrimary={goNext} primaryDisabled={!canContinue} />
    </div>
  );
}
