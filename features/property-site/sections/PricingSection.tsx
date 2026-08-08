"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";

/** Catchy rate story — equal cards, strong type, clear CTA only below. */
export function PricingSection() {
  const { locale, bookUnit, unit } = useDemo();

  const rates =
    locale === "sr"
      ? [
          {
            tone: "teal",
            tag: "01",
            title: "Radni dani",
            when: "Pon – Čet",
            price: "300",
            unit: "€ / noć",
            note: "Mirniji ritam nedelje",
          },
          {
            tone: "coral",
            tag: "02",
            title: "Vikend",
            when: "Pet – Ned",
            price: "500",
            unit: "€ / noć",
            note: "Bazen, bašta, okupljanja",
          },
        ]
      : [
          {
            tone: "teal",
            tag: "01",
            title: "Weekdays",
            when: "Mon – Thu",
            price: "300",
            unit: "€ / night",
            note: "A quieter midweek pace",
          },
          {
            tone: "coral",
            tag: "02",
            title: "Weekend",
            when: "Fri – Sun",
            price: "500",
            unit: "€ / night",
            note: "Pool, garden, gatherings",
          },
        ];

  const perks =
    locale === "sr"
      ? [
          { k: "−15%", v: "7+ noći" },
          { k: "−25%", v: "30+ noći" },
          { k: "0%", v: "posrednička provizija" },
        ]
      : [
          { k: "−15%", v: "7+ nights" },
          { k: "−25%", v: "30+ nights" },
          { k: "0%", v: "middleman fee" },
        ];

  return (
    <section className="vh-pricing" id="cene" aria-labelledby="pricing-title">
      <div className="vh-wrap">
        <Reveal className="vh-pricing-head">
          <p className="vh-label">
            {locale === "sr" ? "Cene" : "Rates"}
          </p>
          <div className="vh-pricing-head-row">
            <h2 id="pricing-title" className="vh-title">
              {locale === "sr"
                ? "Cena prati ritam nedelje."
                : "The rate follows the week."}
            </h2>
            <p className="vh-support">
              {locale === "sr"
                ? "Dve jasne cene — plus popusti ako ostanete duže."
                : "Two clear rates — plus discounts when you stay longer."}
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
            {locale === "sr" ? "Proveri dostupnost →" : "Check availability →"}
          </button>
        </Reveal>

        <p className="vh-pricing-fine">
          {locale === "sr"
            ? "Konačna cena zavisi od datuma, broja gostiju i trajanja — potvrdićemo je pre rezervacije."
            : "Final price depends on dates, guests, and length of stay — we’ll confirm before booking."}
        </p>
      </div>
    </section>
  );
}
