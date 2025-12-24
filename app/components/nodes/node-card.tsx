"use client";

import StatusBadge from "./status-badge";
import VersionBadge from "./version-badge";
import { ConfidenceRing } from "../summary/confidence-ring";

type GossipNode = {
  pubkey: string | null;
  status: string;
  version: string | null;
  confidence_score: number;
  confidence_tier: "high" | "medium" | "low";
};

export default function NodeCard({
  node,
  index,
  onClick,
}: {
  node: GossipNode;
  index: number;
  onClick: (node: GossipNode, index: number) => void;
}) {
  return (
    <div
      onClick={() => onClick(node, index)}
      className="
        h-72.5 w-97.5 cursor-pointer
        rounded-2xl
        border border-slate-700/40
        bg-linear-to-b from-slate-900 to-slate-950
        p-5 transition hover:border-slate-500
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-200">
          #{index + 1}
        </span>
        <VersionBadge version={node.version} />
      </div>

      <div className="mt-3">
        <div className="text-xs text-slate-400">Address</div>
        <div
          className="mt-1 truncate font-mono text-sm text-slate-200"
          title={node.pubkey ?? ""}
        >
          {node.pubkey ?? "—"}
        </div>
      </div>

      <div className="my-4 h-px bg-slate-700/40" />

      <div className="flex h-30 items-center justify-between">
        <div className="space-y-3">
          <div>
            <div className="text-xs text-slate-400">Status</div>
            <StatusBadge status={node.status} />
          </div>

          <div>
            <div className="text-xs text-slate-400">
              Confidence Tier
            </div>
            <StatusBadge status={node.confidence_tier} />
          </div>
        </div>

        <ConfidenceRing value={node.confidence_score} />
      </div>
    </div>
  );
}
