"use client";

import {
  ComfortIcon,
  LocationPinIcon,
  ViewIcon,
} from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx } from "@/lib/i18n";

const FEATURE_ICONS = [
  <ViewIcon key="v" />,
  <ComfortIcon key="c" />,
  <LocationPinIcon key="l" />,
];

export function FeaturesSection() {
  const { unit, locale } = useDemo();

  return (
    <section className="features-sec" aria-labelledby="feat-naslov">
      <div className="wrap">
        <Reveal>
          <h2 className="sec-title center" id="feat-naslov">
            {tx(unit.features.heading, locale)}
          </h2>
        </Reveal>
        <div className="features">
          {unit.features.items.map((f, i) => (
            <Reveal
              key={tx(f.title, locale)}
              delay={i * 70}
              as="article"
              className="feature-reveal"
            >
              <div className="feature">
                <span className="feature-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="feature-icon" aria-hidden="true">
                  {FEATURE_ICONS[i] ?? FEATURE_ICONS[0]}
                </div>
                <h3>{tx(f.title, locale)}</h3>
                <p>{tx(f.body, locale)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
