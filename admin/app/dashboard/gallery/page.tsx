"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiClient, ApiError } from "@/lib/apiClient";
import type { GalleryItemDto } from "@/lib/types";

function formatDateTime(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadItems = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get<{ ok: true; data: GalleryItemDto[] }>("/api/gallery");
      setItems(result.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load gallery items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onDelete = async (id: number) => {
    if (!confirm("Delete this item? This can't be undone.")) return;
    try {
      await apiClient.del(`/api/gallery/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete item.");
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Gallery</h1>
          <p className="mt-1 text-sm text-slate-500">
            Photos and videos added here appear immediately on the public site&apos;s Gallery page.
          </p>
        </div>
        <Link
          href="/dashboard/gallery/new"
          className="shrink-0 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          + Add
        </Link>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">Nothing here yet — click Add to upload a photo or video.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Preview</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Added</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-slate-200">
                      <Image src={item.thumbnail} alt={item.description || "Preview"} fill className="object-cover" unoptimized />
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-700">{item.type}</td>
                  <td className="px-4 py-3 max-w-xs truncate text-slate-700">
                    {item.type === "video" && item.title ? item.title : item.description || "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">{formatDateTime(item.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/dashboard/gallery/${item.id}/edit`}
                        className="font-medium text-slate-600 hover:text-slate-900"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
