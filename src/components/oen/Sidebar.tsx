import { hueVar, sidebar, atlasActions } from "./data";
import {
  Activity,
  Radar,
  Globe2,
  Gauge as GaugeIcon,
  Scale,
  Users,
  Building2,
  Handshake,
  Landmark,
  Coins,
  HeartHandshake,
  Factory,
  GraduationCap,
  Layers,
  Store,
  Bot,
  Link2,
  ShieldCheck,
  Search,
  Compass,
  Fingerprint,
  Database,
  Code2,
  Settings,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

const icons: Record<string, typeof Activity> = {
  "Mission Control": LayoutDashboard,
  "Living Reality": Globe2,
  "Opportunity Graph": Radar,
  "Signal Radar": Activity,
  "Impact Score": GaugeIcon,
  "Moral Intelligence": Scale,
  Communities: Users,
  Organizations: Building2,
  Partners: Handshake,
  Governments: Landmark,
  Investors: Coins,
  NGOs: HeartHandshake,
  Enterprises: Factory,
  Universities: GraduationCap,
  Projects: Layers,
  Marketplace: Store,
  "Organization AI": Bot,
  "Partnership Engine": Link2,
  "Due Diligence": ShieldCheck,
  "Opportunity Matching": Search,
  "Funding Navigator": Compass,
  Governance: Scale,
  Permissions: Fingerprint,
  "Data Fabric": Database,
  APIs: Code2,
  Settings: Settings,
};

export function Sidebar() {
  return (
    <aside className="glass flex h-full flex-col gap-5 overflow-y-auto p-3">
      {sidebar.map((group) => (
        <div key={group.group}>
          <p className="mono-label mb-2 px-2">{group.group}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = icons[item.label] ?? Activity;
              const active = item.label === "Organizations";
              return (
                <li key={item.label}>
                  <button
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                    }`}
                    style={
                      active
                        ? {
                            background:
                              "linear-gradient(90deg, color-mix(in oklab, var(--hue-cyan) 22%, transparent), transparent)",
                            border: "1px solid color-mix(in oklab, var(--hue-cyan) 34%, transparent)",
                            boxShadow: "var(--shadow-glow)",
                          }
                        : undefined
                    }
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon
                      size={15}
                      style={{ color: active ? hueVar.cyan : undefined }}
                      aria-hidden="true"
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge ? (
                      <span
                        className="rounded px-1.5 py-px text-[9px] tracking-wider"
                        style={{
                          color: hueVar.emerald,
                          backgroundColor: "color-mix(in oklab, var(--hue-emerald) 16%, transparent)",
                        }}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                    {item.dot ? (
                      <span
                        className="animate-pulse-node size-1.5 rounded-full"
                        style={{ backgroundColor: hueVar[item.dot] }}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="glass-soft mt-auto p-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <Sparkles size={14} style={{ color: hueVar.cyan }} aria-hidden="true" />
          <span className="panel-title">Atlas AI</span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Online · coordinating 15,248 organizations
        </p>
        <div className="relative mx-auto my-3 size-20">
          <div
            className="animate-spin-slow absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent, color-mix(in oklab, var(--hue-cyan) 60%, transparent), transparent)",
              maskImage: "radial-gradient(circle, transparent 58%, black 60%)",
            }}
          />
          <div
            className="animate-pulse-node absolute inset-4 rounded-full"
            style={{ background: "var(--gradient-aurora)", filter: "blur(6px)" }}
          />
        </div>
        <ul className="space-y-1 text-left">
          {atlasActions.slice(0, 4).map((a) => (
            <li
              key={a}
              className="cursor-pointer rounded-md px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
            >
              › {a}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
