"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient, ApiError } from "@/lib/apiClient";
import { useConfirm } from "@/components/ConfirmDialog";
import { PencilIcon, TrashIcon } from "@/components/icons";
import type { CategoryTreeNode } from "@/lib/types";

export default function CategoriesPage() {
  const confirm = useConfirm();
  const [tree, setTree] = useState<CategoryTreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadItems = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get<{ ok: true; data: CategoryTreeNode[] }>("/api/categories");
      setTree(result.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onDelete = async (id: number, hasChildren: boolean) => {
    const ok = await confirm({
      title: "Delete this category?",
      description: hasChildren
        ? "It has subcategories under it — delete those first."
        : "This can't be undone.",
    });
    if (!ok) return;

    try {
      await apiClient.del(`/api/categories/${id}`);
      loadItems();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete category.");
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Categories</h1>
          <p className="mt-1 text-sm text-slate-500">
            Parent categories drive the website header menu; subcategories appear as dropdown items.
          </p>
        </div>
        <Link
          href="/dashboard/categories/new"
          className="shrink-0 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          + Add New
        </Link>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading…</p>
      ) : tree.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No categories yet — click Add New to create one.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {tree.map((parent) => (
            <div key={parent.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between gap-4 bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-900">{parent.name}</p>
                  <p className="text-xs text-slate-500">/{parent.slug}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/dashboard/categories/${parent.id}/edit`}
                    aria-label="Edit"
                    title="Edit"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(parent.id, parent.children.length > 0)}
                    aria-label="Delete"
                    title="Delete"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {parent.children.length > 0 && (
                <ul className="divide-y divide-slate-100">
                  {parent.children.map((child) => (
                    <li key={child.id} className="flex items-center justify-between gap-4 px-4 py-2.5 pl-8">
                      <div>
                        <p className="text-sm text-slate-800">{child.name}</p>
                        <p className="text-xs text-slate-500">/{parent.slug}/{child.slug}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/dashboard/categories/${child.id}/edit`}
                          aria-label="Edit"
                          title="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => onDelete(child.id, false)}
                          aria-label="Delete"
                          title="Delete"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
