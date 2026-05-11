"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// ─── Base FadeIn ─────────────────────────────────────────────────────────────
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  style?: React.CSSProperties;
}

export function FadeIn({ children, delay = 0, direction = "up", className, style }: FadeInProps) {
  const offset = 48;
  const initial = {
    opacity: 0,
    y: direction === "up" ? offset : direction === "down" ? -offset : 0,
    x: direction === "left" ? offset : direction === "right" ? -offset : 0,
  };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealText — clip-path line reveal (trending 2025) ───────────────────────
// Heading text reveals from below like a curtain lifting
interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function RevealText({ children, delay = 0, className, style, as: Tag = "p" }: RevealTextProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.p;
  return (
    <div style={{ overflow: "hidden", display: "block" }}>
      <MotionTag
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
        style={style}
      >
        {children}
      </MotionTag>
    </div>
  );
}

// ─── ScaleIn — scale + blur on enter (cards, images) ─────────────────────────
interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ScaleIn({ children, delay = 0, className, style }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger container ────────────────────────────────────────────────────────
interface StaggerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
}

export function Stagger({ children, className, style, staggerDelay = 0.08 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: staggerDelay } } }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem — spring physics ─────────────────────────────────────────────
export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1, y: 0, scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── SlideIn — horizontal reveal ─────────────────────────────────────────────
interface SlideInProps {
  children: ReactNode;
  from?: "left" | "right";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SlideIn({ children, from = "left", delay = 0, className, style }: SlideInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === "left" ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
