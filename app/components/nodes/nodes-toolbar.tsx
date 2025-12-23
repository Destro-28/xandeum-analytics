"use client";

import { useState, Dispatch, SetStateAction } from "react";
import {
  Search,
  Filter,
  X,
  Grid2X2,
  List,
} from "lucide-react";

type VersionGroup = {
  mainnet: string[];
  trynet: string[];
};

export default function NodesToolbar({
  timestamp,
  searchQuery,
  onSearchChange,

  statusFilter,
  onStatusChange,

  tierFilter,
  onTierChange,

  versionNetwork,
  onVersionNetworkChange,

  versionFilter,
  onVersionChange,

  layout,
  onLayoutChange,

  availableVersions,
}: {
  timestamp: number | null;
  searchQuery: string;
  onSearchChange: Dispatch<SetStateAction<string>>;

  statusFilter: string | null;
  onStatusChange: Dispatch<SetStateAction<string | null>>;

  tierFilter: string | null;
  onTierChange: Dispatch<SetStateAction<string | null>>;

  versionNetwork: "mainnet" | "trynet" | null;
  onVersionNetworkChange: (v: "mainnet" | "trynet" | null) => void;

  versionFilter: string | null;
  onVersionChange: Dispatch<SetStateAction<string | null>>;

  layout: "table" | "grid";
  onLayoutChange: Dispatch<SetStateAction<"table" | "grid">>;

  availableVersions: VersionGroup;
}) {
  const [open, setOpen] = useState(false);

  // staged filter state
  const [tmpStatus, setTmpStatus] = useState(statusFilter);
  const [tmpTier, setTmpTier] = useState(tierFilter);
  const [tmpNetwork, setTmpNetwork] = useState(versionNetwork);
  const [tmpVersion, setTmpVersion] = useState(versionFilter);

  const formattedTime = timestamp
    ? new Date(timestamp)
        .toUTCString()
        .replace("GMT", "UTC")
    : "--";

  function applyFilters() {
    onStatusChange(tmpStatus);
    onTierChange(tmpTier);
    onVersionNetworkChange(tmpNetwork);
    onVersionChange(tmpVersion);
    setOpen(false);
  }

  function clearFilters() {
    setTmpStatus(null);
    setTmpTier(null);
    setTmpNetwork(null);
    setTmpVersion(null);
  }

  return (
    <>
      <div className="mb-6 space-y-3">
        {/* Last updated */}
        <div className="text-sm text-slate-400">
          Last Updated On : {formattedTime}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-60">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search by pubkey or IP…"
              className="w-full rounded-full bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Filter button */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-slate-800 p-2 text-slate-200 hover:bg-slate-700"
            title="Filters"
          >
            <Filter size={18} />
          </button>

          {/* Layout toggle */}
          <button
            onClick={() =>
              onLayoutChange(
                layout === "table" ? "grid" : "table"
              )
            }
            className="rounded-full bg-slate-800 p-2 text-slate-200 hover:bg-slate-700"
            title={
              layout === "table"
                ? "Switch to grid view"
                : "Switch to table view"
            }
          >
            {layout === "table" ? (
              <Grid2X2 size={18} />
            ) : (
              <List size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Filter modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 p-6 text-slate-100">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Filter By
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-slate-800"
              >
                <X />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status */}
              <div>
                <div className="mb-2 text-sm font-medium">
                  Status
                </div>
                <div className="flex gap-2">
                  {["active", "stale"].map((s) => (
                    <button
                      key={s}
                      onClick={() =>
                        setTmpStatus(
                          tmpStatus === s ? null : s
                        )
                      }
                      className={`rounded-full px-4 py-1 text-sm ${
                        tmpStatus === s
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confidence */}
              <div>
                <div className="mb-2 text-sm font-medium">
                  Confidence Tier
                </div>
                <div className="flex gap-2">
                  {["high", "medium", "low"].map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        setTmpTier(
                          tmpTier === t ? null : t
                        )
                      }
                      className={`rounded-full px-4 py-1 text-sm capitalize ${
                        tmpTier === t
                          ? "bg-purple-600 text-white"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Version */}
              <div>
                <div className="mb-2 text-sm font-medium">
                  Version
                </div>

                <div className="mb-3 flex gap-2">
                  {(["mainnet", "trynet"] as const).map(
                    (net) => (
                      <button
                        key={net}
                        onClick={() => {
                          setTmpNetwork(
                            tmpNetwork === net ? null : net
                          );
                          setTmpVersion(null);
                        }}
                        className={`rounded-full px-4 py-1 text-sm capitalize ${
                          tmpNetwork === net
                            ? "bg-slate-600 text-white"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {net}
                      </button>
                    )
                  )}
                </div>

                {tmpNetwork && (
                  <div className="flex flex-wrap gap-2">
                    {availableVersions[tmpNetwork].map(
                      (v) => (
                        <button
                          key={v}
                          onClick={() =>
                            setTmpVersion(
                              tmpVersion === v ? null : v
                            )
                          }
                          className={`rounded-full px-3 py-1 text-xs ${
                            tmpVersion === v
                              ? "bg-slate-500 text-white"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {v}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={clearFilters}
                className="rounded-full border border-slate-500 px-5 py-1"
              >
                Clear
              </button>
              <button
                onClick={applyFilters}
                className="rounded-full bg-blue-600 px-5 py-1 text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
