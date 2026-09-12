"use client";

import { MaskLine } from "@/lib/anim";
import { useInView } from "@/lib/useInView";
import Link from "next/link";
import HeroVisual from "@/components/HeroVisual";
import Logo from "@/components/Logo";

export default function Hero() {
  const { ref: visualRef, inView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={visualRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-space"
    >
      {/* Background starfield / gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(18,107,255,0.18) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(6,69,197,0.15) 0%, transparent 40%)",
          }}
        />
        <div className="bp-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      {/* Interactive lightweight visual */}
      <div className="pointer-events-none absolute inset-0">
        {inView && (
          <div className="h-full w-full">
            <HeroVisual />
          </div>
        )}
      </div>

      {/* Statement */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="mb-6 drop-shadow-md">
          <Logo className="h-10 w-auto sm:h-12" />
        </p>
        <h1 className="font-display text-[11vw] font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-[9vw] lg:text-[7.5vw]">
          <MaskLine>Where</MaskLine>
          <MaskLine className="text-gradient-azure">Vision</MaskLine>
          <MaskLine>Meets Tech.</MaskLine>
        </h1>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
          “Student-led innovation across aerospace, defence-tech and AI.”
        </p>
        <Link
          href="/about"
          className="group mt-12 flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-white/70 transition-colors hover:text-azure"
        >
          EXPLORE
          <span className="inline-block h-px w-10 bg-current transition-all group-hover:w-14" />
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-12 w-px animate-pulse bg-gradient-to-b from-azure to-transparent" />
      </div>
    </section>
  );
}