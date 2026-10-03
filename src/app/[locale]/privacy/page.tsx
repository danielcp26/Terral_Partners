import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config";
import { legal } from "@/lib/legal";
import LegalPage from "@/components/legal-page";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return isLocale(locale) ? { title: legal[locale].privacy.title } : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage locale={locale} type="privacy" />;
}
