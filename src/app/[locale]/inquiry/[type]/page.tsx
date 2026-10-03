import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isLocale, business } from "@/lib/config";
import { content } from "@/lib/content";
import { formCopy } from "@/lib/inquiry";
import InquiryForm from "@/components/inquiry-form";
export const dynamic = "force-dynamic";
type Props = {
  params: Promise<{ locale: string; type: string }>;
  searchParams: Promise<{ category?: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { locale, type } = await params;
  if (!isLocale(locale)) return {};
  return {
    title:
      type === "buyer" ? content[locale].buyerCta : content[locale].supplierCta,
    robots: { index: false, follow: false },
  };
}
export default async function InquiryPage({ params, searchParams }: Props) {
  const { locale, type } = await params;
  if (!isLocale(locale) || (type !== "buyer" && type !== "supplier"))
    notFound();
  const t = formCopy[locale];
  const category = (await searchParams).category;
  const enabled =
    !!process.env.INQUIRY_WEBHOOK_URL &&
    !!process.env.INQUIRY_WEBHOOK_TOKEN &&
    business.legalApproved;
  return (
    <main id="main" className="container inquiry-page">
      <Link className="breadcrumb" href={`/${locale}`}>
        <ArrowLeft size={14} aria-hidden="true" />
        {t.home}
      </Link>
      <div className="inquiry-grid">
        <div className="inquiry-intro">
          <p className="eyebrow">
            {type === "buyer"
              ? content[locale].audiences.buyer.label
              : content[locale].audiences.supplier.label}
          </p>
          <h1 style={{ whiteSpace: "pre-line" }}>
            {type === "buyer" ? t.buyerTitle : t.supplierTitle}
          </h1>
          <p>{type === "buyer" ? t.buyerIntro : t.supplierIntro}</p>
          <div className="next-panel">
            <h2>{t.nextTitle}</h2>
            <p>{type === "buyer" ? t.buyerNext : t.supplierNext}</p>
          </div>
        </div>
        <InquiryForm
          key={`${locale}-${type}`}
          locale={locale}
          type={type}
          enabled={enabled}
          initialCategory={category}
        />
      </div>
    </main>
  );
}
