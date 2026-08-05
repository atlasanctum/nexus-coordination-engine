import type { ReactNode } from "react";
import { hueVar, type Hue } from "./data";

export function Panel({
  title,
  subtitle,
  action,
  className = "",
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`glass p-4 ${className}`}>
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="panel-title">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function Chip({ children, hue = "cyan" }: { children: ReactNode; hue?: Hue }) {
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide"
      style={{
        color: hueVar[hue],
        backgroundColor: `color-mix(in oklab, ${hueVar[hue]} 14%, transparent)`,
        border: `1px solid color-mix(in oklab, ${hueVar[hue]} 30%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

export function Gauge({
  value,
  label,
  hue = "cyan",
  size = 92,
}: {
  value: number;
  label?: string;
  hue?: Hue;
  size?: number;
}) {
  const r = size / 2 - 7;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={5}
          stroke="color-mix(in oklab, var(--foreground) 10%, transparent)"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={5}
          strokeLinecap="round"
          stroke={hueVar[hue]}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          style={{ filter: `drop-shadow(0 0 6px ${hueVar[hue]})`, transition: "stroke-dashoffset 1.2s ease" }}
        />
      </svg>
      <div className="-mt-[calc(50%+0.4rem)] mb-[calc(50%-1.1rem)] text-center">
        <div className="num text-base leading-none" style={{ color: hueVar[hue] }}>
          {value}
        </div>
      </div>
      {label ? <span className="text-center text-[10px] leading-tight text-muted-foreground">{label}</span> : null}
    </div>
  );
}

function path(values: number[], w: number, h: number) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 6) - 3;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function series(seed: number, n = 26) {
  const out: number[] = [];
  let v = 40 + (seed % 17);
  for (let i = 0; i < n; i++) {
    v += Math.sin((i + seed) * 0.7) * 4 + ((seed * (i + 3)) % 7) - 2.4 + 1.6;
    out.push(Math.max(6, v));
  }
  return out;
}

export function Spark({
  values,
  hue = "cyan",
  kind = "line",
  height = 54,
}: {
  values: number[];
  hue?: Hue;
  kind?: "line" | "area" | "bars";
  height?: number;
}) {
  const w = 200;
  const color = hueVar[hue];
  if (kind === "bars") {
    const max = Math.max(...values);
    const bw = w / values.length;
    return (
      <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
        {values.map((v, i) => (
          <rect
            key={i}
            x={i * bw + 1}
            y={height - (v / max) * (height - 4)}
            width={bw - 2}
            height={(v / max) * (height - 4)}
            rx={1.2}
            fill={color}
            opacity={0.35 + (i / values.length) * 0.6}
          />
        ))}
      </svg>
    );
  }
  const d = path(values, w, height);
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      {kind === "area" ? (
        <path d={`${d} L${w},${height} L0,${height} Z`} fill={color} opacity={0.16} />
      ) : null}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 5px color-mix(in oklab, ${color} 60%, transparent))` }}
      />
    </svg>
  );
}

export function Meter({ value, hue = "emerald" }: { value: number; hue?: Hue }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, color-mix(in oklab, ${hueVar[hue]} 45%, transparent), ${hueVar[hue]})`,
          boxShadow: `0 0 10px color-mix(in oklab, ${hueVar[hue]} 60%, transparent)`,
        }}
      />
    </div>
  );
}
