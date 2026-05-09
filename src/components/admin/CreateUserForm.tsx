"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-commissioner)",
  fontSize: "15px",
  color: "#1c1d1e",
  backgroundColor: "#ffffff",
  border: "1px solid #e4d5b2",
  borderRadius: "8px",
  padding: "10px 14px",
  width: "100%",
  outline: "none",
};

export function CreateUserForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Vyplň všetky polia.");
      return;
    }
    if (form.password.length < 8) {
      setError("Heslo musí mať aspoň 8 znakov.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "EDITOR" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Chyba pri vytváraní");
      }
      setForm({ name: "", email: "", password: "" });
      setSuccess("Editor bol úspešne pridaný.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chyba");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && (
        <div className="px-3 py-2 rounded-[8px]" style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontFamily: "var(--font-inter)", fontSize: "13px" }}>
          {error}
        </div>
      )}
      {success && (
        <div className="px-3 py-2 rounded-[8px]" style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a", fontFamily: "var(--font-inter)", fontSize: "13px" }}>
          {success}
        </div>
      )}

      <input type="text" placeholder="Meno" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle} />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inputStyle} />
      <input type="password" placeholder="Heslo (min. 8 znakov)" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} style={inputStyle} />

      <button type="submit" disabled={saving}
        className="py-3 rounded-full transition-colors hover:bg-[#977d3e]"
        style={{ backgroundColor: saving ? "#9ca3af" : "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: saving ? "not-allowed" : "pointer", border: "none" }}>
        {saving ? "Vytváram..." : "Vytvoriť editora"}
      </button>
    </form>
  );
}
