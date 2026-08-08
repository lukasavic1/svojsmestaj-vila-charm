"use client";

import Image from "next/image";
import type { Unit } from "@/types/property";
import { tx } from "@/lib/i18n";
import { IMAGE_QUALITY } from "@/lib/images";
import { useDemo } from "@/features/demo/DemoProvider";

type Props = {
  unit: Unit;
  onSelect: () => void;
};

export function UnitCard({ unit, onSelect }: Props) {
  const { locale, ui } = useDemo();
  const cover = unit.photos[0];
  const s = unit.specs;

  return (
    <button type="button" className="stay-card" onClick={onSelect}>
      <div className="stay-card-media">
        <Image
          src={cover.src}
          alt={tx(cover.alt, locale)}
          fill
          quality={IMAGE_QUALITY.card}
          sizes="(max-width: 720px) 82vw, 33vw"
          className="stay-card-img"
        />
      </div>

      <div className="stay-card-body">
        <header className="stay-card-head">
          <h3>{tx(unit.name, locale)}</h3>
          <p className="stay-card-price">
            <span>
              {ui.booking.fromPrice} {unit.price.perNightEur} €
            </span>
            <small>{ui.booking.perNight}</small>
          </p>
        </header>

        <p className="stay-card-summary">{tx(s.summary, locale)}</p>

        <ul className="stay-card-meta">
          <li>
            {s.capacity} {ui.booking.guestsLabel}
          </li>
          <li>
            {s.bedrooms > 0
              ? `${s.bedrooms} ${ui.booking.bedrooms}`
              : "Studio"}
          </li>
          <li>
            {s.bathrooms} {ui.booking.bathrooms}
          </li>
          <li>
            {s.sizeSqm} {ui.booking.size}
          </li>
        </ul>

        <p className="stay-card-beds">
          <strong>{ui.booking.beds}:</strong> {tx(s.beds, locale)}
        </p>

        <ul className="stay-card-amenities">
          {unit.amenities.items.slice(0, 5).map((a) => (
            <li key={tx(a.label, locale)}>{tx(a.label, locale)}</li>
          ))}
        </ul>
      </div>
    </button>
  );
}
