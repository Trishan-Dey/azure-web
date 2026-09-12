"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MaskLine, prefersReducedMotion } from "@/lib/anim";

const MEMBERS = [
  { name: "SUBHAJIT PAL", role: "Hardware & Engineering", initials: "SP", hue: "azure" },
  { name: "TRISHAN DEY", role: "Software & Development", initials: "TD", hue: "space" },
  { name: "HITESH DASH", role: "Resources & Operations", initials: "HD", hue: "azure" },
  { name: "SHIVAM BANERJEE", role: "Technical & Innovation", initials: "SB", hue: "space" },
];

function Portrait({ initials, hue }: { initials: string; hue: string }) {
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden ${
        hue === "azure" ? "bg-azure" : "bg-midnight"
      }`}
    >
      {/* Abstract geometric pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 300 400"
        fill="none"
      >
        <circle cx="150" cy="180" r="120" stroke="#ffffff" strokeWidth="1" strokeDasharray="6 8" />
        <circle cx="150" cy="180" r="70" stroke="#ffffff" strokeWidth="1" />
        <line x1="150" y1="30" x2="150" y2="350" stroke="#ffffff" strokeWidth="0.5" />
        <line x1="40" y1="180" x2="260" y2="180" stroke="#ffffff" strokeWidth="0.5" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[8rem] font-black leading-none text-white/80">
          {initials}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 80 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: (i % 2) * 0.15,
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={ref}
      className="relative overflow-hidden bg-offwhite py-32 text-midnight sm:py-44"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-[30vw] w-[30vw] rounded-full bg-azure/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <p className="chapter-label mb-8 text-deepazure/70">THE PEOPLE BEHIND IT</p>
        <h2 className="font-display text-[11vw] font-extrabold uppercase leading-[0.92] tracking-tight sm:text-[5.5vw]">
          <MaskLine>Built by students.</MaskLine>
          <MaskLine className="text-deepazure">Driven by curiosity.</MaskLine>
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.map((m) => (
            <div key={m.name} data-card className="group">
              <Portrait initials={m.initials} hue={m.hue} />
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-tight">
                  {m.name}
                </h3>
                <span className="font-mono text-[0.6rem] text-deepazure/50">
                  {m.initials}
                </span>
              </div>
              <p className="mt-1 text-sm text-midnight/60">{m.role}</p>
              <div className="mt-3 h-px w-8 bg-azure transition-all duration-500 group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
