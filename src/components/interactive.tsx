"use client";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  useAnimate,
  stagger,
  useScroll,
  useSpring,
} from "motion/react";
import { useState, useEffect, type ReactNode } from "react";
import { Plus, Minus } from "lucide-react";
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="reading-progress"
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
export function HeroStage({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const text = animate(
      ".hero-copy > *",
      { opacity: [0, 1], y: [30, 0] },
      { duration: 0.65, delay: stagger(0.09), ease: [0.22, 1, 0.36, 1] },
    );
    const photo = animate(
      ".hero-photo",
      { scale: [1.12, 1] },
      { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
    );
    return () => {
      text.stop();
      photo.stop();
    };
  }, [animate, reduce]);
  return (
    <section ref={scope} className="hero container">
      {children}
    </section>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div className="faq-item" key={item.q}>
          <h3>
            <button
              type="button"
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              {open === i ? (
                <Minus size={18} aria-hidden="true" />
              ) : (
                <Plus size={18} aria-hidden="true" />
              )}
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                className="faq-answer"
              >
                <p>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
