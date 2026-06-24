import { newsletterContent } from "@/lib/content/home";

export function NewsletterSection() {
  return (
    <section className="section-shell py-24 text-center" data-screen-label="Newsletter">
      {/* [PLACEHOLDER] Final newsletter form behavior is implemented in Task 6. */}
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-4xl font-extrabold leading-none text-white md:text-6xl">
          {newsletterContent.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          {newsletterContent.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {newsletterContent.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
