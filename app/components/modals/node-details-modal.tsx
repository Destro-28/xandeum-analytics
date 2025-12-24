"use client";

import { X, Copy, Cpu } from "lucide-react";
import { ConfidenceRing } from "../summary/confidence-ring";

type GossipNode = {
  pubkey: string | null;
  status: string;
  version: string | null;
  confidence_score: number;
  confidence_tier: "high" | "medium" | "low";
  addresses?: string[];
  last_seen?: number;
  seen_by_count?: number;
  geo?: {
    city?: string;
    country?: string;
  };
};

type Props = {
  open: boolean;
  onClose: () => void;
  node: GossipNode;
  index: number;
};

function formatDate(ts?: number) {
  if (!ts) return "—";
  return new Date(ts * 1000).toUTCString().replace("GMT", "UTC");
}

export default function NodeDetailsModal({
  open,
  onClose,
  node,
  index,
}: Props) {
  if (!open) return null;

  const ip =
    node.addresses?.[0]?.split(":")[0] ?? "—";

  const region =
    node.geo?.city && node.geo?.country
      ? `${node.geo.city}, ${node.geo.country}`
      : "—";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="
          relative
          h-125
          w-155
          rounded-2xl
          overflow-hidden
          border border-white/20
        "
        style={{
          background:
            "linear-gradient(45deg, #198376 0%, #632657 50%, #F99F1F 100%)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-950/80" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-20 rounded-full bg-red-700/65 p-2 text-white hover:bg-red-500/85"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="relative top-4 z-10 h-full p-8 text-white">
          {/* ─── Header ─── */}
          <div className="flex items-start justify-between">
            <div className="text-4xl font-bold">
              #{index + 1}
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
              <Cpu size={14} />
              <span className="opacity-80">version</span>
              <span className="font-medium">
                {node.version ?? "—"}
              </span>
            </div>
          </div>

          {/* ─── Address ─── */}
          <div className="mt-6">
            <div className="mb-1 text-sm opacity-70">
              Address
            </div>
            <div className="flex items-center justify-between rounded-full bg-white/10 px-4 py-2">
              <span className="truncate font-mono text-sm">
                {node.pubkey ?? "—"}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    node.pubkey ?? ""
                  )
                }
                className="ml-3 rounded-full bg-white/10 p-2 hover:bg-white/20"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>

          {/* ─── Main Section ─── */}
          <div className="mt-8 flex items-center gap-8">
            {/* Left cards */}
            <div className="grid flex-1 grid-cols-2 gap-3">
              {[
                ["Status", node.status],
                ["Tier", node.confidence_tier],
                ["IP Address", ip],
                ["Region", region],
                ["Last Seen", formatDate(node.last_seen)],
                ["Seen By", node.seen_by_count ?? "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/40 bg-white/5 p-3"
                >
                  <div className="mb-1 text-xs opacity-70">
                    {label}
                  </div>
                  <div className="text-sm font-medium capitalize">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-52 w-px bg-white/40" />

            {/* Right ring */}
            <div className="flex w-40 flex-col items-center">
              <div className="mb-2 text-sm opacity-80">
                Confidence Score
              </div>
              <ConfidenceRing
                value={node.confidence_score}
                size={128}
                strokeWidth={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
