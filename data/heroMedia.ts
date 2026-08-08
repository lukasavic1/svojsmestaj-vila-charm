/** Primary cinematic hero — fullscreen muted loop (bright pool season). */
export const heroVideo = {
  src: "/videos/pool-season.mp4",
  poster: "/images/pool-1.jpg",
} as const;

/** Mid-page visual — single evening frame (no secondary overlay). */
export const featureBreak = {
  src: "/images/pool-night-2.jpg",
  alt: {
    sr: "Bazen noću na imanju Villa Charm",
    en: "Pool at night at Villa Charm",
  },
  kicker: {
    sr: "Veče na imanju",
    en: "Evening on the estate",
  },
  title: {
    sr: "Kada padne mrak, bašta i voda postaju tiši.",
    en: "After dark, the garden and water grow quieter.",
  },
  facts: [
    { sr: "Grejani bazen", en: "Heated pool" },
    { sr: "Privatna bašta", en: "Private garden" },
    { sr: "Do 10 gostiju", en: "Up to 10 guests" },
  ],
} as const;

/** Closing full-bleed still. */
export const closingBreak = {
  src: "/images/exterior-1.jpg",
  alt: {
    sr: "Eksterijer Villa Charm među zelenilom",
    en: "Villa Charm exterior among greenery",
  },
} as const;

/** Used as hero / Imanje hero — gallery keeps the rest. */
export const GALLERY_EXCLUDE = ["pool-1", "exterior-1"] as const;
