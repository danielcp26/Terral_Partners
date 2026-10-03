"use client";
/** Adapted from Kokonut UI Toolbar, MIT © 2025 kokonutUI / Dorian Baffier.
 * Source: https://kokonutui.com/r/toolbar.json
 * Retains animated selected-item expansion, adapted to accessible category tabs.
 * Removes demo actions/notifications; adds roving focus and reduced-motion support. */
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Wind, Armchair, Sun, ArrowUpRight } from "lucide-react";
const icons = [Wind, Armchair, Sun];
export default function CategoryTabs({
  items,
  selected,
  onSelect,
  label,
  id,
}: {
  items: string[];
  selected: number;
  onSelect: (index: number) => void;
  label: string;
  id: string;
}) {
  const reduce = useReducedMotion();
  const transition = {
    type: "spring" as const,
    bounce: 0,
    duration: reduce ? 0 : 0.4,
  };
  return (
    <div className="category-tabs" role="tablist" aria-label={label}>
      {items.map((title, index) => {
        const Icon = icons[index];
        return (
          <motion.button
            key={title}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            className="category-tab"
            initial={false}
            animate={{
              backgroundColor: selected === index ? "#173447" : "#f7f5f0",
              color: selected === index ? "#f7f5f0" : "#173447",
            }}
            transition={transition}
            onClick={() => onSelect(index)}
            onKeyDown={(e) => {
              let next = index;
              if (e.key === "ArrowRight") next = (index + 1) % items.length;
              else if (e.key === "ArrowLeft")
                next = (index + items.length - 1) % items.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = items.length - 1;
              else return;
              e.preventDefault();
              onSelect(next);
              document.getElementById(`${id}-tab-${next}`)?.focus();
            }}
          >
            <Icon size={22} strokeWidth={1.3} aria-hidden="true" />
            <span>{title}</span>
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  className="tab-direction"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 20, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={transition}
                >
                  <ArrowUpRight size={18} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
