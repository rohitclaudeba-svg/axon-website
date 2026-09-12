import type { ReactNode } from "react";
import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/AnimatedReveal";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  image?: { src: string; alt: string; focal?: string };
  children?: ReactNode;
}) {
  if (image) {
    return (
      <section className="relative isolate flex min-h-[380px] items-end overflow-hidden pb-10 pt-14 sm:min-h-[440px] sm:pb-14 sm:pt-16 lg:min-h-[520px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          style={image.focal ? { objectPosition: image.focal } : undefined}
          className="absolute inset-0 -z-10 object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/95 via-navy/55 to-navy/10"
          aria-hidden="true"
        />
        <Container className="relative">
          <Reveal>
            <Breadcrumbs items={breadcrumbs} light />
            <div className="mt-6 max-w-3xl">
              {eyebrow && (
                <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-soft-green">
                  {eyebrow}
                </span>
              )}
              <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
              {description && <p className="mt-4 text-lg text-white/80">{description}</p>}
            </div>
          </Reveal>
          {children}
        </Container>
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
