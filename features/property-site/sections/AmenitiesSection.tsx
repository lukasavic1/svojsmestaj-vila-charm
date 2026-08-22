"use client";

import { useState } from "react";
import { AmenityIcon } from "@/components/ui/AmenityIcon";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";

const MOBILE_PREVIEW = 6;

export function AmenitiesSection() {
  const { unit, locale } = useDemo();
  const items = unit.amenities.items;
  const [open, setOpen] = useState(false);
  const canToggle = items.length > MOBILE_PREVIEW;

  return (
    <section className="vh-amenities" id="sadrzaji" aria-labelledby="amen-title">
      <div className="vh-wrap">
        <Reveal className="vh-amenities-head">
          <h2 id="amen-title" className="vh-amenities-title">
            {tx(unit.amenities.heading, locale)}
          </h2>
          <p className="vh-amenities-lead">{tx(unit.amenities.lead, locale)}</p>
        </Reveal>

        <ul className={`vh-amen-grid${open ? " is-open" : ""}`}>
          {items.map((item, i) => (
            <li
              key={tx(item.label, locale)}
              className={`vh-amen-item${i >= MOBILE_PREVIEW ? " vh-amen-item--more" : ""}`}
            >
              <span className="vh-amen-icon" aria-hidden="true">
                <AmenityIcon id={item.icon} />
              </span>
              <span className="vh-amen-label">{tx(item.label, locale)}</span>
            </li>
          ))}
        </ul>

        {canToggle ? (
          <button
            type="button"
            className="vh-link vh-link--tap vh-amen-more"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open
              ? t3(locale, "Prikaži manje", "Show less", "Показать меньше")
              : t3(locale, "Pogledaj sve", "View all", "Показать все")}
          </button>
        ) : null}
      </div>
    </section>
  );
}
