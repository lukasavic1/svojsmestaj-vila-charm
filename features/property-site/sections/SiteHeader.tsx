"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx } from "@/lib/i18n";

export function SiteHeader() {
  const { locale, ui, bookHref, setLocale } = useDemo();
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
    { href: "#statement", label: locale === "sr" ? "Imanje" : "Estate" },
    { href: "#iskustva", label: locale === "sr" ? "Iskustva" : "Moments" },
    { href: "#video", label: locale === "sr" ? "Video" : "Film" },
    { href: "#galerija", label: ui.nav.gallery },
    { href: "#lokacija", label: locale === "sr" ? "Lokacija" : "Location" },
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
                <a href="#cene" onClick={closeMenu}>
                  {locale === "sr" ? "Cene" : "Rates"}
                </a>
                <a href="#termini" onClick={closeMenu}>
                  {ui.nav.book}
                </a>
              </nav>
              <div className="vh-menu-foot">
                <div className="vh-lang" role="group" aria-label="Language">
                  <button
                    type="button"
                    className={locale === "sr" ? "is-on" : ""}
                    onClick={() => setLocale("sr")}
                  >
                    SR
                  </button>
                  <button
                    type="button"
                    className={locale === "en" ? "is-on" : ""}
                    onClick={() => setLocale("en")}
                  >
                    EN
                  </button>
                </div>
                <a
                  className="vh-btn vh-btn--bronze vh-menu-cta"
                  href={bookHref}
                  onClick={closeMenu}
                >
                  {locale === "sr" ? "Proveri dostupnost" : "Check availability"}
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
          <div className="vh-lang vh-lang--nav" role="group" aria-label="Language">
            <button
              type="button"
              className={locale === "sr" ? "is-on" : ""}
              onClick={() => setLocale("sr")}
            >
              SR
            </button>
            <button
              type="button"
              className={locale === "en" ? "is-on" : ""}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
          </div>
          <a className="vh-nav-cta vh-btn vh-btn--bronze vh-btn--nav" href={bookHref}>
            {locale === "sr" ? "Proveri dostupnost" : "Check availability"}
          </a>
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
