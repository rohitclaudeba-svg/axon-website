"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient, ApiError } from "@/lib/apiClient";
import { PencilIcon } from "@/components/icons";
import type { SubcategoryPageSummaryDto } from "@/lib/types";

function statusBadge(status: SubcategoryPageSummaryDto["status"]) {
  if (status === "published") return "bg-green-100 text-green-700";
  if (status === "draft") return "bg-amber-100 text-amber-700";
  return "bg-slate-200 text-slate-600";
}

function statusLabel(status: SubcategoryPageSummaryDto["status"]) {
  if (status === "published") return "Published";
  if (status === "draft") return "Draft";
  return "Not started";
}

export default function SubcategoryPagesListPage() {
  const [items, setItems] = useState<SubcategoryPageSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: SubcategoryPageSummaryDto[] }>("/api/subcategory-pages")
      .then((result) => setItems(result.data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load subcategory pages."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Subcategory Pages</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage the full page content for every subcategory — created automatically from Category Management.
      </p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">
          No subcategories yet — create one in Categories first.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Subcategory</th>
                <th className="px-4 py-3">Parent Category</th>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.categoryId} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                  <td className="px-4 py-3 text-slate-700">{item.parentName}</td>
                  <td className="px-4 py-3 text-slate-500">{item.url}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge(item.status)}`}>
                      {statusLabel(item.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/subcategory-pages/${item.categoryId}/edit`}
                      aria-label="Edit"
                      title="Edit"
                      className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Link>
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
