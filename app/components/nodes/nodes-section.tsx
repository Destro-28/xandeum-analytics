"use client";

import { useEffect, useMemo, useState } from "react";
import NodesToolbar from "./nodes-toolbar";
import NodesTable from "./nodes-table";
import NodesGrid from "./nodes-grid";

type Node = {
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
  const [nodes, setNodes] = useState<Node[]>([]);
  const [timestamp, setTimestamp] = useState<number | null>(null);

  // 🔁 layout toggle
  const [layout, setLayout] = useState<"table" | "grid">("table");

  // 🔍 search
  const [searchQuery, setSearchQuery] = useState("");

  // 🧰 filters
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<string | null>(null);

  // version filters (nested)
  const [versionNetwork, setVersionNetwork] =
    useState<"mainnet" | "trynet" | null>(null);
  const [versionFilter, setVersionFilter] = useState<string | null>(null);

  /**
   * 🔧 Normalize version into a string
   */
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
        const normalizedNodes: Node[] = res.nodes.map(
          (node: ApiNode) => ({
            ...node,
            version: normalizeVersion(node.version),
          })
        );

        setNodes(normalizedNodes);
        setTimestamp(res.timestamp);
      });
  }, []);

  /**
   * 📦 Build version groups (deduped)
   */
  const availableVersions: VersionGroup = useMemo(() => {
    const mainnet = new Set<string>();
    const trynet = new Set<string>();

    for (const node of nodes) {
      if (!node.version) continue;

      if (node.version.toLowerCase().includes("trynet")) {
        trynet.add(node.version);
      } else {
        mainnet.add(node.version);
      }
    }

    return {
      mainnet: Array.from(mainnet).sort(),
      trynet: Array.from(trynet).sort(),
    };
  }, [nodes]);

  const handleVersionNetworkChange = (network: "mainnet" | "trynet" | null) => {
    setVersionNetwork(network);
    setVersionFilter(null);
  };
  const filteredNodes = useMemo(() => {
    return nodes.filter((node) => {
      // 🔍 search (pubkey / IP)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();

        const pubkeyMatch =
          node.pubkey?.toLowerCase().includes(q);

        const ipMatch =
          node.addresses?.some((addr) =>
            addr.toLowerCase().includes(q)
          );

        if (!pubkeyMatch && !ipMatch) return false;
      }

      // status filter
      if (statusFilter && node.status !== statusFilter) {
        return false;
      }

      // confidence tier filter
      if (tierFilter && node.confidence_tier !== tierFilter) {
        return false;
      }

      // version network filter
      if (versionNetwork && node.version) {
        if (
          !availableVersions[versionNetwork].includes(
            node.version
          )
        ) {
          return false;
        }
      }

      // version filter
      if (versionFilter && node.version !== versionFilter) {
        return false;
      }

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
          onVersionNetworkChange={handleVersionNetworkChange}
          versionFilter={versionFilter}
          onVersionChange={setVersionFilter}
          availableVersions={availableVersions}
          layout={layout}
          onLayoutChange={setLayout}
        />

        {layout === "table" ? (
          <NodesTable nodes={filteredNodes} />
        ) : (
          <NodesGrid nodes={filteredNodes} />
        )}
      </div>
    </section>
  );
}
