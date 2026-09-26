import Image from "next/image";
import { team } from "@/content/team";
import { media } from "@/content/media";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { cn } from "@/lib/cn";

const accents = [{ badge: "bg-primary text-white" }, { badge: "bg-teal text-white" }];

export function Founders({ variant = "compact" }: { variant?: "compact" | "detailed" }) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      {team.map((founder, index) => {
        const photo = media.teamImages[founder.slug as keyof typeof media.teamImages];
        const accent = accents[index % accents.length];

        return (
          <StaggerItem key={founder.slug}>
            <div className="group relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-navy/20">
                {photo && (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    style={{ objectPosition: photo.focal }}
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
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-3xl font-bold text-white sm:text-4xl">{founder.name}</h3>
                        <span
                          className={cn(
                            "inline-block rounded-full px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-wide",
                            accent.badge
                          )}
                        >
                          {founder.role}
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-base text-white/80">{founder.bio[0]}</p>
                    </div>
                  </>
                )}
              </div>

              {variant === "detailed" && (
                <div className="mt-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-2xl font-bold text-navy sm:text-3xl">{founder.name}</h3>
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
                    {founder.bio.map((paragraph, i) => (
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
