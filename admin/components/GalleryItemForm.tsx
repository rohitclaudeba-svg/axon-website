"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import type { GalleryItemDto } from "@/lib/types";

type MediaType = "image" | "video";

export function GalleryItemForm({ mode, initial }: { mode: "create" | "edit"; initial?: GalleryItemDto }) {
  const router = useRouter();
  const [type, setType] = useState<MediaType>(initial?.type ?? "image");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [youtubeLink, setYoutubeLink] = useState(initial?.youtubeId ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const file = fileInputRef.current?.files?.[0];
    if (type === "image" && mode === "create" && !file) {
      setError("Please choose an image file.");
      return;
    }
    if (type === "video" && !youtubeLink.trim()) {
      setError("Please enter a YouTube link.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);

    if (type === "image") {
      formData.append("type", "image");
      if (file) formData.append("image", file);
    } else {
      formData.append("type", "video");
      formData.append("youtubeId", youtubeLink);
      formData.append("title", title);
    }

    setSubmitting(true);
    try {
      if (mode === "create") {
        await apiClient.post("/api/gallery", formData);
      } else {
        await apiClient.put(`/api/gallery/${initial!.id}`, formData);
      }
      router.push("/dashboard/gallery");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      {mode === "create" && (
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Type</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType("image")}
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                type === "image"
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 text-slate-600 hover:border-slate-400"
              }`}
            >
              Image
            </button>
            <button
              type="button"
              onClick={() => setType("video")}
              className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                type === "video"
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 text-slate-600 hover:border-slate-400"
              }`}
            >
              Video
            </button>
          </div>
        </div>
      )}

      {mode === "edit" && (
        <p className="text-sm text-slate-500">
          Type: <span className="font-semibold text-slate-800">{type === "image" ? "Image" : "Video"}</span>{" "}
          <span className="text-slate-400">(can&apos;t be changed)</span>
        </p>
      )}

      {type === "image" ? (
        <div className="mt-5">
          <label htmlFor="image" className="mb-1 block text-sm font-medium text-slate-700">
            Photo {mode === "edit" && <span className="font-normal text-slate-400">(leave empty to keep current)</span>}
          </label>
          {mode === "edit" && initial?.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={initial.src} alt={initial.description} className="mb-3 h-32 w-32 rounded-lg object-cover" />
          )}
          <input
            id="image"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="w-full text-sm"
          />
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="youtubeLink" className="mb-1 block text-sm font-medium text-slate-700">
              YouTube link
            </label>
            <input
              id="youtubeLink"
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... or /shorts/..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
          Description <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          onClick={() => router.push("/dashboard/gallery")}
          className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
