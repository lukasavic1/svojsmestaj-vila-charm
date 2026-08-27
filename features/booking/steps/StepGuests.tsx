"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDemo } from "@/features/demo/DemoProvider";
import { BookingSummary } from "../components/BookingSummary";
import { WizardNav } from "../components/WizardNav";
import { useBooking } from "../BookingProvider";
import { unitCapacity, unitDayCapacity } from "../lib/occupancy";
import {
  CELEBRATION_TYPES,
  type CelebrationType,
} from "../types";

function Counter({
  label,
  value,
  min,
  max,
  onChange,
  maxMessage,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  maxMessage: string;
}) {
  const [warn, setWarn] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const canDec = value > min;

  const flash = () => {
    setWarn(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setWarn(false), 2200);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className={`guest-counter-block${warn ? " is-warn" : ""}`}>
      <div className="guest-counter">
        <span>{label}</span>
        <div className="guest-counter-controls">
          <button
            type="button"
            aria-label={`− ${label}`}
            disabled={!canDec}
            onClick={() => {
              if (canDec) onChange(value - 1);
            }}
          >
            −
          </button>
          <strong aria-live="polite">{value}</strong>
          <button
            type="button"
            aria-label={`+ ${label}`}
            onClick={() => {
              if (value >= max) flash();
              else onChange(value + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <AnimatePresence>
        {warn ? (
          <motion.p
            className="guest-warn"
            role="status"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {maxMessage}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function CelebrationSelect({
  value,
  onChange,
  label,
  placeholder,
  options,
}: {
  value: CelebrationType | "";
  onChange: (value: CelebrationType) => void;
  label: string;
  placeholder: string;
  options: { id: CelebrationType; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const listId = useId();
  const selected = options.find((o) => o.id === value);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="guest-cele">
      <span id={labelId} className="guest-cele-label">
        {label}
      </span>
      <button
        type="button"
        className={`guest-cele-now${open ? " is-open" : ""}${value ? "" : " is-empty"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{selected?.label ?? placeholder}</span>
        <span className="guest-cele-caret" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listId}
            className="guest-cele-menu"
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.id === value}
                  className={option.id === value ? "is-on" : ""}
                  onClick={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function StepGuests() {
  const {
    selectedUnit,
    draft,
    setGuests,
    setDayGuests,
    setSpecialRequest,
    setCelebrationType,
    setGuestDetails,
    goNext,
    canContinue,
  } = useBooking();
  const { ui, closeBooking } = useDemo();

  if (!selectedUnit) return null;

  const sleepCap = unitCapacity(selectedUnit);
  const dayCap = unitDayCapacity(selectedUnit);

  return (
    <div className="wiz-step" key="guests">
      <div className="wiz-guests-layout">
        <div className="guest-panel">
          <Counter
            label={ui.booking.sleepingGuests}
            value={draft.adults}
            min={2}
            max={sleepCap}
            onChange={setGuests}
            maxMessage={ui.booking.sleepingWarning}
          />
          <Counter
            label={ui.booking.dayGuests}
            value={draft.dayGuests}
            min={Math.max(2, draft.adults)}
            max={dayCap}
            onChange={setDayGuests}
            maxMessage={ui.booking.dayWarning}
          />

          <div className="guest-more">
            <p className="guest-more-title">{ui.booking.moreGuestsTitle}</p>
            <p className="guest-more-body">{ui.booking.moreGuestsBody}</p>
            <a
              className="guest-more-link"
              href="#kontakt"
              onClick={() => closeBooking()}
            >
              {ui.booking.moreGuestsContact}
            </a>
          </div>

          <CelebrationSelect
            label={ui.booking.celebrationType}
            placeholder={ui.booking.celebrationPlaceholder}
            value={draft.celebrationType}
            onChange={setCelebrationType}
            options={CELEBRATION_TYPES.map((id) => ({
              id,
              label: ui.booking.celebrationOptions[id],
            }))}
          />

          <label className="guest-notes">
            <span>{ui.booking.specialRequest}</span>
            <textarea
              rows={3}
              value={draft.specialRequest}
              placeholder={ui.booking.specialRequestHint}
              onChange={(e) => setSpecialRequest(e.target.value)}
            />
          </label>

          <div className="guest-details">
            <p className="guest-details-title">{ui.booking.guestDetails}</p>
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
        <BookingSummary hideGuests />
      </div>
      <WizardNav onPrimary={goNext} primaryDisabled={!canContinue} />
    </div>
  );
}
