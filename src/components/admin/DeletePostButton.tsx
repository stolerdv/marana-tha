"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    if (!confirm(`Vymazať "${title}"?`)) return;
    setLoading(true);
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    setLoading(false);
  }
  return (
    <button onClick={handleDelete} disabled={loading} style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#dc2626", opacity: loading ? 0.5 : 1 }} className="hover:opacity-70">
      {loading ? "..." : "Vymazať"}
    </button>
  );
}
