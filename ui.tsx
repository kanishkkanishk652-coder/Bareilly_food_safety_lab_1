import { useEffect, useRef, useState, type ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { cn } from "../utils/cn";

export const DISCLAIMER =
  "The Integrated Food Safety Micro-Lab is a student-developed educational screening prototype. Its pH and RGB measurements are experimental indicators and cannot independently confirm food adulteration or certify food safety. Results should not replace validated testing by authorised laboratories.";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", shown && "is-in", className)}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/[0.06] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-lime",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-lime anim-glow" />
      {children}
    </span>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  tone = "base",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: "base" | "alt";
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28",
        tone === "alt" && "bg-gradient-to-b from-forest/70 via-forest/40 to-transparent",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2
            id={`${id}-title`}
            className="mt-5 text-[1.9rem] font-extrabold leading-[1.1] text-ivory sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Disclaimer({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <aside
      role="note"
      className={cn(
        "flex gap-3 rounded-2xl border border-lime/20 bg-lime/[0.05] p-4 text-sm leading-relaxed text-ivory/90 sm:gap-4 sm:p-5",
        className
      )}
    >
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-lime" aria-hidden />
      <div>
        <p className="font-display text-xs font-bold uppercase tracking-widest text-lime">Scientific disclaimer</p>
        <p className={cn("mt-1.5 text-muted", compact && "text-[13px]")}>{DISCLAIMER}</p>
      </div>
    </aside>
  );
}

export function Particles({ count = 14 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 97) % 100}%`,
    delay: `${(i * 1.3) % 9}s`,
    dur: `${7 + ((i * 3) % 7)}s`,
    dx: `${((i % 5) - 2) * 14}px`,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur, ["--dx" as string]: p.dx }}
        />
      ))}
    </div>
  );
}
