"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiClient, ApiError } from "@/lib/apiClient";
import { useConfirm } from "@/components/ConfirmDialog";
import { Pagination } from "@/components/Pagination";
import { PencilIcon, TrashIcon } from "@/components/icons";
import type { GalleryItemDto } from "@/lib/types";

const PAGE_SIZE = 10;

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function GalleryPage() {
  const confirm = useConfirm();
  const [items, setItems] = useState<GalleryItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

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

  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const visibleItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const onDelete = async (id: number) => {
    const ok = await confirm({ title: "Delete this item?", description: "This can't be undone." });
    if (!ok) return;

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
        <div className="flex shrink-0 gap-2">
          <Link
            href="/dashboard/gallery/view"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Gallery View
          </Link>
          <Link
            href="/dashboard/gallery/new"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            + Add
          </Link>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">Nothing here yet — click Add to upload a photo or video.</p>
      ) : (
        <>
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
                {visibleItems.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 text-slate-500">{(page - 1) * PAGE_SIZE + index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-slate-200">
                        <Image
                          src={item.thumbnail}
                          alt={item.description || "Preview"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-700">{item.type}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-slate-700">
                      {item.type === "video" && item.title ? item.title : item.description || "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDateTime(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/dashboard/gallery/${item.id}/edit`}
                          aria-label="Edit"
                          title="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => onDelete(item.id)}
                          aria-label="Delete"
                          title="Delete"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </>
      )}
    </div>
  );
}
