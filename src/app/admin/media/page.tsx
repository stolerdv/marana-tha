"use client";

import { useState, useEffect } from "react";
import { GalleryUpload } from "@/components/admin/GalleryUpload";

// ── helpers ──────────────────────────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}
function slugify(t: string) {
  return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ── types ─────────────────────────────────────────────────────────────────────
interface Video { id: string; title: string; youtubeUrl: string; published: boolean; createdAt: string; }
interface Gallery { id: string; title: string; slug: string; coverImage: string | null; published: boolean; photos: { url: string }[]; }

// ── shared styles ─────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", height: "48px", borderRadius: "10px",
  border: "1px solid #e4d5b2", padding: "0 14px",
  fontFamily: "var(--font-inter)", fontSize: "15px", color: "#1c1d1e", outline: "none", boxSizing: "border-box",
};
const tabBase: React.CSSProperties = {
  padding: "8px 24px", borderRadius: "50px", border: "none", cursor: "pointer",
  fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, transition: "all 0.2s",
};

// ═══════════════════════════════════════════════════════════════════════════════
// VIDEOS TAB
// ═══════════════════════════════════════════════════════════════════════════════
function VideosTab() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", youtubeUrl: "", published: true });
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/media/videos");
    if (res.ok) setVideos(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/media/videos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ title: "", youtubeUrl: "", published: true });
    setShowForm(false);
    setSaving(false);
    load();
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Vymazať video "${title}"?`)) return;
    await fetch(`/api/media/videos/${id}`, { method: "DELETE" });
    load();
  }

  async function togglePublished(id: string, current: boolean) {
    await fetch(`/api/media/videos/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !current }) });
    load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "#635f5b" }}>{videos.length} videí</p>
        <button onClick={() => setShowForm(v => !v)} style={{ ...tabBase, backgroundColor: "#bea055", color: "#fdf5f2" }}>
          {showForm ? "Zrušiť" : "+ Pridať video"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="rounded-[15px] p-6" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e", marginBottom: "16px" }}>Nové video</p>
          <div className="flex flex-col gap-4">
            <div>
              <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>Názov *</label>
              <input type="text" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Večer chvál — január 2026" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>YouTube URL *</label>
              <input type="url" required value={form.youtubeUrl} onChange={e => setForm(f => ({ ...f, youtubeUrl: e.target.value }))} placeholder="https://www.youtube.com/watch?v=..." style={inputStyle} />
              {form.youtubeUrl && getYouTubeId(form.youtubeUrl) && (
                <div className="mt-3 overflow-hidden rounded-[8px]" style={{ width: "240px", height: "135px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${getYouTubeId(form.youtubeUrl)}/mqdefault.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} style={{ padding: "10px 28px", borderRadius: "50px", backgroundColor: saving ? "#c9a96e" : "#bea055", border: "none", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: saving ? "not-allowed" : "pointer" }}>
                {saving ? "Ukladám..." : "Uložiť"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "10px 28px", borderRadius: "50px", backgroundColor: "transparent", border: "1px solid #e4d5b2", fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#635f5b", cursor: "pointer" }}>
                Zrušiť
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <div className="rounded-[15px] p-12 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", color: "#635f5b" }}>Načítavam...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-[15px] p-12 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>Zatiaľ žiadne videá</p>
        </div>
      ) : (
        <div className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <div className="grid px-6 py-3 border-b border-[#e4d5b2]" style={{ gridTemplateColumns: "80px 1fr 180px 100px 100px" }}>
            {["", "Názov", "YouTube", "Status", "Akcie"].map(h => (
              <span key={h} style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</span>
            ))}
          </div>
          <div className="divide-y divide-[#e4d5b2]">
            {videos.map(video => {
              const ytId = getYouTubeId(video.youtubeUrl);
              const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;
              return (
                <div key={video.id} className="grid items-center px-6 py-4 hover:bg-[#f9efe2] transition-colors" style={{ gridTemplateColumns: "80px 1fr 180px 100px 100px" }}>
                  <div style={{ width: "64px", height: "40px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#e6ded5" }}>
                    {thumb && <img src={thumb} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  </div>
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>{video.title}</p>
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#bea055", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                    {ytId ? `youtu.be/${ytId}` : "YouTube →"}
                  </a>
                  <button onClick={() => togglePublished(video.id, video.published)} className="px-2 py-0.5 rounded-full inline-block text-left" style={{ backgroundColor: video.published ? "#dcfce7" : "#f3f4f6", color: video.published ? "#16a34a" : "#6b7280", fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, border: "none", cursor: "pointer" }}>
                    {video.published ? "Online" : "Draft"}
                  </button>
                  <button onClick={() => handleDelete(video.id, video.title)} style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#ef4444", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>
                    Vymazať
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GALLERIES TAB
// ═══════════════════════════════════════════════════════════════════════════════
function GalleriesTab() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", coverImage: "", photos: [] as string[], published: true });
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/media/galleries");
    if (res.ok) setGalleries(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title) return;
    setSaving(true);
    await fetch("/api/media/galleries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ title: "", slug: "", coverImage: "", photos: [], published: true });
    setShowForm(false);
    setSaving(false);
    load();
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Vymazať galériu "${title}"?`)) return;
    await fetch(`/api/media/galleries/${id}`, { method: "DELETE" });
    load();
  }

  async function togglePublished(id: string, current: boolean) {
    await fetch(`/api/media/galleries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !current }) });
    load();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "#635f5b" }}>{galleries.length} galérií</p>
        <button onClick={() => setShowForm(v => !v)} style={{ ...tabBase, backgroundColor: "#bea055", color: "#fdf5f2" }}>
          {showForm ? "Zrušiť" : "+ Nová galéria"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="rounded-[15px] p-6" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", fontWeight: 700, color: "#1c1d1e", marginBottom: "16px" }}>Nová galéria</p>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>Názov *</label>
                <input type="text" required value={form.title} onChange={e => { const t = e.target.value; setForm(f => ({ ...f, title: t, slug: slugify(t) })); }} placeholder="Večer chvál január 2026" style={inputStyle} />
              </div>
              <div className="flex-1">
                <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>Slug *</label>
                <input type="text" required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="vecer-chval-januar-2026" style={inputStyle} />
              </div>
            </div>

            <GalleryUpload photos={form.photos} onChange={photos => setForm(f => ({ ...f, photos, coverImage: photos[0] ?? "" }))} />

            <div className="flex gap-3">
              <button type="submit" disabled={saving} style={{ padding: "10px 28px", borderRadius: "50px", backgroundColor: saving ? "#c9a96e" : "#bea055", border: "none", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: saving ? "not-allowed" : "pointer" }}>
                {saving ? "Ukladám..." : "Vytvoriť galériu"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: "10px 28px", borderRadius: "50px", backgroundColor: "transparent", border: "1px solid #e4d5b2", fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#635f5b", cursor: "pointer" }}>
                Zrušiť
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <div className="rounded-[15px] p-12 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", color: "#635f5b" }}>Načítavam...</p>
        </div>
      ) : galleries.length === 0 ? (
        <div className="rounded-[15px] p-12 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>Zatiaľ žiadne galérie</p>
        </div>
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {galleries.map(gallery => {
            const cover = gallery.coverImage ?? gallery.photos?.[0]?.url ?? null;
            return (
              <div key={gallery.id} className="rounded-[12px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
                <div style={{ height: "140px", backgroundColor: "#e6ded5", position: "relative" }}>
                  {cover && <img src={cover} alt={gallery.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>{gallery.title}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af" }}>/{gallery.slug} · {gallery.photos?.length ?? 0} foto</p>
                  <div className="flex items-center gap-3 mt-1">
                    <button onClick={() => togglePublished(gallery.id, gallery.published)} style={{ padding: "2px 10px", borderRadius: "50px", backgroundColor: gallery.published ? "#dcfce7" : "#f3f4f6", color: gallery.published ? "#16a34a" : "#6b7280", fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, border: "none", cursor: "pointer" }}>
                      {gallery.published ? "Online" : "Draft"}
                    </button>
                    <button onClick={() => handleDelete(gallery.id, gallery.title)} style={{ fontFamily: "var(--font-commissioner)", fontSize: "13px", color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                      Vymazať
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function AdminMediaPage() {
  const [tab, setTab] = useState<"videos" | "galleries">("videos");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>Médiá</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {(["videos", "galleries"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              ...tabBase,
              backgroundColor: tab === t ? "#bea055" : "transparent",
              color: tab === t ? "#fdf5f2" : "#635f5b",
              border: tab === t ? "none" : "1px solid #e4d5b2",
            }}
          >
            {t === "videos" ? "🎬 Videá" : "🖼️ Galérie"}
          </button>
        ))}
      </div>

      {tab === "videos" ? <VideosTab /> : <GalleriesTab />}
    </div>
  );
}
