"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentType, ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "ol" | "ul";
};

export function FadeUp({ children, delay = 0, className, as = "div" }: FadeUpProps) {
  const reduce = useReducedMotion();
  // The motion component is polymorphic; TypeScript's per-element prop typing
  // doesn't reduce cleanly across the union, so cast to a loose component type
  // at the use site. The runtime behaviour is identical.
  const Component = motion[as] as unknown as ComponentType<Record<string, unknown>>;

  if (reduce) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Component>
  );
}
