import { SummarySection } from "./components/summary/summary-section";
import WorldMapSection from "./components/world-map/world-map-section";
import NodesSection from "./components/nodes/nodes-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 text-slate-100">
      <SummarySection />
      <WorldMapSection />
      <NodesSection />
    </main>
  );
}
