import { useEffect } from 'react';

const MILESTONES = [25, 50, 75, 90];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function useScrollDepth() {
  useEffect(() => {
    const fired = new Set<number>();

    function onScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      for (const m of MILESTONES) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          window.gtag?.('event', 'scroll_depth', { depth: m });
          window.fbq?.('trackCustom', 'ScrollDepth', { depth: m });
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
