"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Slideshow, type Slide } from "./Slideshow";

type StorySectionProps = {
  id?: string;
  title: string;
  body: string | string[];
  slides?: Slide[];
  /** Replaces the slideshow when you need a custom media treatment. */
  media?: ReactNode;
  /** When true, the slideshow sits on the left and the text on the right. */
  flip?: boolean;
  mediaLabel?: string;
  /** Remount the slideshow when the set of slides changes (e.g. theme tabs). */
  mediaKey?: string;
  /** Sits above the slideshow — theme tabs, captions, etc. */
  mediaHeader?: ReactNode;
  children?: ReactNode;
};

/** Uniform narrative section — half text, half slideshow, alternating sides. */
export function StorySection({
  id,
  title,
  body,
  slides,
  media,
  flip = false,
  mediaLabel,
  mediaKey,
  mediaHeader,
  children,
}: StorySectionProps) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <section className={`vh-story${flip ? " vh-story--flip" : ""}`} id={id}>
      <div className="vh-wrap vh-story-grid">
        <Reveal className="vh-story-copy">
          <h2 className="vh-story-title">{title}</h2>
          {paragraphs.map((p) => (
            <p key={p} className="vh-story-body">
              {p}
            </p>
          ))}
          {children}
        </Reveal>

        {media ? (
          <div className="vh-story-media">
            {mediaHeader}
            {media}
          </div>
        ) : (
          <Reveal className="vh-story-media" delay={60}>
            {mediaHeader}
            {slides ? (
              <Slideshow
                key={mediaKey ?? "slides"}
                slides={slides}
                label={mediaLabel}
              />
            ) : null}
          </Reveal>
        )}
      </div>
    </section>
  );
}
