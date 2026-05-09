import type { Variants, Transition } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE } as Transition,
  },
};

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" } as Transition,
  },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    } as Transition,
  },
};

export const STAGGER_ITEM: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE } as Transition,
  },
};

export const HERO_TITLE: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE } as Transition,
  },
};

export const HERO_STAGGER: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    } as Transition,
  },
};

export const PULL_QUOTE: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0.6 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" } as Transition,
  },
};

export const PAGE_TRANSITION: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" } as Transition,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" } as Transition,
  },
};
