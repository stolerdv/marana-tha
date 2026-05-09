"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  dni: number;
  hodín: number;
  minút: number;
  sekúnd: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { dni: 0, hodín: 0, minút: 0, sekúnd: 0 };
  return {
    dni: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hodín: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minút: Math.floor((diff / (1000 * 60)) % 60),
    sekúnd: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="w-[108px] h-[108px] bg-[var(--color-gold)] flex flex-col items-center justify-center gap-1">
      <AnimatePresence mode="wait">
        <motion.span
          key={display}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="font-[family-name:var(--font-commissioner)] text-[2rem] font-normal text-[var(--color-cream-light)] leading-none"
        >
          {display}
        </motion.span>
      </AnimatePresence>
      <span className="font-[family-name:var(--font-commissioner)] text-[1.25rem] font-normal text-[var(--color-cream-light)]">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ targetDate }: CountdownProps) {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-[30px]">
      <CountdownUnit value={time.dni} label="dní" />
      <CountdownUnit value={time.hodín} label="hodín" />
      <CountdownUnit value={time.minút} label="minút" />
      <CountdownUnit value={time.sekúnd} label="sekúnd" />
    </div>
  );
}
