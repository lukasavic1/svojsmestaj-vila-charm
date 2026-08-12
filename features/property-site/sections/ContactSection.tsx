"use client";

import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";

export function ContactSection() {
  const { locale, ui } = useDemo();
  const c = property.contact;

  return (
    <section className="vh-contact" id="kontakt" aria-labelledby="kontakt-naslov">
      <div className="vh-wrap">
        <div className="vh-contact-panel">
          <div className="vh-contact-copy">
            <p className="vh-label vh-label--on-dark">
              {ui.nav.contact}
            </p>
            <h2 id="kontakt-naslov" className="vh-contact-title">
              {t3(
                locale,
                "Tu smo za sva pitanja.",
                "We’re here for every question.",
                "Мы на связи по любым вопросам."
              )}
            </h2>
            <p className="vh-contact-lead">
              {tx(c.lead, locale)}
            </p>
          </div>

          <ul className="vh-contact-cards">
            <li>
              <span>{ui.contact.phone}</span>
              <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
            </li>
            <li>
              <span>{ui.contact.email}</span>
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </li>
            <li>
              <span>{t3(locale, "Lokacija", "Location", "Локация")}</span>
              <strong>
                {t3(
                  locale,
                  "Barajevo, Srbija",
                  "Barajevo, Serbia",
                  "Бараево, Сербия"
                )}
              </strong>
            </li>
          </ul>
        </div>
        <p className="vh-contact-note">{tx(c.footnote, locale)}</p>
      </div>
    </section>
  );
}
