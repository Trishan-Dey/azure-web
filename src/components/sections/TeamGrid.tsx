"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskLine, prefersReducedMotion } from "@/lib/anim";
import { useInView } from "@/lib/useInView";

const PEOPLE = [
  {
    name: "HOLDEN AZURE",
    role: "FOUNDER · SYSTEMS",
    bio: "Keeps the orbital and the ground honest. Runs hardware here, writes the ops that fly.",
    slot: "md:col-start-1 md:row-start-2",
  },
  {
    name: "S. KHAN",
    role: "FLIGHT SOFTWARE",
    bio: "Owns the stack between radio and orbit — telemetry, FEC, and the code that refuses to crash silently.",
    slot: "md:col-start-5 md:row-start-4",
  },
  {
    name: "A. ZHANG",
    role: "MECHANICAL · EPS",
    bio: "The chassis, the power budget, and the discipline to keep a lunchbox-sized satellite alive in vacuum.",
    slot: "md:col-start-3 md:row-start-6",
  },
  {
    name: "M. NOVAK",
    role: "GROUND SEGMENT",
    bio: "Turns the downlink into a dashboard you can actually read — antenna, demod, and the telemetry lake.",
    slot: "md:col-start-7 md:row-start-8",
  },
];

export default function TeamGrid() {
  const ref = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLElement>();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>("[data-member]")
        .forEach((grid, i) => {
          gsap.fromTo(
            grid,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: grid, start: "top 90%" },
            }
          );
        });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-space py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="chapter-label mb-4 text-azure/70">THE COHORT</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl">
              <MaskLine>People</MaskLine>
              <MaskLine className="text-azure">don&apos;t fit</MaskLine>
              <MaskLine>grids</MaskLine>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/50">
            So we stopped pretending they did. Every block here is placed where the
            person actually works in the lab.
          </p>
        </div>

        <div className="grid gap-px md:grid-cols-7">
          {PEOPLE.map((p, i) => (
            <div
              key={p.name}
              data-member
              className={`group border border-white/10 bg-midnight/60 p-6 transition-colors duration-500 hover:bg-midnight md:col-span-2 md:row-span-2 ${p.slot}`}
              style={i % 2 === 1 ? { transform: "translateY(34px)" } : undefined}
            >
              <p className="text-[0.66rem] tracking-[0.26em] text-azure/60">
                0{i + 1}
              </p>
              <h3 className="mt-8 font-display text-lg font-bold uppercase tracking-tight text-white">
                {p.name}
              </h3>
              <p className="mt-1 text-[0.66rem] tracking-[0.24em] text-white/40">
                {p.role}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-white/55">{p.bio}</p>
            </div>
          ))}

          <div className="hidden items-end border border-white/10 bg-transparent p-6 md:col-span-1 md:flex">
            <p
              className="text-[0.62rem] tracking-[0.34em] text-white/30"
              style={{ writingMode: "vertical-rl" }}
            >
              LAB MAP — NOT A ROSTER
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
