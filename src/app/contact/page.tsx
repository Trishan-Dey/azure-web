import type { Metadata } from "next";
import ContactCta from "@/components/sections/ContactCta";

export const metadata: Metadata = {
  title: "Contact — Azure Systems",
  description:
    "Have an idea? Let's build. Start a conversation with the Azure Systems team.",
};

export default function ContactPage() {
  return (
    <main className="bg-space text-offwhite">
      <ContactCta />
    </main>
  );
}