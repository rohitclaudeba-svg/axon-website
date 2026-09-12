import Image from "next/image";
import Link from "next/link";
import { nap } from "@/content/nap";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const src = variant === "dark" ? "/brand/axon-logo-dark.svg" : "/brand/axon-logo.svg";

  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${nap.brandName} — Home`}>
      <Image src={src} alt={`${nap.brandName} logo`} width={230} height={48} priority className="h-11 w-auto sm:h-12 xl:h-14" />
    </Link>
  );
}
