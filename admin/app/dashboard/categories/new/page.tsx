import { CategoryForm } from "@/components/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Add Category</h1>
      <p className="mt-1 text-sm text-slate-500">Create a Parent Category or a Subcategory under one.</p>

      <div className="mt-6">
        <CategoryForm mode="create" />
      </div>
    </div>
  );
}
