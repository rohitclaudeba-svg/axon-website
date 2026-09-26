"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import type { FounderDto } from "@/lib/types";

export function FounderForm({ mode, initial }: { mode: "create" | "edit"; initial?: FounderDto }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [credentials, setCredentials] = useState(initial?.credentials ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const file = fileInputRef.current?.files?.[0];
    if (mode === "create" && !file) {
      setError("Please choose a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("credentials", credentials);
    formData.append("role", role);
    formData.append("bio", bio);
    if (file) formData.append("photo", file);

    setSubmitting(true);
    try {
      if (mode === "create") {
        await apiClient.post("/api/founders", formData);
      } else {
        await apiClient.put(`/api/founders/${initial!.id}`, formData);
      }
      router.push("/dashboard/founders");
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
        <label htmlFor="photo" className="mb-1 block text-sm font-medium text-slate-700">
          Photo {mode === "edit" && <span className="font-normal text-slate-400">(leave empty to keep current)</span>}
        </label>
        {mode === "edit" && initial?.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={initial.photo} alt={initial.name} className="mb-3 h-32 w-32 rounded-lg object-cover" />
        )}
        <input
          id="photo"
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="w-full text-sm"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
          Name
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

      <div className="mt-4">
        <label htmlFor="credentials" className="mb-1 block text-sm font-medium text-slate-700">
          Credentials <span className="font-normal text-slate-400">(optional, e.g. BASLP, MSc Psychology)</span>
        </label>
        <input
          id="credentials"
          type="text"
          value={credentials}
          onChange={(e) => setCredentials(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="role" className="mb-1 block text-sm font-medium text-slate-700">
          Role
        </label>
        <input
          id="role"
          type="text"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Founder & Consultant — Speech-Language Pathologist"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="bio" className="mb-1 block text-sm font-medium text-slate-700">
          Bio <span className="font-normal text-slate-400">(separate paragraphs with a blank line)</span>
        </label>
        <textarea
          id="bio"
          rows={8}
          required
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
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
          onClick={() => router.push("/dashboard/founders")}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
