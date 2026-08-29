import type { MetadataRoute } from "next";
import { LOCALES, type Locale } from "@/types/locale";
import { getRequestSiteOrigin, localePath } from "@/lib/seo";

export const dynamic = "force-dynamic";

function pageUrl(origin: string, locale: Locale): string {
  const path = localePath(locale);
  return path === "/" ? origin : `${origin}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await getRequestSiteOrigin();
  const now = new Date();

  return LOCALES.map((locale) => ({
    url: pageUrl(origin, locale),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: locale === "sr" ? 1 : 0.8,
    alternates: {
      languages: {
        "sr-Latn": origin,
        en: `${origin}/?lang=en`,
        ru: `${origin}/?lang=ru`,
        "x-default": origin,
      },
    },
  }));
}
