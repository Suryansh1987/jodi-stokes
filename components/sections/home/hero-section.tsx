"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Dumbbell, Play, Sparkles, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { heroContent } from "@/lib/content/home";

export function HeroSection() {
  const [firstChip, secondChip] = heroContent.chips;
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isIntroOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const playButton = playButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsIntroOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      playButton?.focus();
    };
  }, [isIntroOpen]);

  return (
    <header className="hero section-shell" data-screen-label="Hero">
      <div className="hero__content">
        <div className="hero-tag">
          <span className="hero-tag__dot" aria-hidden="true" />
          {heroContent.badge}
        </div>

        <h1>
          {heroContent.headline.intro}
          <br />
          <span className="hero__script">{heroContent.headline.script}</span>
          <br />
          Train with <span className="hero__accent">Jodi.</span>
        </h1>

        <p className="hero__lead">{heroContent.lead}</p>

        <div className="hero-cta">
          {heroContent.ctas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className={cta.variant === "ghost" ? "btn-ghost" : "btn-primary"}
            >
              {cta.label}
              {cta.variant !== "ghost" ? <ArrowRight size={14} /> : null}
            </Link>
          ))}
        </div>

        <div className="hero-stats" aria-label="Jodi Stokes Fitness stats">
          {heroContent.stats.map((stat) => (
            <div className="hero-stat" key={`${stat.value}-${stat.label}`}>
              <strong>
                {stat.value}
                {stat.accent ? <span>{stat.accent}</span> : null}
              </strong>
              <small>{stat.label}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-photo">
          <div className="hero-photo__badge">
            <span aria-hidden="true" />
            Now coaching
          </div>
          <Image
            src={heroContent.image.src}
            alt={heroContent.image.alt}
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 44vw"
            className="hero-photo__image"
          />
          <div className="hero-photo__caption">
            <div>
              <h2>{heroContent.caption.title}</h2>
              <p>{heroContent.caption.description}</p>
            </div>
            {/* [PLACEHOLDER] Opens a deterministic preview panel until a real intro video exists. [TODO] Wire to a real video modal/player. */}
            <button
              ref={playButtonRef}
              className="play-btn"
              type="button"
              aria-label="Play intro"
              onClick={() => setIsIntroOpen(true)}
            >
              <Play size={18} fill="currentColor" aria-hidden="true" />
            </button>
          </div>

          {firstChip ? (
            <div className="float-chip chip-1">
              <span className="float-chip__icon" aria-hidden="true">
                <Dumbbell size={18} />
              </span>
              <div>
                <strong>{firstChip.title}</strong>
                <small>{firstChip.label}</small>
              </div>
            </div>
          ) : null}

          {secondChip ? (
            <div className="float-chip chip-2">
              <span className="float-chip__icon" aria-hidden="true">
                <Sparkles size={18} />
              </span>
              <div>
                <strong>{secondChip.title}</strong>
                <small>{secondChip.label}</small>
              </div>
            </div>
          ) : null}
        </div>

        <div className="hero-program-stack" aria-label="Jodi's coaching method">
          {heroContent.programCards.map((card) => (
            <article className="hero-program-card" key={card.eyebrow}>
              <span>{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      </div>

      {isIntroOpen ? (
        <div className="hero-dialog" role="presentation">
          <button
            className="hero-dialog__backdrop"
            type="button"
            aria-label="Close intro preview"
            onClick={() => setIsIntroOpen(false)}
          />
          <div
            className="hero-dialog__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <button
              ref={closeButtonRef}
              className="hero-dialog__close"
              type="button"
              aria-label="Close intro preview"
              onClick={() => setIsIntroOpen(false)}
            >
              <X size={18} strokeWidth={2.4} aria-hidden="true" />
            </button>
            <div className="hero-dialog__stage" aria-hidden="true">
              <Play size={32} fill="currentColor" />
            </div>
            <div className="hero-dialog__content">
              <span className="eyebrow">Coaching video</span>
              <h2 id={titleId}>{heroContent.videoPreview.title}</h2>
              <p>{heroContent.videoPreview.description}</p>
              {/* [PLACEHOLDER] Mock video preview. [TODO] Replace with real hosted video or player embed. */}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
