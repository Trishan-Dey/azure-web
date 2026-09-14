import type { Metadata } from "next";
import ChapterTransition from "@/components/sections/ChapterTransition";
import CurrentMission from "@/components/sections/CurrentMission";
import FlightData from "@/components/sections/FlightData";

export const metadata: Metadata = {
  title: "Project CubeSat — Azure Systems",
  description:
    "Flagship student CubeSat. Hardware, software, ground station, telemetry. A lunchbox-sized satellite and everything that keeps it alive.",
};

export default function CubeSatPage() {
  return (
    <main className="bg-space text-offwhite">
      <ChapterTransition
        words={["PROJECT", "CUBESAT"]}
        index={2}
        bg="bg-midnight"
      />
      <CurrentMission />
      <FlightData />
    </main>
  );
}
