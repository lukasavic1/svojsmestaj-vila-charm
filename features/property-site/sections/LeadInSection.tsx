"use client";

import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";
import { StorySection } from "./StorySection";
import type { Slide } from "./Slideshow";

/** Chapter one — the quiet arrival. Text left, slideshow right. */
export function LeadInSection() {
  const { locale } = useDemo();

  const slides: Slide[] = [
    {
      kind: "image",
      src: "/images/garden-fountain.jpg",
      alt: t3(
        locale,
        "Mirna bašta sa česmom na imanju Villa Charm",
        "Quiet garden with a fountain at Villa Charm",
        "Тихий сад с фонтаном в имении Villa Charm"
      ),
    },
    {
      kind: "image",
      src: "/images/terrace-upper.jpg",
      alt: t3(
        locale,
        "Jutro na gornjoj terasi",
        "Morning on the upper terrace",
        "Утро на верхней террасе"
      ),
    },
    {
      kind: "video",
      src: "/videos/property-tour-1.mp4",
      poster: "/images/exterior-1.jpg",
      alt: t3(locale, "Obilazak imanja", "Property tour", "Обзор имения"),
    },
  ];

  return (
    <StorySection
      title={t3(
        locale,
        "Tišina koja leči",
        "Silence that heals",
        "Тишина, которая лечит"
      )}
      body={[
        t3(
          locale,
          "Negde između Beograda i tišine, na 2.000 m² zemlje, vreme usporava.",
          "Somewhere between Belgrade and silence, on 2,000 m² of land, time slows down.",
          "Где-то между Белградом и тишиной, на 2 000 м² земли, время замедляется."
        ),
        t3(
          locale,
          "Villa Charm nije samo mesto za odsedanje — to je prostor gde grad ostaje iza vas, a dan počinje da diše sporije.",
          "Villa Charm isn’t just a place to stay — it’s a space where the city stays behind you and the day begins to breathe more slowly.",
          "Villa Charm — не просто место для проживания, а пространство, где город остаётся позади, а день начинает дышать медленнее."
        ),
      ]}
      slides={slides}
      mediaLabel={t3(
        locale,
        "Prizori imanja",
        "Scenes of the estate",
        "Виды усадьбы"
      )}
    />
  );
}
