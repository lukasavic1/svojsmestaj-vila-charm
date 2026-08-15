"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3 } from "@/lib/i18n";
import { PricingBoard } from "./PricingBoard";

const SCENES = [
  {
    image: "/images/terrace-upper.jpg",
    title: ["Jutra na terasi", "Morning on the terrace", "Утро на террасе"],
    body: [
      "Kafa, mir i pogled na zelenilo Barajeva.",
      "Coffee, calm, and a view over Barajevo’s greenery.",
      "Кофе, тишина и вид на зелень Бараево.",
    ],
  },
  {
    image: "/images/pool-1.jpg",
    title: ["Popodneva kraj vode", "Afternoons by the water", "Дни у воды"],
    body: [
      "Grejani bazen i sunčanje u potpunoj privatnosti.",
      "A heated pool and sunbathing in complete privacy.",
      "Подогреваемый бассейн и отдых на солнце в полном уединении.",
    ],
  },
  {
    image: "/images/pool-night-1.jpg",
    title: ["Večeri pod zvezdama", "Evenings under the stars", "Вечера под звёздами"],
    body: [
      "Prostrano dvorište, roštilj i osvetljen bazen.",
      "A spacious garden, barbecue, and illuminated pool.",
      "Просторный двор, гриль и подсвеченный бассейн.",
    ],
  },
] as const;

/** Chapter two — the estate as a backdrop for gathering. */
export function GatherSection() {
  const { locale } = useDemo();

  return (
    <section className="vh-gather" id="prostor" aria-labelledby="gather-title">
      <div className="vh-wrap">
        <Reveal className="vh-gather-head">
          <h2 id="gather-title">
            {t3(
              locale,
              "Ovde priča postaje glasnija.",
              "This is where the story gets louder.",
              "Здесь история звучит громче."
            )}
          </h2>
          <p>
            {t3(
              locale,
              "Smeh oko bazena, miris roštilja, večeri koje traju duže nego što planirate.",
              "Laughter by the pool, the scent of the grill, evenings that last longer than planned.",
              "Смех у бассейна, запах гриля, вечера длиннее, чем планировали."
            )}
          </p>
        </Reveal>

        <div className="vh-gather-scenes">
          {SCENES.map((scene, index) => (
            <Reveal className="vh-scene-card" delay={index * 50} key={scene.image}>
              <div className="vh-scene-card-image">
                <Image
                  src={scene.image}
                  alt={t3(
                    locale,
                    scene.title[0],
                    scene.title[1],
                    scene.title[2]
                  )}
                  fill
                  quality={IMAGE_QUALITY.card}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="vh-photo"
                />
              </div>
              <div className="vh-scene-card-copy">
                <h3>
                  {t3(locale, scene.title[0], scene.title[1], scene.title[2])}
                </h3>
                <p>{t3(locale, scene.body[0], scene.body[1], scene.body[2])}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <PricingBoard embedded />
    </section>
  );
}
