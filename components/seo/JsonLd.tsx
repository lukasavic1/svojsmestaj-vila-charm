import { faq } from "@/data/faq";
import { property } from "@/data/property";
import { getRequestSiteOrigin, siblingSiteUrls } from "@/lib/seo";
import { tx } from "@/lib/i18n";
import type { Locale } from "@/types/locale";

export async function JsonLd({ locale }: { locale: Locale }) {
  const origin = await getRequestSiteOrigin();
  const description = tx(property.seo.description, locale);
  const unit = property.units[0];
  const name = tx(unit.name, locale);
  const lodgingId = `${origin}/#lodging`;

  const images = unit.photos.slice(0, 8).map((p) =>
    p.src.startsWith("http") ? p.src : `${origin}${p.src}`
  );

  const sameAs = [
    ...siblingSiteUrls(origin),
    property.contact.instagram?.url,
  ].filter((v): v is string => Boolean(v));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: "Villa Charm",
        url: origin,
        inLanguage: ["sr-Latn", "en", "ru"],
        publisher: { "@id": lodgingId },
      },
      {
        "@type": "LodgingBusiness",
        "@id": lodgingId,
        name,
        description,
        url: origin,
        image: images,
        logo: `${origin}/favicon.png`,
        telephone: property.contact.phone,
        email: property.contact.email,
        sameAs,
        priceRange: "€250-€450",
        currenciesAccepted: "EUR",
        checkinTime: "12:00",
        checkoutTime: "10:00",
        petsAllowed: true,
        availableLanguage: ["Serbian", "English", "Russian"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Svetosavska",
          addressLocality: "Barajevo",
          addressRegion: "Belgrade",
          postalCode: "11460",
          addressCountry: "RS",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: property.map.lat,
          longitude: property.map.lng,
        },
        hasMap: `https://www.google.com/maps?q=${property.map.lat},${property.map.lng}`,
        containsPlace: {
          "@type": "Accommodation",
          name,
          numberOfBedrooms: unit.specs.bedrooms,
          numberOfBathroomsTotal: unit.specs.bathrooms,
          occupancy: {
            "@type": "QuantitativeValue",
            maxValue: unit.specs.capacity,
          },
          amenityFeature: unit.amenities.items.map((item) => ({
            "@type": "LocationFeatureSpecification",
            name: tx(item.label, locale),
            value: true,
          })),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: property.reviews.google.score,
          reviewCount: property.reviews.google.count,
          bestRating: 5,
          worstRating: 1,
        },
        review: property.reviews.items.map((item) => ({
          "@type": "Review",
          author: { "@type": "Person", name: item.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: item.stars,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: tx(item.text, locale),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${origin}/#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: tx(item.q, locale),
          acceptedAnswer: {
            "@type": "Answer",
            text: tx(item.a, locale),
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
