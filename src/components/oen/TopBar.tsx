import { useEffect, useState } from "react";
import { Bell, Mail, Globe, Search, Activity, ChevronDown, Cpu } from "lucide-react";
import { hueVar } from "./data";

function useUtcClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setNow(new Date().toISOString().slice(11, 19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function TopBar() {
  const clock = useUtcClock();

  return (
    <header className="glass scan-line flex flex-wrap items-center gap-4 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="relative size-11 shrink-0">
          <div
            className="absolute inset-0 rounded-xl"
            style={{ background: "var(--gradient-aurora)", filter: "blur(10px)", opacity: 0.7 }}
          />
          <div className="glass-soft relative flex size-11 items-center justify-center rounded-xl">
            <Cpu size={20} style={{ color: hueVar.cyan }} aria-hidden="true" />
          </div>
        </div>
        <div>
          <h1 className="text-[15px] leading-tight tracking-[0.16em] text-foreground">
            OPPORTUNITY EXCHANGE NETWORK
          </h1>
          <p className="text-aurora text-[13px] font-semibold tracking-[0.18em] uppercase">
            Organizations
          </p>
          <p className="text-[11px] text-muted-foreground">
            Coordinate organizations. Accelerate global impact.
          </p>
        </div>
      </div>

      <label className="glass-soft mx-auto flex min-w-64 flex-1 items-center gap-2 px-3 py-2">
        <Search size={15} className="text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">Universal AI search</span>
        <input
          placeholder="Ask Atlas or search organizations, partners, funding…"
          className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
        />
        <kbd className="mono-label rounded border border-border px-1.5 py-0.5">⌘K</kbd>
      </label>

      <div className="flex items-center gap-3">
        <div className="hidden text-right lg:block">
          <div className="num text-sm" style={{ color: hueVar.cyan }}>
            {clock ?? "--:--:--"} <span className="mono-label">UTC</span>
          </div>
          <p className="mono-label">Live clock</p>
        </div>

        <div className="glass-soft hidden items-center gap-2 px-2.5 py-1.5 xl:flex">
          <Activity size={13} style={{ color: hueVar.emerald }} aria-hidden="true" />
          <span className="text-[11px] text-muted-foreground">System</span>
          <span className="text-[11px]" style={{ color: hueVar.emerald }}>
            Operational
          </span>
        </div>
        <div className="glass-soft hidden items-center gap-2 px-2.5 py-1.5 xl:flex">
          <span className="animate-pulse-node size-1.5 rounded-full" style={{ backgroundColor: hueVar.cyan }} />
          <span className="text-[11px] text-muted-foreground">AI</span>
          <span className="text-[11px]" style={{ color: hueVar.cyan }}>
            12 agents active
          </span>
        </div>

        {[Bell, Mail, Globe].map((Icon, i) => (
          <button
            key={i}
            className="glass-soft relative flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label={["Notifications", "Secure messages", "Language selector"][i]}
          >
            <Icon size={16} aria-hidden="true" />
            {i < 2 ? (
              <span
                className="absolute -top-1 -right-1 rounded-full px-1 text-[9px] text-primary-foreground"
                style={{ backgroundColor: hueVar.rose }}
              >
                {i === 0 ? 7 : 3}
              </span>
            ) : null}
          </button>
        ))}

        <button className="glass-soft flex items-center gap-2 px-2 py-1.5 text-left">
          <span className="size-8 rounded-lg" style={{ background: "var(--gradient-aurora)" }} />
          <span className="hidden sm:block">
            <span className="block text-[12px] text-foreground">Eugene Ochako</span>
            <span className="block text-[10px] text-muted-foreground">System Architect</span>
          </span>
          <ChevronDown size={14} className="text-muted-foreground" aria-hidden="true" />
        </button>

        <button className="glass-soft hidden items-center gap-2 px-2.5 py-1.5 text-[11px] text-muted-foreground md:flex">
          Org: <span className="text-foreground">Regenerative Futures</span>
          <ChevronDown size={13} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
