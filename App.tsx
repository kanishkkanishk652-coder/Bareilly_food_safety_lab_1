import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Awareness from "./components/Awareness";
import Science from "./components/Science";
import Lab from "./components/Lab";
import Process from "./components/Process";
import Demo from "./components/Demo";
import Action from "./components/Action";
import Education from "./components/Education";
import Story, { Footer } from "./components/Story";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-ivory">
      <a href="#awareness" className="sr-only z-[60] rounded-full bg-lime px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Awareness />
        <Science />
        <Lab />
        <Process />
        <Demo />
        <Action />
        <Education />
        <Story />
      </main>
      <Footer />
    </div>
  );
}
