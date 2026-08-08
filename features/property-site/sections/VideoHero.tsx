"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { heroVideo } from "@/data/heroMedia";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx } from "@/lib/i18n";

const SLIDE_MS = 2800;
/** Fail over to stills quickly — success path exits boot on first `playing`. */
const STILLS_FALLBACK_MS = 380;

const FALLBACK_SLIDES = [
  "/images/pool-1.jpg",
  "/images/exterior-1.jpg",
  "/images/pool-night-1.jpg",
  "/images/living-1.jpg",
  "/images/terrace-upper.jpg",
] as const;

type Phase = "boot" | "video" | "stills";

function stopVideoLoad(el: HTMLVideoElement) {
  el.pause();
  el.removeAttribute("src");
  while (el.firstChild) el.removeChild(el.firstChild);
  el.load();
}

/**
 * boot  → dark hold (no photos)
 * video → clip playing (no slideshow flash before it)
 * stills → photo slideshow only after autoplay is confirmed blocked
 */
export function VideoHero() {
  const { unit, locale, ui, bookUnit } = useDemo();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("boot");
  const [slide, setSlide] = useState(0);
  const [mountVideo, setMountVideo] = useState(true);

  useEffect(() => {
    if (phase !== "stills") return;
    const id = window.setInterval(() => {
      setSlide((i) => (i + 1) % FALLBACK_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (!mountVideo) return;
    const el = videoRef.current;
    if (!el) return;

    let settled = false;
    let timer = 0;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
    el.playbackRate = 0.75;
    el.removeAttribute("poster");

    const toVideo = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      setPhase("video");
    };

    const toStills = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      stopVideoLoad(el);
      setMountVideo(false);
      setPhase("stills");
    };

    const tryPlay = () => {
      if (settled) return;
      const p = el.play();
      if (p !== undefined) void p.then(toVideo).catch(toStills);
    };

    timer = window.setTimeout(() => {
      if (settled) return;
      if (!el.paused && el.readyState >= 2) toVideo();
      else toStills();
    }, STILLS_FALLBACK_MS);

    tryPlay();
    el.addEventListener("playing", toVideo);
    el.addEventListener("error", toStills);

    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("playing", toVideo);
      el.removeEventListener("error", toStills);
    };
  }, [mountVideo]);

  return (
    <section
      className={`vh-hero${phase === "stills" ? " vh-hero--stills" : " vh-hero--boot"}`}
      aria-label={tx(unit.name, locale)}
    >
      <div className="vh-hero-media" aria-hidden="true">
        {phase === "stills" ? (
          <div className="vh-hero-slides">
            {FALLBACK_SLIDES.map((src, i) => (
              <div
                key={src}
                className={`vh-hero-slide${i === slide ? " is-on" : ""}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i < 2}
                  quality={IMAGE_QUALITY.hero}
                  sizes="100vw"
                  className="vh-hero-slide-img"
                />
              </div>
            ))}
          </div>
        ) : null}

        {mountVideo ? (
          <video
            ref={videoRef}
            className={`vh-hero-video${phase === "video" ? " is-on" : ""}`}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        ) : null}

        <div className="vh-hero-veil" />

        {phase === "boot" ? (
          <div className="vh-hero-loader" aria-hidden="true">
            <p className="vh-hero-loader-brand">Villa Charm</p>
            <span className="vh-hero-loader-bar" />
          </div>
        ) : null}
      </div>

      <div className="vh-hero-content">
        <p className="vh-hero-kicker">
          {locale === "sr" ? "Privatno imanje · Barajevo" : "Private estate · Barajevo"}
        </p>
        <h1 className="vh-hero-title">{tx(unit.name, locale)}</h1>
        <p className="vh-hero-tagline">
          {locale === "sr"
            ? "Bašta, grejani bazen i mir — samo 25 minuta od Beograda."
            : "Garden, heated pool, and quiet — just 25 minutes from Belgrade."}
        </p>
        <div className="vh-hero-actions">
          <button
            type="button"
            className="vh-btn vh-btn--bronze"
            onClick={() => bookUnit(unit.id)}
          >
            {ui.booking.checkAvailability}
          </button>
          <a className="vh-btn vh-btn--ghost" href="#galerija">
            {locale === "sr" ? "Pogledaj galeriju" : "View gallery"}
          </a>
        </div>
      </div>
    </section>
  );
}
