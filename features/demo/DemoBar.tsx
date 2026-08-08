"use client";

import { agency } from "@/data/agency";
import { useDemo } from "./DemoProvider";

/** Slim B2B announcement — package controls live in DemoDock. */
export function DemoBar() {
  const { isDemo, ui } = useDemo();
  if (!isDemo) return null;

  return (
    <aside className="demo-bar" aria-label={ui.demo.tag}>
      <div className="wrap demo-bar-inner">
        <span className="tag">{ui.demo.tag}</span>
        <p className="demo-bar-text">{ui.demo.banner}</p>
        <a
          href={agency.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {ui.demo.whatsappCta}
        </a>
      </div>
    </aside>
  );
}
