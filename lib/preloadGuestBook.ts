import { GUEST_BOOK_PHOTOS } from "@/data/guestBook";

let inflight: Promise<void> | null = null;
/** Keep nodes alive so iOS does not cancel in-flight decodes. */
const keepAlive: HTMLImageElement[] = [];

function loadOne(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    keepAlive.push(img);
    const done = () => resolve();
    img.onload = () => {
      if (typeof img.decode === "function") {
        void img.decode().then(done).catch(done);
        return;
      }
      done();
    };
    img.onerror = done;
    img.decoding = "async";
    img.src = src;
  });
}

/** Decode guestbook pages into the browser image cache. Safe to call often. */
export function ensureGuestBookPreload(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!inflight) {
    inflight = Promise.all(GUEST_BOOK_PHOTOS.map((photo) => loadOne(photo.src))).then(
      () => undefined
    );
  }
  return inflight;
}

const PHOTOS_BOOT_MS = 8_000;

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
