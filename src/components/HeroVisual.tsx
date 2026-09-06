"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  tw: number;
};

/**
 * Lightweight zero-dependency hero visual: drifting starfield with an
 * abstract orbiting satellite rendered in Canvas 2D. Responds subtly to
 * pointer movement via parallax offset.
 */
export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const render = () => {
      const { innerWidth: W, innerHeight: H } = window;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      return { W, H };
    };

    let { W, H } = render();
    const onResize = () => {
      ({ W, H } = render());
    };
    window.addEventListener("resize", onResize);

    // starfield
    const stars: Particle[] = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.00004,
      vy: (Math.random() - 0.5) * 0.00004,
      tw: Math.random() * Math.PI * 2,
    }));

    // orbit configuration
    const orbits = [
      { radius: 0.16, rot: 0, segs: 60, dash: 6 },
      { radius: 0.24, rot: 0.6, segs: 70, dash: 4 },
      { radius: 0.33, rot: 1.2, segs: 84, dash: 8 },
    ];

    const onPointer = (e: PointerEvent) => {
      pointer.current.x = e.clientX / W - 0.5;
      pointer.current.y = e.clientY / H - 0.5;
    };
    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2 + pointer.current.x * 14;
      const cy = H / 2 + pointer.current.y * 14;

      // stars
      for (const s of stars) {
        const sx = ((s.x + (reduced.current ? 0 : s.vx * t * 1000)) % 1) * W;
        const sy = ((s.y + (reduced.current ? 0 : s.vy * t * 1000)) % 1) * H;
        const alpha = 0.35 + 0.45 * Math.abs(Math.sin(s.tw + t * 0.6));
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      // orbit rings
      const baseR = Math.min(W, H) * 0.34;
      ctx.strokeStyle = "rgba(18,107,255,0.45)";
      ctx.lineWidth = 1;
      for (let oi = 0; oi < orbits.length; oi++) {
        const orb = orbits[oi];
        const elA = 1;
        ctx.beginPath();
        for (let i = 0; i <= orb.segs; i++) {
          const a = (i / orb.segs) * Math.PI * 2;
          const r = baseR * orb.radius;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r * elA;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        if (oi % 2 === 1) {
          ctx.setLineDash([orb.dash, 6]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // satellite: rotating around inner orbit with trailing glow
      const satR = baseR * orbits[0].radius;
      const satA = reduced.current ? 0.6 : t * 0.5;
      const satX = cx + Math.cos(satA) * satR;
      const satY = cy + Math.sin(satA) * satR * 1;

      // body
      const satSize = Math.min(W, H) * 0.045;
      ctx.save();
      ctx.translate(satX, satY);
      ctx.rotate(satA + Math.PI / 4);
      ctx.shadowColor = "rgba(18,107,255,0.7)";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "#9aa7bd";
      ctx.fillRect(-satSize, -satSize, satSize * 2, satSize * 2);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#126bff";
      ctx.fillRect(-satSize * 0.9, -satSize * 0.9, satSize * 1.8, satSize * 0.3);
      ctx.fillStyle = "#071329";
      ctx.fillRect(-satSize * 0.9, -satSize * 0.9, satSize * 0.6, satSize * 1.8);
      ctx.restore();

      // solar panel arms (static offset perpendicular)
      const px = Math.cos(satA + Math.PI / 2);
      const py = Math.sin(satA + Math.PI / 2);
      const armLen = satSize * 2.1;
      for (const dir of [-1, 1]) {
        ctx.strokeStyle = "#9aa7bd";
        ctx.lineWidth = Math.max(1, satSize * 0.15);
        ctx.beginPath();
        ctx.moveTo(satX, satY);
        ctx.lineTo(satX + px * dir * armLen, satY + py * dir * armLen);
        ctx.stroke();
        // panel
        ctx.save();
        ctx.translate(satX + px * dir * (armLen + satSize * 0.6), satY + py * dir * (armLen + satSize * 0.6));
        ctx.rotate(satA + Math.PI / 4);
        ctx.fillStyle = "#126bff";
        ctx.fillRect(-satSize * 1.3, -satSize * 0.5, satSize * 2.6, satSize);
        ctx.restore();
      }

      if (!reduced.current) raf = requestAnimationFrame(draw);
    };

    if (!reduced.current) {
      raf = requestAnimationFrame(draw);
      draw(t0);
    } else {
      draw(t0);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}