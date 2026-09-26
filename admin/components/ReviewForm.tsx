"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import type { ReviewDto } from "@/lib/types";

export function ReviewForm({ mode, initial }: { mode: "create" | "edit"; initial?: ReviewDto }) {
  const router = useRouter();
  const [quote, setQuote] = useState(initial?.quote ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [context, setContext] = useState(initial?.context ?? "");
  const [rating, setRating] = useState(initial?.rating ?? 5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const body = { quote, author, context, rating };

    try {
      if (mode === "create") {
        await apiClient.post("/api/reviews", body);
      } else {
        await apiClient.put(`/api/reviews/${initial!.id}`, body);
      }
      router.push("/dashboard/reviews");
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
        <label htmlFor="quote" className="mb-1 block text-sm font-medium text-slate-700">
          Review
        </label>
        <textarea
          id="quote"
          rows={5}
          required
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="author" className="mb-1 block text-sm font-medium text-slate-700">
            Author name
          </label>
          <input
            id="author"
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="rating" className="mb-1 block text-sm font-medium text-slate-700">
            Rating
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n !== 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="context" className="mb-1 block text-sm font-medium text-slate-700">
          Context <span className="font-normal text-slate-400">(optional, e.g. service used)</span>
        </label>
        <input
          id="context"
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g. Speech Therapy"
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
          onClick={() => router.push("/dashboard/reviews")}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
