import Hero from "@/components/sections/Hero";
import ChapterTransition from "@/components/sections/ChapterTransition";
import About from "@/components/sections/About";
import FocusAreas from "@/components/sections/FocusAreas";
import ProjectCubeSat from "@/components/sections/ProjectCubeSat";
import Approach from "@/components/sections/Approach";
import BrandStatement from "@/components/sections/BrandStatement";
import Team from "@/components/sections/Team";
import Journey from "@/components/sections/Journey";
import Rd from "@/components/sections/Rd";
import Updates from "@/components/sections/Updates";
import ContactCta from "@/components/sections/ContactCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-space text-offwhite">
      <Hero />

      <ChapterTransition words={["WHO", "WE", "ARE"]} index={0} />
      <About />

      <ChapterTransition
        words={["WHAT", "WE", "EXPLORE"]}
        index={1}
        bg="bg-midnight"
      />
      <FocusAreas />

      <ProjectCubeSat />

      <Approach />
      <BrandStatement />

      <ChapterTransition
        words={["THE", "PEOPLE", "BEHIND IT."]}
        index={4}
        bg="bg-midnight"
      />
      <Team />

      <Journey />
      <Rd />
      <Updates />

      <ContactCta />
      <Footer />
    </main>
  );
}
