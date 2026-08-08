"use client";

import type { Locale } from "@/types/locale";
import { useDemo } from "./DemoProvider";

const OPTIONS: { id: Locale; label: string }[] = [
  { id: "sr", label: "SR" },
  { id: "en", label: "EN" },
];

export function LanguageToggle() {
  const { locale, setLocale, ui } = useDemo();

  return (
    <div className="seg-control seg-control--sm" role="group" aria-label={ui.demo.languageGroup}>
      {OPTIONS.map((opt) => {
        const active = locale === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            className={`seg-btn${active ? " is-active" : ""}`}
            aria-pressed={active}
            onClick={() => setLocale(opt.id)}
          >
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
