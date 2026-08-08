"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";
import type { Unit } from "@/types/property";
import { AmenityIcon } from "@/components/ui/AmenityIcon";
import { Modal } from "@/components/ui/Modal";
import { useDemo } from "@/features/demo/DemoProvider";
import { IMAGE_QUALITY } from "@/lib/images";
import { tx } from "@/lib/i18n";

type Props = {
  unit: Unit;
  open: boolean;
  onClose: () => void;
};

export function UnitQuickView({ unit, open, onClose }: Props) {
  const { locale, ui, bookUnit } = useDemo();
  const [photoIdx, setPhotoIdx] = useState(0);
  const photos = unit.photos;
  const touch = useRef<{ x: number; y: number } | null>(null);
  const name = tx(unit.name, locale);

  useEffect(() => {
    setPhotoIdx(0);
  }, [unit.id]);

  if (!open) return null;

  const book = () => {
    bookUnit(unit.id);
    onClose();
  };

  const onGalleryTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    touch.current = { x: t.clientX, y: t.clientY };
  };

  const onGalleryTouchEnd = (e: TouchEvent) => {
    if (!touch.current || photos.length < 2) {
      touch.current = null;
      return;
    }
    const t = e.changedTouches[0];
    if (!t) {
      touch.current = null;
      return;
    }
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    setPhotoIdx((i) =>
      dx < 0
        ? (i + 1) % photos.length
        : (i - 1 + photos.length) % photos.length
    );
  };

  const specs = [
    `${unit.specs.capacity} ${ui.booking.guestsLabel}`,
    unit.specs.bedrooms > 0
      ? `${unit.specs.bedrooms} ${ui.booking.bedrooms}`
      : "Studio",
    `${unit.specs.bathrooms} ${ui.booking.bathrooms}`,
    `${unit.specs.sizeSqm} ${ui.booking.size}`,
  ];

  return (
    <Modal
      open={open}
      title={name}
      onClose={onClose}
      closeLabel={ui.gallery.close}
      panelClassName="modal-panel--quickview"
      titleHidden
    >
      <div className="qv">
        <div className="qv-scroll">
          <div
            className="qv-gallery"
            onTouchStart={onGalleryTouchStart}
            onTouchEnd={onGalleryTouchEnd}
          >
            <div className="qv-media">
              {photos.map((p, i) => (
                <Image
                  key={p.src}
                  src={p.src}
                  alt={tx(p.alt, locale)}
                  fill
                  quality={IMAGE_QUALITY.gallery}
                  sizes="(max-width: 639px) 100vw, (max-width: 720px) 95vw, 680px"
                  priority={i === 0}
                  loading={i < 3 ? "eager" : "lazy"}
                  className={`qv-img${i === photoIdx ? " is-active" : ""}`}
                />
              ))}
              <div className="qv-media-veil" aria-hidden="true" />
            </div>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  className="qv-nav qv-nav--prev"
                  aria-label={ui.gallery.prev}
                  onClick={() =>
                    setPhotoIdx((i) => (i - 1 + photos.length) % photos.length)
                  }
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="qv-nav qv-nav--next"
                  aria-label={ui.gallery.next}
                  onClick={() => setPhotoIdx((i) => (i + 1) % photos.length)}
                >
                  ›
                </button>
                <div className="qv-dots" aria-hidden="true">
                  {photos.map((p, i) => (
                    <button
                      key={p.src}
                      type="button"
                      className={i === photoIdx ? "is-on" : ""}
                      onClick={() => setPhotoIdx(i)}
                    />
                  ))}
                </div>
                <p className="qv-counter" aria-hidden="true">
                  {photoIdx + 1} / {photos.length}
                </p>
              </>
            )}
          </div>

          <div className="qv-main">
            <p className="qv-region">{tx(unit.region, locale)}</p>
            <h3 className="qv-heading">{name}</h3>
            <p className="qv-summary">{tx(unit.specs.summary, locale)}</p>

            <ul className="qv-specs" aria-label={ui.units.details}>
              {specs.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>

            <p className="qv-beds">
              <strong>{ui.booking.beds}</strong>
              <span>{tx(unit.specs.beds, locale)}</span>
            </p>

            <div className="qv-amenities-block">
              <h4 className="qv-sub">{ui.booking.amenities}</h4>
              <ul className="qv-amenities">
                {unit.amenities.items.map((a) => (
                  <li key={tx(a.label, locale)}>
                    <span className="amen-icon" aria-hidden="true">
                      <AmenityIcon id={a.icon} />
                    </span>
                    <span>{tx(a.label, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="qv-foot">
          <p className="qv-foot-price">
            <strong>{tx(unit.price.amount, locale)}</strong>
            <span>{ui.booking.perNight}</span>
          </p>
          <button
            type="button"
            className="btn btn-solid btn-glow qv-book"
            onClick={book}
          >
            {ui.units.bookThis}
          </button>
        </div>
      </div>
    </Modal>
  );
}
