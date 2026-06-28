import { SectionIntro } from "@/components/section/shared/section-intro";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { testimonials } from "@/lib/content/home";

export function TestimonialsSection() {
  const [featuredTestimonial, ...supportingTestimonials] = testimonials;

  return (
    <section className="testimonials section-shell" data-screen-label="Testimonials">
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Client stories"
          title="Real people. Real"
          accent="results."
          description="The kind that stick. Each story is from a client who's been with Jodi for at least 12 months - because anyone can lose 10 pounds in a month; the question is whether you're still there in year three."
        />
        <div className="test-grid">
          {featuredTestimonial ? (
            <TestimonialCard
              testimonial={featuredTestimonial}
              index={0}
              featured
            />
          ) : null}
          <div className="test-stack">
            {supportingTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
  featured = false,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  featured?: boolean;
}) {
  return (
    <Card className="test-card" data-featured={featured}>
      <CardContent className="test-card__content">
        <div className="test-card__topline">
          <div className="test-card__stars" aria-label="5 out of 5 stars">
            <span aria-hidden="true">★★★★★</span>
          </div>
          {testimonial.tenure ? (
            <span className="test-card__tenure">{testimonial.tenure}</span>
          ) : null}
        </div>
        <blockquote>{testimonial.quote}</blockquote>
        <div className="test-card__proof">
          <p className="test-card__result">
            {testimonial.result}
            <small>· {testimonial.resultNote}</small>
          </p>
          {testimonial.focus ? (
            <p className="test-card__focus">{testimonial.focus}</p>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="test-card__person">
        <span className="test-card__avatar" data-avatar={index + 1}>
          {testimonial.initials}
        </span>
        <span>
          <strong>{testimonial.name}</strong>
          <small>{testimonial.detail}</small>
        </span>
      </CardFooter>
    </Card>
  );
}
