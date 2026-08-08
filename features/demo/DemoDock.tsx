"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, CloseIcon, LayersIcon } from "@/components/ui/icons";
import { LanguageToggle } from "./LanguageToggle";
import { PackageToggle } from "./PackageToggle";
import { useDemo } from "./DemoProvider";

/** Fixed B2B widget — orb trigger expands into package / language panel. */
export function DemoDock() {
  const { isDemo, ui } = useDemo();
  const [infoOpen, setInfoOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!infoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInfoOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [infoOpen]);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanelOpen(false);
    };
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const node = dockRef.current;
      if (!node) return;
      const target = e.target as Node | null;
      if (target && !node.contains(target)) setPanelOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [panelOpen]);

  useEffect(() => {
    if (panelOpen) setHintVisible(false);
  }, [panelOpen]);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setHintVisible(false);
      return;
    }
    const hide = window.setTimeout(() => setHintVisible(false), 5200);
    return () => window.clearTimeout(hide);
  }, []);

  if (!isDemo) return null;

  return (
    <>
      <div
        ref={dockRef}
        className={`demo-dock${panelOpen ? " is-open" : " is-collapsed"}`}
        role="region"
        aria-label={ui.demo.packageGroup}
      >
        <div
          className={`demo-dock-hint${hintVisible && !panelOpen ? " is-visible" : ""}`}
          aria-hidden={!hintVisible || panelOpen}
        >
          {ui.demo.dockHint}
        </div>

        <button
          type="button"
          className="demo-dock-orb"
          aria-expanded={panelOpen}
          aria-controls="demo-dock-panel"
          aria-label={panelOpen ? ui.demo.compareClose : ui.demo.dockOpen}
          onClick={() => setPanelOpen((v) => !v)}
        >
          <span className="demo-dock-orb-pulse" aria-hidden="true" />
          <span className="demo-dock-orb-pulse demo-dock-orb-pulse--late" aria-hidden="true" />
          <span className="demo-dock-orb-core" aria-hidden="true">
            {panelOpen ? <CloseIcon /> : <LayersIcon />}
          </span>
        </button>

        <div
          id="demo-dock-panel"
          className="demo-dock-panel"
          hidden={!panelOpen}
        >
          <div className="demo-dock-panel-head">
            <p className="demo-dock-label">{ui.demo.dockLabel}</p>
            <button
              type="button"
              className="demo-dock-collapse"
              onClick={() => setPanelOpen(false)}
              aria-label={ui.demo.compareClose}
            >
              ×
            </button>
          </div>
          <PackageToggle />
          <LanguageToggle />
          <button
            type="button"
            className="demo-dock-info"
            onClick={() => setInfoOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={infoOpen}
          >
            {ui.demo.compareCta}
          </button>
        </div>
      </div>

      {infoOpen && (
        <div
          className="pkg-modal-root"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setInfoOpen(false);
          }}
        >
          <div
            className="pkg-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="pkg-modal-head">
              <div>
                <h2 id={titleId}>{ui.demo.compareTitle}</h2>
                <p>{ui.demo.compareLead}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="pkg-modal-close"
                onClick={() => setInfoOpen(false)}
                aria-label={ui.demo.compareClose}
              >
                ×
              </button>
            </div>
            <ul className="pkg-modal-list">
              {ui.demo.premiumFeatures.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-solid btn-block"
              onClick={() => setInfoOpen(false)}
            >
              {ui.demo.compareClose}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
