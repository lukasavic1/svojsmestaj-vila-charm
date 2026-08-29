import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getRequestSiteOrigin } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (siteConfig.isDemo) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const origin = await getRequestSiteOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: new URL(origin).host,
  };
}
