"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import type { Unit } from "@/types/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx } from "@/lib/i18n";
import { useSwipeIndex } from "@/lib/useSwipeIndex";

type Props = {
  unit: Unit;
  onOpen: () => void;
};

/** Stacked images so carousel swaps are instant (no re-fetch flash). */
export function DiscoveryCard({ unit, onOpen }: Props) {
  const { locale, ui } = useDemo();
  const [photoIdx, setPhotoIdx] = useState(0);
  const photos = unit.photos;
  const mediaRef = useRef<HTMLDivElement>(null);
  const swiped = useRef(false);

  const step = (e: MouseEvent, delta: number) => {
    e.stopPropagation();
    e.preventDefault();
    setPhotoIdx((i) => (i + delta + photos.length) % photos.length);
  };

  const onSwipe = useCallback(
    (direction: 1 | -1) => {
      swiped.current = true;
      setPhotoIdx((i) => (i + direction + photos.length) % photos.length);
    },
    [photos.length]
  );

  useSwipeIndex(mediaRef, {
    count: photos.length,
    onSwipe,
    threshold: 40,
  });

  const openCard = () => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    onOpen();
  };

  return (
    <article
      className="discovery-card"
      role="button"
      tabIndex={0}
      onClick={openCard}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`${ui.units.details} — ${tx(unit.name, locale)}`}
    >
      <div ref={mediaRef} className="discovery-media">
        {photos.map((p, i) => (
          <Image
            key={p.src}
            src={p.src}
            alt={tx(p.alt, locale)}
            fill
            quality={IMAGE_QUALITY.card}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            loading={i < 2 ? "eager" : "lazy"}
            draggable={false}
            className={`discovery-img${i === photoIdx ? " is-active" : ""}`}
          />
        ))}
        <span className="discovery-shade" aria-hidden="true" />

        {photos.length > 1 && (
          <>
            <button
              type="button"
              className="discovery-nav discovery-nav--prev"
              aria-label={ui.gallery.prev}
              onClick={(e) => step(e, -1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="discovery-nav discovery-nav--next"
              aria-label={ui.gallery.next}
              onClick={(e) => step(e, 1)}
            >
              ›
            </button>
            <div className="discovery-dots" aria-hidden="true">
              {photos.slice(0, 6).map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  className={i === photoIdx ? "is-on" : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIdx(i);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="discovery-body">
        <div className="discovery-top">
          <h3 className="discovery-name">{tx(unit.name, locale)}</h3>
          <p className="discovery-price-inline">
            <strong>{tx(unit.price.amount, locale)}</strong>
            <span>{ui.booking.perNight}</span>
          </p>
        </div>
        <p className="discovery-summary">{tx(unit.specs.summary, locale)}</p>
        <div className="discovery-meta">
          <span>
            {unit.specs.capacity} {ui.booking.guestsLabel}
          </span>
          <span>
            {unit.specs.bedrooms > 0
              ? `${unit.specs.bedrooms} ${ui.booking.bedrooms}`
              : "Studio"}
          </span>
          <span>
            {unit.specs.sizeSqm} {ui.booking.size}
          </span>
        </div>
        <div className="discovery-actions">
          <span className="btn btn-solid btn-glow" aria-hidden="true">
            {ui.units.details}
          </span>
        </div>
      </div>
    </article>
  );
}
