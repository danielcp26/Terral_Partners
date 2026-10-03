export const business = {
  name: "Terral Partners",
  coverage: "Guanacaste, Costa Rica",
  logo: "/images/terral-logo-original.jpg",
  email: null as string | null,
  phone: null as string | null,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
  legalApproved: process.env.LEGAL_APPROVED === "true",
};
export const locales = ["es", "en"] as const;
export const sections = ["buyers", "suppliers", "process", "about", "contact"];
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
