"use client";

import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";

type RatesStripProps = {
  /**
   * "section" — full panel inside Chapter 02 (heading, perks, CTA that opens the
   * booking sheet). "bubble" — the same rates, compact, inside the TERMINI sheet
   * (no CTA — the guest is already booking).
   */
  variant?: "section" | "bubble";
};

const RATES = [
  {
    label: ["Radni dani", "Weekdays", "Будни"],
    span: ["Pon – Čet", "Mon – Thu", "Пн – Чт"],
    price: "300",
    tag: ["−15% za 7+ noći", "−15% for 7+ nights", "−15% за 7+ ночей"],
    featured: false,
  },
  {
    label: ["Vikend", "Weekend", "Выходные"],
    span: ["Pet – Ned", "Fri – Sun", "Пт – Вс"],
    price: "500",
    tag: ["−25% za 30+ noći", "−25% for 30+ nights", "−25% за 30+ ночей"],
    featured: true,
  },
] as const;

const PERKS = [
  ["0% provizije", "0% commission", "0% комиссии"],
  ["Direktna rezervacija", "Direct booking", "Прямое бронирование"],
  ["Fleksibilan otkaz", "Flexible cancellation", "Гибкая отмена"],
] as const;

/** Compact, self-contained rates panel — replaces the old full pricing board. */
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

      <div className="vh-rates-cards">
        {RATES.map((r) => (
          <div
            key={r.label[0]}
            className={`vh-rate${r.featured ? " vh-rate--featured" : ""}`}
          >
            {r.featured ? (
              <span className="vh-rate-badge">
                {t3(locale, "Najtraženije", "Most booked", "Популярно")}
              </span>
            ) : null}
            <p className="vh-rate-label">
              {t3(locale, r.label[0], r.label[1], r.label[2])}
            </p>
            <p className="vh-rate-price">
              <strong>{r.price}</strong>
              <span>{t3(locale, "€ / noć", "€ / night", "€ / ночь")}</span>
            </p>
            <p className="vh-rate-sub">
              {t3(locale, r.span[0], r.span[1], r.span[2])}
            </p>
            <p className="vh-rate-tag">
              {t3(locale, r.tag[0], r.tag[1], r.tag[2])}
            </p>
          </div>
        ))}
      </div>

      <div className="vh-rates-foot">
        <p className="vh-rates-note">
          {t3(
            locale,
            "Konačnu cenu potvrđujemo pre rezervacije — zavisi od datuma i trajanja boravka.",
            "We confirm the final rate before booking — it depends on your dates and length of stay.",
            "Итоговую цену подтверждаем до бронирования — зависит от дат и длительности."
          )}
        </p>

        {isSection ? (
          <>
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
          </>
        ) : null}
      </div>
    </div>
  );
}
