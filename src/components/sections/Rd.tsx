"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/anim";

const AREAS = [
  {
    code: "R&D / 01",
    title: "AEROSPACE R&D",
    desc: "Propulsion concepts, orbital mechanics, and next-generation satellite architectures.",
    status: "ACTIVE",
    active: true,
  },
  {
    code: "R&D / 02",
    title: "AI RESEARCH",
    desc: "Perception, autonomy and models that make systems react to the real world.",
    status: "COMING SOON",
    active: false,
  },
  {
    code: "R&D / 03",
    title: "EXPERIMENTAL TECHNOLOGY",
    desc: "Unproven ideas, risky builds, and the long shots that sometimes change everything.",
    status: "COMING SOON",
    active: false,
  },
];

export default function Rd() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-lab]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rd"
      ref={ref}
      className="relative overflow-hidden bg-midnight py-32 sm:py-44"
    >
      {/* Technical backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bp-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
        <div className="absolute right-0 top-0 h-[40vw] w-[40vw] rounded-full bg-azure/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <p className="chapter-label mb-6 text-azure/70">R&D — THE LAB</p>
        <h2 className="font-display text-[10vw] font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-[5vw]">
          Beyond what
          <br />
          <span className="text-white/40">we&apos;re building</span>{" "}
          <span className="text-gradient-azure">today.</span>
        </h2>

        <div className="mt-20 flex flex-col">
          {AREAS.map((area) => (
            <div
              key={area.title}
              data-lab
              className="group relative flex flex-col gap-4 border-t border-white/10 py-10 transition-colors hover:border-azure/40 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
            >
              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                <span className="w-24 font-mono text-xs tracking-wider text-white/40">
                  {area.code}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white transition-colors group-hover:text-azure sm:text-3xl">
                    {area.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">
                    {area.desc}
                  </p>
                </div>
              </div>

              <div className="sm:w-44 sm:text-right">
                {area.active ? (
                  <span className="inline-flex items-center gap-2 bg-azure/15 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-azure">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-azure" />
                    {area.status}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 border border-white/20 px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/50">
                    {area.status}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
