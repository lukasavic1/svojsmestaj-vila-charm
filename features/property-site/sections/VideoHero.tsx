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
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
    el.playbackRate = 0.75;

    const tryPlay = () => {
      const p = el.play();
      if (p !== undefined) {
        void p
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(!el.paused);
    const onPlaying = () => setPlaying(true);

    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("play", onPlay);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("pause", onPause);

    /* Retry after tab focus / Low Power Mode gesture window */
    const onVis = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [failed]);

  const startFromGesture = () => {
    const el = videoRef.current;
    if (!el || failed) return;
    el.muted = true;
    void el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

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
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback"
            onError={() => setFailed(true)}
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
        ) : null}

        {/* Poster covers native iOS play glyph when autoplay is blocked */}
        {(failed || !playing) && (
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

        {!failed && !playing ? (
          <button
            type="button"
            className="vh-hero-tap"
            onClick={startFromGesture}
            aria-label={locale === "sr" ? "Pokreni video" : "Play video"}
          />
        ) : null}

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
