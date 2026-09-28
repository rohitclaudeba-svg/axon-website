"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import { TextListEditor } from "@/components/TextListEditor";
import { CAREER_OPENING_ICONS } from "@/lib/types";
import type { CareerOpeningDto, TextListItem } from "@/lib/types";

let counter = 0;
function newId() {
  counter += 1;
  return `new-${Date.now()}-${counter}`;
}

function toListItems(values: string[]): TextListItem[] {
  return values.map((text) => ({ id: newId(), text }));
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none";

export function CareerOpeningForm({ mode, initial }: { mode: "create" | "edit"; initial?: CareerOpeningDto }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [department, setDepartment] = useState(initial?.department ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "briefcase");
  const [type, setType] = useState(initial?.type ?? "Full-time");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [responsibilities, setResponsibilities] = useState<TextListItem[]>(toListItems(initial?.responsibilities ?? []));
  const [requirements, setRequirements] = useState<TextListItem[]>(toListItems(initial?.requirements ?? []));
  const [enabled, setEnabled] = useState(initial?.enabled ?? true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const body = {
      title,
      department,
      icon,
      type,
      location,
      summary,
      responsibilities: responsibilities.map((item) => item.text).filter(Boolean),
      requirements: requirements.map((item) => item.text).filter(Boolean),
      enabled,
    };

    setSubmitting(true);
    try {
      if (mode === "create") {
        await apiClient.post("/api/career-openings", body);
      } else {
        await apiClient.put(`/api/career-openings/${initial!.id}`, body);
      }
      router.push("/dashboard/careers");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Job title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Speech Therapist"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Department</label>
          <input
            type="text"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g. Speech Therapy"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Employment type</label>
          <input
            type="text"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g. Full-time"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. On-site — Tiruvallur, Tamil Nadu"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">Icon</label>
        <select value={icon} onChange={(e) => setIcon(e.target.value as typeof icon)} className={`${inputClass} sm:w-60`}>
          {CAREER_OPENING_ICONS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">Summary</label>
        <textarea
          required
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">Responsibilities</label>
        <TextListEditor items={responsibilities} onChange={setResponsibilities} placeholder="e.g. Deliver one-to-one and group therapy sessions" />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">Requirements</label>
        <TextListEditor items={requirements} onChange={setRequirements} placeholder="e.g. Bachelor's or Master's degree in the relevant field" />
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700">
        <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
        Published (visible on the site)
      </label>

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
          onClick={() => router.push("/dashboard/careers")}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
