"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { NavDropdown, type NavDropdownItem } from "./NavDropdown";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/lib/icons";
import { primaryNav } from "@/content/nav";
import { services } from "@/content/services";
import { programs } from "@/content/programs";
import { cn } from "@/lib/cn";

const serviceItems: NavDropdownItem[] = services.map((service) => ({
  label: service.name,
  href: `/services/${service.slug}`,
  icon: service.icon,
}));

const programItems: NavDropdownItem[] = programs.map((program) => ({
  label: program.name,
  href: `/rehabilitation/${program.slug}`,
  icon: program.icon,
}));

const dropdownItemsByHref: Record<string, NavDropdownItem[]> = {
  "/services": serviceItems,
  "/rehabilitation": programItems,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-navy transition-all duration-300",
          scrolled && "shadow-lg shadow-navy/20"
        )}
      >
        <Container>
          <div className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "py-2" : "py-2.5")}>
            <Logo variant="dark" />

            <div className="ml-auto hidden items-center gap-6 xl:flex">
              <nav aria-label="Primary" className="flex items-center gap-5">
                {primaryNav.map((link) => {
                  const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  const dropdownItems = dropdownItemsByHref[link.href];

                  if (dropdownItems) {
                    return <NavDropdown key={link.href} label={link.label} items={dropdownItems} active={active} light />;
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "group relative font-heading text-sm font-medium transition-colors duration-300 hover:text-white",
                        active ? "text-white" : "text-white/80"
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-teal transition-transform duration-300 ease-out group-hover:scale-x-100",
                          active && "scale-x-100"
                        )}
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </nav>

              <Button href="/book-appointment" variant="ghost">
                Book an Appointment
              </Button>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 xl:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-white/10 bg-navy xl:hidden"
            >
              <Container className="flex flex-col gap-1 py-6">
                {primaryNav.map((link) => {
                  const dropdownItems = dropdownItemsByHref[link.href];
                  const isExpanded = expandedMobile === link.href;

                  if (dropdownItems) {
                    return (
                      <div key={link.href}>
                        <button
                          type="button"
                          onClick={() => setExpandedMobile(isExpanded ? null : link.href)}
                          aria-expanded={isExpanded}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-heading text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {link.label}
                          <ChevronDown
                            className={cn("h-4 w-4 transition-transform duration-300", isExpanded && "rotate-180")}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-3"
                            >
                              {dropdownItems.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-teal">
                                    <Icon name={item.icon} className="h-3.5 w-3.5" />
                                  </span>
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-3 py-3 font-heading text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-4">
                  <Button href="/book-appointment" variant="ghost" className="w-full">
                    Book an Appointment
                  </Button>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Reserves the header's height in normal flow now that it's position: fixed. */}
      <div className="h-[68px] sm:h-[72px] xl:h-[76px]" aria-hidden="true" />
    </>
  );
}
