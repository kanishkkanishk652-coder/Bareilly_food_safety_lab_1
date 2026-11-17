import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Hero: isometric portable micro-lab                                  */
/* ------------------------------------------------------------------ */
export function MicroLabIso({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 370" className={className} role="img" aria-label="Isometric illustration of the portable Micro-Lab prototype with LCD, sample chamber and pH probe">
      <defs>
        <linearGradient id="hTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f3a2d" />
          <stop offset="1" stopColor="#14251d" />
        </linearGradient>
        <linearGradient id="hLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1f18" />
          <stop offset="1" stopColor="#0a1511" />
        </linearGradient>
        <linearGradient id="hRight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#173126" />
          <stop offset="1" stopColor="#0c1a14" />
        </linearGradient>
        <radialGradient id="hGround" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#C9F36A" stopOpacity=".35" />
          <stop offset="1" stopColor="#C9F36A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hLiquid" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#E9FFA8" />
          <stop offset="1" stopColor="#78D6A3" />
        </radialGradient>
        <filter id="hGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <ellipse cx="200" cy="318" rx="190" ry="40" fill="url(#hGround)" />

      {/* faces */}
      <polygon points="61.4,150 200,230 200,312 61.4,232" fill="url(#hLeft)" stroke="#C9F36A" strokeOpacity=".25" />
      <polygon points="200,230 338.6,150 338.6,232 200,312" fill="url(#hRight)" stroke="#C9F36A" strokeOpacity=".3" />
      <polygon points="200,70 338.6,150 200,230 61.4,150" fill="url(#hTop)" stroke="#C9F36A" strokeOpacity=".55" />

      {/* left face detail */}
      <g transform="matrix(0.866 0.5 0 1 61.4 150)">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={14 + i * 9} y={14} width="4" height="26" rx="2" fill="#070F0D" stroke="#78D6A3" strokeOpacity=".4" />
        ))}
        <rect x="84" y="20" width="32" height="16" rx="3" fill="#070F0D" stroke="#C9F36A" strokeOpacity=".5" />
        <text x="14" y="62" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#9AADA4">BUZZER VENT</text>
        <text x="84" y="50" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#9AADA4">USB-B</text>
        <path d="M130 14 h20 M130 22 h14 M130 30 h20" stroke="#78D6A3" strokeOpacity=".5" />
      </g>

      {/* right face detail */}
      <g transform="matrix(0.866 -0.5 0 1 200 230)">
        <text x="14" y="34" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="15" fill="#EAF2ED">MICRO-LAB</text>
        <text x="14" y="50" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#C9F36A">pH · RGB · ARDUINO</text>
        <path d="M14 62 H146" stroke="#C9F36A" strokeOpacity=".5" className="anim-flow" />
        <circle cx="140" cy="20" r="4" fill="#C9F36A" className="anim-glow" filter="url(#hGlow)" />
      </g>

      {/* top plane */}
      <g transform="matrix(0.866 0.5 -0.866 0.5 200 70)">
        <rect x="8" y="8" width="144" height="144" rx="6" fill="none" stroke="#78D6A3" strokeOpacity=".15" strokeDasharray="3 4" />
        {/* LCD */}
        <rect x="14" y="14" width="86" height="36" rx="3" fill="#0a1a12" stroke="#C9F36A" strokeOpacity=".7" />
        <rect x="18" y="18" width="78" height="28" rx="2" fill="#9ccf55" fillOpacity=".92" />
        <text x="22" y="29" fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="8" fill="#0a1a12">pH 6.62  [SIM]</text>
        <text x="22" y="40" fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="8" fill="#0a1a12">R212 G198 B171</text>
        {/* LEDs & buzzer */}
        <circle cx="116" cy="22" r="4.5" fill="#C9F36A" filter="url(#hGlow)" className="anim-glow" />
        <circle cx="130" cy="22" r="4.5" fill="#78D6A3" />
        <circle cx="144" cy="22" r="4.5" fill="#F5C26B" />
        <circle cx="130" cy="44" r="8" fill="#070F0D" stroke="#9AADA4" strokeOpacity=".6" />
        <circle cx="130" cy="44" r="2.5" fill="#9AADA4" />
        {/* TCS3200 */}
        <rect x="14" y="70" width="34" height="24" rx="2" fill="#0d2a22" stroke="#78D6A3" strokeOpacity=".7" />
        <rect x="26" y="76" width="10" height="10" fill="#EAF2ED" fillOpacity=".85" />
        <circle cx="19" cy="75" r="1.8" fill="#EAF2ED" /><circle cx="43" cy="75" r="1.8" fill="#EAF2ED" />
        <circle cx="19" cy="89" r="1.8" fill="#EAF2ED" /><circle cx="43" cy="89" r="1.8" fill="#EAF2ED" />
        {/* sample chamber */}
        <circle cx="100" cy="108" r="30" fill="#070F0D" stroke="#C9F36A" strokeOpacity=".8" strokeWidth="1.5" />
        <circle cx="100" cy="108" r="23" fill="url(#hLiquid)" fillOpacity=".9" />
        <circle cx="100" cy="108" r="30" fill="none" stroke="#C9F36A" strokeOpacity=".4" strokeWidth="5" className="anim-glow" />
        <path d="M14 126 H60 M14 134 H48" stroke="#78D6A3" strokeOpacity=".4" />
        <text x="14" y="146" fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="#9AADA4">SAMPLE BAY</text>
      </g>

      {/* pH probe */}
      <g filter="url(#hGlow)">
        <path d="M212 168 L262 100" stroke="#EAF2ED" strokeWidth="6" strokeLinecap="round" strokeOpacity=".9" />
        <path d="M212 168 L222 154" stroke="#C9F36A" strokeWidth="6" strokeLinecap="round" />
        <path d="M258 105 L272 86" stroke="#14251D" strokeWidth="9" strokeLinecap="round" />
      </g>
      <path d="M272 86 C 300 60, 336 88, 322 138" fill="none" stroke="#78D6A3" strokeWidth="2" strokeOpacity=".8" className="anim-flow" />

      {/* corner glow nodes */}
      {[[200, 70], [338.6, 150], [61.4, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#C9F36A" className="anim-glow" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Exploded view                                                       */
/* ------------------------------------------------------------------ */
function Slab({
  cy,
  active,
  onSelect,
  label,
  children,
  fill = "#14251d",
}: {
  cy: number;
  active: boolean;
  onSelect: () => void;
  label: string;
  children: ReactNode;
  fill?: string;
}) {
  const cx = 230;
  const r = 104;
  const d = 60;
  const t = 12;
  const stroke = active ? "#C9F36A" : "#78D6A3";
  const so = active ? 1 : 0.35;
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={active}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect())}
      style={{ cursor: "pointer", transition: "transform .4s ease", transform: active ? "translateY(-6px)" : "none" }}
    >
      {active && <ellipse cx={cx} cy={cy + t} rx={r + 14} ry={d + 12} fill="#C9F36A" opacity=".08" />}
      <polygon points={`${cx - r},${cy} ${cx},${cy + d} ${cx},${cy + d + t} ${cx - r},${cy + t}`} fill="#0b1712" stroke={stroke} strokeOpacity={so} />
      <polygon points={`${cx},${cy + d} ${cx + r},${cy} ${cx + r},${cy + t} ${cx},${cy + d + t}`} fill="#0e1d16" stroke={stroke} strokeOpacity={so} />
      <polygon points={`${cx},${cy - d} ${cx + r},${cy} ${cx},${cy + d} ${cx - r},${cy}`} fill={fill} stroke={stroke} strokeOpacity={active ? 1 : 0.6} strokeWidth={active ? 1.6 : 1} />
      <g transform={`matrix(0.866 0.5 -0.866 0.5 ${cx} ${cy - d})`}>{children}</g>
    </g>
  );
}

export function ExplodedView({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const mono = { fontFamily: "JetBrains Mono, monospace" } as const;
  const layers = [90, 215, 340, 465];
  return (
    <svg viewBox="0 0 500 560" className="mx-auto h-auto w-full max-w-[520px]" role="group" aria-label="Exploded isometric view of the Micro-Lab with four layers. Select a layer to learn more.">
      <defs>
        <filter id="eGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* vertical guides */}
      {[126, 230, 334].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="520" stroke="#C9F36A" strokeOpacity=".18" strokeDasharray="3 6" />
      ))}

      {/* bottom → top draw order */}
      <Slab cy={layers[3]} active={active === 3} onSelect={() => onSelect(3)} label="Layer 4: Power and USB link to the Python dashboard">
        <rect x="14" y="16" width="52" height="88" rx="4" fill="#070F0D" stroke="#78D6A3" strokeOpacity=".6" />
        <rect x="20" y="22" width="40" height="8" rx="2" fill="#C9F36A" fillOpacity=".8" />
        <rect x="20" y="34" width="40" height="8" rx="2" fill="#78D6A3" fillOpacity=".5" />
        <rect x="20" y="46" width="40" height="8" rx="2" fill="#78D6A3" fillOpacity=".3" />
        <text x="18" y="76" fontSize="7" fill="#9AADA4" style={mono}>USB POWER</text>
        <rect x="82" y="20" width="26" height="18" rx="2" fill="#9AADA4" fillOpacity=".7" />
        <path d="M95 38 V70 H70" fill="none" stroke="#C9F36A" strokeWidth="1.5" className="anim-flow" />
        <rect x="76" y="82" width="34" height="22" rx="2" fill="#070F0D" stroke="#C9F36A" strokeOpacity=".6" />
        <path d="M80 98 L86 90 L92 95 L98 86 L106 92" fill="none" stroke="#C9F36A" strokeWidth="1.2" />
      </Slab>

      <Slab cy={layers[2]} active={active === 2} onSelect={() => onSelect(2)} label="Layer 3: Arduino Uno R3 controller">
        <rect x="8" y="14" width="104" height="92" rx="5" fill="#0d5b58" stroke="#78D6A3" />
        <rect x="8" y="30" width="22" height="26" fill="#9AADA4" fillOpacity=".75" />
        <rect x="8" y="72" width="16" height="22" fill="#070F0D" />
        <rect x="52" y="52" width="34" height="14" fill="#070F0D" stroke="#C9F36A" strokeOpacity=".6" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <rect key={i} x={36 + i * 7} y={16} width="4" height="5" fill="#070F0D" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x={40 + i * 8} y={98} width="4" height="5" fill="#070F0D" />
        ))}
        <circle cx="98" cy="38" r="4" fill="#C9F36A" className="anim-blink" />
        <text x="40" y="84" fontSize="8" fontWeight="700" fill="#EAF2ED" style={mono}>UNO R3</text>
      </Slab>

      <Slab cy={layers[1]} active={active === 1} onSelect={() => onSelect(1)} label="Layer 2: Sensor deck with TCS3200, sample chamber and pH module">
        <circle cx="62" cy="62" r="26" fill="#070F0D" stroke="#C9F36A" strokeWidth="1.5" />
        <circle cx="62" cy="62" r="19" fill="#78D6A3" fillOpacity=".75" />
        <rect x="46" y="10" width="34" height="20" rx="2" fill="#0d2a22" stroke="#78D6A3" />
        <rect x="57" y="14" width="12" height="12" fill="#EAF2ED" />
        <rect x="8" y="88" width="52" height="24" rx="2" fill="#1a3d8a" fillOpacity=".75" stroke="#78D6A3" strokeOpacity=".6" />
        <circle cx="48" cy="100" r="7" fill="#9AADA4" />
        <text x="12" y="98" fontSize="6" fill="#EAF2ED" style={mono}>pH</text>
        <path d="M70 62 L112 62" stroke="#C9F36A" strokeWidth="1.4" className="anim-flow" />
      </Slab>

      <Slab cy={layers[0]} active={active === 0} onSelect={() => onSelect(0)} label="Layer 1: Lid with LCD, LEDs and buzzer">
        <rect x="12" y="12" width="68" height="30" rx="3" fill="#0a1a12" stroke="#C9F36A" />
        <rect x="15" y="15" width="62" height="24" rx="2" fill="#9ccf55" fillOpacity=".9" />
        <text x="19" y="25" fontSize="7" fontWeight="600" fill="#0a1a12" style={mono}>MICRO-LAB</text>
        <text x="19" y="34" fontSize="7" fontWeight="600" fill="#0a1a12" style={mono}>SCREENING</text>
        <circle cx="96" cy="20" r="4" fill="#C9F36A" filter="url(#eGlow)" />
        <circle cx="108" cy="20" r="4" fill="#78D6A3" />
        <circle cx="96" cy="36" r="4" fill="#F5C26B" />
        <circle cx="62" cy="76" r="14" fill="#070F0D" stroke="#9AADA4" strokeOpacity=".6" />
        <circle cx="62" cy="76" r="4" fill="#9AADA4" />
      </Slab>

      {/* callout badges */}
      {[
        { i: 0, y: layers[0], x: 340 },
        { i: 1, y: layers[1], x: 340 },
        { i: 2, y: layers[2], x: 340 },
        { i: 3, y: layers[3], x: 340 },
      ].map((b) => (
        <g key={b.i} style={{ cursor: "pointer" }} onClick={() => onSelect(b.i)}>
          <path d={`M${334} ${b.y} H${420}`} stroke="#C9F36A" strokeOpacity={active === b.i ? 0.9 : 0.3} strokeDasharray="3 4" />
          <circle cx="440" cy={b.y} r="16" fill={active === b.i ? "#C9F36A" : "#14251d"} stroke="#C9F36A" strokeOpacity=".7" />
          <text x="440" y={b.y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={active === b.i ? "#0a1410" : "#C9F36A"} style={{ fontFamily: "Manrope, sans-serif" }}>
            {b.i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Arduino board                                                       */
/* ------------------------------------------------------------------ */
export function ArduinoBoard({ className }: { className?: string }) {
  const mono = { fontFamily: "JetBrains Mono, monospace" } as const;
  return (
    <svg viewBox="0 0 340 220" className={className} role="img" aria-label="Arduino Uno illustration with glowing data lines from the sensors to the microcontroller">
      <defs>
        <filter id="aGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* input tags */}
      <g fontSize="8" fill="#C9F36A" style={mono}>
        <rect x="76" y="2" width="62" height="18" rx="9" fill="#C9F36A" fillOpacity=".1" stroke="#C9F36A" strokeOpacity=".5" />
        <text x="107" y="14" textAnchor="middle">TCS3200</text>
        <rect x="196" y="2" width="62" height="18" rx="9" fill="#78D6A3" fillOpacity=".1" stroke="#78D6A3" strokeOpacity=".5" />
        <text x="227" y="14" textAnchor="middle" fill="#78D6A3">I2C LCD</text>
        <rect x="76" y="200" width="62" height="18" rx="9" fill="#C9F36A" fillOpacity=".1" stroke="#C9F36A" strokeOpacity=".5" />
        <text x="107" y="212" textAnchor="middle">pH · A0</text>
        <rect x="262" y="200" width="68" height="18" rx="9" fill="#78D6A3" fillOpacity=".1" stroke="#78D6A3" strokeOpacity=".5" />
        <text x="296" y="212" textAnchor="middle" fill="#78D6A3">PC · SERIAL</text>
      </g>

      {/* board */}
      <rect x="22" y="34" width="296" height="152" rx="10" fill="#0d5b58" stroke="#78D6A3" strokeOpacity=".8" />
      <rect x="22" y="34" width="296" height="152" rx="10" fill="none" stroke="#C9F36A" strokeOpacity=".25" strokeDasharray="2 5" />
      {/* USB + jack */}
      <rect x="2" y="62" width="48" height="40" rx="3" fill="#aab6b1" />
      <rect x="8" y="68" width="36" height="28" rx="2" fill="#6f7d77" />
      <rect x="2" y="124" width="40" height="38" rx="3" fill="#0a1410" stroke="#9AADA4" strokeOpacity=".5" />
      <circle cx="18" cy="143" r="7" fill="#1b2a24" stroke="#9AADA4" strokeOpacity=".5" />
      {/* headers */}
      <rect x="66" y="38" width="200" height="12" rx="2" fill="#070F0D" />
      <rect x="82" y="170" width="170" height="12" rx="2" fill="#070F0D" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={70 + i * 9.7} y={41} width="4" height="6" fill="#9AADA4" fillOpacity=".7" />
      ))}
      {Array.from({ length: 17 }).map((_, i) => (
        <rect key={i} x={86 + i * 9.7} y={173} width="4" height="6" fill="#9AADA4" fillOpacity=".7" />
      ))}
      {/* chip */}
      <rect x="150" y="84" width="92" height="38" rx="3" fill="#0a0f0d" stroke="#C9F36A" strokeOpacity=".7" filter="url(#aGlow)" />
      {Array.from({ length: 14 }).map((_, i) => (
        <g key={i}>
          <rect x={154 + i * 6.3} y={80} width="2.5" height="4" fill="#9AADA4" />
          <rect x={154 + i * 6.3} y={122} width="2.5" height="4" fill="#9AADA4" />
        </g>
      ))}
      <text x="196" y="100" textAnchor="middle" fontSize="8" fontWeight="700" fill="#C9F36A" style={mono}>ATmega328P</text>
      <text x="196" y="112" textAnchor="middle" fontSize="6.5" fill="#9AADA4" style={mono}>10-bit ADC · I2C · UART</text>
      {/* small parts */}
      <circle cx="78" cy="88" r="8" fill="#b83d3d" stroke="#0a1410" />
      <rect x="258" y="86" width="22" height="9" rx="4.5" fill="#cfd8d3" />
      <rect x="110" y="132" width="20" height="9" rx="2" fill="#9AADA4" fillOpacity=".8" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={266 + i * 11} cy={138} r="2.6" fill={i === 0 ? "#C9F36A" : "#78D6A3"} className={i === 0 ? "anim-glow" : ""} />
      ))}
      <text x="150" y="154" fontSize="11" fontWeight="800" fill="#EAF2ED" fillOpacity=".9" style={{ fontFamily: "Manrope, sans-serif" }}>ARDUINO UNO</text>

      {/* data paths */}
      <g fill="none" strokeWidth="1.8" filter="url(#aGlow)" strokeLinecap="round">
        <path d="M107 20 V60 H196 V84" stroke="#C9F36A" className="anim-flow" />
        <path d="M196 84 V66 H227 V20" stroke="#78D6A3" className="anim-flow-rev" />
        <path d="M107 200 V160 H175 V126" stroke="#C9F36A" className="anim-flow" />
        <path d="M242 112 H296 V200" stroke="#78D6A3" className="anim-flow-rev" />
        <path d="M150 104 H100 V80 H50" stroke="#9AADA4" strokeOpacity=".6" className="anim-flow-rev" />
      </g>
    </svg>
  );
}
