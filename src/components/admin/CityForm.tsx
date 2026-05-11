"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichEditor } from "./RichEditor";
import { ImageUploadCrop as ImageUpload } from "./ImageUploadCrop";

interface CityFormData {
  title: string;
  content: string;
  coverImage: string;
  address: string;
  mapUrl: string;
  contactEmail: string;
  contactPhone: string;
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

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>{label}</label>
      {children}
    </div>
  );
}

export function CityForm({ citySlug, initial }: { citySlug: string; initial: CityFormData }) {
  const router = useRouter();
  const [form, setForm] = useState<CityFormData>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function set<K extends keyof CityFormData>(key: K, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(""); setSuccess("");
    try {
      const res = await fetch(`/api/cities/${citySlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Chyba");
      setSuccess("Zmeny boli uložené.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chyba");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-6 items-start">
      <div className="flex flex-col gap-6 flex-1">
        {error && <div className="px-4 py-3 rounded-[8px]" style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontFamily: "var(--font-inter)", fontSize: "14px" }}>{error}</div>}
        {success && <div className="px-4 py-3 rounded-[8px]" style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a", fontFamily: "var(--font-inter)", fontSize: "14px" }}>{success}</div>}

        <FormField label="Názov stránky">
          <input type="text" value={form.title} onChange={e => set("title", e.target.value)} style={inputStyle} />
        </FormField>

        <FormField label="Obsah (popis mesta, spoločenstva)">
          <RichEditor value={form.content} onChange={v => set("content", v)} placeholder="Popis spoločenstva v tomto meste..." />
        </FormField>

        <ImageUpload value={form.coverImage} onChange={v => set("coverImage", v)} label="Titulná fotografia" />
      </div>

      <div className="flex flex-col gap-6 shrink-0" style={{ width: "280px" }}>
        <div className="rounded-[15px] p-5 flex flex-col gap-4" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>Kontakt a adresa</h3>
          <FormField label="Adresa">
            <input type="text" value={form.address} onChange={e => set("address", e.target.value)} placeholder="Švábska 22, 080 05 Prešov" style={inputStyle} />
          </FormField>
          <FormField label="Email">
            <input type="email" value={form.contactEmail} onChange={e => set("contactEmail", e.target.value)} placeholder="presov@maranathapo.sk" style={inputStyle} />
          </FormField>
          <FormField label="Telefón">
            <input type="text" value={form.contactPhone} onChange={e => set("contactPhone", e.target.value)} placeholder="+421 901 234 567" style={inputStyle} />
          </FormField>
          <FormField label="Google Maps URL">
            <input type="text" value={form.mapUrl} onChange={e => set("mapUrl", e.target.value)} placeholder="https://maps.google.com/..." style={inputStyle} />
          </FormField>
        </div>

        <a href={`/spolocenstvo/${citySlug}`} target="_blank" rel="noopener noreferrer"
          className="text-center py-2.5 rounded-full border transition-colors hover:bg-[#f9efe2]"
          style={{ border: "1px solid #bea055", fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055", fontWeight: 700 }}>
          👁 Zobraziť stránku →
        </a>

        <button type="submit" disabled={saving}
          className="py-3 rounded-full transition-colors hover:bg-[#977d3e]"
          style={{ backgroundColor: saving ? "#9ca3af" : "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: saving ? "not-allowed" : "pointer", border: "none" }}>
          {saving ? "Ukladám..." : "Uložiť zmeny"}
        </button>
      </div>
    </form>
  );
}
