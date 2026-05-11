"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichEditor } from "./RichEditor";
import { ImageUploadCrop as ImageUpload } from "./ImageUploadCrop";

interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "richtext";
}

interface DataField {
  key: string;
  label: string;
  type: "text" | "number";
}

interface Props {
  pageKey: string;
  fields: Field[];
  dataFields?: DataField[];
  initial?: {
    title: string;
    subtitle: string;
    content: string;
    coverImage: string;
    data: Record<string, string>;
  };
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: "8px",
  border: "1px solid #e4d5b2",
  padding: "10px 14px",
  fontFamily: "var(--font-commissioner)",
  fontSize: "15px",
  color: "#1c1d1e",
  outline: "none",
  backgroundColor: "#ffffff",
  boxSizing: "border-box",
};

export function PageContentForm({ pageKey, fields, dataFields, initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    subtitle: initial?.subtitle ?? "",
    content: initial?.content ?? "",
    coverImage: initial?.coverImage ?? "",
    data: initial?.data ?? {} as Record<string, string>,
  });

  function setField(key: string, value: string) {
    if (key === "title" || key === "subtitle" || key === "content" || key === "coverImage") {
      setForm(f => ({ ...f, [key]: value }));
    } else {
      setForm(f => ({ ...f, data: { ...f.data, [key]: value } }));
    }
  }

  function getValue(key: string): string {
    if (key === "title") return form.title;
    if (key === "subtitle") return form.subtitle;
    if (key === "content") return form.content;
    if (key === "coverImage") return form.coverImage;
    return form.data[key] ?? "";
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch(`/api/pages/${pageKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Chyba");
      setSaved(true);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chyba");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-6 items-start">
      {/* Main fields */}
      <div className="flex flex-col gap-6 flex-1">
        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontFamily: "var(--font-inter)", fontSize: "14px", padding: "12px 16px", borderRadius: "8px" }}>
            {error}
          </div>
        )}
        {saved && (
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a", fontFamily: "var(--font-inter)", fontSize: "14px", padding: "12px 16px", borderRadius: "8px" }}>
            ✓ Zmeny boli uložené a stránka je aktualizovaná.
          </div>
        )}

        {fields.map(field => (
          <div key={field.key} className="flex flex-col gap-1.5">
            <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>
              {field.label}
            </label>
            {field.type === "text" && (
              <input type="text" value={getValue(field.key)} onChange={e => setField(field.key, e.target.value)} style={inputStyle} />
            )}
            {field.type === "textarea" && (
              <textarea value={getValue(field.key)} onChange={e => setField(field.key, e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            )}
            {field.type === "richtext" && (
              <RichEditor value={getValue(field.key)} onChange={v => setField(field.key, v)} />
            )}
            {field.type === "image" && (
              <ImageUpload value={getValue(field.key)} onChange={v => setField(field.key, v)} label={field.label} />
            )}
          </div>
        ))}

        {/* Extra data fields */}
        {dataFields && dataFields.length > 0 && (
          <div className="rounded-[15px] p-5 flex flex-col gap-4" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
            <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>
              Ďalšie nastavenia
            </h3>
            {dataFields.map(field => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>
                  {field.label}
                </label>
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={form.data[field.key] ?? ""}
                  onChange={e => setField(field.key, e.target.value)}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-4 shrink-0" style={{ width: "240px" }}>
        <div className="rounded-[15px] p-5" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#635f5b", marginBottom: "16px", lineHeight: 1.5 }}>
            Zmeny sa prejavia okamžite na verejnej stránke po uložení.
          </p>
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-full transition-colors hover:bg-[#977d3e]"
            style={{ backgroundColor: saving ? "#9ca3af" : "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", border: "none", cursor: saving ? "not-allowed" : "pointer" }}
          >
            {saving ? "Ukladám..." : "Uložiť zmeny"}
          </button>
        </div>
      </div>
    </form>
  );
}
