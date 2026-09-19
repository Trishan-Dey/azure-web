"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskLine, prefersReducedMotion } from "@/lib/anim";
import { useInView } from "@/lib/useInView";

const NODES = [
  { id: "obc", label: "FLIGHT COMPUTER", note: "AZURE-OBC", x: 6, y: 38 },
  { id: "eps", label: "EPS / POWER", note: "BUS", x: 20, y: 30 },
  { id: "adcs", label: "ADCS / ATTITUDE", note: "MAG · SUN", x: 20, y: 56 },
  { id: "tele", label: "TELEMETRY", note: "CUSTOM PIPE", x: 34, y: 34 },
  { id: "sx", label: "SX1278 LoRa", note: "433 MHz", x: 50, y: 26 },
  { id: "gs", label: "GROUND STATION", note: "ARDUINO NANO", x: 62, y: 42 },
  { id: "be", label: "BACKEND", note: "STORE", x: 72, y: 26 },
  { id: "db", label: "MISSION DASHBOARD", note: "LIVE", x: 84, y: 40 },
] as const;

const LINKS: [string, string][] = [
  ["obc", "eps"],
  ["obc", "adcs"],
  ["obc", "tele"],
  ["tele", "sx"],
  ["sx", "gs"],
  ["gs", "be"],
  ["be", "db"],
] as const;

const nodeById = (id: string) => NODES.find((n) => n.id === id)!;
const px = (v: number) => `${v}%`;

export default function SystemArchitecture() {
  const { ref, inView } = useInView<HTMLElement>();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion() || !inView) return;
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-space py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="chapter-label mb-4 text-azure/70">SYSTEM ARCHITECTURE</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              <MaskLine>Ground-to-</MaskLine>
              <MaskLine className="text-azure">space</MaskLine>
              <MaskLine>chain.</MaskLine>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">
            One closed loop — from a lunchbox-sized satellite in orbit to a dashboard a
            room of students reads in real time.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden border border-white/10 bg-midnight/40 p-4 sm:p-8">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="relative z-10 grid min-h-[420px] sm:min-h-[520px]">
            {NODES.map((n) => (
              <div
                key={n.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 border border-white/10 bg-space px-3 py-2 text-center"
                style={{ left: px(n.x), top: px(n.y) }}
              >
                <p className="whitespace-nowrap text-[0.6rem] font-bold tracking-[0.18em] text-white">
                  {n.label}
                </p>
                <p className="whitespace-nowrap text-[0.5rem] tracking-[0.16em] text-azure/70">
                  {n.note}
                </p>
              </div>
            ))}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {LINKS.map(([a, b], i) => {
                const A = nodeById(a);
                const B = nodeById(b);
                return (
                  <line
                    key={i}
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    stroke="rgba(0,180,255,0.45)"
                    strokeWidth="0.12"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
