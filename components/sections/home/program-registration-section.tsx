import { Check, ClipboardCheck, LockKeyhole } from "lucide-react";

import { SectionIntro } from "@/components/section/shared/section-intro";
import { programs } from "@/lib/content/programs-products";

const registrationSteps = [
  "Jodi contacts you directly",
  "Payment and scheduling are handled directly",
  "Formal signed paperwork is handled privately",
  "Medical disclosure is handled privately",
];

export function ProgramRegistrationSection() {
  return (
    <section
      className="section-shell registration-shell"
      data-screen-label="Registration"
    >
      <div className="mx-auto max-w-6xl">
        <SectionIntro eyebrow="Initial registration" title="Register" />

        <div className="registration-layout">
          <div className="registration-process">
            <div>
              <p className="registration-process__kicker">What happens next</p>
              <h3>Work directly with Jodi.</h3>
            </div>

            <ul>
              {registrationSteps.map((step) => (
                <li key={step}>
                  <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="registration-panel">
            <div className="registration-panel__header">
              <span className="registration-panel__icon" aria-hidden="true">
                <ClipboardCheck size={20} strokeWidth={2.3} />
              </span>
              <div>
                <span className="eyebrow">Program registration</span>
                <p>Initial registration form</p>
              </div>
            </div>

            {/* [PLACEHOLDER] Registration is blocked until client-approved agreement and waiver content is available. */}
            {/* [TODO] Enable this form only after the agreement content, sender domain, and production email configuration are approved. */}
            <form
              id="program-registration"
              className="registration-form"
              aria-describedby="registration-status"
            >
              <fieldset disabled className="registration-form__fields">
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="registration-company">Company</label>
                  <input
                    id="registration-company"
                    name="company"
                    type="text"
                    autoComplete="off"
                    maxLength={200}
                    tabIndex={-1}
                  />
                </div>

                <div className="registration-form__field">
                  <label htmlFor="registration-name">Full name</label>
                  <input
                    id="registration-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    placeholder="Full name"
                    required
                  />
                </div>

                <div className="registration-form__row">
                  <div className="registration-form__field">
                    <label htmlFor="registration-email">Email</label>
                    <input
                      id="registration-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="registration-form__field">
                    <label htmlFor="registration-phone">Phone</label>
                    <input
                      id="registration-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={40}
                      placeholder="+1 555 123 4567"
                      required
                    />
                  </div>
                </div>

                <div className="registration-form__field">
                  <label htmlFor="registration-program">Program</label>
                  <select
                    id="registration-program"
                    name="programId"
                    defaultValue={programs[0]?.id}
                    required
                  >
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.name} - {program.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="registration-form__field">
                  <label htmlFor="registration-message">
                    Message or fitness goals <span>(optional)</span>
                  </label>
                  <textarea
                    id="registration-message"
                    name="message"
                    placeholder="Share any goals or context you would like Jodi to know."
                    maxLength={2000}
                    rows={4}
                  />
                </div>

                <div className="registration-agreement">
                  <LockKeyhole size={18} strokeWidth={2.3} aria-hidden="true" />
                  <div>
                    <p>Agreement and waiver</p>
                    <label htmlFor="registration-agreement">
                      <input
                        id="registration-agreement"
                        name="agreementAcknowledged"
                        type="checkbox"
                        value="true"
                        required
                      />
                      <span>Agreement acknowledgement unavailable</span>
                    </label>
                  </div>
                </div>
              </fieldset>

              <button
                className="btn-primary registration-form__submit"
                type="submit"
                disabled
              >
                Register
              </button>

              <p
                id="registration-status"
                className="registration-status"
                role="status"
                aria-live="polite"
              >
                Registration is unavailable until the client-approved agreement
                and waiver are ready to review.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
