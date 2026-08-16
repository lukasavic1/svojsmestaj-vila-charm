"use client";

import type { ComponentType } from "react";
import { Suspense } from "react";
import type { SectionId } from "@/config/experience";
import { DemoProvider, useDemo } from "@/features/demo/DemoProvider";
import {
  HeroVariantProvider,
  useHeroVariant,
} from "@/features/hero-preview/HeroVariantProvider";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { AvailabilitySection } from "./sections/AvailabilitySection";
import { AlbumSection } from "./sections/AlbumSection";
import { ClosingSection } from "./sections/ClosingSection";
import { ContactSection } from "./sections/ContactSection";
import { DiscoverySection } from "./sections/DiscoverySection";
import { ExperiencesSection } from "./sections/ExperiencesSection";
import { FeatureSection } from "./sections/FeatureSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { GallerySection } from "./sections/GallerySection";
import { GatherSection } from "./sections/GatherSection";
import { HeroSection } from "./sections/HeroSection";
import { HostSection } from "./sections/HostSection";
import { IntroSection } from "./sections/IntroSection";
import { LeadInSection } from "./sections/LeadInSection";
import { MapSection } from "./sections/MapSection";
import { BookingBubble } from "./sections/BookingBubble";
import { PricingSection } from "./sections/PricingSection";
import { ReviewsSection } from "./sections/ReviewsSection";
import { RulesSection } from "./sections/RulesSection";
import { StatementSection } from "./sections/StatementSection";
import { VideoSection } from "./sections/VideoSection";
import { SiteFooter } from "./sections/SiteFooter";
import { SiteHeader } from "./sections/SiteHeader";

const SECTION_MAP: Record<SectionId, ComponentType> = {
  hero: HeroSection,
  leadin: LeadInSection,
  statement: StatementSection,
  experiences: ExperiencesSection,
  feature: FeatureSection,
  discovery: DiscoverySection,
  intro: IntroSection,
  gallery: GallerySection,
  video: VideoSection,
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
  gather: GatherSection,
  album: AlbumSection,
};

function PropertyExperience() {
  const { experience, packageId } = useDemo();
  const { variant } = useHeroVariant();

  return (
    <>
      <div
        id="top"
        className="property-experience vh-root"
        data-experience={experience.id}
        data-motion={experience.motion}
        data-header={experience.header}
        data-theme="charm-editorial"
        data-hero-variant={variant}
      >
        <SiteHeader />
        <main key={packageId} className="experience-main">
          {experience.sections.map((id) => {
            const Section = SECTION_MAP[id];
            return <Section key={id} />;
          })}
        </main>
        <SiteFooter />
      </div>
      <BookingBubble />
    </>
  );
}

export function PropertySite() {
  return (
    <Suspense fallback={null}>
      <DemoProvider>
        <HeroVariantProvider>
          <PropertyExperience />
        </HeroVariantProvider>
      </DemoProvider>
    </Suspense>
  );
}
