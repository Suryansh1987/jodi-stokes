import { SectionIntro } from "@/components/section/shared/section-intro";
import { coachingContent } from "@/lib/content/home";

export function CoachingSection() {
  return (
    <section
      id="coaching"
      className="section-shell py-24"
      data-screen-label="Coaching"
    >
      {/* [PLACEHOLDER] Final coaching panel/form is implemented in Task 6. */}
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow={coachingContent.eyebrow}
          title={coachingContent.title}
          accent={coachingContent.accent}
          description={coachingContent.description}
        />
        <ul className="grid gap-3 text-white/70 md:grid-cols-3">
          {coachingContent.features.map((feature) => (
            <li key={feature} className="rounded-2xl border border-white/10 p-4">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
