import { SectionIntro } from "@/components/section/shared/section-intro";
import { programs } from "@/lib/content/home";

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="section-shell bg-surface-1 py-24"
      data-screen-label="Programs"
    >
      {/* [PLACEHOLDER] Final program cards are implemented in Task 4. */}
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Train with Jodi"
          title="Programs that"
          accent="actually end somewhere."
          description="Three signature builds - six, twelve, or sixteen weeks. Each comes with full video library, weekly check-in templates, and a printable training journal."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {programs.map((program) => (
            <article key={program.title} className="rounded-2xl border border-white/10 p-6">
              <h3 className="font-display text-2xl font-bold text-white">
                {program.title}
              </h3>
              <p className="mt-3 text-white/60">{program.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
