"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";
import { GuestBookOrbit } from "./GuestBookOrbit";

const QUOTE_MS = 6500;

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
      <div className="vh-story-quote-slot">
        {items.map((item, idx) => (
          <figure
            key={item.name}
            className={`vh-story-quote${idx === i ? " is-on" : ""}`}
            aria-hidden={idx !== i}
          >
            <div
              className="vh-story-quote-stars"
              aria-label={
                idx === i
                  ? ui.a11y.rating.replace("{n}", String(item.stars))
                  : undefined
              }
            >
              {"★".repeat(item.stars)}
            </div>
            <blockquote>{tx(item.text, locale)}</blockquote>
            <figcaption>
              {item.name} · {tx(item.place, locale)}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/** Invitation to return — copy above, guestbook ring full-width below. */
export function ReviewsSection() {
  const { locale } = useDemo();

  return (
    <section id="utisci" className="vh-story vh-story--flip vh-reviews-orbit">
      <div className="vh-wrap vh-reviews-orbit-head">
        <Reveal>
          <h2 className="vh-story-title">
            {t3(
              locale,
              "Poziv da se vratite",
              "An invitation to return",
              "Приглашение вернуться"
            )}
          </h2>
          <p className="vh-story-body">
            {t3(
              locale,
              "Priča se ne završava odlaskom. Gosti koji su bili ovde nose deo Ville Charm sa sobom — a mnogi se vraćaju.",
              "The story doesn’t end when you leave. Guests who stay here take a piece of Villa Charm with them — and many return.",
              "История не заканчивается с отъездом. Гости увозят с собой частичку Villa Charm — и многие возвращаются."
            )}
          </p>
          <p className="vh-story-body">
            {t3(
              locale,
              "Ako želite da napišete svoje poglavlje, javite nam se.",
              "If you want to write your own chapter, reach out.",
              "Если хотите написать свою главу, напишите нам."
            )}
          </p>
          <ReviewProof />
        </Reveal>
      </div>
      <GuestBookOrbit />
    </section>
  );
}
