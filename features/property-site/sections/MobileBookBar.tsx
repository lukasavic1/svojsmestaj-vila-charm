"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useDemo } from "@/features/demo/DemoProvider";

/**
 * Desktop-only sticky availability strip.
 * Hidden on phones — booking stays in hero / section CTAs.
 */
export function MobileBookBar() {
  const { unit, locale, ui, bookUnit } = useDemo();
  const [desktop, setDesktop] = useState(false);
  const [show, setShow] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!desktop) {
      setShow(false);
      document.documentElement.classList.remove("vh-bookbar-on", "vh-bookbar-mini");
      return;
    }

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
  }, [desktop]);

  useEffect(() => {
    document.documentElement.classList.toggle("vh-bookbar-on", desktop && show);
    document.documentElement.classList.remove("vh-bookbar-mini");
    return () => {
      document.documentElement.classList.remove("vh-bookbar-on", "vh-bookbar-mini");
    };
  }, [desktop, show]);

  if (!desktop || !show) return null;

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
