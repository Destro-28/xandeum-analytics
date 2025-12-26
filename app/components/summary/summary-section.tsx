// app/components/summary/summary-section.tsx

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

import { StatCard } from "./stat-card";
import { ConfidenceRing } from "./confidence-ring";

export function SummarySection({ summary }: { summary: Summary }) {
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
              <ConfidenceRing value={summary.confidence.average_score} />
            }
          />
        </div>
      </div>
    </section>
  );
}
