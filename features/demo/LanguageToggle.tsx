"use client";

import { LOCALE_LABELS, LOCALES, type Locale } from "@/types/locale";
import { useDemo } from "./DemoProvider";

export function LanguageToggle() {
  const { locale, setLocale, ui } = useDemo();

  return (
    <div className="seg-control seg-control--sm" role="group" aria-label={ui.demo.languageGroup}>
      {LOCALES.map((id) => {
        const active = locale === id;
        return (
          <button
            key={id}
            type="button"
            className={`seg-btn${active ? " is-active" : ""}`}
            aria-pressed={active}
            onClick={() => setLocale(id)}
          >
            <span>{LOCALE_LABELS[id as Locale]}</span>
          </button>
        );
      })}
    </div>
  );
}
