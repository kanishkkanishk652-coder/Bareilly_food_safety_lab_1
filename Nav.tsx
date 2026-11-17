import { useEffect, useState } from "react";
import { FlaskConical, Menu, X } from "lucide-react";
import { cn } from "../utils/cn";

export const NAV = [
  { id: "awareness", label: "The Problem" },
  { id: "science", label: "Science" },
  { id: "microlab", label: "Micro-Lab" },
  { id: "process", label: "Process" },
  { id: "demo", label: "Simulator" },
  { id: "bareilly", label: "Bareilly" },
  { id: "learn", label: "Learn" },
  { id: "story", label: "Story" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      let current = "";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-lime/10 bg-ink/85 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-lime/40 bg-lime/10 text-lime shadow-[0_0_20px_-4px_rgba(201,243,106,.6)]">
            <FlaskConical className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-display text-[15px] font-extrabold leading-none tracking-tight">
            FOOD SAFETY <span className="text-lime">MICRO-LAB</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-lime",
                  active === n.id ? "bg-lime/10 text-lime" : "text-ivory/80"
                )}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#demo" className="btn-primary hidden !min-h-[40px] !px-4 !py-2 text-sm sm:inline-flex">
            Try the simulator
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-lime/25 bg-panel/70 text-lime xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out xl:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <ul className="mx-auto grid max-h-[calc(100dvh-4rem)] max-w-7xl grid-cols-2 gap-2 overflow-y-auto px-4 pb-6 pt-2 sm:px-6 md:grid-cols-4">
            {NAV.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-[52px] items-center gap-3 rounded-2xl border px-4 font-display text-[15px] font-semibold transition-colors",
                    active === n.id
                      ? "border-lime/50 bg-lime/10 text-lime"
                      : "border-white/5 bg-panel/60 text-ivory active:bg-lime/10"
                  )}
                >
                  <span className="font-mono text-[11px] text-lime/70">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </a>
              </li>
            ))}
            <li className="col-span-2 md:col-span-4">
              <a href="#demo" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="btn-primary w-full">
                Try the simulator
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
