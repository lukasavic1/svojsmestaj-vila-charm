export const GUEST_BOOK_COUNT = 18;

export const GUEST_BOOK_PHOTOS = Array.from(
  { length: GUEST_BOOK_COUNT },
  (_, i) => ({
    src: `/images/reviews/review-${i + 1}.jpeg`,
    n: i + 1,
  })
);
