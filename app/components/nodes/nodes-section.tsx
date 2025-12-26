"use client";

import {
  useEffect,
  useMemo,
  useState,
  startTransition,
} from "react";
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

const PAGE_SIZE = 25;

export default function NodesSection() {
  const [nodes, setNodes] = useState<GossipNode[]>([]);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // layout
  const [layout, setLayout] = useState<"table" | "grid">("table");

  // modal
  const [selectedNode, setSelectedNode] = useState<GossipNode | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // search + filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [tierFilter, setTierFilter] = useState<string | null>(null);
  const [versionNetwork, setVersionNetwork] =
    useState<"mainnet" | "trynet" | null>(null);
  const [versionFilter, setVersionFilter] = useState<string | null>(null);

  // pagination
  const [page, setPage] = useState(1);

  const normalizeVersion = (
    v: string | string[] | null | undefined
  ): string | null => {
    if (!v) return null;
    if (Array.isArray(v)) return v.join(".");
    return v;
  };

  /**
   * Fetch nodes (non-blocking)
   */
  useEffect(() => {
    let cancelled = false;

    fetch("/api/gossip")
      .then((r) => r.json())
      .then((res) => {
        if (cancelled) return;

        startTransition(() => {
          const normalized: GossipNode[] = res.nodes.map(
            (n: ApiNode) => ({
              ...n,
              version: normalizeVersion(n.version),
            })
          );

          setNodes(normalized);
          setTimestamp(res.timestamp);
          setLoading(false);
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Version groups
   */
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

  /**
   * Filtering
   */
  const filteredNodes = useMemo(() => {
    return nodes.filter((node) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !node.pubkey?.toLowerCase().includes(q) &&
          !node.addresses?.some((a) => a.toLowerCase().includes(q))
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

  /**
   * Reset pagination when filters/layout change
   */
  useEffect(() => {
    startTransition(() => setPage(1));
  }, [
    searchQuery,
    statusFilter,
    tierFilter,
    versionNetwork,
    versionFilter,
    layout,
  ]);

  /**
   * Close modal on page change
   */
  useEffect(() => {
    startTransition(() => setModalOpen(false));
  }, [page]);

  /**
   * Pagination
   */
  const totalPages = Math.ceil(filteredNodes.length / PAGE_SIZE);

  const paginatedNodes = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredNodes.slice(start, start + PAGE_SIZE);
  }, [filteredNodes, page]);

  function openNodeModal(node: GossipNode, localIndex: number) {
    const globalIndex = (page - 1) * PAGE_SIZE + localIndex;
    setSelectedNode(node);
    setSelectedIndex(globalIndex);
    setModalOpen(true);
  }

  function getPageNumbers() {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (page >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
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

        {/* Loading state */}
        {loading ? (
          <div className="mt-12 text-center text-slate-400">
            Loading nodes…
          </div>
        ) : layout === "table" ? (
          <NodesTable
            nodes={paginatedNodes}
            onRowClick={openNodeModal}
          />
        ) : (
          <NodesGrid
            nodes={paginatedNodes}
            onCardClick={openNodeModal}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="mt-10 flex items-center justify-center gap-4 text-sm">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="rounded-full px-3 py-1 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              « First
            </button>

            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-full px-3 py-1 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              ‹ Prev
            </button>

            {getPageNumbers().map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="px-2 text-slate-500">
                  …
                </span>
              ) : (
                <button
                  key={`page-${p}`}
                  onClick={() => setPage(p as number)}
                  className={`rounded-full px-3 py-1 ${
                    page === p
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={page === totalPages}
              className="rounded-full px-3 py-1 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              Next ›
            </button>

            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="rounded-full px-3 py-1 text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              Last »
            </button>
          </div>
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
