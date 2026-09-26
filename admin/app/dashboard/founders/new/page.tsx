import { FounderForm } from "@/components/FounderForm";

export default function NewFounderPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Add Founder</h1>
      <p className="mt-1 text-sm text-slate-500">Add a photo, name, role and bio.</p>

      <div className="mt-6">
        <FounderForm mode="create" />
      </div>
    </div>
  );
}
