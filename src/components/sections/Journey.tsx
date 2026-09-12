"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/anim";

const MILESTONES = [
  { year: "2026", title: "AZURE SYSTEMS", sub: "Foundation.", active: true },
  { year: "2026", title: "PROJECT CUBESAT", sub: "First major aerospace initiative.", active: true },
  { year: "NEXT", title: "PROTOTYPE & TESTING", sub: "Real hardware, real tests.", active: false },
  { year: "FUTURE", title: "ADVANCED PROJECTS", sub: "Scaling beyond the first mission.", active: false },
  { year: "VISION", title: "A LEADING INDIAN INNOVATION COMPANY", sub: "From students to serious.", active: false },
];

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    // Horizontal scroll on desktop
    const isDesktop = () => window.innerWidth >= 768;
    let ctx: gsap.Context | undefined;
    const setup = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        if (isDesktop() && desktopRef.current) {
          const amount = () => -(desktopRef.current!.scrollWidth - window.innerWidth);
          gsap.to(desktopRef.current, {
            x: amount,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: () => `+=${desktopRef.current!.scrollWidth - window.innerWidth}`,
              scrub: 1.4,
              pin: true,
              invalidateOnRefresh: true,
              anticipatePin: 2,
            },
          });
        }
      }, ref);
    };
    setup();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="journey"
      ref={ref}
      className="relative bg-space py-24 sm:py-0"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <p className="chapter-label mb-6 text-azure/70">OUR JOURNEY</p>
        <h2 className="font-display text-[10.5vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-[5.5vw]">
          From first
          <br />
          <span className="text-gradient-azure">spark.</span>
        </h2>
      </div>

      {/* Desktop horizontal timeline */}
      <div className="mt-12 hidden overflow-hidden md:block">
        <div ref={desktopRef} data-track className="flex w-max items-stretch gap-8 px-10 will-change-transform">
          {MILESTONES.map((m, i) => (
          <div key={m.title} className="flex w-[420px] shrink-0 items-stretch">
            <div
              className={`flex-1 border-l-2 p-8 ${m.active ? "border-azure bg-midnight/40" : "border-white/15"}`}
            >
              <p className={`font-mono text-xs tracking-widest ${m.active ? "text-azure" : "text-white/40"}`}>
                {m.year}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight text-white">
                {m.title}
              </h3>
              <p className="mt-2 text-sm text-white/50">{m.sub}</p>
              {m.active && (
                <p className="mt-6 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-widest text-azure">
                  <span className="h-1.5 w-1.5 rounded-full bg-azure" /> LIVE
                </p>
              )}
            </div>
            <div className="flex flex-col items-center justify-between py-8">
              <span className={`h-3 w-3 rounded-full ${m.active ? "bg-azure" : "bg-white/25"}`} />
              {i < MILESTONES.length - 1 && (
                <span className="mx-auto w-px flex-1 bg-white/15" />
              )}
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="mt-10 flex flex-col gap-0 px-6 pb-20 md:hidden">
        {MILESTONES.map((m, i) => (
          <div key={m.title} className="relative pl-8 pb-12">
            <div className="absolute left-0 top-1 flex flex-col items-center">
              <span className={`h-3 w-3 rounded-full ${m.active ? "bg-azure" : "bg-white/25"}`} />
              {i < MILESTONES.length - 1 && (
                <span className="w-px flex-1 bg-white/15" style={{ height: "100%" }} />
              )}
            </div>
            <p className={`font-mono text-xs tracking-widest ${m.active ? "text-azure" : "text-white/40"}`}>
              {m.year}
            </p>
            <h3 className="mt-2 font-display text-lg font-bold uppercase leading-tight text-white">
              {m.title}
            </h3>
            <p className="mt-1 text-sm text-white/50">{m.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
