import { SectionIntro } from "@/components/section/shared/section-intro";
import { testimonials } from "@/lib/content/home";

export function TestimonialsSection() {
  return (
    <section className="section-shell py-24" data-screen-label="Testimonials">
      {/* [PLACEHOLDER] Final testimonial cards are implemented in Task 6. */}
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Client stories"
          title="Real people. Real"
          accent="results."
          description="The kind that stick. Each story is from a client who's been with Jodi for at least 12 months."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name} className="rounded-2xl border border-white/10 p-6 text-white/70">
              &ldquo;{testimonial.quote}&rdquo;
              <footer className="mt-4 font-display font-bold text-white">
                {testimonial.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
