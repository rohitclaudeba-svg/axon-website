"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import type { CategoryDto, CategoryTreeNode } from "@/lib/types";

type CategoryType = "parent" | "subcategory";

export function CategoryForm({ mode, initial }: { mode: "create" | "edit"; initial?: CategoryDto }) {
  const router = useRouter();
  const [type, setType] = useState<CategoryType>(initial?.parentId ? "subcategory" : "parent");
  const [name, setName] = useState(initial?.name ?? "");
  const [parentId, setParentId] = useState<string>(initial?.parentId ? String(initial.parentId) : "");
  const [parents, setParents] = useState<CategoryDto[]>([]);
  const [loadingParents, setLoadingParents] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: CategoryTreeNode[] }>("/api/categories")
      .then((result) => {
        const options = result.data.filter((c) => c.id !== initial?.id);
        setParents(options);
        if (type === "subcategory" && !parentId && options.length > 0) {
          setParentId(String(options[0].id));
        }
      })
      .catch(() => {
        // Leave the dropdown empty — the form will surface the real error on submit.
      })
      .finally(() => setLoadingParents(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (type === "subcategory" && !parentId) {
      setError("Please select a parent category.");
      return;
    }

    const body = {
      name,
      parentId: type === "subcategory" ? Number(parentId) : null,
    };

    setSubmitting(true);
    try {
      if (mode === "create") {
        await apiClient.post("/api/categories", body);
      } else {
        await apiClient.put(`/api/categories/${initial!.id}`, body);
      }
      router.push("/dashboard/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Type</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType("parent")}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
              type === "parent"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 text-slate-600 hover:border-slate-400"
            }`}
          >
            Parent Category
          </button>
          <button
            type="button"
            onClick={() => setType("subcategory")}
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
              type === "subcategory"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 text-slate-600 hover:border-slate-400"
            }`}
          >
            Subcategory
          </button>
        </div>
      </div>

      {type === "subcategory" && (
        <div className="mt-5">
          <label htmlFor="parentId" className="mb-1 block text-sm font-medium text-slate-700">
            Parent Category
          </label>
          <select
            id="parentId"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            disabled={loadingParents}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none disabled:opacity-50"
          >
            {parents.length === 0 && <option value="">No parent categories yet</option>}
            {parents.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-5">
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
          {type === "parent" ? "Category name" : "Subcategory name"}
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={type === "parent" ? "e.g. Facilities" : "e.g. Physiotherapy"}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/categories")}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
