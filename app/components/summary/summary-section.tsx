// app/components/summary/summary-section.tsx

import { headers } from "next/headers";
import { StatCard } from "./stat-card";
import { ConfidenceRing } from "./confidence-ring";

interface Summary {
  nodes: {
    total_unique: number;
    active: number;
    stale: number;
  };
  endpoints: {
    total: number;
    healthy: number;
    unhealthy: number;
  };
  confidence: {
    average_score: number;
  };
}

async function getSummary(): Promise<Summary> {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    throw new Error("Missing host header");
  }

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/gossip`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch summary data");
  }

  const data = await res.json();
  return data.summary;
}

export async function SummarySection() {
  const summary = await getSummary();

  return (
    <section className="mx-auto mb-24 mt-10 max-w-7xl px-6">
      <div className="flex items-start justify-between">
        <h1 className="text-[58px] font-bold leading-tight text-white">
          Xandeum pNodes
          <br />
          Analytics
          <br />
          Dashboard
        </h1>

        <div className="flex gap-4.5">
          <StatCard
            title="Total pNodes"
            value={summary.nodes.total_unique}
            footer={
              <>
                Active: {summary.nodes.active}
                <br />
                Stale: {summary.nodes.stale}
              </>
            }
          />

          <StatCard
            title="Total Endpoints"
            value={summary.endpoints.total}
            footer={
              <>
                Healthy: {summary.endpoints.healthy}
                <br />
                Unhealthy: {summary.endpoints.unhealthy}
              </>
            }
          />

          <StatCard
            title="Avg Confidence Score"
            value={
              <ConfidenceRing
                value={summary.confidence.average_score}
              />
            }
          />
        </div>
      </div>
    </section>
  );
}
