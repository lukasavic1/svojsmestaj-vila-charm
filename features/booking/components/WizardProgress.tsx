"use client";

import type { BookingStep } from "../types";
import { useBooking } from "../BookingProvider";
import { useDemo } from "@/features/demo/DemoProvider";

export function WizardProgress() {
  const { step, flowSteps } = useBooking();
  const { ui } = useDemo();

  if (step === "success") return null;

  const activeIdx = flowSteps.indexOf(step);

  return (
    <ol className="wiz-progress" aria-label={ui.booking.progressLabel}>
      {flowSteps.map((id, i) => {
        const state =
          i < activeIdx ? "done" : i === activeIdx ? "current" : "todo";
        return (
          <li key={id} className={`wiz-progress-item is-${state}`}>
            <span className="wiz-progress-dot" aria-hidden="true">
              {i < activeIdx ? "✓" : i + 1}
            </span>
            <span className="wiz-progress-label">
              {ui.booking.steps[id as Exclude<BookingStep, "success">]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
