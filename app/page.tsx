import { SummarySection } from "./components/summary/summary-section";
import WorldMapSection from "./components/world-map/world-map-section";
import NodesSection from "./components/nodes/nodes-section";
import SiteFooter from "./components/footer/site-footer";

async function getGossip() {
  const res = await fetch("http://localhost:3000/api/gossip", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const data = await getGossip();

  return (
    <main className="min-h-screen px-6">
      <SummarySection summary={data.summary} />
      <WorldMapSection />
      <NodesSection />
      <SiteFooter />
    </main>
  );
}
