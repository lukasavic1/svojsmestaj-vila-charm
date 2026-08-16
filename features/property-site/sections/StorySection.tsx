"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Slideshow, type Slide } from "./Slideshow";

type StorySectionProps = {
  id?: string;
  title: string;
  body: string | string[];
  slides: Slide[];
  /** When true, the slideshow sits on the left and the text on the right. */
  flip?: boolean;
  mediaLabel?: string;
  children?: ReactNode;
};

/** Uniform narrative section — half text, half slideshow, alternating sides. */
export function StorySection({
  id,
  title,
  body,
  slides,
  flip = false,
  mediaLabel,
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

        <Reveal className="vh-story-media" delay={60}>
          <Slideshow slides={slides} label={mediaLabel} />
        </Reveal>
      </div>
    </section>
  );
}
