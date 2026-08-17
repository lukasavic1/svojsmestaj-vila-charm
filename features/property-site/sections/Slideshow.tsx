"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3 } from "@/lib/i18n";
import { useSwipeIndex } from "@/lib/useSwipeIndex";

export type Slide =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; alt: string };

const ADVANCE_MS = 5200;

function armMutedInline(el: HTMLVideoElement) {
  el.muted = true;
  el.defaultMuted = true;
  el.playsInline = true;
  el.setAttribute("muted", "");
  el.setAttribute("playsinline", "");
  el.setAttribute("webkit-playsinline", "");
}

function playWhenReady(el: HTMLVideoElement, signal: { cancelled: boolean }) {
  armMutedInline(el);

  let removeReady: (() => void) | undefined;
  let raf = 0;

  const tryPlay = () => {
    if (signal.cancelled) return;
    armMutedInline(el);
    void el.play().catch(() => {});
  };

  /* Wait a frame so the slide is opacity:1 before Safari evaluates autoplay. */
  raf = requestAnimationFrame(() => {
    if (signal.cancelled) return;

    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlay();
      return;
    }

    const onReady = () => tryPlay();
    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    removeReady = () => {
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
    };

    if (el.readyState < HTMLMediaElement.HAVE_METADATA) {
      try {
        el.load();
      } catch {
        /* ignore */
      }
    }
  });

  return () => {
    cancelAnimationFrame(raf);
    removeReady?.();
  };
}

/** Half-section media carousel — mixes photos and muted looping videos. */
export function Slideshow({ slides, label }: { slides: Slide[]; label?: string }) {
  const { locale } = useDemo();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const count = slides.length;

  const setVideoRef = useCallback((index: number, el: HTMLVideoElement | null) => {
    if (el) {
      armMutedInline(el);
      videoRefs.current.set(index, el);
    } else {
      videoRefs.current.delete(index);
    }
  }, []);

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

  /*
   * Keep <video> nodes mounted (don’t remount on slide change).
   * Safari iOS often refuses play() on a freshly mounted element with preload=none.
   */
  useEffect(() => {
    const signal = { cancelled: false };
    const cleanups: Array<() => void> = [];

    videoRefs.current.forEach((v, i) => {
      if (i === active && inView) {
        cleanups.push(playWhenReady(v, signal));
      } else {
        v.pause();
      }
    });

    return () => {
      signal.cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [active, inView]);

  const go = (i: number) => setActive((i + count) % count);

  const onSwipe = useCallback(
    (direction: 1 | -1) => {
      setPaused(true);
      setActive((i) => (i + direction + count) % count);
    },
    [count]
  );

  useSwipeIndex(stageRef, {
    count,
    onSwipe,
    onInteract: () => setPaused(true),
  });

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
      <div ref={stageRef} className="vh-slideshow-stage">
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
                  draggable={false}
                />
              ) : (
                <>
                  <Image
                    src={s.poster}
                    alt={on ? s.alt : ""}
                    fill
                    quality={IMAGE_QUALITY.gallery}
                    sizes="(max-width: 900px) 100vw, 46vw"
                    className="vh-photo vh-slide-poster"
                    draggable={false}
                  />
                  <video
                    ref={(el) => setVideoRef(i, el)}
                    className="vh-slide-video"
                    muted
                    loop
                    playsInline
                    preload={Math.abs(i - active) <= 1 ? "auto" : "metadata"}
                    poster={s.poster}
                    draggable={false}
                  >
                    <source src={s.src} type="video/mp4" />
                  </video>
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
