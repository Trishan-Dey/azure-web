import type { Metadata } from "next";
import ChapterTransition from "@/components/sections/ChapterTransition";
import Team from "@/components/sections/Team";
import TeamGrid from "@/components/sections/TeamGrid";

export const metadata: Metadata = {
  title: "Team — Azure Systems",
  description:
    "The people behind it — four students building an engineering collective. Built by students, driven by curiosity.",
};

export default function TeamPage() {
  return (
    <main className="bg-space text-offwhite">
      <ChapterTransition
        words={["THE", "PEOPLE", "BEHIND IT."]}
        index={4}
        bg="bg-midnight"
      />
      <Team />
      <TeamGrid />
    </main>
  );
}