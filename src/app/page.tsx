import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import Commitment from "@/components/sections/Commitment";
import CurrentMission from "@/components/sections/CurrentMission";

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
      <Commitment />
      <CurrentMission />
    </main>
  );
}
