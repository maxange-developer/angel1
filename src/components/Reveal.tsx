'use client';

import { useEffect, useRef, useState, ReactNode, ElementType, CSSProperties } from 'react';

type RevealVariant =
  | 'fade-up'
  | 'fade-up-sm'
  | 'pull-quote'
  | 'stagger';

interface RevealProps {
  as?: ElementType;
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
  staggerBase?: number;
  threshold?: number;
  once?: boolean;
  children?: ReactNode;
}

export default function Reveal({
  as: Tag = 'div',
  variant = 'fade-up',
  className = '',
  style,
  staggerBase = 100,
  threshold = 0.12,
  once = true,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  const variantClass =
    variant === 'fade-up'      ? 'reveal-fade-up'      :
    variant === 'fade-up-sm'   ? 'reveal-fade-up-sm'   :
    variant === 'pull-quote'   ? 'reveal-pull-quote'   :
    variant === 'stagger'      ? 'stagger'             :
    'reveal';

  const mergedStyle: CSSProperties = {
    ...(variant === 'stagger' && { ['--stagger-base' as string]: `${staggerBase}ms` }),
    ...style,
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`${variantClass}${inView ? ' in-view' : ''} ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
}
