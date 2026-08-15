"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { GALLERY_EXCLUDE } from "@/data/heroMedia";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { Gallery } from "@/features/gallery/Gallery";
import { t3, tx } from "@/lib/i18n";
import { IMAGE_QUALITY } from "@/lib/images";
import { useDragScroll, wasDragged } from "@/lib/useDragScroll";

const LIGHTBOX_ORDER = [
  "pool-night-1",
  "pool-gathering",
  "pool-night-2",
  "terrace-upper",
  "garden-bbq",
  "garden-fountain",
  "garden-upper-path",
  "living-1",
  "dining-1",
  "kitchen-1",
  "bedroom-1",
  "canopy-bed",
  "library-1",
  "entrance",
  "terrace-lower-1",
  "bbq-1",
  "garden-lower-1",
  "living-2",
  "arch-dining",
  "attic-lounge",
  "bedroom-2a",
  "attic-bedroom",
  "bathroom-1",
  "hallway-1",
];

function CinemaStrip() {
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

  const openAt = useCallback((index: number) => {
    setActive(index);
    setReady(false);
    setOpen(true);
  }, []);

  const goTo = useCallback((index: number) => {
    setActive(index);
    const slide = trackRef.current?.children[index] as HTMLElement | undefined;
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
        const midpoint = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let nearestDistance = Infinity;

        slides.forEach((slide, index) => {
          const center = slide.offsetLeft + slide.offsetWidth / 2;
          const distance = Math.abs(center - midpoint);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = index;
          }
        });
        setActive(nearest);
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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || !videoRef.current) return;
    const video = videoRef.current;
    video.load();
    void video.play().catch(() => {});
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
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="vh-cinema-close"
                onClick={close}
                aria-label={t3(locale, "Zatvori", "Close", "Закрыть")}
              >
                ✕
              </button>
              {!ready && (
                <div className="vh-cinema-loading" aria-live="polite">
                  {t3(
                    locale,
                    "Učitavanje videa…",
                    "Loading video…",
                    "Загрузка видео…"
                  )}
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
    <>
      <Reveal className="vh-cinema-stage">
        <div
          ref={trackRef}
          className="vh-cinema-slider"
          aria-label={t3(locale, "Video klizač", "Video slider", "Слайдер видео")}
        >
          {videos.map((video, index) => (
            <div
              key={video.src}
              role="button"
              tabIndex={0}
              className={`vh-cinema-slide${index === active ? " is-on" : ""}`}
              onClick={() => {
                if (!wasDragged(trackRef.current)) openAt(index);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openAt(index);
                }
              }}
              aria-label={t3(
                locale,
                `Pusti: ${tx(video.title, locale)}`,
                `Play: ${tx(video.title, locale)}`,
                `Смотреть: ${tx(video.title, locale)}`
              )}
              aria-current={index === active ? "true" : undefined}
            >
              <Image
                src={video.poster}
                alt=""
                fill
                draggable={false}
                quality={IMAGE_QUALITY.gallery}
                sizes="(max-width: 767px) 88vw, 900px"
                className="vh-photo"
                priority={index === 0}
              />
              <span className="vh-cinema-veil" aria-hidden="true" />
              <span className="vh-play" aria-hidden="true">
                ▶
              </span>
              <span className="vh-cinema-meta">
                <strong>{tx(video.title, locale)}</strong>
                <span>{tx(video.caption, locale)}</span>
              </span>
            </div>
          ))}
        </div>

        {videos.length > 1 && (
          <div
            className="vh-cinema-dots"
            role="tablist"
            aria-label={t3(locale, "Izbor filma", "Choose film", "Выбор фильма")}
          >
            {videos.map((video, index) => (
              <button
                key={`dot-${video.src}`}
                type="button"
                role="tab"
                className={`vh-cinema-dot${index === active ? " is-on" : ""}`}
                aria-selected={index === active}
                aria-label={tx(video.title, locale)}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        )}
      </Reveal>
      {modal}
    </>
  );
}

/** Chapter three — films and photography in one editorial album. */
export function AlbumSection() {
  const { unit, locale } = useDemo();

  const photos = useMemo(() => {
    const filtered = unit.photos.filter(
      (photo) => !GALLERY_EXCLUDE.some((key) => photo.src.includes(key))
    );
    return [...filtered].sort((a, b) => {
      const aIndex = LIGHTBOX_ORDER.findIndex((key) => a.src.includes(key));
      const bIndex = LIGHTBOX_ORDER.findIndex((key) => b.src.includes(key));
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    });
  }, [unit.photos]);

  return (
    <section className="vh-album" id="galerija" aria-labelledby="album-title">
      <div className="vh-wrap">
        <Reveal className="vh-album-head">
          <h2 id="album-title">
            {t3(
              locale,
              "Slike koje pamte više od nas.",
              "Images that remember more than we do.",
              "Кадры, которые помнят больше нас."
            )}
          </h2>
          <p>
            {t3(
              locale,
              "Svaka fotografija je trenutak koji je neko drugi već doživeo — večera u sumrak, prvi skok u bazen, jutro na terasi. Pogledajte ih, pa dođite da napravite svoje.",
              "Every photo is a moment someone else has already lived — dinner at dusk, the first dive into the pool, morning on the terrace. Look through them, then come make your own.",
              "Каждый кадр — момент, который уже кто-то прожил: ужин в сумерках, первый прыжок в бассейн, утро на террасе. Посмотрите их — и приезжайте создать свои."
            )}
          </p>
        </Reveal>

        <Reveal className="vh-album-video-head">
          <p>
            {t3(
              locale,
              "Najpre nekoliko trenutaka u pokretu.",
              "First, a few moments in motion.",
              "Сначала — несколько мгновений в движении."
            )}
          </p>
        </Reveal>
        <CinemaStrip />

        <Reveal className="vh-album-gallery">
          <Gallery photos={photos} locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
