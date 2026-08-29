import type { Metadata } from "next";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { property } from "@/data/property";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/types/locale";
import { tx } from "@/lib/i18n";
import { canonicalHostFor, SITE_HOSTS, SITE_URLS } from "@/lib/site-hosts";

export { SITE_HOSTS, SITE_URLS };

export const LOCALE_OG: Record<Locale, string> = {
  sr: "sr_Latn_RS",
  en: "en_US",
  ru: "ru_RU",
};

export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/?lang=${locale}`;
}

export function hreflangMap(): Record<string, string> {
  return {
    "sr-Latn": localePath("sr"),
    en: localePath("en"),
    ru: localePath("ru"),
    "x-default": localePath("sr"),
  };
}

export async function getRequestSiteOrigin(): Promise<string> {
  const h = await headers();
  const raw = h.get("x-forwarded-host") || h.get("host");
  const canonical = canonicalHostFor(raw);
  if (canonical) return `https://${canonical}`;

  const host = raw?.split(",")[0]?.trim() ?? "";
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    const proto = h.get("x-forwarded-proto") || "http";
    return `${proto}://${host}`;
  }
  if (host.endsWith(".vercel.app")) return `https://${host.split(":")[0]}`;
  return siteConfig.url;
}

export function siblingSiteUrls(origin: string): string[] {
  return SITE_URLS.filter((url) => url !== origin);
}

export function pageMetadata(locale: Locale): Metadata {
  const title = tx(property.seo.title, locale);
  const description = tx(property.seo.description, locale);
  const ogAlts = LOCALES.filter((l) => l !== locale).map((l) => LOCALE_OG[l]);

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: LOCALE_OG[locale],
      alternateLocale: ogAlts,
      siteName: siteConfig.name,
      title,
      description,
      url: localePath(locale),
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.defaultOgImage],
    },
    alternates: {
      canonical: localePath(locale),
      languages: hreflangMap(),
    },
  };
}
