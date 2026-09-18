import Image from "next/image";
import Link from "next/link";
import { nap } from "@/content/nap";

// Source artwork is a 416x196 crop of the real AXON logo — keep width/height
// in that ratio so next/image doesn't distort it.
const logo = (
  <Image
    src="/brand/axon-logo.png"
    alt={`${nap.brandName} logo`}
    width={416}
    height={196}
    priority
    className="h-9 w-auto sm:h-10 xl:h-11"
  />
);

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  if (variant === "dark") {
    // The logo's wordmark is dark navy, so it needs a light backing plate to
    // stay legible when placed on the dark navy footer.
    return (
      <Link href="/" className="inline-flex items-center rounded-lg bg-white p-1.5 shadow-sm" aria-label={`${nap.brandName} — Home`}>
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
