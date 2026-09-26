"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";

type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "group"; label: string; children: { label: string; href: string }[] };

const navItems: NavItem[] = [
  { kind: "link", label: "Dashboard", href: "/dashboard" },
  { kind: "link", label: "Categories", href: "/dashboard/categories" },
  {
    kind: "group",
    label: "Content",
    children: [
      { label: "Founders", href: "/dashboard/founders" },
      { label: "Gallery", href: "/dashboard/gallery" },
      { label: "Reviews", href: "/dashboard/reviews" },
      { label: "Video Testimonials", href: "/dashboard/video-testimonials" },
    ],
  },
  {
    kind: "group",
    label: "Enquiries",
    children: [
      { label: "Appointments", href: "/dashboard/appointments" },
      { label: "Contacts", href: "/dashboard/contacts" },
    ],
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const item of navItems) {
      if (item.kind === "group") {
        initial[item.label] = item.children.some((child) => pathname.startsWith(child.href));
      }
    }
    return initial;
  });

  const onLogout = () => {
    clearToken();
    router.push("/login");
  };

  const linkClasses = (active: boolean) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
    }`;

  const sidebarContent = (
    <>
      <p className="px-2 font-bold text-slate-900">AXON Admin</p>
      <nav className="mt-6 flex flex-col gap-1">
        {navItems.map((item) => {
          if (item.kind === "link") {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={linkClasses(active)}>
                {item.label}
              </Link>
            );
          }

          const isOpen = openGroups[item.label] ?? false;
          return (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => setOpenGroups((prev) => ({ ...prev, [item.label]: !prev[item.label] }))}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                {item.label}
                <ChevronIcon open={isOpen} />
              </button>
              {isOpen && (
                <div className="mt-1 flex flex-col gap-1 border-l border-slate-200 pl-3">
                  {item.children.map((child) => {
                    const active = pathname.startsWith(child.href);
                    return (
                      <Link key={child.href} href={child.href} onClick={() => setMenuOpen(false)} className={linkClasses(active)}>
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={onLogout}
        className="mt-8 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-500 hover:bg-slate-100"
      >
        Sign out
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <p className="font-bold text-slate-900">AXON Admin</p>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile drawer + backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white p-4 shadow-xl">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white p-4 lg:block">
        {sidebarContent}
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
