"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskLine } from "@/lib/anim";
import { useInView } from "@/lib/useInView";
import Link from "next/link";

const CubeSat3D = dynamic(() => import("@/components/CubeSat3D"), {
  ssr: false,
  loading: () => null,
});

export default function ProjectCubeSat() {
  const { ref: lazyRef, inView } = useInView<HTMLElement>("500px");
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef({ v: 0 });

  const bgRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const labelsWrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRef = useRef<HTMLDivElement>(null);
  const infoTextRef = useRef<HTMLParagraphElement>(null);
  const infoBtnRef = useRef<HTMLAnchorElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          progress.current.v = p;

          if (bgRef.current)
            bgRef.current.style.background = `radial-gradient(circle at 50% 45%, rgba(18,107,255,${
              0.12 + p * 0.2
            }) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6,69,197,${
              0.05 + p * 0.1
            }) 0%, transparent 40%)`;

          if (chipRef.current)
            chipRef.current.style.opacity = `${Math.max(1 - p * 1.5, 0)}`;
          if (headingRef.current)
            headingRef.current.style.opacity = `${Math.max(1 - p * 1.4, 0)}`;
          if (statusRef.current)
            statusRef.current.style.opacity = `${Math.max(1 - p * 1.6, 0)}`;

          if (labelsWrapRef.current)
            labelsWrapRef.current.style.opacity = `${Math.min(p * 3, 1)}`;
          labelRefs.current.forEach((el, i) => {
            if (el)
              el.style.opacity = `${Math.min(Math.max((p - 0.3) * 4 - i * 0.2, 0), 1)}`;
          });

          if (infoRef.current) {
            infoRef.current.style.opacity = `${Math.min(Math.max((p - 0.6) * 3, 0), 1)}`;
            infoRef.current.style.transform = `translateY(${
              (1 - Math.min(Math.max((p - 0.6) / 0.4, 0), 1)) * 40
            }px)`;
          }
          if (infoTextRef.current)
            infoTextRef.current.style.opacity = `${Math.min(
              Math.max((p - 0.62) * 3, 0),
              1
            )}`;
          if (infoBtnRef.current)
            infoBtnRef.current.style.opacity = `${Math.min(
              Math.max((p - 0.7) * 3, 0),
              1
            )}`;

          if (barRef.current) barRef.current.style.width = `${p * 100}%`;
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
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Starfield bg that brightens on scroll */}
        <div
          ref={bgRef}
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(18,107,255,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6,69,197,0.05) 0%, transparent 40%)",
          }}
        />
        <div className="bp-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

        {/* 3D object */}
        <div className="absolute inset-0">
          <div className="relative mx-auto h-full w-full sm:w-2/3">
            {inView && <CubeSat3D progressRef={progress} />}
          </div>
        </div>

        {/* Heading top */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <p ref={chipRef} className="chapter-label text-azure">
            PROJECT CUBESAT
          </p>
          <h2
            ref={headingRef}
            className="mt-3 font-display text-[10vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-[5.5vw]"
          >
            <MaskLine>Our first step</MaskLine>
            <MaskLine className="text-gradient-azure">beyond earth.</MaskLine>
          </h2>
          <p
            ref={statusRef}
            className="mt-4 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-azure"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-azure" />
            IN DEVELOPMENT
          </p>
        </div>

        {/* Progress labels around the satellite */}
        <div
          ref={labelsWrapRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          {[
            { text: "BUS MODULE", sub: "DETAILS COMING SOON", pos: "left" },
            { text: "SOLAR ARRAY", sub: "DETAILS COMING SOON", pos: "right" },
            { text: "COMMS ANTENNA", sub: "DETAILS COMING SOON", pos: "top" },
            { text: "ONBOARD COMPUTE", sub: "DETAILS COMING SOON", pos: "bottom" },
          ].map((l, i) => (
            <div
              key={l.text}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className={`absolute hidden sm:block ${l.pos === "left" ? "left-[12%] top-[38%]" : l.pos === "right" ? "right-[12%] top-[38%]" : l.pos === "top" ? "top-[16%] left-[38%]" : "bottom-[16%] left-[38%]"}`}
              style={{ opacity: 0 }}
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
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          <p ref={infoTextRef} className="max-w-md text-sm leading-relaxed text-white/70 sm:text-base" style={{ opacity: 0 }}>
            Azure Systems&apos; first major aerospace initiative, bringing together
            hardware, software, engineering and experimentation.
          </p>
          <Link
            ref={infoBtnRef}
            href="/contact"
            className="group mt-8 flex items-center gap-2 bg-azure px-6 py-3 text-xs font-bold tracking-[0.2em] text-white transition-all hover:bg-deepazure"
            style={{ opacity: 0 }}
          >
            EXPLORE THE MISSION
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* scroll progress bar */}
        <div className="absolute bottom-8 left-1/2 h-px w-40 -translate-x-1/2 bg-white/10">
          <div ref={barRef} className="h-full bg-azure" style={{ width: "0%" }} />
        </div>
      </div>
    </section>
  );
}