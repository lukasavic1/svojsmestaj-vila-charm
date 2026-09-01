"use client";

import { useEffect, useId, useRef, useState, type Ref } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";
import { BookingSummary } from "../components/BookingSummary";
import { WizardNav } from "../components/WizardNav";
import { useBooking } from "../BookingProvider";
import {
  emailOk,
  nameOk,
  phoneOk,
  sanitizePhoneInput,
} from "../lib/guestDetails";
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
  invalid,
  errorId,
  buttonRef,
}: {
  value: CelebrationType | "";
  onChange: (value: CelebrationType) => void;
  label: string;
  placeholder: string;
  options: { id: CelebrationType; label: string }[];
  invalid?: boolean;
  errorId?: string;
  buttonRef?: Ref<HTMLButtonElement>;
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
    <div ref={rootRef} className={`guest-cele${invalid ? " is-invalid" : ""}`}>
      <span id={labelId} className="guest-cele-label">
        {label}
      </span>
      <button
        ref={buttonRef}
        type="button"
        className={`guest-cele-now${open ? " is-open" : ""}${value ? "" : " is-empty"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        data-invalid={invalid ? "true" : undefined}
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

type Touched = {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  celebration?: boolean;
};

function FieldError({ id, message }: { id: string; message: string | null }) {
  if (!message) return null;
  return (
    <p id={id} className="guest-field-error" role="alert">
      {message}
    </p>
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
  const { ui, locale } = useDemo();
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState<Touched>({});
  const celeBtnRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const celeErrId = useId();
  const nameErrId = useId();
  const emailErrId = useId();
  const phoneErrId = useId();

  if (!selectedUnit) return null;

  const sleepCap = unitCapacity(selectedUnit);
  const dayCap = unitDayCapacity(selectedUnit);
  const { phone, email, whatsapp } = property.contact;
  const telHref = `tel:${phone.replace(/\s/g, "")}`;
  const waHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    t3(
      locale,
      draft.checkIn && draft.checkOut
        ? `Zdravo! Zanima me događaj za više od 30 gostiju u Villa Charm, od ${draft.checkIn} do ${draft.checkOut}.`
        : "Zdravo! Zanima me događaj za više od 30 gostiju u Villa Charm.",
      draft.checkIn && draft.checkOut
        ? `Hello! I'm interested in an event for more than 30 guests at Villa Charm, from ${draft.checkIn} to ${draft.checkOut}.`
        : "Hello! I'm interested in an event for more than 30 guests at Villa Charm.",
      draft.checkIn && draft.checkOut
        ? `Здравствуйте! Меня интересует мероприятие более чем на 30 гостей в Villa Charm, с ${draft.checkIn} по ${draft.checkOut}.`
        : "Здравствуйте! Меня интересует мероприятие более чем на 30 гостей в Villa Charm."
    )
  )}`;

  const showCele = attempted || Boolean(touched.celebration);
  const showName = attempted || Boolean(touched.name);
  const showEmail = attempted || Boolean(touched.email);
  const showPhone = attempted || Boolean(touched.phone);

  const celeError =
    showCele && !draft.celebrationType ? ui.booking.errorCelebration : null;
  const nameError = showName && !nameOk(draft.guestName) ? ui.booking.errorName : null;
  const emailError = showEmail
    ? !draft.guestEmail.trim()
      ? ui.booking.errorEmailEmpty
      : emailOk(draft.guestEmail)
        ? null
        : ui.booking.errorEmail
    : null;
  const phoneError = showPhone
    ? !draft.guestPhone.trim()
      ? ui.booking.errorPhoneEmpty
      : phoneOk(draft.guestPhone)
        ? null
        : ui.booking.errorPhone
    : null;

  const tryContinue = () => {
    if (canContinue) {
      goNext();
      return;
    }
    setAttempted(true);
    setTouched({ name: true, email: true, phone: true, celebration: true });
    window.setTimeout(() => {
      const first =
        (!draft.celebrationType && celeBtnRef.current) ||
        (!nameOk(draft.guestName) && nameRef.current) ||
        (!emailOk(draft.guestEmail) && emailRef.current) ||
        (!phoneOk(draft.guestPhone) && phoneRef.current);
      if (!first) return;
      first.focus({ preventScroll: true });
      first.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

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
            <ul className="guest-more-channels">
              <li>
                <a href={telHref}>
                  <PhoneIcon />
                  {phone}
                </a>
              </li>
              <li>
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  {ui.booking.successWhatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`}>
                  <MailIcon />
                  {email}
                </a>
              </li>
            </ul>
          </div>

          <CelebrationSelect
            label={ui.booking.celebrationType}
            placeholder={ui.booking.celebrationPlaceholder}
            value={draft.celebrationType}
            onChange={(value) => {
              setCelebrationType(value);
              setTouched((t) => ({ ...t, celebration: true }));
            }}
            options={CELEBRATION_TYPES.map((id) => ({
              id,
              label: ui.booking.celebrationOptions[id],
            }))}
            invalid={Boolean(celeError)}
            errorId={celeErrId}
            buttonRef={celeBtnRef}
          />
          <FieldError id={celeErrId} message={celeError} />

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
            <label className={nameError ? "is-invalid" : undefined}>
              <span>{ui.booking.fullName}</span>
              <input
                ref={nameRef}
                type="text"
                autoComplete="name"
                required
                aria-invalid={nameError ? true : undefined}
                aria-describedby={nameError ? nameErrId : undefined}
                data-invalid={nameError ? "true" : undefined}
                value={draft.guestName}
                onChange={(e) => setGuestDetails({ guestName: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              />
              <FieldError id={nameErrId} message={nameError} />
            </label>
            <label className={emailError ? "is-invalid" : undefined}>
              <span>{ui.booking.email}</span>
              <input
                ref={emailRef}
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? emailErrId : undefined}
                data-invalid={emailError ? "true" : undefined}
                value={draft.guestEmail}
                onChange={(e) => setGuestDetails({ guestEmail: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              />
              <FieldError id={emailErrId} message={emailError} />
            </label>
            <label className={phoneError ? "is-invalid" : undefined}>
              <span>{ui.booking.phone}</span>
              <input
                ref={phoneRef}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                aria-invalid={phoneError ? true : undefined}
                aria-describedby={phoneError ? phoneErrId : undefined}
                data-invalid={phoneError ? "true" : undefined}
                value={draft.guestPhone}
                onChange={(e) =>
                  setGuestDetails({ guestPhone: sanitizePhoneInput(e.target.value) })
                }
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              />
              <FieldError id={phoneErrId} message={phoneError} />
            </label>
          </div>
        </div>
        <BookingSummary />
      </div>
      <WizardNav onPrimary={tryContinue} primaryDisabled={false} />
    </div>
  );
}
