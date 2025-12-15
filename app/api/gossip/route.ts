export const runtime = "nodejs";

import { scoreNode } from "@/app/lib/confidenceScorer";
import { NextResponse } from "next/server";
import { callPRPC } from "@/app/lib/prpc";
import { normalizeGossip } from "@/app/lib/gossipNormalizer";

const ENDPOINTS = [
  "http://173.212.220.65:6000/rpc",
  "http://161.97.97.41:6000/rpc",
  "http://192.190.136.36:6000/rpc",
  "http://192.190.136.37:6000/rpc",
];


export async function GET() {
  const results = [];

  for (const endpoint of ENDPOINTS) {
    try {
      const gossip = await callPRPC(endpoint, "get-pods");

      results.push({
        endpoint,
        ok: true,
        total_count: gossip.total_count,
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
const normalized = normalizeGossip(
  results
    .filter((r) => r.ok)
    .map((r) => ({
      endpoint: r.endpoint,
      pods: r.pods,
    }))
);
const totalEndpoints = ENDPOINTS.length;

const scoredNodes = normalized.map((node) =>
  scoreNode(node, totalEndpoints)
);
return NextResponse.json({
  timestamp: Date.now(),
  total_unique_nodes: scoredNodes.length,

  summary: {
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

  nodes: scoredNodes,
});

}
