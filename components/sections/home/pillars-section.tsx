import { ArrowRight } from "lucide-react";

import { pillars } from "@/lib/content/home";

export function PillarsSection() {
  return (
    <section id="about" className="pillars" data-screen-label="Pillars">
      <div className="pillar-grid">
        {pillars.map((pillar) => (
          <article className="pillar" key={pillar.role}>
            <p className="pillar__num">
              {pillar.number} / {pillar.role}
            </p>
            <h2>
              {pillar.title} <em>{pillar.accent}</em>
            </h2>
            <p>{pillar.description}</p>
            <span className="pillar__arrow" aria-hidden="true">
              <ArrowRight size={18} />
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
