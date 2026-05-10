"use client";

import { useState } from "react";

export function PridajSaForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", city: "", message: "" });

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "52px",
    borderRadius: "10px",
    border: "1px solid #e4d5b2",
    backgroundColor: "#ffffff",
    padding: "0 16px",
    fontFamily: "var(--font-inter)",
    fontSize: "16px",
    color: "#1c1d1e",
    outline: "none",
    boxSizing: "border-box",
  };

  if (status === "done") {
    return (
      <div style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "48px 40px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "26px", fontWeight: 700, color: "#1c1d1e", marginBottom: "12px" }}>
          Správa odoslaná!
        </p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", lineHeight: "1.6" }}>
          Ozveme sa ti čo najskôr. Tešíme sa na teba!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "15px", padding: "40px" }}>
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "26px", fontWeight: 700, color: "#1c1d1e", marginBottom: "32px" }}>
          Napíš nám
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
              Meno a priezvisko *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => set("name", e.target.value)}
              placeholder="Ján Novák"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
              E-mail *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => set("email", e.target.value)}
              placeholder="jan@email.sk"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
              Mesto
            </label>
            <select
              value={form.city}
              onChange={e => set("city", e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="">Vyber mesto...</option>
              <option value="presov">Prešov</option>
              <option value="bardejov">Bardejov</option>
              <option value="kosice">Košice</option>
            </select>
          </div>

          <div>
            <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
              Správa
            </label>
            <textarea
              value={form.message}
              onChange={e => set("message", e.target.value)}
              placeholder="Napíš nám čokoľvek..."
              rows={4}
              style={{ ...inputStyle, height: "auto", padding: "14px 16px", resize: "none" }}
            />
          </div>

          {status === "error" && (
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#c0392b" }}>
              Niečo sa pokazilo. Skús neskôr alebo napíš priamo na info@maranathapo.sk
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              width: "100%",
              height: "52px",
              borderRadius: "50px",
              backgroundColor: status === "sending" ? "#c9a96e" : "#bea055",
              border: "none",
              fontFamily: "var(--font-commissioner)",
              fontSize: "16px",
              fontWeight: 700,
              color: "#fdf5f2",
              cursor: status === "sending" ? "not-allowed" : "pointer",
              transition: "background-color 0.15s",
            }}
          >
            {status === "sending" ? "Odosielam..." : "Odoslať správu →"}
          </button>
        </div>
      </div>
    </form>
  );
}
