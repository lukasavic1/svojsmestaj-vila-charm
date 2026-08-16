"use client";

import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";
import { StorySection } from "./StorySection";
import type { Slide } from "./Slideshow";

/** Chapter two — the pool and the gathering space. Slideshow left, text right. */
export function GatherSection() {
  const { locale } = useDemo();

  const slides: Slide[] = [
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
  ];

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
      mediaLabel={t3(locale, "Bazen i bašta", "Pool and garden", "Бассейн и сад")}
    />
  );
}
