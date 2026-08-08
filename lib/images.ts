/** Unsplash CDN helpers — higher default quality for hospitality imagery. */
export function unsplashSrc(
  id: string,
  opts: { w?: number; q?: number } = {}
): string {
  const w = opts.w ?? 1800;
  const q = opts.q ?? 90;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const IMAGE_QUALITY = {
  hero: 92,
  gallery: 90,
  card: 86,
  thumb: 80,
} as const;
