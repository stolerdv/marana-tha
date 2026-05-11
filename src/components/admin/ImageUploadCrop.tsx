"use client";

import { useCallback, useRef, useState } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Image from "next/image";

async function uploadToCloudinary(blob: Blob): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
  const formData = new FormData();
  formData.append("file", blob, "crop.jpg");
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "maranatha");
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Upload zlyhal");
  return (await res.json()).secure_url as string;
}

async function getCroppedBlob(imgEl: HTMLImageElement, crop: PixelCrop): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const scaleX = imgEl.naturalWidth / imgEl.width;
  const scaleY = imgEl.naturalHeight / imgEl.height;
  const outputSize = 1200;
  const aspect = crop.width / crop.height;
  canvas.width = outputSize;
  canvas.height = Math.round(outputSize / aspect);
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    imgEl,
    crop.x * scaleX, crop.y * scaleY,
    crop.width * scaleX, crop.height * scaleY,
    0, 0, canvas.width, canvas.height
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob(b => b ? resolve(b) : reject(new Error("Canvas error")), "image/jpeg", 0.92);
  });
}

const RATIOS = [
  { label: "Voľný", value: undefined },
  { label: "1 : 1", value: 1 },
  { label: "4 : 3", value: 4 / 3 },
  { label: "3 : 4", value: 3 / 4 },
  { label: "16 : 9", value: 16 / 9 },
];

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  defaultAspect?: number;
}

export function ImageUploadCrop({ value, onChange, label = "Fotografia", defaultAspect }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(defaultAspect);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  function onSelectFile(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) { setError("Len obrázky (JPG, PNG, WebP)"); return; }
    if (file.size > 20 * 1024 * 1024) { setError("Max 20 MB"); return; }
    setError("");
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result as string);
    reader.readAsDataURL(file);
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initial = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, aspect ?? width / height, width, height),
      width, height
    );
    setCrop(initial);
  }

  function changeAspect(newAspect: number | undefined) {
    setAspect(newAspect);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, newAspect ?? width / height, width, height),
        width, height
      );
      setCrop(newCrop);
    }
  }

  async function handleConfirm() {
    if (!completedCrop || !imgRef.current) return;
    setUploading(true);
    setError("");
    try {
      const blob = await getCroppedBlob(imgRef.current, completedCrop);
      const url = await uploadToCloudinary(blob);
      onChange(url);
      setSrc(null);
      setCrop(undefined);
      setCompletedCrop(undefined);
    } catch {
      setError("Nahrávanie zlyhalo. Skús znova.");
    } finally {
      setUploading(false);
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    onSelectFile(e.dataTransfer.files);
  }, []);

  // ── Crop UI ──────────────────────────────────────────────────────────────
  if (src) {
    return (
      <div className="flex flex-col gap-4">
        <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>
          {label} — Vyber oblasť
        </label>

        {/* Aspect ratio buttons */}
        <div className="flex gap-2 flex-wrap">
          {RATIOS.map(r => (
            <button
              key={r.label}
              type="button"
              onClick={() => changeAspect(r.value)}
              style={{
                padding: "5px 14px",
                borderRadius: "50px",
                border: `1px solid ${aspect === r.value ? "#bea055" : "#e4d5b2"}`,
                backgroundColor: aspect === r.value ? "#bea055" : "#ffffff",
                color: aspect === r.value ? "#fdf5f2" : "#635f5b",
                fontFamily: "var(--font-commissioner)",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Crop area */}
        <div style={{ maxWidth: "600px", borderRadius: "10px", overflow: "hidden", border: "1px solid #e4d5b2" }}>
          <ReactCrop
            crop={crop}
            onChange={(_, pct) => setCrop(pct)}
            onComplete={c => setCompletedCrop(c)}
            aspect={aspect}
            minWidth={50}
            minHeight={50}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt="crop preview"
              onLoad={onImageLoad}
              style={{ maxWidth: "100%", maxHeight: "480px", display: "block" }}
            />
          </ReactCrop>
        </div>

        {error && <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#dc2626" }}>⚠️ {error}</p>}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!completedCrop || uploading}
            style={{
              padding: "10px 28px",
              borderRadius: "50px",
              backgroundColor: uploading || !completedCrop ? "#c9a96e" : "#bea055",
              border: "none",
              fontFamily: "var(--font-commissioner)",
              fontSize: "15px",
              fontWeight: 700,
              color: "#fdf5f2",
              cursor: uploading || !completedCrop ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {uploading && (
              <div className="animate-spin" style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid white", borderRadius: "50%" }} />
            )}
            {uploading ? "Nahrávam..." : "✓ Potvrdiť výrez"}
          </button>
          <button
            type="button"
            onClick={() => { setSrc(null); setCrop(undefined); }}
            style={{ padding: "10px 20px", borderRadius: "50px", border: "1px solid #e4d5b2", backgroundColor: "transparent", fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#635f5b", cursor: "pointer" }}
          >
            Zrušiť
          </button>
        </div>
      </div>
    );
  }

  // ── Upload zone / Preview ────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-2">
      <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>
        {label}
      </label>

      {value && (
        <div className="relative rounded-[8px] overflow-hidden" style={{ width: "100%", maxWidth: "400px", height: "220px", backgroundColor: "#e6ded5" }}>
          <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 flex items-center justify-center rounded-full hover:bg-red-700 transition-colors"
            style={{ width: "28px", height: "28px", backgroundColor: "#dc2626", color: "#fff", fontSize: "18px", border: "none", cursor: "pointer" }}
          >
            ×
          </button>
        </div>
      )}

      {value ? (
        <label className="cursor-pointer inline-block" style={{ width: "fit-content" }}>
          <input type="file" accept="image/*" onChange={e => onSelectFile(e.target.files)} className="hidden" />
          <span className="px-4 py-2 rounded-full hover:bg-[#f3f4f6] transition-colors inline-block"
            style={{ border: "1px solid #e4d5b2", fontFamily: "var(--font-commissioner)", fontSize: "13px", color: "#635f5b", cursor: "pointer" }}>
            Zmeniť a orezať
          </span>
        </label>
      ) : (
        <label
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center cursor-pointer rounded-[8px] transition-colors"
          style={{ border: `2px dashed ${dragOver ? "#bea055" : "#e4d5b2"}`, backgroundColor: dragOver ? "#f9efe2" : "#fdf5f2", padding: "32px 16px", minHeight: "160px" }}
        >
          <input type="file" accept="image/*" onChange={e => onSelectFile(e.target.files)} className="hidden" />
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" stroke="#e4d5b2" strokeWidth="2" />
            <path d="M18 10v12M12 16l6-6 6 6" stroke="#bea055" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#1c1d1e", marginTop: "10px" }}>
            Nahrať a orezať fotku
          </p>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
            Klikni alebo pretiahni · JPG, PNG, WebP · max 20 MB
          </p>
        </label>
      )}

      {error && <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "#dc2626" }}>⚠️ {error}</p>}
    </div>
  );
}
