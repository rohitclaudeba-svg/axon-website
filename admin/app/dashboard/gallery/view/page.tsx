"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiClient, ApiError } from "@/lib/apiClient";
import { ArrowUpIcon, ArrowDownIcon } from "@/components/icons";
import type { GalleryItemDto } from "@/lib/types";

export default function GalleryViewPage() {
  const [items, setItems] = useState<GalleryItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const dragId = useRef<number | null>(null);

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: GalleryItemDto[] }>("/api/gallery")
      .then((result) => setItems(result.data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load gallery items."))
      .finally(() => setLoading(false));
  }, []);

  const persistOrder = async (ordered: GalleryItemDto[]) => {
    setSaving(true);
    setError("");
    try {
      await apiClient.put("/api/gallery/reorder", { ids: ordered.map((item) => item.id) });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save the new order.");
    } finally {
      setSaving(false);
    }
  };

  const moveTo = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length || fromIndex === toIndex) return;
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setItems(next);
    persistOrder(next);
  };

  const onDragStart = (id: number) => {
    dragId.current = id;
  };

  const onDragOverItem = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const onDrop = (targetId: number) => {
    const fromId = dragId.current;
    dragId.current = null;
    setDragOverId(null);
    if (fromId === null || fromId === targetId) return;

    const fromIndex = items.findIndex((item) => item.id === fromId);
    const toIndex = items.findIndex((item) => item.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setItems(next);
    persistOrder(next);
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Gallery View</h1>
          <p className="mt-1 text-sm text-slate-500">
            This is how the gallery looks on the site. Drag a card (or use the arrows) to reorder — the site updates
            to match.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-xs text-slate-400">Saving…</span>}
          <Link
            href="/dashboard/gallery"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Back to List
          </Link>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">Nothing here yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => onDragStart(item.id)}
              onDragOver={(e) => onDragOverItem(e, item.id)}
              onDragLeave={() => setDragOverId((prev) => (prev === item.id ? null : prev))}
              onDrop={() => onDrop(item.id)}
              className={`group relative aspect-square cursor-grab overflow-hidden rounded-2xl border-2 bg-slate-100 transition-colors active:cursor-grabbing ${
                dragOverId === item.id ? "border-slate-900" : "border-slate-200"
              }`}
            >
              <Image
                src={item.thumbnail}
                alt={item.description || item.title || "Gallery item"}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
                unoptimized
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900">
                    ▶
                  </span>
                </div>
              )}

              <div className="absolute left-1.5 top-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                #{index + 1}
              </div>

              <div className="absolute bottom-1.5 right-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => moveTo(index, index - 1)}
                  disabled={index === 0}
                  aria-label="Move earlier"
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-sm hover:bg-white disabled:opacity-30"
                >
                  <ArrowUpIcon className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveTo(index, index + 1)}
                  disabled={index === items.length - 1}
                  aria-label="Move later"
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-sm hover:bg-white disabled:opacity-30"
                >
                  <ArrowDownIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
