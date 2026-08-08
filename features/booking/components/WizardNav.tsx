"use client";

import { useBooking } from "../BookingProvider";
import { useDemo } from "@/features/demo/DemoProvider";

type Props = {
  onPrimary?: () => void;
  primaryLabel?: string;
  primaryDisabled?: boolean;
  hideBack?: boolean;
};

export function WizardNav({
  onPrimary,
  primaryLabel,
  primaryDisabled,
  hideBack,
}: Props) {
  const { step, goBack, goNext, canContinue, flowSteps } = useBooking();
  const { ui } = useDemo();

  if (step === "success") return null;

  const showBack = !hideBack && flowSteps.indexOf(step) > 0;
  const label = primaryLabel ?? ui.booking.continue;
  const disabled = primaryDisabled ?? !canContinue;
  const handle = onPrimary ?? goNext;

  return (
    <div className={`wiz-nav${showBack ? " wiz-nav--split" : ""}`}>
      {showBack && (
        <button type="button" className="btn btn-ghost-dark" onClick={goBack}>
          {ui.booking.back}
        </button>
      )}
      <button
        type="button"
        className="btn btn-solid"
        onClick={handle}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}
