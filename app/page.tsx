import { SummarySection } from "./components/summary/summary-section";
import WorldMapSection from "./components/world-map/world-map-section";
import NodesSection from "./components/nodes/nodes-section";
import SiteFooter from "./components/footer/site-footer";

export default function Home() {
  return (
    <main className="min-h-screen px-6">
      <SummarySection />
      <WorldMapSection />
      <NodesSection />
      <SiteFooter />
    </main>
  );
}
