"use client";

import { useEffect, useState } from "react";
import { apiClient, ApiError } from "@/lib/apiClient";
import { useToast } from "@/components/Toast";

/**
 * Publish/unpublish switch for the whole public /testimonials page. Shown on
 * both the Reviews and Video Testimonials screens since both feed that page.
 */
export function TestimonialsPageVisibility() {
  const showToast = useToast();
  const [published, setPublished] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: { testimonials: boolean } }>("/api/page-visibility")
      .then((result) => setPublished(result.data.testimonials))
      .catch(() => setPublished(null));
  }, []);

  const onToggle = async () => {
    if (published === null) return;
    const next = !published;
    setSaving(true);
    try {
      const result = await apiClient.put<{ ok: true; data: { testimonials: boolean } }>(
        "/api/page-visibility/testimonials",
        { enabled: next }
      );
      setPublished(result.data.testimonials);
      showToast(next ? "Testimonials page published." : "Testimonials page unpublished.");
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Failed to update. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (published === null) return null;

  return (
    <div
      className={`mt-6 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
        published ? "border-slate-200 bg-white" : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">
          Testimonials page:{" "}
          <span className={published ? "text-green-700" : "text-amber-700"}>
            {published ? "Published" : "Unpublished"}
          </span>
        </p>
        <p className="mt-0.5 text-xs text-slate-500">
          {published
            ? "The /testimonials page is live and linked from the Media menu and footer."
            : "The /testimonials page is hidden — removed from the Media menu, footer and sitemap, and its URL shows “page not found”. Your reviews and videos are kept."}
        </p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        disabled={saving}
        className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${
          published
            ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            : "bg-slate-900 text-white hover:bg-slate-700"
        }`}
      >
        {saving ? "Saving…" : published ? "Unpublish page" : "Publish page"}
      </button>
    </div>
  );
}
