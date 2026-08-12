"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3 } from "@/lib/i18n";

/**
 * Single estate overview.
 * Mobile: text + metrics card (no image rail).
 * Desktop: catchy dual media + copy.
 */
export function StatementSection() {
  const { unit, locale } = useDemo();

  const metrics: { k: string; v: string }[] = [
    {
      k: t3(locale, "2.000 m²", "2,000 m²", "2 000 м²"),
      v: t3(locale, "Parcela", "Grounds", "Участок"),
    },
    {
      k: t3(locale, "~25 min", "~25 min", "~25 мин"),
      v: t3(locale, "Do Beograda", "To Belgrade", "До Белграда"),
    },
    {
      k: t3(locale, "8×4 m", "8×4 m", "8×4 м"),
      v: t3(locale, "Bazen", "Pool", "Бассейн"),
    },
    {
      k: String(unit.specs.capacity),
      v: t3(locale, "Noćenje", "Overnight", "Ночлег"),
    },
    {
      k: String(unit.specs.dayCapacity ?? "—"),
      v: t3(locale, "Dnevni gosti", "Day guests", "Гости днём"),
    },
    {
      k: String(unit.specs.bathrooms),
      v: t3(locale, "Kupatila", "Bathrooms", "Санузлы"),
    },
  ];

  const headline = t3(
    locale,
    "Kuća i bašta — jedan prostor za okupljanja.",
    "House and garden — one place to gather.",
    "Дом и сад — одно пространство для встреч."
  );

  const lead = t3(
    locale,
    "Privatno imanje van gradskog ritma, dovoljno blizu za vikend ili duži boravak.",
    "A private estate away from the city pace, close enough for a weekend or a longer stay.",
    "Частная усадьба вне городского ритма, достаточно близко для выходных или долгого отдыха."
  );

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
                <strong>{m.k}</strong>
                <span>{m.v}</span>
              </li>
            ))}
          </ul>
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
          <p className="vh-support">{lead}</p>
          <p className="vh-overview-note">
            {t3(
              locale,
              "Unutra toplina drveta i detalja; napolju terase i zelenilo za duže večeri.",
              "Warm wood and detail indoors; terraces and greenery for longer evenings outside.",
              "Внутри — тепло дерева и деталей; снаружи террасы и зелень для долгих вечеров."
            )}
          </p>

          <ul
            className="vh-metrics vh-metrics--desktop"
            aria-label={keyFactsLabel}
          >
            {metrics.map((m) => (
              <li key={m.v} className="vh-metric">
                <strong>{m.k}</strong>
                <span>{m.v}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
