"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logo from "@/components/Logo";

export default function Loader() {
  const [show, setShow] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const tl = gsap.timeline({
      onComplete: () => setShow(false),
    });

    // Simulated quick load
    const progress = { v: 0 };
    tl.to(progress, {
      v: 1,
      duration: prefersReduced ? 0.1 : 0.9,
      ease: "power2.inOut",
      onUpdate: () => {
        if (progressRef.current)
          progressRef.current.style.width = `${progress.v * 100}%`;
      },
    })
      .fromTo(
        tagRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.7"
      )
      .to(innerRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        rootRef.current,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.7,
          ease: "power4.inOut",
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      data-loader
      className="fixed inset-0 z-[100] flex items-center justify-center bg-space"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div ref={innerRef} className="flex flex-col items-center gap-6">
        <Logo className="h-24 w-auto drop-shadow-md sm:h-28" />
        <p
          ref={tagRef}
          className="chapter-label text-azure/80 opacity-0"
        >
          INNOVATE · INTEGRATE · ELEVATE
        </p>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <div ref={progressRef} className="h-full w-0 bg-azure" />
        </div>
      </div>
    </div>
  );
}
