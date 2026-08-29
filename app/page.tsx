import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PropertySite } from "@/features/property-site/PropertySite";
import { parseLocaleParam } from "@/lib/i18n";
import { parsePackageParam } from "@/lib/package";
import { pageMetadata } from "@/lib/seo";
import { DEFAULT_LOCALE } from "@/types/locale";
import { DEFAULT_PACKAGE } from "@/types/package";

type PageProps = {
  searchParams: Promise<{ lang?: string; pkg?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { lang } = await searchParams;
  const locale = parseLocaleParam(lang ?? null) ?? DEFAULT_LOCALE;
  return pageMetadata(locale);
}

export default async function Home({ searchParams }: PageProps) {
  const { lang, pkg } = await searchParams;
  const locale = parseLocaleParam(lang ?? null) ?? DEFAULT_LOCALE;
  const packageId = parsePackageParam(pkg ?? null) ?? DEFAULT_PACKAGE;

  return (
    <>
      <JsonLd locale={locale} />
      <PropertySite initialLocale={locale} initialPackageId={packageId} />
    </>
  );
}
