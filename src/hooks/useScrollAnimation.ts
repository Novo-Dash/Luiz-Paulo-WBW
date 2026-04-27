import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';

type AnimControls = ReturnType<typeof useAnimation>;

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  controls: AnimControls;
}

export function useScrollAnimation(threshold = 0.15): UseScrollAnimationReturn {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls };
}
