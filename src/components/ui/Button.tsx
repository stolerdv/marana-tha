"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-gold)] text-[var(--color-cream-light)] hover:bg-[var(--color-gold-dark)]",
  outline:
    "border border-[var(--color-cream-light)] text-[var(--color-cream-light)] hover:bg-[var(--color-cream-light)] hover:text-[var(--color-ink)]",
  ghost:
    "text-[var(--color-gold)] hover:text-[var(--color-gold-dark)]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.9375rem]",
  md: "px-[44px] py-[14px] text-[0.9375rem]",
  lg: "px-8 py-4 text-[1rem]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  href,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-[family-name:var(--font-commissioner)] font-bold tracking-wide cursor-pointer transition-colors ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
