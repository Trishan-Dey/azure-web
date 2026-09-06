"use client";

type LenisGlobal = {
  scrollTo: (target: string | number, options?: { offset?: number }) => void;
};

export function scrollToSection(id: string, offset = 0) {
  const lenis = (window as unknown as { __lenis?: LenisGlobal }).__lenis;
  if (lenis) {
    lenis.scrollTo(id, { offset });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function scrollToTop() {
  const lenis = (window as unknown as { __lenis?: LenisGlobal }).__lenis;
  if (lenis) {
    lenis.scrollTo(0);
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}