"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";
import { RateCard } from "./RatesStrip";

type PricingBoardProps = {
  embedded?: boolean;
};

/** Reusable luxury rates board for standalone and editorial layouts. */
export function PricingBoard({ embedded = false }: PricingBoardProps) {
  const { locale } = useDemo();

  return (
    <div
      id={embedded ? "cene" : undefined}
      className={`vh-pricing${embedded ? " vh-pricing--embedded" : ""}`}
    >
      <div className="vh-wrap vh-pricing-layout">
        <Reveal className="vh-pricing-intro">
          <p className="vh-pill">{t3(locale, "Cenovnik", "Rates", "Цены")}</p>
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
          <Reveal delay={40}>
            <RateCard />
          </Reveal>

          <ul
            className="vh-pricing-perks"
            aria-label={t3(locale, "Prednosti", "Perks", "Преимущества")}
          >
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
    </div>
  );
}
