"use client";

import Image from "next/image";
import { MetricIcon, type MetricIconId } from "@/components/ui/MetricIcon";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3, tx, txList } from "@/lib/i18n";

/** Stay overview — desktop split; mobile feature card + capacity metrics. */
export function IntroSection() {
  const { unit, locale, bookHref, ui } = useDemo();
  const living =
    unit.photos.find((p) => p.src.includes("living")) ?? unit.photos[0];
  const kitchen =
    unit.photos.find((p) => p.src.includes("kitchen")) ?? unit.photos[1] ?? living;
  const bedroom =
    unit.photos.find((p) => p.src.includes("bedroom")) ?? unit.photos[2] ?? living;
  const paragraphs = txList(unit.intro.body, locale).slice(0, 2);

  const overnightLabel = t3(locale, "Noćenje", "Overnight", "Ночлег");
  const dayGuestsLabel = t3(locale, "Dnevni boravak", "Day guests", "Гости днём");
  const bathroomsLabel = t3(locale, "Kupatila", "Bathrooms", "Санузлы");
  const stayLabel = t3(locale, "Prostor", "The stay", "Проживание");

  const metrics: { k: string; v: string; icon: MetricIconId }[] = [
    { k: String(unit.specs.capacity), v: overnightLabel, icon: "bed" },
    {
      k: String(unit.specs.dayCapacity ?? "—"),
      v: dayGuestsLabel,
      icon: "users",
    },
    { k: String(unit.specs.bathrooms), v: bathroomsLabel, icon: "bath" },
    {
      k: t3(locale, "8×4 m", "8×4 m", "8×4 м"),
      v: t3(locale, "Grejani bazen", "Heated pool", "Бассейн с подогревом"),
      icon: "pool",
    },
  ];

  const slides = [
    {
      src: living.src,
      alt: tx(living.alt, locale),
      badge: t3(locale, "Glavna kuća", "Main house", "Главный дом"),
    },
    {
      src: kitchen.src,
      alt: tx(kitchen.alt, locale),
      badge: t3(locale, "Kuhinja", "Kitchen", "Кухня"),
    },
    {
      src: bedroom.src,
      alt: tx(bedroom.alt, locale),
      badge: t3(locale, "Sobe", "Rooms", "Спальни"),
    },
  ];

  return (
    <section
      className="vh-space"
      id="o-smestaju"
      aria-label={stayLabel}
    >
      {/* ——— Mobile ——— */}
      <div className="vh-m-overview vh-m-overview--space">
        <div
          className="vh-m-rail"
          aria-label={t3(locale, "Enterijer", "Interior", "Интерьер")}
        >
          {slides.map((s) => (
            <figure key={s.src + s.badge} className="vh-m-slide">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                quality={IMAGE_QUALITY.gallery}
                sizes="88vw"
                className="vh-photo"
              />
              <span className="vh-m-badge">{s.badge}</span>
            </figure>
          ))}
        </div>

        <Reveal className="vh-m-card">
          <p className="vh-pill">{stayLabel}</p>
          <h2 className="vh-m-title">
            {tx(unit.intro.heading, locale)}
          </h2>
          <p className="vh-m-lead">{tx(unit.intro.lead, locale)}</p>

          <ul
            className="vh-metrics vh-metrics--2x2"
            aria-label={t3(locale, "Kapacitet", "Capacity", "Вместимость")}
          >
            {metrics.map((m) => (
              <li key={m.v} className="vh-metric">
                <span className="vh-metric-icon" aria-hidden="true">
                  <MetricIcon id={m.icon} />
                </span>
                <strong>{m.k}</strong>
                <span>{m.v}</span>
              </li>
            ))}
          </ul>

          <a className="vh-btn vh-btn--bronze vh-m-cta" href="#termini">
            {ui.booking.checkAvailability}
          </a>
          <a className="vh-m-link" href={bookHref}>
            {t3(
              locale,
              "Ceo raspored",
              "Full schedule",
              "Весь календарь"
            )}
          </a>
        </Reveal>
      </div>

      {/* ——— Desktop ——— */}
      <div className="vh-wrap vh-space-grid vh-desktop-split">
        <Reveal className="vh-space-media">
          <div className="vh-space-frame">
            <Image
              src={living.src}
              alt={tx(living.alt, locale)}
              fill
              quality={IMAGE_QUALITY.gallery}
              sizes="(max-width: 900px) 100vw, 46vw"
              className="vh-photo"
            />
          </div>
        </Reveal>

        <Reveal className="vh-space-copy" delay={40}>
          <p className="vh-label">{stayLabel}</p>
          <h2 id="space-title" className="vh-title">
            {tx(unit.intro.heading, locale)}
          </h2>
          <p className="vh-support">{tx(unit.intro.lead, locale)}</p>
          <div className="vh-prose">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="vh-facts">
            <div>
              <dt>{overnightLabel}</dt>
              <dd>{unit.specs.capacity}</dd>
            </div>
            <div>
              <dt>{dayGuestsLabel}</dt>
              <dd>{unit.specs.dayCapacity ?? "—"}</dd>
            </div>
            <div>
              <dt>{bathroomsLabel}</dt>
              <dd>{unit.specs.bathrooms}</dd>
            </div>
            <div>
              <dt>{t3(locale, "Bazen", "Pool", "Бассейн")}</dt>
              <dd>{t3(locale, "8×4 m", "8×4 m", "8×4 м")}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
