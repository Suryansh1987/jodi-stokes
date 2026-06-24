import Image from "next/image";
import { Plus } from "lucide-react";

import { SectionIntro } from "@/components/section/shared/section-intro";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { programs } from "@/lib/content/home";

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="programs section-shell"
      data-screen-label="Programs"
    >
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Train with Jodi"
          title="Programs that"
          accent="actually end somewhere."
          description="Three signature builds - six, twelve, or sixteen weeks. Each comes with full video library, weekly check-in templates, and a printable training journal."
        />

        <div className="prog-grid">
          {programs.map((program) => (
            <Card
              key={program.title}
              className={program.featured ? "prog-card prog-card--featured" : "prog-card"}
            >
              <div
                className={
                  program.featured
                    ? "prog-card__media prog-card__media--photo"
                    : "prog-card__media prog-card__media--art"
                }
                data-art={program.title === "The Reset" ? "reset" : "lifted"}
              >
                {program.image ? (
                  <>
                    <Image
                      src={program.image.src}
                      alt={program.image.alt}
                      fill
                      sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 38vw"
                      className="prog-card__image"
                    />
                    <div className="prog-card__overlay" aria-hidden="true" />
                    <div className="prog-card__script" aria-hidden="true">
                      Strong
                      <br />
                      Foundations
                    </div>
                  </>
                ) : (
                  <div className="prog-card__art-label" aria-hidden="true">
                    {program.artLabel?.split(" ").map((word) => (
                      <span key={word}>{word}</span>
                    ))}
                  </div>
                )}
              </div>

              <CardHeader className="prog-card__header">
                <div className="prog-card__tags">
                  {program.tags.map((tag, index) => (
                    <span
                      key={tag}
                      className={index === 0 && program.featured ? "prog-tag prog-tag--mint" : "prog-tag"}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="prog-card__title">
                  {program.title}
                </h3>
              </CardHeader>

              <CardContent className="prog-card__body">
                <p>{program.description}</p>
              </CardContent>

              <CardFooter className="prog-card__footer">
                <div className="prog-card__price">
                  {program.price}
                  {program.priceNote ? <small>{program.priceNote}</small> : null}
                </div>
                {/* [PLACEHOLDER] Visual-only add-to-cart action. [TODO] Wire program product details, cart state, and checkout. */}
                <button
                  className="prog-card__add"
                  type="button"
                  aria-label={`Add ${program.title} to cart`}
                >
                  <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
