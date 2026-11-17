import { BookOpen, FlaskConical, GraduationCap, Rocket, Target, Users, Wallet } from "lucide-react";
import { Disclaimer, Reveal, Section } from "./ui";
import { NAV } from "./Nav";
import { cn } from "../utils/cn";

const STORY = [
  { icon: Target, t: "Why we built it", d: "Food adulteration is a topic everyone has heard of and few can check. We wanted to turn that worry into curiosity: what can we measure, and what do those measurements really mean?" },
  { icon: FlaskConical, t: "The problem it addresses", d: "Laboratory testing is accurate but not always accessible for quick, everyday questions. There is room for low-cost tools that help people learn and decide when to seek proper testing." },
  { icon: Wallet, t: "Affordable technology", d: "Open hardware like Arduino and common sensors put basic measurement within reach of classrooms and community groups, making science hands-on rather than distant." },
  { icon: GraduationCap, t: "Educational uses", d: "Demonstrating pH, colour and sensor data in science classes, exhibitions and awareness drives, with clear honesty about the limits of screening." },
  { icon: Users, t: "Community uses", d: "A conversation starter for awareness sessions in Bareilly that pairs the device with label-reading skills and pointers to official channels." },
  { icon: Rocket, t: "Where it could go", d: "More sensors, careful calibration, and validation against laboratory methods could make future versions more informative, always as a screening aid." },
];

const ROADMAP = [
  { phase: "Foundation", t: "Idea & research", d: "Studying common adulteration concerns and which simple parameters, such as colour and pH, could act as screening clues.", status: "Done" },
  { phase: "Prototype", t: "Portable micro-lab build", d: "Arduino Uno R3 with TCS3200, pH module, I2C LCD, buzzer, LEDs and a Python companion dashboard.", status: "Built" },
  { phase: "Next", t: "Calibration & reference profiles", d: "Repeatable calibration routines, plus carefully documented reference profiles for each sample category.", status: "Planned" },
  { phase: "Next", t: "Comparison with laboratory methods", d: "Checking prototype readings against results from authorised laboratories to understand accuracy and limits.", status: "Planned" },
  { phase: "Future", t: "Workshops & community sessions", d: "Awareness sessions combining the device, label-reading skills and guidance on official reporting.", status: "Idea" },
  { phase: "Future", t: "Wireless & multilingual dashboard", d: "Bluetooth or Wi-Fi data, additional sensors such as conductivity or temperature, and a Hindi interface.", status: "Idea" },
];

const tone: Record<string, string> = {
  Done: "bg-lime text-ink",
  Built: "bg-lime text-ink",
  Planned: "bg-mint/20 text-mint border border-mint/40",
  Idea: "bg-white/5 text-muted border border-white/15",
};

export default function Story() {
  return (
    <Section
      id="story"
      eyebrow="08 · Project story & vision"
      title={
        <>
          A student idea with a <span className="text-lime">community purpose.</span>
        </>
      }
      intro="The Integrated Food Safety Micro-Lab started as a question from students in Bareilly: can affordable technology help people understand food safety better?"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STORY.map(({ icon: Icon, t, d }, i) => (
          <Reveal key={t} delay={(i % 3) * 80}>
            <div className="glass glass-hover h-full rounded-3xl p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime/10 text-lime"><Icon className="h-6 w-6" aria-hidden /></span>
              <h3 className="mt-4 font-display text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* roadmap */}
      <Reveal className="mt-16 sm:mt-24">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-lime" aria-hidden />
          <h3 className="text-2xl font-extrabold sm:text-3xl">Roadmap</h3>
        </div>
        <p className="mt-2 max-w-2xl text-muted">Our direction of travel. Items marked Planned or Idea are intentions, not promises or completed work.</p>
      </Reveal>

      <ol className="relative mt-8 grid gap-5 md:grid-cols-2 md:gap-x-12">
        <div className="absolute bottom-3 left-[19px] top-3 w-px bg-gradient-to-b from-lime via-mint/50 to-transparent md:left-1/2" aria-hidden />
        {ROADMAP.map((r, i) => (
          <Reveal as="li" key={r.t} delay={60} className={cn("relative pl-14 md:pl-0", i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:mt-12")}>
            <span
              className={cn(
                "absolute left-[10px] top-6 h-5 w-5 rounded-full border-4 border-ink",
                r.status === "Done" || r.status === "Built" ? "bg-lime shadow-[0_0_18px_rgba(201,243,106,.9)]" : "bg-mint/50",
                i % 2 === 0 ? "md:left-auto md:-right-[34px]" : "md:-left-[34px]"
              )}
              aria-hidden
            />
            <div className="glass rounded-3xl p-5 sm:p-6">
              <div className={cn("flex flex-wrap items-center gap-2", i % 2 === 0 && "md:justify-end")}>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">{r.phase}</span>
                <span className={cn("rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest", tone[r.status])}>{r.status}</span>
              </div>
              <h4 className="mt-2 font-display text-lg font-bold">{r.t}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.d}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-lime/10 bg-gradient-to-b from-transparent to-forest/60 px-4 pb-10 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-extrabold">INTEGRATED FOOD SAFETY <span className="text-lime">MICRO-LAB</span></p>
            <p className="mt-1 text-sm italic text-muted">Low-Cost Portable Micro-Lab for Multi-Parametric Food Adulteration Detection</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">An independent student initiative from Bareilly, Uttar Pradesh, India. Not affiliated with, endorsed by, or acting for FSSAI, UP FSDA or any government body.</p>
          </div>
          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-widest text-lime">Explore</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {NAV.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="inline-flex min-h-[40px] items-center text-sm text-ivory/80 hover:text-lime">{n.label}</a></li>
              ))}
              <li><a href="#resources" className="inline-flex min-h-[40px] items-center text-sm text-ivory/80 hover:text-lime">Official resources</a></li>
            </ul>
          </nav>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-lime">Official sites</p>
            <ul className="mt-3 space-y-1">
              {[["FSSAI", "https://fssai.gov.in/"], ["FSSAI Consumer Grievance", "https://foscos.fssai.gov.in/consumergrievance/"], ["UP Food Safety & Drug Administration", "https://fsda.up.gov.in/"]].map(([l, h]) => (
                <li key={h}><a href={h} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center text-sm text-ivory/80 hover:text-lime">{l} ↗</a></li>
              ))}
            </ul>
          </div>
        </div>
        <Disclaimer className="mt-10" compact />
        <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-widest text-muted">
          © {new Date().getFullYear()} Integrated Food Safety Micro-Lab · Bareilly, India · Educational prototype
        </p>
      </div>
    </footer>
  );
}
