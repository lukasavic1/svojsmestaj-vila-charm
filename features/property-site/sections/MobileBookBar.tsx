"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useDemo } from "@/features/demo/DemoProvider";

/** Sticky quick availability — desktop + mobile. */
export function MobileBookBar() {
  const { unit, locale, ui, bookUnit } = useDemo();
  const [show, setShow] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

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

  return (
    <form
      className="vh-sticky vh-sticky--book"
      role="region"
      aria-label={ui.booking.checkAvailability}
      onSubmit={submit}
    >
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
