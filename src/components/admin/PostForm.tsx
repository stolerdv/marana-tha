"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichEditor } from "./RichEditor";
import { ImageUploadCrop as ImageUpload } from "./ImageUploadCrop";

interface PostFormData { title: string; slug: string; content: string; excerpt: string; coverImage: string; published: boolean; }
interface PostFormProps { mode: "create" | "edit"; postId?: string; initial?: Partial<PostFormData>; }

function slugify(t: string) { return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }

const inp: React.CSSProperties = { fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#1c1d1e", backgroundColor: "#ffffff", border: "1px solid #e4d5b2", borderRadius: "8px", padding: "10px 14px", width: "100%", outline: "none" };

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div style={{ width: "44px", height: "24px", backgroundColor: checked ? "#bea055" : "#d1d5db", borderRadius: "12px", position: "relative", cursor: "pointer" }} onClick={() => onChange(!checked)}>
        <div style={{ position: "absolute", top: "2px", left: checked ? "22px" : "2px", width: "20px", height: "20px", backgroundColor: "#fff", borderRadius: "50%", transition: "left 0.2s" }} />
      </div>
      <span style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#292929" }}>{label}</span>
    </label>
  );
}

export function PostForm({ mode, postId, initial }: PostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<PostFormData>({ title: initial?.title ?? "", slug: initial?.slug ?? "", content: initial?.content ?? "", excerpt: initial?.excerpt ?? "", coverImage: initial?.coverImage ?? "", published: initial?.published ?? false });
  function set<K extends keyof PostFormData>(k: K, v: PostFormData[K]) { setForm(p => ({ ...p, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) { setError("Vyplň povinné polia."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch(mode === "create" ? "/api/posts" : `/api/posts/${postId}`, { method: mode === "create" ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error((await res.json()).error ?? "Chyba");
      router.push("/admin/posts"); router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Chyba"); }
    finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-6 items-start">
      <div className="flex flex-col gap-6 flex-1">
        {error && <div className="px-4 py-3 rounded-[8px]" style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontFamily: "var(--font-inter)", fontSize: "14px" }}>{error}</div>}
        <div className="flex flex-col gap-1.5">
          <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>Nadpis *</label>
          <input type="text" value={form.title} onChange={e => { set("title", e.target.value); if (mode === "create") set("slug", slugify(e.target.value)); }} style={inp} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>URL slug *</label>
          <div className="flex items-center gap-2"><span style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#9ca3af" }}>/blog/</span><input type="text" value={form.slug} onChange={e => set("slug", e.target.value)} style={{ ...inp, flex: 1 }} /></div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>Krátky popis (excerpt)</label>
          <textarea value={form.excerpt} onChange={e => set("excerpt", e.target.value)} rows={2} style={{ ...inp, resize: "vertical" }} placeholder="Krátky popis pre zoznam a SEO" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>Obsah *</label>
          <RichEditor value={form.content} onChange={v => set("content", v)} placeholder="Obsah príspevku..." />
        </div>
        <ImageUpload value={form.coverImage} onChange={v => set("coverImage", v)} label="Titulná fotografia" />
      </div>

      <div className="flex flex-col gap-6 shrink-0" style={{ width: "240px" }}>
        <div className="rounded-[15px] p-5 flex flex-col gap-4" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <h3 style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>Zverejnenie</h3>
          <Toggle checked={form.published} onChange={v => set("published", v)} label="Publikované" />
        </div>
        {mode === "edit" && form.slug && (
          <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer" className="text-center py-2.5 rounded-full border transition-colors hover:bg-[#f9efe2]" style={{ border: "1px solid #bea055", fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#bea055", fontWeight: 700 }}>👁 Zobraziť →</a>
        )}
        <button type="submit" disabled={saving} className="py-3 rounded-full transition-colors hover:bg-[#977d3e]" style={{ backgroundColor: saving ? "#9ca3af" : "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: saving ? "not-allowed" : "pointer", border: "none" }}>
          {saving ? "Ukladám..." : mode === "create" ? "Vytvoriť príspevok" : "Uložiť zmeny"}
        </button>
      </div>
    </form>
  );
}
