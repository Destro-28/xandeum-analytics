"use client";

import NodeCard from "./node-card";

type Node = {
  pubkey: string | null;
  status: string;
  version: string | null;
  confidence_score: number;
  confidence_tier: "high" | "medium" | "low";
};

export default function NodesGrid({
  nodes,
}: {
  nodes: Node[];
}) {
  if (nodes.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-900 py-20 text-center text-slate-400">
        No results
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {nodes.map((node, i) => (
        <NodeCard
          key={`${node.pubkey}-${i}`}
          node={node}
          index={i}
        />
      ))}
    </div>
  );
}
