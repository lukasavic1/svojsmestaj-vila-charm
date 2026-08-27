"use client";

import Image from "next/image";
import { formatIsoDisplay } from "@/lib/calendar";
import { tx } from "@/lib/i18n";
import { useDemo } from "@/features/demo/DemoProvider";
import { useBooking } from "../BookingProvider";

export function BookingSummary({
  compact = false,
  hideGuests = false,
}: {
  compact?: boolean;
  hideGuests?: boolean;
}) {
  const { selectedUnit, draft, nights, estimatedTotal } = useBooking();
  const { locale, ui } = useDemo();

  if (!selectedUnit) return null;

  const nightLabel =
    nights === 1
      ? ui.booking.nightOne
      : ui.booking.nightMany.replace("{n}", String(nights));

  return (
    <aside className={`book-summary${compact ? " is-compact" : ""}`}>
      <h3>{ui.booking.summary}</h3>
      <div className="book-summary-unit">
        <div className="book-summary-thumb">
          <Image
            src={selectedUnit.photos[0].src}
            alt={tx(selectedUnit.photos[0].alt, locale)}
            fill
            sizes="96px"
          />
        </div>
        <div>
          <strong>{tx(selectedUnit.name, locale)}</strong>
          <p>{tx(selectedUnit.specs.summary, locale)}</p>
        </div>
      </div>

      <dl className="book-summary-dl">
        <div>
          <dt>{ui.booking.checkIn}</dt>
          <dd>
            {draft.checkIn
              ? formatIsoDisplay(draft.checkIn, locale, ui.calendar.months)
              : "—"}
          </dd>
        </div>
        <div>
          <dt>{ui.booking.checkOut}</dt>
          <dd>
            {draft.checkOut
              ? formatIsoDisplay(draft.checkOut, locale, ui.calendar.months)
              : "—"}
          </dd>
        </div>
        <div>
          <dt>{ui.booking.nights}</dt>
          <dd>{nights > 0 ? nightLabel : "—"}</dd>
        </div>
        {hideGuests ? null : (
          <div>
            <dt>{ui.booking.guests}</dt>
            <dd>
              {draft.adults > 0 ? `${draft.adults}` : "—"}
            </dd>
          </div>
        )}
      </dl>

      {estimatedTotal != null && (
        <p className="book-summary-total">
          <span>{ui.booking.estimatedTotal}</span>
          <strong>{estimatedTotal} €</strong>
        </p>
      )}
    </aside>
  );
}
