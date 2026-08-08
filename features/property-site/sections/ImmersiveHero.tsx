"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { PinIcon } from "@/components/ui/icons";
import { heroSlides, unitHeroCovers } from "@/data/heroSlides";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx } from "@/lib/i18n";

const HERO_INTERVAL_MS = 7000;

/**
 * Premium full-bleed hero — photography-led, one clear CTA.
 * Specs live in the intro; booking details stay in the float card on large screens.
 */
export function ImmersiveHero() {
  const { units, locale, ui, bookUnit } = useDemo();
  const slides =
    units.length === 1
      ? heroSlides.length
        ? heroSlides
        : [unitHeroCovers[units[0].id] ?? units[0].photos[0]?.src ?? ""]
      : units.map((u) => unitHeroCovers[u.id] ?? u.photos[0]?.src ?? "");

  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [instant, setInstant] = useState(false);
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const activeUnit = units.length === 1 ? units[0] : units[index] ?? units[0];
  const specs = activeUnit.specs;
  const multiUnit = units.length > 1;

  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [index, slides.length]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (document.documentElement.classList.contains("is-scroll-locked")) {
          return;
        }
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25);
      },
      { threshold: [0, 0.25, 0.5, 0.75] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (slides.length < 2 || !inView) return;
    const id = window.setTimeout(() => {
      setInstant(false);
      setIndex((i) => (i + 1) % slides.length);
      setCycle((c) => c + 1);
    }, HERO_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [slides.length, index, cycle, inView]);

  const selectSlide = (next: number) => {
    if (next === index) {
      setCycle((c) => c + 1);
      return;
    }
    setInstant(true);
    setIndex(next);
    setCycle((c) => c + 1);
  };

  return (
    <section
      ref={sectionRef}
      className="hero hero--immersive"
      aria-label={tx(activeUnit.name, locale)}
    >
      <div
        className={`hero-stage${instant ? " is-instant" : ""}`}
        aria-hidden="true"
      >
        {slides.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`hero-slide${i === index ? " is-active" : ""}`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              quality={IMAGE_QUALITY.hero}
              sizes="100vw"
              className="hero-slide-img"
            />
          </div>
        ))}
        <div className="hero-veil" />
      </div>

      <div
        className="hero-unit-switch"
        aria-label={multiUnit ? ui.units.heading : ui.nav.gallery}
      >
        <div className="hero-unit-tabs" role="tablist">
          {(multiUnit ? units : slides).map((item, i) => {
            const key = multiUnit
              ? (item as (typeof units)[number]).id
              : `slide-${i}`;
            const label = multiUnit
              ? tx((item as (typeof units)[number]).shortLabel, locale)
              : String(i + 1).padStart(2, "0");
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={`hero-unit-tab${i === index ? " is-on" : ""}${
                  multiUnit ? "" : " hero-unit-tab--dot"
                }`}
                onClick={() => selectSlide(i)}
              >
                <span className="hero-unit-tab-label">{label}</span>
                {i === index && inView && (
                  <span
                    className="hero-unit-tab-progress"
                    key={`prog-${cycle}`}
                    style={
                      {
                        "--hero-tab-ms": `${HERO_INTERVAL_MS}ms`,
                      } as CSSProperties
                    }
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="wrap hero-immersive-grid">
        <div className="hero-immersive-copy" key={activeUnit.id}>
          <p className="hero-kicker">
            {locale === "sr" ? "Barajevo · Srbija" : "Barajevo · Serbia"}
          </p>
          <h1>{tx(activeUnit.name, locale)}</h1>
          <p className="hero-hook">{tx(activeUnit.hook, locale)}</p>
          <p className="hero-region">
            <PinIcon />
            {tx(activeUnit.region, locale)}
            <span className="hero-region-sep" aria-hidden="true">
              ·
            </span>
            <span>
              {specs.capacity} {ui.booking.guestsLabel}
              {specs.bedrooms > 0
                ? ` · ${specs.bedrooms} ${ui.booking.bedrooms}`
                : ""}
            </span>
          </p>

          <button
            type="button"
            className="btn btn-solid btn-glow hero-mobile-cta"
            onClick={() => bookUnit(activeUnit.id)}
          >
            {ui.booking.checkAvailability}
          </button>
        </div>

        <aside className="hero-float-card" key={`card-${activeUnit.id}`}>
          <p className="hero-float-price">
            <b>{tx(activeUnit.price.amount, locale)}</b>
            <span>{tx(activeUnit.price.note, locale)}</span>
          </p>

          <ul className="hero-float-highlights">
            <li>
              <strong>
                {specs.capacity} {ui.booking.guestsLabel}
              </strong>
              <span>
                {specs.dayCapacity
                  ? locale === "sr"
                    ? `do ${specs.dayCapacity} dnevno`
                    : `up to ${specs.dayCapacity} by day`
                  : ui.booking.guests}
              </span>
            </li>
            <li>
              <strong>
                {specs.bedrooms > 0
                  ? `${specs.bedrooms} ${ui.booking.bedrooms}`
                  : "Studio"}
              </strong>
              <span>{tx(specs.beds, locale)}</span>
            </li>
            <li>
              <strong>
                {specs.bathrooms} {ui.booking.bathrooms}
              </strong>
              <span>
                {specs.sizeSqm.toLocaleString(locale === "sr" ? "sr-RS" : "en")}{" "}
                {ui.booking.size}
              </span>
            </li>
          </ul>

          <button
            type="button"
            className="btn btn-solid btn-block btn-glow"
            onClick={() => bookUnit(activeUnit.id)}
          >
            {ui.booking.checkAvailability}
          </button>
        </aside>
      </div>
    </section>
  );
}
