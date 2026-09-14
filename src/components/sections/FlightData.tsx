"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskLine, prefersReducedMotion } from "@/lib/anim";
import { useInView } from "@/lib/useInView";

const CHANNELS = [
  {
    id: "downlink",
    band: "UHF 437.5 MHz",
    name: "Cubesat Downlink",
    sig: "TELEMETRY BROADCAST",
    freq: "437.5 MHz",
    duty: "DUTY · 5 s EVERY 30 s",
    mode: "GMSK 9600 bps",
    direction: "⬇ SPACE → GROUND",
  },
  {
    id: "uplink",
    band: "UHF 435.0 MHz",
    name: "Cubesat Uplink",
    sig: "COMMAND UPLINK",
    freq: "435.0 MHz",
    duty: "DUTY · 2 s EVERY 30 s",
    mode: "GMSK 1200 bps",
    direction: "⬆ GROUND → SPACE",
  },
  {
    id: "ctl",
    band: "VHF 145.9 MHz",
    name: "Mission Control",
    sig: "SHELL-POSITION TELEMETRY",
    freq: "145.9 MHz",
    duty: "DUTY · CONTINUOUS WHILE TRACKING",
    mode: "PSK 4800 bps",
    direction: "⬇ GROUND SEGMENT",
  },
];

export default function FlightData() {
  const ref = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const { ref: wrapRef, inView } = useInView<HTMLElement>();
  const [active, setActive] = useState(CHANNELS[0]);

  useEffect(() => {
    if (!ref.current || !inView || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>("[data-channel]")
        .forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%" },
            }
          );
        });
    }, ref);
    return () => ctx.revert();
  }, [inView]);

  return (
    <section ref={ref} className="bg-space py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-azure/70">DOWNLINK ROOM</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              <MaskLine>Flight</MaskLine>
              <MaskLine className="text-azure">data.</MaskLine>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">
            Live reads from the ground station and the satellite in the sky — the bits, the
            bandscars, and the ground segment that keeps the loop closed.
          </p>
        </div>

        <div ref={list} className="mt-12 grid gap-2 lg:grid-cols-3">
          {CHANNELS.map((c) => (
            <button
              key={c.id}
              data-channel
              type="button"
              onClick={() => setActive(c)}
              className={`border p-5 text-left transition-colors duration-300 ${
                active.id === c.id
                  ? "border-azure/60 bg-midnight"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <p className="text-xs tracking-[0.2em] text-azure/70">{c.band}</p>
              <p className="mt-3 font-display text-lg font-bold uppercase tracking-tight text-white">
                {c.name}
              </p>
              <p className="mt-1 text-[0.68rem] tracking-[0.2em] text-white/45">{c.sig}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden border border-white/10 bg-midnight px-6 py-8 sm:px-10">
          <dl className="grid gap-x-8 gap-y-5 md:grid-cols-2">
            <div>
              <dt className="text-[0.68rem] tracking-[0.24em] text-azure/70">SELECTED CHANNEL</dt>
              <dd className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-white">
                {active.name}
              </dd>
            </div>
            <div className="md:text-right">
              <dt className="text-[0.68rem] tracking-[0.24em] text-azure/70">BAND</dt>
              <dd className="mt-2 font-mono text-xl font-bold text-azure">{active.freq}</dd>
            </div>
            <div>
              <dt className="text-[0.68rem] tracking-[0.24em] text-azure/70">LINK MODULATION</dt>
              <dd className="mt-2 text-sm font-semibold tracking-[0.14em] text-white">{active.mode}</dd>
            </div>
            <div className="md:text-right">
              <dt className="text-[0.68rem] tracking-[0.24em] text-azure/70">DIRECTION</dt>
              <dd className="mt-2 text-sm font-semibold tracking-[0.14em] text-white">{active.direction}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-4 border-l-2 border-azure pl-4 text-[0.7rem] leading-relaxed tracking-[0.18em] text-white/40">
          {active.duty} — ALL CHANNELS ARE DOMESTIC UHF/VHF LICENCE-COMPLIANT EDUCATIONAL
          AMATEUR LINKS.
        </div>
      </div>
    </section>
  );
}
