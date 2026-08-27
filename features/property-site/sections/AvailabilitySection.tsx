"use client";

import { useMemo, useState } from "react";
import { WhatsAppSimpleIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Calendar } from "@/features/calendar/Calendar";
import { ContactBookingNote } from "@/features/booking/ContactBookingNote";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { useDemo } from "@/features/demo/DemoProvider";
import { property } from "@/data/property";
import { formatIsoDisplay, nightsBetween } from "@/lib/calendar";
import { estimateStayTotal } from "@/features/booking/lib/rates";
import { t3, tx } from "@/lib/i18n";

export function AvailabilitySection() {
  const { unit, locale, ui, experience, units, bookingPrefillUnitId } =
    useDemo();
  const a = unit.availability;
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  const nights =
    checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const estimate =
    checkIn && checkOut
      ? estimateStayTotal(
          checkIn,
          checkOut,
          unit.price.perNightEur,
          unit.price.weekendEur
        )
      : null;

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

  if (experience.booking === "wizard") {
    return (
      <section
        id="termini"
        className="booking-sec vh-book"
        aria-labelledby="termini-naslov"
      >
        <div className="vh-wrap">
          <Reveal>
            <BookingWizard
              key={bookingPrefillUnitId ?? "idle"}
              units={units}
              initialUnitId={bookingPrefillUnitId}
            />
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="termini" className="avail-sec" aria-labelledby="termini-naslov">
      <div className="wrap">
        <Reveal>
          <div className="avail-head">
            <div>
              <h2 className="sec-title" id="termini-naslov">
                {ui.availability.heading}
              </h2>
              <p className="sec-lead">{ui.availability.lead}</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="avail-panel">
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
                      <p className="cal-estimate-label">
                        {ui.booking.estimatedStay}
                      </p>
                      <p className="cal-estimate-total">
                        <strong>{estimate} €</strong>
                      </p>
                      <dl className="cal-estimate-meta">
                        <div>
                          <dt>{ui.booking.checkIn}</dt>
                          <dd>
                            {formatIsoDisplay(
                              checkIn,
                              locale,
                              ui.calendar.months
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt>{ui.booking.checkOut}</dt>
                          <dd>
                            {formatIsoDisplay(
                              checkOut,
                              locale,
                              ui.calendar.months
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt>{ui.booking.nights}</dt>
                          <dd>
                            {nights === 1
                              ? ui.booking.nightOne
                              : ui.booking.nightMany.replace(
                                  "{n}",
                                  String(nights)
                                )}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ) : (
                    <div className="cal-note-prompt">
                      <p className="cal-note-prompt-title">
                        {ui.booking.selectCheckIn}
                      </p>
                      <p className="cal-note-prompt-body">
                        {ui.availability.lead}
                      </p>
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
                </div>

                <a
                  className="btn btn-solid btn-block btn-glow"
                  href={estimate != null ? waHref : "#kontakt"}
                  target={estimate != null ? "_blank" : undefined}
                  rel={estimate != null ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (estimate == null) {
                      e.preventDefault();
                      document
                        .getElementById("kontakt")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <WhatsAppSimpleIcon />
                  {estimate != null
                    ? ui.booking.inquireSelected
                    : ui.booking.checkAvailability}
                </a>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
