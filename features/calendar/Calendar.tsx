"use client";

import { useMemo, useState } from "react";
import type { YearMonth } from "@/types/property";
import {
  asMonthIndex,
  compareIso,
  daysInMonth,
  isDayBooked,
  isInRange,
  isRangeEndpoint,
  mondayOffset,
  rangeHasBookedNight,
  shiftMonth,
  toIsoDate,
  todayIso,
} from "@/lib/calendar";
import { useDemo } from "@/features/demo/DemoProvider";

type Props = {
  first: YearMonth;
  last: YearMonth;
  booked: Record<string, number[]>;
  /** When true, guests can pick a stay range. */
  selectable?: boolean;
  checkIn?: string | null;
  checkOut?: string | null;
  onRangeChange?: (checkIn: string | null, checkOut: string | null) => void;
};

export function Calendar({
  first,
  last,
  booked,
  selectable = false,
  checkIn = null,
  checkOut = null,
  onRangeChange,
}: Props) {
  const { ui } = useDemo();
  const [cursor, setCursor] = useState<YearMonth>(first);
  const [error, setError] = useState<string | null>(null);
  const { year, month } = cursor;
  const totalDays = daysInMonth(year, month);
  const offset = mondayOffset(year, month);
  const today = todayIso();

  const atFirst =
    asMonthIndex(year, month) <= asMonthIndex(first.year, first.month);
  const atLast =
    asMonthIndex(year, month) >= asMonthIndex(last.year, last.month);

  const hint = useMemo(() => {
    if (!selectable) return null;
    if (!checkIn) return ui.booking.selectCheckIn;
    if (!checkOut) return ui.booking.selectCheckOut;
    return null;
  }, [selectable, checkIn, checkOut, ui.booking.selectCheckIn, ui.booking.selectCheckOut]);

  const pick = (iso: string, taken: boolean) => {
    if (!selectable || !onRangeChange || taken || compareIso(iso, today) < 0) {
      return;
    }

    if (!checkIn || (checkIn && checkOut)) {
      onRangeChange(iso, null);
      setError(null);
      return;
    }

    if (compareIso(iso, checkIn) <= 0) {
      onRangeChange(iso, null);
      setError(null);
      return;
    }

    if (rangeHasBookedNight(booked, checkIn, iso)) {
      setError(ui.booking.rangeBlocked);
      return;
    }

    onRangeChange(checkIn, iso);
    setError(null);
  };

  return (
    <div className={`cal-card${selectable ? " cal-card--interactive" : ""}`}>
      <div className="cal-nav">
        <h3 id="cal-month">
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

      <div className="cal" role="grid" aria-labelledby="cal-month">
        {ui.calendar.days.map((d) => (
          <div className="dow" role="columnheader" key={d}>
            {d}
          </div>
        ))}

        {Array.from({ length: offset }, (_, i) => (
          <div className="day empty" key={`empty-${i}`} />
        ))}

        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const iso = toIsoDate(year, month, day);
          const taken = isDayBooked(booked, year, month, day);
          const past = compareIso(iso, today) < 0;
          const inRange = selectable && isInRange(iso, checkIn, checkOut);
          const endpoint =
            selectable && isRangeEndpoint(iso, checkIn, checkOut);
          const classes = [
            "day",
            selectable ? "day-btn" : "",
            taken ? "taken" : "free",
            past && !taken ? "is-past" : "",
            inRange ? "in-range" : "",
            endpoint ? "is-endpoint" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const label = `${day}. ${ui.calendar.months[month]} — ${
            taken ? ui.calendar.busy : ui.calendar.free
          }`;

          if (!selectable) {
            return (
              <div key={iso} role="gridcell" className={classes} aria-label={label}>
                {day}
              </div>
            );
          }

          return (
            <button
              key={iso}
              type="button"
              role="gridcell"
              className={classes}
              disabled={taken || past}
              aria-label={label}
              aria-pressed={endpoint || undefined}
              onClick={() => pick(iso, taken)}
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
        {selectable && (
          <span>
            <i className="dot selected" aria-hidden="true" />{" "}
            {ui.booking.selected}
          </span>
        )}
      </div>

      {selectable && (checkIn || checkOut) && (
        <button
          type="button"
          className="range-cal-clear"
          onClick={() => {
            onRangeChange?.(null, null);
            setError(null);
          }}
        >
          {ui.booking.clearDates}
        </button>
      )}
    </div>
  );
}
