import type { MetadataRoute } from "next";
import { business } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!business.siteUrl || !business.legalApproved) return [];
  return ["es", "en"].flatMap((locale) =>
    ["", "/privacy", "/terms"].map((path) => ({
      url: `${business.siteUrl}/${locale}${path}`,
      alternates: {
        languages: {
          es: `${business.siteUrl}/es${path}`,
          en: `${business.siteUrl}/en${path}`,
        },
      },
    })),
  );
}
