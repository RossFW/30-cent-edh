"use client";
import { useEffect, useRef } from "react";

/** Fires `onVisible` whenever the bottom sentinel scrolls into view —
 * used to extend the rendered window for endless scroll. */
export function InfiniteSentinel({ onVisible }: { onVisible: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) onVisible();
      },
      { rootMargin: "600px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onVisible]);
  return <div ref={ref} className="h-4 w-full" aria-hidden />;
}
