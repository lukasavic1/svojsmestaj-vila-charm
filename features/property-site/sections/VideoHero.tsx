"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { heroVideo } from "@/data/heroMedia";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { t3, tx } from "@/lib/i18n";

const SLIDE_MS = 2800;
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
 * boot  → short loader
 * video → clip (paused when hero leaves viewport — smoother scroll)
 * stills → slideshow only if autoplay blocked
 */
export function VideoHero() {
  const { unit, locale } = useDemo();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const phaseRef = useRef<Phase>("boot");
  const [phase, setPhase] = useState<Phase>("boot");
  const [slide, setSlide] = useState(0);
  const [mountVideo, setMountVideo] = useState(true);
  const [inView, setInView] = useState(true);

  const setPhaseSafe = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  /* Pause media via IO — avoid React re-renders / CSS thrash mid-scroll */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    let visible = true;
    const syncMedia = (next: boolean) => {
      if (next === visible) return;
      visible = next;
      root.classList.toggle("is-away", !next);

      const el = videoRef.current;
      if (el && phaseRef.current === "video") {
        if (next) {
          el.playbackRate = 0.75;
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      }

      setInView(next);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        /* Hysteresis: pause early, resume only when clearly back */
        if (visible) {
          syncMedia(entry.intersectionRatio > 0.08);
        } else {
          syncMedia(entry.isIntersecting && entry.intersectionRatio > 0.22);
        }
      },
      { threshold: [0, 0.08, 0.22, 0.4] }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "stills" || !inView) return;
    const id = window.setInterval(() => {
      setSlide((i) => (i + 1) % FALLBACK_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [phase, inView]);

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
      setPhaseSafe("video");
    };

    const toStills = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      stopVideoLoad(el);
      setMountVideo(false);
      setPhaseSafe("stills");
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
      ref={sectionRef}
      className={`vh-hero${
        phase === "stills" ? " vh-hero--stills" : phase === "boot" ? " vh-hero--boot" : ""
      }`}
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
        <span className="vh-hero-accent" aria-hidden="true" />
        <p className="vh-hero-kicker">
          {t3(
            locale,
            "Privatno imanje · Barajevo",
            "Private estate · Barajevo",
            "Частная усадьба · Бараево"
          )}
        </p>
        <h1 className="vh-hero-title">
          <span className="vh-hero-title-line vh-hero-title-line--a">Villa</span>
          <span className="vh-hero-title-connector" aria-hidden="true">
            ✦
          </span>
          <span className="vh-hero-title-line vh-hero-title-line--b">Charm</span>
        </h1>
        <p className="vh-hero-softline">
          <span className="vh-hero-softline-full">
            {t3(
              locale,
              "Tišina koja leči — dobrodošli u oazu mira",
              "Silence that heals — welcome to an oasis of calm",
              "Тишина, которая лечит — добро пожаловать в оазис покоя"
            )}
          </span>
          <span className="vh-hero-softline-short">
            {t3(
              locale,
              "Tišina koja leči",
              "Silence that heals",
              "Тишина, которая лечит"
            )}
          </span>
        </p>
        <ul className="vh-hero-coords" aria-label={t3(locale, "Koordinate mira", "Coordinates of calm", "Координаты покоя")}>
          <li>{t3(locale, "2.000 m² privatnosti", "2,000 m² of privacy", "2 000 м² уединения")}</li>
          <li>{t3(locale, "25 min od grada", "25 min from the city", "25 мин от города")}</li>
          <li>{t3(locale, "Grejani bazen", "Heated pool", "Бассейн с подогревом")}</li>
          <li>{t3(locale, "Do 10 gostiju", "Up to 10 guests", "До 10 гостей")}</li>
        </ul>
      </div>
    </section>
  );
}
