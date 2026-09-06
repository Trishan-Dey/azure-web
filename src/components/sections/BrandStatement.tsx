"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/anim";

const WORDS = ["INNOVATE", "INTEGRATE", "ELEVATE"];

function WordMark({ word }: { word: string }) {
  if (word === "INNOVATE")
    return (
      <span>
        <span className="text-azure">{word}</span>.
      </span>
    );
  return (
    <span>
      {word}
      <span className="text-azure">.</span>
    </span>
  );
}

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tagRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      wordRefs.current.forEach((word, i) => {
        if (!word) return;
        const chunk = 100 / WORDS.length; // % of section per word
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${i * chunk}% top`,
            end: `${(i + 1) * chunk}% top`,
            scrub: 0.5,
          },
        });
        tl.fromTo(
          word,
          { yPercent: 130, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: "power1.out" }
        ).to(word, { opacity: 1, ease: "none" }, 0.3);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-start bg-space"
      style={{ height: `${WORDS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <p ref={tagRef} className="chapter-label mb-8 text-azure/60">
          OUR COMMITMENT
        </p>
        <div className="relative flex h-[38vh] w-full items-center justify-center overflow-hidden">
          {WORDS.map((w, i) => (
            <span
              key={w}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="absolute font-display text-[19vw] font-black uppercase leading-none tracking-tight text-white sm:text-[14vw]"
              style={{ opacity: 0 }}
            >
              <WordMark word={w} />
            </span>
          ))}
        </div>
        <p className="mt-10 max-w-md px-6 text-center text-sm leading-relaxed text-white/50">
          The three pillars of everything we build — from a single prototype to a
          full mission.
        </p>
      </div>
    </section>
  );
}