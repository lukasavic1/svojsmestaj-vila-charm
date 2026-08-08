export const PACKAGE_IDS = ["basic", "premium"] as const;
export type PackageId = (typeof PACKAGE_IDS)[number];

/** This property site ships as the premium experience. */
export const DEFAULT_PACKAGE: PackageId = "premium";
