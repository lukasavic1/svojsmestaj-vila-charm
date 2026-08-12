"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { closingBreak } from "@/data/heroMedia";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx } from "@/lib/i18n";

export function ClosingSection() {
  const { unit, locale } = useDemo();

  return (
    <section className="vh-closing" aria-labelledby="closing-title">
      <div className="vh-closing-media" aria-hidden="true">
        <Image
          src={closingBreak.src}
          alt=""
          fill
          quality={IMAGE_QUALITY.hero}
          sizes="100vw"
          className="vh-photo"
        />
        <div className="vh-closing-veil" />
      </div>
      <div className="vh-wrap vh-closing-copy">
        <Reveal>
          <h2 id="closing-title" className="vh-display vh-display--light">
            {tx(unit.name, locale)}
          </h2>
          <p className="vh-closing-meta">{tx(unit.region, locale)}</p>
        </Reveal>
      </div>
    </section>
  );
}
