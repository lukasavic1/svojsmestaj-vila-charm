"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/types/locale";

function LangSwitch({
  locale,
  setLocale,
  className = "",
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
  className?: string;
}) {
  return (
    <div
      className={`vh-lang${className ? ` ${className}` : ""}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((id) => (
        <button
          key={id}
          type="button"
          className={locale === id ? "is-on" : ""}
          aria-pressed={locale === id}
          onClick={() => setLocale(id)}
        >
          {LOCALE_LABELS[id]}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { locale, ui, setLocale } = useDemo();
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

  const contactLabel = t3(
    locale,
    "Kontakt",
    "Contact",
    "Контакты"
  );

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
                <a
                  className="vh-btn vh-btn--bronze vh-menu-cta"
                  href="#kontakt"
                  onClick={closeMenu}
                >
                  {contactLabel}
                </a>
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
          <LangSwitch locale={locale} setLocale={setLocale} className="vh-lang--nav" />
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
