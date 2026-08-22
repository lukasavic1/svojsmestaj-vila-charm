import type { ReactNode } from "react";
import type { AmenityIconId } from "@/types/property";

const s = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  width: 22,
  height: 22,
};

const icons: Record<AmenityIconId, ReactNode> = {
  wifi: (
    <svg {...s}>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  parking: (
    <svg {...s}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
  ac: (
    <svg {...s}>
      <path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2" />
    </svg>
  ),
  kitchen: (
    <svg {...s}>
      <path d="M3 11h18v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9Z" />
      <path d="M4 11V7a2 2 0 0 1 2-2h2v6M16 5h2a2 2 0 0 1 2 2v4" />
    </svg>
  ),
  terrace: (
    <svg {...s}>
      <path d="M4 20V10l8-6 8 6v10" />
      <path d="M9 20v-5h6v5" />
    </svg>
  ),
  sea: (
    <svg {...s}>
      <path d="M2 12c2-2 4-3 6-3s4 1 6 3 4 3 6 3 4-1 6-3" />
      <path d="M2 17c2-2 4-3 6-3s4 1 6 3 4 3 6 3 4-1 6-3" />
    </svg>
  ),
  tv: (
    <svg {...s}>
      <rect x="2" y="7" width="20" height="13" rx="2" />
      <path d="m17 2-5 5-5-5" />
    </svg>
  ),
  fridge: (
    <svg {...s}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M6 10h12M10 6v2M10 14v2" />
    </svg>
  ),
  linen: (
    <svg {...s}>
      <path d="M2 12h20M4 12V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
      <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    </svg>
  ),
  checkin: (
    <svg {...s}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
    </svg>
  ),
  tips: (
    <svg {...s}>
      <path d="M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2Z" />
      <path d="M10 22h4" />
    </svg>
  ),
  shower: (
    <svg {...s}>
      <path d="M4 12h16M12 4v2" />
      <path d="M8 16v.01M12 16v.01M16 16v.01M10 20v.01M14 20v.01" />
      <path d="M6 8h12a2 2 0 0 0 0-4H8" />
    </svg>
  ),
  balcony: (
    <svg {...s}>
      <path d="M4 20V10l8-5 8 5v10" />
      <path d="M8 20v-4h8v4M2 20h20" />
    </svg>
  ),
  pool: (
    <svg {...s}>
      <path d="M2 16c2-1.5 3.5-2 5.5-2s3.5.5 5.5 2 3.5 2 5.5 2 3.5-.5 5.5-2" />
      <path d="M4 8h4l2 4h4" />
      <path d="M8 4v4" />
    </svg>
  ),
  bbq: (
    <svg {...s}>
      <path d="M6 18h12M8 18v3M16 18v3" />
      <path d="M5 10h14a1 1 0 0 1 1 1v2H4v-2a1 1 0 0 1 1-1Z" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  washer: (
    <svg {...s}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="13" r="5" />
      <circle cx="12" cy="13" r="2" />
      <path d="M8 5h.01M11 5h2" />
    </svg>
  ),
  pets: (
    <svg {...s}>
      <circle cx="11" cy="5.5" r="1.5" />
      <circle cx="16.5" cy="7.5" r="1.4" />
      <circle cx="6.5" cy="8" r="1.4" />
      <circle cx="18" cy="12" r="1.3" />
      <path d="M8.5 18c1.2-2.5 2.4-3.5 3.5-3.5s2.3 1 3.5 3.5" />
      <path d="M7 18.5c.8-1.2 1.6-1.8 2.4-1.8" />
    </svg>
  ),
  garden: (
    <svg {...s}>
      <path d="M12 22V10" />
      <path d="M12 10c-3-4-7-5-7-1 0 3 3 5 7 5" />
      <path d="M12 10c3-4 7-5 7-1 0 3-3 5-7 5" />
      <path d="M5 22h14" />
    </svg>
  ),
  kids: (
    <svg {...s}>
      <circle cx="9" cy="7" r="2.15" />
      <path d="M5.2 20v-5.2a3.8 3.8 0 0 1 7.6 0V20" />
      <circle cx="16.6" cy="9.2" r="1.65" />
      <path d="M13.8 20v-3.6a2.8 2.8 0 0 1 5.6 0V20" />
    </svg>
  ),
};

export function AmenityIcon({ id }: { id: AmenityIconId }) {
  return <>{icons[id]}</>;
}
