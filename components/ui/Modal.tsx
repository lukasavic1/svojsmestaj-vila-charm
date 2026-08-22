"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  closeLabel: string;
  panelClassName?: string;
  /** Swipe / drag down to dismiss (mobile bottom sheets). Default true. */
  swipeToClose?: boolean;
  /** Keep title for a11y but hide visually (custom in-body headings). */
  titleHidden?: boolean;
};

const DISMISS_DY = 110;

export function Modal({
  open,
  title,
  onClose,
  children,
  closeLabel,
  panelClassName,
  swipeToClose = true,
  titleHidden = false,
}: ModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    tracking: false,
    startY: 0,
    startX: 0,
    dy: 0,
    fromHandle: false,
    axis: null as null | "v" | "h",
  });
  const [mounted, setMounted] = useState(false);
  const [dragging, setDragging] = useState(false);

  const contentScrollTop = () => {
    const body = bodyRef.current;
    const nested = body?.querySelector<HTMLElement>(
      ".qv-scroll, .booking-wizard-scroll"
    );
    return Math.max(
      body?.scrollTop ?? 0,
      panelRef.current?.scrollTop ?? 0,
      nested?.scrollTop ?? 0
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock before paint so the page behind doesn't flash/jump through the backdrop.
  useLayoutEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const { style } = document.body;
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
      left: style.left,
      right: style.right,
      htmlOverflow: html.style.overflow,
    };

    html.classList.add("is-scroll-locked");
    html.style.overflow = "hidden";
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";

    const blockBgTouch = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest(
          ".qv-scroll, .modal-body, .modal-panel, .head-drawer, .vh-book-dock, .booking-wizard, .booking-wizard-scroll, .cal-grid, input, textarea"
        )
      ) {
        return;
      }
      e.preventDefault();
    };
    document.addEventListener("touchmove", blockBgTouch, { passive: false });

    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      html.classList.remove("is-scroll-locked");
      html.style.overflow = prev.htmlOverflow;
      style.overflow = prev.overflow;
      style.position = prev.position;
      style.top = prev.top;
      style.left = prev.left;
      style.right = prev.right;
      style.width = prev.width;
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
      document.removeEventListener("touchmove", blockBgTouch);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open && panelRef.current) {
      panelRef.current.style.transform = "";
      panelRef.current.style.transition = "";
    }
  }, [open]);

  const resetDragVisual = (animate: boolean) => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.transition = animate ? "transform 0.28s var(--ease, ease)" : "";
    panel.style.transform = "";
  };

  const beginDrag = (clientX: number, clientY: number, fromHandle: boolean) => {
    if (!swipeToClose) return;
    if (!fromHandle && contentScrollTop() > 0) {
      drag.current.tracking = false;
      return;
    }
    drag.current = {
      tracking: true,
      startX: clientX,
      startY: clientY,
      dy: 0,
      fromHandle,
      axis: fromHandle ? "v" : null,
    };
  };

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    beginDrag(t.clientX, t.clientY, false);
  };

  const onHandleTouchStart = (e: TouchEvent) => {
    e.stopPropagation();
    const t = e.touches[0];
    if (!t) return;
    beginDrag(t.clientX, t.clientY, true);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!swipeToClose || !drag.current.tracking) return;
    const t = e.touches[0];
    if (!t) return;

    if (!drag.current.fromHandle && contentScrollTop() > 0) {
      drag.current.tracking = false;
      setDragging(false);
      resetDragVisual(false);
      return;
    }

    const dx = t.clientX - drag.current.startX;
    const dy = t.clientY - drag.current.startY;

    if (!drag.current.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        drag.current.axis = "h";
        drag.current.tracking = false;
        return;
      }
      drag.current.axis = "v";
    }

    if (drag.current.axis !== "v") return;

    if (dy <= 0) {
      drag.current.dy = 0;
      if (dragging) setDragging(false);
      resetDragVisual(false);
      return;
    }

    drag.current.dy = dy;
    if (!dragging) setDragging(true);
    const panel = panelRef.current;
    if (panel) {
      panel.style.transition = "none";
      panel.style.transform = `translateY(${dy}px)`;
    }
  };

  const onTouchEnd = () => {
    if (!swipeToClose || !drag.current.tracking) return;
    const { dy } = drag.current;
    drag.current.tracking = false;
    setDragging(false);

    if (dy >= DISMISS_DY) {
      onClose();
      return;
    }
    resetDragVisual(true);
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div className="modal-root" role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        className={`modal-panel${panelClassName ? ` ${panelClassName}` : ""}${
          dragging ? " is-dragging" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div
          className="modal-sheet-handle"
          aria-hidden="true"
          onTouchStart={onHandleTouchStart}
        />
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h2
          id={titleId}
          className={`modal-title${titleHidden ? " is-sr-only" : ""}`}
        >
          {title}
        </h2>
        <div className="modal-body" ref={bodyRef}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
