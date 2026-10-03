import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  Hotel,
  HardHat,
  KeyRound,
  Handshake,
  Check,
  MapPin,
  MoveUpRight,
} from "lucide-react";
import { notFound } from "next/navigation";
import { isLocale, business } from "@/lib/config";
import { content } from "@/lib/content";
import Button from "@/components/kokonutui/slide-text-button";
import { FAQ, Reveal, HeroStage } from "@/components/interactive";
import {
  CategoryExplorer,
  ProcessExplorer,
} from "@/components/project-explorer";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    alternates: business.siteUrl
      ? {
          canonical: `/${locale}`,
          languages: { es: "/es", en: "/en", "x-default": "/es" },
        }
      : undefined,
  };
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = content[locale];
  const buyer = `/${locale}/inquiry/buyer`;
  const supplier = `/${locale}/inquiry/supplier`;
  const sectorIcons = [Building2, HardHat, Hotel, KeyRound, Handshake];
  return (
    <main id="main">
      <HeroStage>
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-line" />
            {t.hero.eyebrow}
          </p>
          <h1>
            {t.hero.title}
            <em>{t.hero.accent}</em>
          </h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-buttons">
            <Button href={buyer} text={t.buyerCta} />
            <Button href={supplier} text={t.supplierCta} variant="outline" />
          </div>
          <p className="hero-footnote">
            <MapPin size={14} aria-hidden="true" />
            {t.hero.footnote}
          </p>
        </div>
        <div className="hero-visual">
          <Image
            src="/images/guanacaste-coast.jpg"
            alt={t.hero.imageAlt}
            fill
            sizes="(max-width: 760px) 100vw, 52vw"
            priority
            quality={85}
            className="hero-photo"
          />
          <div className="image-label">
            <span className="location-dot" />
            GUANACASTE, COSTA RICA
          </div>
          <div className="hero-image-caption">
            <span>{t.hero.caption}</span>
            <MoveUpRight size={32} strokeWidth={1} aria-hidden="true" />
          </div>
          <div className="image-corner" />
        </div>
      </HeroStage>
      <div className="container hero-bottom">
        <span>01 — TERRAL PARTNERS</span>
        <Link href="#buyers">
          {t.hero.explore}
          <ArrowDown size={15} aria-hidden="true" />
        </Link>
        <span className="hero-bottom-end">
          {locale === "es"
            ? "PROVEEDORES · CONEXIONES · POSIBILIDADES"
            : "SOURCING · CONNECTIONS · POSSIBILITIES"}
        </span>
      </div>
      <section className="sectors">
        <div className="container">
          <p className="eyebrow">{t.sectors.label}</p>
          <div className="sector-grid">
            {t.sectors.items.map((name, i) => {
              const Icon = sectorIcons[i];
              return (
                <div key={name}>
                  <Icon size={25} strokeWidth={1.25} aria-hidden="true" />
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="buyers" className="section container">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.audiences.label}</p>
              <h2>{t.audiences.title}</h2>
            </div>
            <p>{t.audiences.intro}</p>
          </div>
          <div className="audience-grid">
            {[t.audiences.buyer, t.audiences.supplier].map((audience, i) => (
              <article
                className={`audience-card ${i === 1 ? "sand-card" : ""}`}
                key={audience.label}
              >
                <div className="card-top">
                  <p className="eyebrow">{audience.label}</p>
                  {i === 0 ? (
                    <Building2 strokeWidth={1.1} size={29} aria-hidden="true" />
                  ) : (
                    <Handshake strokeWidth={1.1} size={29} aria-hidden="true" />
                  )}
                </div>
                <h3>{audience.title}</h3>
                <ul>
                  {audience.items.map((item) => (
                    <li key={item}>
                      <Check size={15} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={i === 0 ? buyer : supplier} className="text-link">
                  {i === 0 ? t.buyerCta : t.supplierCta}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="categories section" id="categories">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.categories.label}</p>
                <h2>{t.categories.title}</h2>
              </div>
              <p>{t.categories.intro}</p>
            </div>
            <CategoryExplorer items={t.categories.items} locale={locale} />
            <div className="category-note">
              <p>{t.categories.note}</p>
              <Link className="text-link" href={buyer}>
                {t.categories.other}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <section id="process" className="process section">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.process.label}</p>
                <h2>{t.process.title}</h2>
              </div>
              <p>{t.process.intro}</p>
            </div>
            <ProcessExplorer steps={t.process.steps} locale={locale} />
            <p className="process-note">
              <Handshake size={24} strokeWidth={1.2} aria-hidden="true" />
              {t.process.note}
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section container why">
        <Reveal className="why-grid">
          <div>
            <p className="eyebrow">{t.why.label}</p>
            <h2>{t.why.title}</h2>
            <p className="section-description">{t.why.description}</p>
            <div className="connection-art" aria-hidden="true">
              <span />
              <span />
              <div>t.</div>
            </div>
          </div>
          <div className="why-items">
            {t.why.items.map((item, i) => (
              <div key={item.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
      <section id="suppliers" className="partnership">
        <div className="partnership-image">
          <Image
            src="/images/interior.jpg"
            alt={t.partnership.imageAlt}
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span className="partnership-image-label">
            TERRAL PARTNERS <span>—</span>{" "}
            {locale === "es"
              ? "POSIBILIDADES COMPARTIDAS"
              : "SHARED POSSIBILITIES"}
          </span>
        </div>
        <div className="partnership-copy">
          <Reveal>
            <p className="eyebrow">{t.partnership.label}</p>
            <h2>{t.partnership.title}</h2>
            <p>{t.partnership.description}</p>
            <ul>
              {t.partnership.items.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Button href={supplier} text={t.supplierCta} />
          </Reveal>
        </div>
      </section>
      <section id="about" className="section container about">
        <Reveal className="about-grid">
          <div>
            <p className="eyebrow">{t.about.label}</p>
            <h2>{t.about.title}</h2>
          </div>
          <div>
            {t.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="faq-section section">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t.faq.label}</p>
                <h2>{t.faq.title}</h2>
              </div>
            </div>
            <FAQ items={t.faq.items} />
          </Reveal>
        </div>
      </section>
      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">{t.contact.label}</p>
            <h2>{t.contact.title}</h2>
          </div>
          <div>
            <p>{t.contact.description}</p>
            <div className="contact-buttons">
              <Button href={buyer} text={t.buyerCta} variant="light" />
              <Button href={supplier} text={t.supplierCta} variant="outline" />
            </div>
            <p className="contact-next">{t.contact.next}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
