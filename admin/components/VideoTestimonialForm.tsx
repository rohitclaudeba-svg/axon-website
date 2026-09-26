"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import type { VideoTestimonialDto } from "@/lib/types";

export function VideoTestimonialForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: VideoTestimonialDto;
}) {
  const router = useRouter();
  const [youtubeLink, setYoutubeLink] = useState(
    initial?.youtubeId ? `https://www.youtube.com/watch?v=${initial.youtubeId}` : ""
  );
  const [title, setTitle] = useState(initial?.title ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const body = { youtubeId: youtubeLink, title, author };

    try {
      if (mode === "create") {
        await apiClient.post("/api/video-testimonials", body);
      } else {
        await apiClient.put(`/api/video-testimonials/${initial!.id}`, body);
      }
      router.push("/dashboard/video-testimonials");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      {mode === "edit" && initial && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={initial.thumbnail} alt={initial.title} className="mb-4 h-32 w-24 rounded-lg object-cover" />
      )}

      <div>
        <label htmlFor="youtubeLink" className="mb-1 block text-sm font-medium text-slate-700">
          YouTube link
        </label>
        <input
          id="youtubeLink"
          type="url"
          required
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=... or /shorts/..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="author" className="mb-1 block text-sm font-medium text-slate-700">
          Author / Name <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
          onClick={() => router.push("/dashboard/video-testimonials")}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
