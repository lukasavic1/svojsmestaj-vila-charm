"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";

const s = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: 20,
  height: 20,
  "aria-hidden": true as const,
};

export const RULE_ICONS: Record<string, ReactNode> = {
  "Check-in": (
    <svg {...s}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5M15 12H3" />
    </svg>
  ),
  "Check-out": (
    <svg {...s}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  Children: (
    <svg {...s}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Music: (
    <svg {...s}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  Fireworks: (
    <svg {...s}>
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  ),
  Gatherings: (
    <svg {...s}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Pets: (
    <svg {...s}>
      <circle cx="11" cy="5.5" r="1.5" />
      <circle cx="16.5" cy="7.5" r="1.4" />
      <circle cx="6.5" cy="8" r="1.4" />
      <circle cx="18" cy="12" r="1.3" />
      <path d="M8.5 18c1.2-2.5 2.4-3.5 3.5-3.5s2.3 1 3.5 3.5" />
    </svg>
  ),
  Parking: (
    <svg {...s}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
};

export function RulesSection() {
  const { locale } = useDemo();
  const { rules } = property;

  return (
    <section className="vh-rules" id="pravila" aria-labelledby="pravila-naslov">
      <div className="vh-wrap">
        <Reveal className="vh-rules-head">
          <p className="vh-label">
            {t3(locale, "Pre dolaska", "Before you arrive", "Перед приездом")}
          </p>
          <h2 id="pravila-naslov" className="vh-title">
            {t3(locale, "Kućni red", "House rules", "Правила дома")}
          </h2>
          <p className="vh-support vh-rules-lead">
            {t3(
              locale,
              "Kratke smernice za prijatan boravak — prijava, muzika, ljubimci i ostalo.",
              "Short guidelines for a pleasant stay — check-in, music, pets, and more.",
              "Короткие правила для приятного отдыха — заезд, музыка, питомцы и другое."
            )}
          </p>
        </Reveal>

        <Reveal delay={40}>
          <ul className="vh-rules-cards">
            {rules.items.map((item) => {
              const label = tx(item.label, locale);
              return (
                <li key={item.label.en} className="vh-rules-card">
                  <span className="vh-rules-icon" aria-hidden="true">
                    {RULE_ICONS[item.label.en] ?? null}
                  </span>
                  <div>
                    <p className="vh-rules-label">{label}</p>
                    <p className="vh-rules-value">{tx(item.value, locale)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
