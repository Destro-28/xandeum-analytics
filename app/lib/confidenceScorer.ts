type NormalizedNode = {
  pubkey: string;
  addresses: string[];
  versions: string[];
  last_seen: number;
  seen_by_count: number;
  sources: string[];
};

export function scoreNode(
  node: NormalizedNode,
  totalEndpoints: number
) {
  const now = Math.floor(Date.now() / 1000);
  const age = now - node.last_seen;

  /* ---------------- Agreement ---------------- */
  const agreementRatio =
    totalEndpoints > 0
      ? node.seen_by_count / totalEndpoints
      : 0;

  const agreementScore = agreementRatio * 50;

  /* ---------------- Freshness ---------------- */
  let freshnessRatio = 0;
  if (age < 30) freshnessRatio = 1;
  else if (age < 120) freshnessRatio = 0.7;
  else if (age < 300) freshnessRatio = 0.4;

  const freshnessScore = freshnessRatio * 30;

  /* ---------------- Version ---------------- */
  let versionRatio = 0.6;
  if (node.versions.includes("unknown")) versionRatio = 0.2;
  else if (node.versions.length === 1) versionRatio = 1;

  const versionScore = versionRatio * 20;

  /* ---------------- Final ---------------- */
  const confidenceScore = Math.round(
    agreementScore + freshnessScore + versionScore
  );

  let tier: "high" | "medium" | "low";
  if (confidenceScore >= 75) tier = "high";
  else if (confidenceScore >= 45) tier = "medium";
  else tier = "low";

  let status: "active" | "intermittent" | "stale";
  if (age < 60) status = "active";
  else if (age < 300) status = "intermittent";
  else status = "stale";

  return {
    ...node,
    confidence_score: confidenceScore,
    confidence_tier: tier,
    status,
    agreement_ratio: Number(agreementRatio.toFixed(2)),
    age_seconds: age,
  };
}
