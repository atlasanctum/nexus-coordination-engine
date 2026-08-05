import { useMemo, useState } from "react";
import { hueVar, mapLayers } from "./data";

// Coarse landmass grid (1 = land) used to render a dotted, illuminated world map.
const LAND = [
  "0000011111000000000000000011111111000000000000",
  "0001111111110000000001111111111111111100000000",
  "0011111111111000000011111111111111111111000000",
  "0001111111110000000011111111111111111111110000",
  "0000111111000000000001111111111111111111111000",
  "0000011110000000000000111111111111111111110000",
  "0000011100000000000000011111111111111111100000",
  "0000011000000000000000011111111111111111000000",
  "0000001100000000000000001111111111111100000000",
  "0000001110000000000000000111111111111000000000",
  "0000000111000000000000000011111111100000000000",
  "0000000111000000000000000001111111000000000000",
  "0000000110000000000000000000111110000000000000",
  "0000000110000000000000000000011100000000000000",
  "0000000100000000000000000000001100000000110000",
  "0000000000000000000000000000000000000001110000",
];

export function WorldMap() {
  const [layers, setLayers] = useState(() => mapLayers.map((l) => l.on));
  const cells = useMemo(() => {
    const out: { x: number; y: number; hue: string; o: number }[] = [];
    LAND.forEach((row, y) => {
      row.split("").forEach((c, x) => {
        if (c !== "1") return;
        const idx = (x * 3 + y * 7) % mapLayers.length;
        out.push({ x, y, hue: hueVar[mapLayers[idx]!.hue], o: 0.35 + ((x + y) % 5) * 0.13 });
      });
    });
    return out;
  }, []);

  const active = new Set(mapLayers.filter((_, i) => layers[i]).map((l) => hueVar[l.hue]));

  return (
    <section className="glass p-4">
      <header className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="panel-title">Global Organization Map</h3>
          <p className="text-xs text-muted-foreground">Heatmap of institutional density and live activity</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {mapLayers.map((l, i) => (
            <button
              key={l.label}
              onClick={() => setLayers((s) => s.map((v, j) => (i === j ? !v : v)))}
              className="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] transition-opacity"
              style={{
                color: layers[i] ? hueVar[l.hue] : "var(--muted-foreground)",
                border: `1px solid color-mix(in oklab, ${hueVar[l.hue]} ${layers[i] ? 32 : 12}%, transparent)`,
                backgroundColor: layers[i]
                  ? `color-mix(in oklab, ${hueVar[l.hue]} 12%, transparent)`
                  : "transparent",
              }}
              aria-pressed={layers[i]}
            >
              <span className="size-1.5 rounded-full" style={{ backgroundColor: hueVar[l.hue] }} />
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <svg viewBox="0 0 460 170" className="w-full" role="img" aria-label="World map of organization density">
        {cells
          .filter((c) => active.has(c.hue))
          .map((c, i) => (
            <circle
              key={i}
              cx={c.x * 10 + 6}
              cy={c.y * 10 + 8}
              r={2}
              fill={c.hue}
              opacity={c.o}
              style={{ filter: "drop-shadow(0 0 3px currentColor)" }}
            />
          ))}
        {[
          [110, 60],
          [235, 72],
          [252, 108],
          [330, 62],
          [365, 96],
          [90, 118],
          [408, 140],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={8}
              fill="none"
              stroke={hueVar.cyan}
              strokeWidth={0.8}
              className="animate-pulse-node"
              style={{ animationDelay: `${i * 0.45}s`, transformOrigin: `${x}px ${y}px` }}
            />
            <circle cx={x} cy={y} r={2.4} fill={hueVar.cyan} />
          </g>
        ))}
      </svg>

      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {[
          ["Africa", "3,892"],
          ["Asia", "4,652"],
          ["Europe", "2,487"],
          ["N. America", "2,142"],
          ["S. America", "1,189"],
          ["Oceania", "886"],
        ].map(([r, v]) => (
          <div key={r} className="glass-soft px-2 py-1.5">
            <p className="mono-label">{r}</p>
            <p className="num text-sm" style={{ color: hueVar.cyan }}>
              {v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
