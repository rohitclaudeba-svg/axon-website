"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { apiClient, ApiError } from "@/lib/apiClient";

export function ImageUploadField({
  label,
  value,
  onChange,
  dimensionHint,
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  /** Recommended pixel dimensions shown under the field, e.g. "1920 × 600px (landscape banner)". */
  dimensionHint?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
      if (fileInputRef.current) fileInputRef.current.value = "";
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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileSelected}
          className="text-sm"
        />
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
    </div>
  );
}
