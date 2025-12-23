"use client";

import StatusBadge from "./status-badge";
import VersionBadge from "./version-badge";
import { ConfidenceRing } from "../summary/confidence-ring";

type Node = {
  pubkey: string | null;
  status: string;
  version: string | null;
  confidence_score: number;
  confidence_tier: "high" | "medium" | "low";
};

export default function NodeCard({
  node,
  index,
}: {
  node: Node;
  index: number;
}) {
  return (
    <div
      className="
        h-72.5 w-97.5
        rounded-2xl
        border border-slate-700/40
        bg-linear-to-b from-slate-900 to-slate-950
        p-5
      "
    >
      {/* ─── Top row ───────────────────────── */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-200">
          #{index + 1}
        </span>

        <VersionBadge version={node.version} />
      </div>

      {/* ─── Address ───────────────────────── */}
      <div className="mt-3">
        <div className="text-xs text-slate-400">
          Address
        </div>
        <div
          className="mt-1 truncate font-mono text-sm text-slate-200"
          title={node.pubkey ?? ""}
        >
          {node.pubkey ?? "—"}
        </div>
      </div>

      {/* ─── Divider ───────────────────────── */}
      <div className="my-4 h-px bg-slate-700/40" />

      {/* ─── Bottom section ────────────────── */}
      <div className="flex h-30 items-center justify-between">
        {/* Left side */}
        <div className="space-y-3">
          <div>
            <div className="text-xs text-slate-400">
              Status
            </div>
            <StatusBadge status={node.status} />
          </div>

          <div>
            <div className="text-xs text-slate-400">
              Confidence Tier
            </div>
            <StatusBadge status={node.confidence_tier} />
          </div>
        </div>

        {/* Right side — confidence ring */}
        <div className="flex items-center justify-center">
          <ConfidenceRing
            value={node.confidence_score}
            size={96}           // nice fit for card
            strokeWidth={8}     // slightly thicker ring
          />
        </div>
      </div>
    </div>
  );
}
