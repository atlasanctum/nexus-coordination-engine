import {
  hueVar,
  kpis,
  profile,
  partnerships,
  moral,
  analytics,
  discovery,
  feed,
  atlasActions,
  type Hue,
} from "./data";
import { Panel, Chip, Gauge, Meter, Spark, series } from "./primitives";
import {
  Building2,
  Globe2,
  Link2,
  Network,
  Layers,
  Coins,
  Users,
  Activity,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const kpiIcons: Record<string, typeof Activity> = {
  building: Building2,
  globe: Globe2,
  link: Link2,
  network: Network,
  layers: Layers,
  coins: Coins,
  users: Users,
  activity: Activity,
  shield: ShieldCheck,
  sparkle: Sparkles,
};

export function KpiRow() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {kpis.map((k, i) => {
        const Icon = kpiIcons[k.icon] ?? Activity;
        return (
          <article key={k.label} className="glass px-3 py-2.5">
            <div className="flex items-start justify-between gap-2">
              <div
                className="glass-soft animate-float flex size-8 items-center justify-center"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <Icon size={15} style={{ color: hueVar[k.hue] }} aria-hidden="true" />
              </div>
              <span className="num text-[11px]" style={{ color: hueVar.emerald }}>
                ↑ {k.growth}
              </span>
            </div>
            <p className="mono-label mt-2 truncate">{k.label}</p>
            <p className="num text-xl leading-tight" style={{ color: hueVar[k.hue] }}>
              {k.value}
            </p>
            <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
              <TrendingUp size={10} aria-hidden="true" /> {k.forecast}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <Meter value={k.confidence} hue={k.hue} />
              <span className="num text-[10px] text-muted-foreground">{k.confidence}%</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function OrgProfile() {
  return (
    <Panel title="Organization Profile" subtitle="Selected organization">
      <div className="flex items-start gap-3">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "var(--gradient-aurora)" }}
        >
          <Globe2 size={22} className="text-background" aria-hidden="true" />
        </div>
        <div>
          <h4 className="text-sm text-foreground">{profile.name}</h4>
          <p className="text-[11px] text-muted-foreground">{profile.type}</p>
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{profile.mission}</p>

      <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-[11px]">
        {[
          ["Headquarters", profile.hq],
          ["Regions", profile.regions],
          ["Employees", profile.employees],
          ["Volunteers", profile.volunteers],
          ...profile.meta.map((m) => [m.label, m.value] as [string, string]),
        ].map(([k, v]) => (
          <div key={k} className="pr-2">
            <dt className="mono-label">{k}</dt>
            <dd className="text-foreground">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {profile.gauges.map((g) => (
          <Gauge key={g.label} value={g.value} label={g.label} hue={g.hue} size={72} />
        ))}
      </div>

      <div className="mt-3">
        <p className="mono-label mb-1.5">SDG alignment</p>
        <div className="flex flex-wrap gap-1.5">
          {profile.sdg.map((n) => (
            <span
              key={n}
              className="num flex size-7 items-center justify-center rounded-md text-[11px]"
              style={{
                color: hueVar.emerald,
                backgroundColor: "color-mix(in oklab, var(--hue-emerald) 14%, transparent)",
                border: "1px solid color-mix(in oklab, var(--hue-emerald) 28%, transparent)",
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="mono-label mb-1.5">Recent achievements</p>
        <ul className="space-y-1">
          {profile.achievements.map((a) => (
            <li key={a} className="flex gap-2 text-[11px] text-muted-foreground">
              <span style={{ color: hueVar.cyan }}>▸</span>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

export function PartnershipEngine() {
  return (
    <Panel
      title="AI Partnership Engine"
      subtitle="Organizations you should partner with"
      action={<Chip hue="violet">Roadmap ready</Chip>}
    >
      <ul className="space-y-2">
        {partnerships.map((p) => (
          <li key={p.name} className="glass-soft p-2.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h4 className="text-[13px] text-foreground">{p.name}</h4>
                <p className="text-[10px] text-muted-foreground">{p.country}</p>
              </div>
              <div className="text-right">
                <span className="num text-base" style={{ color: hueVar[p.hue] }}>
                  {p.compat}
                </span>
                <p className="mono-label">compat</p>
              </div>
            </div>
            <div className="mt-1.5">
              <Meter value={p.compat} hue={p.hue} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {p.shared.map((s) => (
                <Chip key={s} hue={p.hue}>
                  {s}
                </Chip>
              ))}
              <Chip hue="amber">Missing: {p.missing}</Chip>
              <span className="num ml-auto text-[11px]" style={{ color: hueVar.emerald }}>
                {p.uplift}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] text-foreground transition-opacity hover:opacity-85"
        style={{ background: "var(--gradient-aurora)" }}>
        Generate AI collaboration roadmap <ArrowRight size={13} aria-hidden="true" />
      </button>
    </Panel>
  );
}

export function Analytics() {
  return (
    <Panel title="Collaboration Analytics" subtitle="Ecosystem telemetry across 30 days">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {analytics.map((a, i) => (
          <article key={a.title} className="glass-soft p-2.5">
            <p className="mono-label truncate">{a.title}</p>
            <div className="flex items-baseline justify-between">
              <span className="num text-sm" style={{ color: hueVar[a.hue] }}>
                {a.value}
              </span>
              <span className="num text-[10px]" style={{ color: hueVar.emerald }}>
                {a.delta}
              </span>
            </div>
            <Spark values={series(i * 5 + 3)} hue={a.hue} kind={a.kind} />
          </article>
        ))}
      </div>
    </Panel>
  );
}

export function MoralPanel() {
  return (
    <Panel title="Moral & Trust" subtitle="Ethical posture of the organization">
      <ul className="space-y-2">
        {moral.map((m) => {
          const hue: Hue = m.value >= 93 ? "emerald" : m.value >= 91 ? "cyan" : "amber";
          return (
            <li key={m.label}>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">{m.label}</span>
                <span className="num" style={{ color: hueVar[hue] }}>
                  {m.value}
                </span>
              </div>
              <div className="mt-1">
                <Meter value={m.value} hue={hue} />
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

export function Discovery() {
  return (
    <Panel title="Organization Discovery" subtitle="Featured organizations across the network">
      <div className="flex snap-x gap-3 overflow-x-auto pb-2">
        {discovery.map((d) => (
          <article key={d.name} className="glass-soft w-64 shrink-0 snap-start p-3">
            <div className="flex items-center gap-2">
              <span
                className="flex size-9 items-center justify-center rounded-lg text-[11px]"
                style={{
                  background: `color-mix(in oklab, ${hueVar[d.hue]} 18%, transparent)`,
                  color: hueVar[d.hue],
                  border: `1px solid color-mix(in oklab, ${hueVar[d.hue]} 34%, transparent)`,
                }}
              >
                {d.name.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <h4 className="truncate text-[12px] text-foreground">{d.name}</h4>
                <p className="text-[10px] text-muted-foreground">
                  {d.country} · {d.sector}
                </p>
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{d.summary}</p>
            <dl className="mt-2 grid grid-cols-3 gap-1 text-center">
              {[
                ["Projects", d.projects],
                ["Impact", d.impact],
                ["Trust", d.trust],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <dt className="mono-label">{k}</dt>
                  <dd className="num text-[12px]" style={{ color: hueVar[d.hue] }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-2 flex items-center justify-between">
              <Chip hue={d.hue}>Partnership {d.rating}</Chip>
              <button className="rounded-md px-2 py-1 text-[11px] text-foreground"
                style={{ backgroundColor: `color-mix(in oklab, ${hueVar[d.hue]} 22%, transparent)` }}>
                Collaborate
              </button>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

export function ActivityFeed() {
  return (
    <Panel title="Real-time Activity Feed" subtitle="Live updates from the ecosystem" action={<Chip hue="emerald">Live</Chip>}>
      <ul className="space-y-2">
        {feed.map((f) => (
          <li key={f.title + f.ago} className="glass-soft flex items-start gap-2.5 p-2">
            <span
              className="animate-pulse-node mt-1 size-2 shrink-0 rounded-full"
              style={{ backgroundColor: hueVar[f.hue] }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] text-foreground">{f.title}</p>
              <p className="truncate text-[11px] text-muted-foreground">{f.detail}</p>
            </div>
            <span className="mono-label shrink-0">{f.ago}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function CommandCenter() {
  return (
    <Panel title="AI Command Center" subtitle="Atlas AI · holographic operations console">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative mx-auto flex size-40 shrink-0 items-center justify-center">
          <div
            className="animate-spin-slow absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, color-mix(in oklab, var(--hue-violet) 55%, transparent), transparent 60%)",
              maskImage: "radial-gradient(circle, transparent 62%, black 64%)",
            }}
          />
          <div
            className="animate-pulse-node absolute inset-8 rounded-full"
            style={{ background: "var(--gradient-aurora)", filter: "blur(10px)" }}
          />
          <div className="glass-soft relative flex size-20 flex-col items-center justify-center rounded-full">
            <span className="num text-lg" style={{ color: hueVar.cyan }}>
              92.4
            </span>
            <span className="mono-label">Atlas</span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2">
          {atlasActions.map((a) => (
            <button
              key={a}
              className="glass-soft px-2.5 py-2 text-left text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}
