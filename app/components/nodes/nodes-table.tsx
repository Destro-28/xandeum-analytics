import StatusBadge from "./status-badge";
import VersionBadge from "./version-badge";

type Node = {
  pubkey: string | null;
  status: string;
  version: string | null;
  confidence_score: number;
  confidence_tier: string;
};

export default function NodesTable({ nodes }: { nodes: Node[] }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-900">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-slate-400">
            <th className="px-4 py-3">No.</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Version</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Confidence Tier</th>
          </tr>
        </thead>

        <tbody>
          {/* ✅ Empty state */}
          {nodes.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-sm text-slate-400"
              >
                No Results
              </td>
            </tr>
          )}

          {/* ✅ Normal rows */}
          {nodes.map((node, i) => (
            <tr
              key={i}
              className="bg-slate-800 text-sm text-slate-100"
            >
              <td className="rounded-l-xl px-4 py-3">
                {i + 1}
              </td>

              <td className="px-4 py-3 font-mono text-xs">
                {node.pubkey ?? "—"}
              </td>

              <td className="px-4 py-3">
                <StatusBadge status={node.status} />
              </td>

              <td className="px-4 py-3">
                <VersionBadge version={node.version} />
              </td>

              <td className="px-4 py-3">
                {node.confidence_score}
              </td>

              <td className="rounded-r-xl px-4 py-3 capitalize">
                {node.confidence_tier}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
