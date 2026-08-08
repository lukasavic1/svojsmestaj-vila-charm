"use client";

import { InfoIcon } from "@/components/ui/icons";
import { useDemo } from "@/features/demo/DemoProvider";

export function ContactBookingNote() {
  const { experience, ui } = useDemo();
  if (experience.booking !== "contact-calendar") return null;

  return (
    <aside className="contact-booking-note" aria-labelledby="contact-booking-title">
      <div className="contact-booking-icon" aria-hidden="true">
        <InfoIcon />
      </div>
      <div>
        <h3 id="contact-booking-title">{ui.booking.contactOnlyTitle}</h3>
        <p>{ui.booking.contactOnlyBody}</p>
      </div>
    </aside>
  );
}
