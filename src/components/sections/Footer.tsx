"use client";

import { scrollToSection } from "@/lib/scroll";
import Logo from "@/components/Logo";

const PAGES = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "R&D", id: "rd" },
  { label: "Team", id: "team" },
  { label: "Updates", id: "updates" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-space py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="bp-grid absolute inset-0 opacity-20 [mask-image:linear-gradient(to_top,black_20%,transparent_80%)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <Logo className="h-9 w-auto drop-shadow-sm" />
            </div>
            <p className="mt-4 text-sm text-white/50">Where Vision Meets Tech.</p>
            <p className="mt-6 font-mono text-xs tracking-[0.2em] text-azure">
              INNOVATE · INTEGRATE · ELEVATE
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="chapter-label mb-6 text-white/40">PAGES</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
              {PAGES.map((p) => (
                <li key={p.label}>
                  <button
                    onClick={() => scrollToSection(p.id)}
                    className="text-sm text-white/70 transition-colors hover:text-azure"
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="chapter-label mb-6 text-white/40">CONNECT</p>
            <a
              href="https://www.instagram.com/azure_systems"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-azure"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.4 5.6 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
              </svg>
              azure_systems
            </a>
            <a
              href="mailto:azuresystems2@gmail.com"
              className="mt-3 flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-azure"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4.24-8 5-8-5V6.5l8 5 8-5z" />
              </svg>
              azuresystems2@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Azure Systems. All rights reserved.
          </p>
          <p className="font-mono text-[0.6rem] tracking-[0.3em] text-white/30">
            BUILT BY STUDENTS · DRIVEN BY CURIOSITY
          </p>
        </div>
      </div>
    </footer>
  );
}
