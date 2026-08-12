import type { Locale, LocalizedString, LocalizedStringList } from "@/types/locale";
import { DEFAULT_LOCALE, LOCALES } from "@/types/locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function tx(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value[DEFAULT_LOCALE];
}

export function txList(value: LocalizedStringList, locale: Locale): string[] {
  return value[locale] ?? value[DEFAULT_LOCALE];
}

export function parseLocaleParam(value: string | null): Locale | null {
  return isLocale(value) ? value : null;
}

/** Inline copy for the three locales — English is the fallback. */
export function t3(locale: Locale, sr: string, en: string, ru: string): string {
  return locale === "sr" ? sr : locale === "ru" ? ru : en;
}
