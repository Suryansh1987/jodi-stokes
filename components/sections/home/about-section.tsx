import Image from "next/image";
import { Check } from "lucide-react";

import { aboutContent } from "@/lib/content/home";

export function AboutSection() {
  return (
    <section className="about section-shell" data-screen-label="About">
      <div className="about-photo">
        <div className="about-photo__glow" aria-hidden="true" />
        <Image
          src={aboutContent.image.src}
          alt={aboutContent.image.alt}
          fill
          sizes="(max-width: 1100px) 100vw, 48vw"
          className="about-photo__image"
        />
        <div className="about-signature">
          {aboutContent.signature}
          <small>- {aboutContent.signatureLabel}</small>
        </div>
      </div>

      <div className="about-content">
        <span className="eyebrow">{aboutContent.eyebrow}</span>
        <h2>
          {aboutContent.title} - that&apos;s the{" "}
          <span>{aboutContent.accent}</span>
        </h2>
        <div className="about-content__copy">
          {aboutContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
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
