"use client";

import { UnitCard } from "../components/UnitCard";
import { useBooking } from "../BookingProvider";
import { useDemo } from "@/features/demo/DemoProvider";

export function StepUnits() {
  const { units, selectUnit, goTo } = useBooking();
  const { ui } = useDemo();

  return (
    <div className="wiz-step" key="unit">
      <div className="stay-grid" role="list" aria-label={ui.booking.steps.unit}>
        {units.map((unit) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            onSelect={() => {
              selectUnit(unit.id);
              goTo("dates");
            }}
          />
        ))}
      </div>
    </div>
  );
}
