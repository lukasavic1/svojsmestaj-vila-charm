"use client";

import { useMemo } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Gallery } from "@/features/gallery/Gallery";
import { GALLERY_EXCLUDE } from "@/data/heroMedia";
import { useDemo } from "@/features/demo/DemoProvider";

/**
 * Lightbox order: hero visuals first, weaker interiors later.
 * Bento preview picks its own featured five inside Gallery.
 */
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

export function GallerySection() {
  const { unit, locale } = useDemo();

  const photos = useMemo(() => {
    const filtered = unit.photos.filter(
      (p) => !GALLERY_EXCLUDE.some((k) => p.src.includes(k))
    );
    return [...filtered].sort((a, b) => {
      const ai = LIGHTBOX_ORDER.findIndex((k) => a.src.includes(k));
      const bi = LIGHTBOX_ORDER.findIndex((k) => b.src.includes(k));
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
  }, [unit.photos]);

  return (
    <section className="vh-gallery" id="galerija" aria-labelledby="gallery-title">
      <div className="vh-wrap">
        <Reveal className="vh-section-head vh-section-head--tight vh-gallery-head">
          <p className="vh-label">
            {locale === "sr" ? "Galerija" : "Gallery"}
          </p>
          <h2 id="gallery-title" className="vh-title vh-title--sm">
            {locale === "sr" ? "Fotografije imanja" : "Photos of the estate"}
          </h2>
        </Reveal>
        <Reveal>
          <Gallery photos={photos} locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
