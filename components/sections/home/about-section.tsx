import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { aboutContent } from "@/lib/content/home";

export function AboutSection() {
  return (
    <section
      id="about"
      className="about section-shell"
      data-screen-label="About"
    >
      <div className="about-heading">
        <div>
          <span className="eyebrow">{aboutContent.eyebrow}</span>
          <h2>
            {aboutContent.title} - that&apos;s the{" "}
            <span>{aboutContent.accent}</span>
          </h2>
        </div>
        <div className="about-content__copy">
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="about-showcase">
        <div className="about-photo about-photo--main">
          <div className="about-photo__glow" aria-hidden="true" />
          <Image
            src={aboutContent.image.src}
            alt={aboutContent.image.alt}
            fill
            sizes="(max-width: 1100px) 100vw, 58vw"
            className="about-photo__image"
          />
          <div className="about-signature">
            {aboutContent.signature}
            <small>· {aboutContent.signatureLabel}</small>
          </div>
        </div>

        <div className="about-side">
          <div className="about-breakout">
            <div className="about-breakout__mark" aria-hidden="true">
              JS
            </div>
            <div>
              <h3>{aboutContent.breakout.title}</h3>
              <p>{aboutContent.breakout.description}</p>
            </div>
            <Link className="btn-primary about-breakout__cta" href={aboutContent.breakout.cta.href}>
              {aboutContent.breakout.cta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="about-photo about-photo--secondary">
            <Image
              src={aboutContent.secondaryImage.src}
              alt={aboutContent.secondaryImage.alt}
              fill
              sizes="(max-width: 1100px) 100vw, 28vw"
              className="about-photo__image"
            />
          </div>
        </div>
      </div>

      <div className="about-proof">
        <div className="about-stats" aria-label="Jodi Stokes coaching proof points">
          {aboutContent.stats.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="about-credentials">
          {aboutContent.credentials.map((credential) => (
            <div className="cred" key={credential.title}>
              <span className="cred__tick" aria-hidden="true">
                <Check size={12} />
              </span>
              <div>
                <strong>{credential.title}</strong>
                <span>{credential.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
