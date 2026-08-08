import type { PackageId } from "@/types/package";

export const packageMeta: Record<
  PackageId,
  { price: string; buildTime: string }
> = {
  basic: { price: "499€", buildTime: "~1 week" },
  premium: { price: "900€", buildTime: "~1–2 weeks" },
};
