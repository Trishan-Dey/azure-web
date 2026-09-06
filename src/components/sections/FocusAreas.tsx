"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/anim";

type Area = {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  visual: "orbit" | "grid" | "nodes";
};

const AREAS: Area[] = [
  {
    num: "01",
    title: "AEROSPACE",
    tagline: "Engineering beyond boundaries.",
    desc: "From orbital systems to propulsion concepts — we design, build and test hardware that reaches further than the classroom.",
    visual: "orbit",
  },
  {
    num: "02",
    title: "DEFENCE-TECH",
    tagline: "Technology with purpose.",
    desc: "Mission-critical systems where reliability, precision and security matter. Engineering that has to work — every time.",
    visual: "grid",
  },
  {
    num: "03",
    title: "AI",
    tagline: "Intelligence, engineered.",
    desc: "Autonomy, perception and decision-making. We build intelligence that augments human capability and accelerates discovery.",
    visual: "nodes",
  },
];

function OrbitVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative h-56 w-56 sm:h-72 sm:w-72">
        <div className="absolute inset-0 rounded-full border border-azure/40 animate-[spin_30s_linear_infinite]" />
        <div className="absolute inset-6 rounded-full border border-azure/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-2xl bg-azure shadow-[0_0_60px_rgba(18,107,255,0.6)]" />
        </div>
        <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-offwhite" />
      </div>
    </div>
  );
}

function GridVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="bp-grid h-56 w-56 rotate-12 sm:h-72 sm:w-72 [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />
      <div className="absolute h-24 w-24 border border-azure/60" />
      <div className="absolute h-24 w-24 -translate-x-10 -translate-y-10 rotate-45 border border-offwhite/30" />
      <div className="absolute h-24 w-24 translate-x-10 translate-y-10 rotate-45 border border-azure/30" />
    </div>
  );
}

function NodesVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <svg className="h-56 w-56 sm:h-72 sm:w-72" viewBox="0 0 200 200" fill="none">
        <line x1="30" y1="30" x2="100" y2="70" stroke="#126bff" strokeWidth="1" />
        <line x1="30" y1="30" x2="60" y2="150" stroke="#126bff" strokeWidth="1" />
        <line x1="60" y1="150" x2="170" y2="140" stroke="#126bff" strokeWidth="1" />
        <line x1="170" y1="140" x2="100" y2="70" stroke="#126bff" strokeWidth="1" />
        <line x1="60" y1="150" x2="100" y2="70" stroke="#5ea0ff" strokeWidth="0.5" strokeDasharray="4 4" />
        <circle cx="30" cy="30" r="8" fill="#126bff" />
        <circle cx="100" cy="70" r="8" fill="#126bff" />
        <circle cx="60" cy="150" r="8" fill="#126bff" />
        <circle cx="170" cy="140" r="8" fill="#5ea0ff" />
      </svg>
    </div>
  );
}

function Visual({ type }: { type: Area["visual"] }) {
  if (type === "orbit") return <OrbitVisual />;
  if (type === "grid") return <GridVisual />;
  return <NodesVisual />;
}

export default function FocusAreas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-area]").forEach((el) => {
        const num = el.querySelector("[data-num]");
        const title = el.querySelector("[data-title]");
        const visual = el.querySelector("[data-visual]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 70%" },
        });
        tl.fromTo(num, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6 })
          .fromTo(
            title,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, ease: "power4.out" },
            "-=0.3"
          )
          .fromTo(
            visual,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
          );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="focus"
      ref={ref}
      className="bg-space"
    >
      <div className="relative px-6 py-20 sm:px-10">
        <p className="chapter-label mb-4 text-azure/70">WHAT WE EXPLORE</p>
      </div>

      {AREAS.map((area, i) => (
        <div
          key={area.title}
          data-area
          className={`relative flex min-h-[80vh] items-center overflow-hidden border-t border-white/10 px-6 sm:px-10 ${
            i % 2 === 1 ? "bg-midnight" : "bg-space"
          }`}
        >
          {/* Giant ghost number */}
          <span
            data-num
            className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[30vw] font-extrabold leading-none text-white/[0.03]"
          >
            {area.num}
          </span>

          <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-2">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="chapter-label mb-6 text-azure/60">{area.num}</p>
              <h3
                className="mask-line font-display text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-[7vw]"
              >
                <span data-title className="block">
                  {area.title}
                </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-azure sm:text-2xl">
                {area.tagline}
              </p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
                {area.desc}
              </p>
            </div>

            <div data-visual className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="mx-auto flex h-[40vh] w-full max-w-md items-center justify-center lg:h-[50vh]">
                <Visual type={area.visual} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
