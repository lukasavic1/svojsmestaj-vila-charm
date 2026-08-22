"use client";

import { useState } from "react";
import { AmenityIcon } from "@/components/ui/AmenityIcon";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";
import { RULE_ICONS } from "./RulesSection";

const MOBILE_PREVIEW = 6;

export function AmenitiesSection() {
  const { unit, locale } = useDemo();
  const items = unit.amenities.items;
  const [open, setOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const canToggle = items.length > MOBILE_PREVIEW;
  const rulesTitle = t3(locale, "Kućni red", "House rules", "Правила дома");

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

        <div className="vh-amen-actions">
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
          <button
            type="button"
            className="vh-link vh-link--tap vh-amen-rules"
            onClick={() => setRulesOpen(true)}
          >
            {rulesTitle}
          </button>
        </div>
      </div>

      <Modal
        open={rulesOpen}
        title={rulesTitle}
        onClose={() => setRulesOpen(false)}
        closeLabel={t3(locale, "Zatvori", "Close", "Закрыть")}
        panelClassName="modal-panel--rules"
        titleHidden
      >
        <div className="vh-house">
          <header className="vh-house-head">
            <h2 className="vh-house-title">{rulesTitle}</h2>
            <p className="vh-house-lead">{tx(property.rules.lead, locale)}</p>
          </header>

          <div className="vh-house-times">
            {property.rules.items.slice(0, 2).map((rule) => (
              <div key={rule.label.en} className="vh-house-time">
                <span>{tx(rule.label, locale)}</span>
                <strong>{tx(rule.value, locale)}</strong>
              </div>
            ))}
          </div>

          <ul className="vh-house-list">
            {property.rules.items.slice(2).map((rule) => (
              <li key={rule.label.en} className="vh-house-item">
                <span className="vh-house-icon" aria-hidden="true">
                  {RULE_ICONS[rule.label.en] ?? null}
                </span>
                <div>
                  <p className="vh-house-label">{tx(rule.label, locale)}</p>
                  <p className="vh-house-value">{tx(rule.value, locale)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </section>
  );
}
