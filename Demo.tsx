import { useEffect, useRef, useState } from "react";
import { Activity, Play, RotateCcw } from "lucide-react";
import { Disclaimer, Reveal, Section } from "./ui";
import { cn } from "../utils/cn";

type Sample = {
  id: string;
  name: string;
  rgb: [number, number, number];
  ph: number | null;
  devRgb: [number, number, number];
  devPh: number;
  note: string;
};

const SAMPLES: Sample[] = [
  { id: "milk", name: "Milk (liquid)", rgb: [238, 234, 220], ph: 6.7, devRgb: [-6, -2, 34], devPh: -0.9, note: "Water-based, so pH is meaningful." },
  { id: "turmeric", name: "Turmeric powder", rgb: [222, 168, 38], ph: null, devRgb: [20, 40, -10], devPh: 0, note: "Dry powder: colour only, pH is not measured." },
  { id: "chilli", name: "Red chilli powder", rgb: [186, 46, 30], ph: null, devRgb: [-36, 34, 26], devPh: 0, note: "Dry powder: colour only, pH is not measured." },
  { id: "oil", name: "Edible oil", rgb: [226, 188, 62], ph: null, devRgb: [-28, -34, 46], devPh: 0, note: "Not water-based: colour only." },
  { id: "tea", name: "Brewed tea (pantry)", rgb: [158, 96, 50], ph: 5.2, devRgb: [30, 26, 36], devPh: 1.1, note: "Water-based, so pH is meaningful." },
];

const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
const jitter = (n: number) => (Math.random() - 0.5) * 2 * n;

type Reading = { rgb: [number, number, number]; ph: number | null; within: boolean; mode: "ref" | "dev"; sample: string; t: string };

export default function Demo() {
  const [sampleId, setSampleId] = useState("milk");
  const [mode, setMode] = useState<"ref" | "dev">("ref");
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const [reading, setReading] = useState<Reading | null>(null);
  const [history, setHistory] = useState<Reading[]>([]);
  const timer = useRef<number | null>(null);
  const sample = SAMPLES.find((s) => s.id === sampleId)!;

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const reset = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setState("idle");
    setReading(null);
  };

  const run = () => {
    if (state === "running") return;
    setState("running");
    setReading(null);
    timer.current = window.setTimeout(() => {
      const off = mode === "dev" ? sample.devRgb : [0, 0, 0];
      const rgb = sample.rgb.map((v, i) => clamp(v + off[i] + jitter(5))) as [number, number, number];
      const ph = sample.ph === null ? null : +(sample.ph + (mode === "dev" ? sample.devPh : 0) + jitter(0.07)).toFixed(2);
      const dist = Math.sqrt(rgb.reduce((a, v, i) => a + (v - sample.rgb[i]) ** 2, 0));
      const phOk = ph === null || Math.abs(ph - (sample.ph ?? 0)) <= 0.35;
      const r: Reading = {
        rgb,
        ph,
        within: dist < 22 && phOk,
        mode,
        sample: sample.name,
        t: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };
      setReading(r);
      setHistory((h) => [r, ...h].slice(0, 4));
      setState("done");
    }, 1700);
  };

  const rgbNow = reading?.rgb;
  const lcd1 = reading ? `pH ${reading.ph === null ? "N/A " : reading.ph.toFixed(2)} [SIM]` : state === "running" ? "SCANNING....     " : "READY - SIM MODE ";
  const lcd2 = reading ? `R${String(reading.rgb[0]).padStart(3, "0")} G${String(reading.rgb[1]).padStart(3, "0")} B${String(reading.rgb[2]).padStart(3, "0")}` : "R--- G--- B---   ";

  return (
    <Section
      id="demo"
      eyebrow="05 · Interactive demonstration"
      title={
        <>
          Try the Micro-Lab <span className="text-lime">simulator.</span>
        </>
      }
      intro="Pick a sample category and run a simulated measurement to see how pH and RGB readings could appear. This page is not connected to the physical device."
    >
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem] p-4 sm:p-8">
          <div className="pointer-events-none absolute inset-0 fine-grid opacity-60" />
          <div className="relative mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F5C26B]/50 bg-[#F5C26B]/10 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[#F5C26B]">
              <Activity className="h-3.5 w-3.5" aria-hidden /> Simulated example data
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">Not a real measurement · not connected to hardware</span>
          </div>

          <div className="relative grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
            {/* controls */}
            <div className="space-y-5">
              <div>
                <label htmlFor="sample" className="mb-2 block font-display text-sm font-bold text-ivory">
                  1 · Sample category
                </label>
                <select id="sample" className="field" value={sampleId} onChange={(e) => { setSampleId(e.target.value); reset(); }}>
                  {SAMPLES.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-muted">{sample.note}</p>
              </div>

              <fieldset>
                <legend className="mb-2 font-display text-sm font-bold text-ivory">2 · Example scenario</legend>
                <div className="grid grid-cols-2 gap-2">
                  {([["ref", "Matches reference"], ["dev", "Deviates from reference"]] as const).map(([v, l]) => (
                    <label
                      key={v}
                      className={cn(
                        "flex min-h-[52px] cursor-pointer items-center justify-center rounded-2xl border px-3 text-center text-sm font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lime",
                        mode === v ? "border-lime bg-lime/10 text-lime" : "border-white/10 bg-ink/50 text-ivory/80 hover:border-lime/40"
                      )}
                    >
                      <input type="radio" name="mode" value={v} checked={mode === v} onChange={() => { setMode(v); reset(); }} className="sr-only" />
                      {l}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <button type="button" className="btn-primary w-full" onClick={run} disabled={state === "running"}>
                  <Play className="h-4 w-4" aria-hidden /> {state === "running" ? "Scanning…" : "Run Simulation"}
                </button>
                <button type="button" className="btn-ghost w-full sm:w-auto lg:w-full xl:w-auto" onClick={reset} aria-label="Reset simulation">
                  <RotateCcw className="h-4 w-4" aria-hidden /> Reset
                </button>
              </div>

              <div className="rounded-2xl border border-white/5 bg-ink/50 p-4 text-xs leading-relaxed text-muted">
                <p className="font-mono text-[10px] uppercase tracking-widest text-mint">How this works</p>
                <p className="mt-1.5">
                  Each run starts from an invented example profile for the chosen category and adds small random variation. The "indication" simply checks
                  whether the example values fall near that example profile.
                </p>
              </div>
            </div>

            {/* instrument */}
            <div className="min-w-0 rounded-3xl border border-lime/20 bg-[#050b09] p-4 shadow-[inset_0_0_60px_rgba(201,243,106,0.05)] sm:p-6">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
                <span>MICRO-LAB · SIM-01</span>
                <span className="flex items-center gap-1.5">
                  <span className={cn("h-2 w-2 rounded-full", state === "running" ? "anim-blink bg-[#F5C26B]" : state === "done" ? "bg-lime" : "bg-muted")} />
                  {state === "running" ? "Scanning" : state === "done" ? "Complete" : "Standby"}
                </span>
              </div>

              {/* LCD */}
              <div className="mt-4 overflow-hidden rounded-xl border-4 border-[#1a2a22] bg-[#9ccf55] p-3 shadow-[inset_0_2px_12px_rgba(0,0,0,.45)]">
                <pre className="m-0 whitespace-pre font-mono text-[clamp(13px,4.2vw,22px)] font-semibold leading-tight tracking-wider text-[#0d1f12]" aria-live="polite">
{lcd1 + "\n" + lcd2}</pre>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
                <div className="flex items-center gap-4 sm:flex-col">
                  <div
                    className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/15 shadow-[0_0_40px_-8px_currentColor] transition-colors duration-700 sm:h-28 sm:w-28"
                    style={{ background: rgbNow ? `rgb(${rgbNow.join(",")})` : "#14251d", color: rgbNow ? `rgb(${rgbNow.join(",")})` : "#14251d" }}
                    role="img"
                    aria-label={rgbNow ? `Simulated sample colour rgb ${rgbNow.join(", ")}` : "No sample colour yet"}
                  >
                    {state === "running" && <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-lime/60 to-transparent" style={{ animation: "scan 1s linear infinite" }} />}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Sample colour</span>
                </div>

                <div className="space-y-3">
                  {[
                    { l: "R", c: "#ff5a4d", v: rgbNow?.[0] },
                    { l: "G", c: "#4be28a", v: rgbNow?.[1] },
                    { l: "B", c: "#4d8dff", v: rgbNow?.[2] },
                  ].map((b) => (
                    <div key={b.l} className="flex items-center gap-3">
                      <span className="w-4 font-mono text-sm font-bold" style={{ color: b.c }}>{b.l}</span>
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div className="h-full rounded-full transition-[width] duration-1000 ease-out" style={{ width: `${((b.v ?? 0) / 255) * 100}%`, background: b.c, boxShadow: `0 0 14px ${b.c}` }} />
                      </div>
                      <span className="w-9 text-right font-mono text-sm tabular-nums text-ivory">{b.v ?? "---"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* pH */}
              <div className="mt-6">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">pH</span>
                  <span className="font-mono text-2xl font-bold tabular-nums text-lime">
                    {reading ? (reading.ph === null ? "N/A" : reading.ph.toFixed(2)) : "--"}
                  </span>
                </div>
                <div className="relative h-3 rounded-full" style={{ background: "linear-gradient(90deg,#e5303f,#f2702b 18%,#f5c518 34%,#9bd83c 46%,#3ec97b 52%,#2bb3a8 62%,#3b7bdc 78%,#6c4bd8 90%,#7a2fb8)" }}>
                  {reading?.ph != null && (
                    <span className="absolute top-1/2 h-6 w-1.5 -translate-y-1/2 rounded bg-white shadow-[0_0_12px_#fff] transition-[left] duration-1000" style={{ left: `${(reading.ph / 14) * 100}%` }} />
                  )}
                </div>
                <div className="mt-1 flex justify-between font-mono text-[10px] text-muted"><span>0</span><span>7</span><span>14</span></div>
                {reading && reading.ph === null && <p className="mt-2 text-xs text-muted">pH not measured for this sample type.</p>}
              </div>

              {/* verdict */}
              <div
                className={cn(
                  "mt-6 rounded-2xl border p-4 transition-colors",
                  !reading ? "border-white/10 bg-white/[0.02]" : reading.within ? "border-mint/50 bg-mint/10" : "border-[#F5C26B]/60 bg-[#F5C26B]/10"
                )}
                aria-live="polite"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Experimental screening indication · simulated</p>
                <p className={cn("mt-1 font-display text-base font-extrabold sm:text-lg", !reading ? "text-muted" : reading.within ? "text-mint" : "text-[#F5C26B]")}>
                  {state === "running" ? "Scanning sample…" : !reading ? "Press Run Simulation" : reading.within ? "Near example reference profile" : "Differs from example profile"}
                </p>
                {reading && (
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {reading.within
                      ? "This does not mean the food is safe."
                      : "This does not prove adulteration. Real concerns need testing at an authorised laboratory."}
                  </p>
                )}
              </div>

              {history.length > 0 && (
                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Session log · simulated</p>
                  <ul className="mt-2 divide-y divide-white/5 rounded-xl border border-white/5 text-xs">
                    {history.map((h, i) => (
                      <li key={i} className="flex items-center justify-between gap-2 px-3 py-2 font-mono">
                        <span className="min-w-0 truncate text-ivory/90">{h.sample}</span>
                        <span className="shrink-0 text-muted">{h.mode === "ref" ? "ref" : "dev"} · {h.t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
      <Disclaimer className="mt-6" compact />
    </Section>
  );
}
