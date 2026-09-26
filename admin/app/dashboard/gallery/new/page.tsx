import { GalleryItemForm } from "@/components/GalleryItemForm";

export default function NewGalleryItemPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Add to Gallery</h1>
      <p className="mt-1 text-sm text-slate-500">Choose whether you&apos;re adding a photo or a video.</p>

      <div className="mt-6">
        <GalleryItemForm mode="create" />
      </div>
    </div>
  );
}
