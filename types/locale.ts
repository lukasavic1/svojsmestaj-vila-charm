export const LOCALES = ["sr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "sr";

/** Bilingual string — add keys when you add locales. */
export type LocalizedString = Record<Locale, string>;

export type LocalizedStringList = Record<Locale, string[]>;
