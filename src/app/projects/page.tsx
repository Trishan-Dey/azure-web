import type { Metadata } from "next";
import ChapterTransition from "@/components/sections/ChapterTransition";
import FocusAreas from "@/components/sections/FocusAreas";
import ProjectCubeSat from "@/components/sections/ProjectCubeSat";

export const metadata: Metadata = {
  title: "Projects — Azure Systems",
  description:
    "What we explore — aerospace, defence-tech and AI. Our first major initiative: Project CubeSat.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-space text-offwhite">
      <ChapterTransition
        words={["WHAT", "WE", "EXPLORE"]}
        index={1}
        bg="bg-midnight"
      />
      <FocusAreas />
      <ProjectCubeSat />
    </main>
  );
}