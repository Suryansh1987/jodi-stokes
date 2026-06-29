"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

import { newsletterContent } from "@/lib/content/home";

export function NewsletterSection() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // [PLACEHOLDER] Local-only newsletter confirmation. [TODO] Wire newsletter signup provider.
    setStatus("You're in.");
  }

  return (
    <section className="newsletter section-shell" data-screen-label="Newsletter">
      <div className="mx-auto max-w-5xl">
        <div className="newsletter-card">
          <div className="newsletter-card__copy">
            <span className="newsletter-card__eyebrow">
              {newsletterContent.eyebrow}
            </span>
            <h2>
              Get the <em>Monday Note</em>
              <br />
              from Jodi.
            </h2>
            <p className="newsletter-card__subtitle">
              {newsletterContent.subtitle}
            </p>
            <p className="newsletter-card__description">
              {newsletterContent.description}
            </p>
          </div>
          <div className="newsletter-card__form">
            <form className="subscribe" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="you@email.com"
                required
              />
              {/* [PLACEHOLDER] Local-only newsletter submit. [TODO] Wire newsletter signup provider. */}
              <button type="submit" aria-label={status ? "You're in" : "Subscribe"}>
                <span>{status ? "You're in" : "Subscribe"}</span>
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2.4} />
              </button>
            </form>
            <p className="form-status newsletter__status" aria-live="polite">
              {status}
            </p>
            <p className="newsletter-card__privacy">
              {newsletterContent.privacyNote}
            </p>
            <div className="news-tags">
              {newsletterContent.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
