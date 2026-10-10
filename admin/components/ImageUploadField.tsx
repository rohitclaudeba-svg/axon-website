"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Cropper, { type Area } from "react-easy-crop";
import { apiClient, ApiError } from "@/lib/apiClient";
import { getCroppedImageFile } from "@/lib/cropImage";

export function ImageUploadField({
  label,
  value,
  onChange,
  dimensionHint,
  aspectRatio,
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  /** Recommended pixel dimensions shown under the field, e.g. "1920 × 600px (landscape banner)". */
  dimensionHint?: string;
  /** Width ÷ height the uploaded image must be cropped to before upload, e.g. 1920/600. Omit to skip cropping. */
  aspectRatio?: number;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const upload = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const result = await apiClient.post<{ ok: true; data: { url: string } }>(
        "/api/subcategory-pages/upload-image",
        formData
      );
      onChange(result.data.url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!aspectRatio) {
      await upload(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setPendingFile(file);
    setCropSrc(URL.createObjectURL(file));
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const closeCropper = () => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    setPendingFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onConfirmCrop = async () => {
    if (!cropSrc || !pendingFile || !croppedAreaPixels) return;
    setError("");
    setUploading(true);
    try {
      const croppedFile = await getCroppedImageFile(cropSrc, croppedAreaPixels, pendingFile.name);
      closeCropper();
      await upload(croppedFile);
    } catch {
      setUploading(false);
      setError("Failed to crop image.");
    }
  };

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      {dimensionHint && <p className="mb-1.5 text-xs text-slate-400">Recommended size: {dimensionHint}</p>}
      {value && (
        <div className="relative mb-2 h-28 w-44 overflow-hidden rounded-lg border border-slate-200">
          <Image src={value} alt={label} fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="flex items-center gap-3">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileSelected} className="text-sm" />
        {uploading && <span className="text-xs text-slate-500">Uploading…</span>}
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs font-medium text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      {cropSrc && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="font-semibold text-slate-900">Crop image</h3>
            <p className="mt-1 text-xs text-slate-500">
              Drag to reposition, use the slider to zoom. The crop matches the exact size this image shows at on the
              site, so nothing gets cut off there.
            </p>
            <div className="relative mt-4 h-80 w-full overflow-hidden rounded-lg bg-slate-100">
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-slate-500">Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1"
              />
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeCropper}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmCrop}
                disabled={!croppedAreaPixels || uploading}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
              >
                {uploading ? "Uploading…" : "Crop & Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
