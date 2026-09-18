import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { nap } from "@/content/nap";

export function Logo({
  variant = "light",
  size = "default",
}: {
  variant?: "light" | "dark";
  size?: "default" | "compact";
}) {
  // Source artwork is a 416x196 crop of the real AXON logo — keep width/height
  // in that ratio so next/image doesn't distort it.
  const logo = (
    <Image
      src="/brand/axon-logo.png"
      alt={`${nap.brandName} logo`}
      width={416}
      height={196}
      priority
      className={cn("w-auto", size === "compact" ? "h-7 sm:h-8 xl:h-11" : "h-9 sm:h-10 xl:h-11")}
    />
  );

  if (variant === "dark") {
    // The logo's wordmark is dark navy, so it needs a light backing plate to
    // stay legible when placed on the dark navy footer.
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center rounded-lg bg-white shadow-sm", size === "compact" ? "p-1" : "p-1.5")}
        aria-label={`${nap.brandName} — Home`}
      >
        {logo}
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center" aria-label={`${nap.brandName} — Home`}>
      {logo}
    </Link>
  );
}
