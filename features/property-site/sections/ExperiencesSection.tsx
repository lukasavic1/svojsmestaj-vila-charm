"use client";

import { useEffect, useRef, useState } from "react";
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

type Atmosphere = {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

const DESKTOP_HOVER_MQ =
  "(min-width: 1025px) and (hover: hover) and (pointer: fine)";

const SPRING = "cubic-bezier(0.22, 1.2, 0.36, 1)";

/**
 * Experiences — Atmosphere Deck on mobile/tablet;
 * horizontal hover accordion on desktop.
 */
export function ExperiencesSection() {
  const { locale } = useDemo();
  const [deckIndex, setDeckIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exitDir, setExitDir] = useState<0 | 1 | -1>(0);
  const [active, setActive] = useState(0);
  const [desktopHover, setDesktopHover] = useState(false);
  const [hintShake, setHintShake] = useState(false);
  const pointerRef = useRef<{ id: number; x: number; armed: boolean } | null>(
    null
  );
  const lockRef = useRef(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const hintedRef = useRef(false);

  const atmospheres: Atmosphere[] =
    locale === "sr"
      ? [
          {
            id: "sunny",
            index: "01",
            label: "Sunčani dan",
            title: "Sunce, voda i potpuni mir.",
            body: "Grejani bazen, ležaljke i bašta koja pripada samo vama — spor ritam dana na imanju.",
            image: "/images/pool-2.jpg",
            alt: "Grejani bazen Villa Charm danju",
          },
          {
            id: "evening",
            index: "02",
            label: "Večernja magija",
            title: "Kada padne mrak, imanje oživi drugačije.",
            body: "Toplo svetlo oko bazena i tišina bašte — večeri stvorene za duga druženja.",
            image: "/images/pool-night-1.jpg",
            alt: "Bazen Villa Charm noću",
          },
          {
            id: "event",
            index: "03",
            label: "Privatni događaj",
            title: "Prostor spreman za uspomene.",
            body: "Prostrano dvorište i terase za proslave, vikende sa društvom ili porodična okupljanja.",
            image: "/images/pool-gathering.jpg",
            alt: "Okupljanje na imanju Villa Charm",
          },
        ]
      : [
          {
            id: "sunny",
            index: "01",
            label: "Sunny day",
            title: "Sun, water, and complete calm.",
            body: "Heated pool, loungers, and a garden that belongs only to you — a slower day on the estate.",
            image: "/images/pool-2.jpg",
            alt: "Villa Charm heated pool by day",
          },
          {
            id: "evening",
            index: "02",
            label: "Evening magic",
            title: "After dark, the estate shifts mood.",
            body: "Warm light around the pool and garden quiet — evenings made for lingering.",
            image: "/images/pool-night-1.jpg",
            alt: "Villa Charm pool at night",
          },
          {
            id: "event",
            index: "03",
            label: "Private event",
            title: "A place ready for memories.",
            body: "A generous yard and terraces for celebrations, weekends with friends, or family gatherings.",
            image: "/images/pool-gathering.jpg",
            alt: "Gathering at Villa Charm",
          },
        ];

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

  const count = atmospheres.length;
  const front = atmospheres[deckIndex];
  const peek = atmospheres[(deckIndex + 1) % count];

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

  /* Brief swipe nudge once the deck is in view — replaces the old tab menu cue */
  useEffect(() => {
    if (desktopHover || hintedRef.current) return;
    const root = deckRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hintedRef.current = true;
      return;
    }

    let stopTimer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hintedRef.current) return;
        hintedRef.current = true;
        window.setTimeout(() => setHintShake(true), 280);
        stopTimer = window.setTimeout(() => setHintShake(false), 3100);
        io.disconnect();
      },
      { threshold: 0.42 }
    );
    io.observe(root);
    return () => {
      io.disconnect();
      window.clearTimeout(stopTimer);
    };
  }, [desktopHover]);

  const goTo = (next: number, dir: 1 | -1 = 1) => {
    if (lockRef.current) return;
    const wrapped = ((next % count) + count) % count;
    if (wrapped === deckIndex) return;
    hintedRef.current = true;
    setHintShake(false);
    lockRef.current = true;
    setExitDir(dir);
    window.setTimeout(() => {
      setDeckIndex(wrapped);
      setExitDir(0);
      setDragX(0);
      lockRef.current = false;
    }, 380);
  };

  const advance = () => goTo(deckIndex + 1, 1);
  const retreat = () => goTo(deckIndex - 1, -1);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (lockRef.current || e.button !== 0) return;
    hintedRef.current = true;
    setHintShake(false);
    pointerRef.current = { id: e.pointerId, x: e.clientX, armed: true };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = pointerRef.current;
    if (!p?.armed || p.id !== e.pointerId) return;
    setDragX(e.clientX - p.x);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = pointerRef.current;
    if (!p || p.id !== e.pointerId) return;
    pointerRef.current = null;
    setDragging(false);
    const dx = e.clientX - p.x;
    if (dx < -64) advance();
    else if (dx > 64) retreat();
    else setDragX(0);
  };

  const frontStyle =
    exitDir === 1
      ? {
          transform: "translate3d(112%, -6%, 0) rotate(8deg)",
          opacity: 0,
          transition: `transform 0.38s ${SPRING}, opacity 0.32s ease`,
        }
      : exitDir === -1
        ? {
            transform: "translate3d(-112%, -6%, 0) rotate(-8deg)",
            opacity: 0,
            transition: `transform 0.38s ${SPRING}, opacity 0.32s ease`,
          }
        : hintShake && !dragging
          ? undefined /* let CSS swipe-hint animation own transform */
          : {
              transform: `translate3d(${dragX}px, 0, 0) rotate(${dragX * 0.03}deg)`,
              opacity: 1 - Math.min(Math.abs(dragX) / 420, 0.35),
              transition: dragging
                ? "none"
                : `transform 0.5s ${SPRING}, opacity 0.35s ease`,
            };

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

        {/* Mobile + tablet: Atmosphere Deck — no tab strip; one shake cue for swipe */}
        <Reveal className="vh-exp-deck" delay={40}>
          <div className="vh-exp-deck-stage" ref={deckRef}>
            <p className="vh-exp-watermark" aria-hidden="true">
              {locale === "sr" ? "Atmosfera" : "Atmosphere"}
            </p>

            <div
              className={`vh-exp-stack${hintShake ? " is-hinting" : ""}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              role="region"
              aria-roledescription="carousel"
              aria-label={
                locale === "sr" ? "Atmosfere na imanju" : "Estate atmospheres"
              }
            >
              <article className="vh-exp-layer vh-exp-layer--peek" aria-hidden="true">
                <Image
                  src={peek.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 90vw, 0px"
                  quality={IMAGE_QUALITY.card}
                  className="vh-photo"
                />
                <span className="vh-exp-veil" />
              </article>

              <article
                className="vh-exp-layer vh-exp-layer--front"
                style={frontStyle}
                aria-live="polite"
              >
                <div className="vh-exp-layer-media">
                  <Image
                    key={front.id}
                    src={front.image}
                    alt={front.alt}
                    fill
                    priority
                    draggable={false}
                    sizes="(max-width: 1024px) 100vw, 0px"
                    quality={IMAGE_QUALITY.gallery}
                    className="vh-photo vh-exp-kenburns"
                  />
                </div>
                <span className="vh-exp-veil vh-exp-veil--heavy" aria-hidden="true" />
                <div className="vh-exp-layer-copy">
                  <p className="vh-exp-layer-index" aria-hidden="true">
                    {front.index}
                  </p>
                  <h3>{front.title}</h3>
                  <p>{front.body}</p>
                </div>
              </article>
            </div>

            <div className="vh-exp-dots" aria-hidden="true">
              {atmospheres.map((a, i) => (
                <span
                  key={a.id}
                  className={`vh-exp-dot${i === deckIndex ? " is-on" : ""}`}
                />
              ))}
            </div>
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
