const AGENCY_PHONE = "+381 67 774 7710";
const AGENCY_PHONE_RAW = "381677747710";

export const agency = {
  name: "SvojSmeštaj",
  phone: AGENCY_PHONE,
  email: "svojsmestaj@gmail.com",
  links: {
    tel: `tel:+${AGENCY_PHONE_RAW}`,
    whatsapp: `https://wa.me/${AGENCY_PHONE_RAW}?text=${encodeURIComponent(
      "Zdravo! Zanima me sajt za moj smeštaj."
    )}`,
    email: `mailto:svojsmestaj@gmail.com?subject=${encodeURIComponent(
      "Upit za sajt za smeštaj"
    )}`,
    telegram: "https://t.me/svojsmestaj",
    instagram: "https://instagram.com/svojsmestaj",
  },
  handles: {
    telegram: "@svojsmestaj",
    instagram: "@svojsmestaj",
  },
} as const;
