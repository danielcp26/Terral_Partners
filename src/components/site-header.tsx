"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { content } from "@/lib/content";
import { sections, type Locale } from "@/lib/config";
export function Wordmark({ locale }: { locale: Locale }) {
  return (
    <Link
      className="wordmark"
      href={`/${locale}`}
      aria-label={content[locale].home}
    >
      <span className="brand-logo">
        <Image
          src="/images/terral-logo-original.jpg"
          alt="Terral Partners"
          width={1254}
          height={1254}
          sizes="280px"
          quality={90}
          priority
        />
      </span>
    </Link>
  );
}
export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = content[locale];
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function close(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Wordmark locale={locale} />
        <nav className="desktop-nav" aria-label={t.footer.navigation}>
          {sections.map((id, i) => (
            <Link key={id} href={`/${locale}#${id}`}>
              {t.nav[i]}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <nav className="language-switch" aria-label={t.language}>
            {(["es", "en"] as Locale[]).map((l) => (
              <Link
                key={l}
                lang={l}
                href={path.replace(/^\/(es|en)/, `/${l}`)}
                aria-current={l === locale ? "page" : undefined}
                aria-label={
                  l === "es" ? "Cambiar a español" : "Switch to English"
                }
                onClick={(e) => {
                  e.preventDefault();
                  router.push(
                    `${path.replace(/^\/(es|en)/, `/${l}`)}${window.location.search}${window.location.hash}`,
                  );
                }}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
          <Link className="header-cta" href={`/${locale}#contact`}>
            {t.inquiry}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            className="menu-toggle"
            ref={toggle}
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label={t.footer.navigation}
        >
          {sections.map((id, i) => (
            <Link
              key={id}
              href={`/${locale}#${id}`}
              onClick={() => setOpen(false)}
            >
              {t.nav[i]}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ))}
          <Link
            href={`/${locale}/inquiry/buyer`}
            onClick={() => setOpen(false)}
          >
            {t.buyerCta}
          </Link>
        </nav>
      )}
    </header>
  );
}
