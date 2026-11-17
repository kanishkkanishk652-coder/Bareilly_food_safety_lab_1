import { useState } from "react";
import { CheckCircle2, Phone, RefreshCw, Tag, XCircle } from "lucide-react";
import { Reveal, Section } from "./ui";
import { cn } from "../utils/cn";

const CHECKLIST = [
  "Buy from licensed, reputable sellers where possible",
  "Check the FSSAI licence or registration number on packaged food",
  "Read the ingredient list and the expiry or best-before date",
  "Inspect the packaging seal: avoid torn, leaking or bulging packs",
  "Store spices and staples in clean, dry, airtight containers",
  "Keep milk and dairy properly chilled and use before the date",
  "Wash hands, utensils and surfaces before preparing food",
  "Keep the bill or a photo of the label for items you doubt",
];

const MYTHS = [
  { myth: "If food looks bright and fresh, it must be safe.", fact: "Appearance can be misleading. Colours can be added to improve looks, and unsafe food can look perfectly normal. Check the source and label too." },
  { myth: "A simple kitchen test can prove food is adulterated.", fact: "Home tests are at best indicative and can give false alarms. Confirmation needs validated methods in authorised laboratories." },
  { myth: "Expensive products are always pure.", fact: "Price is not proof of purity. Look at labelling, licence details, packaging integrity and the seller's reliability." },
  { myth: "Boiling or washing removes every contaminant.", fact: "Heat and washing help against some microbes and surface dirt, but they do not remove many added chemicals or colours." },
  { myth: "One sensor reading can certify food as safe.", fact: "Screening devices, including this prototype, give indicators for one or two parameters. They cannot certify safety." },
  { myth: "Packaged food never needs checking.", fact: "Packaging helps traceability, but you should still check seals, dates, storage and the label. Contact the authorities if something is wrong." },
];

const LABEL_TIPS = [
  ["FSSAI logo & 14-digit number", "Licensed and registered food businesses carry a 14-digit FSSAI number on packaged products."],
  ["Ingredients list", "Listed in descending order by weight. Look for unfamiliar additives, colours or allergens."],
  ["Dates & batch number", "Check manufacture, best-before or expiry dates and a batch number for traceability."],
  ["Veg / non-veg mark", "A green or brown dot in a box indicates the vegetarian or non-vegetarian status."],
  ["Net quantity & storage", "Weight or volume should be clearly stated, with storage instructions to follow."],
  ["Packaging condition", "Seals should be intact. Avoid dented, leaking, swollen or tampered packs."],
];

const QUIZ = [
  { q: "What is the most reliable way to confirm food adulteration?", o: ["Judging by bright colour", "A quick kitchen test", "Testing at an authorised laboratory", "Asking the seller"], a: 2, e: "Only validated methods in authorised laboratories can confirm adulteration. Home checks and screening devices are only indicators." },
  { q: "How many digits are in an FSSAI licence or registration number?", o: ["8", "10", "14", "20"], a: 2, e: "FSSAI numbers have 14 digits, and you can look for them on packaged-food labels." },
  { q: "Why is pH generally not meaningful for edible oil?", o: ["Oil is too dark", "Oil is not water-based", "Oil has no colour", "pH probes dislike heat"], a: 1, e: "pH describes hydrogen-ion activity in water-based solutions, so it is not meaningful for oil." },
  { q: "On a packaged-food label, ingredients are listed…", o: ["In alphabetical order", "In descending order by weight", "In random order", "Only if harmful"], a: 1, e: "The ingredient present in the largest amount is listed first." },
  { q: "You feel unwell after eating a food you doubt. What first?", o: ["Seek medical advice and keep the packaging", "Wait a week", "Eat more to test", "Post online only"], a: 0, e: "Your health comes first. Keep the packaging, which helps if you later report the product." },
  { q: "Does a Micro-Lab reading certify that food is safe?", o: ["Yes, always", "Yes, if the pH is 7", "No, it is only an experimental indicator", "Yes, if colour matches"], a: 2, e: "The prototype is an educational screening tool. It cannot confirm adulteration or certify safety." },
];

function Checklist() {
  const [done, setDone] = useState<boolean[]>(CHECKLIST.map(() => false));
  const n = done.filter(Boolean).length;
  return (
    <div className="glass h-full rounded-[2rem] p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-extrabold">Everyday food safety checklist</h3>
        <span className="rounded-full bg-lime/10 px-3 py-1 font-mono text-xs font-bold text-lime">{n}/{CHECKLIST.length}</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={n} aria-valuemin={0} aria-valuemax={CHECKLIST.length} aria-label="Checklist progress">
        <div className="h-full rounded-full bg-gradient-to-r from-mint to-lime transition-[width] duration-500" style={{ width: `${(n / CHECKLIST.length) * 100}%` }} />
      </div>
      <ul className="mt-4 space-y-2">
        {CHECKLIST.map((c, i) => (
          <li key={c}>
            <label className={cn("flex min-h-[48px] cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 text-sm transition", done[i] ? "border-lime/40 bg-lime/[0.07] text-ivory" : "border-white/5 bg-ink/40 text-ivory/85 hover:border-lime/30")}>
              <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-[#C9F36A]" checked={done[i]} onChange={() => setDone((d) => d.map((v, k) => (k === i ? !v : v)))} />
              <span className={done[i] ? "line-through decoration-lime/50" : ""}>{c}</span>
            </label>
          </li>
        ))}
      </ul>
      {n === CHECKLIST.length && <p role="status" className="mt-4 text-sm font-semibold text-lime">Great habits. Keep them up!</p>}
    </div>
  );
}

function MythCard({ myth, fact }: { myth: string; fact: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      className={cn(
        "glass glass-hover flex h-full min-h-[190px] w-full flex-col rounded-3xl p-5 text-left transition-colors",
        on && "!border-mint/50 bg-mint/[0.06]"
      )}
    >
      <span className={cn("inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest", on ? "bg-mint text-ink" : "bg-[#ff8f7a]/15 text-[#ff9d8c]")}>
        {on ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> : <XCircle className="h-3.5 w-3.5" aria-hidden />}
        {on ? "Fact" : "Myth"}
      </span>
      <p className="mt-4 flex-1 font-display text-base font-bold leading-snug text-ivory">{on ? fact : `“${myth}”`}</p>
      <span className="mt-4 text-xs font-semibold text-lime">{on ? "Tap to see the myth" : "Tap to reveal the fact"}</span>
    </button>
  );
}

function Quiz() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = QUIZ[i];

  const choose = (k: number) => {
    if (pick !== null) return;
    setPick(k);
    if (k === q.a) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= QUIZ.length) setFinished(true);
    else {
      setI(i + 1);
      setPick(null);
    }
  };
  const restart = () => {
    setI(0); setPick(null); setScore(0); setFinished(false);
  };

  const msg = score === QUIZ.length ? "Outstanding. You're a food-safety champion." : score >= 4 ? "Well done. You know your food-safety basics." : "Good start. Review the sections above and try again.";

  return (
    <div className="glass relative h-full overflow-hidden rounded-[2rem] p-5 sm:p-7">
      <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(201,243,106,0.15),transparent_65%)]" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-extrabold">Food safety quiz</h3>
          <span className="font-mono text-xs text-muted">{finished ? "Done" : `Q${i + 1} / ${QUIZ.length}`}</span>
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden>
          {QUIZ.map((_, k) => <span key={k} className={cn("h-1.5 flex-1 rounded-full transition-colors", k < i || finished ? "bg-lime" : k === i ? "bg-lime/50" : "bg-white/10")} />)}
        </div>

        {finished ? (
          <div className="py-8 text-center" role="status">
            <p className="font-display text-6xl font-extrabold text-lime text-glow">{score}<span className="text-3xl text-muted">/{QUIZ.length}</span></p>
            <p className="mt-3 text-ivory">{msg}</p>
            <button onClick={restart} className="btn-primary mt-6 w-full sm:w-auto"><RefreshCw className="h-4 w-4" aria-hidden /> Try again</button>
          </div>
        ) : (
          <div key={i}>
            <p id="quiz-q" className="mt-5 font-display text-lg font-bold leading-snug">{q.q}</p>
            <div role="group" aria-labelledby="quiz-q" className="mt-4 grid gap-2.5">
              {q.o.map((o, k) => {
                const correct = pick !== null && k === q.a;
                const wrong = pick === k && k !== q.a;
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() => choose(k)}
                    disabled={pick !== null}
                    className={cn(
                      "flex min-h-[52px] items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition disabled:cursor-default",
                      pick === null && "border-white/10 bg-ink/50 hover:border-lime/50 hover:bg-lime/[0.06]",
                      correct && "border-mint bg-mint/15 text-ivory",
                      wrong && "border-[#ff8f7a] bg-[#ff8f7a]/10",
                      pick !== null && !correct && !wrong && "border-white/5 bg-ink/30 opacity-60"
                    )}
                  >
                    <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-xs font-bold", correct ? "border-mint bg-mint text-ink" : wrong ? "border-[#ff8f7a] bg-[#ff8f7a] text-ink" : "border-white/20 text-muted")}>
                      {correct ? "✓" : wrong ? "✕" : String.fromCharCode(65 + k)}
                    </span>
                    {o}
                  </button>
                );
              })}
            </div>
            {pick !== null && (
              <div role="status" className="mt-4 rounded-2xl border border-lime/20 bg-ink/60 p-4 text-sm leading-relaxed">
                <p className={cn("font-bold", pick === q.a ? "text-mint" : "text-[#ff9d8c]")}>{pick === q.a ? "Correct!" : "Not quite."}</p>
                <p className="mt-1 text-muted">{q.e}</p>
                <button onClick={next} className="btn-primary mt-4 w-full sm:w-auto">{i + 1 >= QUIZ.length ? "See my score" : "Next question"}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <Section
      id="learn"
      tone="alt"
      eyebrow="07 · Consumer education"
      title={
        <>
          Small habits, <span className="text-lime">safer plates.</span>
        </>
      }
      intro="Practical knowledge that helps ordinary consumers and students make careful choices, whatever technology is or isn't in their hands."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal><Checklist /></Reveal>
        <Reveal delay={100}>
          <div className="glass h-full rounded-[2rem] p-5 sm:p-7">
            <h3 className="flex items-center gap-2 font-display text-xl font-extrabold"><Tag className="h-5 w-5 text-lime" aria-hidden /> Reading labels & packaging</h3>
            <dl className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {LABEL_TIPS.map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/5 bg-ink/40 p-4">
                  <dt className="font-display text-sm font-bold text-lime">{t}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <h3 className="text-2xl font-extrabold sm:text-3xl">Common misconceptions: myth or fact?</h3>
        <p className="mt-2 text-muted">Tap a card to flip it.</p>
      </Reveal>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MYTHS.map((m, i) => (
          <Reveal key={m.myth} delay={(i % 3) * 80}><MythCard {...m} /></Reveal>
        ))}
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal><Quiz /></Reveal>
        <Reveal delay={100}>
          <div className="glass h-full rounded-[2rem] p-5 sm:p-7">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime/10 text-lime"><Phone className="h-6 w-6" aria-hidden /></span>
            <h3 className="mt-4 font-display text-xl font-extrabold">When to contact the authorities</h3>
            <p className="mt-2 text-sm text-muted">Consider contacting the official food-safety authorities if you notice:</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/90">
              {["Foreign objects, insects or visible mould in sealed food", "Food sold past its expiry date or without a label", "A seller who appears unlicensed or very unhygienic", "Mislabelled ingredients, weight or origin", "Several people becoming ill after the same food"].map((x) => (
                <li key={x} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />{x}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl border border-mint/25 bg-mint/[0.06] p-3 text-xs leading-relaxed text-muted">
              For medical symptoms, see a doctor first. For complaints, use the <a href="#resources" className="font-semibold text-lime underline underline-offset-4">official channels</a>.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
