import { useEffect, useState } from "react";

/**
 * Pick the section whose top has crossed a probe line under the fixed header.
 * More reliable than IntersectionObserver with Lenis + tall sections.
 */
export function useActiveSection(sectionIds: string[], fallback = "") {
  const [active, setActive] = useState(fallback || sectionIds[0] || "");

  useEffect(() => {
    const ids = sectionIds.filter((id) => document.getElementById(id));
    if (!ids.length) return;

    let frame = 0;

    const update = () => {
      const probe = Math.min(140, window.innerHeight * 0.28);
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= probe) current = id;
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Lenis / hash navigation may not always fire window scroll reliably
    const poll = window.setInterval(update, 200);

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(poll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds.join("|")]);

  return [active, setActive] as const;
}
