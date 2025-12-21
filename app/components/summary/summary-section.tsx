import { StatCard } from "./stat-card"
import { ConfidenceRing } from "./confidence-ring"

async function getSummary() {
  const res = await fetch("http://localhost:3000/api/gossip", {
    cache: "no-store",
  })
  return res.json()
}

export async function SummarySection() {
  const data = await getSummary()
  const summary = data.summary

  return (
    <section className="mt-16">
      <div className="mx-auto flex max-w-7xl items-start justify-between">
        {/* LEFT: Heading */}
        <h1 className="max-w-130 text-[58px] font-bold leading-tight text-white">
          Xandeum pNodes
          <br />
          Analytics
          <br />
          Dashboard
        </h1>

        {/* RIGHT: Cards */}
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
  )
}
