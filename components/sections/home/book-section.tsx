import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Waves } from "lucide-react";

import { SectionIntro } from "@/components/section/shared/section-intro";
import { bookContent } from "@/lib/content/home";

export function BookSection() {
  return (
    <section id="book" className="book section-shell" data-screen-label="Book">
      <div className="book-cover">
        <div className="book-showcase">
          <div className="book-showcase__meta" aria-hidden="true">
            <span>Water Method</span>
            <span>Signed edition</span>
          </div>

          <div className="book-3d">
            <div className="book-glow" aria-hidden="true" />
            <div className="book-spine" aria-hidden="true" />
            <div className="book-front book-front-img">
              <Image
                src={bookContent.image.src}
                alt={bookContent.image.alt}
                fill
                sizes="(max-width: 720px) 180px, (max-width: 1100px) 260px, 320px"
                className="book-front__image"
              />
            </div>
          </div>

          <div className="book-showcase__footer">
            <span>
              <Waves size={15} strokeWidth={2.4} aria-hidden="true" />
              Pool-ready
            </span>
            <span>
              <BookOpen size={15} strokeWidth={2.4} aria-hidden="true" />
              Print + digital
            </span>
          </div>
        </div>
      </div>

      <div className="book-content">
        <SectionIntro
          eyebrow={bookContent.eyebrow}
          title={bookContent.title}
          accent={bookContent.accent}
          description={bookContent.description}
          className="book-content__intro"
        />

        <div className="book-stats" aria-label="Book highlights">
          {bookContent.stats.map((stat) => (
            <span key={stat}>{stat}</span>
          ))}
        </div>

        <div className="price-row">
          <span className="price-row__now">{bookContent.price}</span>
          <span className="price-row__was">{bookContent.compareAtPrice}</span>
          <span className="price-row__offer">{bookContent.offer}</span>
        </div>

        <ul className="book-features">
          {bookContent.features.map((feature) => (
            <li key={feature}>
              <Check size={14} strokeWidth={3} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="book-detail-stack" aria-label="Inside the book">
          {bookContent.details.map((detail, index) => (
            <article className="book-detail" key={detail.title}>
              <span className="book-detail__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{detail.title}</h3>
                <p>{detail.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="cta-row">
          {/* [PLACEHOLDER] Book CTAs are visual-only. [TODO] Wire checkout, eBook download, and bulk trainer inquiry. */}
          {bookContent.ctas.map((cta) => (
            <Link
              key={cta.label}
              href={cta.href}
              className={cta.variant === "ghost" ? "btn-ghost" : "btn-primary"}
            >
              {cta.label}
              {cta.variant !== "ghost" ? (
                <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
