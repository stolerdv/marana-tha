"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

const MAX_PHOTOS = 5;

async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset!);
  formData.append("folder", "maranatha/gallery");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Upload zlyhal");
  return (await res.json()).secure_url as string;
}

interface Props {
  photos: string[];
  onChange: (photos: string[]) => void;
}

export function GalleryUpload({ photos, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) return;

    const toUpload = Array.from(files).slice(0, remaining);
    setUploading(true);
    setError("");
    try {
      const urls = await Promise.all(toUpload.map(uploadToCloudinary));
      onChange([...photos, ...urls]);
    } catch {
      setError("Nahrávanie zlyhalo. Skús znova.");
    } finally {
      setUploading(false);
    }
  }, [photos, onChange]);

  function remove(idx: number) {
    onChange(photos.filter((_, i) => i !== idx));
  }

  function move(from: number, to: number) {
    const arr = [...photos];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    onChange(arr);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>
          Galéria (max {MAX_PHOTOS} fotiek)
        </label>
        <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af" }}>
          {photos.length}/{MAX_PHOTOS}
        </span>
      </div>

      {/* Photo thumbnails */}
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {photos.map((url, i) => (
            <div key={url} className="relative group" style={{ width: "120px", height: "90px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#e6ded5", flexShrink: 0 }}>
              <Image src={url} alt={`Foto ${i + 1}`} fill className="object-cover" unoptimized />
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {i > 0 && (
                  <button type="button" onClick={() => move(i, i - 1)}
                    style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", fontSize: "14px" }}>
                    ←
                  </button>
                )}
                <button type="button" onClick={() => remove(i)}
                  style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "#dc2626", color: "white", border: "none", cursor: "pointer", fontSize: "14px" }}>
                  ×
                </button>
                {i < photos.length - 1 && (
                  <button type="button" onClick={() => move(i, i + 1)}
                    style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", fontSize: "14px" }}>
                    →
                  </button>
                )}
              </div>
              {/* Index badge */}
              <div style={{ position: "absolute", top: "4px", left: "4px", width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#bea055", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-commissioner)", fontSize: "10px", fontWeight: 700, color: "white" }}>
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone — shown when under limit */}
      {photos.length < MAX_PHOTOS && (
        <label
          className="flex flex-col items-center justify-center cursor-pointer rounded-[8px] transition-colors"
          style={{
            border: `2px dashed ${uploading ? "#bea055" : "#e4d5b2"}`,
            backgroundColor: uploading ? "#f9efe2" : "#fdf5f2",
            padding: "20px 16px",
            opacity: uploading ? 0.8 : 1,
            pointerEvents: uploading ? "none" : "auto",
          }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={e => handleFiles(e.target.files)}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin" style={{ width: "20px", height: "20px", border: "3px solid #e4d5b2", borderTop: "3px solid #bea055", borderRadius: "50%" }} />
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", color: "#635f5b" }}>Nahrávam...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-center">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="#e4d5b2" strokeWidth="2" />
                <path d="M18 10v12M12 16l6-6 6 6" stroke="#bea055" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "14px", fontWeight: 700, color: "#1c1d1e", marginTop: "4px" }}>
                Pridať fotky {photos.length > 0 ? `(${MAX_PHOTOS - photos.length} zostatok)` : ""}
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "#9ca3af" }}>
                Klikni alebo pretiahni · môžeš vybrať viacero naraz
              </p>
            </div>
          )}
        </label>
      )}

      {error && (
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#dc2626" }}>⚠️ {error}</p>
      )}
    </div>
  );
}
