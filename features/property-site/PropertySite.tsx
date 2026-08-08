"use client";

import type { ComponentType } from "react";
import { Suspense } from "react";
import type { SectionId } from "@/config/experience";
import { DemoProvider, useDemo } from "@/features/demo/DemoProvider";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { AvailabilitySection } from "./sections/AvailabilitySection";
import { ClosingSection } from "./sections/ClosingSection";
import { ContactSection } from "./sections/ContactSection";
import { DiscoverySection } from "./sections/DiscoverySection";
import { ExperiencesSection } from "./sections/ExperiencesSection";
import { FeatureSection } from "./sections/FeatureSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { HostSection } from "./sections/HostSection";
import { IntroSection } from "./sections/IntroSection";
import { MapSection } from "./sections/MapSection";
import { MobileBookBar } from "./sections/MobileBookBar";
import { PricingSection } from "./sections/PricingSection";
import { ReviewsSection } from "./sections/ReviewsSection";
import { RulesSection } from "./sections/RulesSection";
import { StatementSection } from "./sections/StatementSection";
import { StorySection } from "./sections/StorySection";
import { VideoSection } from "./sections/VideoSection";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";

const SECTION_MAP: Record<SectionId, ComponentType> = {
  hero: HeroSection,
  statement: StatementSection,
  experiences: ExperiencesSection,
  feature: FeatureSection,
  discovery: DiscoverySection,
  intro: IntroSection,
  gallery: GallerySection,
  video: VideoSection,
  story: StorySection,
  features: FeaturesSection,
  amenities: AmenitiesSection,
  pricing: PricingSection,
  availability: AvailabilitySection,
  rules: RulesSection,
  host: HostSection,
  reviews: ReviewsSection,
  map: MapSection,
  closing: ClosingSection,
  contact: ContactSection,
};

function PropertyExperience() {
  const { experience, packageId } = useDemo();

  return (
    <div
      id="top"
      className="property-experience vh-root"
      data-experience={experience.id}
      data-motion={experience.motion}
      data-header={experience.header}
      data-theme="charm-editorial"
    >
      <SiteHeader />
      <main key={packageId} className="experience-main">
        {experience.sections.map((id) => {
          const Section = SECTION_MAP[id];
          return <Section key={id} />;
        })}
      </main>
      <SiteFooter />
      <MobileBookBar />
    </div>
  );
}

export function PropertySite() {
  return (
    <Suspense fallback={null}>
      <DemoProvider>
        <PropertyExperience />
      </DemoProvider>
    </Suspense>
  );
}
