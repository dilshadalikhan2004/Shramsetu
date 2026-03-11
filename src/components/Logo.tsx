import React from "react";

interface LogoProps {
  className?: string;
  /** Use "dark" when placing logo on dark backgrounds */
  variant?: "light" | "dark";
}

export function Logo({ className = "w-40 h-auto", variant = "light" }: LogoProps) {
  return (
    <div
      className={`${variant === "dark" ? "bg-white rounded-2xl p-3 shadow-lg" : ""}`}
      style={{ display: "inline-block" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="ShramSetu"
        className={`object-contain ${className}`}
      />
    </div>
  );
}
