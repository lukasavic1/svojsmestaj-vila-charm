"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookingProvider, useBooking } from "./BookingProvider";
import { WizardProgress } from "./components/WizardProgress";
import { StepDates } from "./steps/StepDates";
import { StepGuests } from "./steps/StepGuests";
import { StepReview } from "./steps/StepReview";
import { StepUnits } from "./steps/StepUnits";
import { useDemo } from "@/features/demo/DemoProvider";
import { RatesStrip } from "@/features/property-site/sections/RatesStrip";
import type { Unit } from "@/types/property";

function WizardBody() {
  const { step, stepScrollNonce } = useBooking();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stepScrollNonce === 0) return;
    const target = bodyRef.current;
    if (!target) return;
    const id = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
      target.closest(".modal-body")?.scrollTo({ top: 0, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [stepScrollNonce]);

  return (
    <div className="wiz-body" data-step={step} ref={bodyRef}>
      {step === "unit" && <StepUnits />}
      {step === "dates" && <StepDates />}
      {step === "guests" && <StepGuests />}
      {step === "review" && <StepReview />}
    </div>
  );
}

function SuccessPopup() {
  const { successOpen, dismissSuccess } = useBooking();
  const { ui } = useDemo();
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!successOpen) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
    };
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";

    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissSuccess();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      style.overflow = prev.overflow;
      style.position = prev.position;
      style.top = prev.top;
      style.width = prev.width;
      // Instant restore — html scroll-behavior:smooth would re-animate to termini.
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
      document.removeEventListener("keydown", onKey);
    };
  }, [successOpen, dismissSuccess]);

  if (!successOpen || !mounted) return null;

  return createPortal(
    <div
      className="wiz-success-root"
      role="presentation"
      onClick={dismissSuccess}
    >
      <div
        className="wiz-success-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wiz-success-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="success-mark" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="64" height="64">
            <circle
              className="success-ring"
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="success-check"
              d="M18 33.5 27 42.5 46 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 id="wiz-success-title">{ui.booking.successTitle}</h3>
        <p className="success-lead">{ui.booking.successLead}</p>
        <p className="success-body">{ui.booking.successBody}</p>
        <button
          ref={closeRef}
          type="button"
          className="btn btn-solid btn-block"
          onClick={dismissSuccess}
        >
          {ui.booking.newRequest}
        </button>
      </div>
    </div>,
    document.body
  );
}

function WizardHead() {
  const { ui } = useDemo();
  const { step, flowSteps } = useBooking();
  const showRates = step === flowSteps[0];

  return (
    <header className="booking-wizard-head">
      <h2 className="sec-title" id="termini-naslov">
        {ui.booking.sectionHeading}
      </h2>
      {showRates ? <RatesStrip variant="bubble" /> : null}
      <WizardProgress />
    </header>
  );
}

export function BookingWizard({
  units,
  initialUnitId = null,
}: {
  units: Unit[];
  initialUnitId?: string | null;
}) {
  return (
    <BookingProvider units={units} initialUnitId={initialUnitId}>
      <div className="booking-wizard">
        <WizardHead />
        <WizardBody />
        <SuccessPopup />
      </div>
    </BookingProvider>
  );
}
