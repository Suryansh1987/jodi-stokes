import { ArrowRight } from "lucide-react";

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
                  {/* [PLACEHOLDER] CSS article art. [TODO] Replace with CMS-managed article images. */}
                  <a
                    className="post-card__image-link"
                    href={post.href}
                    aria-label={`Read ${post.title}`}
                  >
                    <div className="post-card__gradient" />
                    <span className="post-card__tag">{post.category}</span>
                    <span className="post-card__deco" aria-hidden="true">
                      {post.deco}
                    </span>
                  </a>
                </CardHeader>
                <CardContent className="post-card__body">
                  <div className="post-card__tags" aria-label={`${post.title} tags`}>
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <h3>
                    {/* [PLACEHOLDER] Journal links point to #. [TODO] Wire to CMS/blog post routes. */}
                    <a href={post.href}>{post.title}</a>
                  </h3>
                  <p className="post-card__description">{post.description}</p>
                  <div className="post-card__footer">
                    <p className="post-card__meta">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </p>
                    {/* [PLACEHOLDER] Journal links point to #. [TODO] Wire to CMS/blog post routes. */}
                    <a className="post-card__link" href={post.href}>
                      Read note
                      <ArrowRight aria-hidden="true" size={15} strokeWidth={2.4} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
