"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";

/** Catchy rate story — equal cards, strong type, clear CTA only below. */
export function PricingSection() {
  const { locale, bookUnit, unit, ui } = useDemo();

  const perNight = t3(locale, "€ / noć", "€ / night", "€ / ночь");

  const rates = [
    {
      tone: "teal",
      tag: "01",
      title: t3(locale, "Radni dani", "Weekdays", "Будни"),
      when: t3(locale, "Pon – Čet", "Mon – Thu", "Пн – Чт"),
      price: "300",
      unit: perNight,
      note: t3(
        locale,
        "Mirniji ritam nedelje",
        "A quieter midweek pace",
        "Спокойный ритм середины недели"
      ),
    },
    {
      tone: "coral",
      tag: "02",
      title: t3(locale, "Vikend", "Weekend", "Выходные"),
      when: t3(locale, "Pet – Ned", "Fri – Sun", "Пт – Вс"),
      price: "500",
      unit: perNight,
      note: t3(
        locale,
        "Bazen, bašta, okupljanja",
        "Pool, garden, gatherings",
        "Бассейн, сад, встречи"
      ),
    },
  ];

  const perks = [
    { k: "−15%", v: t3(locale, "7+ noći", "7+ nights", "7+ ночей") },
    { k: "−25%", v: t3(locale, "30+ noći", "30+ nights", "30+ ночей") },
    {
      k: "0%",
      v: t3(
        locale,
        "posrednička provizija",
        "middleman fee",
        "комиссия посредника"
      ),
    },
  ];

  return (
    <section className="vh-pricing" id="cene" aria-labelledby="pricing-title">
      <div className="vh-wrap">
        <Reveal className="vh-pricing-head">
          <p className="vh-label">{t3(locale, "Cene", "Rates", "Цены")}</p>
          <div className="vh-pricing-head-row">
            <h2 id="pricing-title" className="vh-title">
              {t3(
                locale,
                "Cena prati ritam nedelje.",
                "The rate follows the week.",
                "Цена следует ритму недели."
              )}
            </h2>
            <p className="vh-support">
              {t3(
                locale,
                "Dve jasne cene — plus popusti ako ostanete duže.",
                "Two clear rates — plus discounts when you stay longer.",
                "Два понятных тарифа — плюс скидки при длительном проживании."
              )}
            </p>
          </div>
        </Reveal>

        <div className="vh-pricing-grid" role="list">
          {rates.map((r, i) => (
            <Reveal
              key={r.title}
              className={`vh-rate vh-rate--${r.tone}`}
              delay={i * 40}
            >
              <div className="vh-rate-top">
                <span className="vh-rate-num">{r.tag}</span>
                <span className="vh-rate-when">{r.when}</span>
              </div>
              <h3 className="vh-rate-title">{r.title}</h3>
              <p className="vh-rate-price">
                <span>{r.price}</span>
                <em>{r.unit}</em>
              </p>
              <p className="vh-rate-note">{r.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="vh-pricing-perks" delay={70}>
          <ul>
            {perks.map((p) => (
              <li key={p.k + p.v}>
                <strong>{p.k}</strong>
                <span>{p.v}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="vh-btn vh-btn--bronze"
            onClick={() => bookUnit(unit.id)}
          >
            {ui.booking.checkAvailability}
          </button>
        </Reveal>

        <p className="vh-pricing-fine">
          {t3(
            locale,
            "Konačna cena zavisi od datuma, broja gostiju i trajanja — potvrdićemo je pre rezervacije.",
            "Final price depends on dates, guests, and length of stay — we’ll confirm before booking.",
            "Итоговая цена зависит от даты, числа гостей и длительности — мы подтвердим её до бронирования."
          )}
        </p>
      </div>
    </section>
  );
}
