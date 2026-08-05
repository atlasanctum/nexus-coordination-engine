import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/oen/Sidebar";
import { TopBar } from "@/components/oen/TopBar";
import { NetworkGraph } from "@/components/oen/NetworkGraph";
import { WorldMap } from "@/components/oen/WorldMap";
import {
  KpiRow,
  OrgProfile,
  PartnershipEngine,
  Analytics,
  MoralPanel,
  Discovery,
  ActivityFeed,
  CommandCenter,
} from "@/components/oen/panels";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Organizations · Opportunity Exchange Network" },
      {
        name: "description",
        content:
          "Coordinate organizations and accelerate global impact: live network graph, AI partnership engine, trust analytics and mission control for 15,248 organizations.",
      },
      { property: "og:title", content: "Organizations · Opportunity Exchange Network" },
      {
        property: "og:description",
        content:
          "A civilization-scale operations console for governments, NGOs, universities, investors and enterprises.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrganizationsDashboard,
});

function OrganizationsDashboard() {
  return (
    <main className="min-h-screen p-3 lg:p-4">
      <TopBar />

      <div className="mt-3 flex flex-col gap-3 xl:flex-row">
        <div className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)] xl:w-60 xl:shrink-0">
          <Sidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <KpiRow />

          <div className="grid gap-3 xl:grid-cols-[1.55fr_1fr]">
            <NetworkGraph />
            <OrgProfile />
          </div>

          <div className="grid gap-3 xl:grid-cols-[1.55fr_1fr]">
            <WorldMap />
            <PartnershipEngine />
          </div>

          <Analytics />

          <div className="grid gap-3 xl:grid-cols-3">
            <MoralPanel />
            <ActivityFeed />
            <CommandCenter />
          </div>

          <Discovery />

          <footer className="glass flex flex-wrap items-center justify-between gap-2 px-4 py-2.5">
            <span className="mono-label">Opportunity Exchange Network</span>
            <span className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Secure · Open · Interoperable · Scalable
            </span>
            <span className="mono-label">Organizations · Powered by Atlas AI</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
