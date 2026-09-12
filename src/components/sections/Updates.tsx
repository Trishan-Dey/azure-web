"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/anim";

const POSTS = [
  {
    tag: "AEROSPACE · 2026",
    title: "CUBESAT DEVELOPMENT",
    desc: "A look inside the first build session — tools, parts and the long road to space.",
    style: "orbit",
  },
  {
    tag: "COMPANY · 2026",
    title: "BUILDING AZURE SYSTEMS",
    desc: "How four students turned a wild idea into a real engineering collective.",
    style: "grid",
  },
  {
    tag: "R&D",
    title: "ENGINEERING NOTES",
    desc: "Raw notes from the lab — what worked, what broke, and what we learned.",
    style: "blue",
  },
];

const STYLE_MAP: Record<string, string> = {
  orbit: "bg-midnight",
  grid: "bg-space",
  blue: "bg-deepazure",
};

function PostVisual({ style }: { style: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${STYLE_MAP[style]}`}>
      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 300" fill="none">
        {style === "orbit" && (
          <>
            <circle cx="140" cy="150" r="90" stroke="#ffffff" strokeWidth="1" />
            <circle cx="140" cy="150" r="40" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="140" cy="150" r="70" stroke="#ffffff" strokeWidth="0.5" />
          </>
        )}
        {style === "grid" && (
          <>
            <line x1="0" y1="60" x2="400" y2="60" stroke="#ffffff" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="#ffffff" />
            <line x1="0" y1="240" x2="400" y2="240" stroke="#ffffff" />
            <line x1="100" y1="0" x2="100" y2="300" stroke="#ffffff" />
            <line x1="250" y1="0" x2="250" y2="300" stroke="#ffffff" />
          </>
        )}
        {style === "blue" && (
          <>
            <circle cx="250" cy="120" r="80" stroke="#ffffff" strokeWidth="2" />
            <rect x="60" y="90" width="80" height="60" stroke="#ffffff" strokeWidth="2" />
            <line x1="140" y1="120" x2="170" y2="120" stroke="#ffffff" strokeWidth="2" />
          </>
        )}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <span className="absolute left-4 top-4 inline-block border border-white/30 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-white/80">
        {style === "blue" ? "FEATURED" : "STORY"}
      </span>
    </div>
  );
}

export default function Updates() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-post]").forEach((post, i) => {
        gsap.fromTo(
          post,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: post, start: "top 88%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="updates"
      ref={ref}
      className="relative bg-space py-32 sm:py-44"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <p className="chapter-label mb-6 text-azure/70">FROM AZURE SYSTEMS</p>
        <h2 className="font-display text-[10.5vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-[5.5vw]">
          Inside
          <br />
          <span className="text-gradient-azure">the build.</span>
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <a
              key={post.title}
              data-post
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`group flex flex-col overflow-hidden border border-white/10 transition-colors hover:border-azure/40 ${
                i === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="aspect-[4/3]">
                <PostVisual style={post.style} />
              </div>
              <div className="flex flex-1 flex-col bg-white/[0.03] p-6">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-azure/70">
                  {post.tag}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight text-white transition-colors group-hover:text-azure">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {post.desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-widest text-white/70 transition-colors group-hover:text-azure">
                  READ MORE <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
