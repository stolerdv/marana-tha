"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeletePartnerButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    if (!confirm(`Naozaj zmazať partnerstvo "${name}"?`)) return;
    setLoading(true);
    const res = await fetch(`/api/partners/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh(); else alert("Chyba pri mazaní");
    setLoading(false);
  }
  return <button onClick={handleDelete} disabled={loading} style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#dc2626", opacity: loading ? 0.5 : 1, background: "none", border: "none", cursor: "pointer" }} className="hover:opacity-70 transition-opacity">{loading ? "..." : "Zmazať"}</button>;
}
