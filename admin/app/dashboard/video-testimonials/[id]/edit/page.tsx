"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import { VideoTestimonialForm } from "@/components/VideoTestimonialForm";
import type { VideoTestimonialDto } from "@/lib/types";

export default function EditVideoTestimonialPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<VideoTestimonialDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: VideoTestimonialDto }>(`/api/video-testimonials/${params.id}`)
      .then((result) => setItem(result.data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load video."))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Edit Video Testimonial</h1>

      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
      {item && (
        <div className="mt-6">
          <VideoTestimonialForm mode="edit" initial={item} />
        </div>
      )}
    </div>
  );
}
