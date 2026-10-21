"use client";

import { useEffect, useMemo, useState } from "react";
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

interface ParentGroup {
  parentSlug: string;
  parentName: string;
  items: SubcategoryPageSummaryDto[];
}

function StatusPill({ status }: { status: SubcategoryPageSummaryDto["status"] }) {
  return (
    <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge(status)}`}>
      {statusLabel(status)}
    </span>
  );
}

function EditLink({ categoryId }: { categoryId: number }) {
  return (
    <Link
      href={`/dashboard/subcategory-pages/${categoryId}/edit`}
      aria-label="Edit"
      title="Edit"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
    >
      <PencilIcon className="h-4 w-4" />
    </Link>
  );
}

export default function SubcategoryPagesListPage() {
  const [items, setItems] = useState<SubcategoryPageSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeParent, setActiveParent] = useState<string>("all");

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: SubcategoryPageSummaryDto[] }>("/api/subcategory-pages")
      .then((result) => setItems(result.data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load subcategory pages."))
      .finally(() => setLoading(false));
  }, []);

  // The API already orders by parent position, then subcategory position.
  const groups = useMemo(() => {
    const byParent = new Map<string, ParentGroup>();
    for (const item of items) {
      const group = byParent.get(item.parentSlug) ?? {
        parentSlug: item.parentSlug,
        parentName: item.parentName,
        items: [],
      };
      group.items.push(item);
      byParent.set(item.parentSlug, group);
    }
    return Array.from(byParent.values());
  }, [items]);

  const visibleGroups = activeParent === "all" ? groups : groups.filter((g) => g.parentSlug === activeParent);

  const chipClass = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
      active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
    }`;

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Subcategory Pages</h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage the full page content for every subcategory, grouped by parent category — created automatically from
        Category Management.
      </p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No subcategories yet — create one in Categories first.</p>
      ) : (
        <>
          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" onClick={() => setActiveParent("all")} className={chipClass(activeParent === "all")}>
              All ({items.length})
            </button>
            {groups.map((group) => (
              <button
                key={group.parentSlug}
                type="button"
                onClick={() => setActiveParent(group.parentSlug)}
                className={chipClass(activeParent === group.parentSlug)}
              >
                {group.parentName} ({group.items.length})
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-8">
            {visibleGroups.map((group) => (
              <section key={group.parentSlug}>
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h2 className="font-semibold text-slate-900">{group.parentName}</h2>
                  <span className="text-xs text-slate-500">
                    {group.items.length} {group.items.length === 1 ? "subcategory" : "subcategories"}
                  </span>
                </div>

                {/* Desktop / tablet table */}
                <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white md:block">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-3">Subcategory</th>
                        <th className="px-4 py-3">URL</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item) => (
                        <tr key={item.categoryId} className="border-b border-slate-100 last:border-0">
                          <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                          <td className="px-4 py-3 text-slate-500">{item.url}</td>
                          <td className="px-4 py-3">
                            <StatusPill status={item.status} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end">
                              <EditLink categoryId={item.categoryId} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <ul className="space-y-2 md:hidden">
                  {group.items.map((item) => (
                    <li
                      key={item.categoryId}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-800">{item.name}</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">{item.url}</p>
                        <div className="mt-2">
                          <StatusPill status={item.status} />
                        </div>
                      </div>
                      <EditLink categoryId={item.categoryId} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
