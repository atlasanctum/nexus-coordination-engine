export type Hue = "cyan" | "emerald" | "electric" | "violet" | "amber" | "rose" | "foreground";

export const hueVar: Record<Hue, string> = {
  cyan: "var(--hue-cyan)",
  emerald: "var(--hue-emerald)",
  electric: "var(--hue-electric)",
  violet: "var(--hue-violet)",
  amber: "var(--hue-amber)",
  rose: "var(--hue-rose)",
  foreground: "var(--foreground)",
};

export const kpis: {
  label: string;
  value: string;
  growth: string;
  forecast: string;
  confidence: number;
  hue: Hue;
  icon: string;
}[] = [
  { label: "Organizations Registered", value: "15,248", growth: "+8.7%", forecast: "16.4K in 30d", confidence: 94, hue: "cyan", icon: "building" },
  { label: "Countries Represented", value: "178", growth: "+2.1%", forecast: "182 in 30d", confidence: 91, hue: "electric", icon: "globe" },
  { label: "Active Partnerships", value: "8,924", growth: "+11.8%", forecast: "9.7K in 30d", confidence: 89, hue: "emerald", icon: "link" },
  { label: "Cross-sector Collaborations", value: "3,412", growth: "+14.2%", forecast: "3.9K in 30d", confidence: 87, hue: "violet", icon: "network" },
  { label: "Active Projects", value: "10,342", growth: "+15.3%", forecast: "11.6K in 30d", confidence: 92, hue: "cyan", icon: "layers" },
  { label: "Funding Coordinated", value: "$78.4B", growth: "+9.8%", forecast: "$84B in 30d", confidence: 88, hue: "amber", icon: "coins" },
  { label: "Beneficiaries Reached", value: "128.4M", growth: "+8.7%", forecast: "137M in 30d", confidence: 93, hue: "emerald", icon: "users" },
  { label: "Ecosystem Health Index", value: "92.4", growth: "+6.3%", forecast: "93.6 in 30d", confidence: 96, hue: "emerald", icon: "activity" },
  { label: "Organizational Trust Score", value: "91.1", growth: "+7.2%", forecast: "92.0 in 30d", confidence: 95, hue: "cyan", icon: "shield" },
  { label: "Collective Impact Score", value: "93.7", growth: "+8.4%", forecast: "94.9 in 30d", confidence: 97, hue: "violet", icon: "sparkle" },
];

export const sidebar: { group: string; items: { label: string; badge?: string; dot?: Hue }[] }[] = [
  { group: "Mission Control", items: [{ label: "Mission Control" }] },
  {
    group: "Intelligence Layer",
    items: [
      { label: "Living Reality", dot: "emerald" },
      { label: "Opportunity Graph" },
      { label: "Signal Radar" },
      { label: "Impact Score" },
      { label: "Moral Intelligence" },
    ],
  },
  {
    group: "Ecosystem",
    items: [
      { label: "Communities" },
      { label: "Organizations" },
      { label: "Partners" },
      { label: "Governments" },
      { label: "Investors" },
      { label: "NGOs" },
      { label: "Enterprises" },
      { label: "Universities" },
      { label: "Projects" },
      { label: "Marketplace", badge: "New" },
    ],
  },
  {
    group: "AI Services",
    items: [
      { label: "Organization AI" },
      { label: "Partnership Engine" },
      { label: "Due Diligence" },
      { label: "Opportunity Matching" },
      { label: "Funding Navigator" },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Governance", badge: "DAO" },
      { label: "Permissions" },
      { label: "Data Fabric" },
      { label: "APIs" },
      { label: "Settings" },
    ],
  },
];

export const nodeLegend: { label: string; hue: Hue }[] = [
  { label: "Governments", hue: "electric" },
  { label: "NGOs", hue: "emerald" },
  { label: "Universities", hue: "violet" },
  { label: "Investors", hue: "amber" },
  { label: "Enterprises", hue: "cyan" },
  { label: "Community Orgs", hue: "rose" },
  { label: "Intl. Agencies", hue: "foreground" },
];

export const flowLegend: { label: string; hue: Hue }[] = [
  { label: "Funding", hue: "amber" },
  { label: "Knowledge", hue: "cyan" },
  { label: "Resources", hue: "emerald" },
  { label: "Volunteers", hue: "rose" },
  { label: "Policy", hue: "electric" },
  { label: "Innovation", hue: "violet" },
];

export const profile = {
  name: "Regenerative Futures Alliance",
  type: "International Agency · Coalition",
  mission:
    "Coordinating regenerative agriculture, clean energy access and climate resilience across 64 countries in partnership with local communities.",
  hq: "Nairobi, Kenya",
  regions: "Africa · South Asia · LATAM",
  employees: "4,820",
  volunteers: "68,400",
  sdg: [1, 2, 6, 7, 13, 17],
  gauges: [
    { label: "Moral Intelligence", value: 94.6, hue: "emerald" as Hue },
    { label: "Trust Index", value: 91.8, hue: "cyan" as Hue },
    { label: "Partnership Score", value: 88.4, hue: "electric" as Hue },
    { label: "Transparency", value: 92.7, hue: "violet" as Hue },
  ],
  meta: [
    { label: "ESG Rating", value: "AA+" },
    { label: "Risk Level", value: "Low" },
    { label: "Active Initiatives", value: "146" },
    { label: "Funding Coordinated", value: "$4.38B" },
  ],
  achievements: [
    "Great Green Wall corridor expanded by 1.2M ha",
    "Solar microgrids delivered to 3,420 villages",
    "Living-wage compliance verified across all projects",
  ],
};

export const partnerships = [
  { name: "Solar Access Consortium", country: "India", compat: 96, uplift: "+24% impact", shared: ["Clean Energy", "South Asia", "Green Climate Fund"], missing: "Grid engineering", hue: "cyan" as Hue },
  { name: "AgriTech Cooperative Union", country: "Brazil", compat: 92, uplift: "+19% impact", shared: ["Food Systems", "LATAM", "IFAD"], missing: "Cold-chain logistics", hue: "emerald" as Hue },
  { name: "Global Health Foundation", country: "Switzerland", compat: 89, uplift: "+16% impact", shared: ["Health", "Africa", "Gates Foundation"], missing: "Clinical trials", hue: "violet" as Hue },
  { name: "Nordic Climate Institute", country: "Norway", compat: 85, uplift: "+13% impact", shared: ["Climate", "Research", "EU Horizon"], missing: "MRV tooling", hue: "electric" as Hue },
];

export const moral = [
  { label: "Organizational Moral Intelligence", value: 94.6 },
  { label: "Ethical Compliance", value: 93.3 },
  { label: "Transparency", value: 92.7 },
  { label: "Community Trust", value: 91.8 },
  { label: "Accountability", value: 93.1 },
  { label: "Stewardship", value: 90.4 },
  { label: "Human Dignity", value: 95.2 },
  { label: "Environmental Responsibility", value: 94.8 },
  { label: "Long-term Thinking", value: 89.7 },
  { label: "Fairness", value: 92.1 },
  { label: "AI Governance Score", value: 90.9 },
];

export const analytics: { title: string; kind: "line" | "area" | "bars"; hue: Hue; value: string; delta: string }[] = [
  { title: "Partnership Growth", kind: "area", hue: "cyan", value: "8,924", delta: "+11.8%" },
  { title: "Cross-sector Collaboration", kind: "line", hue: "violet", value: "3,412", delta: "+14.2%" },
  { title: "Funding Flow", kind: "bars", hue: "amber", value: "$78.4B", delta: "+9.8%" },
  { title: "Organization Health", kind: "line", hue: "emerald", value: "92.4", delta: "+6.3%" },
  { title: "Knowledge Exchange", kind: "area", hue: "electric", value: "1.9M", delta: "+18.4%" },
  { title: "Volunteer Activity", kind: "bars", hue: "rose", value: "68.4K", delta: "+12.1%" },
  { title: "Ecosystem Resilience", kind: "line", hue: "cyan", value: "88.6", delta: "+4.9%" },
  { title: "Trust Evolution", kind: "area", hue: "emerald", value: "91.1", delta: "+7.2%" },
  { title: "Impact Forecast", kind: "line", hue: "violet", value: "1.2B", delta: "+21.6%" },
  { title: "AI Opportunity Pipeline", kind: "bars", hue: "amber", value: "2.37M", delta: "+12.4%" },
];

export const discovery = [
  { name: "Kenya Community Solar Trust", country: "Kenya", sector: "Clean Energy", projects: 128, impact: 94.2, trust: 92.6, rating: "A+", hue: "cyan" as Hue, summary: "Village-scale solar with cooperative ownership; strong local governance." },
  { name: "Amazonia Guardians", country: "Brazil", sector: "Climate Action", projects: 86, impact: 91.4, trust: 90.1, rating: "A", hue: "emerald" as Hue, summary: "Indigenous-led forest stewardship with verified restoration outcomes." },
  { name: "Delhi Skills University", country: "India", sector: "Education", projects: 64, impact: 89.7, trust: 88.9, rating: "A", hue: "violet" as Hue, summary: "Digital-skills pipeline feeding regional employment partnerships." },
  { name: "Sahel Water Alliance", country: "Niger", sector: "Water & Sanitation", projects: 52, impact: 88.3, trust: 91.2, rating: "A", hue: "electric" as Hue, summary: "Arid-region water access with community maintenance contracts." },
  { name: "Impact Capital Partners", country: "Singapore", sector: "Investment", projects: 41, impact: 87.1, trust: 89.4, rating: "A-", hue: "amber" as Hue, summary: "Blended-finance vehicles targeting first-loss climate capital." },
  { name: "Andes Health Network", country: "Peru", sector: "Health", projects: 37, impact: 90.5, trust: 92.0, rating: "A", hue: "rose" as Hue, summary: "Mobile clinics coordinated with national health ministries." },
];

export const feed: { title: string; detail: string; ago: string; hue: Hue }[] = [
  { title: "New partnership signed", detail: "Solar Access Consortium ↔ Regenerative Futures Alliance", ago: "2m", hue: "cyan" },
  { title: "Grant approved", detail: "$12.4M — Green Climate Fund, West Africa corridor", ago: "6m", hue: "amber" },
  { title: "Climate project launched", detail: "Mangrove restoration, 18K ha — Indonesia", ago: "11m", hue: "emerald" },
  { title: "Health initiative completed", detail: "Maternal care reached 240K people — Andes Network", ago: "18m", hue: "rose" },
  { title: "Research collaboration started", detail: "Delhi Skills University × Nordic Climate Institute", ago: "27m", hue: "violet" },
  { title: "Volunteer campaign active", detail: "12,480 volunteers mobilized across 34 countries", ago: "34m", hue: "electric" },
  { title: "AI recommendation generated", detail: "Coalition map proposed for Sahel water access", ago: "41m", hue: "cyan" },
  { title: "Community milestone reached", detail: "100K households connected to clean cooking", ago: "52m", hue: "emerald" },
];

export const atlasActions = [
  "Find strategic partners",
  "Predict ecosystem risks",
  "Recommend funding",
  "Detect duplication",
  "Optimize collaboration",
  "Forecast impact",
  "Generate partnership agreements",
  "Build coalition maps",
];

export const mapLayers = [
  { label: "NGOs", hue: "emerald" as Hue, on: true },
  { label: "Governments", hue: "electric" as Hue, on: true },
  { label: "Universities", hue: "violet" as Hue, on: true },
  { label: "Businesses", hue: "cyan" as Hue, on: true },
  { label: "Foundations", hue: "amber" as Hue, on: false },
  { label: "Community Groups", hue: "rose" as Hue, on: true },
];
