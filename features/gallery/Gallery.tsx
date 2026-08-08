"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Photo } from "@/types/property";
import type { Locale } from "@/types/locale";
import { tx } from "@/lib/i18n";
import { IMAGE_QUALITY } from "@/lib/images";
import { useDemo } from "@/features/demo/DemoProvider";

type GalleryProps = {
  photos: Photo[];
  locale: Locale;
};

/** High-value frames for the bento preview (pool / garden / lounge first). */
const FEATURED_KEYS = [
  "pool-night-1",
  "pool-gathering",
  "terrace-upper",
  "living-1",
  "garden-bbq",
] as const;

function pickFeatured(photos: Photo[]): Photo[] {
  const picked: Photo[] = [];
  for (const key of FEATURED_KEYS) {
    const hit = photos.find((p) => p.src.includes(key));
    if (hit && !picked.some((p) => p.src === hit.src)) picked.push(hit);
    if (picked.length >= 5) break;
  }
  // Fill if any key missing
  for (const p of photos) {
    if (picked.length >= 5) break;
    if (!picked.some((x) => x.src === p.src)) picked.push(p);
  }
  return picked;
}

/** Luxury bento gallery — 1 large + 4 small, single CTA, full lightbox. */
export function Gallery({ photos, locale }: GalleryProps) {
  const { ui } = useDemo();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const featured = useMemo(() => pickFeatured(photos), [photos]);
  const lead = featured[0];
  const sides = featured.slice(1, 5);

  const show = (i: number) => {
    if (i < 0) return;
    setIndex(i);
    setOpen(true);
  };

  const showPhoto = (photo: Photo) => {
    show(photos.findIndex((p) => p.src === photo.src));
  };

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  useEffect(() => {
    if (!open) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.changedTouches[0]?.clientX ?? 0;
    };
    const onEnd = (e: TouchEvent) => {
      const x = e.changedTouches[0]?.clientX ?? startX;
      const dx = x - startX;
      if (Math.abs(dx) < 48) return;
      if (dx < 0) next();
      else prev();
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [open, next, prev]);

  if (!photos.length || !lead) return null;
  const current = photos[index];

  const ctaLabel =
    locale === "sr"
      ? `Pogledaj sve fotografije (${photos.length})`
      : `View all photos (${photos.length})`;

  const lightbox =
    open && current && mounted
      ? createPortal(
          <div
            className="vh-lb"
            role="dialog"
            aria-modal="true"
            aria-label={ui.gallery.dialog}
            onClick={close}
          >
            <button
              type="button"
              className="vh-lb-close"
              onClick={close}
              aria-label={ui.gallery.close}
            >
              ✕
            </button>
            <span className="vh-lb-count" aria-live="polite">
              {index + 1} / {photos.length}
            </span>
            <button
              type="button"
              className="vh-lb-nav vh-lb-prev"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={ui.gallery.prev}
            >
              ‹
            </button>
            <figure className="vh-lb-figure" onClick={(e) => e.stopPropagation()}>
              <div className="vh-lb-frame">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={tx(current.alt, locale)}
                  fill
                  sizes="(max-width: 900px) 96vw, 1100px"
                  quality={IMAGE_QUALITY.hero}
                  className="vh-lb-img"
                  priority
                />
              </div>
              <figcaption className="vh-lb-caption">
                {tx(current.caption, locale)}
              </figcaption>
            </figure>
            <button
              type="button"
              className="vh-lb-nav vh-lb-next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label={ui.gallery.next}
            >
              ›
            </button>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="vh-bento">
        <button
          type="button"
          className="vh-bento-lead"
          onClick={() => showPhoto(lead)}
          aria-label={`${ui.gallery.open} — ${tx(lead.caption, locale)}`}
        >
          <Image
            src={lead.src}
            alt={tx(lead.alt, locale)}
            fill
            priority
            quality={IMAGE_QUALITY.gallery}
            sizes="(max-width: 900px) 100vw, 55vw"
            className="vh-photo"
          />
        </button>

        <div className="vh-bento-side">
          {sides.map((photo, i) => {
            const isLast = i === sides.length - 1;
            if (isLast) {
              return (
                <div key={photo.src} className="vh-bento-tile vh-bento-tile--cta">
                  <Image
                    src={photo.src}
                    alt={tx(photo.alt, locale)}
                    fill
                    quality={IMAGE_QUALITY.gallery}
                    sizes="(max-width: 900px) 50vw, 22vw"
                    className="vh-photo"
                  />
                  <button
                    type="button"
                    className="vh-bento-cta"
                    onClick={() => show(0)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    {ctaLabel}
                  </button>
                </div>
              );
            }
            return (
              <button
                type="button"
                key={photo.src}
                className="vh-bento-tile"
                onClick={() => showPhoto(photo)}
                aria-label={`${ui.gallery.open} — ${tx(photo.caption, locale)}`}
              >
                <Image
                  src={photo.src}
                  alt={tx(photo.alt, locale)}
                  fill
                  quality={IMAGE_QUALITY.gallery}
                  sizes="(max-width: 900px) 50vw, 22vw"
                  className="vh-photo"
                />
              </button>
            );
          })}
        </div>
      </div>
      {lightbox}
    </>
  );
}
