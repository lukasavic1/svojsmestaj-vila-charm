"use client";

import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";
import { StorySection } from "./StorySection";
import type { Slide } from "./Slideshow";

/** Chapter three — moments with people. Text left, slideshow right. */
export function AlbumSection() {
  const { locale } = useDemo();

  const slides: Slide[] = [
    {
      kind: "video",
      src: "/videos/celebrations.mp4",
      poster: "/images/pool-gathering.jpg",
      alt: t3(
        locale,
        "Proslave i druženja",
        "Celebrations & gatherings",
        "Праздники и встречи"
      ),
    },
    {
      kind: "image",
      src: "/images/pool-gathering.jpg",
      alt: t3(
        locale,
        "Društvo okupljeno oko bazena",
        "Friends gathered around the pool",
        "Компания у бассейна"
      ),
    },
    {
      kind: "image",
      src: "/images/pool-play.jpg",
      alt: t3(
        locale,
        "Prvi skok u bazen",
        "The first jump into the pool",
        "Первый прыжок в бассейн"
      ),
    },
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
  ];

  return (
    <StorySection
      id="galerija"
      title={t3(
        locale,
        "Trenuci koji ostaju",
        "Moments that stay",
        "Моменты, которые остаются"
      )}
      body={[
        t3(
          locale,
          "Slike koje pamte više od nas. Svaka fotografija je trenutak koji je neko drugi već doživeo — večera u sumrak, prvi skok u bazen, jutro na terasi.",
          "Images that remember more than we do. Every photo is a moment someone else has already lived — dinner at dusk, the first dive into the pool, morning on the terrace.",
          "Кадры, которые помнят больше нас. Каждый кадр — момент, который уже кто-то прожил: ужин в сумерках, первый прыжок в бассейн, утро на террасе."
        ),
        t3(
          locale,
          "Pogledajte ih, pa dođite da napravite svoje.",
          "Look through them, then come make your own.",
          "Посмотрите их — и приезжайте создать свои."
        ),
      ]}
      slides={slides}
      mediaLabel={t3(
        locale,
        "Druženja na imanju",
        "Gatherings on the estate",
        "Встречи в усадьбе"
      )}
    />
  );
}
