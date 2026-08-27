"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";
import { StorySection } from "./StorySection";
import {
  DEFAULT_INTERIOR_SUB,
  gatherThemes,
  slidesForTheme,
  type GalleryCategory,
  type InteriorNavSub,
  type InteriorSubCategory,
} from "./gatherMedia";

function fineHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Chapter two — spaces that gather people, browsed by theme. */
export function GatherSection() {
  const { locale } = useDemo();
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("bazen");
  const [activeSubCategory, setActiveSubCategory] =
    useState<InteriorSubCategory>(DEFAULT_INTERIOR_SUB);
  const [menuOpen, setMenuOpen] = useState(false);
  const unutraRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>(0);

  const themes = useMemo(() => gatherThemes(locale), [locale]);
  const theme = themes.find((t) => t.id === activeCategory) ?? themes[0];
  const interiorSubs =
    themes.find((t) => t.id === "unutra")?.subs ?? [];
  const interiorOn = theme.id === "unutra";
  const roomOn =
    interiorOn && activeSubCategory !== DEFAULT_INTERIOR_SUB
      ? interiorSubs.find((s) => s.id === activeSubCategory)
      : undefined;
  const slides = slidesForTheme(theme, activeSubCategory);
  const mediaKey = interiorOn
    ? `${theme.id}-${activeSubCategory}`
    : theme.id;

  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    window.clearTimeout(closeTimer.current);
    setMenuOpen(false);
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 140);
  };

  const selectCategory = (id: GalleryCategory) => {
    setActiveCategory(id);
    setActiveSubCategory(DEFAULT_INTERIOR_SUB);
    closeMenu();
  };

  const selectUnutra = () => {
    setActiveCategory("unutra");
    if (fineHover()) openMenu();
    else setMenuOpen((open) => !open);
  };

  const selectRoom = (id: InteriorNavSub) => {
    setActiveCategory("unutra");
    setActiveSubCategory(id);
    closeMenu();
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!unutraRef.current?.contains(e.target as Node)) closeMenu();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <StorySection
      id="prostor"
      flip
      title={t3(
        locale,
        "Prostor koji spaja",
        "A space that brings people together",
        "Пространство, которое объединяет"
      )}
      body={[
        t3(
          locale,
          "Ovde priča postaje glasnija. Smeh oko bazena, miris roštilja, večeri koje traju duže nego što planirate.",
          "This is where the story gets louder. Laughter by the pool, the scent of the grill, evenings that last longer than planned.",
          "Здесь история звучит громче. Смех у бассейна, запах гриля, вечера длиннее, чем планировали."
        ),
        t3(
          locale,
          "Villa Charm je napravljena da okuplja — porodicu za vikend, prijatelje za proslavu, ili samo vas i tišinu.",
          "Villa Charm was made to bring people together — family for the weekend, friends for a celebration, or just you and the quiet.",
          "Villa Charm создана, чтобы собирать — семью на выходные, друзей на праздник или только вас и тишину."
        ),
      ]}
      slides={slides}
      mediaKey={mediaKey}
      mediaLabel={theme.label}
      mediaHeader={
        <div
          className="vh-story-themes"
          role="tablist"
          aria-label={t3(
            locale,
            "Izaberite prostor",
            "Choose a space",
            "Выберите пространство"
          )}
        >
          {themes.map((item) => {
            if (item.id === "unutra") {
              const on = interiorOn;
              return (
                <div
                  key={item.id}
                  ref={unutraRef}
                  className="vh-unutra"
                  onMouseEnter={() => {
                    if (fineHover()) openMenu();
                  }}
                  onMouseLeave={() => {
                    if (fineHover()) scheduleClose();
                  }}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    className={`vh-story-theme vh-unutra-tab${on ? " is-on" : ""}${menuOpen ? " is-open" : ""}`}
                    onClick={selectUnutra}
                  >
                    <span className="vh-unutra-label">{item.label}</span>
                    {roomOn ? (
                      <span className="vh-unutra-tag">{roomOn.label}</span>
                    ) : null}
                    <span className="vh-unutra-caret" aria-hidden="true" />
                  </button>

                  <AnimatePresence>
                    {menuOpen ? (
                      <motion.div
                        key="unutra-pop"
                        className="vh-unutra-pop"
                        role="menu"
                        aria-label={t3(
                          locale,
                          "Unutrašnji prostor",
                          "Interior rooms",
                          "Интерьер"
                        )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {interiorSubs.map((room) => {
                          const selected = room.id === activeSubCategory;
                          return (
                            <button
                              key={room.id}
                              type="button"
                              role="menuitem"
                              className={`vh-unutra-item${selected ? " is-on" : ""}`}
                              onClick={() =>
                                selectRoom(room.id as InteriorNavSub)
                              }
                            >
                              <span className="vh-unutra-dot" aria-hidden="true" />
                              {room.label}
                            </button>
                          );
                        })}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }

            const on = item.id === theme.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`vh-story-theme${on ? " is-on" : ""}`}
                onClick={() => selectCategory(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      }
    />
  );
}
