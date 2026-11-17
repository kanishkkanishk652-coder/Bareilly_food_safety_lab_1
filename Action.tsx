import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, ExternalLink, FileSearch, Landmark, MapPin, ShieldCheck, Trash2, Upload } from "lucide-react";
import { Reveal, Section } from "./ui";
import { cn } from "../utils/cn";

const CATEGORIES = ["Milk & dairy products", "Turmeric & spices", "Red chilli powder", "Edible oils", "Everyday pantry products", "Other food item"];

type Spot = { name: string; x: number; y: number };
const SPOTS: Spot[] = [
  { name: "Civil Lines", x: 190, y: 150 },
  { name: "Kutubkhana", x: 262, y: 206 },
  { name: "Subhash Nagar", x: 328, y: 120 },
  { name: "Izzatnagar", x: 118, y: 262 },
  { name: "Prem Nagar", x: 218, y: 96 },
  { name: "Rampur Garden", x: 378, y: 232 },
  { name: "Bareilly Cantt", x: 170, y: 322 },
];

type Report = { ref: string; category: string; product: string; locality: string; description: string; createdAt: string };
const KEY = "fsml_demo_reports_v1";

const loadReports = (): Report[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};
const saveReports = (r: Report[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(r));
  } catch {
    /* storage unavailable */
  }
};
const makeRef = () => `DEMO-BRL-${Date.now().toString(36).toUpperCase().slice(-5)}${Math.random().toString(36).toUpperCase().slice(2, 5)}`;

function BareillyMap({ selected, onPick }: { selected: string; onPick: (n: string) => void }) {
  return (
    <svg viewBox="0 0 480 400" className="h-auto w-full" role="group" aria-label="Schematic illustrative map of Bareilly with selectable locality markers">
      <defs>
        <radialGradient id="mapFade" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#14251d" />
          <stop offset="1" stopColor="#0a1511" />
        </radialGradient>
        <pattern id="mapGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#78D6A3" strokeOpacity=".08" />
        </pattern>
      </defs>
      <rect width="480" height="400" rx="24" fill="url(#mapFade)" />
      <rect width="480" height="400" rx="24" fill="url(#mapGrid)" />

      {/* green zones */}
      <ellipse cx="90" cy="110" rx="60" ry="38" fill="#78D6A3" fillOpacity=".06" />
      <ellipse cx="400" cy="320" rx="56" ry="34" fill="#78D6A3" fillOpacity=".06" />

      {/* river */}
      <path d="M470 20 C 430 70, 440 130, 410 170 S 440 270, 400 330 S 430 380, 410 400" fill="none" stroke="#3b7bdc" strokeOpacity=".5" strokeWidth="12" strokeLinecap="round" />
      <path d="M470 20 C 430 70, 440 130, 410 170 S 440 270, 400 330 S 430 380, 410 400" fill="none" stroke="#78D6A3" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="6 8" className="anim-flow" />
      <text x="420" y="60" fontSize="8" fill="#78D6A3" fillOpacity=".8" transform="rotate(75 420 60)" style={{ fontFamily: "JetBrains Mono, monospace" }}>RAMGANGA</text>

      {/* ring / roads */}
      <ellipse cx="240" cy="200" rx="188" ry="150" fill="none" stroke="#C9F36A" strokeOpacity=".22" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
      <path d="M20 190 L460 210" stroke="#EAF2ED" strokeOpacity=".16" strokeWidth="4" />
      <path d="M240 10 L226 392" stroke="#EAF2ED" strokeOpacity=".16" strokeWidth="4" />
      <path d="M60 340 L420 60" stroke="#EAF2ED" strokeOpacity=".1" strokeWidth="3" />

      {/* rail */}
      <path d="M10 300 C 120 280, 200 250, 300 270 S 440 300, 470 290" fill="none" stroke="#9AADA4" strokeOpacity=".6" strokeWidth="3" />
      <path d="M10 300 C 120 280, 200 250, 300 270 S 440 300, 470 290" fill="none" stroke="#070F0D" strokeWidth="1.5" strokeDasharray="4 6" />

      {/* markers */}
      {SPOTS.map((s) => {
        const on = selected === s.name;
        const left = s.x > 300;
        return (
          <g
            key={s.name}
            role="button"
            tabIndex={0}
            aria-label={`Use locality ${s.name} in the form`}
            aria-pressed={on}
            style={{ cursor: "pointer" }}
            onClick={() => onPick(s.name)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onPick(s.name))}
          >
            <circle cx={s.x} cy={s.y} r="22" fill="transparent" />
            <circle cx={s.x} cy={s.y} r={on ? 16 : 12} fill="#C9F36A" fillOpacity={on ? 0.25 : 0.1} className={on ? "anim-glow" : ""} />
            <path
              d={`M${s.x} ${s.y + 8} C ${s.x - 9} ${s.y - 2}, ${s.x - 7} ${s.y - 14}, ${s.x} ${s.y - 14} C ${s.x + 7} ${s.y - 14}, ${s.x + 9} ${s.y - 2}, ${s.x} ${s.y + 8}Z`}
              fill={on ? "#C9F36A" : "#78D6A3"}
              stroke="#070F0D"
              strokeWidth="1.2"
            />
            <circle cx={s.x} cy={s.y - 5} r="2.6" fill="#070F0D" />
            <rect x={left ? s.x - 94 : s.x + 12} y={s.y - 15} width="82" height="17" rx="8.5" fill="#070F0D" fillOpacity=".85" stroke={on ? "#C9F36A" : "#78D6A3"} strokeOpacity={on ? 1 : 0.4} />
            <text x={left ? s.x - 53 : s.x + 53} y={s.y - 3.5} textAnchor="middle" fontSize="8.5" fontWeight="600" fill={on ? "#C9F36A" : "#EAF2ED"} style={{ fontFamily: "DM Sans, sans-serif" }}>
              {s.name}
            </text>
          </g>
        );
      })}

      <text x="24" y="38" fontSize="22" fontWeight="800" fill="#EAF2ED" fillOpacity=".9" style={{ fontFamily: "Manrope, sans-serif" }}>BAREILLY</text>
      <text x="24" y="54" fontSize="8.5" fill="#9AADA4" style={{ fontFamily: "JetBrains Mono, monospace" }}>UTTAR PRADESH · SCHEMATIC</text>
      {/* compass */}
      <g transform="translate(436 360)">
        <circle r="20" fill="#070F0D" fillOpacity=".7" stroke="#C9F36A" strokeOpacity=".4" />
        <path d="M0 -13 L5 3 L0 0 L-5 3Z" fill="#C9F36A" />
        <text y="15" textAnchor="middle" fontSize="7" fill="#9AADA4" style={{ fontFamily: "JetBrains Mono, monospace" }}>N</text>
      </g>
    </svg>
  );
}

const STAGES = ["Saved on this device", "Under review", "Referred onward", "Closed"];

export default function Action() {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [locality, setLocality] = useState("");
  const [desc, setDesc] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [lookup, setLookup] = useState("");
  const [found, setFound] = useState<Report | null | "none">(null);
  const [stage, setStage] = useState(0);

  useEffect(() => setReports(loadReports()), []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!category) e.category = "Please choose a food category.";
    if (product.trim().length < 2) e.product = "Enter the product name (at least 2 characters).";
    if (locality.trim().length < 2) e.locality = "Enter your locality or area.";
    if (desc.trim().length < 20) e.desc = "Please describe your concern in at least 20 characters.";
    if (!consent) e.consent = "Please confirm that you understand this is a demonstration.";
    return e;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = ["category", "product", "locality", "desc", "consent"].find((k) => e[k]);
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }
    const r: Report = { ref: makeRef(), category, product: product.trim(), locality: locality.trim(), description: desc.trim(), createdAt: new Date().toISOString() };
    const next = [r, ...reports].slice(0, 20);
    setReports(next);
    saveReports(next);
    setSubmitted(r);
    setLookup(r.ref);
    setFound(r);
    setStage(0);
    setCategory(""); setProduct(""); setLocality(""); setDesc(""); setConsent(false);
  };

  const doLookup = (ev: FormEvent) => {
    ev.preventDefault();
    const f = reports.find((r) => r.ref.toLowerCase() === lookup.trim().toLowerCase());
    setFound(f ?? "none");
    setStage(0);
  };

  const clearAll = () => {
    saveReports([]);
    setReports([]);
    setFound(null);
    setSubmitted(null);
    setLookup("");
  };

  const fieldErr = (k: string) => (errors[k] ? (
    <p id={`e-${k}`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#ff9d8c]">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden /> {errors[k]}
    </p>
  ) : null);
  const aria = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <>
      <Section
        id="bareilly"
        eyebrow="06 · Bareilly Food Safety Action Centre"
        title={
          <>
            Building a More Aware Food Community in <span className="text-lime">Bareilly.</span>
          </>
        }
        intro="An independent student initiative to encourage careful food habits in our city. This is not an official government reporting portal."
      >
        <Reveal className="mb-8">
          <div className="flex gap-3 rounded-2xl border border-[#F5C26B]/40 bg-[#F5C26B]/[0.07] p-4 text-sm leading-relaxed text-ivory/90 sm:p-5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#F5C26B]" aria-hidden />
            <p>
              <strong className="text-[#F5C26B]">Important:</strong> The form below is a <strong>demonstration</strong>. Entries are stored only in
              this browser on your device. They are <strong>not sent to any server, to the project team, or to any government authority</strong>. To
              report a real food-safety concern, use the official channels in the next section.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* form */}
          <Reveal>
            <form onSubmit={submit} noValidate className="glass h-full rounded-[2rem] p-5 sm:p-8" aria-labelledby="form-title">
              <h3 id="form-title" className="font-display text-xl font-extrabold">Concern form <span className="ml-1 rounded-full bg-[#F5C26B]/15 px-2.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-widest text-[#F5C26B]">Demo</span></h3>
              <p className="mt-1 text-sm text-muted">Practise describing a concern clearly, as you would to an official body.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="f-category" className="mb-1.5 block text-sm font-semibold">Food category *</label>
                  <select id="f-category" className="field" value={category} onChange={(e) => setCategory(e.target.value)} {...aria("category")}>
                    <option value="">Select a category…</option>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  {fieldErr("category")}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-product" className="mb-1.5 block text-sm font-semibold">Product name *</label>
                    <input id="f-product" className="field" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. loose turmeric powder" maxLength={80} autoComplete="off" {...aria("product")} />
                    {fieldErr("product")}
                  </div>
                  <div>
                    <label htmlFor="f-locality" className="mb-1.5 block text-sm font-semibold">Locality / area *</label>
                    <input id="f-locality" list="localities" className="field" value={locality} onChange={(e) => setLocality(e.target.value)} placeholder="e.g. Civil Lines" maxLength={60} autoComplete="off" {...aria("locality")} />
                    <datalist id="localities">{SPOTS.map((s) => <option key={s.name} value={s.name} />)}</datalist>
                    {fieldErr("locality")}
                  </div>
                </div>
                <div>
                  <label htmlFor="f-desc" className="mb-1.5 block text-sm font-semibold">Describe the concern *</label>
                  <textarea id="f-desc" rows={4} className="field resize-y" value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={500} placeholder="What did you notice? Smell, colour, taste, label or packaging problems…" {...aria("desc")} />
                  <div className="mt-1 flex justify-between text-xs text-muted">
                    <span>{fieldErr("desc") ?? "At least 20 characters."}</span>
                    <span className="shrink-0 tabular-nums">{desc.length}/500</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="f-image" className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
                    <Upload className="h-4 w-4 text-muted" aria-hidden /> Supporting photo <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input id="f-image" type="file" disabled className="field !py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-muted" aria-describedby="img-note" />
                  <p id="img-note" className="mt-1.5 text-xs text-muted">Photo upload is turned off because this demo has no secure storage. Never upload personal information to unverified sites.</p>
                </div>
                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-ivory/90">
                    <input id="f-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#C9F36A]" {...aria("consent")} />
                    <span>I understand this is a demo. It is saved only on this device and is not sent to any authority.</span>
                  </label>
                  {fieldErr("consent")}
                </div>
                <button type="submit" className="btn-primary w-full">Save demo report on this device</button>
              </div>

              {submitted && (
                <div role="status" className="mt-5 rounded-2xl border border-lime/40 bg-lime/10 p-4">
                  <p className="flex items-center gap-2 font-display font-bold text-lime"><CheckCircle2 className="h-5 w-5" aria-hidden /> Demo report saved locally</p>
                  <p className="mt-2 text-sm text-muted">Demo reference number:</p>
                  <p className="mt-1 break-all font-mono text-lg font-bold tracking-wider text-ivory">{submitted.ref}</p>
                  <p className="mt-2 text-xs text-muted">Nothing has been sent anywhere. For a real complaint, use the official FSSAI or UP FSDA channels below.</p>
                </div>
              )}
            </form>
          </Reveal>

          {/* map + status */}
          <div className="space-y-6">
            <Reveal delay={100}>
              <div className="glass overflow-hidden rounded-[2rem] p-3 sm:p-4">
                <BareillyMap selected={locality} onPick={setLocality} />
                <div className="flex items-start gap-2 px-2 pb-1 pt-3 text-xs leading-relaxed text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                  <p>
                    Schematic illustration, not to scale. Markers are only a locality picker for the demo form: they do <strong className="text-ivory">not</strong> show incidents,
                    hotspots or verified reports.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="glass rounded-[2rem] p-5 sm:p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-extrabold"><FileSearch className="h-5 w-5 text-lime" aria-hidden /> Case-status interface <span className="rounded-full bg-[#F5C26B]/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#F5C26B]">Demo</span></h3>
                <form onSubmit={doLookup} className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <label htmlFor="lookup" className="sr-only">Demo reference number</label>
                  <input id="lookup" className="field font-mono uppercase" placeholder="DEMO-BRL-XXXXXXXX" value={lookup} onChange={(e) => setLookup(e.target.value)} />
                  <button type="submit" className="btn-ghost w-full sm:w-auto">Check</button>
                </form>

                {found === "none" && <p role="status" className="mt-3 text-sm text-[#ff9d8c]">No demo report with that number was found on this device.</p>}
                {found && found !== "none" && (
                  <div className="mt-4" role="status">
                    <p className="text-sm"><span className="font-mono text-xs text-muted">{found.ref}</span><br /><strong>{found.product}</strong> · {found.category} · {found.locality}</p>
                    <ol className="mt-4 grid grid-cols-4 gap-1.5">
                      {STAGES.map((s, i) => (
                        <li key={s} className="text-center">
                          <div className={cn("h-1.5 rounded-full transition-colors", i <= stage ? "bg-lime shadow-[0_0_10px_rgba(201,243,106,.7)]" : "bg-white/10")} />
                          <p className={cn("mt-2 text-[10px] leading-tight sm:text-xs", i === stage ? "font-bold text-lime" : "text-muted")}>{s}</p>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button type="button" className="btn-ghost !min-h-[40px] !px-4 !py-2 text-sm" onClick={() => setStage((s) => Math.min(STAGES.length - 1, s + 1))} disabled={stage === STAGES.length - 1}>Preview next stage</button>
                      <button type="button" className="text-sm text-muted underline-offset-4 hover:text-lime hover:underline" onClick={() => setStage(0)}>Reset</button>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted">Only "Saved on this device" is real. Later stages are an interface preview. Nobody is reviewing or referring this demo entry.</p>
                  </div>
                )}
                {reports.length > 0 && (
                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-muted">
                    <span>{reports.length} demo {reports.length === 1 ? "entry" : "entries"} stored on this device</span>
                    <button type="button" onClick={clearAll} className="inline-flex min-h-[36px] items-center gap-1.5 text-[#ff9d8c] hover:underline"><Trash2 className="h-3.5 w-3.5" aria-hidden /> Clear all</button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* education strip */}
        <Reveal className="mt-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Keep the evidence", "Retain the bill, packaging, batch number and expiry date. Don't discard a suspected product."],
              ["Note the details", "Write down where and when you bought it, plus what looked, smelled or tasted wrong."],
              ["Stay safe", "If the food may be unsafe, don't eat it or feed it to others, and seek medical help if you feel unwell."],
              ["Use official channels", "Real complaints belong with the food-safety authorities, listed in the next section."],
            ].map(([t, d], i) => (
              <div key={t} className="glass rounded-2xl p-4">
                <span className="font-mono text-xs text-lime">0{i + 1}</span>
                <h4 className="mt-1 font-display font-bold">{t}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Resources />
    </>
  );
}

function Resources() {
  const links = [
    { name: "FSSAI", desc: "Food Safety and Standards Authority of India: the national regulator, with standards, guidance and consumer information.", href: "https://fssai.gov.in/", icon: Landmark },
    { name: "FSSAI Consumer Grievance Portal", desc: "The official FSSAI channel for consumers to register food-safety complaints.", href: "https://foscos.fssai.gov.in/consumergrievance/", icon: ShieldCheck },
    { name: "UP Food Safety & Drug Administration", desc: "The Uttar Pradesh state department responsible for food-safety administration in the state.", href: "https://fsda.up.gov.in/", icon: Landmark },
  ];
  return (
    <section id="resources" aria-labelledby="resources-title" className="relative px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="glass rounded-[2rem] border-lime/25 p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink"><ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Official channels</span>
            </div>
            <h3 id="resources-title" className="mt-4 text-2xl font-extrabold sm:text-3xl lg:text-4xl">Report real concerns to the <span className="text-lime">right place.</span></h3>
            <p className="mt-3 max-w-3xl text-muted">
              These are the official government resources. They are separate from this student project, which has no connection to, or endorsement from,
              these bodies.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {links.map(({ name, desc, href, icon: Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="group glass-hover flex flex-col rounded-2xl border border-lime/20 bg-ink/60 p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime/10 text-lime"><Icon className="h-5 w-5" aria-hidden /></span>
                  <h4 className="mt-4 font-display text-lg font-bold">{name}</h4>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 break-all font-mono text-xs text-lime">
                    {href.replace("https://", "")} <ExternalLink className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-lime/30 bg-lime/[0.06] p-4 text-sm"><strong className="text-lime">Official reporting:</strong> <span className="text-muted">the three links above. Complaints made there are handled by the authorities.</span></div>
              <div className="rounded-2xl border border-[#F5C26B]/40 bg-[#F5C26B]/[0.06] p-4 text-sm"><strong className="text-[#F5C26B]">This project's form:</strong> <span className="text-muted">a local demonstration only. It reports to nobody.</span></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
