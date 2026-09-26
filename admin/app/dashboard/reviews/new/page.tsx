import { ReviewForm } from "@/components/ReviewForm";

export default function NewReviewPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Add Review</h1>
      <p className="mt-1 text-sm text-slate-500">Add a written review from a family or client.</p>

      <div className="mt-6">
        <ReviewForm mode="create" />
      </div>
    </div>
  );
}
