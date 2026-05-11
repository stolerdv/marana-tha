"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichEditor } from "./RichEditor";
import { ImageUploadCrop as ImageUpload } from "./ImageUploadCrop";
import { GalleryUpload } from "./GalleryUpload";

interface MissionFormData {
  title: string;
  slug: string;
  country: string;
  description: string;
  content: string;
  coverImage: string;
  photos: string[];
  order: number;
  published: boolean;
}

interface MissionFormProps {
  mode: "create" | "edit";
  missionId?: string;
  initial?: Partial<MissionFormData>;
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

export function MissionForm({ mode, missionId, initial }: MissionFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<MissionFormData>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    country: initial?.country ?? "",
    description: initial?.description ?? "",
    content: initial?.content ?? "",
    coverImage: initial?.coverImage ?? "",
    photos: initial?.photos ?? [],
    order: initial?.order ?? 0,
    published: initial?.published ?? false,
  });

  function set<K extends keyof MissionFormData>(key: K, value: MissionFormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(value: string) {
    set("title", value);
    if (mode === "create") set("slug", slugify(value));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.title || !form.slug || !form.country || !form.description) {
      setError("Vyplň všetky povinné polia.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = mode === "create" ? "/api/missions" : `/api/missions/${missionId}`;
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
      router.push("/admin/misie");
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
          <FormField label="Názov misie" required>
            <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="napr. Misie v Kazachstane" style={inputStyle} />
          </FormField>

          <div className="flex gap-4">
            <FormField label="URL slug" required>
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#9ca3af" }}>/misie/</span>
                <input type="text" value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="kazachstan" style={{ ...inputStyle, flex: 1 }} />
              </div>
            </FormField>
            <FormField label="Krajina / región" required>
              <input type="text" value={form.country} onChange={e => set("country", e.target.value)} placeholder="napr. Kazachstan" style={inputStyle} />
            </FormField>
          </div>

          <FormField label="Krátky popis" required>
            <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Krátky popis misie (zobrazí sa na karte)" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </FormField>

          <FormField label="Príbeh misie (podrobný obsah)">
            <RichEditor value={form.content} onChange={v => set("content", v)} placeholder="Čo sa na misii deje, ako ľudia slúžia, aké sú výsledky..." />
          </FormField>

          <ImageUpload value={form.coverImage} onChange={v => set("coverImage", v)} label="Titulná fotografia" />

          <GalleryUpload photos={form.photos} onChange={v => set("photos", v)} />
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
          </div>

          {mode === "edit" && form.slug && (
            <a href={`/misie/${form.slug}`} target="_blank" rel="noopener noreferrer"
              className="text-center py-2.5 rounded-full border transition-colors hover:bg-[#f9efe2]"
              style={{ border: "1px solid #bea055", fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055", fontWeight: 700 }}>
              👁 Zobraziť stránku →
            </a>
          )}

          <button type="submit" disabled={saving}
            className="py-3 rounded-full transition-colors hover:bg-[#977d3e]"
            style={{ backgroundColor: saving ? "#9ca3af" : "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: saving ? "not-allowed" : "pointer", border: "none" }}>
            {saving ? "Ukladám..." : mode === "create" ? "Vytvoriť misiu" : "Uložiť zmeny"}
          </button>
        </div>
      </div>
    </form>
  );
}
