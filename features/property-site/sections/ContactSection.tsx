"use client";

import Image from "next/image";
import { InstagramIcon } from "@/components/ui/icons";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";
import { IMAGE_QUALITY } from "@/lib/images";

export function ContactSection() {
  const { locale, ui, openBooking } = useDemo();
  const c = property.contact;

  return (
    <section className="vh-contact vh-contact--chapter" id="kontakt" aria-labelledby="kontakt-naslov">
      <div className="vh-wrap">
        <div className="vh-contact-panel vh-contact-panel--chapter">
          <div className="vh-contact-bg" aria-hidden="true">
            <Image
              src="/images/pool-night-2.jpg"
              alt=""
              fill
              quality={IMAGE_QUALITY.gallery}
              sizes="(max-width: 1140px) 100vw, 1140px"
              className="vh-photo"
            />
          </div>
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
            {c.instagram ? (
              <li className="vh-contact-ig">
                <span>
                  <InstagramIcon />
                  {ui.contact.instagram}
                </span>
                <a
                  href={c.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${ui.contact.instagram}: ${c.instagram.handle}`}
                >
                  {c.instagram.handle}
                </a>
              </li>
            ) : null}
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
