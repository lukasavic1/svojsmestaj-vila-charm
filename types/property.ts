import type { LocalizedString, LocalizedStringList } from "./locale";

export type Photo = {
  src: string;
  alt: LocalizedString;
  caption: LocalizedString;
  credit?: { author: string; url: string };
};

export type Feature = {
  title: LocalizedString;
  body: LocalizedString;
};

export type Review = {
  stars: 1 | 2 | 3 | 4 | 5;
  text: LocalizedString;
  name: string;
  place: LocalizedString;
};

/** Month is 0-based: 0 = January, 7 = August. */
export type YearMonth = { year: number; month: number };

export type Availability = {
  first: YearMonth;
  last: YearMonth;
  /** Key is "year-month" with 0-based month, e.g. "2026-7" = August 2026. */
  booked: Record<string, number[]>;
  sideHeading: LocalizedString;
  sideFacts: { label: LocalizedString; value: LocalizedString }[];
};

export type UnitSpecs = {
  capacity: number;
  /** Day-use capacity when larger gatherings are allowed. */
  dayCapacity?: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  beds: LocalizedString;
  summary: LocalizedString;
};

export type AmenityIconId =
  | "wifi"
  | "parking"
  | "ac"
  | "kitchen"
  | "terrace"
  | "sea"
  | "tv"
  | "fridge"
  | "linen"
  | "checkin"
  | "tips"
  | "shower"
  | "balcony"
  | "pool"
  | "bbq"
  | "washer"
  | "pets"
  | "garden"
  | "kids";

export type AmenityItem = {
  icon: AmenityIconId;
  label: LocalizedString;
};

export type StoryMoment = {
  title: LocalizedString;
  body: LocalizedString;
  image: Photo;
};

export type HouseRule = {
  label: LocalizedString;
  value: LocalizedString;
};

export type PropertyVideo = {
  src: string;
  poster: string;
  title: LocalizedString;
  caption: LocalizedString;
};

export type Unit = {
  id: string;
  name: LocalizedString;
  shortLabel: LocalizedString;
  initials: string;
  region: LocalizedString;
  hook: LocalizedString;
  badges: LocalizedStringList;
  specs: UnitSpecs;
  price: { amount: LocalizedString; note: LocalizedString; perNightEur: number };
  intro: {
    heading: LocalizedString;
    lead: LocalizedString;
    body: LocalizedStringList;
  };
  features: {
    heading: LocalizedString;
    items: Feature[];
  };
  amenities: {
    heading: LocalizedString;
    lead: LocalizedString;
    items: AmenityItem[];
  };
  photos: Photo[];
  availability: Availability;
};

export type PropertySiteData = {
  seo: {
    title: LocalizedString;
    description: LocalizedString;
  };
  story: {
    heading: LocalizedString;
    lead: LocalizedString;
    moments: StoryMoment[];
  };
  host: {
    heading: LocalizedString;
    name: string;
    initials: string;
    body: LocalizedStringList;
  };
  booking: {
    heading: LocalizedString;
    body: LocalizedStringList;
  };
  reviews: {
    heading: LocalizedString;
    lead: LocalizedString;
    google: {
      score: number;
      count: number;
      source: LocalizedString;
    };
    items: Review[];
  };
  contact: {
    heading: LocalizedString;
    lead: LocalizedString;
    phone: string;
    whatsapp: string;
    email: string;
    instagram?: { handle: string; url: string };
    footnote: LocalizedString;
  };
  map: {
    lat: number;
    lng: number;
    zoom: number;
    heading: LocalizedString;
    lead: LocalizedString;
    facts: { label: LocalizedString; value: LocalizedString }[];
  };
  rules: {
    heading: LocalizedString;
    lead: LocalizedString;
    items: HouseRule[];
  };
  videos: PropertyVideo[];
  /** First unit is shown in Basic; all units in Premium discovery. */
  units: Unit[];
};
