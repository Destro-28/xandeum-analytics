type GossipPod = {
  address: string;
  pubkey: string | null;
  version: string;
  last_seen_timestamp: number;
};

type GossipSource = {
  endpoint: string;
  pods: GossipPod[];
};

export function normalizeGossip(sources: GossipSource[]) {
  const nodes: Record<
    string,
    {
      pubkey: string;
      addresses: Set<string>;
      versions: Set<string>;
      last_seen: number;
      seen_by: Set<string>;
    }
  > = {};

  for (const source of sources) {
    for (const pod of source.pods) {
      // Skip pods without pubkey (optional decision)
      if (!pod.pubkey) continue;

      if (!nodes[pod.pubkey]) {
        nodes[pod.pubkey] = {
          pubkey: pod.pubkey,
          addresses: new Set(),
          versions: new Set(),
          last_seen: 0,
          seen_by: new Set(),
        };
      }

      const node = nodes[pod.pubkey];

      node.addresses.add(pod.address);
      node.versions.add(pod.version);
      node.seen_by.add(source.endpoint);
      node.last_seen = Math.max(
        node.last_seen,
        pod.last_seen_timestamp
      );
    }
  }

  // Convert Sets → Arrays for JSON
  return Object.values(nodes).map((n) => ({
    pubkey: n.pubkey,
    addresses: Array.from(n.addresses),
    versions: Array.from(n.versions),
    last_seen: n.last_seen,
    seen_by_count: n.seen_by.size,
    sources: Array.from(n.seen_by),
  }));
}
