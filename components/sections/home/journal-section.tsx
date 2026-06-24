import { SectionIntro } from "@/components/section/shared/section-intro";
import { journalPosts } from "@/lib/content/home";

export function JournalSection() {
  return (
    <section
      id="journal"
      className="section-shell border-y border-white/10 bg-surface-1 py-24"
      data-screen-label="Journal"
    >
      {/* [PLACEHOLDER] Final journal cards are implemented in Task 6. */}
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="The Journal"
          title="Field notes from"
          accent="the studio."
          description="Short, useful, free. Read it with your coffee."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {journalPosts.map((post) => (
            <article key={post.title} className="rounded-2xl border border-white/10 p-6">
              <p className="font-display text-xs uppercase tracking-widest text-mint">
                {post.category} · {post.readTime} · {post.date}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-white">
                {post.title}
              </h3>
              <p className="mt-3 text-white/60">{post.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
