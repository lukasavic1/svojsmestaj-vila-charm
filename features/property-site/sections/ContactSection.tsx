"use client";

import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx } from "@/lib/i18n";

export function ContactSection() {
  const { locale, ui, bookUnit, unit } = useDemo();
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
              {locale === "sr"
                ? "Spremni za rezervaciju?"
                : "Ready to reserve?"}
            </h2>
            <p className="vh-contact-lead">
              {tx(c.lead, locale)}
            </p>
            <button
              type="button"
              className="vh-btn vh-btn--bronze"
              onClick={() => bookUnit(unit.id)}
            >
              {ui.booking.checkAvailability}
            </button>
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
              <span>{locale === "sr" ? "Lokacija" : "Location"}</span>
              <strong>
                {locale === "sr" ? "Barajevo, Srbija" : "Barajevo, Serbia"}
              </strong>
            </li>
          </ul>
        </div>
        <p className="vh-contact-note">{tx(c.footnote, locale)}</p>
      </div>
    </section>
  );
}
