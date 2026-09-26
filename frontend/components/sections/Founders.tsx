"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { cn } from "@/lib/cn";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

interface FounderItem {
  id: number;
  name: string;
  credentials: string | null;
  role: string;
  bioParagraphs: string[];
  photo: string | null;
}

const accents = [{ badge: "bg-primary text-white" }, { badge: "bg-teal text-white" }];

export function Founders({ variant = "compact" }: { variant?: "compact" | "detailed" }) {
  const [founders, setFounders] = useState<FounderItem[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/founders`)
      .then((res) => res.json())
      .then((json: { ok: boolean; data: FounderItem[] }) => {
        if (json.ok) setFounders(json.data);
      })
      .catch(() => {
        // Backend unreachable — the section just stays empty.
      });
  }, []);

  return (
    <StaggerGroup className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      {founders.map((founder, index) => {
        const accent = accents[index % accents.length];

        return (
          <StaggerItem key={founder.id}>
            <div className="group relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-navy/20">
                {founder.photo && (
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                {variant === "compact" && (
                  <>
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                      <div className="flex flex-col items-start gap-1.5">
                        <h3 className="text-2xl font-bold text-white sm:text-3xl">{founder.name}</h3>
                        {founder.credentials && (
                          <p className="text-sm font-medium text-white/75 sm:text-base">{founder.credentials}</p>
                        )}
                        <span
                          className={cn(
                            "inline-block rounded-full px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-wide",
                            accent.badge
                          )}
                        >
                          {founder.role}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {variant === "detailed" && (
                <div className="mt-6">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <h3 className="text-2xl font-bold text-navy sm:text-3xl lg:whitespace-nowrap lg:text-xl xl:text-2xl">
                      {founder.name}
                      {founder.credentials && (
                        <span className="ml-2 text-base font-medium text-navy/60 lg:text-sm xl:text-base">
                          {founder.credentials}
                        </span>
                      )}
                    </h3>
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-wide",
                        accent.badge
                      )}
                    >
                      {founder.role}
                    </span>
                  </div>
                  <div className="mt-3 space-y-3 text-navy/70">
                    {founder.bioParagraphs.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
