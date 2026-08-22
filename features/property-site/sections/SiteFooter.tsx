"use client";

import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3, tx } from "@/lib/i18n";

export function SiteFooter() {
  const { ui, locale } = useDemo();
  const brand = property.units[0];
  const phone = property.contact.phone;

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
            <a href="#prostor">
              {t3(locale, "Prostor", "Gather", "Пространство")}
            </a>
            <a href="#cene">{t3(locale, "Cene", "Rates", "Цены")}</a>
            <a href="#galerija">
              {t3(locale, "Album", "Album", "Альбом")}
            </a>
            <a href="#utisci">
              {t3(locale, "Utisci", "Reviews", "Отзывы")}
            </a>
            <a href="#lokacija">
              {t3(locale, "Lokacija", "Location", "Локация")}
            </a>
            <a href="#faq">
              {t3(locale, "Pitanja", "FAQ", "Вопросы")}
            </a>
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
