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
import {
  DEFAULT_HERO_VARIANT,
  HERO_VARIANTS,
  type HeroVariant,
} from "./types";

const STORAGE_KEY = "vh-hero-variant-v13";

type HeroVariantContextValue = {
  variant: HeroVariant;
  setVariant: (v: HeroVariant) => void;
};

const HeroVariantContext = createContext<HeroVariantContextValue | null>(null);

function isHeroVariant(value: string | null): value is HeroVariant {
  return HERO_VARIANTS.includes(value as HeroVariant);
}

export function HeroVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<HeroVariant>(DEFAULT_HERO_VARIANT);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (isHeroVariant(stored)) setVariantState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setVariant = useCallback((next: HeroVariant) => {
    setVariantState(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ variant, setVariant }),
    [variant, setVariant]
  );

  return (
    <HeroVariantContext.Provider value={value}>
      {children}
    </HeroVariantContext.Provider>
  );
}

export function useHeroVariant() {
  const ctx = useContext(HeroVariantContext);
  if (!ctx) {
    return {
      variant: DEFAULT_HERO_VARIANT,
      setVariant: (_v: HeroVariant) => {},
    };
  }
  return ctx;
}
