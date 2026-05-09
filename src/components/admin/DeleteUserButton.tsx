"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteUserButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Naozaj chceš odobrať prístup pre "${name}"?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
      else {
        const data = await res.json();
        alert(data.error ?? "Chyba pri mazaní");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading}
      style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#dc2626", opacity: loading ? 0.5 : 1 }}
      className="hover:opacity-70 transition-opacity">
      {loading ? "..." : "Odobrať prístup"}
    </button>
  );
}
