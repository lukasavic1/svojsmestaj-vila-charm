"use client";

import { InstagramIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
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
  const instagram = property.contact.instagram;
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
          <nav className="vh-footer-nav vh-footer-explore" aria-label={ui.a11y.mainNav}>
            <p className="vh-footer-col-label">
              {t3(locale, "Istraži", "Explore", "Обзор")}
            </p>
            {explore.map((link) => (
              <a key={`${link.href}-${link.sr}`} href={link.href}>
                {t3(locale, link.sr, link.en, link.ru)}
              </a>
            ))}
          </nav>

          <nav className="vh-footer-nav vh-footer-contact" aria-label={ui.nav.contact}>
            <p className="vh-footer-col-label">{ui.nav.contact}</p>
            <a className="vh-footer-link" href={`tel:${phone.replace(/\s/g, "")}`}>
              <PhoneIcon />
              {phone}
            </a>
            <a
              className="vh-footer-link"
              href={`mailto:${property.contact.email}`}
            >
              <MailIcon />
              {property.contact.email}
            </a>
            {instagram ? (
              <a
                className="vh-footer-link"
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${ui.contact.instagram}: ${instagram.handle}`}
              >
                <InstagramIcon />
                {instagram.handle}
              </a>
            ) : null}
          </nav>
        </div>

        <div className="vh-footer-bottom">
          <p>© {new Date().getFullYear()} Villa Charm</p>
          <p>{t3(locale, "Barajevo", "Barajevo", "Бараево")}</p>
        </div>
      </div>
    </footer>
  );
}
