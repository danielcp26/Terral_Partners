import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { legal } from "@/lib/legal";
import { formCopy } from "@/lib/inquiry";
import type { Locale } from "@/lib/config";
export default function LegalPage({
  locale,
  type,
}: {
  locale: Locale;
  type: "privacy" | "terms";
}) {
  const t = legal[locale];
  return (
    <main id="main" className="container legal-page">
      <Link className="breadcrumb" href={`/${locale}`}>
        <ArrowLeft size={14} aria-hidden="true" />
        {formCopy[locale].home}
      </Link>
      <p className="eyebrow">TERRAL PARTNERS</p>
      <h1>{t[type].title}</h1>
      <p className="legal-notice">{t.notice}</p>
      {t[type].sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          <p>{s.body}</p>
        </section>
      ))}
    </main>
  );
}
