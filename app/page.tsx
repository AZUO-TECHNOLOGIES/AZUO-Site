import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { PhilosophyStory } from "./components/PhilosophyStory";
import { BigStatement } from "./components/Statements";
import { Systems } from "./components/Systems";
import { HowWeEngineer } from "./components/HowWeEngineer";
import { Composer } from "./components/Composer";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

/**
 * Six chapters. No filler. Every scroll reveals a new idea.
 * 01 Hero — "What if the software doesn't exist?"
 * 02 Philosophy — scroll cinema on black
 * 03 Systems — the exhibition
 * 04 How We Engineer — process + capabilities + industries, one experience
 *    (+ the Composer: now assemble yours)
 * 05 Only Engineering — the chapter ending
 * 06 The invitation — "The next company shouldn't be built like the last one."
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* 01 */}
        <Hero />

        {/* 02 */}
        <div className="chapter-dark">
          <PhilosophyStory />
          <BigStatement
            lines={[
              { text: "AI isn't the product." },
              { text: "The solution is.", accent: true },
            ]}
          />
        </div>

        {/* 03 */}
        <div className="chapter-grey">
          <Systems />
        </div>

        {/* 04 */}
        <div className="chapter-light">
          <HowWeEngineer />
          <Composer />
        </div>

        {/* 05 + 06 — one continuous dark ending */}
        <div className="chapter-dark">
          <BigStatement
            lines={[
              { text: "No templates.", muted: true },
              { text: "No agencies.", muted: true },
              { text: "No outsourcing.", muted: true },
              { text: "Only engineering.", accent: true },
            ]}
          />
          <Contact />
        </div>
      </main>
      <div className="chapter-dark">
        <Footer />
      </div>
    </>
  );
}
