"use client";

import { Reveal } from "@/components/ui/Reveal";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";

function initials(name: string) {
  const parts = name
    .replace(/&/g, " ")
    .split(/\s+/)
    .map((p) => p.replace(/[^A-Za-zÀ-žА-я]/g, ""))
    .filter(Boolean);
  if (parts.length === 0) return "VC";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function ReviewsSection() {
  const { locale, ui } = useDemo();
  const reviews = property.reviews;
  const score = reviews.google.score.toFixed(2);
  const ratingPill = t3(
    locale,
    `★ ${score} / 5.0 (30+ ocena na Airbnb & Google-u)`,
    `★ ${score} / 5.0 (30+ reviews on Airbnb & Google)`,
    `★ ${score} / 5.0 (30+ оценок на Airbnb & Google)`
  );

  return (
    <section className="vh-reviews" id="utisci" aria-labelledby="utisci-naslov">
      <div className="vh-wrap">
        <Reveal className="vh-reviews-head">
          <h2 id="utisci-naslov" className="vh-reviews-title">
            {t3(
              locale,
              "Priča se ne završava odlaskom.",
              "The story doesn’t end when you leave.",
              "История не заканчивается с отъездом."
            )}
          </h2>
          <p className="vh-reviews-lead">
            {t3(
              locale,
              "Gosti koji su bili ovde nose deo Ville Charm sa sobom — a mnogi se vraćaju. Ako želite da napišete svoje poglavlje, javite nam se.",
              "Guests who stay here take a piece of Villa Charm with them — and many return. If you want to write your own chapter, reach out.",
              "Гости увозят с собой частичку Villa Charm — и многие возвращаются. Если хотите написать свою главу, напишите нам."
            )}
          </p>
          <p className="vh-reviews-pill" aria-label={ratingPill}>
            {ratingPill}
          </p>
          <p className="vh-reviews-proof">
            {t3(
              locale,
              "Dokaz da se priča nastavlja",
              "Proof the story continues",
              "Доказательство, что история продолжается"
            )}
          </p>
        </Reveal>

        <div className="vh-reviews-rail">
          <ul className="vh-reviews-grid">
            {reviews.items.map((r, i) => (
              <Reveal key={r.name} as="li" delay={i * 50}>
                <article className="vh-review-card">
                  <span className="vh-review-quote" aria-hidden="true">
                    “
                  </span>
                  <div
                    className="vh-review-stars"
                    aria-label={ui.a11y.rating.replace("{n}", String(r.stars))}
                  >
                    {"★".repeat(r.stars)}
                  </div>
                  <blockquote>{tx(r.text, locale)}</blockquote>
                  <footer className="vh-review-foot">
                    <div className="vh-review-author">
                      <span className="vh-review-avatar" aria-hidden="true">
                        {initials(r.name)}
                      </span>
                      <div>
                        <strong>{r.name}</strong>
                        <small>{tx(r.place, locale)}</small>
                      </div>
                    </div>
                    <span className="vh-review-badge">
                      {t3(
                        locale,
                        "Verifikovan gost",
                        "Verified guest",
                        "Проверенный гость"
                      )}
                    </span>
                  </footer>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
