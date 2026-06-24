import { SectionIntro } from "@/components/section/shared/section-intro";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { journalPosts } from "@/lib/content/home";

export function JournalSection() {
  return (
    <section
      id="journal"
      className="journal section-shell"
      data-screen-label="Journal"
    >
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="The Journal"
          title="Field notes from"
          accent="the studio."
          description="Short, useful, free. Read it with your coffee."
        />
        <div className="journal-grid">
          {journalPosts.map((post, index) => (
            <article key={post.title}>
              <Card className="post-card" data-post={index + 1}>
                <CardHeader className="post-card__image">
                  <div className="post-card__gradient" />
                  <span className="post-card__tag">{post.category}</span>
                  <span className="post-card__deco" aria-hidden="true">
                    {post.deco}
                  </span>
                </CardHeader>
                <CardContent className="post-card__body">
                  <p className="post-card__meta">
                    <span>{post.readTime}</span>
                    <span>· {post.date}</span>
                  </p>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
