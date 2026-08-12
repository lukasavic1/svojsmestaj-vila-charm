"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";

/** Split-layout luxury rates: copy left, two elevated cards right. */
export function PricingSection() {
  const { locale } = useDemo();

  return (
    <section className="vh-pricing" id="cene" aria-labelledby="pricing-title">
      <div className="vh-wrap vh-pricing-layout">
        <Reveal className="vh-pricing-intro">
          <p className="vh-pill">
            {t3(locale, "Cenovnik", "Rates", "Цены")}
          </p>
          <h2 id="pricing-title" className="vh-pricing-title">
            {t3(
              locale,
              "Dve cene. Bez iznenađenja.",
              "Two rates. No surprises.",
              "Два тарифа. Без сюрпризов."
            )}
          </h2>
          <p className="vh-pricing-note">
            {t3(
              locale,
              "Konačnu cenu potvrđujemo pre rezervacije — zavisi od datuma i trajanja.",
              "We confirm the final rate before booking — it depends on dates and length of stay.",
              "Итоговую цену подтверждаем до бронирования — зависит от дат и длительности."
            )}
          </p>
        </Reveal>

        <div className="vh-pricing-main">
          <div className="vh-pricing-cards">
            <Reveal className="vh-price-card" delay={40}>
              <header className="vh-price-card-head">
                <h3>{t3(locale, "Radni dani", "Weekdays", "Будни")}</h3>
                <p>{t3(locale, "Pon – Čet", "Mon – Thu", "Пн – Чт")}</p>
              </header>
              <p className="vh-price-card-sum">
                <strong>300 €</strong>
                <span>{t3(locale, "/ noć", "/ night", "/ ночь")}</span>
              </p>
              <p className="vh-price-card-tag">
                {t3(locale, "−15% za 7+ noći", "−15% for 7+ nights", "−15% за 7+ ночей")}
              </p>
            </Reveal>

            <Reveal className="vh-price-card vh-price-card--featured" delay={70}>
              <span className="vh-price-card-badge">
                {t3(locale, "Najtraženije", "Most booked", "Самый популярный")}
              </span>
              <header className="vh-price-card-head">
                <h3>{t3(locale, "Vikend", "Weekend", "Выходные")}</h3>
                <p>{t3(locale, "Pet – Ned", "Fri – Sun", "Пт – Вс")}</p>
              </header>
              <p className="vh-price-card-sum">
                <strong>500 €</strong>
                <span>{t3(locale, "/ noć", "/ night", "/ ночь")}</span>
              </p>
              <p className="vh-price-card-tag">
                {t3(
                  locale,
                  "−25% za 30+ noći",
                  "−25% for 30+ nights",
                  "−25% за 30+ ночей"
                )}
              </p>
            </Reveal>
          </div>

          <ul className="vh-pricing-perks" aria-label={t3(locale, "Prednosti", "Perks", "Преимущества")}>
            <li>
              <span aria-hidden="true">✓</span>
              {t3(locale, "0% Provizija", "0% Commission", "0% Комиссия")}
            </li>
            <li>
              <span aria-hidden="true">✓</span>
              {t3(
                locale,
                "Direktna rezervacija",
                "Direct booking",
                "Прямое бронирование"
              )}
            </li>
            <li>
              <span aria-hidden="true">✓</span>
              {t3(
                locale,
                "Fleksibilan otkaz",
                "Flexible cancellation",
                "Гибкая отмена"
              )}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
