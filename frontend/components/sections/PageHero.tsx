import type { ReactNode } from "react";
import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/AnimatedReveal";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  eyebrowClassName,
  title,
  description,
  breadcrumbs,
  image,
  mobileImage,
  hideContent = false,
  children,
}: {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  image?: { src: string; alt: string; focal?: string };
  /** Shown instead of `image` below the `sm` breakpoint — admin-managed banners can supply a separate crop for phone screens. */
  mobileImage?: { src: string; alt: string; focal?: string };
  /** Hides the overlaid breadcrumbs/eyebrow/title/description — for a banner image that already carries its own text. */
  hideContent?: boolean;
  children?: ReactNode;
}) {
  if (image) {
    return (
      <section className="relative isolate flex min-h-[380px] items-end overflow-hidden pb-10 pt-14 sm:min-h-[440px] sm:pb-14 sm:pt-16 lg:min-h-[520px]">
        {mobileImage && (
          <Image
            src={mobileImage.src}
            alt={mobileImage.alt}
            fill
            priority
            sizes="100vw"
            style={mobileImage.focal ? { objectPosition: mobileImage.focal } : undefined}
            className="absolute inset-0 -z-10 object-cover sm:hidden"
          />
        )}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          style={image.focal ? { objectPosition: image.focal } : undefined}
          className={cn("absolute inset-0 -z-10 object-cover", mobileImage && "hidden sm:block")}
        />
        {!hideContent && (
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10"
            aria-hidden="true"
          />
        )}
        {!hideContent && (
          <Container className="relative">
            <Reveal>
              <Breadcrumbs items={breadcrumbs} light />
              <div className="mt-6 max-w-3xl">
                {eyebrow && (
                  <span
                    className={cn(
                      "mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide",
                      eyebrowClassName ?? "text-soft-green"
                    )}
                  >
                    {eyebrow}
                  </span>
                )}
                <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
                {description && <p className="mt-4 text-lg text-white/80">{description}</p>}
              </div>
            </Reveal>
            {children}
          </Container>
        )}
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-light-blue via-light-blue to-soft-green/25 pb-14 pt-10 sm:pb-20 sm:pt-14">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal/15 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 max-w-3xl">
            {eyebrow && (
              <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-primary">
                {eyebrow}
              </span>
            )}
            <h1 className="text-4xl font-bold text-navy sm:text-5xl">{title}</h1>
            {description && <p className="mt-4 text-lg text-navy/70">{description}</p>}
          </div>
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
