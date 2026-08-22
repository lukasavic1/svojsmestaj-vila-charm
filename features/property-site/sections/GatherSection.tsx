"use client";

import { useMemo, useState } from "react";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";
import { StorySection } from "./StorySection";
import type { Slide } from "./Slideshow";

type ThemeId = "bazen" | "basta" | "terase" | "unutra";

type Theme = {
  id: ThemeId;
  label: string;
  slides: Slide[];
};

/** Chapter two — spaces that gather people, browsed by theme. */
export function GatherSection() {
  const { locale } = useDemo();
  const [themeId, setThemeId] = useState<ThemeId>("bazen");

  const themes: Theme[] = useMemo(
    () => [
      {
        id: "bazen",
        label: t3(locale, "Bazen", "Pool", "Бассейн"),
        slides: [
          {
            kind: "video",
            src: "/videos/pool-season.mp4",
            poster: "/images/pool-1.jpg",
            alt: t3(locale, "Sezona kupanja", "Pool season", "Сезон купания"),
          },
          {
            kind: "image",
            src: "/images/pool-2.jpg",
            alt: t3(
              locale,
              "Popodneva kraj vode",
              "Afternoons by the water",
              "Дни у воды"
            ),
          },
          {
            kind: "image",
            src: "/images/pool-night-1.jpg",
            alt: t3(
              locale,
              "Večeri pod zvezdama kraj bazena",
              "Evenings under the stars by the pool",
              "Вечера под звёздами у бассейна"
            ),
          },
          {
            kind: "image",
            src: "/images/pool-night-2.jpg",
            alt: t3(
              locale,
              "Osvetljen bazen noću",
              "Illuminated pool at night",
              "Подсвеченный бассейн ночью"
            ),
          },
          {
            kind: "image",
            src: "/images/pool-night-3.jpg",
            alt: t3(
              locale,
              "Bašta i bazen u sumrak",
              "Garden and pool at dusk",
              "Сад и бассейн в сумерках"
            ),
          },
        ],
      },
      {
        id: "basta",
        label: t3(locale, "Bašta", "Garden", "Сад"),
        slides: [
          {
            kind: "image",
            src: "/images/garden-bbq.jpg",
            alt: t3(
              locale,
              "Roštilj i druženje u bašti",
              "Barbecue and company in the garden",
              "Гриль и компания в саду"
            ),
          },
          {
            kind: "image",
            src: "/images/bbq-1.jpg",
            alt: t3(
              locale,
              "Prostor za roštilj",
              "Barbecue area",
              "Зона барбекю"
            ),
          },
          {
            kind: "image",
            src: "/images/garden-fountain.jpg",
            alt: t3(
              locale,
              "Mirna bašta sa česmom",
              "Quiet garden with a fountain",
              "Тихий сад с фонтаном"
            ),
          },
          {
            kind: "image",
            src: "/images/garden-table.jpg",
            alt: t3(
              locale,
              "Sto u bašti za okupljanja",
              "Garden table for gathering",
              "Стол в саду для встреч"
            ),
          },
          {
            kind: "image",
            src: "/images/garden-lower-1.jpg",
            alt: t3(locale, "Donja bašta", "Lower garden", "Нижний сад"),
          },
        ],
      },
      {
        id: "terase",
        label: t3(locale, "Terase", "Terraces", "Террасы"),
        slides: [
          {
            kind: "image",
            src: "/images/terrace-upper.jpg",
            alt: t3(
              locale,
              "Gornja terasa",
              "Upper terrace",
              "Верхняя терраса"
            ),
          },
          {
            kind: "image",
            src: "/images/terrace-lower-1.jpg",
            alt: t3(
              locale,
              "Donja terasa",
              "Lower terrace",
              "Нижняя терраса"
            ),
          },
          {
            kind: "image",
            src: "/images/terrace-lower-2.jpg",
            alt: t3(
              locale,
              "Donja terasa — drugi ugao",
              "Lower terrace — another angle",
              "Нижняя терраса — другой ракурс"
            ),
          },
          {
            kind: "image",
            src: "/images/garden-upper-bench.jpg",
            alt: t3(
              locale,
              "Klupa na gornjoj terasi",
              "Bench on the upper terrace",
              "Скамья на верхней террасе"
            ),
          },
          {
            kind: "image",
            src: "/images/exterior-1.jpg",
            alt: t3(
              locale,
              "Kuća i terase među zelenilom",
              "House and terraces among greenery",
              "Дом и террасы среди зелени"
            ),
          },
        ],
      },
      {
        id: "unutra",
        label: t3(locale, "Unutra", "Inside", "Внутри"),
        slides: [
          {
            kind: "image",
            src: "/images/living-1.jpg",
            alt: t3(
              locale,
              "Dnevni boravak",
              "Living room",
              "Гостиная"
            ),
          },
          {
            kind: "image",
            src: "/images/dining-1.jpg",
            alt: t3(locale, "Trpezarija", "Dining room", "Столовая"),
          },
          {
            kind: "image",
            src: "/images/kitchen-1.jpg",
            alt: t3(
              locale,
              "Kuhinja",
              "Kitchen",
              "Кухня"
            ),
          },
          {
            kind: "image",
            src: "/images/arch-dining.jpg",
            alt: t3(
              locale,
              "Luk prema trpezariji",
              "Arch toward the dining area",
              "Арка в столовую"
            ),
          },
          {
            kind: "image",
            src: "/images/library-1.jpg",
            alt: t3(locale, "Biblioteka", "Library", "Библиотека"),
          },
        ],
      },
    ],
    [locale]
  );

  const theme = themes.find((t) => t.id === themeId) ?? themes[0];

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
      slides={theme.slides}
      mediaKey={theme.id}
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
            const on = item.id === theme.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`vh-story-theme${on ? " is-on" : ""}`}
                onClick={() => setThemeId(item.id)}
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
