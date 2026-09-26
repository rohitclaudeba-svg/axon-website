import Link from "next/link";

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">Pick a module to manage.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/gallery"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="font-semibold text-slate-900">Gallery</p>
          <p className="mt-1 text-sm text-slate-500">Upload and manage the site&apos;s gallery photos.</p>
        </Link>
      </div>
    </div>
  );
}
