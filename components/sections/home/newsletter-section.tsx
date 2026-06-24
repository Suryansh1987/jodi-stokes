"use client";

import { type FormEvent, useState } from "react";

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
      <div className="mx-auto max-w-4xl">
        <h2>
          Get the <em>Monday Note</em>
          <br />
          from Jodi.
        </h2>
        <p>{newsletterContent.description}</p>
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
          <button type="submit">{status ? "You're in" : "Subscribe"}</button>
        </form>
        <p className="form-status newsletter__status" aria-live="polite">
          {status}
        </p>
        <div className="news-tags">
          {newsletterContent.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
