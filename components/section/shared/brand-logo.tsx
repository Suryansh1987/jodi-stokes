import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  onNavigate?: () => void;
};

export function BrandLogo({ className, onNavigate }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn("brand-logo", className)}
      onClick={onNavigate}
      aria-label="Jodi Stokes Fitness home"
    >
      <span className="brand-logo__mark">JS</span>
      <span className="brand-logo__name">
        JODI&nbsp;STOKES
        <small>Fitness &middot; Lifestyle &middot; Nutrition</small>
      </span>
    </Link>
  );
}
