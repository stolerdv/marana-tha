"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

// Cloudinary unsigned upload — no backend needed
// Requires NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env
async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary nie je nakonfigurovaný. Nastav NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME a NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET v .env");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "maranatha");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? "Upload zlyhal");
  }

  const data = await res.json();
  return data.secure_url as string;
}

export function ImageUpload({ value, onChange, label = "Titulná fotografia" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Validate
    if (!file.type.startsWith("image/")) {
      setError("Len obrázky sú povolené (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Maximálna veľkosť súboru je 20 MB");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload zlyhal");
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = ""; // reset so same file can be re-selected
  };

  return (
    <div className="flex flex-col gap-2">
      <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>
        {label}
      </label>

      {/* Preview */}
      {value && (
        <div className="relative rounded-[8px] overflow-hidden" style={{ width: "100%", maxWidth: "400px", height: "220px", backgroundColor: "#e6ded5" }}>
          <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 flex items-center justify-center rounded-full hover:bg-red-700 transition-colors"
            style={{ width: "28px", height: "28px", backgroundColor: "#dc2626", color: "#fff", fontSize: "18px", lineHeight: 1, border: "none", cursor: "pointer" }}
          >
            ×
          </button>
        </div>
      )}

      {/* Drop zone (shown when no image) */}
      {!value && (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center cursor-pointer rounded-[8px] transition-colors"
          style={{
            border: `2px dashed ${dragOver ? "#bea055" : "#e4d5b2"}`,
            backgroundColor: dragOver ? "#f9efe2" : "#fdf5f2",
            padding: "32px 16px",
            minHeight: "160px",
            opacity: uploading ? 0.7 : 1,
            pointerEvents: uploading ? "none" : "auto",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin" style={{ width: "28px", height: "28px", border: "3px solid #e4d5b2", borderTop: "3px solid #bea055", borderRadius: "50%" }} />
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#635f5b" }}>Nahrávam na Cloudinary...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="#e4d5b2" strokeWidth="2" />
                <path d="M18 10v12M12 16l6-6 6 6" stroke="#bea055" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="8" y="26" width="20" height="3" rx="1.5" fill="#e4d5b2" />
              </svg>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#1c1d1e" }}>
                {dragOver ? "Pustiť sem..." : "Nahrať fotku"}
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af" }}>
                Klikni alebo pretiahnite súbor · JPG, PNG, WebP · max 20 MB
              </p>
            </div>
          )}
        </label>
      )}

      {/* Change button when image exists */}
      {value && !uploading && (
        <label className="cursor-pointer inline-block" style={{ width: "fit-content" }}>
          <input type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
          <span
            className="px-4 py-2 rounded-full hover:bg-[#f3f4f6] transition-colors inline-block"
            style={{ border: "1px solid #e4d5b2", fontFamily: "var(--font-commissioner)", fontSize: "13px", color: "#635f5b", cursor: "pointer" }}
          >
            Zmeniť fotku
          </span>
        </label>
      )}

      {error && (
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#dc2626" }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
