import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Wordmark } from "./site-header";
import { content } from "@/lib/content";
import { sections, type Locale } from "@/lib/config";
export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Wordmark locale={locale} />
          <p className="footer-descriptor">{t.footer.descriptor}</p>
        </div>
        <div>
          <p className="eyebrow">{t.footer.navigation}</p>
          {sections.map((id, i) => (
            <Link key={id} href={`/${locale}#${id}`}>
              {t.nav[i]}
            </Link>
          ))}
        </div>
        <div>
          <p className="eyebrow">{t.footer.explore}</p>
          <Link href={`/${locale}/inquiry/buyer`}>
            {t.buyerCta}
            <ArrowUpRight size={14} />
          </Link>
          <Link href={`/${locale}/inquiry/supplier`}>
            {t.supplierCta}
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div>
          <p className="eyebrow">{t.footer.location}</p>
          <p className="location">
            <MapPin size={16} aria-hidden="true" />
            Guanacaste, Costa Rica
          </p>
          <div className="footer-languages">
            <Link href="/es" lang="es">
              Español
            </Link>
            <span>/</span>
            <Link href="/en" lang="en">
              English
            </Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Terral Partners. {t.footer.rights}
        </span>
        <div>
          <Link href={`/${locale}/privacy`}>{t.footer.privacy}</Link>
          <Link href={`/${locale}/terms`}>{t.footer.terms}</Link>
        </div>
      </div>
      <p className="container image-note">
        {t.footer.illustrative}{" "}
        {locale === "es"
          ? "Video de portada generado con IA, inspirado en Guanacaste."
          : "AI-generated hero film inspired by Guanacaste."}
      </p>
    </footer>
  );
}
