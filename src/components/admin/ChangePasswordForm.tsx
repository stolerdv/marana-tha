"use client";

import { useState } from "react";

const inp: React.CSSProperties = {
  width: "100%",
  height: "44px",
  borderRadius: "8px",
  border: "1px solid #e4d5b2",
  padding: "0 12px",
  fontFamily: "var(--font-commissioner)",
  fontSize: "15px",
  color: "#1c1d1e",
  outline: "none",
  boxSizing: "border-box",
};

export function ChangePasswordForm() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.next !== form.confirm) { setMsg("Nové heslá sa nezhodujú"); setStatus("error"); return; }
    if (form.next.length < 8) { setMsg("Heslo musí mať aspoň 8 znakov"); setStatus("error"); return; }
    setStatus("saving");
    setMsg("");
    const res = await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("ok");
      setMsg("Heslo bolo zmenené.");
      setForm({ current: "", next: "", confirm: "" });
    } else {
      setStatus("error");
      setMsg(data.error ?? "Chyba");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input type="password" placeholder="Aktuálne heslo" value={form.current}
        onChange={e => setForm(f => ({ ...f, current: e.target.value }))} required style={inp} />
      <input type="password" placeholder="Nové heslo (min. 8 znakov)" value={form.next}
        onChange={e => setForm(f => ({ ...f, next: e.target.value }))} required style={inp} />
      <input type="password" placeholder="Potvrdiť nové heslo" value={form.confirm}
        onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required style={inp} />

      {msg && (
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: status === "ok" ? "#16a34a" : "#dc2626" }}>
          {status === "ok" ? "✓ " : "⚠ "}{msg}
        </p>
      )}

      <button type="submit" disabled={status === "saving"}
        style={{ height: "44px", borderRadius: "50px", backgroundColor: status === "saving" ? "#c9a96e" : "#bea055", border: "none", fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#fdf5f2", cursor: status === "saving" ? "not-allowed" : "pointer" }}>
        {status === "saving" ? "Ukladám..." : "Zmeniť heslo"}
      </button>
    </form>
  );
}
