"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import { FounderForm } from "@/components/FounderForm";
import type { FounderDto } from "@/lib/types";

export default function EditFounderPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<FounderDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: FounderDto }>(`/api/founders/${params.id}`)
      .then((result) => setItem(result.data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load founder."))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Edit Founder</h1>

      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
      {item && (
        <div className="mt-6">
          <FounderForm mode="edit" initial={item} />
        </div>
      )}
    </div>
  );
}
