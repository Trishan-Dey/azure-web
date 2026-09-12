import type { Metadata } from "next";
import ChapterTransition from "@/components/sections/ChapterTransition";
import About from "@/components/sections/About";
import Approach from "@/components/sections/Approach";
import Journey from "@/components/sections/Journey";

export const metadata: Metadata = {
  title: "About — Azure Systems",
  description:
    "Who we are — a student-led innovation startup focused on aerospace, defence-tech and artificial intelligence. How we work, and where we're going.",
};

export default function AboutPage() {
  return (
    <main className="bg-space text-offwhite">
      <ChapterTransition words={["WHO", "WE", "ARE"]} index={0} />
      <About />
      <Approach />
      <Journey />
    </main>
  );
}