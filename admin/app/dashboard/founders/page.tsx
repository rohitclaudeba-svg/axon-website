"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiClient, ApiError } from "@/lib/apiClient";
import { useConfirm } from "@/components/ConfirmDialog";
import { PencilIcon, TrashIcon } from "@/components/icons";
import type { FounderDto } from "@/lib/types";

export default function FoundersPage() {
  const confirm = useConfirm();
  const [items, setItems] = useState<FounderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadItems = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get<{ ok: true; data: FounderDto[] }>("/api/founders");
      setItems(result.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load founders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onDelete = async (id: number) => {
    const ok = await confirm({ title: "Delete this founder?", description: "This can't be undone." });
    if (!ok) return;

    try {
      await apiClient.del(`/api/founders/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete founder.");
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Founders</h1>
          <p className="mt-1 text-sm text-slate-500">
            Managed here, shown on the homepage and the Our Founders page.
          </p>
        </div>
        <Link
          href="/dashboard/founders/new"
          className="shrink-0 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          + Add
        </Link>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No founders yet — click Add to create one.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-slate-200">
                      {item.photo && (
                        <Image src={item.photo} alt={item.name} fill className="object-cover" unoptimized />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {item.name}
                    {item.credentials && <p className="text-xs font-normal text-slate-500">{item.credentials}</p>}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-slate-700">{item.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/dashboard/founders/${item.id}/edit`}
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
      )}
    </div>
  );
}
