import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { business, isLocale, locales } from "@/lib/config";
import { content } from "@/lib/content";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { MotionProvider } from "@/components/interactive";
import "../globals.css";
import "../coastal.css";
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = content[locale];
  return {
    metadataBase: business.siteUrl ? new URL(business.siteUrl) : undefined,
    title: { default: t.meta.title, template: "%s | Terral Partners" },
    description: t.meta.description,
    robots: {
      index: business.legalApproved && !!business.siteUrl,
      follow: business.legalApproved && !!business.siteUrl,
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "es" ? "es_CR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_CR",
      type: "website",
      siteName: business.name,
    },
    twitter: { card: "summary_large_image" },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body className={`${serif.variable} ${sans.variable}`}>
        <MotionProvider>
          <a className="skip-link" href="#main">
            {content[locale].skip}
          </a>
          <SiteHeader locale={locale} />
          {children}
          <SiteFooter locale={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
