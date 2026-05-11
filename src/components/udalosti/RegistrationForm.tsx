"use client";

import { useState } from "react";
import type { FormField } from "@/components/admin/FormBuilder";

interface RegistrationFormProps {
  eventId: string;
  fields: FormField[];
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-commissioner)",
  fontSize: "18px",
  color: "#1c1d1e",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px solid #1c1d1e",
  padding: "8px 0",
  width: "100%",
  outline: "none",
};

export function RegistrationForm({ eventId, fields }: RegistrationFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function setValue(id: string, val: string) {
    setValues(prev => ({ ...prev, [id]: val }));
  }

  // Find name + email: prefer builtin IDs, fallback to first text/email field
  function getNameEmail() {
    const nameField = fields.find(f => f.id === "builtin_name") ?? fields.find(f => f.type === "text");
    const emailField = fields.find(f => f.id === "builtin_email") ?? fields.find(f => f.type === "email");
    return {
      name: (nameField ? values[nameField.id] : "") ?? "",
      email: (emailField ? values[emailField.id] : "") ?? "",
    };
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, email } = getNameEmail();
    if (!name) { setError("Vyplň meno."); return; }
    if (!email) { setError("Vyplň e-mail."); return; }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, name, email, data: values }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Chyba");
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chyba pri registrácii");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const { email } = getNameEmail();
    return (
      <div className="rounded-[15px] p-10 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, color: "#bea055", marginBottom: "8px" }}>
          Ďakujeme za registráciu! 🙏
        </p>
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>
          Tešíme sa na teba.{email ? ` Potvrdenie sme zaslali na ${email}.` : ""}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" style={{ maxWidth: "613px" }}>
      {error && (
        <div className="px-4 py-3 rounded-[8px]" style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontFamily: "var(--font-inter)", fontSize: "14px" }}>
          {error}
        </div>
      )}

      {fields.map((field) => (
        <div key={field.id}>
          {field.type === "checkbox" ? (
            <label className="flex items-start gap-3 cursor-pointer">
              <div
                className="shrink-0 mt-1"
                style={{ width: "20px", height: "20px", border: "1px solid #1c1d1e", backgroundColor: values[field.id] === "true" ? "#1c1d1e" : "transparent", cursor: "pointer" }}
                onClick={() => setValue(field.id, values[field.id] === "true" ? "" : "true")}
              >
                {values[field.id] === "true" && (
                  <svg viewBox="0 0 20 20" fill="none" style={{ width: "18px", height: "18px" }}>
                    <path d="M4 10l5 5 7-7" stroke="#dec4b0" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "18px", color: "#1c1d1e", lineHeight: 1.5 }}>
                {field.label}{field.required && <span style={{ color: "#dc2626" }}> *</span>}
              </span>
            </label>
          ) : field.type === "select" && field.options ? (
            <div style={{ borderBottom: "1px solid #1c1d1e" }}>
              <select
                value={values[field.id] ?? ""}
                onChange={e => setValue(field.id, e.target.value)}
                required={field.required}
                style={{ ...inputStyle, borderBottom: "none" }}
              >
                <option value="">{field.label}{field.required ? " *" : ""}</option>
                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ) : (
            <div style={{ borderBottom: "1px solid #1c1d1e" }}>
              <input
                type={field.type === "phone" ? "tel" : field.type === "email" ? "email" : "text"}
                placeholder={`${field.label}${field.required ? " *" : ""}`}
                value={values[field.id] ?? ""}
                onChange={e => setValue(field.id, e.target.value)}
                required={field.required}
                style={inputStyle}
              />
            </div>
          )}
        </div>
      ))}

      {fields.length === 0 && (
        <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", color: "#635f5b" }}>
          Formulár nemá žiadne polia.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-full transition-colors hover:bg-[#977d3e]"
        style={{ width: "186px", height: "50px", backgroundColor: submitting ? "#9ca3af" : "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", border: "none", cursor: submitting ? "not-allowed" : "pointer" }}
      >
        {submitting ? "Odosielam..." : "Odoslať"}
      </button>
    </form>
  );
}
