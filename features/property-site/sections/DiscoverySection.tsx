"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useDemo } from "@/features/demo/DemoProvider";
import { DiscoveryCard } from "./DiscoveryCard";
import { UnitQuickView } from "./UnitQuickView";
import type { Unit } from "@/types/property";

export function DiscoverySection() {
  const { experience, units, ui } = useDemo();
  const [preview, setPreview] = useState<Unit | null>(null);

  if (!experience.discovery || units.length < 2) return null;

  return (
    <section className="discovery-sec" id="jedinice" aria-labelledby="discovery-naslov">
      <div className="wrap">
        <Reveal>
          <h2 className="sec-title" id="discovery-naslov">
            {ui.units.heading}
          </h2>
          <p className="sec-lead">{ui.units.lead}</p>
        </Reveal>

        <div className="discovery-grid">
          {units.map((unit, i) => (
            <Reveal key={unit.id} delay={i * 80}>
              <DiscoveryCard unit={unit} onOpen={() => setPreview(unit)} />
            </Reveal>
          ))}
        </div>
      </div>

      {preview && (
        <UnitQuickView
          unit={preview}
          open
          onClose={() => setPreview(null)}
        />
      )}
    </section>
  );
}
