import { SectionIntro } from "@/components/section/shared/section-intro";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
        <div className="test-grid">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.name} className="test-card">
              <CardContent className="test-card__content">
                <div className="test-card__stars" aria-label="5 out of 5 stars">
                  <span aria-hidden="true">★★★★★</span>
                </div>
                <blockquote>{testimonial.quote}</blockquote>
                <p className="test-card__result">
                  {testimonial.result}
                  <small>· {testimonial.resultNote}</small>
                </p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
