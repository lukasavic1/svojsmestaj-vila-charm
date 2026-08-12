export const LOCALES = ["sr", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "sr";

/** Locale display codes for switchers */
export const LOCALE_LABELS: Record<Locale, string> = {
  sr: "SR",
  en: "EN",
  ru: "RU",
};

/** BCP-47 tags for document.lang / Maps / formatting */
export const LOCALE_HTML: Record<Locale, string> = {
  sr: "sr-Latn",
  en: "en",
  ru: "ru",
};

/** Multilingual string — add keys when you add locales. */
export type LocalizedString = Record<Locale, string>;

export type LocalizedStringList = Record<Locale, string[]>;
