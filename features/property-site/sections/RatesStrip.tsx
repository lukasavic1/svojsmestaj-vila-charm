"use client";

import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";

type RatesStripProps = {
  /**
   * "section" — full panel (heading, perks, CTA that opens the
   * booking sheet). "bubble" — the same rates, compact, inside the booking sheet.
   */
  variant?: "section" | "bubble";
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
    price: "300",
    peak: false,
  },
  {
    days: ["Pet – Ned", "Fri – Sun", "Пт – Вс"],
    label: ["Vikend", "Weekend", "Выходные"],
    price: "500",
    peak: true,
  },
] as const;

/** Slim two-fare strip — weekday + weekend in one row. */
export function RateCard() {
  const { locale } = useDemo();

  return (
    <div className="vh-fare" role="group">
      {FARES.map((fare) => (
        <div
          key={fare.price}
          className={`vh-fare-cell${fare.peak ? " vh-fare-cell--peak" : ""}`}
        >
          <span className="vh-fare-label">
            {t3(locale, fare.label[0], fare.label[1], fare.label[2])}
            <em>{t3(locale, fare.days[0], fare.days[1], fare.days[2])}</em>
          </span>
          <span className="vh-fare-sum">
            <strong>{fare.price}</strong>
            <span>€</span>
            <small>{t3(locale, "/ noć", "/ night", "/ ночь")}</small>
          </span>
        </div>
      ))}
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

      <RateCard />

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
