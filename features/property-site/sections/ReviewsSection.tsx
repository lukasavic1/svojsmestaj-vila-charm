"use client";

import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx } from "@/lib/i18n";

export function ReviewsSection() {
  const { locale, ui } = useDemo();
  const reviews = property.reviews;
  const badge = ui.reviews.googleBadge
    .replace("{score}", String(reviews.google.score))
    .replace("{count}", String(reviews.google.count));

  return (
    <section className="reviews-sec" id="utisci" aria-labelledby="utisci-naslov">
      <div className="wrap">
        <Reveal>
          <h2 className="sec-title" id="utisci-naslov">
            {tx(reviews.heading, locale)}
          </h2>
          <p className="sec-lead">{tx(reviews.lead, locale)}</p>
          <p
            className="google-rating"
            aria-label={`${tx(reviews.google.source, locale)} ${reviews.google.score}`}
          >
            {badge}
          </p>
        </Reveal>

        <ul className="reviews">
          {reviews.items.map((r, i) => (
            <Reveal key={r.name} as="li" delay={i * 70}>
              <article>
                <div
                  className="stars"
                  aria-label={ui.a11y.rating.replace("{n}", String(r.stars))}
                >
                  {"★".repeat(r.stars)}
                  {"☆".repeat(5 - r.stars)}
                </div>
                <blockquote>„{tx(r.text, locale)}“</blockquote>
                <footer>
                  <strong>{r.name}</strong>
                  <small>{tx(r.place, locale)}</small>
                </footer>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
