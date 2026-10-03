"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  categories,
  timelines,
  emptyValues,
  formCopy,
  validateInquiry,
  type FieldName,
  type InquiryType,
  type InquiryValues,
  type Errors,
} from "@/lib/inquiry";
import type { Locale } from "@/lib/config";
export default function InquiryForm({
  locale,
  type,
  enabled,
  initialCategory,
}: {
  locale: Locale;
  type: InquiryType;
  enabled: boolean;
  initialCategory?: string;
}) {
  const t = formCopy[locale];
  const reduce = useReducedMotion();
  const [values, setValues] = useState<InquiryValues>({
    ...emptyValues,
    category: categories.includes(
      initialCategory as (typeof categories)[number],
    )
      ? initialCategory!
      : "",
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const requestKey = useRef({ body: "", key: "" });
  const change = (key: FieldName, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setMessage("");
  };
  function focusErrors(next: Errors) {
    setErrors(next);
    setMessage(t.review);
    setTimeout(
      () => document.getElementById(Object.keys(next)[0])?.focus(),
      40,
    );
  }
  function go(next: number) {
    setStep(next);
    setMessage("");
    setTimeout(() => heading.current?.focus(), 40);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const next = validateInquiry(
      values,
      type,
      locale,
      step === 0 ? 0 : undefined,
    );
    if (Object.keys(next).length) {
      if (
        step === 1 &&
        ["name", "company", "email", "phone"].some((k) => k in next)
      )
        setStep(0);
      focusErrors(next);
      return;
    }
    if (step === 0) {
      setErrors({});
      go(1);
      return;
    }
    if (!enabled) {
      setMessage(t.unavailable);
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const body = JSON.stringify({ type, locale, values });
      if (requestKey.current.body !== body)
        requestKey.current = { body, key: crypto.randomUUID() };
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          locale,
          values,
          idempotencyKey: requestKey.current.key,
        }),
        signal: AbortSignal.timeout(18000),
      });
      const data = await response.json();
      if (!response.ok || data.accepted !== true || !data.reference) {
        if (data.errors) setErrors(data.errors);
        throw new Error();
      }
      setReceipt(data.reference);
      setValues({ ...emptyValues });
      setTimeout(() => document.getElementById("success-heading")?.focus(), 40);
    } catch {
      setMessage(t.failed);
    } finally {
      setBusy(false);
    }
  }
  const field = (
    name: FieldName,
    required = true,
    full = false,
    multiline = false,
  ) => {
    const opts =
      name === "category" ? categories : name === "timeline" ? timelines : null;
    const labels = name === "category" ? t.categoryOptions : t.timelineOptions;
    const common = {
      id: name,
      name,
      value: values[name],
      "aria-invalid": !!errors[name],
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
      "aria-required": required,
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => change(name, e.target.value),
    };
    return (
      <div key={name} className={`field ${full ? "full" : ""}`}>
        <label htmlFor={name}>
          {t.labels[name]}{" "}
          {required ? (
            <span aria-hidden="true">*</span>
          ) : (
            <span>({t.optional})</span>
          )}
        </label>
        {opts ? (
          <select {...common}>
            <option value="">{t.select}</option>
            {opts.map((o, i) => (
              <option key={o} value={o}>
                {labels[i]}
              </option>
            ))}
          </select>
        ) : multiline ? (
          <textarea {...common} maxLength={3000} rows={3} />
        ) : (
          <input
            {...common}
            maxLength={name === "email" ? 254 : 3000}
            type={
              name === "email"
                ? "email"
                : name === "phone"
                  ? "tel"
                  : name === "website"
                    ? "url"
                    : "text"
            }
            autoComplete={
              name === "name"
                ? "name"
                : name === "company"
                  ? "organization"
                  : name === "email"
                    ? "email"
                    : name === "phone"
                      ? "tel"
                      : "off"
            }
          />
        )}{" "}
        {errors[name] && (
          <span id={`${name}-error`} className="field-error">
            {errors[name]}
          </span>
        )}
      </div>
    );
  };
  if (receipt)
    return (
      <section className="success-panel" aria-label={t.received}>
        <CheckCircle2 size={38} strokeWidth={1.3} />
        <h2 id="success-heading" tabIndex={-1}>
          {t.successTitle}
        </h2>
        <p>{t.success}</p>
        <p>
          {t.receipt}: <strong>{receipt}</strong>
        </p>
        <Link className="text-link" href={`/${locale}`}>
          {t.home}
          <ArrowRight size={16} />
        </Link>
      </section>
    );
  return (
    <form
      className="inquiry-form"
      onSubmit={submit}
      noValidate
      aria-busy={busy}
    >
      {!enabled && <p className="availability-note">{t.unavailable}</p>}
      <div className="form-progress">
        {t.steps.map((s, i) => (
          <span key={s} aria-current={step === i ? "step" : undefined}>
            0{i + 1} — {s}
          </span>
        ))}
      </div>
      <motion.div
        key={step}
        initial={reduce ? false : { opacity: 0.7, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        <h2 ref={heading} tabIndex={-1}>
          {step === 0
            ? t.contactTitle
            : type === "buyer"
              ? t.projectTitle
              : t.supplierDetailsTitle}
        </h2>
        <p className="form-hint">
          {t.required} {step === 0 && type === "buyer" && t.contactHint}
        </p>
        <div className="form-fields">
          {step === 0 ? (
            <>
              {field("name")}
              {field("company")}
              {field("email", type === "supplier")}
              {field("phone", type === "supplier")}
            </>
          ) : type === "buyer" ? (
            <>
              {field("location", true, true)}
              {field("category")}
              {field("quantity")}
              {field("timeline")}
              {field("budget", false)}
              {field("details", false, true, true)}
            </>
          ) : (
            <>
              {field("category", true, true)}
              {field("coverage", true, true)}
              {field("capacity", true, true, true)}
              {field("support", true, true, true)}
              {field("website", false, true)}
              {field("details", false, true, true)}
            </>
          )}
        </div>
        {step === 1 && (
          <>
            <label className="consent">
              <input
                id="consent"
                type="checkbox"
                checked={values.consent}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                onChange={(e) => {
                  setValues((v) => ({ ...v, consent: e.target.checked }));
                  setErrors((v) => ({ ...v, consent: undefined }));
                }}
              />
              <span>
                {t.consent}{" "}
                <Link href={`/${locale}/privacy`} target="_blank">
                  {t.privacy}
                </Link>
                . *
              </span>
            </label>
            {errors.consent && (
              <p id="consent-error" className="field-error">
                {errors.consent}
              </p>
            )}
          </>
        )}
      </motion.div>
      <div className="honey" aria-hidden="true">
        <label htmlFor="honey">Leave empty</label>
        <input
          id="honey"
          tabIndex={-1}
          autoComplete="off"
          value={values.honey}
          onChange={(e) => setValues((v) => ({ ...v, honey: e.target.value }))}
        />
      </div>
      {message && (
        <p role="alert" className="form-message">
          {message}
        </p>
      )}
      <div className="form-actions">
        {step === 1 ? (
          <button
            type="button"
            className="back-button"
            disabled={busy}
            onClick={() => go(0)}
          >
            {t.back}
          </button>
        ) : (
          <span />
        )}
        <button className="form-submit" disabled={busy} type="submit">
          {busy ? t.sending : step === 0 ? t.continue : t.send}
          {busy ? (
            <LoaderCircle size={16} className="spinner" aria-hidden="true" />
          ) : (
            <ArrowRight size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </form>
  );
}
