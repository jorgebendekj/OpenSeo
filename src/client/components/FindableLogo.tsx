import React from "react";
import { BRAND } from "@/shared/brand";

interface FindableMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function FindableMark({ size = 24, className = "", ...props }: FindableMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Vertical stem of F */}
      <path
        d="M5 4.5v15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Top connector from stem into magnifying lens */}
      <path
        d="M5 5.75h6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Middle horizontal bar of F */}
      <path
        d="M5 12h5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Magnifying Glass (Lupa) circular lens */}
      <circle
        cx="14"
        cy="8.5"
        r="4.25"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Magnifying Glass handle */}
      <path
        d="M17.2 11.7l3.3 3.3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FindableLogo({
  markSize = 22,
  showText = true,
  className = "",
}: {
  markSize?: number;
  showText?: boolean;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 font-display ${className}`}>
      <FindableMark size={markSize} className="text-primary" />
      {showText && (
        <span className="font-bold text-base tracking-tight text-base-content">
          {BRAND.name}
        </span>
      )}
    </div>
  );
}
