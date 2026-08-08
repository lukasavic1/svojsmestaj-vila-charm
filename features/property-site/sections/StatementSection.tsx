"use client";

import Image from "next/image";
import { MetricIcon, type MetricIconId } from "@/components/ui/MetricIcon";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx } from "@/lib/i18n";

/**
 * Single estate overview.
 * Mobile: text + metrics card (no image rail).
 * Desktop: catchy dual media + copy.
 */
export function StatementSection() {
  const { unit, locale, bookHref, ui } = useDemo();

  const metrics: { k: string; v: string; icon: MetricIconId }[] =
    locale === "sr"
      ? [
          { k: "2.000 m²", v: "Imanje", icon: "area" },
          { k: "~25 min", v: "Do Beograda", icon: "pin" },
          { k: "8×4 m", v: "Grejani bazen", icon: "pool" },
          { k: String(unit.specs.capacity), v: "Noćenje", icon: "bed" },
          {
            k: String(unit.specs.dayCapacity ?? "—"),
            v: "Dnevni gosti",
            icon: "users",
          },
          { k: String(unit.specs.bathrooms), v: "Kupatila", icon: "bath" },
        ]
      : [
          { k: "2,000 m²", v: "Estate", icon: "area" },
          { k: "~25 min", v: "To Belgrade", icon: "pin" },
          { k: "8×4 m", v: "Heated pool", icon: "pool" },
          { k: String(unit.specs.capacity), v: "Overnight", icon: "bed" },
          {
            k: String(unit.specs.dayCapacity ?? "—"),
            v: "Day guests",
            icon: "users",
          },
          { k: String(unit.specs.bathrooms), v: "Bathrooms", icon: "bath" },
        ];

  const headline =
    locale === "sr"
      ? "Mir, privatnost i prostor za okupljanja."
      : "Quiet, privacy, and room to gather.";

  const lead =
    locale === "sr"
      ? `${tx(unit.intro.lead, locale)} Na 2.000 m², oko 25 minuta od Beograda.`
      : `${tx(unit.intro.lead, locale)} On 2,000 m², about 25 minutes from Belgrade.`;

  const mainImg = {
    src: "/images/exterior-1.jpg",
    alt:
      locale === "sr"
        ? "Villa Charm među zelenilom"
        : "Villa Charm among greenery",
  };

  return (
    <section
      className="vh-statement"
      id="statement"
      aria-label={locale === "sr" ? "Imanje i prostor" : "Estate and stay"}
    >
      {/* Mobile — card only, no image rail */}
      <div className="vh-m-overview">
        <Reveal className="vh-m-card">
          <p className="vh-pill">
            {locale === "sr" ? "Imanje" : "The estate"}
          </p>
          <h2 className="vh-m-title">{headline}</h2>
          <p className="vh-m-lead">{lead}</p>

          <ul
            className="vh-metrics vh-metrics--2x2"
            aria-label={locale === "sr" ? "Ključni podaci" : "Key facts"}
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
          <p className="vh-label">
            {locale === "sr" ? "Imanje" : "The estate"}
          </p>
          <h2 id="statement-title" className="vh-display">
            {headline}
          </h2>
          <p className="vh-support">{tx(unit.intro.lead, locale)}</p>
          <p className="vh-overview-note">
            {locale === "sr"
              ? "Rustični karakter uz savremen komfor — unutra i u bašti oko grejanog bazena."
              : "Rustic character with modern comfort — indoors and in the garden by the heated pool."}
          </p>

          <ul
            className="vh-metrics vh-metrics--desktop"
            aria-label={locale === "sr" ? "Ključni podaci" : "Key facts"}
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
