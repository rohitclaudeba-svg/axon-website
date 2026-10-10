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
  image?: { src: string; alt: string };
  /** Shown instead of `image` below the `sm` breakpoint — admin-managed banners can supply a separate crop for phone screens. */
  mobileImage?: { src: string; alt: string };
  /** Hides the overlaid breadcrumbs/eyebrow/title/description — for a banner image that already carries its own text. */
  hideContent?: boolean;
  children?: ReactNode;
}) {
  if (image) {
    // ONE rule for every hero banner on the site, not special-cased per page or
    // section: a single fixed 480px box, full width, edge-to-edge, on every
    // screen size — and the image is always shown with `object-fill` (stretch,
    // never crop). A full-width box with a fixed height has a different shape
    // per device, so a static image can't fill it, show every pixel, AND never
    // distort, all at once; the chosen tradeoff is to never crop and never show
    // gaps, accepting some stretch distortion instead. `hideContent` only
    // toggles whether the title/breadcrumb text overlay renders on top — it has
    // no effect on sizing or image fit, which stay identical either way.
    // hideContent hides the title/breadcrumb text visually, but `title` is
    // still the only <h1> on most of these pages — keep it in the DOM for
    // SEO/screen readers, just not shown on the banner.
    const content = hideContent ? (
      <h1 className="sr-only">{title}</h1>
    ) : (
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
    );

    return (
      <>
        {mobileImage && (
          <div
            className={cn(
              "relative isolate flex min-h-[480px] overflow-hidden sm:hidden",
              !hideContent && "items-end pb-10 pt-14"
            )}
          >
            <Image src={mobileImage.src} alt={mobileImage.alt} fill priority sizes="100vw" className="absolute inset-0 -z-10 object-fill" />
            {!hideContent && (
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10" aria-hidden="true" />
            )}
            {content}
          </div>
        )}
        <div
          className={cn(
            "relative isolate flex min-h-[480px] overflow-hidden",
            !hideContent && "items-end pb-10 pt-14 sm:pb-14 sm:pt-16",
            mobileImage && "hidden sm:flex"
          )}
        >
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="absolute inset-0 -z-10 object-fill" />
          {!hideContent && (
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10" aria-hidden="true" />
          )}
          {content}
        </div>
      </>
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
