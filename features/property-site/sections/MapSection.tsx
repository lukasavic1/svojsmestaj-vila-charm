"use client";

import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";
import { LOCALE_HTML } from "@/types/locale";

export function MapSection() {
  const { locale, unit } = useDemo();
  const map = property.map;

  return (
    <section className="vh-map" id="lokacija" aria-labelledby="mapa-naslov">
      <div className="vh-wrap vh-map-layout">
        <Reveal className="vh-map-intro">
          <p className="vh-map-tag">
            {t3(locale, "Lokacija", "Location", "Локация")}
          </p>
          <h2 id="mapa-naslov" className="vh-map-title">
            {tx(map.heading, locale)}
          </h2>
          <p className="vh-map-lead">{tx(map.lead, locale)}</p>
          <ul className="vh-map-facts">
            {map.facts.map((f) => (
              <li key={tx(f.label, locale)}>
                <span>{tx(f.label, locale)}</span>
                <strong>{tx(f.value, locale)}</strong>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="vh-map-frame" delay={40}>
          <iframe
            src={`https://www.google.com/maps?q=${map.lat},${map.lng}&hl=${LOCALE_HTML[locale]}&z=${map.zoom}&output=embed`}
            title={`${tx(map.heading, locale)} — ${tx(unit.region, locale)}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  );
}
