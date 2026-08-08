"use client";

import { useEffect, type RefObject } from "react";

/**
 * Enables click-drag scrolling on overflow rails (mouse + touch pointers).
 * Sets data-dragged="1" when movement exceeds threshold so click handlers can ignore.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let active = false;
    let startX = 0;
    let startScroll = 0;
    let dragged = false;

    const onPointerDown = (e: PointerEvent) => {
      // Touch/pen keep native overflow scrolling; mouse gets click-drag.
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      active = true;
      dragged = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.dataset.dragged = "0";
      el.classList.add("is-dragging");
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!active) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 8) {
        dragged = true;
        el.dataset.dragged = "1";
      }
      el.scrollLeft = startScroll - dx;
    };

    const end = (e: PointerEvent) => {
      if (!active) return;
      active = false;
      el.classList.remove("is-dragging");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      if (dragged) {
        // Keep flag briefly so click handlers on children can read it
        window.setTimeout(() => {
          if (el.dataset.dragged === "1") el.dataset.dragged = "0";
        }, 40);
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
    };
  }, [ref]);
}

export function wasDragged(el: HTMLElement | null) {
  return el?.dataset.dragged === "1";
}
