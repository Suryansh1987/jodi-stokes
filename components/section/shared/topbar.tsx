import { marqueeMessages } from "@/lib/content/home";

export function Topbar() {
  const repeatedMessages = [...marqueeMessages, ...marqueeMessages];

  return (
    <div className="topbar" aria-label="Jodi Stokes Fitness announcements">
      <div className="topbar__marquee">
        {repeatedMessages.map((message, index) => (
          <span key={`${message}-${index}`}>
            <i aria-hidden="true" />
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
