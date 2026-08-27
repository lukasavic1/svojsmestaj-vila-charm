"use client";

import type { SectionId } from "@/config/experience";
import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";

const EXPLORE_LINKS: Partial<
  Record<SectionId, { href: string; sr: string; en: string; ru: string }>
> = {
  leadin: { href: "#o-nama", sr: "O nama", en: "About", ru: "О нас" },
  intro: {
    href: "#o-smestaju",
    sr: "O smeštaju",
    en: "The stay",
    ru: "О жилье",
  },
  gather: { href: "#prostor", sr: "Galerija", en: "Gallery", ru: "Галерея" },
  album: { href: "#galerija", sr: "Događaji", en: "Events", ru: "События" },
  gallery: { href: "#galerija", sr: "Galerija", en: "Gallery", ru: "Галерея" },
  reviews: { href: "#utisci", sr: "Utisci", en: "Reviews", ru: "Отзывы" },
  amenities: {
    href: "#sadrzaji",
    sr: "Sadržaji",
    en: "Amenities",
    ru: "Удобства",
  },
  pricing: { href: "#cene", sr: "Cene", en: "Rates", ru: "Цены" },
  map: { href: "#lokacija", sr: "Lokacija", en: "Location", ru: "Локация" },
  faq: { href: "#faq", sr: "Pitanja", en: "FAQ", ru: "Вопросы" },
};

export function SiteFooter() {
  const { ui, locale, experience } = useDemo();
  const brand = property.units[0];
  const phone = property.contact.phone;
  const explore = experience.sections
    .map((id) => EXPLORE_LINKS[id])
    .filter((link): link is NonNullable<typeof link> => Boolean(link));

  return (
    <footer className="vh-footer">
      <div className="vh-wrap">
        <div className="vh-footer-top">
          <div className="vh-footer-brand">
            <p className="vh-footer-name">{tx(brand.name, locale)}</p>
            <p className="vh-footer-tag">
              {t3(
                locale,
                "Privatno imanje · Barajevo · ~25 min od Beograda",
                "Private estate · Barajevo · ~25 min from Belgrade",
                "Частная усадьба · Бараево · ~25 мин от Белграда"
              )}
            </p>
          </div>
        </div>

        <div className="vh-footer-main">
          <nav className="vh-footer-nav" aria-label={ui.a11y.mainNav}>
            <p className="vh-footer-col-label">
              {t3(locale, "Istraži", "Explore", "Обзор")}
            </p>
            {explore.map((link) => (
              <a key={link.href} href={link.href}>
                {t3(locale, link.sr, link.en, link.ru)}
              </a>
            ))}
          </nav>

          <nav className="vh-footer-nav" aria-label={ui.nav.contact}>
            <p className="vh-footer-col-label">{ui.nav.contact}</p>
            <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
            <a href={`mailto:${property.contact.email}`}>
              {property.contact.email}
            </a>
            <a href="#kontakt">{ui.nav.contact}</a>
          </nav>

          <div className="vh-footer-aside">
            <p className="vh-footer-col-label">
              {t3(locale, "Direktno", "Direct", "Напрямую")}
            </p>
            <p className="vh-footer-aside-text">
              {t3(
                locale,
                "Bez posredničkih provizija — dogovorite boravak direktno sa domaćinom.",
                "No middleman fees — arrange your stay directly with the host.",
                "Без комиссий посредников — договоритесь о проживании напрямую с хозяином."
              )}
            </p>
          </div>
        </div>

        <div className="vh-footer-bottom">
          <p>© {new Date().getFullYear()} Villa Charm</p>
          <p>{tx(brand.region, locale)}</p>
        </div>
      </div>
    </footer>
  );
}
