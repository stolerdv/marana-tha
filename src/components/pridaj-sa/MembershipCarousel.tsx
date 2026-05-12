"use client";

import { useRef, useState } from "react";

interface MembershipType {
  tag: string;
  color: string;
  textColor: string;
  title: string;
  description: string;
  points: string[];
}

export function MembershipCarousel({ types }: { types: MembershipType[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function scrollTo(idx: number) {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[idx] as HTMLElement;
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
    setCurrent(idx);
  }

  function prev() { scrollTo(Math.max(0, current - 1)); }
  function next() { scrollTo(Math.min(types.length - 1, current + 1)); }

  return (
    <>
      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0"
        style={{ scrollbarWidth: "none" }}
        onScroll={() => {
          const container = scrollRef.current;
          if (!container) return;
          const scrollLeft = container.scrollLeft;
          const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth ?? 1;
          setCurrent(Math.round(scrollLeft / (cardWidth + 24)));
        }}
      >
        {types.map((type, idx) => (
          <div
            key={type.tag}
            className="snap-start shrink-0 w-[80vw] sm:w-[60vw] lg:w-auto lg:flex-1"
            style={{ backgroundColor: type.color, borderRadius: "15px", padding: "40px 36px", position: "relative" }}
          >
            {/* Step number */}
            <div style={{ position: "absolute", top: "24px", right: "24px", fontFamily: "var(--font-commissioner)", fontSize: "60px", fontWeight: 700, color: "rgba(255,255,255,0.15)", lineHeight: 1 }}>
              {String(idx + 1).padStart(2, "0")}
            </div>
            {/* Tag */}
            <div style={{ display: "inline-block", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "50px", padding: "4px 14px", fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: type.textColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "20px" }}>
              {type.tag}
            </div>
            <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: type.textColor, marginBottom: "16px", lineHeight: "1.2" }}>
              {type.title}
            </h3>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: type.textColor, lineHeight: "1.65", marginBottom: "24px", opacity: 0.9 }}>
              {type.description}
            </p>
            <div className="flex flex-col gap-2" style={{ marginBottom: "28px" }}>
              {type.points.map((point, j) => (
                <div key={j} className="flex items-start gap-2">
                  <span style={{ color: type.textColor, opacity: 0.7, marginTop: "3px", flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: type.textColor, opacity: 0.85, lineHeight: "1.5" }}>{point}</span>
                </div>
              ))}
            </div>
            <a href="#pridat-sa" style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(255,255,255,0.2)", border: `1px solid ${type.textColor === "#fdf5f2" ? "rgba(253,245,242,0.4)" : "rgba(0,0,0,0.15)"}`, borderRadius: "50px", padding: "10px 20px", fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: type.textColor, textDecoration: "none" }}>
              Začať →
            </a>
          </div>
        ))}
      </div>

      {/* Mobile controls: arrows + dots */}
      <div className="flex items-center justify-center gap-4 mt-5 lg:hidden">
        {/* Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center justify-center transition-all disabled:opacity-30"
          style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #bea055", color: "#bea055", background: "transparent" }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M8 2L2 8l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {types.map((_, i) => (
            <button key={i} onClick={() => scrollTo(i)} style={{ width: i === current ? "20px" : "6px", height: "6px", borderRadius: "3px", backgroundColor: i === current ? "#977d3e" : "rgba(151,125,62,0.3)", transition: "all 0.3s", border: "none", padding: 0 }} />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={current === types.length - 1}
          className="flex items-center justify-center transition-all disabled:opacity-30"
          style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #bea055", color: "#bea055", background: "transparent" }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M2 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </>
  );
}
