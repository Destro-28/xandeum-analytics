"use client";

import { Search, Filter, Grid2X2 } from "lucide-react";

export default function NodesToolbar({
  timestamp,
}: {
  timestamp: number | null;
}) {
  const formattedTime = timestamp
    ? new Date(timestamp).toUTCString().replace("GMT", "UTC")
    : "--";

  return (
    <div className="mb-4 space-y-3">
      {/* Last updated */}
      <div className="text-sm text-slate-400">
        Last Updated On : {formattedTime}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search..."
            className="w-full rounded-full bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* Filter */}
        <button className="rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-slate-700">
          <Filter size={18} />
        </button>

        {/* Layout toggle (grid icon only for now) */}
        <button className="rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-slate-700">
          <Grid2X2 size={18} />
        </button>
      </div>
    </div>
  );
}
