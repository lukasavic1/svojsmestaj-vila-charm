"use client";

import Image from "next/image";
import { MetricIcon, type MetricIconId } from "@/components/ui/MetricIcon";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx, txList } from "@/lib/i18n";

/** Stay overview — desktop split; mobile feature card + capacity metrics. */
export function IntroSection() {
  const { unit, locale, bookHref } = useDemo();
  const living =
    unit.photos.find((p) => p.src.includes("living")) ?? unit.photos[0];
  const kitchen =
    unit.photos.find((p) => p.src.includes("kitchen")) ?? unit.photos[1] ?? living;
  const bedroom =
    unit.photos.find((p) => p.src.includes("bedroom")) ?? unit.photos[2] ?? living;
  const paragraphs = txList(unit.intro.body, locale).slice(0, 2);

  const metrics: { k: string; v: string; icon: MetricIconId }[] =
    locale === "sr"
      ? [
          { k: String(unit.specs.capacity), v: "Noćenje", icon: "bed" },
          {
            k: String(unit.specs.dayCapacity ?? "—"),
            v: "Dnevni boravak",
            icon: "users",
          },
          { k: String(unit.specs.bathrooms), v: "Kupatila", icon: "bath" },
          { k: "8×4 m", v: "Grejani bazen", icon: "pool" },
        ]
      : [
          { k: String(unit.specs.capacity), v: "Overnight", icon: "bed" },
          {
            k: String(unit.specs.dayCapacity ?? "—"),
            v: "Day guests",
            icon: "users",
          },
          { k: String(unit.specs.bathrooms), v: "Bathrooms", icon: "bath" },
          { k: "8×4 m", v: "Heated pool", icon: "pool" },
        ];

  const slides =
    locale === "sr"
      ? [
          { src: living.src, alt: tx(living.alt, locale), badge: "Glavna kuća" },
          { src: kitchen.src, alt: tx(kitchen.alt, locale), badge: "Kuhinja" },
          { src: bedroom.src, alt: tx(bedroom.alt, locale), badge: "Sobe" },
        ]
      : [
          { src: living.src, alt: tx(living.alt, locale), badge: "Main house" },
          { src: kitchen.src, alt: tx(kitchen.alt, locale), badge: "Kitchen" },
          { src: bedroom.src, alt: tx(bedroom.alt, locale), badge: "Rooms" },
        ];

  return (
    <section
      className="vh-space"
      id="o-smestaju"
      aria-label={locale === "sr" ? "Prostor" : "The stay"}
    >
      {/* ——— Mobile ——— */}
      <div className="vh-m-overview vh-m-overview--space">
        <div className="vh-m-rail" aria-label={locale === "sr" ? "Enterijer" : "Interior"}>
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
          <p className="vh-pill">
            {locale === "sr" ? "Prostor" : "The stay"}
          </p>
          <h2 className="vh-m-title">
            {tx(unit.intro.heading, locale)}
          </h2>
          <p className="vh-m-lead">{tx(unit.intro.lead, locale)}</p>

          <ul className="vh-metrics vh-metrics--2x2" aria-label={locale === "sr" ? "Kapacitet" : "Capacity"}>
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
            {locale === "sr"
              ? "Proveri slobodne termine →"
              : "Check free dates →"}
          </a>
          <a className="vh-m-link" href={bookHref}>
            {locale === "sr" ? "Pogledaj kompletan raspored" : "View full schedule"}
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
          <p className="vh-label">
            {locale === "sr" ? "Prostor" : "The stay"}
          </p>
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
              <dt>{locale === "sr" ? "Noćenje" : "Overnight"}</dt>
              <dd>{unit.specs.capacity}</dd>
            </div>
            <div>
              <dt>{locale === "sr" ? "Dnevni boravak" : "Day guests"}</dt>
              <dd>{unit.specs.dayCapacity ?? "—"}</dd>
            </div>
            <div>
              <dt>{locale === "sr" ? "Kupatila" : "Bathrooms"}</dt>
              <dd>{unit.specs.bathrooms}</dd>
            </div>
            <div>
              <dt>{locale === "sr" ? "Bazen" : "Pool"}</dt>
              <dd>8×4 m</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
