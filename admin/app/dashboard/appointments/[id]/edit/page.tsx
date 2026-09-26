"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import { statusOptions } from "@/lib/enquiryStatus";
import type { EnquiryDto, EnquiryStatus } from "@/lib/types";

export default function EditAppointmentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<EnquiryStatus>("waiting_for_action");

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: EnquiryDto }>(`/api/enquiries/${params.id}`)
      .then((result) => {
        const item = result.data;
        setName(item.name);
        setPhone(item.phone);
        setEmail(item.email ?? "");
        setServiceInterest(item.serviceInterest ?? "");
        setPreferredDate(item.preferredDate ?? "");
        setPreferredTime(item.preferredTime ?? "");
        setMessage(item.message ?? "");
        setStatus(item.status);
      })
      .catch((err) => setLoadError(err instanceof ApiError ? err.message : "Failed to load appointment."))
      .finally(() => setLoading(false));
  }, [params.id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await apiClient.put(`/api/enquiries/${params.id}`, {
        name,
        phone,
        email,
        serviceInterest,
        preferredDate,
        preferredTime,
        message,
        status,
      });
      router.push("/dashboard/appointments");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Edit Appointment</h1>

      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {loadError && <p className="mt-6 text-sm text-red-600">{loadError}</p>}

      {!loading && !loadError && (
        <form onSubmit={onSubmit} className="mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="serviceInterest" className="mb-1 block text-sm font-medium text-slate-700">
              Service of interest
            </label>
            <input
              id="serviceInterest"
              type="text"
              value={serviceInterest}
              onChange={(e) => setServiceInterest(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="preferredDate" className="mb-1 block text-sm font-medium text-slate-700">
                Preferred date
              </label>
              <input
                id="preferredDate"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="preferredTime" className="mb-1 block text-sm font-medium text-slate-700">
                Preferred time
              </label>
              <input
                id="preferredTime"
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                placeholder="e.g. 3:00 PM"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
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
              onClick={() => router.push("/dashboard/appointments")}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
