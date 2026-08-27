"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, InstagramIcon, MenuIcon } from "@/components/ui/icons";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/types/locale";

function Flag({ locale }: { locale: Locale }) {
  if (locale === "en") {
    return (
      <svg className="vh-lang-flag" viewBox="0 0 16 12" aria-hidden="true">
        <rect width="16" height="12" fill="#012169" />
        <path d="M0 0 L16 12 M16 0 L0 12" stroke="#fff" strokeWidth="2.2" />
        <path d="M0 0 L16 12 M16 0 L0 12" stroke="#c8102e" strokeWidth="1.1" />
        <path d="M8 0 V12 M0 6 H16" stroke="#fff" strokeWidth="3.4" />
        <path d="M8 0 V12 M0 6 H16" stroke="#c8102e" strokeWidth="1.8" />
      </svg>
    );
  }
  if (locale === "ru") {
    return (
      <svg className="vh-lang-flag" viewBox="0 0 16 12" aria-hidden="true">
        <rect width="16" height="4" fill="#fff" />
        <rect y="4" width="16" height="4" fill="#0039a6" />
        <rect y="8" width="16" height="4" fill="#d52b1e" />
      </svg>
    );
  }
  return (
    <svg className="vh-lang-flag" viewBox="0 0 16 12" aria-hidden="true">
      <rect width="16" height="4" fill="#c6363c" />
      <rect y="4" width="16" height="4" fill="#0c4076" />
      <rect y="8" width="16" height="4" fill="#fff" />
    </svg>
  );
}

function LangSwitch({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

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
    <div ref={rootRef} className="vh-lang-dd">
      <button
        type="button"
        className={`vh-lang-now${open ? " is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((v) => !v)}
      >
        <Flag locale={locale} />
        <span>{LOCALE_LABELS[locale]}</span>
        <span className="vh-lang-caret" aria-hidden="true" />
      </button>
      {open ? (
        <ul className="vh-lang-menu" role="listbox" aria-label="Language">
          {LOCALES.map((id) => (
            <li key={id}>
              <button
                type="button"
                role="option"
                aria-selected={id === locale}
                className={id === locale ? "is-on" : ""}
                onClick={() => {
                  setLocale(id);
                  setOpen(false);
                }}
              >
                <Flag locale={id} />
                <span>{LOCALE_LABELS[id]}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const { locale, ui, setLocale, openBooking } = useDemo();
  const brand = property.units[0];
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
    };
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      style.overflow = prev.overflow;
      style.position = prev.position;
      style.top = prev.top;
      style.width = prev.width;
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const nav = [
    {
      href: "#o-nama",
      label: t3(locale, "O nama", "About", "О нас"),
    },
    {
      href: "#prostor",
      label: t3(locale, "Galerija", "Gallery", "Галерея"),
    },
    {
      href: "#galerija",
      label: t3(locale, "Događaji", "Events", "События"),
    },
    {
      href: "#utisci",
      label: t3(locale, "Utisci", "Reviews", "Отзывы"),
    },
    {
      href: "#lokacija",
      label: t3(locale, "Lokacija", "Location", "Локация"),
    },
    {
      href: "#faq",
      label: t3(locale, "Pitanja", "FAQ", "Вопросы"),
    },
  ];

  const closeMenu = () => setMenuOpen(false);
  const classes = [
    "vh-nav",
    "vh-nav--glass",
    stuck || menuOpen ? "is-stuck" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const portalTarget =
    typeof document !== "undefined"
      ? document.getElementById("top") ?? document.body
      : null;

  const bookLabel = t3(locale, "Rezerviši", "Book", "Бронь");
  const instagram = property.contact.instagram;

  const drawer =
    menuOpen && mounted && portalTarget
      ? createPortal(
          <div className="vh-menu-root" role="presentation" onClick={closeMenu}>
            <div
              id={menuId}
              className="vh-menu"
              role="dialog"
              aria-modal="true"
              aria-label={ui.a11y.mainNav}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="vh-menu-bar">
                <span>{tx(brand.name, locale)}</span>
                <button
                  ref={closeRef}
                  type="button"
                  className="vh-icon-btn"
                  onClick={closeMenu}
                  aria-label={ui.a11y.menuClose}
                >
                  <CloseIcon />
                </button>
              </div>
              <nav className="vh-menu-links">
                {nav.map((n) => (
                  <a key={n.href} href={n.href} onClick={closeMenu}>
                    {n.label}
                  </a>
                ))}
                <a href="#kontakt" onClick={closeMenu}>
                  {ui.nav.contact}
                </a>
              </nav>
              <div className="vh-menu-foot">
                {instagram ? (
                  <a
                    className="vh-ig vh-menu-ig"
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    aria-label={`${ui.contact.instagram}: ${instagram.handle}`}
                  >
                    <InstagramIcon />
                    <span className="vh-ig-copy">
                      <span className="vh-ig-label">{ui.contact.instagram}</span>
                      <span className="vh-ig-handle">{instagram.handle}</span>
                    </span>
                  </a>
                ) : null}
                <div className="vh-menu-langs" role="group" aria-label="Language">
                  {LOCALES.map((id) => (
                    <button
                      key={id}
                      type="button"
                      className={id === locale ? "is-on" : ""}
                      aria-pressed={id === locale}
                      onClick={() => setLocale(id)}
                    >
                      <Flag locale={id} />
                      <span>{LOCALE_LABELS[id]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          portalTarget
        )
      : null;

  return (
    <header className={classes}>
      <div className="vh-nav-inner">
        <a href="#top" className="vh-brand" onClick={closeMenu}>
          {tx(brand.name, locale)}
        </a>

        <nav className="vh-nav-links" aria-label={ui.a11y.mainNav}>
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="vh-nav-end">
          <LangSwitch locale={locale} setLocale={setLocale} />
          <button
            type="button"
            className="vh-btn vh-btn--bronze vh-nav-cta"
            onClick={() => openBooking()}
          >
            {bookLabel}
          </button>
          <button
            type="button"
            className="vh-icon-btn vh-nav-burger"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? ui.a11y.menuClose : ui.a11y.menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {drawer}
    </header>
  );
}
