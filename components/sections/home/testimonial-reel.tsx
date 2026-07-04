"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type ReelTestimonial = {
  quote: string;
  result: string;
  resultNote: string;
  initials: string;
  name: string;
  detail: string;
  tenure?: string;
  focus?: string;
  image: string;
  imageAlt: string;
};

type TestimonialReelProps = {
  testimonials: ReelTestimonial[];
  charStaggerMs?: number;
};

const CELL = 121.33;
const GAP = 8;
const STEP = 3 * (CELL + GAP);
const EXIT_MS = 240;
const SLIDE_MS = 800;
const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

function ReelCell() {
  return (
    <div
      aria-hidden="true"
      className="scroll-reel__cell"
      style={{ width: CELL, height: CELL }}
    />
  );
}

function FeaturedTile({ testimonial }: { testimonial: ReelTestimonial }) {
  return (
    <div
      className="scroll-reel__featured"
      style={{ width: CELL, height: CELL }}
    >
      <Image
        src={testimonial.image}
        alt={testimonial.imageAlt}
        width={122}
        height={122}
        sizes="122px"
        className="scroll-reel__image"
      />
      <span className="scroll-reel__initials" aria-hidden="true">
        {testimonial.initials}
      </span>
    </div>
  );
}

function AnimatedChars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  return (
    <>
      {text.split(" ").map((word, wordIndex, words) => {
        const wordStartIndex =
          startIndex +
          words
            .slice(0, wordIndex)
            .reduce((total, previousWord) => total + previousWord.length + 1, 0);
        const renderedWord = (
          <span className="scroll-reel__word">
            {Array.from(word).map((character, characterIndex) => {
              const delay = (wordStartIndex + characterIndex) * staggerMs;

              return (
                <span
                  key={`${character}-${characterIndex}`}
                  className="scroll-reel__char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {character}
                </span>
              );
            })}
          </span>
        );

        return (
          <span key={`${word}-${wordIndex}`}>
            {renderedWord}
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </>
  );
}

export function TestimonialReel({
  testimonials,
  charStaggerMs = 6,
}: TestimonialReelProps) {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const animating = useRef(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const count = testimonials.length;

  useEffect(() => {
    const pendingTimeouts = timeouts.current;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true)),
    );

    return () => {
      cancelAnimationFrame(raf);
      pendingTimeouts.forEach(clearTimeout);
    };
  }, []);

  const paginate = useCallback(
    (direction: 1 | -1) => {
      if (animating.current) {
        return;
      }

      const next = index + direction;
      if (next < 0 || next >= count) {
        return;
      }

      animating.current = true;
      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS),
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS),
      );
    },
    [count, index],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      paginate(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      paginate(-1);
    }
  };

  const middleItems = useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; index: number }> =
      [];

    for (let i = 0; i < 3; i += 1) {
      items.push({ type: "cell" });
    }

    testimonials.forEach((_, testimonialIndex) => {
      items.push({ type: "featured", index: testimonialIndex });
      if (testimonialIndex < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });

    for (let i = 0; i < 3; i += 1) {
      items.push({ type: "cell" });
    }

    return items;
  }, [count, testimonials]);

  if (!count) {
    return null;
  }

  const centerIndex = (count - 1) / 2;
  const middleY = (centerIndex - index) * STEP;
  const sideY = -middleY;
  const current = testimonials[displayIndex];
  const columnStyle = (y: number): CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });
  const sideCellCount = 4 + 2 * count;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="scroll-reel"
    >
      <div className="scroll-reel__stage" aria-hidden="true">
        <div className="scroll-reel__columns">
          <div className="scroll-reel__column" style={columnStyle(sideY)}>
            {Array.from({ length: sideCellCount }).map((_, cellIndex) => (
              <ReelCell key={`left-${cellIndex}`} />
            ))}
          </div>

          <div className="scroll-reel__column" style={columnStyle(middleY)}>
            {middleItems.map((item, itemIndex) =>
              item.type === "featured" ? (
                <FeaturedTile
                  key={`featured-${item.index}`}
                  testimonial={testimonials[item.index]}
                />
              ) : (
                <ReelCell key={`middle-${itemIndex}`} />
              ),
            )}
          </div>

          <div className="scroll-reel__column" style={columnStyle(sideY)}>
            {Array.from({ length: sideCellCount }).map((_, cellIndex) => (
              <ReelCell key={`right-${cellIndex}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-reel__content">
        <div>
          <Quote className="scroll-reel__quote-icon" aria-hidden="true" />
          <div className="scroll-reel__text-stage" aria-live="polite">
            <div className="scroll-reel__sizer" aria-hidden="true">
              <p className="scroll-reel__quote">{current.quote}</p>
              <p className="scroll-reel__author">{current.name}</p>
            </div>
            <div
              key={displayIndex}
              className={cn("scroll-reel__text", exiting && "is-exiting")}
            >
              <p className="scroll-reel__quote">
                <AnimatedChars
                  text={current.quote}
                  startIndex={0}
                  staggerMs={charStaggerMs}
                />
              </p>
              <p className="scroll-reel__author">
                <AnimatedChars
                  text={current.name}
                  startIndex={current.quote.length + 6}
                  staggerMs={charStaggerMs}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="scroll-reel__proof">
          <p className="scroll-reel__result">
            {current.result}
            <small>{current.resultNote}</small>
          </p>
          <p>
            <span>{current.detail}</span>
            {current.focus ? <small>{current.focus}</small> : null}
            {current.tenure ? <small>{current.tenure}</small> : null}
          </p>
        </div>

        <div className="scroll-reel__controls">
          <button
            type="button"
            onClick={() => paginate(-1)}
            disabled={index === 0}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            disabled={index === count - 1}
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
