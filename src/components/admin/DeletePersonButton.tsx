"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeletePersonButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Naozaj chceš vymazať "${name}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/people/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
      else alert("Chyba pri mazaní");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading}
      style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#dc2626", opacity: loading ? 0.5 : 1 }}
      className="hover:opacity-70 transition-opacity">
      {loading ? "..." : "Vymazať"}
    </button>
  );
}
