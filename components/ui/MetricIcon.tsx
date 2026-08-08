import type { ReactNode } from "react";

export type MetricIconId =
  | "area"
  | "pin"
  | "pool"
  | "bed"
  | "users"
  | "bath"
  | "moon";

const s = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  width: 20,
  height: 20,
};

const icons: Record<MetricIconId, ReactNode> = {
  area: (
    <svg {...s}>
      <path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>
  ),
  pin: (
    <svg {...s}>
      <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  ),
  pool: (
    <svg {...s}>
      <path d="M3 16c1.5-1 3-1.5 4.5-1.5S10.5 15 12 16s3 1.5 4.5 1.5S19.5 15 21 14" />
      <path d="M3 20c1.5-1 3-1.5 4.5-1.5S10.5 19 12 20s3 1.5 4.5 1.5S19.5 19 21 18" />
      <path d="M8 4v8M16 4v8M8 8h8" />
    </svg>
  ),
  bed: (
    <svg {...s}>
      <path d="M3 18V9a2 2 0 0 1 2-2h6v7H3Z" />
      <path d="M13 14h6a2 2 0 0 1 2 2v2" />
      <path d="M3 18h18M5 7V5" />
    </svg>
  ),
  users: (
    <svg {...s}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M15.5 19a4 4 0 0 1 5.5-3.6" />
    </svg>
  ),
  bath: (
    <svg {...s}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V7a2 2 0 0 1 2-2h1" />
      <path d="M4 19v1M20 19v1" />
    </svg>
  ),
  moon: (
    <svg {...s}>
      <path d="M18 14.5A7.5 7.5 0 0 1 9.5 6 6.5 6.5 0 1 0 18 14.5Z" />
    </svg>
  ),
};

export function MetricIcon({ id }: { id: MetricIconId }) {
  return <>{icons[id]}</>;
}
