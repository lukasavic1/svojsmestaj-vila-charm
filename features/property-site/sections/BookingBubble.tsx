"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@/components/ui/Modal";
import { WhatsAppSimpleIcon } from "@/components/ui/icons";
import { Calendar } from "@/features/calendar/Calendar";
import { ContactBookingNote } from "@/features/booking/ContactBookingNote";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { useDemo } from "@/features/demo/DemoProvider";
import { property } from "@/data/property";
import { formatIsoDisplay, nightsBetween } from "@/lib/calendar";
import { t3, tx } from "@/lib/i18n";

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
      <path d="M8 15h.01M12 15h.01M16 15h.01" />
    </svg>
  );
}

function BasicBookingPanel() {
  const { unit, locale, ui } = useDemo();
  const a = unit.availability;
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  const nights =
    checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const estimate =
    nights > 0 ? nights * unit.price.perNightEur : null;

  const waHref = useMemo(() => {
    const base = `https://wa.me/${property.contact.whatsapp}`;
    if (!checkIn || !checkOut) return base;
    const msg = encodeURIComponent(
      t3(
        locale,
        `Zdravo! Zanima me boravak od ${checkIn} do ${checkOut} (${nights} noći).`,
        `Hello! I'm interested in staying from ${checkIn} to ${checkOut} (${nights} nights).`,
        `Здравствуйте! Меня интересует проживание с ${checkIn} по ${checkOut} (ночей: ${nights}).`
      )
    );
    return `${base}?text=${msg}`;
  }, [checkIn, checkOut, nights, locale]);

  return (
    <div className="vh-book-dock-basic">
      <ContactBookingNote />
      <div className="cal-grid">
        <div className="cal-col">
          <Calendar
            key={unit.id}
            first={a.first}
            last={a.last}
            booked={a.booked}
            selectable
            checkIn={checkIn}
            checkOut={checkOut}
            onRangeChange={(start, end) => {
              setCheckIn(start);
              setCheckOut(end);
            }}
          />
        </div>
        <aside className="cal-note">
          <div className="cal-note-body">
            {estimate != null && checkIn && checkOut ? (
              <div className="cal-estimate" aria-live="polite">
                <p className="cal-estimate-label">{ui.booking.estimatedStay}</p>
                <p className="cal-estimate-total">
                  <strong>{estimate} €</strong>
                </p>
                <dl className="cal-estimate-meta">
                  <div>
                    <dt>{ui.booking.checkIn}</dt>
                    <dd>
                      {formatIsoDisplay(checkIn, locale, ui.calendar.months)}
                    </dd>
                  </div>
                  <div>
                    <dt>{ui.booking.checkOut}</dt>
                    <dd>
                      {formatIsoDisplay(checkOut, locale, ui.calendar.months)}
                    </dd>
                  </div>
                  <div>
                    <dt>{ui.booking.nights}</dt>
                    <dd>
                      {nights === 1
                        ? ui.booking.nightOne
                        : ui.booking.nightMany.replace("{n}", String(nights))}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : (
              <div className="cal-note-prompt">
                <p className="cal-note-prompt-title">{ui.booking.selectCheckIn}</p>
                <p className="cal-note-prompt-body">{ui.availability.lead}</p>
              </div>
            )}
            <div className="cal-facts">
              <h3>{tx(a.sideHeading, locale)}</h3>
              <dl className="cal-facts-list">
                {a.sideFacts.map((fact) => (
                  <div key={tx(fact.label, locale)}>
                    <dt>{tx(fact.label, locale)}</dt>
                    <dd>{tx(fact.value, locale)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a
              className="btn btn-solid"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppSimpleIcon />
              {ui.booking.inquireSelected}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Round floating booking FAB — portaled to body so device frames can’t clip it. */
export function BookingBubble() {
  const {
    locale,
    ui,
    experience,
    units,
    bookingOpen,
    bookingPrefillUnitId,
    openBooking,
    closeBooking,
  } = useDemo();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const label = t3(locale, "Termini", "Dates", "Даты");
  const title =
    experience.booking === "wizard"
      ? ui.booking.sectionHeading
      : ui.availability.heading;

  const bubble =
    mounted && !bookingOpen ? (
      <button
        type="button"
        className="vh-book-bubble"
        aria-label={ui.booking.checkAvailability}
        onClick={() => openBooking()}
      >
        <span className="vh-book-bubble-ring" aria-hidden="true" />
        <span
          className="vh-book-bubble-ring vh-book-bubble-ring--delay"
          aria-hidden="true"
        />
        <span className="vh-book-bubble-core">
          <CalendarIcon />
          <span className="vh-book-bubble-label">{label}</span>
        </span>
      </button>
    ) : null;

  return (
    <>
      {mounted && bubble ? createPortal(bubble, document.body) : null}

      <Modal
        open={bookingOpen}
        title={title}
        onClose={closeBooking}
        closeLabel={ui.a11y.menuClose}
        panelClassName="modal-panel--booking"
        titleHidden
      >
        <div className="vh-book-dock" id="termini">
          {experience.booking === "wizard" ? (
            <BookingWizard
              key={bookingPrefillUnitId ?? "idle"}
              units={units}
              initialUnitId={bookingPrefillUnitId}
            />
          ) : (
            <BasicBookingPanel />
          )}
        </div>
      </Modal>
    </>
  );
}
