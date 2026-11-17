import { useState } from "react";
import { AlertTriangle, ChevronDown, HeartPulse, Info, Scale, Stethoscope, Utensils } from "lucide-react";
import { ChilliIcon, MilkIcon, OilIcon, PantryIcon, TurmericIcon } from "./FoodIcons";
import { Reveal, Section } from "./ui";
import { cn } from "../utils/cn";

const CARDS = [
  {
    id: "milk",
    title: "Milk & dairy products",
    Icon: MilkIcon,
    glow: "from-ivory/20",
    concerns: ["Dilution with water", "Added starch, sugar or neutralisers", "Non-dairy additives to mask spoilage"],
    why: "Milk is a daily staple, especially for children and older adults. Dilution lowers nutrition, and unlisted additives are a food-quality concern.",
    more: {
      look: "Check for off smell, unusual thickness or sediment, buy from sources you trust, and keep milk properly chilled.",
      lab: "pH and colour can shift when milk is diluted or spoiled, which is a useful clue for a screening prototype but not proof of adulteration.",
    },
  },
  {
    id: "turmeric",
    title: "Turmeric & spices",
    Icon: TurmericIcon,
    glow: "from-[#F2B632]/25",
    concerns: ["Non-permitted yellow dyes", "Starch or chalk-like fillers", "Colour enhancers added to low-grade powder"],
    why: "Vivid colour is often mistaken for quality. Added colourants can make poor-quality spice look better and may not be permitted in food.",
    more: {
      look: "Prefer packs with a clear label and FSSAI licence number. Be wary of unnaturally bright, neon-looking powder.",
      lab: "Colour response is where RGB sensing helps: a sample's red, green and blue balance can be compared with a saved reference profile.",
    },
  },
  {
    id: "chilli",
    title: "Red chilli powder",
    Icon: ChilliIcon,
    glow: "from-[#D93A2B]/25",
    concerns: ["Non-permitted synthetic dyes", "Brick powder or sawdust as bulk fillers", "Old stock re-coloured to look fresh"],
    why: "Bright red colour is easy to imitate. Fillers and dyes can irritate and may not be permitted in food products.",
    more: {
      look: "Check the ingredient list, grind consistency and smell. Buying whole spices and grinding at home reduces uncertainty.",
      lab: "RGB readings may deviate from the usual red-orange profile if colour has been altered, which flags a sample for proper lab testing.",
    },
  },
  {
    id: "oil",
    title: "Edible oils",
    Icon: OilIcon,
    glow: "from-[#FFD25E]/25",
    concerns: ["Blending with cheaper oils", "Re-used oil sold as fresh", "Undeclared additives or colourants"],
    why: "Oils are consumed daily in cooked food. Substitution can change the nutritional profile, and heavily re-used oil may carry degradation products.",
    more: {
      look: "Choose sealed, labelled containers with batch number and date. Avoid loose, unlabelled oil of unknown origin.",
      lab: "Oils are not water-based, so pH is generally not meaningful. A colour response is the more relevant signal for a simple prototype.",
    },
  },
  {
    id: "pantry",
    title: "Everyday pantry products",
    Icon: PantryIcon,
    glow: "from-mint/25",
    concerns: ["Artificial colours in tea, sweets and some vegetables", "Fillers in powders and grains", "Mislabelling of origin or ingredients"],
    why: "Pantry staples are used in small amounts all day, so everyday habits such as reading labels matter more than any single test.",
    more: {
      look: "Read the ingredient list, expiry date and storage instructions. Store food in dry, sealed containers and inspect packaging seals.",
      lab: "Different foods need different reference profiles. The prototype is built to explore this approach, not to cover every product.",
    },
  },
];

const HAZARDS = [
  { icon: Utensils, t: "Digestive upset", d: "Spoiled food, dirt or irritant fillers may cause stomach discomfort, nausea or diarrhoea in some people." },
  { icon: AlertTriangle, t: "Undeclared allergens", d: "Ingredients missing from a label can be risky for people with food allergies or intolerances." },
  { icon: HeartPulse, t: "Long-term exposure concerns", d: "Some non-permitted colours and chemicals have been linked in research to health concerns. Risk depends on the substance, amount and duration." },
  { icon: Scale, t: "Nutritional dilution", d: "Watered-down or substituted foods deliver less nutrition than expected, which matters most for children and the elderly." },
];

export default function Awareness() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section
      id="awareness"
      eyebrow="01 · Understand the problem"
      title={
        <>
          What is food <span className="text-lime">adulteration</span>, and why should you care?
        </>
      }
      intro="Adulteration means food has been made impure, poorer in quality or unsafe by adding, substituting or removing something. Here are the product groups where consumer awareness helps most."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {CARDS.map((c, i) => {
          const isOpen = open === c.id;
          return (
            <Reveal key={c.id} delay={(i % 3) * 90} className={cn("md:col-span-1", i < 3 ? "lg:col-span-2" : "lg:col-span-3")}>
              <article className="group glass glass-hover flex h-full flex-col overflow-hidden rounded-3xl">
                <div className={cn("fine-grid relative grid h-36 place-items-center bg-gradient-to-br to-transparent sm:h-40", c.glow)}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(201,243,106,0.12),transparent_60%)]" />
                  <c.Icon className="relative h-24 w-24 drop-shadow-[0_10px_16px_rgba(0,0,0,.5)] transition-transform duration-500 group-hover:scale-110 sm:h-28 sm:w-28" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-xl font-bold text-ivory">{c.title}</h3>
                  <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-lime">Commonly discussed concerns</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-ivory/90">
                    {c.concerns.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-lime">Why be aware</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.why}</p>

                  <div className={cn("grid transition-[grid-template-rows] duration-500", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden" id={`more-${c.id}`}>
                      <div className="mt-4 space-y-3 rounded-2xl border border-lime/15 bg-ink/50 p-4 text-sm leading-relaxed">
                        <p>
                          <span className="font-bold text-mint">What you can do: </span>
                          <span className="text-muted">{c.more.look}</span>
                        </p>
                        <p>
                          <span className="font-bold text-mint">Where the Micro-Lab fits: </span>
                          <span className="text-muted">{c.more.lab}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : c.id)}
                    aria-expanded={isOpen}
                    aria-controls={`more-${c.id}`}
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border border-lime/30 px-4 font-display text-sm font-bold text-lime transition hover:bg-lime/10"
                  >
                    {isOpen ? "Show less" : "Learn more"}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} aria-hidden />
                  </button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* health */}
      <Reveal className="mt-16 sm:mt-24">
        <div className="glass relative overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(120,214,163,0.18),transparent_65%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime/10 text-lime">
                <Stethoscope className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold sm:text-3xl">Possible health concerns, explained responsibly</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Not every adulterated food causes harm, and most food sold is safe. Effects depend on what was added, how much, how often, and
                who eats it. These are general categories of concern, not claims about any product or place.
              </p>
              <div className="mt-5 flex gap-3 rounded-2xl border border-mint/25 bg-mint/[0.06] p-4 text-sm text-muted">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-mint" aria-hidden />
                <p>If you feel unwell after eating, seek medical advice first. Keep the packaging, which may help later.</p>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {HAZARDS.map(({ icon: Icon, t, d }) => (
                <li key={t} className="rounded-2xl border border-white/5 bg-ink/50 p-4 transition hover:border-lime/30">
                  <Icon className="h-5 w-5 text-lime" aria-hidden />
                  <h4 className="mt-3 font-display text-base font-bold">{t}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
