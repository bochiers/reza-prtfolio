import { MotionConfig } from "framer-motion";
import { Hero } from "@/components/hero";
import { SiteNav } from "@/components/site-nav";
import { About } from "@/sections/about";
import { Experience } from "@/sections/experience";
import { Spotlight } from "@/sections/spotlight";
import { Skills } from "@/sections/skills";
import { Organization } from "@/sections/organization";
import { Contact } from "@/sections/contact";
import { Footer } from "@/sections/footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#tentang" className="skip-link">
        Lewati ke konten
      </a>
      <div id="top" />
      <SiteNav />
      <Hero />
      <main>
        <About />
        <Experience />
        <Spotlight />
        <Skills />
        <Organization />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
