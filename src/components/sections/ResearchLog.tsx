"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskLine, prefersReducedMotion } from "@/lib/anim";
import { useInView } from "@/lib/useInView";

type Entry = {
  id: string;
  tag: string;
  title: string;
  status: "LEARNED" | "PROVING" | "SHIPPED";
  sys: "AERO" | "DEF" | "AI";
  when: string;
  desc: string;
};

const ENTRIES: Entry[] = [
  {
    id: "r01",
    tag: "STATION",
    title: "FEC in a 2-line throughput budget",
    status: "SHIPPED",
    sys: "AERO",
    when: "22 FEB 2026",
    desc: "Forward error correction without giving ground-station latency its own line item.",
  },
  {
    id: "r02",
    tag: "MODELS",
    title: "Latent salience as a cheap intent probe",
    status: "PROVING",
    sys: "AI",
    when: "8 MAR 2026",
    desc: "Reading user intent from internal activations instead of a full secondary model.",
  },
  {
    id: "r03",
    tag: "TRAINING",
    title: "Exercise-grade entity resolution at 60 fps",
    status: "LEARNED",
    sys: "DEF",
    when: "17 MAR 2026",
    desc: "What breaks when a battlespace simulation has to render a decision once a frame.",
  },
  {
    id: "r04",
    tag: "ORBIT",
    title: "Attitude telemetry on a 9-axis budget",
    status: "PROVING",
    sys: "AERO",
    when: "30 MAR 2026",
    desc: "Magnetometer + sun-sensor fusion that skips the gyro entirely for coarse pointing.",
  },
  {
    id: "r05",
    tag: "DEPLOY",
    title: "On-prem LLM with a fridge-sized footprint",
    status: "SHIPPED",
    sys: "AI",
    when: "14 APR 2026",
    desc: "A model we can fly into a facility and walk away from — no cloud dependency, no mystery.",
  },
];

const FILTERS = ["ALL", "AERO", "DEF", "AI"] as const;

export default function ResearchLog() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView<HTMLElement>();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!list.current || prefersReducedMotion() || !inView) return;
    if (filter === "ALL") {
      gsap.to(list.current.querySelectorAll<HTMLElement>("[data-entry]"), {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.05,
        overwrite: "auto",
      });
      return;
    }
    gsap.to(list.current.querySelectorAll<HTMLElement>("[data-entry]"), {
      opacity: 0.12,
      x: 0,
      duration: 0.3,
      stagger: 0.03,
      overwrite: "auto",
    });
  }, [filter, inView]);

  const shown = ENTRIES.filter((e) => filter === "ALL" || e.sys === filter);

  return (
    <section ref={ref} className="bg-midnight py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="chapter-label mb-4 text-azure/70">RESEARCH LOG</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              <MaskLine>Notes from</MaskLine>
              <MaskLine className="text-azure">the field</MaskLine>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-[0.7rem] font-semibold tracking-[0.22em] transition-colors ${
                  filter === f
                    ? "bg-azure text-midnight"
                    : "bg-white/5 text-white/50 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div ref={list} className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {shown.map((e) => (
            <article
              key={e.id}
              data-entry
              className="grid gap-直属4 py-8 transition-opacity delay-75 md:grid-cols-[120px_1fr_auto] md:items-baseline md:gap-8"
            >
              <p className="text-xs tracking-[0.2em] text-white/40">{e.when}</p>
              <div>
                <p className="text-[0.68rem] font-bold tracking-[0.26em] text-azure/80">
                  {e.tag} · {e.sys}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-white">
                  {e.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{e.desc}</p>
              </div>
              <span
                className={`inline-flex w-fit items-center gap-2 text-[0.66rem] font-semibold tracking-[0.2em] ${
                  e.status === "SHIPPED"
                    ? "text-azure"
                    : e.status === "PROVING"
                      ? "text-amber/80"
                      : "text-white/40"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 ${e.status === "SHIPPED" ? "bg-azure" : e.status === "PROVING" ? "bg-amber/80" : "bg-white/40"}`}
                />
                {e.status}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
