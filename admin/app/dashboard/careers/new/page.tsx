import { CareerOpeningForm } from "@/components/CareerOpeningForm";

export default function NewCareerOpeningPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Post a Job Opening</h1>
      <p className="mt-1 text-sm text-slate-500">Fill in the role details shown on the Careers page.</p>

      <div className="mt-6">
        <CareerOpeningForm mode="create" />
      </div>
    </div>
  );
}
