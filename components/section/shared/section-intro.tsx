import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  accent,
  description,
  className,
}: SectionIntroProps) {
  return (
    <div className={cn("section-intro", className)}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="font-display text-4xl font-extrabold leading-none tracking-tight text-white md:text-6xl">
          {title}
          {accent ? (
            <>
              {" "}
              <span className="text-mint italic">{accent}</span>
            </>
          ) : null}
        </h2>
      </div>
      {description ? (
        <p className="max-w-2xl text-base text-white/70 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
