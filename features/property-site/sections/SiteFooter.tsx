"use client";

import { property } from "@/data/property";
import { useDemo } from "@/features/demo/DemoProvider";
import { tx } from "@/lib/i18n";

export function SiteFooter() {
  const { ui, locale, bookHref } = useDemo();
  const brand = property.units[0];
  const phone = property.contact.phone;

  return (
    <footer className="vh-footer">
      <div className="vh-wrap">
        <div className="vh-footer-top">
          <div className="vh-footer-brand">
            <p className="vh-footer-name">{tx(brand.name, locale)}</p>
            <p className="vh-footer-tag">
              {locale === "sr"
                ? "Privatno imanje · Barajevo · ~25 min od Beograda"
                : "Private estate · Barajevo · ~25 min from Belgrade"}
            </p>
          </div>
          <a className="vh-btn vh-btn--bronze vh-btn--nav" href={bookHref}>
            {locale === "sr" ? "Rezerviši boravak" : "Reserve your stay"}
          </a>
        </div>

        <div className="vh-footer-main">
          <nav className="vh-footer-nav" aria-label={ui.a11y.mainNav}>
            <p className="vh-footer-col-label">
              {locale === "sr" ? "Istraži" : "Explore"}
            </p>
            <a href="#statement">{locale === "sr" ? "Imanje" : "Estate"}</a>
            <a href="#video">{locale === "sr" ? "Video" : "Film"}</a>
            <a href="#galerija">{ui.nav.gallery}</a>
            <a href="#sadrzaji">{ui.nav.amenities}</a>
            <a href="#lokacija">{locale === "sr" ? "Lokacija" : "Location"}</a>
          </nav>

          <nav className="vh-footer-nav" aria-label={ui.nav.contact}>
            <p className="vh-footer-col-label">{ui.nav.contact}</p>
            <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
            <a href={`mailto:${property.contact.email}`}>
              {property.contact.email}
            </a>
            <a href="#termini">{ui.nav.book}</a>
            <a href="#kontakt">{ui.nav.contact}</a>
          </nav>

          <div className="vh-footer-aside">
            <p className="vh-footer-col-label">
              {locale === "sr" ? "Direktno" : "Direct"}
            </p>
            <p className="vh-footer-aside-text">
              {locale === "sr"
                ? "Bez posredničkih provizija — dogovorite boravak direktno sa domaćinom."
                : "No middleman fees — arrange your stay directly with the host."}
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
