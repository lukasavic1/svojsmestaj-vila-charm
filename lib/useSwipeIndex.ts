"use client";

import { useEffect, type RefObject } from "react";

type Options = {
  count: number;
  /** +1 = next (swipe left), −1 = previous (swipe right) */
  onSwipe: (direction: 1 | -1) => void;
  threshold?: number;
  onInteract?: () => void;
};

/**
 * Pointer swipe (mouse, touch, pen) for indexed carousels.
 * Ignores vertical scrolls and clicks on buttons/links/tabs.
 */
export function useSwipeIndex(
  ref: RefObject<HTMLElement | null>,
  { count, onSwipe, threshold = 48, onInteract }: Options
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || count < 2) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let axis: "h" | "v" | null = null;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select, [role='tab']")) {
        return;
      }

      tracking = true;
      axis = null;
      startX = e.clientX;
      startY = e.clientY;
      onInteract?.();
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!tracking) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!axis) {
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
        if (axis === "v") {
          tracking = false;
          try {
            el.releasePointerCapture(e.pointerId);
          } catch {
            /* ignore */
          }
        }
      }
    };

    const end = (e: PointerEvent) => {
      if (!tracking) {
        axis = null;
        return;
      }

      const wasHorizontal = axis === "h";
      const dx = e.clientX - startX;
      tracking = false;
      axis = null;

      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }

      if (!wasHorizontal || Math.abs(dx) < threshold) return;
      onSwipe(dx < 0 ? 1 : -1);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
    };
  }, [ref, count, onSwipe, threshold, onInteract]);
}
