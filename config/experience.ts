import type { PackageId } from "@/types/package";

export type SectionId =
  | "hero"
  | "statement"
  | "feature"
  | "discovery"
  | "intro"
  | "gallery"
  | "story"
  | "amenities"
  | "pricing"
  | "availability"
  | "rules"
  | "map"
  | "closing"
  | "contact"
  | "video"
  | "experiences"
  | "features"
  | "host"
  | "reviews";

export type ExperienceConfig = {
  id: PackageId;
  hero: "classic" | "immersive";
  discovery: boolean;
  booking: "contact-calendar" | "wizard";
  motion: "subtle" | "rich";
  header: "solid" | "overlay";
  sections: SectionId[];
};

export const experiences: Record<PackageId, ExperienceConfig> = {
  basic: {
    id: "basic",
    hero: "classic",
    discovery: false,
    booking: "contact-calendar",
    motion: "rich",
    header: "solid",
    sections: [
      "hero",
      "intro",
      "gallery",
      "amenities",
      "map",
      "contact",
    ],
  },
  premium: {
    id: "premium",
    hero: "immersive",
    discovery: false,
    booking: "wizard",
    motion: "rich",
    header: "overlay",
    /** Editorial story — not a generic hotel template order. */
    sections: [
      "hero",
      "statement",
      "experiences",
      "video",
      "gallery",
      "amenities",
      "pricing",
      "map",
      "contact",
    ],
  },
};

export function getExperience(packageId: PackageId): ExperienceConfig {
  return experiences[packageId];
}
