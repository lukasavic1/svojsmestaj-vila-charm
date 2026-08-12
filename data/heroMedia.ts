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
    ru: "Бассейн ночью в имении Villa Charm",
  },
  kicker: {
    sr: "Veče na imanju",
    en: "Evening on the estate",
    ru: "Вечер в имении",
  },
  title: {
    sr: "Kada padne mrak, bašta i voda postaju tiši.",
    en: "After dark, the garden and water grow quieter.",
    ru: "С наступлением темноты сад и вода становятся тише.",
  },
  facts: [
    { sr: "Grejani bazen", en: "Heated pool", ru: "Подогреваемый бассейн" },
    { sr: "Privatna bašta", en: "Private garden", ru: "Частный сад" },
    { sr: "Do 10 gostiju", en: "Up to 10 guests", ru: "До 10 гостей" },
  ],
} as const;

/** Closing full-bleed still. */
export const closingBreak = {
  src: "/images/exterior-1.jpg",
  alt: {
    sr: "Eksterijer Villa Charm među zelenilom",
    en: "Villa Charm exterior among greenery",
    ru: "Внешний вид Villa Charm среди зелени",
  },
} as const;

/** Used as hero / Imanje hero — gallery keeps the rest. */
export const GALLERY_EXCLUDE = ["pool-1", "exterior-1"] as const;
