"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/anim";

export default function ContactCta() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-cta-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText("azuresystems2@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-azure px-6 py-28 text-white"
    >
      {/* Texture over blue */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bp-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-deepazure/40 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p data-cta-reveal className="chapter-label mb-8 text-white/70">
          FINAL CALL
        </p>
        <h2 className="font-display text-[14vw] font-black uppercase leading-[0.88] tracking-tight sm:text-[8vw]">
          <span data-cta-reveal className="block">Have an</span>
          <span data-cta-reveal className="block">
            idea?
            <span className="text-space"> Let&apos;s</span>
          </span>
          <span data-cta-reveal className="block text-space">build.</span>
        </h2>
        <p data-cta-reveal className="mt-8 max-w-md text-base leading-relaxed text-white/80">
          “We&apos;re building around curiosity, engineering and innovation.”
        </p>

        <div data-cta-reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="mailto:azuresystems2@gmail.com"
            className="group inline-flex items-center gap-2 bg-space px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.03]"
          >
            Start a conversation
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 border border-white/50 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-azure"
          >
            {copied ? "Copied!" : "Copy email"}
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.3em] text-white/40">
        Where vision meets tech
      </div>
    </section>
  );
}
