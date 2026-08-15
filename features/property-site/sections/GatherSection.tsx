"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3 } from "@/lib/i18n";
import { PricingBoard } from "./PricingBoard";

const DESKTOP_HOVER_MQ =
  "(min-width: 1025px) and (hover: hover) and (pointer: fine)";

const SCENES = [
  {
    id: "morning",
    image: "/images/terrace-upper.jpg",
    badge: ["01 / Jutra", "01 / Mornings", "01 / Утро"],
    title: ["Jutra na terasi", "Morning on the terrace", "Утро на террасе"],
    body: [
      "Kafa, mir i pogled na zelenilo Barajeva.",
      "Coffee, calm, and a view over Barajevo’s greenery.",
      "Кофе, тишина и вид на зелень Бараево.",
    ],
  },
  {
    id: "afternoon",
    image: "/images/pool-1.jpg",
    badge: ["02 / Dan", "02 / Day", "02 / День"],
    title: ["Popodneva kraj vode", "Afternoons by the water", "Дни у воды"],
    body: [
      "Grejani bazen i sunčanje u potpunoj privatnosti.",
      "A heated pool and sunbathing in complete privacy.",
      "Подогреваемый бассейн и отдых на солнце в полном уединении.",
    ],
  },
  {
    id: "evening",
    image: "/images/pool-night-1.jpg",
    badge: ["03 / Veče", "03 / Evening", "03 / Вечер"],
    title: ["Večeri pod zvezdama", "Evenings under the stars", "Вечера под звёздами"],
    body: [
      "Prostrano dvorište, roštilj i osvetljen bazen.",
      "A spacious garden, barbecue, and illuminated pool.",
      "Просторный двор, гриль и подсвеченный бассейн.",
    ],
  },
  {
    id: "gather",
    image: "/images/pool-gathering.jpg",
    badge: ["04 / Okupljanja", "04 / Gatherings", "04 / Встречи"],
    title: ["Dane koje delite", "Days you share", "Дни, которые делите"],
    body: [
      "Do 30 gostiju danju — proslave, porodica, ili tišina samo za vas.",
      "Up to 30 daytime guests — celebrations, family, or quiet just for you.",
      "До 30 гостей днём — праздники, семья или тишина только для вас.",
    ],
  },
] as const;

/** Chapter two — the estate as a backdrop for gathering. */
export function GatherSection() {
  const { locale } = useDemo();
  const [active, setActive] = useState(0);
  const [desktopHover, setDesktopHover] = useState(false);

  useEffect(() => {
    const hoverMq = window.matchMedia(DESKTOP_HOVER_MQ);
    const sync = () => setDesktopHover(hoverMq.matches);
    sync();
    hoverMq.addEventListener("change", sync);
    return () => hoverMq.removeEventListener("change", sync);
  }, []);

  const scenesLabel = t3(
    locale,
    "Trenuci na imanju",
    "Moments on the estate",
    "Моменты в усадьбе"
  );

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

        {/* Phone / tablet: horizontal cards */}
        <div className="vh-gather-scenes">
          {SCENES.map((scene, index) => (
            <article className="vh-scene-card" key={scene.id}>
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
                  sizes="(max-width: 1024px) 78vw, 33vw"
                  className="vh-photo"
                  priority={index === 0}
                />
              </div>
              <div className="vh-scene-card-copy">
                <h3>
                  {t3(locale, scene.title[0], scene.title[1], scene.title[2])}
                </h3>
                <p>{t3(locale, scene.body[0], scene.body[1], scene.body[2])}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop / laptop: hover accordion */}
        <Reveal className="vh-gather-desktop" delay={40}>
          <div
            className="vh-exp-track"
            role="list"
            aria-label={scenesLabel}
            onMouseLeave={desktopHover ? () => setActive(0) : undefined}
          >
            {SCENES.map((scene, i) => {
              const isOpen = active === i;
              const title = t3(
                locale,
                scene.title[0],
                scene.title[1],
                scene.title[2]
              );
              return (
                <article
                  key={scene.id}
                  role="listitem"
                  className={`vh-exp-card${isOpen ? " is-open" : ""}`}
                  onMouseEnter={desktopHover ? () => setActive(i) : undefined}
                  onFocus={desktopHover ? () => setActive(i) : undefined}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                  tabIndex={0}
                  aria-expanded={isOpen}
                >
                  <Image
                    src={scene.image}
                    alt={title}
                    fill
                    draggable={false}
                    quality={IMAGE_QUALITY.gallery}
                    sizes="40vw"
                    className="vh-photo"
                    priority={i === 0}
                  />
                  <span className="vh-exp-veil" aria-hidden="true" />
                  <span className="vh-exp-badge">
                    {t3(locale, scene.badge[0], scene.badge[1], scene.badge[2])}
                  </span>
                  <div className="vh-exp-copy">
                    <h3>{title}</h3>
                    <p>
                      {t3(locale, scene.body[0], scene.body[1], scene.body[2])}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>

      <PricingBoard embedded />
    </section>
  );
}
