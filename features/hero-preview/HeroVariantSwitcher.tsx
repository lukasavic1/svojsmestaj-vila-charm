"use client";

import { useEffect, useId, useRef, useState } from "react";
import { HERO_VARIANT_META, HERO_VARIANTS } from "./types";
import { useHeroVariant } from "./HeroVariantProvider";

/**
 * Temporary client-preview control. Remove after the final hero look is chosen
 * (set DEFAULT_HERO_VARIANT in features/hero-preview/types.ts).
 */
export function HeroVariantSwitcher() {
  const { variant, setVariant } = useHeroVariant();
  const active = HERO_VARIANT_META[variant];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | PointerEvent) => {
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
    <div
      className={`vh-hero-dd${open ? " is-open" : ""}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="vh-hero-dd-trigger"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="vh-hero-dd-kicker">Hero</span>
        <span className="vh-hero-dd-value">
          {active.short} · {active.label}
        </span>
        <span className="vh-hero-dd-chevron" aria-hidden="true" />
      </button>

      {open ? (
        <div
          id={listId}
          className="vh-hero-dd-panel"
          role="listbox"
          aria-label="Hero style preview"
        >
          <p className="vh-hero-dd-blurb">{active.blurb}</p>
          <div className="vh-hero-dd-list">
            {HERO_VARIANTS.map((id) => {
              const meta = HERO_VARIANT_META[id];
              const on = variant === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="option"
                  aria-selected={on}
                  className={`vh-hero-dd-option${on ? " is-on" : ""}`}
                  title={meta.blurb}
                  onClick={() => {
                    setVariant(id);
                    setOpen(false);
                  }}
                >
                  <span className="vh-hero-dd-num">{meta.short}</span>
                  <span className="vh-hero-dd-meta">
                    <span className="vh-hero-dd-name">{meta.label}</span>
                    <span className="vh-hero-dd-desc">{meta.blurb}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
