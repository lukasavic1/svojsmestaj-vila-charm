"use client";

import { useMemo, useState } from "react";
import type { Availability, YearMonth } from "@/types/property";
import {
  asMonthIndex,
  compareIso,
  isDayBooked,
  isInRange,
  isRangeEndpoint,
  mondayOffset,
  daysInMonth,
  rangeHasBookedNight,
  shiftMonth,
  toIsoDate,
  todayIso,
} from "@/lib/calendar";
import { useDemo } from "@/features/demo/DemoProvider";

type Props = {
  availability: Availability;
  checkIn: string | null;
  checkOut: string | null;
  onChange: (checkIn: string | null, checkOut: string | null) => void;
};

export function RangeCalendar({
  availability,
  checkIn,
  checkOut,
  onChange,
}: Props) {
  const { ui } = useDemo();
  const [cursor, setCursor] = useState<YearMonth>(availability.first);
  const [error, setError] = useState<string | null>(null);
  const today = todayIso();

  const { year, month } = cursor;
  const totalDays = daysInMonth(year, month);
  const offset = mondayOffset(year, month);
  const atFirst =
    asMonthIndex(year, month) <=
    asMonthIndex(availability.first.year, availability.first.month);
  const atLast =
    asMonthIndex(year, month) >=
    asMonthIndex(availability.last.year, availability.last.month);

  const hint = useMemo(() => {
    if (!checkIn) return ui.booking.selectCheckIn;
    if (!checkOut) return ui.booking.selectCheckOut;
    return null;
  }, [checkIn, checkOut, ui.booking.selectCheckIn, ui.booking.selectCheckOut]);

  const pick = (iso: string, booked: boolean) => {
    if (booked || compareIso(iso, today) < 0) return;

    if (!checkIn || (checkIn && checkOut)) {
      onChange(iso, null);
      setError(null);
      return;
    }

    if (compareIso(iso, checkIn) <= 0) {
      onChange(iso, null);
      setError(null);
      return;
    }

    if (rangeHasBookedNight(availability.booked, checkIn, iso)) {
      setError(ui.booking.rangeBlocked);
      return;
    }

    onChange(checkIn, iso);
    setError(null);
  };

  return (
    <div className="range-cal">
      <div className="cal-nav">
        <h3 id="range-cal-month">
          {ui.calendar.months[month]} {year}.
        </h3>
        <div className="btns">
          <button
            type="button"
            onClick={() => setCursor(shiftMonth(cursor, -1))}
            disabled={atFirst}
            aria-label={ui.calendar.prevMonth}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setCursor(shiftMonth(cursor, 1))}
            disabled={atLast}
            aria-label={ui.calendar.nextMonth}
          >
            ›
          </button>
        </div>
      </div>

      {hint && <p className="range-cal-hint">{hint}</p>}
      {error && (
        <p className="range-cal-error" role="alert">
          {error}
        </p>
      )}

      <div className="cal range-cal-grid" role="grid" aria-labelledby="range-cal-month">
        {ui.calendar.days.map((d) => (
          <div className="dow" role="columnheader" key={d}>
            {d}
          </div>
        ))}

        {Array.from({ length: offset }, (_, i) => (
          <div className="day empty" key={`e-${i}`} />
        ))}

        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const iso = toIsoDate(year, month, day);
          const booked = isDayBooked(availability.booked, year, month, day);
          const past = compareIso(iso, today) < 0;
          const disabled = booked || past;
          const inRange = isInRange(iso, checkIn, checkOut);
          const endpoint = isRangeEndpoint(iso, checkIn, checkOut);
          const classes = [
            "day",
            "day-btn",
            booked ? "taken" : past ? "is-past" : "free",
            inRange ? "in-range" : "",
            endpoint ? "is-endpoint" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={iso}
              type="button"
              role="gridcell"
              className={classes}
              disabled={disabled}
              aria-label={`${day}. ${ui.calendar.months[month]} — ${
                booked ? ui.calendar.busy : ui.calendar.free
              }`}
              onClick={() => pick(iso, booked)}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="cal-legend">
        <span>
          <i className="dot free" aria-hidden="true" /> {ui.calendar.free}
        </span>
        <span>
          <i className="dot busy" aria-hidden="true" /> {ui.calendar.busy}
        </span>
        <span>
          <i className="dot selected" aria-hidden="true" /> {ui.booking.selected}
        </span>
      </div>

      {(checkIn || checkOut) && (
        <button
          type="button"
          className="range-cal-clear"
          onClick={() => {
            onChange(null, null);
            setError(null);
          }}
        >
          {ui.booking.clearDates}
        </button>
      )}
    </div>
  );
}
