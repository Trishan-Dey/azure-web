import type { Metadata } from "next";
import Rd from "@/components/sections/Rd";

export const metadata: Metadata = {
  title: "R&D — Azure Systems",
  description:
    "The lab — aerospace R&D, AI research and experimental technology. Beyond what we're building today.",
};

export default function RdPage() {
  return (
    <main className="bg-space text-offwhite">
      <Rd />
    </main>
  );
}