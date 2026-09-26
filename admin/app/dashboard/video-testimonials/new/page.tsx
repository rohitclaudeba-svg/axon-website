import { VideoTestimonialForm } from "@/components/VideoTestimonialForm";

export default function NewVideoTestimonialPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Add Video Testimonial</h1>
      <p className="mt-1 text-sm text-slate-500">Add a YouTube video testimonial.</p>

      <div className="mt-6">
        <VideoTestimonialForm mode="create" />
      </div>
    </div>
  );
}
