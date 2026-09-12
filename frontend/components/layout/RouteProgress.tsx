"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * App Router gives us no "navigation started" event, so this infers it from
 * clicks on internal links and clears on the next pathname change — enough to
 * show the user that a click registered instead of the nav appearing frozen.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      setLoading(true);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] overflow-hidden bg-light-blue/60"
    >
      <div className="h-full w-1/3 animate-route-progress rounded-full bg-gradient-to-r from-primary via-teal to-primary" />
    </div>
  );
}
