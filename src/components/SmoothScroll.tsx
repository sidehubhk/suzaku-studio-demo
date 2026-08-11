import { useEffect } from "react";
import Lenis from "lenis";

const HEADER_OFFSET = -88;

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.1,
      anchors: false,
    });
    window.__suzakuLenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const scrollToHash = (hash: string, updateHistory = true) => {
      if (!hash || hash === "#") {
        lenis.scrollTo(0, { offset: 0, duration: 1.25 });
        return;
      }
      const el = document.querySelector(hash);
      if (!(el instanceof HTMLElement)) return;
      lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.25 });
      if (updateHistory) {
        history.pushState(null, "", hash);
      }
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const onHome = window.location.pathname === "/" || window.location.pathname === "";

      // Logo / home while already on landing → ease to top
      if ((href === "/" || href === "/#top" || href === "#top") && onHome) {
        e.preventDefault();
        scrollToHash("#top");
        return;
      }

      let hash: string | null = null;
      if (href.startsWith("#")) {
        hash = href;
      } else if (href.startsWith("/#") && onHome) {
        hash = href.slice(1);
      }

      if (!hash) return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      scrollToHash(hash);
    };

    document.addEventListener("click", onClick);

    // Honor hash on load (e.g. shared /#games link)
    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash, false));
    }

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      if (window.__suzakuLenis === lenis) delete window.__suzakuLenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
