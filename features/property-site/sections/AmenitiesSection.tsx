"use client";

import { useState } from "react";
import { AmenityIcon } from "@/components/ui/AmenityIcon";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx } from "@/lib/i18n";

const PREVIEW = 6;

export function AmenitiesSection() {
  const { unit, locale } = useDemo();
  const [expanded, setExpanded] = useState(false);
  const items = unit.amenities.items;
  const visible = expanded ? items : items.slice(0, PREVIEW);

  return (
    <section className="vh-amenities" id="sadrzaji" aria-labelledby="amen-title">
      <div className="vh-wrap">
        <Reveal className="vh-section-head vh-section-head--tight">
          <h2 id="amen-title" className="vh-title">
            {tx(unit.amenities.heading, locale)}
          </h2>
          <p className="vh-support">{tx(unit.amenities.lead, locale)}</p>
        </Reveal>

        <ul className="vh-amen-cards">
          {visible.map((item, i) => (
            <Reveal
              key={tx(item.label, locale)}
              as="li"
              className="vh-amen-card"
              delay={Math.min(i, 8) * 25}
            >
              <span className="vh-amen-icon" aria-hidden="true">
                <AmenityIcon id={item.icon} />
              </span>
              <span className="vh-amen-label">{tx(item.label, locale)}</span>
            </Reveal>
          ))}
        </ul>

        {items.length > PREVIEW && (
          <button
            type="button"
            className="vh-link vh-link--tap"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded
              ? locale === "sr"
                ? "Prikaži manje"
                : "Show less"
              : locale === "sr"
                ? "Pogledaj sve"
                : "View all"}
          </button>
        )}
      </div>
    </section>
  );
}
