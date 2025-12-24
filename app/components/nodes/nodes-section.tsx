"use client";

import { useEffect, useMemo, useState } from "react";
import NodesToolbar from "./nodes-toolbar";
import NodesTable from "./nodes-table";
import NodesGrid from "./nodes-grid";
import NodeDetailsModal from "../modals/node-details-modal";

type GossipNode = {
  pubkey: string | null;
  status: string;
  version: string | null;
  confidence_score: number;
  confidence_tier: "high" | "medium" | "low";
  addresses?: string[];
};

type VersionGroup = {
  mainnet: string[];
  trynet: string[];
};

type ApiNode = {
  pubkey: string | null;
  status: string;
  version: string | string[] | null;
  confidence_score: number;
  confidence_tier: "high" | "medium" | "low";
  addresses?: string[];
};

export default function NodesSection() {
  const [nodes, setNodes] = useState<GossipNode[]>([]);
  const [timestamp, setTimestamp] = useState<number | null>(null);

  // 🔁 layout toggle
  const [layout, setLayout] = useState<"table" | "grid">("table");

  // 🪟 modal state
  const [selectedNode, setSelectedNode] = useState<GossipNode | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 🔍 search
  const [searchQuery, setSearchQuery] = useState("");

  // 🧰 filters
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<string | null>(null);
  const [versionNetwork, setVersionNetwork] =
    useState<"mainnet" | "trynet" | null>(null);
  const [versionFilter, setVersionFilter] = useState<string | null>(null);

  const normalizeVersion = (
    v: string | string[] | undefined | null
  ): string | null => {
    if (!v) return null;
    if (Array.isArray(v)) return v.join(".");
    return v;
  };

  useEffect(() => {
    fetch("/api/gossip")
      .then((r) => r.json())
      .then((res) => {
        const normalized: GossipNode[] = res.nodes.map((n: ApiNode) => ({
          ...n,
          version: normalizeVersion(n.version),
        }));

        setNodes(normalized);
        setTimestamp(res.timestamp);
      });
  }, []);

  const availableVersions: VersionGroup = useMemo(() => {
    const mainnet = new Set<string>();
    const trynet = new Set<string>();

    nodes.forEach((n) => {
      if (!n.version) return;
      if (n.version.toLowerCase().includes("trynet")) {
        trynet.add(n.version);
      } else {
        mainnet.add(n.version);
      }
    });

    return {
      mainnet: [...mainnet].sort(),
      trynet: [...trynet].sort(),
    };
  }, [nodes]);

  const filteredNodes = useMemo(() => {
    return nodes.filter((node) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !node.pubkey?.toLowerCase().includes(q) &&
          !node.addresses?.some((a) =>
            a.toLowerCase().includes(q)
          )
        ) {
          return false;
        }
      }

      if (statusFilter && node.status !== statusFilter) return false;
      if (tierFilter && node.confidence_tier !== tierFilter) return false;

      if (versionNetwork && node.version) {
        if (!availableVersions[versionNetwork].includes(node.version)) {
          return false;
        }
      }

      if (versionFilter && node.version !== versionFilter) return false;

      return true;
    });
  }, [
    nodes,
    searchQuery,
    statusFilter,
    tierFilter,
    versionNetwork,
    versionFilter,
    availableVersions,
  ]);

  function openNodeModal(node: GossipNode, index: number) {
    setSelectedNode(node);
    setSelectedIndex(index);
    setModalOpen(true);
  }

  return (
    <section className="mt-8">
      <div className="mx-auto max-w-7xl">
        <NodesToolbar
          timestamp={timestamp}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          tierFilter={tierFilter}
          onTierChange={setTierFilter}
          versionNetwork={versionNetwork}
          onVersionNetworkChange={(v) => {
            setVersionNetwork(v);
            setVersionFilter(null);
          }}
          versionFilter={versionFilter}
          onVersionChange={setVersionFilter}
          availableVersions={availableVersions}
          layout={layout}
          onLayoutChange={setLayout}
        />

        {layout === "table" ? (
          <NodesTable
            nodes={filteredNodes}
            onRowClick={openNodeModal}
          />
        ) : (
          <NodesGrid
            nodes={filteredNodes}
            onCardClick={openNodeModal}
          />
        )}
      </div>

      {selectedNode && selectedIndex !== null && (
        <NodeDetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          node={selectedNode}
          index={selectedIndex}
        />
      )}
    </section>
  );
}
