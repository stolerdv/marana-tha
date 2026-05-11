"use client";

import { useState } from "react";

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "phone" | "select" | "checkbox";
  required: boolean;
  options?: string[];
}

interface FormBuilderProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

const TYPE_LABELS: Record<string, string> = {
  text: "Text", email: "Email", phone: "Telefón", select: "Výber", checkbox: "Súhlas",
};

const inp: React.CSSProperties = {
  fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#1c1d1e",
  backgroundColor: "#f9efe2", border: "1px solid #e4d5b2", borderRadius: "6px",
  padding: "6px 10px", outline: "none",
};

export function FormBuilder({ fields, onChange }: FormBuilderProps) {
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<FormField["type"]>("text");
  const [newRequired, setNewRequired] = useState(false);

  function addField() {
    if (!newLabel.trim()) return;
    const field: FormField = {
      id: `field_${Date.now()}`,
      label: newLabel.trim(),
      type: newType,
      required: newRequired,
    };
    onChange([...fields, field]);
    setNewLabel("");
    setNewRequired(false);
  }

  function removeField(id: string) {
    onChange(fields.filter(f => f.id !== id));
  }

  function toggleRequired(id: string) {
    onChange(fields.map(f => f.id === id ? { ...f, required: !f.required } : f));
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Existing fields */}
      {fields.length > 0 && (
        <div className="flex flex-col gap-2">
          {fields.map((field, i) => (
            <div key={field.id} className="flex items-center justify-between px-3 py-2 rounded-[8px]"
              style={{ backgroundColor: "#f9efe2", border: "1px solid #e4d5b2" }}>
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#635f5b", width: "20px" }}>{i + 1}.</span>
                <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#1c1d1e" }}>{field.label}</span>
                <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: "#e4d5b2", fontFamily: "var(--font-inter)", fontSize: "11px", color: "#866f36" }}>
                  {TYPE_LABELS[field.type]}
                </span>
                {field.required && (
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "#dc2626" }}>povinné</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => toggleRequired(field.id)}
                  style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#635f5b" }}
                  className="hover:text-[#bea055]">
                  {field.required ? "voliteľné" : "povinné"}
                </button>
                <button type="button" onClick={() => removeField(field.id)}
                  style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#dc2626" }}
                  className="hover:opacity-70">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add field row */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Názov poľa (napr. Telefón)"
          value={newLabel}
          onChange={e => setNewLabel(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addField())}
          style={{ ...inp, flex: 1 }}
        />
        <select value={newType} onChange={e => setNewType(e.target.value as FormField["type"])} style={inp}>
          {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <label className="flex items-center gap-1 cursor-pointer">
          <input type="checkbox" checked={newRequired} onChange={e => setNewRequired(e.target.checked)} />
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#292929" }}>povinné</span>
        </label>
        <button type="button" onClick={addField}
          className="px-4 py-1.5 rounded-full transition-colors hover:bg-[#977d3e]"
          style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "13px", fontWeight: 700, color: "#fdf5f2", border: "none", cursor: "pointer" }}>
          + Pridať
        </button>
      </div>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af" }}>
        Poradie polí môžeš zmeniť ich vymazaním a opätovným pridaním.
      </p>
    </div>
  );
}
