"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3, tx } from "@/lib/i18n";

/** Compact lifestyle moments. */
export function StorySection() {
  const { locale } = useDemo();
  const moments = property.story.moments.slice(0, 2);

  return (
    <section className="vh-moments vh-moments--compact" aria-labelledby="moments-title">
      <div className="vh-wrap">
        <Reveal className="vh-section-head vh-section-head--tight">
          <p className="vh-label">
            {t3(locale, "Na imanju", "On the estate", "В усадьбе")}
          </p>
          <h2 id="moments-title" className="vh-title vh-title--sm">
            {tx(property.story.heading, locale)}
          </h2>
        </Reveal>

        <div className="vh-moments-row">
          {moments.map((m, i) => (
            <Reveal
              key={tx(m.title, locale)}
              className="vh-moment-card"
              delay={i * 40}
            >
              <div className="vh-moment-frame">
                <Image
                  src={m.image.src}
                  alt={tx(m.image.alt, locale)}
                  fill
                  quality={IMAGE_QUALITY.card}
                  sizes="(max-width: 900px) 100vw, 46vw"
                  className="vh-photo"
                />
              </div>
              <div className="vh-moment-copy">
                <h3>{tx(m.title, locale)}</h3>
                <p>{tx(m.body, locale)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
