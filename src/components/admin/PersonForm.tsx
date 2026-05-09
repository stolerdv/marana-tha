"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./ImageUpload";

interface Ministry { id: string; title: string; }
interface CityPageOption { id: string; city: string; }

interface PersonFormData {
  name: string;
  role: string;
  photo: string;
  order: number;
  published: boolean;
  ministryId: string;
  cityPageId: string;
}

interface PersonFormProps {
  mode: "create" | "edit";
  personId?: string;
  initial?: Partial<PersonFormData>;
  ministries: Ministry[];
  cityPages: CityPageOption[];
}

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

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div style={{ width: "44px", height: "24px", backgroundColor: checked ? "#bea055" : "#d1d5db", borderRadius: "12px", transition: "background 0.2s", flexShrink: 0, position: "relative", cursor: "pointer" }}
        onClick={() => onChange(!checked)}>
        <div style={{ position: "absolute", top: "2px", left: checked ? "22px" : "2px", width: "20px", height: "20px", backgroundColor: "#fff", borderRadius: "50%", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
      <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#292929" }}>{label}</span>
    </label>
  );
}

const CITY_LABELS: Record<string, string> = { PRESOV: "Prešov", BARDEJOV: "Bardejov", KOSICE: "Košice" };

export function PersonForm({ mode, personId, initial, ministries, cityPages }: PersonFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<PersonFormData>({
    name: initial?.name ?? "",
    role: initial?.role ?? "",
    photo: initial?.photo ?? "",
    order: initial?.order ?? 0,
    published: initial?.published ?? false,
    ministryId: initial?.ministryId ?? "",
    cityPageId: initial?.cityPageId ?? "",
  });

  function set<K extends keyof PersonFormData>(key: K, value: PersonFormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.role) { setError("Vyplň meno a rolu."); return; }
    setSaving(true);
    setError("");
    try {
      const url = mode === "create" ? "/api/people" : `/api/people/${personId}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Chyba pri ukladaní");
      }
      router.push("/admin/people");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chyba");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="px-4 py-3 rounded-[8px]" style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontFamily: "var(--font-inter)", fontSize: "14px" }}>
          {error}
        </div>
      )}

      <div className="flex gap-6 items-start">
        {/* LEFT */}
        <div className="flex flex-col gap-6 flex-1">
          <FormField label="Meno" required>
            <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Meno Priezvisko" style={inputStyle} />
          </FormField>

          <FormField label="Rola / Funkcia" required>
            <input type="text" value={form.role} onChange={e => set("role", e.target.value)} placeholder="napr. Vedúci spoločenstva" style={inputStyle} />
          </FormField>

          <ImageUpload value={form.photo} onChange={v => set("photo", v)} label="Fotografia" />

          {/* Attachments */}
          <div className="flex gap-4">
            <FormField label="Priradenie ku službe">
              <select value={form.ministryId} onChange={e => set("ministryId", e.target.value)} style={{ ...inputStyle, width: "auto", minWidth: "200px" }}>
                <option value="">— žiadna —</option>
                {ministries.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
              </select>
            </FormField>
            <FormField label="Priradenie ku mestu">
              <select value={form.cityPageId} onChange={e => set("cityPageId", e.target.value)} style={{ ...inputStyle, width: "auto", minWidth: "160px" }}>
                <option value="">— žiadne —</option>
                {cityPages.map(c => <option key={c.id} value={c.id}>{CITY_LABELS[c.city] ?? c.city}</option>)}
              </select>
            </FormField>
          </div>
        </div>

        {/* RIGHT sidebar */}
        <div className="flex flex-col gap-6 shrink-0" style={{ width: "240px" }}>
          <div className="rounded-[15px] p-5 flex flex-col gap-4" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
            <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>Nastavenia</h3>
            <Toggle checked={form.published} onChange={v => set("published", v)} label="Publikované" />
            <FormField label="Poradie zobrazovania">
              <input type="number" value={form.order} onChange={e => set("order", parseInt(e.target.value) || 0)} min={0} style={inputStyle} />
            </FormField>
          </div>

          <button type="submit" disabled={saving}
            className="py-3 rounded-full transition-colors hover:bg-[#977d3e]"
            style={{ backgroundColor: saving ? "#9ca3af" : "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: saving ? "not-allowed" : "pointer", border: "none" }}>
            {saving ? "Ukladám..." : mode === "create" ? "Pridať osobu" : "Uložiť zmeny"}
          </button>
        </div>
      </div>
    </form>
  );
}
