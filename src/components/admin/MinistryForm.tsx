"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichEditor } from "./RichEditor";
import { ImageUploadCrop as ImageUpload } from "./ImageUploadCrop";

interface MinistryFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  icon: string;
  order: number;
  published: boolean;
}

interface MinistryFormProps {
  mode: "create" | "edit";
  ministryId?: string;
  initial?: Partial<MinistryFormData>;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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
      <div
        style={{ width: "44px", height: "24px", backgroundColor: checked ? "#bea055" : "#d1d5db", borderRadius: "12px", transition: "background 0.2s", flexShrink: 0, position: "relative", cursor: "pointer" }}
        onClick={() => onChange(!checked)}
      >
        <div style={{ position: "absolute", top: "2px", left: checked ? "22px" : "2px", width: "20px", height: "20px", backgroundColor: "#fff", borderRadius: "50%", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
      <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#292929" }}>{label}</span>
    </label>
  );
}

export function MinistryForm({ mode, ministryId, initial }: MinistryFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<MinistryFormData>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    content: initial?.content ?? "",
    coverImage: initial?.coverImage ?? "",
    icon: initial?.icon ?? "",
    order: initial?.order ?? 0,
    published: initial?.published ?? false,
  });

  function set<K extends keyof MinistryFormData>(key: K, value: MinistryFormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(value: string) {
    set("title", value);
    if (mode === "create") set("slug", slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.slug || !form.description) {
      setError("Vyplň všetky povinné polia.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = mode === "create" ? "/api/ministries" : `/api/ministries/${ministryId}`;
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
      router.push("/admin/ministries");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chyba pri ukladaní");
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
          <FormField label="Názov služby" required>
            <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="napr. Hudobná služba" style={inputStyle} />
          </FormField>

          <FormField label="URL slug" required>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#9ca3af" }}>/sluzby/</span>
              <input type="text" value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="hudobna-sluzba" style={{ ...inputStyle, flex: 1 }} />
            </div>
          </FormField>

          <FormField label="Krátky popis" required>
            <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Krátky popis služby (zobrazí sa na karte a v SEO)" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </FormField>

          <FormField label="Obsah (podrobný popis)">
            <RichEditor value={form.content} onChange={v => set("content", v)} placeholder="Podrobné informácie o službe, kto sa môže zapojiť, ako kontaktovať..." />
          </FormField>

          <ImageUpload value={form.coverImage} onChange={v => set("coverImage", v)} label="Titulná fotografia" />
        </div>

        {/* RIGHT sidebar */}
        <div className="flex flex-col gap-6 shrink-0" style={{ width: "280px" }}>

          <div className="rounded-[15px] p-5 flex flex-col gap-4" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
            <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>Zverejnenie</h3>
            <Toggle checked={form.published} onChange={v => set("published", v)} label="Publikované" />
          </div>

          <div className="rounded-[15px] p-5 flex flex-col gap-4" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
            <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>Nastavenia</h3>
            <FormField label="Poradie zobrazovania">
              <input type="number" value={form.order} onChange={e => set("order", parseInt(e.target.value) || 0)} min={0} style={inputStyle} />
            </FormField>
            <FormField label="Ikona (emoji alebo URL)">
              <input type="text" value={form.icon} onChange={e => set("icon", e.target.value)} placeholder="🎵 alebo URL ikony" style={inputStyle} />
            </FormField>
          </div>

          {mode === "edit" && form.slug && (
            <a href={`/sluzby/${form.slug}`} target="_blank" rel="noopener noreferrer"
              className="text-center py-2.5 rounded-full border transition-colors hover:bg-[#f9efe2]"
              style={{ border: "1px solid #bea055", fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055", fontWeight: 700 }}>
              👁 Zobraziť stránku →
            </a>
          )}

          <button type="submit" disabled={saving}
            className="py-3 rounded-full transition-colors hover:bg-[#977d3e]"
            style={{ backgroundColor: saving ? "#9ca3af" : "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: saving ? "not-allowed" : "pointer", border: "none" }}>
            {saving ? "Ukladám..." : mode === "create" ? "Vytvoriť službu" : "Uložiť zmeny"}
          </button>
        </div>
      </div>
    </form>
  );
}
