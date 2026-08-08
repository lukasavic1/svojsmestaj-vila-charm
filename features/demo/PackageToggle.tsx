"use client";

import type { PackageId } from "@/types/package";
import { useDemo } from "./DemoProvider";

export function PackageToggle() {
  const { packageId, setPackageId, ui } = useDemo();

  const options: { id: PackageId; label: string; hint: string }[] = [
    { id: "basic", label: ui.demo.basic, hint: ui.demo.priceHint },
    { id: "premium", label: ui.demo.premium, hint: ui.demo.priceHintPremium },
  ];

  return (
    <div className="seg-control" role="group" aria-label={ui.demo.packageGroup}>
      {options.map((opt) => {
        const active = packageId === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            className={`seg-btn${active ? " is-active" : ""}`}
            aria-pressed={active}
            title={opt.hint}
            onClick={() => setPackageId(opt.id)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
