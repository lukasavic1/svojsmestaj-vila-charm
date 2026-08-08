"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { heroVideo } from "@/data/heroMedia";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx } from "@/lib/i18n";

/** Bright pool video hero — high-converting luxury opener. */
export function VideoHero() {
  const { unit, locale, ui, bookUnit } = useDemo();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.playbackRate = 0.75;

    const tryPlay = () => {
      void el.play().catch(() => {});
    };

    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
    };
  }, [failed]);

  return (
    <section className="vh-hero" aria-label={tx(unit.name, locale)}>
      <div className="vh-hero-media" aria-hidden="true">
        {!failed ? (
          <video
            ref={videoRef}
            className="vh-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroVideo.poster}
            onError={() => setFailed(true)}
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={heroVideo.poster}
            alt=""
            fill
            priority
            quality={IMAGE_QUALITY.hero}
            sizes="100vw"
            className="vh-hero-fallback"
          />
        )}
        <div className="vh-hero-veil" />
      </div>

      <div className="vh-hero-content vh-hero-content--animate">
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
