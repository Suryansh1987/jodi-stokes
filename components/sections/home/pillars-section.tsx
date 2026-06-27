import { ArrowRight, Dumbbell, HeartPulse, Utensils } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pillars } from "@/lib/content/home";

const pillarIcons: Record<string, LucideIcon> = {
  Trainer: Dumbbell,
  Lifestyle: HeartPulse,
  Nutrition: Utensils,
};

export function PillarsSection() {
  return (
    <section id="about" className="pillars" data-screen-label="Pillars">
      <div className="pillar-grid">
        {pillars.map((pillar, index) => {
          const Icon = pillarIcons[pillar.role] ?? Dumbbell;

          return (
            <article
              className="pillar"
              data-featured={index === 0 ? "true" : undefined}
              key={pillar.role}
            >
              <Card className="pillar-card">
                <span className="pillar-card__corner pillar-card__corner--top-left" />
                <span className="pillar-card__corner pillar-card__corner--top-right" />
                <span className="pillar-card__corner pillar-card__corner--bottom-left" />
                <span className="pillar-card__corner pillar-card__corner--bottom-right" />
                <CardHeader className="pillar-card__header">
                  <span className="pillar-card__icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <p className="pillar__num">
                    {pillar.number} / {pillar.role}
                  </p>
                </CardHeader>
                <CardContent className="pillar-card__content">
                  <h2>
                    {pillar.title} <em>{pillar.accent}</em>
                  </h2>
                  <p>{pillar.description}</p>
                  <span className="pillar__arrow" aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </CardContent>
              </Card>
            </article>
          );
        })}
      </div>
    </section>
  );
}
