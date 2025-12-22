"use client";

import { useEffect, useState } from "react";
import NodesToolbar from "./nodes-toolbar";
import NodesTable from "./nodes-table";

type Node = {
  pubkey: string | null;
  status: string;
  version: string;
  confidence_score: number;
  confidence_tier: "high" | "medium" | "low";
};

export default function NodesSection() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gossip")
      .then((r) => r.json())
      .then((res) => {
        setNodes(res.nodes);
        setTimestamp(res.timestamp);
      });
  }, []);

  return (
    <section className="mt-8">
      <div className="mx-auto max-w-7xl">
        <NodesToolbar timestamp={timestamp} />
        <NodesTable nodes={nodes} />
      </div>
    </section>
  );
}
