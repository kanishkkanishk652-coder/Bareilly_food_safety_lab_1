import { useState } from "react";
import { Bell, Cpu, Droplets, FlaskConical, Monitor, Palette, Terminal } from "lucide-react";
import { ExplodedView } from "./illustrations";
import { Disclaimer, Reveal, Section } from "./ui";
import { cn } from "../utils/cn";

const LAYERS = [
  {
    name: "Interface lid",
    sub: "Layer 1",
    parts: [
      { icon: Monitor, t: "16×2 I2C LCD", d: "Two lines of 16 characters show the reading and screening indication. The I2C backpack needs only two data wires (SDA and SCL)." },
      { icon: Bell, t: "Buzzer & indicator LEDs", d: "Quick visual and audible cues: for example, a green LED when a reading is within the saved reference range and a buzzer when it is not." },
    ],
  },
  {
    name: "Sensor deck",
    sub: "Layer 2",
    parts: [
      { icon: Palette, t: "TCS3200 RGB colour sensor", d: "Reads the red, green and blue light reflected from the sample, with onboard white LEDs for consistent illumination." },
      { icon: FlaskConical, t: "Sample testing chamber", d: "A dark, enclosed bay that blocks stray light so colour readings are more repeatable from one sample to the next." },
      { icon: Droplets, t: "pH sensor module & probe", d: "A glass probe plus a signal-conditioning board that outputs an analog voltage proportional to the sample's pH." },
    ],
  },
  {
    name: "Controller",
    sub: "Layer 3",
    parts: [
      { icon: Cpu, t: "Arduino Uno R3", d: "The ATmega328P-based board that reads every sensor, runs the comparison logic, drives the LCD, LEDs and buzzer, and talks to the PC over USB." },
    ],
  },
  {
    name: "Power & link",
    sub: "Layer 4",
    parts: [
      { icon: Terminal, t: "Python companion dashboard", d: "A desktop program that receives readings through USB serial for live display and logging. It runs on a computer, not on this website." },
    ],
  },
];

export default function Lab() {
  const [active, setActive] = useState(1);
  const layer = LAYERS[active];

  return (
    <Section
      id="microlab"
      eyebrow="03 · The prototype"
      title={
        <>
          Our Portable <span className="text-lime">Micro-Lab.</span>
        </>
      }
      intro="A hand-sized, low-cost build that brings colour and pH sensing together in one enclosure. Select a layer of the exploded view to see what lives inside."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] p-3 sm:p-6">
            <div className="fine-grid pointer-events-none absolute inset-0 opacity-70" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,243,106,0.14),transparent_65%)]" />
            <div className="relative">
              <ExplodedView active={active} onSelect={setActive} />
              <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-muted">Exploded isometric view · tap a layer</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div role="tablist" aria-label="Micro-Lab layers" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LAYERS.map((l, i) => (
              <button
                key={l.name}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "min-h-[56px] rounded-2xl border px-3 py-2 text-left transition",
                  active === i ? "border-lime bg-lime/10 shadow-[0_0_24px_-8px_rgba(201,243,106,.7)]" : "border-white/10 bg-panel/50 hover:border-lime/40"
                )}
              >
                <span className="block font-mono text-[10px] uppercase tracking-widest text-mint">{l.sub}</span>
                <span className="block font-display text-sm font-bold text-ivory">{l.name}</span>
              </button>
            ))}
          </div>

          <div role="tabpanel" key={active} className="mt-4 space-y-3">
            {layer.parts.map(({ icon: Icon, t, d }) => (
              <div key={t} className="glass flex gap-4 rounded-2xl p-4 sm:p-5" style={{ animation: "none" }}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ivory">{t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              </div>
            ))}
          </div>

          <Disclaimer className="mt-6" compact />
        </Reveal>
      </div>

      {/* all components */}
      <Reveal className="mt-14">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-muted">Component checklist</h3>
        <ul className="mt-4 grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {["Arduino Uno R3", "TCS3200 RGB colour sensor", "pH sensor module and probe", "16×2 I2C LCD", "Sample testing chamber", "Buzzer and indicator LEDs", "Python-based companion dashboard"].map(
            (c, i) => (
              <li key={c} className="flex items-center gap-3 rounded-xl border border-white/5 bg-panel/50 px-4 py-3 text-sm text-ivory/90">
                <span className="font-mono text-[11px] text-lime">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            )
          )}
        </ul>
      </Reveal>
    </Section>
  );
}
