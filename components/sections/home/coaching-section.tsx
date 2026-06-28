"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight, Check, ClipboardCheck } from "lucide-react";

import { SectionIntro } from "@/components/section/shared/section-intro";
import { coachingContent } from "@/lib/content/home";

export function CoachingSection() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // [PLACEHOLDER] Local-only coaching application feedback. [TODO] Wire to CRM/backend.
    setStatus("Application received. Jodi's team will follow up.");
  }

  return (
    <section
      id="coaching"
      className="section-shell coaching-shell"
      data-screen-label="Coaching"
    >
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow={coachingContent.eyebrow}
          title={coachingContent.title}
          accent={coachingContent.accent}
          description={coachingContent.description}
        />
        <div className="coaching">
          <div className="coach-left">
            <div>
              <p className="coach-left__kicker">{coachingContent.applicationKicker}</p>
              <h2>
                The <em>full</em> method.
                <br />
                Twelve weeks. Eight clients.
              </h2>
            </div>
            <ul className="coach-feat">
              {coachingContent.features.map((feature) => (
                <li key={feature}>
                  <Check aria-hidden="true" size={16} strokeWidth={2.6} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="coach-left__footer">
              <div>
                <p className="coach-left__label">Next cohort starts</p>
                <p className="coach-left__date">
                  {coachingContent.nextCohort}
                </p>
              </div>
              <div className="coach-detail-grid" aria-label="Application details">
                {coachingContent.applicationDetails.map((detail) => (
                  <span key={detail}>{detail}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="coach-right">
            <div className="coach-card-head">
              <div className="coach-card-head__icon" aria-hidden="true">
                <ClipboardCheck size={20} strokeWidth={2.3} />
              </div>
              <div>
                <span className="eyebrow">Investment</span>
                <p className="coach-card-head__title">Apply for the next cohort</p>
              </div>
            </div>
            <div className="coach-tier">
              <p className="coach-tier__price">{coachingContent.investment}</p>
              <p className="coach-tier__note">
                {coachingContent.investmentNote}
              </p>
            </div>
            <form className="coach-form" onSubmit={handleSubmit}>
              <div className="coach-form__field">
                <label htmlFor="coaching-name">Your name</label>
                <input
                  id="coaching-name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="coach-form__row">
                <div className="coach-form__field">
                  <label htmlFor="coaching-email">Email</label>
                  <input
                    id="coaching-email"
                    name="email"
                    type="email"
                    placeholder="you@hi.com"
                    required
                  />
                </div>
                <div className="coach-form__field">
                  <label htmlFor="coaching-phone">Phone</label>
                  <input
                    id="coaching-phone"
                    name="phone"
                    type="tel"
                    placeholder="+1"
                    required
                  />
                </div>
              </div>
              <div className="coach-form__field">
                <label htmlFor="coaching-goal">Main goal</label>
                <select
                  id="coaching-goal"
                  name="goal"
                  defaultValue={coachingContent.goalOptions[0]}
                >
                  {coachingContent.goalOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="coach-form__field">
                <label htmlFor="coaching-message">
                  {coachingContent.messagePrompt}
                </label>
                <textarea
                  id="coaching-message"
                  name="message"
                  placeholder="Training history, current routine, injuries, or schedule constraints."
                  rows={4}
                  required
                />
              </div>
              {/* [PLACEHOLDER] Local-only application submit. [TODO] Replace with CRM/server action submission. */}
              <button className="btn-primary coach-form__submit" type="submit">
                Apply for fall cohort
                <ArrowRight aria-hidden="true" size={15} strokeWidth={2.4} />
              </button>
              <p className="form-status" aria-live="polite">
                {status}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
