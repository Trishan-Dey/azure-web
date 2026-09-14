"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskLine, prefersReducedMotion } from "@/lib/anim";
import { useInView } from "@/lib/useInView";

type Commitment = {
  num: string;
  title: string;
  tagline: string;
  desc: string;
};

const COMMITMENTS: Commitment[] = [
  {
    num: "01",
    title: "INNOVATE",
    tagline: "First principles. Bold questions.",
    desc: "Every build starts as a question we refuse to answer second-hand. We derive, prototype and risk what others won't — from orbital hardware to autonomous systems.",
  },
  {
    num: "02",
    title: "INTEGRATE",
    tagline: "Hardware meets software.",
    desc: "The magic lives in the seam. We treat the full stack as one system — satellite, ground station and dashboard — so nothing gets lost between the silos.",
  },
  {
    num: "03",
    title: "ELEVATE",
    tagline: "Ship it. Then lift it.",
    desc: "A working build is the floor, not the ceiling. We measure, iterate and push every system toward mission-grade reliability — then take on the next frontier.",
  },
];

function CommitmentCard({
  c,
  index,
}: {
  c: Commitment;
  index: number;
}) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <article
      ref={ref}
      data-commitment
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-midnight/70 p-8 transition-colors duration-500 hover:border-azure/40 sm:p-10"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-azure/0 blur-3xl transition-all duration-700 group-hover:bg-azure/25" />

      <div className="relative">
        <p className={`chapter-label text-azure/70 ${!inView ? "opacity-0" : ""}`} data-reveal>
          {c.num}
        </p>
        <h3
          className="mask-line font-display mt-10 text-6xl font-bold uppercase leading-none tracking-tight text-white sm:text-7xl"
          data-reveal
        >
          <MaskLine>{c.title}</MaskLine>
        </h3>
        <p className="mt-3 text-sm font-semibold tracking-[0.18em] text-azure/80" data-reveal>
          {c.tagline}
        </p>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50" data-reveal>
          {c.desc}
        </p>
      </div>

      <Link
        href="/contact"
        className="relative mt-12 flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.25em] text-white/50 transition-colors group-hover:text-azure"
        data-reveal
      >
        WORK WITH US
        <span className="inline-block h-px w-8 bg-current transition-all group-hover:w-12" />
      </Link>
    </article>
  );
}

export default function Commitment() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-commitment]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="commitment"
      className="relative bg-space px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="chapter-label mb-4 text-azure/70">OUR COMMITMENT</p>
            <h2 className="font-display max-w-xl text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
              <MaskLine>The promise</MaskLine>
              <MaskLine className="text-gradient-azure">runs through</MaskLine>
              <MaskLine>everything.</MaskLine>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/50 sm:text-right">
            Three principles. One standard. The bar we hold ourselves to on every project.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {COMMITMENTS.map((c, i) => (
            <CommitmentCard key={c.num} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
