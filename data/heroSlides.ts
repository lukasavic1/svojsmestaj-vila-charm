/**
 * Immersive hero media for the single-villa experience.
 * Order is the visual story: arrival → water → night → living.
 */
export const heroSlides: string[] = [
  "/images/exterior-1.jpg",
  "/images/pool-1.jpg",
  "/images/pool-night-1.jpg",
  "/images/living-1.jpg",
  "/images/terrace-upper.jpg",
];

/** Fallback cover per unit id (booking cards / quick views). */
export const unitHeroCovers: Record<string, string> = {
  "villa-charm": "/images/exterior-1.jpg",
};
