"use client";

import Image from "next/image";
import { formatIsoDisplay } from "@/lib/calendar";
import { tx } from "@/lib/i18n";
import { useDemo } from "@/features/demo/DemoProvider";
import { WizardNav } from "../components/WizardNav";
import { useBooking } from "../BookingProvider";

export function StepReview() {
  const {
    selectedUnit,
    draft,
    nights,
    estimatedTotal,
    setGuestDetails,
    confirm,
    canContinue,
  } = useBooking();
  const { locale, ui } = useDemo();

  if (!selectedUnit) return null;

  const nightLabel =
    nights === 1
      ? ui.booking.nightOne
      : ui.booking.nightMany.replace("{n}", String(nights));

  return (
    <div className="wiz-step" key="review">
      <div className="review-layout">
        <div className="review-card">
          <h3>{ui.booking.reviewTitle}</h3>
          <p className="review-lead">{ui.booking.reviewLead}</p>

          <div className="review-unit">
            <div className="review-thumb">
              <Image
                src={selectedUnit.photos[0].src}
                alt={tx(selectedUnit.photos[0].alt, locale)}
                fill
                sizes="120px"
              />
            </div>
            <div>
              <strong>{tx(selectedUnit.name, locale)}</strong>
              <p>{tx(selectedUnit.specs.summary, locale)}</p>
            </div>
          </div>

          <dl className="review-dl">
            <div>
              <dt>{ui.booking.checkIn}</dt>
              <dd>
                {draft.checkIn &&
                  formatIsoDisplay(draft.checkIn, locale, ui.calendar.months)}
              </dd>
            </div>
            <div>
              <dt>{ui.booking.checkOut}</dt>
              <dd>
                {draft.checkOut &&
                  formatIsoDisplay(draft.checkOut, locale, ui.calendar.months)}
              </dd>
            </div>
            <div>
              <dt>{ui.booking.nights}</dt>
              <dd>{nightLabel}</dd>
            </div>
            <div>
              <dt>{ui.booking.guests}</dt>
              <dd>
                {draft.adults} {ui.booking.adults.toLowerCase()}
                {draft.children > 0
                  ? `, ${draft.children} ${ui.booking.children.toLowerCase()}`
                  : ""}
              </dd>
            </div>
            <div>
              <dt>{ui.booking.notes}</dt>
              <dd>
                {draft.specialRequest.trim()
                  ? draft.specialRequest
                  : ui.booking.noNotes}
              </dd>
            </div>
            {estimatedTotal != null && (
              <div>
                <dt>{ui.booking.estimatedTotal}</dt>
                <dd>
                  <strong>{estimatedTotal} €</strong>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="review-form">
          <h3>{ui.booking.guestDetails}</h3>
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

      <WizardNav
        onPrimary={confirm}
        primaryLabel={ui.booking.confirm}
        primaryDisabled={!canContinue}
      />
    </div>
  );
}
