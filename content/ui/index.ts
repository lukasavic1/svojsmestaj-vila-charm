import type { Locale } from "@/types/locale";
import { uiEn } from "./en";
import { uiSr } from "./sr";
import type { UiDictionary } from "./types";

export const uiByLocale: Record<Locale, UiDictionary> = {
  sr: uiSr,
  en: uiEn,
};

export function getUi(locale: Locale): UiDictionary {
  return uiByLocale[locale];
}

export type { UiDictionary };
