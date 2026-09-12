"use client";

type ChapterProps = {
  words: string[];
  index?: number;
  bg?: string;
};

export default function ChapterTransition({
  words,
  index = 0,
  bg = "bg-space",
}: ChapterProps) {
  return (
    <section
      className={`relative flex min-h-[80vh] items-center justify-center overflow-hidden ${bg}`}
      data-chapter
    >
      <span className="chapter-label absolute left-6 top-24 text-white/30 sm:left-10">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h2
        data-chapter-words={words.join(" ")}
        className="flex flex-col items-center gap-1 text-center"
      >
        {words.map((w, i) => (
          <span
            key={i}
            className="mask-line font-display text-[14vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-[7.5vw]"
          >
            <span
              className="block text-white/95"
              data-chapter-word
              style={{ color: i % 2 === 1 ? "transparent" : undefined, WebkitTextStroke: i % 2 === 1 ? "2px #126bff" : undefined }}
            >
              {w}
            </span>
          </span>
        ))}
      </h2>
    </section>
  );
}
