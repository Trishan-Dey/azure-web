"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/anim";
import { MaskLine } from "@/lib/anim";
import { useInView } from "@/lib/useInView";

const TRACKS = [
  {
    num: "HARDWARE",
    tag: "ORBITAL SYSTEMS",
    title: "Project CubeSat",
    desc: "A student-built CubeSat pushing telemetry, power and attitude-control in a chassis the size of a lunch box.",
    bars: [
      { label: "STRUCTURE", pct: 74 },
      { label: "EPS", pct: 66 },
      { label: "ADCS", pct: 58 },
    ],
  },
  {
    num: "SOFTWARE",
    tag: "GROUND · CUBESAT · CLOUD",
    title: "Flight Systems",
    desc: "The ground segment and telemetry pipeline that turns a flying box into a mission you can watch from your browser.",
    bars: [
      { label: "TELEMETRY", pct: 72 },
      { label: "GROUND STATION", pct: 63 },
      { label: "DASHBOARD", pct: 80 },
    ],
  },
];

export default function CurrentMission() {
  const ref = useRef<HTMLElement>(null);
  const { ref: wrapRef, inView } = useInView<HTMLElement>();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-delay]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.1 + i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".mt-1 [data-bar]").forEach((bar) => {
        const pct = Number(bar.dataset.pct || 0);
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${pct}%`,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: bar, start: "top 92%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="current-mission" className="relative bg-midnight py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div data-delay className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="chapter-label mb-4 text-azure/70">CURRENT MISSION</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              <MaskLine>Now in the</MaskLine>
              <MaskLine className="text-azure">build bay.</MaskLine>
            </h2>
          </div>
          <Link
            href="/projects"
            className="group mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.22em] text-white/70 transition-colors hover:text-azure sm:mt-0"
          >
            EXPLORE THE MISSION
            <span className="inline-block h-px w-10 bg-current transition-all group-hover:w-14" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-0 lg:border lg:border-white/10">
          {TRACKS.map((t, i) => (
            <article
              key={t.num}
              className={`group relative p-8 transition-colors duration-500 hover:bg-space/50 lg:p-10 ${
                i === 0 ? "lg:border-r lg:border-white/10" : ""
              }`}
            >
              <p className="chapter-label text-azure/50">{t.num}</p>
              <h3 className="font-display mt-6 text-2xl font-bold uppercase tracking-tight text-white">
                {t.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">{t.desc}</p>

              <div className="mt-8 space-y-4">
                {t.bars.map((b) => (
                  <div key={b.label} className="grid grid-cols-[110px_1fr] items-center gap-3 text-xs">
                    <span className="text-white/50">{b.label}</span>
                    <div className="relative h-px bg-white/10">
                      <span
                        className="absolute inset-y-0 left-0 bg-azure transition-all duration-700 group-hover:bg-azure/70"
                        style={{ width: "0%" }}
                        data-bar
                        data-pct={b.pct}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
