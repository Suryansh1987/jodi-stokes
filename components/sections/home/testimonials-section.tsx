import { SectionIntro } from "@/components/section/shared/section-intro";
import { TestimonialReel } from "@/components/sections/home/testimonial-reel";
import { testimonials } from "@/lib/content/home";

export function TestimonialsSection() {
  return (
    <section className="testimonials section-shell" data-screen-label="Testimonials">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Client stories"
          title="Real people. Real"
          accent="results."
          description="The kind that stick. Each story is from a client who's been with Jodi for at least 12 months - because anyone can lose 10 pounds in a month; the question is whether you're still there in year three."
        />
        <TestimonialReel testimonials={testimonials} />
      </div>
    </section>
  );
}
