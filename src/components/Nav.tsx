"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/components/Logo";

const LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "R&D", href: "/rd" },
  { label: "TEAM", href: "/team" },
  { label: "UPDATES", href: "/updates" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 200 && !open) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const list = menuListRef.current;
    if (!overlay || !list) return;

    if (open) {
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(
        overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" }
      );
      gsap.fromTo(
        list.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power3.out", delay: 0.3 }
      );
    } else {
      gsap.to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
        style={{ transform: hidden && !open ? "translateY(-100%)" : "translateY(0)" }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="group flex items-center" aria-label="Azure Systems home">
            <Logo className="h-9 w-auto drop-shadow-sm transition-transform group-hover:scale-[1.04]" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[0.72rem] font-medium tracking-[0.2em] transition-colors hover:text-white ${
                  isActive(l.href) ? "text-azure" : "text-white/60"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="group ml-2 flex items-center gap-2 border border-white/20 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.2em] text-white transition-all hover:border-azure hover:bg-azure"
            >
              CONTACT
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col justify-between bg-midnight px-8 pb-10 pt-32"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <ul ref={menuListRef} className="flex flex-col gap-3">
          <li className="mb-6">
            <Logo className="h-12 w-auto drop-shadow-md" />
          </li>
          <li>
            <Link
              href="/"
              onClick={closeMenu}
              className={`font-display text-5xl font-bold text-white/85 transition-colors hover:text-azure sm:text-6xl ${
                pathname === "/" ? "text-azure" : ""
              }`}
            >
              HOME
            </Link>
          </li>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={closeMenu}
                className={`font-display text-5xl font-bold transition-colors hover:text-azure sm:text-6xl ${
                  isActive(l.href) ? "text-azure" : "text-white/85"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="font-display text-5xl font-bold text-azure sm:text-6xl"
            >
              CONTACT →
            </Link>
          </li>
        </ul>
        <p className="chapter-label text-white/40">INNOVATE · INTEGRATE · ELEVATE</p>
      </div>
    </>
  );
}