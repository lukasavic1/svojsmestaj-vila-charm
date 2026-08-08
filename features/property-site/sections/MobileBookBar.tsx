"use client";

import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import { useDemo } from "@/features/demo/DemoProvider";

/** Sticky quick availability — swipe down on mobile to collapse. */
export function MobileBookBar() {
  const { unit, locale, ui, bookUnit } = useDemo();
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const dragRef = useRef<{ y: number; active: boolean } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".vh-hero");
      if (!hero) {
        setShow(window.scrollY > 280);
        return;
      }
      setShow(hero.getBoundingClientRect().bottom < 64);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("vh-bookbar-on", show && !collapsed);
    document.documentElement.classList.toggle("vh-bookbar-mini", show && collapsed);
    return () => {
      document.documentElement.classList.remove("vh-bookbar-on", "vh-bookbar-mini");
    };
  }, [show, collapsed]);

  if (!show) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    try {
      sessionStorage.setItem(
        "vh-quick-book",
        JSON.stringify({ checkIn, checkOut, guests })
      );
    } catch {
      /* ignore */
    }
    bookUnit(unit.id);
  };

  const onHandleDown = (e: PointerEvent<HTMLButtonElement>) => {
    dragRef.current = { y: e.clientY, active: true };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onHandleMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    if (!d?.active) return;
    const dy = e.clientY - d.y;
    if (dy > 48) {
      d.active = false;
      setCollapsed(true);
    }
  };

  const onHandleUp = () => {
    dragRef.current = null;
  };

  if (collapsed) {
    return (
      <button
        type="button"
        className="vh-sticky-mini"
        onClick={() => setCollapsed(false)}
        aria-expanded={false}
        aria-label={ui.booking.checkAvailability}
      >
        <span className="vh-sticky-mini-label">
          {locale === "sr" ? "Rezervacija" : "Booking"}
        </span>
        <span className="vh-sticky-mini-cta">
          {locale === "sr" ? "Proveri dostupnost" : "Check availability"}
        </span>
      </button>
    );
  }

  return (
    <form
      className="vh-sticky vh-sticky--book"
      role="region"
      aria-label={ui.booking.checkAvailability}
      onSubmit={submit}
    >
      <button
        type="button"
        className="vh-sticky-handle"
        aria-label={
          locale === "sr" ? "Prevuci nadole da sakriješ" : "Swipe down to hide"
        }
        onPointerDown={onHandleDown}
        onPointerMove={onHandleMove}
        onPointerUp={onHandleUp}
        onPointerCancel={onHandleUp}
        onClick={() => setCollapsed(true)}
      >
        <span className="vh-sticky-handle-bar" aria-hidden="true" />
        <span className="vh-sticky-handle-hint">
          {locale === "sr" ? "Prevuci nadole da sakriješ" : "Swipe down to hide"}
        </span>
      </button>

      <label className="vh-sticky-field">
        <span>{locale === "sr" ? "Prijava" : "Check-in"}</span>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
      </label>
      <label className="vh-sticky-field">
        <span>{locale === "sr" ? "Odjava" : "Check-out"}</span>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </label>
      <label className="vh-sticky-field vh-sticky-field--guests">
        <span>{locale === "sr" ? "Gosti" : "Guests"}</span>
        <input
          type="number"
          min={1}
          max={unit.specs.capacity}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="vh-btn vh-btn--bronze">
        {locale === "sr" ? "Proveri dostupnost" : "Check availability"}
      </button>
    </form>
  );
}
