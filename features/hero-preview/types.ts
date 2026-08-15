export const HERO_VARIANTS = [
  "grandeur",
  "overlay",
  "cinema",
  "asymmetric",
  "stacked",
  "showcase",
  "intersected",
  "connector",
  "hierarchy",
] as const;

export type HeroVariant = (typeof HERO_VARIANTS)[number];

/** Change this (and remove HeroVariantSwitcher) once the client picks a look. */
export const DEFAULT_HERO_VARIANT: HeroVariant = "intersected";

export const HERO_VARIANT_META: Record<
  HeroVariant,
  { short: string; label: string; blurb: string }
> = {
  grandeur: {
    short: "1",
    label: "2-Line",
    blurb: "Editorial Grandeur — centered two-line serif",
  },
  overlay: {
    short: "2",
    label: "Overlay",
    blurb: "Editorial overlay — serif + overlapping script",
  },
  cinema: {
    short: "3",
    label: "Wide",
    blurb: "Single-line cinema — Cinzel wordmark",
  },
  asymmetric: {
    short: "4",
    label: "Left",
    blurb: "Asymmetric modern luxe — bottom-left",
  },
  stacked: {
    short: "5",
    label: "Minimal",
    blurb: "Stacked luxury serif — single primary CTA",
  },
  showcase: {
    short: "6",
    label: "Badge",
    blurb: "Glass badge + subtitle + glass CTAs",
  },
  intersected: {
    short: "7",
    label: "Diagonal",
    blurb: "Diagonal signature stagger — serif + script",
  },
  connector: {
    short: "8",
    label: "Inline",
    blurb: "Inline embellished accent — VILLA ✦ CHARM",
  },
  hierarchy: {
    short: "9",
    label: "Stacked",
    blurb: "Stacked scale hierarchy — Charm focus",
  },
};
