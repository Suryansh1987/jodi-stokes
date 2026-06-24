import { SectionIntro } from "@/components/section/shared/section-intro";
import { bookContent } from "@/lib/content/home";

export function BookSection() {
  return (
    <section id="book" className="section-shell py-24" data-screen-label="Book">
      {/* [PLACEHOLDER] Final 3D book feature is implemented in Task 4. */}
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow={bookContent.eyebrow}
          title={bookContent.title}
          accent={bookContent.accent}
          description={bookContent.description}
        />
        <ul className="grid gap-3 text-white/70 md:grid-cols-3">
          {bookContent.features.map((feature) => (
            <li key={feature} className="rounded-full border border-white/10 px-4 py-2">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
