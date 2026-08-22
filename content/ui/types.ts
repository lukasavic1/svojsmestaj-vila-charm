/** Shape of UI chrome copy. Values are plain strings so locales can diverge. */
export type UiDictionary = {
  demo: {
    tag: string;
    banner: string;
    whatsappCta: string;
    packageGroup: string;
    languageGroup: string;
    basic: string;
    premium: string;
    priceHint: string;
    priceHintPremium: string;
    dockLabel: string;
    dockHint: string;
    dockOpen: string;
    compareCta: string;
    compareTitle: string;
    compareLead: string;
    compareClose: string;
    premiumFeatures: string[];
  };
  nav: {
    about: string;
    gallery: string;
    amenities: string;
    dates: string;
    contact: string;
    book: string;
  };
  gallery: {
    showAll: string;
    open: string;
    dialog: string;
    close: string;
    prev: string;
    next: string;
  };
  calendar: {
    prevMonth: string;
    nextMonth: string;
    free: string;
    busy: string;
    months: string[];
    days: string[];
  };
  availability: {
    heading: string;
    lead: string;
  };
  booking: {
    contactOnlyTitle: string;
    contactOnlyBody: string;
    checkAvailability: string;
    sendInquiry: string;
    sectionHeading: string;
    steps: {
      unit: string;
      dates: string;
      guests: string;
      review: string;
    };
    progressLabel: string;
    back: string;
    continue: string;
    confirm: string;
    selectUnit: string;
    selected: string;
    viewPhotos: string;
    chooseThis: string;
    closePreview: string;
    guestsLabel: string;
    bedrooms: string;
    bathrooms: string;
    size: string;
    beds: string;
    capacity: string;
    fromPrice: string;
    perNight: string;
    amenities: string;
    checkIn: string;
    checkOut: string;
    nights: string;
    nightOne: string;
    nightMany: string;
    selectCheckIn: string;
    selectCheckOut: string;
    selectCheckInShort: string;
    selectCheckOutShort: string;
    clearDates: string;
    rangeBlocked: string;
    summary: string;
    estimatedTotal: string;
    adults: string;
    children: string;
    guests: string;
    specialRequest: string;
    specialRequestHint: string;
    occupancyHint: string;
    occupancyError: string;
    guestDetails: string;
    fullName: string;
    email: string;
    phone: string;
    reviewTitle: string;
    reviewLead: string;
    notes: string;
    noNotes: string;
    successTitle: string;
    successLead: string;
    successBody: string;
    successClose: string;
    newRequest: string;
    estimatedStay: string;
    inquireSelected: string;
  };
  units: {
    heading: string;
    lead: string;
    details: string;
    bookThis: string;
  };
  agency: {
    kicker: string;
    heading: string;
    body: string;
    whatsapp: string;
    colophon: string;
    madeBy: string;
    region: string;
    benefits: string[];
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    instagram: string;
  };
  reviews: {
    googleBadge: string;
  };
  a11y: {
    mainNav: string;
    rating: string;
    menuOpen: string;
    menuClose: string;
  };
};
