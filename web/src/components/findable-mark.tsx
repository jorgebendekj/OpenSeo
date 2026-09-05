import type { SVGProps } from "react";

export function FindableMark({
  size = 22,
  className = "",
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
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
