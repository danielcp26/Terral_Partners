"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  ClipboardList,
  Search,
  MessagesSquare,
  Handshake,
  Check,
} from "lucide-react";
import CategoryTabs from "./kokonutui/category-tabs";
import Button from "./kokonutui/slide-text-button";
import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/config";
const copy = {
  es: {
    choose: "Explore las categorías",
    needs: "Para empezar la conversación",
    categoryCta: "Hablar de esta necesidad",
    steps: "Explore cada paso",
    next: "Siguiente paso",
    previous: "Paso anterior",
    start: "Empezar mi proyecto",
    step: "Paso",
    of: "de",
    labels: ["Su proyecto", "Evaluación", "Conexión", "Acuerdo directo"],
    needsList: [
      [
        "Tipo de espacio y uso",
        "Capacidad y cantidades",
        "Instalación y soporte requerido",
      ],
      [
        "Tipo de espacio y equipamiento",
        "Cantidades y especificaciones",
        "Ubicación y plazo de entrega",
      ],
      [
        "Necesidad y consumo estimado",
        "Condiciones del sitio",
        "Cobertura y viabilidad del proyecto",
      ],
    ],
  },
  en: {
    choose: "Explore sourcing categories",
    needs: "To start the conversation",
    categoryCta: "Discuss this requirement",
    steps: "Explore each step",
    next: "Next step",
    previous: "Previous step",
    start: "Start my project",
    step: "Step",
    of: "of",
    labels: ["Your project", "Assessment", "Connection", "Direct agreement"],
    needsList: [
      [
        "Space type and intended use",
        "Capacity and quantities",
        "Installation and support requirements",
      ],
      [
        "Space and equipment needs",
        "Quantities and specifications",
        "Location and delivery timing",
      ],
      [
        "Energy needs and estimated consumption",
        "Site conditions",
        "Coverage and project feasibility",
      ],
    ],
  },
};
export function CategoryExplorer({
  items,
  locale,
}: {
  items: Content["categories"]["items"];
  locale: Locale;
}) {
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const t = copy[locale];
  const item = items[selected];
  return (
    <div className="category-explorer">
      {items.map((_, i) =>
        i !== selected ? (
          <div
            key={i}
            hidden
            role="tabpanel"
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
          />
        ) : null,
      )}
      <CategoryTabs
        items={items.map((i) => i.title)}
        selected={selected}
        onSelect={setSelected}
        label={t.choose}
        id={id}
      />
      <div
        className="category-detail"
        id={`${id}-panel-${selected}`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${selected}`}
        tabIndex={0}
      >
        <div className={`category-detail-image category-scene-${selected}`}>
          <AnimatePresence initial={false}>
            <motion.div
              key={selected}
              className="category-image-layer"
              initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.45 }}
            >
              <Image
                src={
                  [
                    "/images/architecture.jpg",
                    "/images/interior.jpg",
                    "/images/solar-energy.jpg",
                  ][selected]
                }
                alt=""
                fill
                sizes="(max-width:760px) 100vw, 45vw"
              />
            </motion.div>
          </AnimatePresence>
          <span className="category-image-tag">{item.tag}</span>
        </div>
        <motion.div
          key={selected}
          className="category-detail-copy"
          initial={reduce ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="eyebrow">{item.tag}</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p className="category-needs-label">{t.needs}</p>
          <ul>
            {t.needsList[selected].map((need) => (
              <li key={need}>
                <Check size={15} aria-hidden="true" />
                {need}
              </li>
            ))}
          </ul>
          <Button
            href={`/${locale}/inquiry/buyer?category=${["hvac", "furniture", "energy"][selected]}`}
            text={t.categoryCta}
          />
        </motion.div>
      </div>
      <noscript>
        <ul>
          {items.map((i) => (
            <li key={i.title}>
              {i.title}: {i.description}
            </li>
          ))}
        </ul>
      </noscript>
    </div>
  );
}
const processIcons = [ClipboardList, Search, MessagesSquare, Handshake];
export function ProcessExplorer({
  steps,
  locale,
}: {
  steps: Content["process"]["steps"];
  locale: Locale;
}) {
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const t = copy[locale];
  const Icon = processIcons[selected];
  return (
    <div className="process-explorer">
      {steps.map((_, i) =>
        i !== selected ? (
          <div
            key={i}
            hidden
            role="tabpanel"
            id={`${id}-detail-${i}`}
            aria-labelledby={`${id}-step-${i}`}
          />
        ) : null,
      )}
      <div
        className="process-selectors"
        role="tablist"
        aria-label={t.steps}
        aria-orientation="vertical"
      >
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            id={`${id}-step-${i}`}
            aria-selected={selected === i}
            aria-controls={`${id}-detail-${i}`}
            tabIndex={selected === i ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => {
              let next = i;
              if (e.key === "ArrowDown") next = (i + 1) % 4;
              else if (e.key === "ArrowUp") next = (i + 3) % 4;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = 3;
              else return;
              e.preventDefault();
              setSelected(next);
              document.getElementById(`${id}-step-${next}`)?.focus();
            }}
          >
            <span className="process-index">0{i + 1}</span>
            <span>{step.title}</span>
            <ArrowRight size={18} aria-hidden="true" />
            {selected === i && (
              <motion.span
                className="process-selected-line"
                layoutId={`${id}-active`}
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: reduce ? 0 : 0.4,
                }}
              />
            )}
          </button>
        ))}
      </div>
      <div
        className="process-detail"
        role="tabpanel"
        tabIndex={0}
        id={`${id}-detail-${selected}`}
        aria-labelledby={`${id}-step-${selected}`}
      >
        <div className="process-detail-top">
          <p className="eyebrow">
            {t.step} 0{selected + 1} {t.of} 04
          </p>
          <Icon size={29} strokeWidth={1.2} aria-hidden="true" />
        </div>
        <motion.div
          key={selected}
          className="process-step-content"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>{steps[selected].title}</h3>
          <p>{steps[selected].description}</p>
        </motion.div>
        <div className="process-route" aria-hidden="true">
          <svg viewBox="0 0 400 20" preserveAspectRatio="none">
            <path d="M 12 10 L 388 10" stroke="#49606c" strokeWidth="1" />
            <motion.path
              d="M 12 10 L 388 10"
              stroke="#c7ae86"
              strokeWidth="2"
              initial={false}
              animate={{ pathLength: selected / 3 }}
              transition={{ duration: reduce ? 0 : 0.5 }}
            />
          </svg>
          {t.labels.map((label, i) => (
            <div key={label} className={i <= selected ? "reached" : ""}>
              <span>{i < selected ? <Check size={12} /> : i + 1}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <div className="process-controls">
          <button
            type="button"
            disabled={selected === 0}
            aria-label={t.previous}
            onClick={() => setSelected(selected - 1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          {selected === 3 ? (
            <Button
              href={`/${locale}/inquiry/buyer`}
              text={t.start}
              variant="light"
            />
          ) : (
            <button
              className="process-next"
              type="button"
              onClick={() => setSelected(selected + 1)}
            >
              {t.next}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <noscript>
        <ol>
          {steps.map((s) => (
            <li key={s.title}>
              {s.title}: {s.description}
            </li>
          ))}
        </ol>
      </noscript>
    </div>
  );
}
