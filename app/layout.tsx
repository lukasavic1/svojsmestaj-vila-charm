import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import { property } from "@/data/property";
import { GUEST_BOOK_PHOTOS } from "@/data/guestBook";
import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE } from "@/types/locale";
import { tx } from "@/lib/i18n";
import { getRequestSiteOrigin } from "@/lib/seo";
import "./globals.css";
import "./redesign.css";
import "./hero-variants.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-heading",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-editorial",
});

const script = Great_Vibes({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
  variable: "--font-script",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const title = tx(property.seo.title, DEFAULT_LOCALE);
const description = tx(property.seo.description, DEFAULT_LOCALE);

export const viewport: Viewport = {
  themeColor: "#14262a",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getRequestSiteOrigin();

  return {
    title,
    description,
    applicationName: siteConfig.name,
    category: "travel",
    metadataBase: new URL(origin),
    verification: {
      google: "V_WeEQ2uy3bPPYoWtgsDawZE1X0uZjaozQX4Z4546eM",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/favicon.png", type: "image/png", sizes: "512x512" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    robots: siteConfig.isDemo
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sr-Latn"
      className={`${display.variable} ${playfair.variable} ${script.variable} ${sans.variable}`}
    >
      <body>
        {GUEST_BOOK_PHOTOS.map((photo) => (
          <link
            key={photo.src}
            rel="preload"
            as="image"
            href={photo.src}
            fetchPriority="low"
          />
        ))}
        {children}
      </body>
    </html>
  );
}
