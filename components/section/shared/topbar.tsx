const marqueeMessages = [
  "Free shipping over $75",
  'New Book "Water Exercise" - signed copies available',
  "1:1 coaching slots open for fall",
  "Train · Lifestyle · Nutrition",
];

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
