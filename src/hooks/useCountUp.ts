import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function useCountUp(target: number, duration = 1200) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setValue(target);
      return;
    }
    if (!ref.current || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let startTime: number | null = null;
          const tick = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(target * easeOut));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasStarted, prefersReduced]);

  return { ref, value };
}
