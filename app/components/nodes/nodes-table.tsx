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

export default function NodesTable({
  nodes,
  onRowClick,
}: {
  nodes: GossipNode[];
  onRowClick: (node: GossipNode, index: number) => void;
}) {
  if (nodes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700/40 bg-linear-to-b from-slate-900 to-slate-950 p-6 text-center text-slate-400">
        No Results
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[60px_2.2fr_140px_140px_260px_160px] px-6 text-sm text-slate-400">
        <div>No.</div>
        <div>Address</div>
        <div className="text-center">Status</div>
        <div className="text-center">Version</div>
        <div className="text-center">Confidence Score</div>
        <div className="text-center">Confidence Tier</div>
      </div>

      {nodes.map((node, i) => (
        <div
          key={i}
          onClick={() => onRowClick(node, i)}
          className="
            cursor-pointer
            grid grid-cols-[60px_2.2fr_140px_140px_260px_160px]
            items-center rounded-2xl
            border border-slate-700/40
            bg-linear-to-b from-slate-900 to-slate-950
            p-5 transition hover:border-slate-500
          "
        >
          <div className="text-sm text-slate-300">{i + 1}</div>
          <div className="truncate font-mono text-sm text-slate-100">
            {node.pubkey ?? "—"}
          </div>
          <div className="flex justify-center">
            <StatusBadge status={node.status} />
          </div>
          <div className="flex justify-center">
            <VersionBadge version={node.version} />
          </div>
          <div className="flex justify-center">
            <ConfidenceRing value={node.confidence_score} />
          </div>
          <div className="flex justify-center capitalize">
            {node.confidence_tier}
          </div>
        </div>
      ))}
    </div>
  );
}
