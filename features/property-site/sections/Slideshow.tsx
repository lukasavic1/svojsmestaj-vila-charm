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

/**
 * Safari often sits at HAVE_METADATA for off-slide videos and never fires
 * canplay unless load()/play() nudges the network. Keep trying briefly.
 */
function playWhenReady(el: HTMLVideoElement, signal: { cancelled: boolean }) {
  armMutedInline(el);

  let removeReady: (() => void) | undefined;
  let raf = 0;
  const timers: number[] = [];

  const tryPlay = () => {
    if (signal.cancelled) return;
    if (!el.paused && !el.ended && el.currentTime > 0) return;
    armMutedInline(el);
    void el.play().catch(() => {});
  };

  const armReady = () => {
    const onReady = () => tryPlay();
    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    el.addEventListener("canplaythrough", onReady);
    el.addEventListener("progress", onReady);
    removeReady = () => {
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("canplaythrough", onReady);
      el.removeEventListener("progress", onReady);
    };
  };

  raf = requestAnimationFrame(() => {
    if (signal.cancelled) return;

    armReady();

    /* Don't call load() while a fetch is in flight — it aborts ~95MB buffers. */
    const idle =
      el.networkState === HTMLMediaElement.NETWORK_EMPTY ||
      el.networkState === HTMLMediaElement.NETWORK_IDLE;
    if (el.readyState < HTMLMediaElement.HAVE_CURRENT_DATA && idle) {
      try {
        el.load();
      } catch {
        /* ignore */
      }
    }

    tryPlay();

    /* Large clips (e.g. ~95MB tour) need repeated kicks on cellular Safari. */
    for (const ms of [120, 400, 900, 2000, 4000, 7000]) {
      timers.push(window.setTimeout(tryPlay, ms));
    }
  });

  return () => {
    cancelAnimationFrame(raf);
    timers.forEach((id) => window.clearTimeout(id));
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

  /* Prefetch every clip in this carousel once visible — Safari won't
   * buffer opacity:0 / far slides with preload=metadata alone. */
  useEffect(() => {
    if (!inView) return;
    videoRefs.current.forEach((v, i) => {
      armMutedInline(v);
      v.preload = "auto";
      if (i === active) return;
      const idle =
        v.networkState === HTMLMediaElement.NETWORK_EMPTY ||
        v.networkState === HTMLMediaElement.NETWORK_IDLE;
      if (v.readyState < HTMLMediaElement.HAVE_CURRENT_DATA && idle) {
        try {
          v.load();
        } catch {
          /* ignore */
        }
      }
    });
  }, [inView, active, count]);

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
                    src={s.src}
                    muted
                    loop
                    playsInline
                    preload={inView ? "auto" : "metadata"}
                    poster={s.poster}
                    draggable={false}
                  />
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
