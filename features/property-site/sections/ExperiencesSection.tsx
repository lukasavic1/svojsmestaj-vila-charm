"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3 } from "@/lib/i18n";

type ExperienceCard = {
  id: string;
  badge: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

const DESKTOP_HOVER_MQ =
  "(min-width: 1025px) and (hover: hover) and (pointer: fine)";

/**
 * Experiences — tap-to-expand filmstrip on mobile/tablet;
 * horizontal hover accordion on desktop.
 */
export function ExperiencesSection() {
  const { locale } = useDemo();
  const [active, setActive] = useState(0);
  const [film, setFilm] = useState(0);
  const [desktopHover, setDesktopHover] = useState(false);

  const cards: ExperienceCard[] = [
    {
      id: "pool",
      badge: t3(locale, "01 / Bazen", "01 / Pool", "01 / Бассейн"),
      title: t3(
        locale,
        "Sunčani dani uz bazen",
        "Sunny days by the pool",
        "Солнечные дни у бассейна"
      ),
      body: t3(
        locale,
        "Zaronite u grejani bazen, opustite se na ležaljkama i uživajte u potpunoj privatnosti.",
        "Dive into the heated pool, stretch out on loungers, and enjoy complete privacy.",
        "Окунитесь в бассейн с подогревом, отдохните на шезлонгах и наслаждайтесь полной приватностью."
      ),
      image: "/images/pool-2.jpg",
      alt: t3(
        locale,
        "Grejani bazen na imanju Villa Charm",
        "Heated pool at Villa Charm",
        "Бассейн с подогревом в усадьбе Villa Charm"
      ),
    },
    {
      id: "bbq",
      badge: t3(locale, "02 / Roštilj", "02 / Grill", "02 / Гриль"),
      title: t3(
        locale,
        "Letnja trpeza & Roštilj",
        "Summer table & barbecue",
        "Летний стол и барбекю"
      ),
      body: t3(
        locale,
        "Natkrivene terase i cigleni grill spremni za duga porodična druženja i večere na otvorenom.",
        "Covered terraces and a brick grill ready for long family gatherings and outdoor dinners.",
        "Крытые террасы и кирпичный гриль готовы к долгим семейным посиделкам и ужинам на свежем воздухе."
      ),
      image: "/images/garden-bbq.jpg",
      alt: t3(
        locale,
        "Roštilj i letnja trpeza",
        "Barbecue and summer dining",
        "Барбекю и летний стол"
      ),
    },
    {
      id: "evening",
      badge: t3(locale, "03 / Veče", "03 / Evening", "03 / Вечер"),
      title: t3(
        locale,
        "Večernja atmosfera",
        "Evening atmosphere",
        "Вечерняя атмосфера"
      ),
      body: t3(
        locale,
        "Kada padne mrak, diskretno svetlo i mir bašte pružaju potpuno novi doživljaj.",
        "After dark, soft light and garden quiet create a completely new mood.",
        "Когда темнеет, мягкий свет и тишина сада создают совершенно новое настроение."
      ),
      image: "/images/pool-night-1.jpg",
      alt: t3(locale, "Bazen noću", "Pool at night", "Бассейн ночью"),
    },
    {
      id: "gather",
      badge: t3(locale, "04 / Okupljanja", "04 / Gatherings", "04 / Встречи"),
      title: t3(
        locale,
        "Dnevna okupljanja",
        "Daytime gatherings",
        "Встречи днём"
      ),
      body: t3(
        locale,
        "Prostrano dvorište od 2.000 m² prilagođeno za organizaciju proslava do 30 gostiju.",
        "A 2,000 m² yard suited for celebrations with up to 30 guests.",
        "Просторный двор площадью 2 000 м² подходит для праздников до 30 гостей."
      ),
      image: "/images/pool-gathering.jpg",
      alt: t3(
        locale,
        "Okupljanje na imanju",
        "Gathering on the estate",
        "Встреча в усадьбе"
      ),
    },
  ];

  const estateExperiencesLabel = t3(
    locale,
    "Iskustva na imanju",
    "Experiences on the estate",
    "Впечатления в усадьбе"
  );

  const featured = cards[film];

  useEffect(() => {
    const hoverMq = window.matchMedia(DESKTOP_HOVER_MQ);
    const sync = () => {
      const hover = hoverMq.matches;
      setDesktopHover(hover);
      if (hover) setActive((prev) => (prev < 0 ? 0 : prev));
    };
    sync();
    hoverMq.addEventListener("change", sync);
    return () => hoverMq.removeEventListener("change", sync);
  }, []);

  return (
    <section className="vh-exp" id="iskustva" aria-labelledby="exp-title">
      <div className="vh-wrap">
        <Reveal className="vh-exp-head">
          <p className="vh-pill">
            {t3(
              locale,
              "Iskustva & trenuci",
              "Experiences & moments",
              "Впечатления и моменты"
            )}
          </p>
          <h2 id="exp-title" className="vh-title">
            {t3(
              locale,
              "Prostor stvoren za uspomene.",
              "A place made for memories.",
              "Место, созданное для воспоминаний."
            )}
          </h2>
          <p className="vh-support">
            {t3(
              locale,
              "Bilo da planirate porodični vikend, proslavu sa društvom ili beg iz grada.",
              "Whether you’re planning a family weekend, a celebration with friends, or an escape from the city.",
              "Планируете ли вы семейные выходные, праздник с друзьями или побег из города."
            )}
          </p>
        </Reveal>

        {/* Mobile + tablet: tap-to-expand filmstrip */}
        <Reveal className="vh-exp-film" delay={40}>
          <div
            className="vh-exp-film-stage"
            role="region"
            aria-live="polite"
            aria-label={estateExperiencesLabel}
          >
            {cards.map((card, i) => (
              <div
                key={card.id}
                className={`vh-exp-film-slide${i === film ? " is-on" : ""}`}
                aria-hidden={i !== film}
              >
                <Image
                  src={card.image}
                  alt={i === film ? card.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 0px"
                  quality={IMAGE_QUALITY.gallery}
                  className="vh-photo vh-exp-film-img"
                />
              </div>
            ))}
            <span className="vh-exp-veil vh-exp-veil--heavy" aria-hidden="true" />
            <div className="vh-exp-film-copy" key={featured.id}>
              <p className="vh-exp-badge">{featured.badge}</p>
              <h3 id={`exp-film-${featured.id}`}>{featured.title}</h3>
              <p>{featured.body}</p>
            </div>
          </div>

          <div
            className="vh-exp-strip"
            role="tablist"
            aria-label={t3(
              locale,
              "Izaberite trenutak",
              "Choose a moment",
              "Выберите момент"
            )}
          >
            {cards.map((card, i) => {
              const selected = i === film;
              return (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`exp-film-${card.id}`}
                  className={`vh-exp-thumb${selected ? " is-on" : ""}`}
                  onClick={() => setFilm(i)}
                >
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="120px"
                    quality={IMAGE_QUALITY.card}
                    className="vh-photo"
                  />
                  <span className="vh-exp-thumb-label">{card.badge}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Desktop: hover accordion */}
        <Reveal className="vh-exp-desktop" delay={40}>
          <div
            className="vh-exp-track"
            role="list"
            aria-label={estateExperiencesLabel}
            onMouseLeave={desktopHover ? () => setActive(0) : undefined}
          >
            {cards.map((card, i) => {
              const isOpen = active === i;
              return (
                <article
                  key={card.id}
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
                    src={card.image}
                    alt={card.alt}
                    fill
                    draggable={false}
                    quality={IMAGE_QUALITY.gallery}
                    sizes="40vw"
                    className="vh-photo"
                    priority={i === 0}
                  />
                  <span className="vh-exp-veil" aria-hidden="true" />
                  <span className="vh-exp-badge">{card.badge}</span>
                  <div className="vh-exp-copy">
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
