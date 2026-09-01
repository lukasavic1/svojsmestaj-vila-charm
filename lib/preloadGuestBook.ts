import { GUEST_BOOK_PHOTOS } from "@/data/guestBook";

let inflight: Promise<void> | null = null;

/**
 * Warm the HTTP cache without a document <img> / preload link.
 * Those delay Chrome’s tab spinner until every byte finishes;
 * fetch() does not.
 */
function loadOne(src: string) {
  return fetch(src, { credentials: "same-origin" })
    .then(async (res) => {
      if (!res.ok) return;
      const blob = await res.blob();
      if (typeof createImageBitmap === "function") {
        const bitmap = await createImageBitmap(blob);
        bitmap.close();
      }
    })
    .catch(() => undefined);
}

/** Decode guestbook pages into the HTTP + image cache. Safe to call often. */
export function ensureGuestBookPreload(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!inflight) {
    inflight = Promise.all(GUEST_BOOK_PHOTOS.map((photo) => loadOne(photo.src))).then(
      () => undefined
    );
  }
  return inflight;
}

const PHOTOS_BOOT_MS = 6_000;

/** Resolves when pages are decoded, or after a cap so the splash cannot hang. */
export function waitForGuestBookPreload(): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    window.setTimeout(finish, PHOTOS_BOOT_MS);
    void ensureGuestBookPreload().then(finish);
  });
}
