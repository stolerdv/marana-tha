"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteEventButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Naozaj chceš vymazať "${title}"? Táto akcia je nevratná.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Chyba pri mazaní akcie");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#dc2626", fontWeight: 400, opacity: loading ? 0.5 : 1 }}
      className="hover:opacity-70 transition-opacity"
    >
      {loading ? "..." : "Vymazať"}
    </button>
  );
}
