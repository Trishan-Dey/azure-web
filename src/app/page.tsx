import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";

export const metadata: Metadata = {
  title: "Azure Systems — Where Vision Meets Tech",
  description:
    "Student-led innovation across aerospace, defence-tech and AI. INNOVATE · INTEGRATE · ELEVATE.",
};

export default function Home() {
  return (
    <main className="bg-space text-offwhite">
      <Hero />
      <BrandStatement />
    </main>
  );
}