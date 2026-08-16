"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3 } from "@/lib/i18n";

export type Slide =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; alt: string };

const ADVANCE_MS = 5200;

/** Half-section media carousel — mixes photos and muted looping videos. */
export function Slideshow({ slides, label }: { slides: Slide[]; label?: string }) {
  const { locale } = useDemo();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const count = slides.length;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.6] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || paused || !inView) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % count),
      ADVANCE_MS
    );
    return () => window.clearInterval(id);
  }, [count, paused, inView]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active, inView]);

  const go = (i: number) => setActive((i + count) % count);

  return (
    <div
      ref={rootRef}
      className="vh-slideshow"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="vh-slideshow-stage">
        {slides.map((s, i) => {
          const on = i === active;
          return (
            <div
              key={`${s.src}-${i}`}
              className={`vh-slide${on ? " is-on" : ""}`}
              aria-hidden={!on}
            >
              {s.kind === "image" ? (
                <Image
                  src={s.src}
                  alt={on ? s.alt : ""}
                  fill
                  quality={IMAGE_QUALITY.gallery}
                  sizes="(max-width: 900px) 100vw, 46vw"
                  className="vh-photo"
                  priority={i === 0}
                />
              ) : (
                <>
                  <Image
                    src={s.poster}
                    alt={on ? s.alt : ""}
                    fill
                    quality={IMAGE_QUALITY.gallery}
                    sizes="(max-width: 900px) 100vw, 46vw"
                    className="vh-photo"
                  />
                  {on ? (
                    <video
                      ref={videoRef}
                      className="vh-slide-video"
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={s.poster}
                    >
                      <source src={s.src} type="video/mp4" />
                    </video>
                  ) : null}
                  <span className="vh-slide-badge" aria-hidden="true">
                    {t3(locale, "Video", "Video", "Видео")}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            className="vh-slide-nav vh-slide-nav--prev"
            onClick={() => go(active - 1)}
            aria-label={t3(locale, "Prethodna", "Previous", "Назад")}
          >
            ‹
          </button>
          <button
            type="button"
            className="vh-slide-nav vh-slide-nav--next"
            onClick={() => go(active + 1)}
            aria-label={t3(locale, "Sledeća", "Next", "Вперёд")}
          >
            ›
          </button>
          <div className="vh-slide-dots" role="tablist" aria-label={label}>
            {slides.map((s, i) => (
              <button
                key={`dot-${s.src}-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`vh-slide-dot${i === active ? " is-on" : ""}`}
                aria-label={`${i + 1}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
