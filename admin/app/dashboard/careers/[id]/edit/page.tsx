"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient, ApiError } from "@/lib/apiClient";
import { CareerOpeningForm } from "@/components/CareerOpeningForm";
import type { CareerOpeningDto } from "@/lib/types";

export default function EditCareerOpeningPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<CareerOpeningDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<{ ok: true; data: CareerOpeningDto }>(`/api/career-openings/${params.id}`)
      .then((result) => setItem(result.data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load job opening."))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Edit Job Opening</h1>

      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
      {item && (
        <div className="mt-6">
          <CareerOpeningForm mode="edit" initial={item} />
        </div>
      )}
    </div>
  );
}
