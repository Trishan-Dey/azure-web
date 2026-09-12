import type { Metadata } from "next";
import Updates from "@/components/sections/Updates";

export const metadata: Metadata = {
  title: "Updates — Azure Systems",
  description:
    "Inside the build — development notes, stories and raw logs from the Azure Systems lab.",
};

export default function UpdatesPage() {
  return (
    <main className="bg-space text-offwhite">
      <Updates />
    </main>
  );
}