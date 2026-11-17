import { ArrowRight, Cpu, MapPin, Palette, Waves } from "lucide-react";
import { MicroLabIso } from "./illustrations";
import { ChilliIcon, MilkIcon, OilIcon, TurmericIcon } from "./FoodIcons";
import { Particles } from "./ui";

function FoodChip({ icon, label, sub, className }: { icon: React.ReactNode; label: string; sub: string; className: string }) {
  return (
    <div className={`glass flex items-center gap-2 rounded-2xl p-1.5 pr-3 sm:gap-3 sm:p-2.5 sm:pr-4 ${className}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink/60 sm:h-12 sm:w-12">{icon}</span>
      <span className="leading-tight">
        <span className="block font-display text-[11px] font-bold text-ivory sm:text-sm">{label}</span>
        <span className="block font-mono text-[8px] uppercase tracking-wider text-muted sm:text-[10px]">{sub}</span>
      </span>
    </div>
  );
}

function Tag({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span
      className={`absolute z-30 rounded-full border border-lime/50 bg-ink/80 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.18em] text-lime shadow-[0_0_18px_-4px_rgba(201,243,106,.6)] backdrop-blur sm:px-3.5 sm:py-1.5 sm:text-[11px] ${className}`}
    >
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pt-36">
      {/* backgrounds */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[620px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,243,106,0.14),transparent_65%)]" />
        <div className="absolute -right-40 top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(120,214,163,0.16),transparent_65%)]" />
        <div className="grid-bg absolute inset-0" />
        <Particles count={16} />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.06] px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-lime sm:text-[11px]">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> Student innovation · Bareilly, Uttar Pradesh
          </p>
          <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.04] text-ivory min-[400px]:text-[2.6rem] sm:text-6xl lg:text-[4rem] xl:text-[4.6rem]">
            The Food We Eat Should Never Be a{" "}
            <span className="bg-gradient-to-r from-lime to-mint bg-clip-text text-transparent text-glow">Question of Trust.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Food safety begins with awareness. Discover the risks of adulteration, explore affordable screening technology, and learn how
            communities can take informed action.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#microlab" className="btn-primary w-full sm:w-auto">
              Explore the Micro-Lab <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#awareness" className="btn-ghost w-full sm:w-auto">
              Understand the Problem
            </a>
          </div>
          <p className="mt-6 max-w-lg border-l-2 border-lime/40 pl-4 text-sm leading-relaxed text-muted">
            An educational screening prototype, not a certified food-testing laboratory. Independent student initiative, not an official
            government portal.
          </p>
        </div>

        {/* illustration */}
        <div className="relative mx-auto aspect-square w-full max-w-[300px] min-[400px]:max-w-[340px] sm:max-w-[520px]">
          <div className="absolute inset-[2%] rounded-full border border-dashed border-lime/25" />
          <div className="absolute inset-[16%] rounded-full border border-mint/20" />
          <div className="absolute inset-[30%] rounded-full border border-dashed border-lime/15" />
          <div className="anim-orbit absolute inset-[2%]">
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_16px_4px_rgba(201,243,106,.7)]" />
            <span className="absolute bottom-[14%] right-[6%] h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_3px_rgba(120,214,163,.7)]" />
          </div>
          <div className="anim-orbit-slow absolute inset-[16%]">
            <span className="absolute -left-1 top-1/2 h-2.5 w-2.5 rounded-full bg-ivory shadow-[0_0_12px_3px_rgba(234,242,237,.6)]" />
          </div>
          <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(201,243,106,0.22),transparent_70%)]" />

          <div className="anim-float absolute inset-x-[2%] top-[12%] z-10">
            <MicroLabIso className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
          </div>

          <div className="anim-float2 absolute left-0 top-[9%] z-20" style={{ animationDelay: "-1s" }}>
            <FoodChip icon={<MilkIcon className="h-8 w-8 sm:h-10 sm:w-10" />} label="Milk" sub="Sample · pH" className="static" />
          </div>
          <div className="anim-float absolute right-0 top-[19%] z-20" style={{ animationDelay: "-3s" }}>
            <FoodChip icon={<TurmericIcon className="h-8 w-8 sm:h-10 sm:w-10" />} label="Turmeric" sub="Sample · RGB" className="static" />
          </div>
          <div className="anim-float2 absolute bottom-[17%] left-0 z-20" style={{ animationDelay: "-2s" }}>
            <FoodChip icon={<ChilliIcon className="h-8 w-8 sm:h-10 sm:w-10" />} label="Chilli" sub="Sample · RGB" className="static" />
          </div>
          <div className="anim-float absolute bottom-[8%] right-0 z-20" style={{ animationDelay: "-4s" }}>
            <FoodChip icon={<OilIcon className="h-8 w-8 sm:h-10 sm:w-10" />} label="Edible oil" sub="Sample · RGB" className="static" />
          </div>

          <Tag className="left-1/2 top-0 -translate-x-1/2">UNDERSTAND</Tag>
          <Tag className="right-0 top-[50%]">SCREEN</Tag>
          <Tag className="bottom-0 left-1/2 -translate-x-1/2">TAKE ACTION</Tag>
        </div>
      </div>

      {/* prototype facts strip */}
      <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-3 sm:mt-20 lg:grid-cols-4">
        {[
          { icon: Palette, t: "RGB colour", s: "TCS3200 sensor" },
          { icon: Waves, t: "pH reading", s: "Probe + module" },
          { icon: Cpu, t: "Arduino Uno R3", s: "Reads and compares" },
          { icon: MapPin, t: "Bareilly, UP", s: "Community-focused" },
        ].map(({ icon: Icon, t, s }) => (
          <div key={t} className="glass flex items-center gap-3 rounded-2xl p-3.5 sm:p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold text-ivory">{t}</p>
              <p className="truncate text-xs text-muted">{s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
