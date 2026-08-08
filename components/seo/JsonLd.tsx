import { property } from "@/data/property";
import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE } from "@/types/locale";
import { tx } from "@/lib/i18n";

export function JsonLd() {
  const description = tx(property.seo.description, DEFAULT_LOCALE);
  const unit = property.units[0];

  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: tx(unit.name, DEFAULT_LOCALE),
    description,
    url: siteConfig.url,
    telephone: property.contact.phone,
    email: property.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Svetosavska",
      addressLocality: "Barajevo",
      addressRegion: "Belgrade",
      addressCountry: "RS",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.map.lat,
      longitude: property.map.lng,
    },
    image: unit.photos.map((p) =>
      p.src.startsWith("http") ? p.src : `${siteConfig.url}${p.src}`
    ),
    priceRange: tx(unit.price.amount, DEFAULT_LOCALE),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
