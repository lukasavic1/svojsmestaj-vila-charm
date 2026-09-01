"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useDemo } from "@/features/demo/DemoProvider";
import { t3 } from "@/lib/i18n";

const COUNT = 18;
const SPIN_MS = 48_000;
const DRAG_DEG_PER_PX = 0.38;

export const GUEST_BOOK_PHOTOS = Array.from({ length: COUNT }, (_, i) => ({
  src: `/images/reviews/review-${i + 1}.jpeg`,
  n: i + 1,
}));

function wrapTime(ms: number) {
  return ((ms % SPIN_MS) + SPIN_MS) % SPIN_MS;
}

export function GuestBookOrbit() {
  const { locale } = useDemo();
  const stageRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const reduceRef = useRef(false);
  const pointerRef = useRef({
    id: -1,
    startX: 0,
    lastX: 0,
    dragging: false,
    startTime: 0,
  });

  const [focus, setFocus] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = mq.matches;
    const onMq = () => {
      reduceRef.current = mq.matches;
      if (mq.matches) animRef.current?.pause();
      else if (!pointerRef.current.dragging) animRef.current?.play();
    };
    mq.addEventListener("change", onMq);

    const el = spinRef.current;
    if (!el) return;

    const anim = el.animate(
      [
        { transform: "rotateY(0deg)" },
        { transform: "rotateY(-360deg)" },
      ],
      {
        duration: SPIN_MS,
        iterations: Infinity,
        easing: "linear",
      }
    );
    animRef.current = anim;
    if (mq.matches) anim.pause();

    return () => {
      mq.removeEventListener("change", onMq);
      anim.cancel();
      animRef.current = null;
    };
  }, []);

  const setDragDeg = (deg: number) => {
    dragRef.current?.style.setProperty("--vh-gb-drag", `${deg}deg`);
  };

  const resumeSpin = (extraDeg = 0) => {
    const anim = animRef.current;
    if (!anim) return;
    const current = Number(anim.currentTime ?? 0);
    anim.currentTime = wrapTime(current + (-extraDeg / 360) * SPIN_MS);
    setDragDeg(0);
    if (!reduceRef.current) anim.play();
  };

  const pauseSpin = () => {
    animRef.current?.pause();
  };

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const stage = stageRef.current;
    if (!stage) return;
    pointerRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      lastX: e.clientX,
      dragging: false,
      startTime: Number(animRef.current?.currentTime ?? 0),
    };
    pauseSpin();
    try {
      stage.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const p = pointerRef.current;
    if (p.id !== e.pointerId) return;
    const dx = e.clientX - p.startX;
    if (!p.dragging && Math.abs(dx) < 8) return;
    if (!p.dragging) {
      p.dragging = true;
      setDragging(true);
      setFocus(null);
    }
    p.lastX = e.clientX;
    setDragDeg(dx * DRAG_DEG_PER_PX);
  };

  const endPointer = (e: PointerEvent<HTMLElement>) => {
    const p = pointerRef.current;
    if (p.id !== e.pointerId) return;
    const stage = stageRef.current;
    try {
      stage?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const dx = e.clientX - p.startX;
    const wasDrag = p.dragging;
    p.id = -1;
    p.dragging = false;
    setDragging(false);
    if (wasDrag) {
      setFocus(null);
      resumeSpin(dx * DRAG_DEG_PER_PX);
      return;
    }
    const onCard = (e.target as HTMLElement | null)?.closest?.(".vh-gb-card");
    if (!onCard) {
      setFocus(null);
      if (!reduceRef.current) animRef.current?.play();
    }
  };

  return (
    <div
      className={`vh-gb${focus !== null ? " is-paused" : ""}${dragging ? " is-dragging" : ""}`}
      aria-label={t3(locale, "Knjiga utisaka", "Guestbook", "Книга отзывов")}
    >
      <div
        ref={stageRef}
        className="vh-gb-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse" && pointerRef.current.id < 0) {
            setFocus(null);
            if (!reduceRef.current) animRef.current?.play();
          }
        }}
      >
        <div className="vh-gb-floor" aria-hidden="true" />
        <div className="vh-gb-tilt">
          <div ref={dragRef} className="vh-gb-drag">
            <div ref={spinRef} className="vh-gb-spin">
              <div className="vh-gb-ring">
                {GUEST_BOOK_PHOTOS.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    className={`vh-gb-card${focus === i ? " is-on" : ""}`}
                    style={{ "--i": i } as CSSProperties}
                    aria-label={t3(
                      locale,
                      `Stranica iz knjige utisaka ${photo.n}`,
                      `Guestbook page ${photo.n}`,
                      `Страница книги отзывов ${photo.n}`
                    )}
                    onPointerEnter={(ev) => {
                      if (ev.pointerType !== "mouse" || dragging) return;
                      setFocus(i);
                      pauseSpin();
                    }}
                    onPointerDown={(ev) => {
                      ev.stopPropagation();
                      setFocus(i);
                      pauseSpin();
                      onPointerDown(ev);
                    }}
                    onFocus={() => {
                      setFocus(i);
                      pauseSpin();
                    }}
                  >
                    <span className="vh-gb-face">
                      <img
                        src={photo.src}
                        alt=""
                        width={1200}
                        height={1600}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
