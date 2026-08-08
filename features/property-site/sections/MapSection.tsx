"use client";

import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx } from "@/lib/i18n";

export function MapSection() {
  const { locale, unit } = useDemo();
  const map = property.map;

  return (
    <section className="vh-map" id="lokacija" aria-labelledby="mapa-naslov">
      <div className="vh-wrap vh-map-grid">
        <Reveal>
          <p className="vh-label">
            {locale === "sr" ? "Lokacija" : "Location"}
          </p>
          <h2 id="mapa-naslov" className="vh-title">
            {tx(map.heading, locale)}
          </h2>
          <p className="vh-support">{tx(map.lead, locale)}</p>
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
            src={`https://www.google.com/maps?q=${map.lat},${map.lng}&hl=${
              locale === "sr" ? "sr-Latn" : "en"
            }&z=${map.zoom}&output=embed`}
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
