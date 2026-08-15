"use client";

import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";

export function ContactSection() {
  const { locale, ui, openBooking } = useDemo();
  const c = property.contact;

  return (
    <section className="vh-contact vh-contact--chapter" id="kontakt" aria-labelledby="kontakt-naslov">
      <div className="vh-wrap">
        <div className="vh-contact-panel vh-contact-panel--chapter">
          <div className="vh-contact-copy">
            <p className="vh-pill vh-label--on-dark">
              {t3(
                locale,
                "Napišite vaše poglavlje",
                "Write your chapter",
                "Напишите свою главу"
              )}
            </p>
            <h2 id="kontakt-naslov" className="vh-contact-title">
              {t3(
                locale,
                "Sledeći trenutak počinje ovde.",
                "The next moment begins here.",
                "Следующий момент начинается здесь."
              )}
            </h2>
            <p className="vh-contact-lead">
              {t3(
                locale,
                "Proverite termine i recite nam kako zamišljate boravak — mi ćemo potvrditi dostupnost i detalje.",
                "Check dates and tell us how you imagine the stay — we’ll confirm availability and details.",
                "Проверьте даты и расскажите, каким видите отдых — мы подтвердим доступность и детали."
              )}
            </p>
            <button
              type="button"
              className="vh-btn vh-btn--bronze vh-contact-cta"
              onClick={() => openBooking()}
            >
              {t3(locale, "Proveri termine", "Check dates", "Смотреть даты")}
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
