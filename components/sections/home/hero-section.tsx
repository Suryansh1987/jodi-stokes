import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Dumbbell, Play, Sparkles } from "lucide-react";

import { heroContent } from "@/lib/content/home";

export function HeroSection() {
  const [firstChip, secondChip] = heroContent.chips;

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
          {/* [PLACEHOLDER] Visual-only intro video trigger. [TODO] Wire to a real video modal/player. */}
          <button className="play-btn" type="button" aria-label="Play intro">
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
    </header>
  );
}
