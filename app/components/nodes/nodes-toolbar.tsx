"use client";

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
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
    ? new Date(timestamp).toUTCString().replace("GMT", "UTC")
    : "--";

  const applyFilters = useCallback(() => {
    onStatusChange(tmpStatus);
    onTierChange(tmpTier);
    onVersionNetworkChange(tmpNetwork);
    onVersionChange(tmpVersion);
    setOpen(false);
  }, [tmpStatus, tmpTier, tmpNetwork, tmpVersion, onStatusChange, onTierChange, onVersionNetworkChange, onVersionChange]);

  const clearFilters = useCallback(() => {
    setTmpStatus(null);
    setTmpTier(null);
    setTmpNetwork(null);
    setTmpVersion(null);
  }, []);

  

  // ⌨ Keyboard handling (Enter / Escape)
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.preventDefault();
        applyFilters();
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, applyFilters]);

  return (
    <>
      {/* ─── Toolbar ─── */}
      <div className="mb-6 space-y-3">
        <div className="text-sm text-slate-400">
          Last Updated On : {formattedTime}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-60">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by pubkey or IP…"
              className="
                w-full rounded-full
                bg-slate-800
                py-2 pl-10 pr-4
                text-sm text-slate-100
                placeholder:text-slate-400
                outline-none
                transition
                focus:ring-2 focus:ring-slate-600/40
              "
            />
          </div>

          {/* Filter */}
          <button
            onClick={() => setOpen(true)}
            className="
              rounded-full
              bg-slate-800 p-2
              text-slate-200
              transition
              hover:bg-slate-700
              hover:shadow-md
            "
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
            className="
              rounded-full
              bg-slate-800 p-2
              text-slate-200
              transition
              hover:bg-slate-700
              hover:shadow-md
            "
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

      {/* ─── Filter Modal ───────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div
            className="
              absolute w-full max-w-2xl
              rounded-2xl
              border border-slate-700/40
              bg-linear-to-b from-slate-900 to-slate-950
              p-5
            "
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-lg font-semibold tracking-wide">
                Filter By
              </h1>
              <button
                onClick={() => setOpen(false)}
                className="
                  rounded-full p-2
                  transition
                  hover:bg-red-700/65
                  hover:text-white
                "
              >
                <X />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status */}
              <section>
                <div className="mb-2 text-sm font-medium text-slate-300">
                  Status
                </div>
                <div className="flex gap-2">
                  {["active", "stale"].map((s) => (
                    <button
                      key={s}
                      onClick={() =>
                        setTmpStatus(tmpStatus === s ? null : s)
                      }
                      className={`
                        rounded-full px-4 py-1 text-sm capitalize
                        transition
                        ${
                          tmpStatus === s
                            ? "bg-green-600 text-black"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }
                      `}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>

              {/* Confidence Tier */}
              <section>
                <div className="mb-2 text-sm font-medium text-slate-300">
                  Confidence Tier
                </div>
                <div className="flex gap-2">
                  {["high", "medium", "low"].map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        setTmpTier(tmpTier === t ? null : t)
                      }
                      className={`
                        rounded-full px-4 py-1 text-sm capitalize
                        transition
                        ${
                          tmpTier === t
                            ? "bg-green-600 text-black"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }
                      `}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </section>

              {/* Version */}
              <section>
                <div className="mb-2 text-sm font-medium text-slate-300">
                  Version
                </div>

                <div className="mb-3 flex gap-2">
                  {(["mainnet", "trynet"] as const).map((net) => (
                    <button
                      key={net}
                      onClick={() => {
                        setTmpNetwork(tmpNetwork === net ? null : net);
                        setTmpVersion(null);
                      }}
                      className={`
                        rounded-full px-4 py-1 text-sm capitalize
                        transition
                        ${
                          tmpNetwork === net
                            ? "bg-green-600 text-black"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }
                      `}
                    >
                      {net}
                    </button>
                  ))}
                </div>

                {tmpNetwork && (
                  <div className="flex flex-wrap gap-2">
                    {availableVersions[tmpNetwork].map((v) => (
                      <button
                        key={v}
                        onClick={() =>
                          setTmpVersion(tmpVersion === v ? null : v)
                        }
                        className={`
                          rounded-full px-3 py-1 text-xs
                          transition
                          ${
                            tmpVersion === v
                              ? "bg-green-600 text-black"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }
                        `}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={clearFilters}
                className="
                  rounded-full
                  border border-slate-600
                  px-6 py-1.5
                  text-sm
                  transition
                  hover:bg-slate-800
                "
              >
                Clear
              </button>
              <button
                onClick={applyFilters}
                className="
                  rounded-full
                  border border-slate-600
                  px-6 py-1.5
                  text-sm
                  transition
                  hover:bg-slate-800
                "
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
