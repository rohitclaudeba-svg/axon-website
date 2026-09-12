import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const trail = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <JsonLd data={breadcrumbSchema(trail)} />
      <ol className={cn("flex flex-wrap items-center gap-1.5", light ? "text-white/70" : "text-navy/60")}>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span className={cn("font-medium", light ? "text-white" : "text-navy")} aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className={cn("transition-colors", light ? "hover:text-white" : "hover:text-primary")}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
