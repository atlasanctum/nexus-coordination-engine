import { useMemo, useState } from "react";
import { hueVar, nodeLegend, flowLegend, type Hue } from "./data";
import { Chip } from "./primitives";

type Node = { id: number; x: number; y: number; r: number; hue: Hue; name: string; kind: string };

const kinds: { kind: string; hue: Hue }[] = [
  { kind: "Government", hue: "electric" },
  { kind: "NGO", hue: "emerald" },
  { kind: "University", hue: "violet" },
  { kind: "Investor", hue: "amber" },
  { kind: "Enterprise", hue: "cyan" },
  { kind: "Community Org", hue: "rose" },
  { kind: "Intl. Agency", hue: "foreground" },
];

const names = [
  "Sahel Water Alliance", "Delhi Skills University", "Impact Capital Partners", "Amazonia Guardians",
  "Kenya Solar Trust", "Nordic Climate Institute", "Global Health Foundation", "AgriTech Union",
  "Ministry of Energy", "Pacific Islands Council", "Andes Health Network", "Urban Futures Lab",
];

function buildNodes(): Node[] {
  const out: Node[] = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 150; i++) {
    const a = rnd() * Math.PI * 2;
    const rad = 60 + Math.pow(rnd(), 0.62) * 250;
    const k = kinds[Math.floor(rnd() * kinds.length)]!;
    out.push({
      id: i,
      x: Math.round((340 + Math.cos(a) * rad * 1.28) * 100) / 100,
      y: Math.round((240 + Math.sin(a) * rad * 0.82) * 100) / 100,
      r: Math.round((1.6 + rnd() * 3.6) * 100) / 100,
      hue: k.hue,
      kind: k.kind,
      name: names[i % names.length]!,
    });
  }
  return out;
}

export function NetworkGraph() {
  const nodes = useMemo(buildNodes, []);
  const [selected, setSelected] = useState<Node | null>(null);

  const links = useMemo(() => {
    const l: { a: Node; b: Node; hue: Hue }[] = [];
    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i]!;
      const b = nodes[(i * 7 + 13) % nodes.length]!;
      l.push({ a, b, hue: flowLegend[i % flowLegend.length]!.hue });
    }
    return l;
  }, [nodes]);

  return (
    <section className="glass relative overflow-hidden p-4">
      <header className="mb-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="panel-title">Global Organization Network Graph</h3>
          <p className="text-xs text-muted-foreground">
            Live coordination fabric · 15,248 organizations · 8,924 partnerships
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {nodeLegend.map((n) => (
            <Chip key={n.label} hue={n.hue}>
              {n.label}
            </Chip>
          ))}
        </div>
      </header>

      <div className="relative">
        <svg viewBox="0 0 680 480" className="w-full" role="img" aria-label="Global organization network graph">
          <defs>
            <radialGradient id="core" cx="50%" cy="50%">
              <stop offset="0%" stopColor="var(--hue-cyan)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--hue-cyan)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="340" cy="240" r="230" fill="url(#core)" />
          {[110, 165, 220].map((r) => (
            <ellipse
              key={r}
              cx="340"
              cy="240"
              rx={r * 1.28}
              ry={r * 0.82}
              fill="none"
              stroke="color-mix(in oklab, var(--hue-electric) 24%, transparent)"
              strokeDasharray="2 8"
            />
          ))}

          {links.map((l, i) => (
            <path
              key={i}
              d={`M${l.a.x},${l.a.y} Q340,240 ${l.b.x},${l.b.y}`}
              fill="none"
              stroke={hueVar[l.hue]}
              strokeWidth={0.55}
              opacity={0.4}
              className="animate-flow"
              style={{ animationDelay: `${(i % 12) * -0.7}s` }}
            />
          ))}

          {nodes.map((n) => (
            <g key={n.id} onClick={() => setSelected(n)} style={{ cursor: "pointer" }}>
              <circle cx={n.x} cy={n.y} r={n.r * 2.6} fill={hueVar[n.hue]} opacity={0.12} />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={hueVar[n.hue]}
                style={{ filter: `drop-shadow(0 0 4px ${hueVar[n.hue]})` }}
              />
            </g>
          ))}

          <circle cx="340" cy="240" r="46" fill="oklch(0.16 0.03 272 / 80%)" stroke="var(--hue-cyan)" strokeOpacity="0.5" />
          <text x="340" y="234" textAnchor="middle" className="num" fontSize="16" fill="var(--hue-cyan)">
            15,248
          </text>
          <text x="340" y="252" textAnchor="middle" fontSize="8" fill="var(--muted-foreground)" letterSpacing="1.4">
            ORGANIZATIONS
          </text>
        </svg>

        {selected ? (
          <div className="glass animate-float absolute top-3 left-3 w-64 p-3">
            <div className="flex items-center justify-between">
              <Chip hue={selected.hue}>{selected.kind}</Chip>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-muted-foreground hover:text-foreground"
                aria-label="Close node details"
              >
                ✕
              </button>
            </div>
            <h4 className="mt-2 text-sm text-foreground">{selected.name}</h4>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Mission: mobilize local capacity into verified regenerative outcomes.
            </p>
            <dl className="mt-2 grid grid-cols-2 gap-y-1 text-[11px]">
              {[
                ["Impact", "94.2"],
                ["Funding", "$248M"],
                ["Collaborations", "34"],
                ["Trust score", "92.6"],
                ["Moral intel.", "94.6"],
                ["Risk", "Low"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between pr-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="num" style={{ color: hueVar[selected.hue] }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 border-t border-border pt-2 text-[11px] text-muted-foreground">
              <span style={{ color: hueVar.cyan }}>AI: </span>
              Pair with Solar Access Consortium for +24% projected impact.
            </p>
          </div>
        ) : null}
      </div>

      <footer className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="mono-label">Flows</span>
        {flowLegend.map((f) => (
          <span key={f.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-px w-5" style={{ backgroundColor: hueVar[f.hue] }} />
            {f.label}
          </span>
        ))}
        <span className="ml-auto text-[11px] text-muted-foreground">Click any node to expand</span>
      </footer>
    </section>
  );
}
