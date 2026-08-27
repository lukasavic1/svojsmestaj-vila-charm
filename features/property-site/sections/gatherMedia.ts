import { t3 } from "@/lib/i18n";
import type { Locale } from "@/types/locale";
import type { Slide } from "./Slideshow";

export const GALLERY_CATEGORIES = ["bazen", "basta", "terase", "unutra"] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const INTERIOR_SUBCATEGORIES = [
  "sve",
  "soba-1",
  "soba-2",
  "soba-3",
  "kupatilo",
] as const;
export type InteriorSubCategory = (typeof INTERIOR_SUBCATEGORIES)[number];

export const INTERIOR_NAV_SUBS = [
  "soba-1",
  "soba-2",
  "soba-3",
  "kupatilo",
] as const;
export type InteriorNavSub = (typeof INTERIOR_NAV_SUBS)[number];

export const DEFAULT_INTERIOR_SUB: InteriorSubCategory = "sve";

export type InteriorSubNav = {
  id: InteriorSubCategory;
  label: string;
  slides: Slide[];
};

export type GalleryTheme = {
  id: GalleryCategory;
  label: string;
  slides: Slide[];
  subs?: InteriorSubNav[];
};

function img(file: string, alt: string): Slide {
  return { kind: "image", src: `/images/${file}`, alt };
}

export function interiorSubLabel(locale: Locale, id: InteriorNavSub): string {
  switch (id) {
    case "soba-1":
      return t3(locale, "Soba 1", "Room 1", "Комната 1");
    case "soba-2":
      return t3(locale, "Soba 2", "Room 2", "Комната 2");
    case "soba-3":
      return t3(locale, "Soba 3", "Room 3", "Комната 3");
    case "kupatilo":
      return t3(locale, "Kupatilo", "Bathroom", "Ванная");
  }
}

function interiorRooms(locale: Locale): Record<InteriorSubCategory, Slide[]> {
  return {
    sve: [
      img(
        "living-1.jpg",
        t3(locale, "Dnevni boravak", "Living room", "Гостиная")
      ),
      img("dining-1.jpg", t3(locale, "Trpezarija", "Dining room", "Столовая")),
      img("kitchen-1.jpg", t3(locale, "Kuhinja", "Kitchen", "Кухня")),
      img(
        "bedroom-1.jpg",
        t3(locale, "Spavaća soba 1", "Bedroom 1", "Спальня 1")
      ),
      img(
        "bedroom-2a.jpg",
        t3(locale, "Spavaća soba 2", "Bedroom 2", "Спальня 2")
      ),
      img(
        "attic-bedroom.jpg",
        t3(locale, "Spavaća soba 3", "Bedroom 3", "Спальня 3")
      ),
      img("bathroom-1.jpg", t3(locale, "Kupatilo", "Bathroom", "Ванная")),
      img("library-1.jpg", t3(locale, "Biblioteka", "Library", "Библиотека")),
      img(
        "arch-dining.jpg",
        t3(locale, "Luk prema trpezariji", "Arch toward the dining area", "Арка в столовую")
      ),
    ],
    "soba-1": [
      img(
        "bedroom-1.jpg",
        t3(locale, "Spavaća soba 1", "Bedroom 1", "Спальня 1")
      ),
      img(
        "bedroom-2b.jpg",
        t3(
          locale,
          "Spavaća soba 1 — drugi ugao",
          "Bedroom 1 — another angle",
          "Спальня 1 — другой ракурс"
        )
      ),
    ],
    "soba-2": [
      img(
        "bedroom-2a.jpg",
        t3(locale, "Spavaća soba 2", "Bedroom 2", "Спальня 2")
      ),
      img(
        "bedroom-2c.jpg",
        t3(locale, "Spavaća soba 2 — detalj", "Bedroom 2 — detail", "Спальня 2 — деталь")
      ),
    ],
    "soba-3": [
      img(
        "attic-bedroom.jpg",
        t3(locale, "Bračni krevet u potkrovlju", "Double bed in the attic", "Двуспальная кровать в мансарде")
      ),
      img(
        "attic-lounge.jpg",
        t3(locale, "Salon u potkrovlju", "Attic lounge", "Салон в мансарде")
      ),
      img(
        "attic-beds.jpg",
        t3(locale, "Kreveti u potkrovlju", "Beds in the attic", "Кровати в мансарде")
      ),
    ],
    kupatilo: [
      img("bathroom-1.jpg", t3(locale, "Kupatilo", "Bathroom", "Ванная")),
      img(
        "bathroom-2.jpg",
        t3(locale, "Drugo kupatilo", "Second bathroom", "Второй санузел")
      ),
    ],
  };
}

function interiorSubs(locale: Locale): InteriorSubNav[] {
  const rooms = interiorRooms(locale);
  return INTERIOR_NAV_SUBS.map((id) => ({
    id,
    label: interiorSubLabel(locale, id),
    slides: rooms[id],
  }));
}

export function gatherThemes(locale: Locale): GalleryTheme[] {
  const interior = interiorSubs(locale);
  const sve = interiorRooms(locale).sve;

  return [
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
        img(
          "pool-2.jpg",
          t3(locale, "Popodneva kraj vode", "Afternoons by the water", "Дни у воды")
        ),
        img(
          "pool-night-1.jpg",
          t3(
            locale,
            "Večeri pod zvezdama kraj bazena",
            "Evenings under the stars by the pool",
            "Вечера под звёздами у бассейна"
          )
        ),
        img(
          "pool-night-2.jpg",
          t3(
            locale,
            "Osvetljen bazen noću",
            "Illuminated pool at night",
            "Подсвеченный бассейн ночью"
          )
        ),
        img(
          "pool-night-3.jpg",
          t3(
            locale,
            "Bašta i bazen u sumrak",
            "Garden and pool at dusk",
            "Сад и бассейн в сумерках"
          )
        ),
      ],
    },
    {
      id: "basta",
      label: t3(locale, "Bašta", "Garden", "Сад"),
      slides: [
        img(
          "garden-bbq.jpg",
          t3(
            locale,
            "Roštilj i druženje u bašti",
            "Barbecue and company in the garden",
            "Гриль и компания в саду"
          )
        ),
        img("bbq-1.jpg", t3(locale, "Prostor za roštilj", "Barbecue area", "Зона барбекю")),
        img(
          "garden-fountain.jpg",
          t3(
            locale,
            "Mirna bašta sa česmom",
            "Quiet garden with a fountain",
            "Тихий сад с фонтаном"
          )
        ),
        img(
          "garden-table.jpg",
          t3(
            locale,
            "Sto u bašti za okupljanja",
            "Garden table for gathering",
            "Стол в саду для встреч"
          )
        ),
        img("garden-lower-1.jpg", t3(locale, "Donja bašta", "Lower garden", "Нижний сад")),
      ],
    },
    {
      id: "terase",
      label: t3(locale, "Terase", "Terraces", "Террасы"),
      slides: [
        img("terrace-upper.jpg", t3(locale, "Gornja terasa", "Upper terrace", "Верхняя терраса")),
        img("terrace-lower-1.jpg", t3(locale, "Donja terasa", "Lower terrace", "Нижняя терраса")),
        img(
          "terrace-lower-2.jpg",
          t3(
            locale,
            "Donja terasa — drugi ugao",
            "Lower terrace — another angle",
            "Нижняя терраса — другой ракурс"
          )
        ),
        img(
          "garden-upper-bench.jpg",
          t3(
            locale,
            "Klupa na gornjoj terasi",
            "Bench on the upper terrace",
            "Скамья на верхней террасе"
          )
        ),
        img(
          "exterior-1.jpg",
          t3(
            locale,
            "Kuća i terase među zelenilom",
            "House and terraces among greenery",
            "Дом и террасы среди зелени"
          )
        ),
      ],
    },
    {
      id: "unutra",
      label: t3(locale, "Unutra", "Inside", "Внутри"),
      slides: sve,
      subs: interior,
    },
  ];
}

export function slidesForTheme(
  theme: GalleryTheme,
  sub: InteriorSubCategory
): Slide[] {
  if (theme.id !== "unutra" || !theme.subs) return theme.slides;
  return theme.subs.find((item) => item.id === sub)?.slides ?? theme.slides;
}
