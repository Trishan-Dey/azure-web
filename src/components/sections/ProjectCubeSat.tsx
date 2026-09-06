"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskLine, prefersReducedMotion } from "@/lib/anim";
import { useInView } from "@/lib/useInView";
import { scrollToSection } from "@/lib/scroll";

const CubeSat3D = dynamic(() => import("@/components/CubeSat3D"), {
  ssr: false,
  loading: () => null,
});

const LABELS = [
  { text: "BUS MODULE", sub: "DETAILS COMING SOON", pos: "left" },
  { text: "SOLAR ARRAY", sub: "DETAILS COMING SOON", pos: "right" },
  { text: "COMMS ANTENNA", sub: "DETAILS COMING SOON", pos: "top" },
  { text: "ONBOARD COMPUTE", sub: "DETAILS COMING SOON", pos: "bottom" },
];

export default function ProjectCubeSat() {
  const { ref: lazyRef, inView } = useInView<HTMLElement>("500px");
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={(el) => {
        sectionRef.current = el;
        lazyRef.current = el;
      }}
      className="relative h-[400vh] bg-space"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
      >
        {/* Starfield bg that brightens on scroll */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 45%, rgba(18,107,255,${0.12 + progress * 0.2}) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6,69,197,${0.05 + progress * 0.1}) 0%, transparent 40%)`,
          }}
        />
        <div className="bp-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

        {/* 3D object */}
        <div className="absolute inset-0">
          <div className="relative mx-auto h-full w-full sm:w-2/3">
            {inView && <CubeSat3D scrollProgress={progress} />}
          </div>
        </div>

        {/* Heading top */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <p
            className="chapter-label text-azure transition-opacity duration-500"
            style={{ opacity: 1 - progress * 1.5 }}
          >
            PROJECT CUBESAT
          </p>
          <h2
            className="mt-3 font-display text-[11vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-[6vw]"
            style={{ opacity: 1 - progress * 1.4 }}
          >
            <MaskLine>Our first step</MaskLine>
            <MaskLine className="text-gradient-azure">beyond earth.</MaskLine>
          </h2>
          <p
            className="mt-4 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-azure"
            style={{ opacity: 1 - progress * 1.6 }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-azure" />
            IN DEVELOPMENT
          </p>
        </div>

        {/* Progress labels around the satellite */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: Math.min(progress * 3, 1) }}
        >
          {LABELS.map((l, i) => (
            <div
              key={l.text}
              className={`absolute hidden sm:block ${l.pos === "left" ? "left-[12%] top-[38%]" : l.pos === "right" ? "right-[12%] top-[38%]" : l.pos === "top" ? "top-[16%] left-[38%]" : "bottom-[16%] left-[38%]"}`}
              style={{ opacity: Math.min(Math.max((progress - 0.3) * 4 - i * 0.2, 0), 1) }}
            >
              <div className="border-l border-azure/40 pl-3">
                <p className="text-sm font-bold text-white">{l.text}</p>
                <p className="font-mono text-[0.6rem] tracking-wider text-azure/70">
                  {l.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info reveal at end */}
        <div
          ref={infoRef}
          className="relative z-10 flex flex-col items-center px-6 text-center"
          style={{ opacity: Math.min(Math.max((progress - 0.6) * 3, 0), 1), transform: `translateY(${(1 - Math.min(Math.max((progress - 0.6) / 0.4, 0), 1)) * 40}px)` }}
        >
          <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base transition-opacity" style={{ opacity: Math.min(Math.max((progress - 0.62) * 3, 0), 1) }}>
            Azure Systems&apos; first major aerospace initiative, bringing together
            hardware, software, engineering and experimentation.
          </p>
          <button
            onClick={() => scrollToSection("contact")}
            className="group mt-8 flex items-center gap-2 bg-azure px-6 py-3 text-xs font-bold tracking-[0.2em] text-white transition-all hover:bg-deepazure"
            style={{ opacity: Math.min(Math.max((progress - 0.7) * 3, 0), 1) }}
          >
            EXPLORE THE MISSION
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* scroll progress bar */}
        <div className="absolute bottom-8 left-1/2 h-px w-40 -translate-x-1/2 bg-white/10">
          <div
            className="h-full bg-azure"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
