import { useEffect, useState } from "react";
import { Calculator, Cpu, Droplets, FlaskConical, GitCompare, ListChecks, MonitorCheck, Palette } from "lucide-react";
import { Disclaimer, Reveal, Section } from "./ui";
import { cn } from "../utils/cn";

const STEPS = [
  { icon: ListChecks, t: "Select the sample category", d: "Choose the food type (milk, spice, oil and so on) so the right reference profile is used for comparison." },
  { icon: FlaskConical, t: "Prepare the sample", d: "Prepare a small sample under appropriate supervision, using clean containers and avoiding contamination. Never taste test samples." },
  { icon: Palette, t: "Measure colour response", d: "The TCS3200 reads red, green and blue intensities from the sample inside the dark chamber." },
  { icon: Droplets, t: "Measure pH where relevant", d: "For water-based samples such as milk, the pH probe adds a second parameter. Oils and dry powders are skipped." },
  { icon: Cpu, t: "Send readings to the Arduino", d: "Frequency and voltage signals are converted into numbers inside the microcontroller." },
  { icon: GitCompare, t: "Compare with saved profiles", d: "The readings are compared with reference profiles stored for that sample category, within a tolerance range." },
  { icon: MonitorCheck, t: "Display a screening indication", d: "The LCD, LEDs and buzzer show an experimental indication: within range, or worth confirming at an authorised laboratory." },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((v) => (v + 1) % STEPS.length), 4200);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const Cur = STEPS[active].icon;

  return (
    <Section
      id="process"
      tone="alt"
      eyebrow="04 · How testing works"
      title={
        <>
          Seven steps from <span className="text-lime">sample to signal.</span>
        </>
      }
      intro="The workflow is designed to be simple enough to explain in a classroom, and honest about what it can and cannot tell you."
    >
      {/* desktop / tablet horizontal */}
      <Reveal className="hidden md:block">
        <div className="glass rounded-[2rem] p-8 lg:p-10">
          <div className="relative">
            <div className="absolute left-[7%] right-[7%] top-7 h-0.5 bg-white/10" />
            <div
              className="absolute left-[7%] top-7 h-0.5 bg-gradient-to-r from-mint to-lime shadow-[0_0_14px_rgba(201,243,106,.8)] transition-[width] duration-700"
              style={{ width: `${(active / (STEPS.length - 1)) * 86}%` }}
            />
            <ol className="relative grid grid-cols-7">
              {STEPS.map((s, i) => (
                <li key={s.t} className="flex flex-col items-center text-center">
                  <button
                    onClick={() => pick(i)}
                    aria-current={active === i ? "step" : undefined}
                    aria-label={`Step ${i + 1}: ${s.t}`}
                    className={cn(
                      "grid h-14 w-14 place-items-center rounded-full border-2 transition duration-500",
                      i <= active ? "border-lime bg-forest text-lime" : "border-white/15 bg-ink text-muted hover:border-lime/50",
                      active === i && "scale-110 shadow-[0_0_30px_-2px_rgba(201,243,106,.8)]"
                    )}
                  >
                    <s.icon className="h-6 w-6" aria-hidden />
                  </button>
                  <span className="mt-3 font-mono text-[11px] font-semibold text-lime">0{i + 1}</span>
                  <span className={cn("mt-1 px-1 font-display text-xs font-bold leading-snug transition-colors lg:text-[13px]", active === i ? "text-ivory" : "text-muted")}>
                    {s.t}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div key={active} className="mt-8 flex items-start gap-5 rounded-2xl border border-lime/20 bg-ink/60 p-6" style={{ animation: "fade-up .5s ease both" }}>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-lime/10 text-lime">
              <Cur className="h-7 w-7" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-mint">Step {active + 1} of {STEPS.length}</p>
              <h3 className="mt-1 text-xl font-extrabold">{STEPS[active].t}</h3>
              <p className="mt-2 max-w-3xl text-muted">{STEPS[active].d}</p>
            </div>
            <button onClick={() => setAuto((v) => !v)} className="btn-ghost !min-h-[40px] shrink-0 !px-4 !py-2 text-sm">
              {auto ? "Pause" : "Auto-play"}
            </button>
          </div>
        </div>
      </Reveal>

      {/* mobile vertical */}
      <ol className="relative md:hidden">
        <div className="absolute bottom-6 left-[27px] top-6 w-0.5 bg-gradient-to-b from-lime via-mint to-lime/10" />
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.t} className="relative flex gap-4 pb-6 last:pb-0" delay={i * 40}>
            <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-lime bg-forest text-lime shadow-[0_0_22px_-4px_rgba(201,243,106,.6)]">
              <s.icon className="h-6 w-6" aria-hidden />
            </span>
            <div className="glass min-w-0 flex-1 rounded-2xl p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-lime">Step 0{i + 1}</p>
              <h3 className="mt-1 font-display text-base font-bold leading-snug">{s.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="glass flex gap-4 rounded-2xl p-5">
          <Calculator className="mt-0.5 h-6 w-6 shrink-0 text-lime" aria-hidden />
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            <strong className="text-ivory">This is an educational screening system, not a certified food-testing laboratory.</strong> It can
            suggest that a sample looks different from a reference. It cannot identify what is in the food or confirm that it is safe or unsafe.
          </p>
        </div>
        <Disclaimer compact />
      </Reveal>
    </Section>
  );
}
