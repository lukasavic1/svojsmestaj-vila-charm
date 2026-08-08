"use client";

import { META_BADGE_ICONS, PinIcon } from "@/components/ui/icons";
import { Gallery } from "@/features/gallery/Gallery";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx, txList } from "@/lib/i18n";

export function ClassicHero() {
  const { unit, locale, ui, bookHref } = useDemo();
  const badges = txList(unit.badges, locale);

  return (
    <section className="hero hero--classic">
      <div className="wrap">
        <div className="hero-head">
          <div className="hero-intro">
            <p className="hero-region">
              <PinIcon />
              {tx(unit.region, locale)}
            </p>
            <h1 className="hero-classic-title">
              <span>{tx(unit.name, locale)}</span>
            </h1>
            <p className="hero-hook">{tx(unit.hook, locale)}</p>
            <ul className="meta-list">
              {badges.map((b, i) => {
                const Icon = META_BADGE_ICONS[i % META_BADGE_ICONS.length];
                return (
                  <li key={b}>
                    <Icon />
                    <span>{b}</span>
                  </li>
                );
              })}
            </ul>

            <div className="hero-book-card">
              <div className="hero-book-price">
                <b>{tx(unit.price.amount, locale)}</b>
                <span>{tx(unit.price.note, locale)}</span>
              </div>
              <a className="btn btn-solid btn-glow" href={bookHref}>
                {ui.booking.sendInquiry}
              </a>
            </div>
          </div>
        </div>

        <Gallery photos={unit.photos} locale={locale} />
      </div>
    </section>
  );
}
