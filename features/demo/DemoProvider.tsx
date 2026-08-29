"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUi, type UiDictionary } from "@/content/ui";
import { getExperience, type ExperienceConfig } from "@/config/experience";
import { property } from "@/data/property";
import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE, LOCALE_HTML, type Locale } from "@/types/locale";
import { DEFAULT_PACKAGE, type PackageId } from "@/types/package";
import type { Unit } from "@/types/property";
import { tx } from "@/lib/i18n";

type DemoContextValue = {
  packageId: PackageId;
  locale: Locale;
  ui: UiDictionary;
  experience: ExperienceConfig;
  bookHref: string;
  isDemo: boolean;
  unitId: string;
  unit: Unit;
  units: Unit[];
  bookingPrefillUnitId: string | null;
  bookingOpen: boolean;
  setPackageId: (id: PackageId) => void;
  setLocale: (locale: Locale) => void;
  setUnitId: (id: string) => void;
  /** Open booking sheet (optionally pre-select a unit). */
  openBooking: (id?: string) => void;
  closeBooking: () => void;
  /** Select unit and open booking sheet. */
  bookUnit: (id: string) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
  initialPackageId = DEFAULT_PACKAGE,
}: {
  children: ReactNode;
  initialLocale?: Locale;
  initialPackageId?: PackageId;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const lockedPremium = !siteConfig.isDemo;
  const [packageId, setPackageIdState] = useState<PackageId>(
    lockedPremium ? "premium" : initialPackageId
  );
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [unitId, setUnitId] = useState(property.units[0].id);
  const [bookingPrefillUnitId, setBookingPrefillUnitId] = useState<string | null>(
    null
  );
  const [bookingOpen, setBookingOpen] = useState(false);

  const experience = getExperience(packageId);

  const syncUrl = useCallback(
    (nextPkg: PackageId, nextLocale: Locale) => {
      const params = new URLSearchParams();
      if (siteConfig.isDemo) params.set("pkg", nextPkg);
      if (nextLocale !== DEFAULT_LOCALE) params.set("lang", nextLocale);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const setPackageId = useCallback(
    (id: PackageId) => {
      if (!siteConfig.isDemo) return;
      setPackageIdState(id);
      syncUrl(id, locale);
    },
    [locale, syncUrl]
  );

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      syncUrl(packageId, next);
    },
    [packageId, syncUrl]
  );

  const openBooking = useCallback((id?: string) => {
    if (id) {
      setUnitId(id);
      setBookingPrefillUnitId(id);
    }
    setBookingOpen(true);
    if (typeof window !== "undefined" && window.location.hash !== "#termini") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#termini`);
    }
  }, []);

  const closeBooking = useCallback(() => {
    setBookingOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#termini") {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`
      );
    }
  }, []);

  const bookUnit = useCallback(
    (id: string) => {
      openBooking(id);
    },
    [openBooking]
  );

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    if (lockedPremium) return;
    setPackageIdState(initialPackageId);
  }, [initialPackageId, lockedPremium]);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#termini") {
        setBookingOpen(true);
      } else {
        setBookingOpen(false);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const allUnits = property.units;
  const visibleUnits = useMemo(
    () => (experience.discovery ? allUnits : allUnits.slice(0, 1)),
    [experience.discovery, allUnits]
  );

  useEffect(() => {
    if (!visibleUnits.some((u) => u.id === unitId)) {
      setUnitId(visibleUnits[0].id);
    }
  }, [unitId, visibleUnits]);

  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML[locale];
    document.documentElement.dataset.experience = experience.id;
    document.title = tx(property.seo.title, locale);
  }, [locale, experience.id]);

  const unit = visibleUnits.find((u) => u.id === unitId) ?? visibleUnits[0];
  const ui = getUi(locale);
  const bookHref =
    experience.booking === "wizard" ? "#termini" : "#kontakt";

  const value = useMemo<DemoContextValue>(
    () => ({
      packageId,
      locale,
      ui,
      experience,
      bookHref,
      isDemo: siteConfig.isDemo,
      unitId: unit.id,
      unit,
      units: visibleUnits,
      bookingPrefillUnitId,
      bookingOpen,
      setPackageId,
      setLocale,
      setUnitId,
      openBooking,
      closeBooking,
      bookUnit,
    }),
    [
      packageId,
      locale,
      ui,
      experience,
      bookHref,
      unit,
      visibleUnits,
      bookingPrefillUnitId,
      bookingOpen,
      setPackageId,
      setLocale,
      openBooking,
      closeBooking,
      bookUnit,
    ]
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return ctx;
}
