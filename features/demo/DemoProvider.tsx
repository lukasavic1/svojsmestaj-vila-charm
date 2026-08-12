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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUi, type UiDictionary } from "@/content/ui";
import { getExperience, type ExperienceConfig } from "@/config/experience";
import { property } from "@/data/property";
import { siteConfig } from "@/config/site";
import { DEFAULT_LOCALE, LOCALE_HTML, type Locale } from "@/types/locale";
import { DEFAULT_PACKAGE, type PackageId } from "@/types/package";
import type { Unit } from "@/types/property";
import { parseLocaleParam, tx } from "@/lib/i18n";
import { parsePackageParam } from "@/lib/package";

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
  setPackageId: (id: PackageId) => void;
  setLocale: (locale: Locale) => void;
  setUnitId: (id: string) => void;
  /** Select unit and jump to booking wizard with it pre-filled. */
  bookUnit: (id: string) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

function readInitial(search: URLSearchParams): {
  packageId: PackageId;
  locale: Locale;
} {
  return {
    packageId: parsePackageParam(search.get("pkg")) ?? DEFAULT_PACKAGE,
    locale: parseLocaleParam(search.get("lang")) ?? DEFAULT_LOCALE,
  };
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = readInitial(searchParams);
  const lockedPremium = !siteConfig.isDemo;
  const [packageId, setPackageIdState] = useState<PackageId>(
    lockedPremium ? "premium" : initial.packageId
  );
  const [locale, setLocaleState] = useState<Locale>(initial.locale);
  const [unitId, setUnitId] = useState(property.units[0].id);
  const [bookingPrefillUnitId, setBookingPrefillUnitId] = useState<string | null>(
    null
  );

  const experience = getExperience(packageId);

  const syncUrl = useCallback(
    (nextPkg: PackageId, nextLocale: Locale) => {
      const params = new URLSearchParams(searchParams.toString());
      if (siteConfig.isDemo) {
        params.set("pkg", nextPkg);
      } else {
        params.delete("pkg");
      }
      params.set("lang", nextLocale);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
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

  const bookUnit = useCallback((id: string) => {
    setUnitId(id);
    setBookingPrefillUnitId(id);
    window.requestAnimationFrame(() => {
      document
        .getElementById("termini")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
      setPackageId,
      setLocale,
      setUnitId,
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
      setPackageId,
      setLocale,
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
