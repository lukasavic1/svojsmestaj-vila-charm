"use client";

import { motion } from "framer-motion";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";

type RatesStripProps = {
  /**
   * "section" — full panel (heading, perks, CTA that opens the
   * booking sheet). "bubble" — editorial fare cards inside the booking sheet.
   */
  variant?: "section" | "bubble";
};

type RateCardProps = {
  layout?: "strip" | "editorial";
};

const PERKS = [
  ["0% provizije", "0% commission", "0% комиссии"],
  ["Direktna rezervacija", "Direct booking", "Прямое бронирование"],
  ["Fleksibilan otkaz", "Flexible cancellation", "Гибкая отмена"],
] as const;

const FARES = [
  {
    days: ["Pon – Čet", "Mon – Thu", "Пн – Чт"],
    label: ["Radni dani", "Weekdays", "Будни"],
    peak: false,
  },
  {
    days: ["Pet – Ned", "Fri – Sun", "Пт – Вс"],
    label: ["Vikend", "Weekend", "Выходные"],
    peak: true,
  },
] as const;

/** Slim two-fare strip — weekday + weekend in one row. */
export function RateCard({ layout = "strip" }: RateCardProps) {
  const { locale, ui } = useDemo();
  const fare = property.units[0].price;

  if (layout === "editorial") {
    return (
      <div className="vh-fare-board">
        <div className="vh-fare-cards" role="group">
          {FARES.map((item, i) => {
            const price = item.peak ? fare.weekendEur : fare.perNightEur;
            return (
              <motion.article
                key={item.label[0]}
                className={`vh-fare-card${item.peak ? " vh-fare-card--peak" : " vh-fare-card--weekday"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="vh-fare-card-ghost" aria-hidden="true">
                  {price}
                </span>
                <p className="vh-fare-card-sum">
                  <strong>{price}</strong>
                  <span>€</span>
                  <small>{t3(locale, "/ noć", "/ night", "/ ночь")}</small>
                </p>
                <p className="vh-fare-card-top">
                  <span className="vh-fare-card-title">
                    {t3(locale, item.label[0], item.label[1], item.label[2])}
                  </span>
                  <span className="vh-fare-card-days">
                    {t3(locale, item.days[0], item.days[1], item.days[2])}
                  </span>
                </p>
              </motion.article>
            );
          })}
        </div>
        <p className="vh-fare-deposit">
          <span className="vh-fare-deposit-label">{ui.booking.depositLabel}</span>
          <i className="vh-fare-deposit-dot" aria-hidden="true" />
          <strong className="vh-fare-deposit-sum">{fare.depositEur} €</strong>
          <i className="vh-fare-deposit-dot" aria-hidden="true" />
          <span className="vh-fare-deposit-copy">{ui.booking.depositNote}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="vh-fare" role="group">
      {FARES.map((item) => {
        const price = item.peak ? fare.weekendEur : fare.perNightEur;
        return (
          <div
            key={item.label[0]}
            className={`vh-fare-cell${item.peak ? " vh-fare-cell--peak" : ""}`}
          >
            <span className="vh-fare-label">
              {t3(locale, item.label[0], item.label[1], item.label[2])}
              <em>{t3(locale, item.days[0], item.days[1], item.days[2])}</em>
            </span>
            <span className="vh-fare-sum">
              <strong>{price}</strong>
              <span>€</span>
              <small>{t3(locale, "/ noć", "/ night", "/ ночь")}</small>
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Compact, self-contained rates panel. */
export function RatesStrip({ variant = "section" }: RatesStripProps) {
  const { locale, openBooking } = useDemo();
  const isSection = variant === "section";

  return (
    <div
      id={isSection ? "cene" : undefined}
      className={`vh-rates vh-rates--${variant}`}
    >
      {isSection ? (
        <header className="vh-rates-head">
          <p className="vh-pill vh-label--warm">
            {t3(locale, "Cenovnik", "Rates", "Цены")}
          </p>
          <h3 className="vh-rates-title">
            {t3(
              locale,
              "Dve cene. Bez iznenađenja.",
              "Two rates. No surprises.",
              "Два тарифа. Без сюрпризов."
            )}
          </h3>
        </header>
      ) : null}

      <RateCard layout={isSection ? "strip" : "editorial"} />

      {isSection ? (
        <div className="vh-rates-foot">
          <p className="vh-rates-note">
            {t3(
              locale,
              "Konačnu cenu potvrđujemo pre rezervacije — zavisi od datuma i trajanja boravka.",
              "We confirm the final rate before booking — it depends on your dates and length of stay.",
              "Итоговую цену подтверждаем до бронирования — зависит от дат и длительности."
            )}
          </p>
          <ul className="vh-rates-perks">
            {PERKS.map((p) => (
              <li key={p[0]}>
                <span aria-hidden="true">✓</span>
                {t3(locale, p[0], p[1], p[2])}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="vh-btn vh-btn--bronze vh-rates-cta"
            onClick={() => openBooking()}
          >
            {t3(locale, "Proveri termine", "Check dates", "Смотреть даты")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
