"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { featureBreak } from "@/data/heroMedia";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx } from "@/lib/i18n";

/** Clean editorial split — single image, no overlapping thumbnails. */
export function FeatureSection() {
  const { locale } = useDemo();

  return (
    <section className="vh-feature" aria-labelledby="feature-title">
      <div className="vh-wrap vh-feature-split">
        <Reveal className="vh-feature-visual">
          <div className="vh-feature-frame">
            <Image
              src={featureBreak.src}
              alt={tx(featureBreak.alt, locale)}
              fill
              quality={IMAGE_QUALITY.hero}
              sizes="(max-width: 900px) 100vw, 58vw"
              className="vh-photo"
            />
          </div>
        </Reveal>

        <Reveal className="vh-feature-copy" delay={50}>
          <p className="vh-pill">{tx(featureBreak.kicker, locale)}</p>
          <h2 id="feature-title" className="vh-feature-title">
            {tx(featureBreak.title, locale)}
          </h2>
          <ul className="vh-feature-facts">
            {featureBreak.facts.map((f) => (
              <li key={tx(f, locale)}>{tx(f, locale)}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
