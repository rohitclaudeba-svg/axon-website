"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient, ApiError } from "@/lib/apiClient";
import { useConfirm } from "@/components/ConfirmDialog";
import { Pagination } from "@/components/Pagination";
import { statusOptions, statusBadgeClasses } from "@/lib/enquiryStatus";
import { PencilIcon, TrashIcon } from "@/components/icons";
import type { EnquiryDto, EnquiryStatus } from "@/lib/types";

const PAGE_SIZE = 10;

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function formatPreferred(item: EnquiryDto) {
  if (!item.preferredDate) return item.preferredTime || "—";
  const date = new Date(`${item.preferredDate}T00:00:00`);
  const formatted = date.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
  return item.preferredTime ? `${formatted} · ${item.preferredTime}` : formatted;
}

export default function AppointmentsPage() {
  const confirm = useConfirm();
  const [items, setItems] = useState<EnquiryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus | "">("");
  const [monthFilter, setMonthFilter] = useState("");

  const loadItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ source: "appointment" });
      if (search.trim()) params.set("q", search.trim());
      if (statusFilter) params.set("status", statusFilter);
      if (monthFilter) params.set("month", monthFilter);

      const result = await apiClient.get<{ ok: true; data: EnquiryDto[] }>(`/api/enquiries?${params.toString()}`);
      setItems(result.data);
      setPage(1);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, monthFilter]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadItems();
  };

  const onStatusChange = async (item: EnquiryDto, status: EnquiryStatus) => {
    try {
      await apiClient.put(`/api/enquiries/${item.id}`, {
        name: item.name,
        phone: item.phone,
        email: item.email ?? "",
        serviceInterest: item.serviceInterest ?? "",
        preferredDate: item.preferredDate ?? "",
        preferredTime: item.preferredTime ?? "",
        message: item.message ?? "",
        status,
      });
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status } : i)));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to update status.");
    }
  };

  const onDelete = async (id: number) => {
    const ok = await confirm({ title: "Delete this appointment?", description: "This can't be undone." });
    if (!ok) return;

    try {
      await apiClient.del(`/api/enquiries/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete appointment.");
    }
  };

  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const visibleItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Appointments</h1>
      <p className="mt-1 text-sm text-slate-500">Appointment requests submitted from the site.</p>

      <form onSubmit={onSearchSubmit} className="mt-6 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="search" className="mb-1 block text-xs font-medium text-slate-500">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, phone or email"
            className="w-56 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="status" className="mb-1 block text-xs font-medium text-slate-500">
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as EnquiryStatus | "")}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            <option value="">All statuses</option>
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="month" className="mb-1 block text-xs font-medium text-slate-500">
            Month
          </label>
          <input
            id="month"
            type="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          Search
        </button>
        {(search || statusFilter || monthFilter) && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setMonthFilter("");
            }}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            Clear
          </button>
        )}
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No appointments found.</p>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Preferred date &amp; time</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 text-slate-500">{(page - 1) * PAGE_SIZE + index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                    <td className="px-4 py-3 text-slate-700">{item.phone}</td>
                    <td className="px-4 py-3 text-slate-700">{item.serviceInterest || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">{formatPreferred(item)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={item.status}
                        onChange={(e) => onStatusChange(item, e.target.value as EnquiryStatus)}
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(item.status)}`}
                      >
                        {statusOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDateTime(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/dashboard/appointments/${item.id}/edit`}
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
