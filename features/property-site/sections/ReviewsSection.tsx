"use client";

import { useEffect, useState } from "react";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";
import { StorySection } from "./StorySection";
import type { Slide } from "./Slideshow";

const QUOTE_MS = 6500;

/** Rotating guest quote + rating — keeps the social proof inside the story copy. */
function ReviewProof() {
  const { locale, ui } = useDemo();
  const reviews = property.reviews;
  const items = reviews.items;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % items.length),
      QUOTE_MS
    );
    return () => window.clearInterval(id);
  }, [items.length]);

  const r = items[i];
  const score = reviews.google.score.toFixed(2);

  return (
    <div className="vh-story-proof">
      <p className="vh-reviews-pill vh-story-rating">
        {t3(
          locale,
          `★ ${score} / 5.0 · 30+ ocena na Airbnb & Google-u`,
          `★ ${score} / 5.0 · 30+ reviews on Airbnb & Google`,
          `★ ${score} / 5.0 · 30+ оценок на Airbnb & Google`
        )}
      </p>
      <figure className="vh-story-quote" key={r.name}>
        <div
          className="vh-story-quote-stars"
          aria-label={ui.a11y.rating.replace("{n}", String(r.stars))}
        >
          {"★".repeat(r.stars)}
        </div>
        <blockquote>{tx(r.text, locale)}</blockquote>
        <figcaption>
          {r.name} · {tx(r.place, locale)}
        </figcaption>
      </figure>
    </div>
  );
}

/** Chapter four — the invitation to return. Slideshow left, text right. */
export function ReviewsSection() {
  const { locale } = useDemo();

  const slides: Slide[] = [
    {
      kind: "image",
      src: "/images/living-1.jpg",
      alt: t3(locale, "Dnevni boravak", "Living room", "Гостиная"),
    },
    {
      kind: "image",
      src: "/images/dining-1.jpg",
      alt: t3(locale, "Trpezarija", "Dining room", "Столовая"),
    },
    {
      kind: "image",
      src: "/images/kitchen-1.jpg",
      alt: t3(locale, "Kuhinja", "Kitchen", "Кухня"),
    },
    {
      kind: "image",
      src: "/images/canopy-bed.jpg",
      alt: t3(locale, "Spavaća soba", "Bedroom", "Спальня"),
    },
    {
      kind: "image",
      src: "/images/library-1.jpg",
      alt: t3(locale, "Biblioteka", "Library", "Библиотека"),
    },
    {
      kind: "image",
      src: "/images/garden-lower-1.jpg",
      alt: t3(locale, "Donja bašta", "Lower garden", "Нижний сад"),
    },
  ];

  return (
    <StorySection
      id="utisci"
      flip
      title={t3(
        locale,
        "Poziv da se vratite",
        "An invitation to return",
        "Приглашение вернуться"
      )}
      body={[
        t3(
          locale,
          "Priča se ne završava odlaskom. Gosti koji su bili ovde nose deo Ville Charm sa sobom — a mnogi se vraćaju.",
          "The story doesn’t end when you leave. Guests who stay here take a piece of Villa Charm with them — and many return.",
          "История не заканчивается с отъездом. Гости увозят с собой частичку Villa Charm — и многие возвращаются."
        ),
        t3(
          locale,
          "Ako želite da napišete svoje poglavlje, javite nam se.",
          "If you want to write your own chapter, reach out.",
          "Если хотите написать свою главу, напишите нам."
        ),
      ]}
      slides={slides}
      mediaLabel={t3(
        locale,
        "Enterijer i bašta",
        "Interior and garden",
        "Интерьер и сад"
      )}
    >
      <ReviewProof />
    </StorySection>
  );
}
