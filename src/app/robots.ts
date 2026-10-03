import type { MetadataRoute } from "next";
import { business } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(business.legalApproved && business.siteUrl
        ? { allow: "/", disallow: ["/api/", "/*/inquiry/"] }
        : { disallow: "/" }),
    },
    ...(business.siteUrl ? { sitemap: `${business.siteUrl}/sitemap.xml` } : {}),
  };
}
