"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/anim";

const STEPS = [
  { word: "IMAGINE", num: "01", desc: "Every project begins with a question. What if we could build something that doesn't exist yet?" },
  { word: "DESIGN", num: "02", desc: "CAD models, schematics, simulations. We iterate on paper before we touch metal." },
  { word: "BUILD", num: "03", desc: "Prototypes, test rigs, code. Hands on the hardware — real engineering in the workshop." },
  { word: "LEARN", num: "04", desc: "Test, fail, measure, repeat. Every build teaches us something the classroom can't." },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const getAmount = () => {
      const track = trackRef.current!;
      return -(track.scrollWidth - window.innerWidth);
    };

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: getAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(trackRef.current!.scrollWidth - window.innerWidth) * 1.2}`,
          scrub: 1.4,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 2,
        },
      });
    }, sectionRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative h-[100svh] overflow-hidden bg-offwhite text-midnight"
    >
      <div
        ref={trackRef}
        data-track
        className="flex h-full w-max items-center will-change-transform"
      >
        {/* Intro panel */}
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-6 sm:px-16">
          <p className="chapter-label mb-6 text-deepazure/70">OUR APPROACH</p>
          <h2 className="font-display text-[10vw] font-extrabold uppercase leading-[0.9] tracking-tight sm:text-[5.5vw]">
            How we
            <br />
            <span className="text-deepazure">work.</span>
          </h2>
          <p className="mt-5 max-w-xs text-sm text-midnight/60">
            Scroll to move through the cycle — a loop, not a line.
          </p>
        </div>

        {/* Steps */}
        {STEPS.map((s) => (
          <div
            key={s.word}
            className="flex h-full w-screen shrink-0 flex-col justify-center px-6 sm:px-16"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-deepazure/60">{s.num}</span>
              <h3 className="font-display text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[8vw]">
                {s.word}
                <span className="text-deepazure">.</span>
              </h3>
            </div>
            <div className="mt-8 max-w-md border-t border-midnight/10 pt-6">
              <p className="text-base leading-relaxed text-midnight/70">{s.desc}</p>
            </div>
          </div>
        ))}

        {/* End panel */}
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-6 sm:px-16">
          <h3 className="font-display text-[9vw] font-extrabold uppercase leading-[0.9] tracking-tight sm:text-[4.5vw]">
            Then we
            <br />
            <span className="text-deepazure">repeat.</span>
          </h3>
        </div>
      </div>
    </section>
  );
}
