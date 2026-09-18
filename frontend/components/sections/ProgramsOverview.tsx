import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/lib/icons";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { cn } from "@/lib/cn";
import type { ProgramEntry } from "@/content/types";

const cardTones = [
  "from-light-blue to-white",
  "from-soft-green/25 to-white",
  "from-teal/15 to-white",
  "from-primary/10 to-white",
];

export function ProgramsOverview({ programs }: { programs: ProgramEntry[] }) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {programs.map((program, index) => (
        <StaggerItem key={program.slug} className="h-full">
          <Link
            href={`/rehabilitation/${program.slug}`}
            className={cn(
              "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-gradient-to-br p-7 shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 sm:p-8",
              cardTones[index % cardTones.length]
            )}
          >
            <Icon
              name={program.icon}
              className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-navy/5 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
            />

            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
              <Icon name={program.icon} className="h-7 w-7" />
            </span>

            <h3 className="relative mt-6 font-heading text-xl font-bold text-navy">{program.name}</h3>
            <p className="relative mt-2.5 flex-1 text-sm text-navy/65">{program.shortDescription}</p>

            <span className="relative mt-6 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
