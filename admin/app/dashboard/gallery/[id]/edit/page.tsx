"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import { GalleryItemForm } from "@/components/GalleryItemForm";
import type { GalleryItemDto } from "@/lib/types";

export default function EditGalleryItemPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<GalleryItemDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: GalleryItemDto }>(`/api/gallery/${params.id}`)
      .then((result) => setItem(result.data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load item."))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Edit Gallery Item</h1>

      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
      {item && (
        <div className="mt-6">
          <GalleryItemForm mode="edit" initial={item} />
        </div>
      )}
    </div>
  );
}
