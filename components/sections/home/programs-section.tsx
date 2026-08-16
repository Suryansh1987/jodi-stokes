import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { SectionIntro } from "@/components/section/shared/section-intro";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  formatMoney,
  programs,
  type ProgramContent,
} from "@/lib/content/programs-products";

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="programs section-shell"
      data-screen-label="Programs"
    >
      <div className="mx-auto max-w-6xl">
        <SectionIntro eyebrow="Train with Jodi" title="Programs" />

        <div className="program-list">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program }: { program: ProgramContent }) {
  const duration = `${program.sessions.durationApproximate ? "Approximately " : ""}${program.sessions.durationMinutes} minutes per session`;
  const frequency = `${program.sessions.frequency.approximate ? "Approximately " : ""}${program.sessions.frequency.count} sessions per ${program.sessions.frequency.period}`;

  return (
    <article aria-labelledby={`program-${program.id}-title`}>
      <Card className="program-card">
        <CardHeader className="program-card__header">
          <div>
            <p className="program-card__type">{program.type}</p>
            <h3 id={`program-${program.id}-title`}>{program.name}</h3>
          </div>
          <p className="program-card__price">{formatMoney(program.price)}</p>
        </CardHeader>

        <CardContent className="program-card__content">
          <dl className="program-details">
            <div>
              <dt>Format</dt>
              <dd>
                {program.sessions.count} {program.delivery.toLowerCase()} sessions
              </dd>
            </div>
            <div>
              <dt>Session length</dt>
              <dd>{duration}</dd>
            </div>
            <div>
              <dt>Frequency</dt>
              <dd>{frequency}</dd>
            </div>
          </dl>

          <div className="program-inclusions">
            <p>Includes</p>
            <ul>
              {program.inclusions.map((inclusion) => (
                <li key={inclusion.id}>
                  <CheckCircle2 size={16} strokeWidth={2.3} aria-hidden="true" />
                  <span>{inclusion.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="program-card__footer">
          <Link className="btn-primary" href="#program-registration">
            {program.ctaLabel}
            <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
}
