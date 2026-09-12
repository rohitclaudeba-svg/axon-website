import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-primary-dark text-white hover:brightness-110 shadow-sm shadow-primary/25 focus-visible:outline-primary",
  secondary:
    "bg-gradient-to-r from-teal to-primary text-white hover:brightness-110 shadow-sm shadow-teal/25 focus-visible:outline-teal",
  ghost:
    "bg-white text-navy border border-navy/15 hover:border-primary hover:text-primary focus-visible:outline-primary",
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], disabled && "opacity-60 pointer-events-none", className);

  if (href) {
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
