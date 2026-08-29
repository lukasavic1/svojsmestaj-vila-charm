/** Preferred public hosts — both stay live; never redirect .com ↔ .rs. */
export const SITE_HOSTS = {
  com: "www.villa-charm.com",
  rs: "villacharm.rs",
} as const;

export const SITE_URLS = [
  `https://${SITE_HOSTS.com}`,
  `https://${SITE_HOSTS.rs}`,
] as const;

/** Incoming host → preferred host on the same TLD (www vs apex only). */
export const HOST_CANONICAL: Record<string, string> = {
  "www.villa-charm.com": SITE_HOSTS.com,
  "villa-charm.com": SITE_HOSTS.com,
  "villacharm.rs": SITE_HOSTS.rs,
  "www.villacharm.rs": SITE_HOSTS.rs,
};

export function canonicalHostFor(
  hostHeader: string | null | undefined
): string | null {
  const host =
    hostHeader?.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
  return HOST_CANONICAL[host] ?? null;
}
