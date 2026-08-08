import type { PackageId } from "@/types/package";
import { DEFAULT_PACKAGE, PACKAGE_IDS } from "@/types/package";

export function isPackageId(value: string | null | undefined): value is PackageId {
  return PACKAGE_IDS.includes(value as PackageId);
}

export function parsePackageParam(value: string | null): PackageId | null {
  return isPackageId(value) ? value : null;
}

export { DEFAULT_PACKAGE };
