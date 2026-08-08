"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx } from "@/lib/i18n";
import { useDragScroll, wasDragged } from "@/lib/useDragScroll";

/** Cinematic films — swipeable poster slider + modal player. */
export function VideoSection() {
  const { locale } = useDemo();
  const videos = property.videos;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const current = videos[active];

  useEffect(() => setMounted(true), []);
  useDragScroll(trackRef);

  const close = useCallback(() => {
    setOpen(false);
    setReady(false);
  }, []);

  const openAt = useCallback((i: number) => {
    setActive(i);
    setReady(false);
    setOpen(true);
  }, []);

  const goTo = useCallback((i: number) => {
    setActive(i);
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || videos.length < 2) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = Array.from(track.children) as HTMLElement[];
        if (!slides.length) return;
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        slides.forEach((el, i) => {
          const center = el.offsetLeft + el.offsetWidth / 2;
          const dist = Math.abs(center - mid);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActive(best);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [videos.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || !videoRef.current) return;
    const el = videoRef.current;
    el.load();
    void el.play().catch(() => {});
  }, [open, active]);

  if (!videos.length || !current) return null;

  const modal =
    open && mounted
      ? createPortal(
          <div className="vh-cinema-modal" role="presentation" onClick={close}>
            <div
              className="vh-cinema-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={tx(current.title, locale)}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="vh-cinema-close"
                onClick={close}
                aria-label={locale === "sr" ? "Zatvori" : "Close"}
              >
                ✕
              </button>
              {!ready && (
                <div className="vh-cinema-loading" aria-live="polite">
                  {locale === "sr" ? "Učitavanje videa…" : "Loading video…"}
                </div>
              )}
              <video
                ref={videoRef}
                key={current.src}
                className={`vh-cinema-player${ready ? " is-ready" : ""}`}
                controls
                playsInline
                preload="auto"
                poster={current.poster}
                onCanPlay={() => setReady(true)}
                onPlaying={() => setReady(true)}
              >
                <source src={current.src} type="video/mp4" />
              </video>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <section className="vh-cinema vh-cinema--sand" id="video" aria-labelledby="cinema-title">
      <div className="vh-wrap">
        <Reveal className="vh-cinema-head">
          <p className="vh-label">
            {locale === "sr" ? "Video" : "Film"}
          </p>
          <h2 id="cinema-title" className="vh-cinema-title">
            {locale === "sr" ? "Villa Charm u pokretu" : "Villa Charm in motion"}
          </h2>
          <p className="vh-cinema-lead">
            {locale === "sr"
              ? "Tri kratka filma — prevucite i pustite."
              : "Three short films — swipe and play."}
          </p>
        </Reveal>

        <Reveal className="vh-cinema-stage">
          <div
            ref={trackRef}
            className="vh-cinema-slider"
            aria-label={locale === "sr" ? "Video klizač" : "Video slider"}
          >
            {videos.map((v, i) => (
              <div
                key={v.src}
                role="button"
                tabIndex={0}
                className={`vh-cinema-slide${i === active ? " is-on" : ""}`}
                onClick={() => {
                  if (wasDragged(trackRef.current)) return;
                  openAt(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openAt(i);
                  }
                }}
                aria-label={
                  locale === "sr"
                    ? `Pusti: ${tx(v.title, locale)}`
                    : `Play: ${tx(v.title, locale)}`
                }
                aria-current={i === active ? "true" : undefined}
              >
                <Image
                  src={v.poster}
                  alt=""
                  fill
                  draggable={false}
                  quality={IMAGE_QUALITY.gallery}
                  sizes="(max-width: 767px) 88vw, 900px"
                  className="vh-photo"
                  priority={i === 0}
                />
                <span className="vh-cinema-veil" aria-hidden="true" />
                <span className="vh-play" aria-hidden="true">
                  ▶
                </span>
                <span className="vh-cinema-meta">
                  <strong>{tx(v.title, locale)}</strong>
                  <span>{tx(v.caption, locale)}</span>
                </span>
              </div>
            ))}
          </div>

          {videos.length > 1 && (
            <div
              className="vh-cinema-dots"
              role="tablist"
              aria-label={locale === "sr" ? "Izbor filma" : "Choose film"}
            >
              {videos.map((v, i) => (
                <button
                  key={`dot-${v.src}`}
                  type="button"
                  role="tab"
                  className={`vh-cinema-dot${i === active ? " is-on" : ""}`}
                  aria-selected={i === active}
                  aria-label={tx(v.title, locale)}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}
        </Reveal>
      </div>
      {modal}
    </section>
  );
}
