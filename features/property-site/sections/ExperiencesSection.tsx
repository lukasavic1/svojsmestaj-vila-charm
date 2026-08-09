"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";

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

  const cards: ExperienceCard[] =
    locale === "sr"
      ? [
          {
            id: "pool",
            badge: "01 / Bazen",
            title: "Sunčani dani uz bazen",
            body: "Zaronite u grejani bazen, opustite se na ležaljkama i uživajte u potpunoj privatnosti.",
            image: "/images/pool-2.jpg",
            alt: "Grejani bazen na imanju Villa Charm",
          },
          {
            id: "bbq",
            badge: "02 / Roštilj",
            title: "Letnja trpeza & Roštilj",
            body: "Natkrivene terase i cigleni grill spremni za duga porodična druženja i večere na otvorenom.",
            image: "/images/garden-bbq.jpg",
            alt: "Roštilj i letnja trpeza",
          },
          {
            id: "evening",
            badge: "03 / Veče",
            title: "Večernja atmosfera",
            body: "Kada padne mrak, diskretno svetlo i mir bašte pružaju potpuno novi doživljaj.",
            image: "/images/pool-night-1.jpg",
            alt: "Bazen noću",
          },
          {
            id: "gather",
            badge: "04 / Okupljanja",
            title: "Dnevna okupljanja",
            body: "Prostrano dvorište od 2.000 m² prilagođeno za organizaciju proslava do 30 gostiju.",
            image: "/images/pool-gathering.jpg",
            alt: "Okupljanje na imanju",
          },
        ]
      : [
          {
            id: "pool",
            badge: "01 / Pool",
            title: "Sunny days by the pool",
            body: "Dive into the heated pool, stretch out on loungers, and enjoy complete privacy.",
            image: "/images/pool-2.jpg",
            alt: "Heated pool at Villa Charm",
          },
          {
            id: "bbq",
            badge: "02 / Grill",
            title: "Summer table & barbecue",
            body: "Covered terraces and a brick grill ready for long family gatherings and outdoor dinners.",
            image: "/images/garden-bbq.jpg",
            alt: "Barbecue and summer dining",
          },
          {
            id: "evening",
            badge: "03 / Evening",
            title: "Evening atmosphere",
            body: "After dark, soft light and garden quiet create a completely new mood.",
            image: "/images/pool-night-1.jpg",
            alt: "Pool at night",
          },
          {
            id: "gather",
            badge: "04 / Gatherings",
            title: "Daytime gatherings",
            body: "A 2,000 m² yard suited for celebrations with up to 30 guests.",
            image: "/images/pool-gathering.jpg",
            alt: "Gathering on the estate",
          },
        ];

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
            {locale === "sr" ? "Iskustva & trenuci" : "Experiences & moments"}
          </p>
          <h2 id="exp-title" className="vh-title">
            {locale === "sr"
              ? "Prostor stvoren za uspomene."
              : "A place made for memories."}
          </h2>
          <p className="vh-support">
            {locale === "sr"
              ? "Bilo da planirate porodični vikend, proslavu sa društvom ili beg iz grada."
              : "Whether you’re planning a family weekend, a celebration with friends, or an escape from the city."}
          </p>
        </Reveal>

        {/* Mobile + tablet: tap-to-expand filmstrip */}
        <Reveal className="vh-exp-film" delay={40}>
          <div
            className="vh-exp-film-stage"
            role="region"
            aria-live="polite"
            aria-label={
              locale === "sr" ? "Iskustva na imanju" : "Experiences on the estate"
            }
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
            aria-label={
              locale === "sr" ? "Izaberite trenutak" : "Choose a moment"
            }
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
            aria-label={
              locale === "sr" ? "Iskustva na imanju" : "Experiences on the estate"
            }
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
