import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import { property } from "@/data/property";
import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE } from "@/types/locale";
import { tx } from "@/lib/i18n";
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

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  robots: siteConfig.isDemo
    ? { index: false, follow: false }
    : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "sr_Latn_RS",
    alternateLocale: ["en_US", "ru_RU"],
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: siteConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: tx(property.units[0].name, DEFAULT_LOCALE),
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
    canonical: "/",
  },
};

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
      <body>{children}</body>
    </html>
  );
}
