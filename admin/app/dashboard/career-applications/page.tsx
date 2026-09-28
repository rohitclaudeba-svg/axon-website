"use client";

import { useEffect, useState } from "react";
import { apiClient, downloadFile, ApiError } from "@/lib/apiClient";
import { useConfirm } from "@/components/ConfirmDialog";
import { Pagination } from "@/components/Pagination";
import { TrashIcon } from "@/components/icons";
import type { CareerApplicationDto } from "@/lib/types";

const PAGE_SIZE = 10;

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function CareerApplicationsPage() {
  const confirm = useConfirm();
  const [items, setItems] = useState<CareerApplicationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPageNum] = useState(1);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const loadItems = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get<{ ok: true; data: CareerApplicationDto[] }>("/api/career-applications");
      setItems(result.data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load career applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onDelete = async (id: number) => {
    const ok = await confirm({ title: "Delete this application?", description: "This can't be undone." });
    if (!ok) return;

    try {
      await apiClient.del(`/api/career-applications/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete application.");
    }
  };

  const onDownloadResume = async (item: CareerApplicationDto) => {
    setDownloadingId(item.id);
    try {
      await downloadFile(`/api/career-applications/${item.id}/resume`, item.resumeOriginalFilename);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to download resume.");
    } finally {
      setDownloadingId(null);
    }
  };

  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const visibleItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Career Applications</h1>
      <p className="mt-1 text-sm text-slate-500">Resumes and applications submitted through the Careers page.</p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No applications yet.</p>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Resume</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 text-slate-500">{(page - 1) * PAGE_SIZE + index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                    <td className="px-4 py-3 text-slate-700">{item.position || "—"}</td>
                    <td className="px-4 py-3 text-slate-700">{item.email}</td>
                    <td className="px-4 py-3 text-slate-700">{item.phone}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => onDownloadResume(item)}
                        disabled={downloadingId === item.id}
                        className="font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900 disabled:opacity-50"
                      >
                        {downloadingId === item.id ? "Downloading…" : "Download"}
                      </button>
                      {item.certificateCount > 0 && (
                        <span className="ml-2 text-xs text-slate-400">+{item.certificateCount} cert.</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDateTime(item.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        aria-label="Delete"
                        title="Delete"
                        className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination page={page} pageCount={pageCount} onChange={setPageNum} />
        </>
      )}
    </div>
  );
}
