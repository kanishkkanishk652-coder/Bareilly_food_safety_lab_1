import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Cpu, Droplets, Palette } from "lucide-react";
import { ArduinoBoard } from "./illustrations";
import { Reveal, Section } from "./ui";

function wavePath(period: number, amp: number, phase: number, mid = 60) {
  const pts: string[] = [];
  for (let x = 0; x <= 800; x += 5) {
    const y = mid + amp * Math.sin(((x + phase) / period) * Math.PI * 2);
    pts.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function SciCard({
  n,
  icon,
  kicker,
  title,
  visual,
  children,
  flip,
}: {
  n: string;
  icon: ReactNode;
  kicker: string;
  title: string;
  visual: ReactNode;
  children: ReactNode;
  flip?: boolean;
}) {
  return (
    <Reveal>
      <article className="glass relative overflow-hidden rounded-[2rem]">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(201,243,106,0.12),transparent_65%)]" />
        <div className="relative grid gap-0 lg:grid-cols-2">
          <div className={`fine-grid relative flex min-w-0 flex-col justify-center gap-4 border-b border-lime/10 bg-ink/40 p-4 sm:p-8 lg:border-b-0 ${flip ? "lg:order-2 lg:border-l" : "lg:border-r"}`}>
            {visual}
          </div>
          <div className="min-w-0 p-5 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime/10 text-lime">{icon}</span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-mint">
                {n} · {kicker}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h3>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">{children}</div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Li({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
      <span>{children}</span>
    </li>
  );
}

function RgbVisual() {
  const paths = useMemo(
    () => ({ r: wavePath(200, 26, 0), g: wavePath(100, 18, 30), b: wavePath(200, 22, 100) }),
    []
  );
  return (
    <>
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted">Visible light spectrum (illustration)</p>
        <div
          className="h-6 rounded-full shadow-[0_0_30px_-6px_rgba(120,214,163,.5)]"
          style={{ background: "linear-gradient(90deg,#7a00ff,#3b3bff,#00b7ff,#00e08a,#b6ff00,#ffe600,#ff9500,#ff2a00)" }}
        />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
          <span>~400 nm</span>
          <span>~700 nm</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-lime/15 bg-ink/70 p-3">
        <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
          <span>Colour channel signals</span>
          <span className="text-lime">illustrative</span>
        </div>
        <svg viewBox="0 0 400 120" className="h-28 w-full" preserveAspectRatio="none" role="img" aria-label="Animated illustration of red, green and blue signal waveforms">
          <g stroke="#78D6A3" strokeOpacity=".12">
            {[20, 40, 60, 80, 100].map((y) => (
              <line key={y} x1="0" x2="400" y1={y} y2={y} />
            ))}
          </g>
          <g className="wave-track" fill="none" strokeWidth="2.2" strokeLinecap="round">
            <path d={paths.r} stroke="#ff5a4d" />
            <path d={paths.g} stroke="#4be28a" />
            <path d={paths.b} stroke="#4d8dff" />
          </g>
        </svg>
      </div>

      <div className="grid gap-2.5">
        {[
          { l: "R", c: "#ff5a4d", a: "bar-a" },
          { l: "G", c: "#4be28a", a: "bar-b" },
          { l: "B", c: "#4d8dff", a: "bar-c" },
        ].map((b) => (
          <div key={b.l} className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-bold text-ink" style={{ background: b.c }}>
              {b.l}
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full" style={{ background: b.c, animation: `${b.a} 4.5s ease-in-out infinite`, boxShadow: `0 0 12px ${b.c}` }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const PH_STOPS = [6.6, 4.2, 7.0, 8.4, 10.6, 5.5];

function PhVisual() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PH_STOPS.length), 2600);
    return () => clearInterval(t);
  }, []);
  const ph = PH_STOPS[i];
  const pos = (ph / 14) * 100;
  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Illustrative pH indicator</p>
          <p className="mt-1 font-display text-5xl font-extrabold tabular-nums text-lime text-glow">{ph.toFixed(1)}</p>
        </div>
        <span className="rounded-full border border-lime/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-lime">
          {ph < 6.5 ? "Acidic" : ph > 7.5 ? "Alkaline" : "Near neutral"}
        </span>
      </div>

      <div className="relative pt-9">
        <div className="absolute top-0 -translate-x-1/2 transition-[left] duration-[1400ms] ease-in-out" style={{ left: `${Math.min(97, Math.max(3, pos))}%` }}>
          <div className="rounded-md bg-lime px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">pH {ph.toFixed(1)}</div>
          <div className="mx-auto h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-lime" />
        </div>
        <div
          className="h-7 rounded-full ring-1 ring-white/10"
          style={{ background: "linear-gradient(90deg,#e5303f 0%,#f2702b 18%,#f5c518 34%,#9bd83c 46%,#3ec97b 52%,#2bb3a8 62%,#3b7bdc 78%,#6c4bd8 90%,#7a2fb8 100%)" }}
        />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
          {Array.from({ length: 15 }, (_, k) => (
            <span key={k} className={k === 7 ? "font-bold text-lime" : ""}>
              {k}
            </span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-[7fr_1fr_7fr] gap-1 text-center font-mono text-[10px] uppercase tracking-wider">
          <span className="rounded-lg bg-[#e5303f]/15 py-1.5 text-[#ff8a8f]">Acidic</span>
          <span className="rounded-lg bg-mint/15 py-1.5 text-mint">N</span>
          <span className="rounded-lg bg-[#6c4bd8]/20 py-1.5 text-[#b9a4ff]">Alkaline</span>
        </div>
      </div>
    </>
  );
}

function ArduinoVisual() {
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-lime/15 bg-ink/70 p-3 sm:p-5">
        <ArduinoBoard className="h-auto w-full" />
      </div>
      <ol className="grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-wider sm:grid-cols-4">
        {["Read sensors", "Convert signals", "Compare profile", "Show / send"].map((s, k) => (
          <li key={s} className="flex items-center gap-2 rounded-xl border border-white/5 bg-panel/60 px-2.5 py-2 text-ivory/90">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-[10px] font-bold text-ink">{k + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </>
  );
}

export default function Science() {
  return (
    <Section
      id="science"
      tone="alt"
      eyebrow="02 · Science & technology"
      title={
        <>
          From a Tiny Sample to <span className="text-lime">Useful Signals.</span>
        </>
      }
      intro="Three building blocks turn a pinch of food, or a drop of liquid, into numbers that can be compared against a reference."
    >
      <div className="grid gap-6 sm:gap-8">
        <SciCard n="Signal 01" kicker="Colour" icon={<Palette className="h-5 w-5" />} title="RGB Colour Detection" visual={<RgbVisual />}>
          <p>
            Colour is one of the first things people judge in food, but the eye is easily fooled. The <strong className="text-ivory">TCS3200</strong> colour
            sensor measures colour objectively.
          </p>
          <ul className="space-y-2.5">
            <Li>
              It holds an 8×8 array of 64 photodiodes: 16 each with red, green and blue filters, plus 16 unfiltered (clear).
            </Li>
            <Li>A current-to-frequency converter outputs a square wave. Brighter light in that channel means a higher frequency.</Li>
            <Li>The Arduino selects each filter in turn, measures the frequency, and builds a three-number R, G, B profile for the sample.</Li>
            <Li>Controlled lighting inside the sample chamber keeps readings more repeatable.</Li>
          </ul>
        </SciCard>

        <SciCard n="Signal 02" kicker="Chemistry" icon={<Droplets className="h-5 w-5" />} title="pH Analysis" visual={<PhVisual />} flip>
          <p>
            pH describes how acidic or alkaline a water-based sample is, on a scale from 0 to 14. Milk, for example, is normally close to neutral
            but slightly acidic, and spoilage or additives can shift it.
          </p>
          <ul className="space-y-2.5">
            <Li>A glass-electrode <strong className="text-ivory">pH probe</strong> generates a tiny voltage, roughly 59 mV per pH unit at 25 °C.</Li>
            <Li>The <strong className="text-ivory">sensor module</strong> amplifies and conditions that signal into a 0–5 V analog output the Arduino can read.</Li>
            <Li>Calibration with buffer solutions (commonly pH 4.0 and 7.0) is needed for meaningful readings.</Li>
            <Li>pH is only meaningful for water-based samples, so it is not used for oils or dry powders unless they are dissolved.</Li>
          </ul>
        </SciCard>

        <SciCard n="Signal 03" kicker="Computation" icon={<Cpu className="h-5 w-5" />} title="Arduino Processing" visual={<ArduinoVisual />}>
          <p>
            The <strong className="text-ivory">Arduino Uno R3</strong>, built around the ATmega328P microcontroller, is the brain of the Micro-Lab. It
            gathers every measurement and decides what to show.
          </p>
          <ul className="space-y-2.5">
            <Li>Its 10-bit analog-to-digital converter turns the pH module's voltage into a number from 0 to 1023.</Li>
            <Li>Digital pins read the TCS3200's frequency output and control its filter and scaling pins.</Li>
            <Li>Readings are compared with reference profiles saved in the code, then shown on the 16×2 I2C LCD and signalled by LEDs and a buzzer.</Li>
            <Li>The same readings can be streamed over USB serial to a Python companion dashboard for logging and plotting.</Li>
          </ul>
        </SciCard>
      </div>
    </Section>
  );
}
