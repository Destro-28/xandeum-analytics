export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { callPRPC } from "@/app/lib/prpc";
import { normalizeGossip } from "@/app/lib/gossipNormalizer";
import { scoreNode } from "@/app/lib/confidenceScorer";

const ENDPOINTS = [
  "http://173.212.220.65:6000/rpc",
  "http://161.97.97.41:6000/rpc",
  "http://192.190.136.36:6000/rpc",
  "http://192.190.136.37:6000/rpc",
];

export async function GET() {
  const results: {
    endpoint: string;
    ok: boolean;
    pods?: {
      address: string;
      pubkey: string | null;
      version: string;
      last_seen_timestamp: number;
    }[];
    error?: string;
  }[] = [];

  // Fetch gossip from endpoints
  for (const endpoint of ENDPOINTS) {
    try {
      const gossip = await callPRPC(endpoint, "get-pods");

      results.push({
        endpoint,
        ok: true,
        pods: gossip.pods,
      });
    } catch (error: unknown) {
      results.push({
        endpoint,
        ok: false,
        error: (error as Error).message,
      });
    }
  }

  // Normalize successful gossip responses
  const normalized = normalizeGossip(
    results
      .filter((r) => r.ok && r.pods)
      .map((r) => ({
        endpoint: r.endpoint,
        pods: r.pods!,
      }))
  );

  // Score nodes (confidence, status, etc.)
  const totalEndpoints = ENDPOINTS.length;
  const scoredNodes = normalized.map((node) =>
    scoreNode(node, totalEndpoints)
  );

  // Build summary block (snapshot metadata)
  const now = Math.floor(Date.now() / 1000);

  const summary = {
    endpoints: {
      total: ENDPOINTS.length,
      healthy: results.filter((r) => r.ok).length,
      unhealthy: results.filter((r) => !r.ok).length,
    },

    nodes: {
      total_unique: scoredNodes.length,
      active: scoredNodes.filter((n) => n.status === "active").length,
      stale: scoredNodes.filter((n) => n.status === "stale").length,
    },

    confidence: {
      average_score:
        scoredNodes.length === 0
          ? 0
          : Math.round(
              scoredNodes.reduce(
                (acc, n) => acc + n.confidence_score,
                0
              ) / scoredNodes.length
            ),
      high: scoredNodes.filter(
        (n) => n.confidence_tier === "high"
      ).length,
      medium: scoredNodes.filter(
        (n) => n.confidence_tier === "medium"
      ).length,
      low: scoredNodes.filter(
        (n) => n.confidence_tier === "low"
      ).length,
    },

    freshness: {
      newest_seen_sec:
        scoredNodes.length === 0
          ? null
          : Math.min(...scoredNodes.map((n) => now - n.last_seen)),
      oldest_seen_sec:
        scoredNodes.length === 0
          ? null
          : Math.max(...scoredNodes.map((n) => now - n.last_seen)),
    },
  };

  // Final API response
  return NextResponse.json({
    timestamp: Date.now(),
    summary,
    nodes: scoredNodes,
  });
}
