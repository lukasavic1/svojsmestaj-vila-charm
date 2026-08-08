"use client";

import { useDemo } from "@/features/demo/DemoProvider";
import { ClassicHero } from "./ClassicHero";
import { VideoHero } from "./VideoHero";

/** Premium uses cinematic video hero; basic keeps classic. */
export function HeroSection() {
  const { experience } = useDemo();
  return experience.hero === "immersive" ? <VideoHero /> : <ClassicHero />;
}
