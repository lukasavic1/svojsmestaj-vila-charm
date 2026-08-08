"use client";

import { useId, useState, type ReactNode } from "react";

type TooltipProps = {
  content: string;
  children: ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className="tooltip"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="tooltip-trigger"
        aria-describedby={open ? id : undefined}
      >
        {children}
      </button>
      {open && (
        <span role="tooltip" id={id} className="tooltip-panel">
          {content}
        </span>
      )}
    </span>
  );
}
