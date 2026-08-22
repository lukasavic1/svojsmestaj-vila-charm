import type { PackageId } from "@/types/package";

export type SectionId =
  | "hero"
  | "leadin"
  | "statement"
  | "feature"
  | "discovery"
  | "intro"
  | "gallery"
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
  | "reviews"
  | "gather"
  | "album";

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
    /** Four-chapter editorial narrative. */
    sections: [
      "hero",
      "leadin",
      "gather",
      "album",
      "reviews",
      "amenities",
      "map",
      "contact",
    ],
  },
};

export function getExperience(packageId: PackageId): ExperienceConfig {
  return experiences[packageId];
}
