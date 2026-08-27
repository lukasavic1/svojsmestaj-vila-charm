const s = {
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
};

export const CheckIcon = () => (
  <svg {...s}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const PinIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const PhoneIcon = () => (
  <svg {...s}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const WhatsAppIcon = () => (
  <svg {...s}>
    <path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 21l2.3-5.3A8.4 8.4 0 1 1 21 11.5Z" />
    <path d="M8.6 9.1c0 3 2.3 5.3 5.3 5.3l.9-1.4 1.7.8c-.4 1-1.4 1.4-2.4 1.3a7 7 0 0 1-6.2-6.2c0-1 .4-2 1.3-2.4l.8 1.7Z" />
  </svg>
);

export const MailIcon = () => (
  <svg {...s}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

export const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
  </svg>
);

export const InfoIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

export const WhatsAppSimpleIcon = () => (
  <svg {...s}>
    <path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 21l2.3-5.3A8.4 8.4 0 1 1 21 11.5Z" />
  </svg>
);

export const ViewIcon = () => (
  <svg {...s}>
    <path d="M2 20h20M4 20V10l8-6 8 6v10M9 20v-5h6v5" />
  </svg>
);

export const ComfortIcon = () => (
  <svg {...s}>
    <path d="M3 11V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
    <path d="M2 15a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3M4 18v2M20 18v2M6 11V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2M13 11V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
  </svg>
);

export const LocationPinIcon = () => (
  <svg {...s}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const SyncIcon = () => (
  <svg {...s}>
    <path d="M21 12a9 9 0 0 0-15.5-6.4L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 15.5 6.4L21 16" />
    <path d="M16 21h5v-5" />
  </svg>
);

export const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

/** Stacked layers — package / compare affordance for the demo dock orb. */
export const LayersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
    <path d="m3 18 9 5 9-5" />
  </svg>
);

export const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const MenuIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const meta = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export const GuestsMetaIcon = () => (
  <svg {...meta}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const BedMetaIcon = () => (
  <svg {...meta}>
    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
    <path d="M4 10V6a2 2 0 0 1 2-2h4v6M14 4h4a2 2 0 0 1 2 2v4" />
  </svg>
);

export const TerraceMetaIcon = () => (
  <svg {...meta}>
    <path d="M4 20V10l8-6 8 6v10" />
    <path d="M9 20v-5h6v5" />
  </svg>
);

export const BeachMetaIcon = () => (
  <svg {...meta}>
    <path d="M2 12c2-2 4-3 6-3s4 1 6 3 4 3 6 3 4-1 6-3" />
    <path d="M12 3v6M8 21h8" />
  </svg>
);

export const META_BADGE_ICONS = [
  GuestsMetaIcon,
  BedMetaIcon,
  TerraceMetaIcon,
  BeachMetaIcon,
] as const;
