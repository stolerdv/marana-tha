"use client";

import { useState, useEffect } from "react";

interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnail: string | null;
  published: boolean;
  createdAt: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function AdminMediaPage() {
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
    await fetch("/api/media/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
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
    await fetch(`/api/media/videos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !current }),
    });
    load();
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "48px",
    borderRadius: "10px",
    border: "1px solid #e4d5b2",
    padding: "0 14px",
    fontFamily: "var(--font-inter)",
    fontSize: "15px",
    color: "#1c1d1e",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "32px", fontWeight: 700, color: "#1c1d1e" }}>Médiá</h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", marginTop: "4px" }}>
            {videos.length} videí
          </p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-colors hover:bg-[#977d3e]"
          style={{ backgroundColor: "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", border: "none", cursor: "pointer" }}
        >
          {showForm ? "Zrušiť" : "+ Pridať video"}
        </button>
      </div>

      {/* Add video form */}
      {showForm && (
        <form onSubmit={handleSave} className="rounded-[15px] p-6 mb-6" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e", marginBottom: "20px" }}>
            Nové video
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
                Názov *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Večer chvál — január 2026"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontFamily: "var(--font-commissioner)", fontSize: "12px", fontWeight: 700, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px" }}>
                YouTube URL *
              </label>
              <input
                type="url"
                required
                value={form.youtubeUrl}
                onChange={e => setForm(f => ({ ...f, youtubeUrl: e.target.value }))}
                placeholder="https://www.youtube.com/watch?v=..."
                style={inputStyle}
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              <label htmlFor="published" style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#1c1d1e", cursor: "pointer" }}>
                Publikovať
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                style={{ padding: "10px 28px", borderRadius: "50px", backgroundColor: saving ? "#c9a96e" : "#bea055", border: "none", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: saving ? "not-allowed" : "pointer" }}
              >
                {saving ? "Ukladám..." : "Uložiť"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ padding: "10px 28px", borderRadius: "50px", backgroundColor: "transparent", border: "1px solid #e4d5b2", fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#635f5b", cursor: "pointer" }}
              >
                Zrušiť
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Videos list */}
      {loading ? (
        <div className="rounded-[15px] p-16 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "18px", color: "#635f5b" }}>Načítavam...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-[15px] p-16 text-center" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b", marginBottom: "8px" }}>Zatiaľ žiadne videá</p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "15px", color: "#9ca3af" }}>Pridaj prvé YouTube video kliknutím na tlačidlo vyššie.</p>
        </div>
      ) : (
        <div className="rounded-[15px] overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2" }}>
          <div className="grid px-6 py-3 border-b border-[#e4d5b2]" style={{ gridTemplateColumns: "80px 1fr 180px 100px 120px" }}>
            {["", "Názov", "YouTube", "Status", "Akcie"].map(h => (
              <span key={h} style={{ fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, color: "#635f5b", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</span>
            ))}
          </div>
          <div className="divide-y divide-[#e4d5b2]">
            {videos.map((video) => {
              const ytId = getYouTubeId(video.youtubeUrl);
              const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;
              return (
                <div key={video.id} className="grid items-center px-6 py-4 hover:bg-[#f9efe2] transition-colors" style={{ gridTemplateColumns: "80px 1fr 180px 100px 120px" }}>
                  {/* Thumbnail */}
                  <div style={{ width: "64px", height: "40px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#e6ded5", flexShrink: 0 }}>
                    {thumb && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>
                  {/* Title */}
                  <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "16px", fontWeight: 700, color: "#1c1d1e" }}>
                    {video.title}
                  </p>
                  {/* URL */}
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#bea055", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                    {ytId ? `youtu.be/${ytId}` : "YouTube →"}
                  </a>
                  {/* Status toggle */}
                  <button
                    onClick={() => togglePublished(video.id, video.published)}
                    className="px-2 py-0.5 rounded-full inline-block text-left"
                    style={{ backgroundColor: video.published ? "#dcfce7" : "#f3f4f6", color: video.published ? "#16a34a" : "#6b7280", fontFamily: "var(--font-inter)", fontSize: "12px", fontWeight: 500, border: "none", cursor: "pointer" }}
                  >
                    {video.published ? "Online" : "Draft"}
                  </button>
                  {/* Actions */}
                  <button
                    onClick={() => handleDelete(video.id, video.title)}
                    style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#ef4444", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}
                  >
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
