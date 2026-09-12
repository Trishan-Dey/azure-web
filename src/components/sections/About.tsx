"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MaskLine, prefersReducedMotion } from "@/lib/anim";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-offwhite py-32 text-midnight sm:py-44"
    >
      {/* Abstract azure geometry background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-10 h-[40vw] w-[40vw] rounded-full bg-azure/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[35vw] w-[35vw] rounded-full bg-deepazure/10 blur-3xl" />
        <svg
          className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
          viewBox="0 0 800 800"
          fill="none"
        >
          <circle cx="400" cy="400" r="380" stroke="#126bff" strokeWidth="1" />
          <circle cx="400" cy="400" r="290" stroke="#126bff" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="200" stroke="#126bff" strokeWidth="1" />
          <line x1="400" y1="0" x2="400" y2="800" stroke="#126bff" strokeWidth="0.5" />
          <line x1="0" y1="400" x2="800" y2="400" stroke="#126bff" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <p data-reveal className="chapter-label mb-10 text-deepazure/70">
          WHO WE ARE
        </p>

        <h2 className="font-display text-[10.5vw] font-extrabold uppercase leading-[0.95] tracking-tight text-midnight sm:text-[6.5vw] lg:text-[5.5vw]">
          <MaskLine>We build.</MaskLine>
          <MaskLine>We experiment.</MaskLine>
          <MaskLine>We learn.</MaskLine>
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div className="md:col-start-2 md:pr-10">
            <p data-reveal className="text-lg leading-relaxed text-midnight/80 sm:text-xl">
              Azure Systems is a student-led innovation startup focused on{" "}
              <span className="font-semibold text-deepazure">aerospace</span>,{" "}
              <span className="font-semibold text-deepazure">defence-tech</span> and{" "}
              <span className="font-semibold text-deepazure">artificial intelligence</span>.
            </p>
            <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-midnight/60">
              We encourage learning through hands-on experience, experimentation
              and real engineering. No theory for theory&apos;s sake — we build what
              we study, and we study what we build.
            </p>
          </div>

          <div className="hidden items-end md:flex">
            <p data-reveal className="font-mono text-xs tracking-wider text-midnight/40">
              EST. 2026 · A STUDENT COLLECTIVE
              <br />
              PUSHING THE EDGE OF WHAT&apos;S POSSIBLE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
