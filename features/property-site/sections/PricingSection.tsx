"use client";

import { PricingBoard } from "./PricingBoard";

/** Backwards-compatible standalone pricing section. */
export function PricingSection() {
  return (
    <section id="cene" aria-labelledby="pricing-title">
      <PricingBoard />
    </section>
  );
}
