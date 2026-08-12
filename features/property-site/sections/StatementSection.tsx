"use client";

import Image from "next/image";
import { MetricIcon, type MetricIconId } from "@/components/ui/MetricIcon";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3, tx } from "@/lib/i18n";

/**
 * Single estate overview.
 * Mobile: text + metrics card (no image rail).
 * Desktop: catchy dual media + copy.
 */
export function StatementSection() {
  const { unit, locale, bookHref, ui } = useDemo();

  const metrics: { k: string; v: string; icon: MetricIconId }[] = [
    {
      k: t3(locale, "2.000 m²", "2,000 m²", "2 000 м²"),
      v: t3(locale, "Imanje", "Estate", "Усадьба"),
      icon: "area",
    },
    {
      k: t3(locale, "~25 min", "~25 min", "~25 мин"),
      v: t3(locale, "Do Beograda", "To Belgrade", "До Белграда"),
      icon: "pin",
    },
    {
      k: t3(locale, "8×4 m", "8×4 m", "8×4 м"),
      v: t3(locale, "Grejani bazen", "Heated pool", "Бассейн с подогревом"),
      icon: "pool",
    },
    {
      k: String(unit.specs.capacity),
      v: t3(locale, "Noćenje", "Overnight", "Ночлег"),
      icon: "bed",
    },
    {
      k: String(unit.specs.dayCapacity ?? "—"),
      v: t3(locale, "Dnevni gosti", "Day guests", "Гости днём"),
      icon: "users",
    },
    {
      k: String(unit.specs.bathrooms),
      v: t3(locale, "Kupatila", "Bathrooms", "Санузлы"),
      icon: "bath",
    },
  ];

  const headline = t3(
    locale,
    "Mir, privatnost i prostor za okupljanja.",
    "Quiet, privacy, and room to gather.",
    "Тишина, приватность и простор для встреч."
  );

  const lead = `${tx(unit.intro.lead, locale)} ${t3(
    locale,
    "Na 2.000 m², oko 25 minuta od Beograda.",
    "On 2,000 m², about 25 minutes from Belgrade.",
    "На 2 000 м², примерно 25 минут от Белграда."
  )}`;

  const mainImg = {
    src: "/images/exterior-1.jpg",
    alt: t3(
      locale,
      "Villa Charm među zelenilom",
      "Villa Charm among greenery",
      "Villa Charm в окружении зелени"
    ),
  };

  const estateLabel = t3(locale, "Imanje", "The estate", "Усадьба");
  const keyFactsLabel = t3(locale, "Ključni podaci", "Key facts", "Ключевые факты");

  return (
    <section
      className="vh-statement"
      id="statement"
      aria-label={t3(
        locale,
        "Imanje i prostor",
        "Estate and stay",
        "Усадьба и проживание"
      )}
    >
      {/* Mobile — card only, no image rail */}
      <div className="vh-m-overview">
        <Reveal className="vh-m-card">
          <p className="vh-pill">{estateLabel}</p>
          <h2 className="vh-m-title">{headline}</h2>
          <p className="vh-m-lead">{lead}</p>

          <ul
            className="vh-metrics vh-metrics--2x2"
            aria-label={keyFactsLabel}
          >
            {metrics.slice(0, 4).map((m) => (
              <li key={m.v} className="vh-metric">
                <span className="vh-metric-icon" aria-hidden="true">
                  <MetricIcon id={m.icon} />
                </span>
                <strong>{m.k}</strong>
                <span>{m.v}</span>
              </li>
            ))}
          </ul>

          <a className="vh-btn vh-btn--bronze vh-m-cta" href={bookHref}>
            {ui.booking.checkAvailability}
          </a>
        </Reveal>
      </div>

      {/* Desktop */}
      <div className="vh-wrap vh-overview vh-desktop-split">
        <Reveal className="vh-overview-media">
          <div className="vh-overview-frame">
            <Image
              src={mainImg.src}
              alt={mainImg.alt}
              fill
              priority
              quality={IMAGE_QUALITY.gallery}
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="vh-photo"
            />
          </div>
        </Reveal>

        <Reveal className="vh-overview-copy" delay={40}>
          <p className="vh-label">{estateLabel}</p>
          <h2 id="statement-title" className="vh-display">
            {headline}
          </h2>
          <p className="vh-support">{tx(unit.intro.lead, locale)}</p>
          <p className="vh-overview-note">
            {t3(
              locale,
              "Rustični karakter uz savremen komfor — unutra i u bašti oko grejanog bazena.",
              "Rustic character with modern comfort — indoors and in the garden by the heated pool.",
              "Рустикальный характер и современный комфорт — внутри дома и в саду у бассейна с подогревом."
            )}
          </p>

          <ul
            className="vh-metrics vh-metrics--desktop"
            aria-label={keyFactsLabel}
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

          <a className="vh-btn vh-btn--bronze" href={bookHref}>
            {ui.booking.checkAvailability}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
