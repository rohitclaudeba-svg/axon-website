import Link from "next/link";

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Pick a module to manage.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/categories"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Categories</p>
          <p className="mt-1 text-sm text-slate-500">Manage the parent categories and subcategories that drive the header menu.</p>
        </Link>
        <Link
          href="/dashboard/subcategory-pages"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Subcategory Pages</p>
          <p className="mt-1 text-sm text-slate-500">Manage the full page content for each subcategory.</p>
        </Link>
        <Link
          href="/dashboard/founders"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Founders</p>
          <p className="mt-1 text-sm text-slate-500">Manage founder photos, roles and bios.</p>
        </Link>
        <Link
          href="/dashboard/gallery"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Gallery</p>
          <p className="mt-1 text-sm text-slate-500">Upload and manage the site&apos;s gallery photos.</p>
        </Link>
        <Link
          href="/dashboard/reviews"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Reviews</p>
          <p className="mt-1 text-sm text-slate-500">Manage written reviews shown on the site.</p>
        </Link>
        <Link
          href="/dashboard/video-testimonials"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Video Testimonials</p>
          <p className="mt-1 text-sm text-slate-500">Manage the YouTube videos on the Testimonials page.</p>
        </Link>
        <Link
          href="/dashboard/appointments"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Appointments</p>
          <p className="mt-1 text-sm text-slate-500">Review and manage appointment requests.</p>
        </Link>
        <Link
          href="/dashboard/contacts"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Contacts</p>
          <p className="mt-1 text-sm text-slate-500">View messages submitted through the Contact form.</p>
        </Link>
      </div>
    </div>
  );
}
