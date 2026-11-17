const svgProps = { viewBox: "0 0 96 96", fill: "none", "aria-hidden": true } as const;

export function MilkIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="34" y="8" width="28" height="10" rx="3" fill="#78D6A3" />
      <path d="M36 18h24l6 14v50a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6V32l6-14Z" fill="#EAF2ED" fillOpacity=".92" />
      <path d="M30 44h36v28a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6V44Z" fill="#78D6A3" fillOpacity=".25" />
      <rect x="36" y="48" width="24" height="20" rx="4" fill="#0a1410" fillOpacity=".85" />
      <path d="M42 58c3-5 9-5 12 0" stroke="#C9F36A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M72 16c3 6 6 9 6 13a6 6 0 0 1-12 0c0-4 3-7 6-13Z" fill="#EAF2ED" fillOpacity=".8" />
    </svg>
  );
}

export function TurmericIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M10 62h76c0 14-12 24-38 24S10 76 10 62Z" fill="#14251d" stroke="#C9F36A" strokeOpacity=".6" strokeWidth="1.5" />
      <path d="M18 62c4-18 14-30 30-30s26 12 30 30Z" fill="#F2B632" />
      <path d="M30 62c3-12 9-20 18-20s15 8 18 20Z" fill="#FFD25E" />
      <rect x="54" y="14" width="26" height="12" rx="6" transform="rotate(35 54 14)" fill="#D98A1A" />
      <rect x="14" y="20" width="24" height="11" rx="5.5" transform="rotate(-25 14 20)" fill="#E69B20" />
      <path d="M24 26l8 3M64 20l5 6" stroke="#9A5A0C" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="40" cy="52" r="1.5" fill="#fff" fillOpacity=".7" /><circle cx="58" cy="50" r="1.5" fill="#fff" fillOpacity=".7" />
    </svg>
  );
}

export function ChilliIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M26 34c20-8 44 0 52 22 4 12-4 28-20 30-6-18-18-22-34-18-8-16-6-28 2-34Z" fill="#D93A2B" />
      <path d="M30 40c14-4 30 2 38 16" stroke="#FF8A74" strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <path d="M26 34c-6-2-10-8-8-16 4 4 8 4 12 2l4 6-8 8Z" fill="#4FA85E" />
      <path d="M62 78c10 2 20-8 18-20" stroke="#8A1F15" strokeWidth="2" strokeLinecap="round" opacity=".6" />
      <circle cx="74" cy="22" r="2" fill="#D93A2B" /><circle cx="82" cy="30" r="1.5" fill="#D93A2B" /><circle cx="66" cy="14" r="1.5" fill="#D93A2B" />
    </svg>
  );
}

export function OilIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="38" y="6" width="20" height="10" rx="3" fill="#C9F36A" />
      <path d="M40 16h16v10c10 4 16 12 16 22v30a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8V48c0-10 6-18 16-22V16Z" fill="#F2B632" fillOpacity=".9" />
      <path d="M24 56h48v22a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8V56Z" fill="#FFD25E" fillOpacity=".7" />
      <rect x="32" y="40" width="32" height="22" rx="4" fill="#0a1410" fillOpacity=".85" />
      <path d="M48 44c-4 6-5 8-5 11a5 5 0 0 0 10 0c0-3-1-5-5-11Z" fill="#FFD25E" />
      <path d="M32 30c-2 6-2 12 0 18" stroke="#fff" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PantryIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="6" y="30" width="26" height="52" rx="6" fill="#EAF2ED" fillOpacity=".18" stroke="#EAF2ED" strokeOpacity=".7" />
      <rect x="9" y="52" width="20" height="27" rx="4" fill="#EAF2ED" fillOpacity=".9" />
      <rect x="8" y="22" width="22" height="10" rx="3" fill="#78D6A3" />
      <rect x="35" y="22" width="26" height="60" rx="6" fill="#EAF2ED" fillOpacity=".18" stroke="#EAF2ED" strokeOpacity=".7" />
      <rect x="38" y="44" width="20" height="35" rx="4" fill="#C98A3A" />
      <rect x="37" y="14" width="22" height="10" rx="3" fill="#C9F36A" />
      <rect x="64" y="38" width="26" height="44" rx="6" fill="#EAF2ED" fillOpacity=".18" stroke="#EAF2ED" strokeOpacity=".7" />
      <rect x="67" y="56" width="20" height="23" rx="4" fill="#8B5A2B" />
      <rect x="66" y="30" width="22" height="10" rx="3" fill="#F5C26B" />
      <circle cx="45" cy="55" r="2" fill="#e8b36b" /><circle cx="52" cy="62" r="2" fill="#e8b36b" /><circle cx="46" cy="70" r="2" fill="#e8b36b" />
    </svg>
  );
}
