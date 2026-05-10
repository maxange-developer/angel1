import { ReactNode } from "react";
import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SECTION_REVEAL } from "@/lib/motion";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  delay?: number;
  as?: "section" | "div" | "article" | "aside";
}

export function MotionSection({
  children,
  className,
  style,
  variants = SECTION_REVEAL,
  delay = 0,
  as = "section",
}: MotionSectionProps) {
  const prefersReduced = useReducedMotion();
  const Tag = as;

  if (prefersReduced) {
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
